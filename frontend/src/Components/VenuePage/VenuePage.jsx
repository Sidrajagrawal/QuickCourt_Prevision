import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "./SearchBar";
import ErrorBanner from "./ErrorBanner";
import Loader from "./Loader";
import VenueCard from "../Home/VenueCard.jsx";
import FiltersSidebar from "./FilterSidebar";
import Navbar from "../Navabr/Navbar.jsx";

// Assuming these are defined in a constants file
const DEBOUNCE_MS = 500;
import { fetchVenues } from "./VenuesService"; 
import { useDarkMode } from "../DarkModeContext.jsx";
import { useNavigate } from "react-router-dom";

export default function VenuesPage() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [venues, setVenues] = useState([]);
  
  // This useEffect now handles both the initial fetch and filtering
  useEffect(() => {
    let active = true;
    const id = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchVenues({
          q: query,
          filters: {
            type: filters.type || undefined,
            minPrice: filters.minPrice ?? undefined,
            maxPrice: filters.maxPrice ?? undefined,
            minRating: filters.minRating ?? undefined,
          },
        });

        if (active) {
          setVenues(res.data);
        }
      } catch (err) {
        console.error(err);
        if (active) setError("Failed to load venues. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [query, filters]);

  const onView = (venue) => {
    navigate(`/venue-details/${venue.id}`);
  };

  const onFilterChange = (up) => {
    if (up.error) {
      setFilters((f) => ({ ...f, error: up.error }));
      return;
    }
    setFilters((f) => ({ ...f, ...up, error: undefined }));
  };

  const clearFilters = () => {
    setFilters({ type: null, minPrice: null, maxPrice: null, minRating: null });
  };

  const venueGrid = useMemo(() => {
    if (!venues || venues.length === 0) return null;
    return (
      <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
        {venues.map((venue, index) => (
          <VenueCard
            key={venue.id || index}
            venue={venue}
            onView={onView}
            showBadge={index === 1}
            badgeText="Joyful Yak"
          />
        ))}
      </div>
    );
  }, [venues]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? "bg-[#0b0b0b] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <FiltersSidebar
            filters={filters}
            onChange={onFilterChange}
            onClear={clearFilters}
          />
        </div>

        <section className="col-span-12 md:col-span-9">
          <SearchBar value={query} onChange={setQuery} />

          {error ? <ErrorBanner message={error} /> : null}

          {loading ? <Loader /> : venueGrid}

          {!loading && venues.length === 0 && (
            <div
              className={`text-sm mt-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No venues found.
            </div>
          )}
          
          {/* Pagination is removed as your current API doesn't support it */}
        </section>
      </div>

      <footer
        className={`max-w-6xl mx-auto mt-12 text-center text-xs ${
          isDarkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        Footer
      </footer>
    </div>
  );
}
