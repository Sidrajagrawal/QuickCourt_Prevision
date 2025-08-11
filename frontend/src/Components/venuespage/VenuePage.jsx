import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "./SearchBar";
import ErrorBanner from "./ErrorBanner";
import Loader from "./Loader";
import Pagination from "./Pagination";
import VenueCard from "../Home/VenueCard.jsx"; // ✅ Use the first VenueCard
import FiltersSidebar from "./FilterSidebar";
import Navbar from "../navbar/navbar.jsx";

import { PAGE_SIZE, DEBOUNCE_MS } from "./constants";
import { fetchVenues } from "./VenuesService";
import { useDarkMode } from "../DarkModeContext.jsx";

export default function VenuesPage() {
  const { isDarkMode } = useDarkMode();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
  });
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [venues, setVenues] = useState([]);
  const [total, setTotal] = useState(0);

  const makeCacheKey = useCallback(
    (p, q, f) => `venues:${p}:${q}:${JSON.stringify(f)}`,
    []
  );

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      const key = makeCacheKey(page, query, filters);
      try {
        const cached = sessionStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (active) {
            setVenues(parsed.data);
            setTotal(parsed.total);
            setLoading(false);
          }
          return;
        }

        const params = {
          page,
          pageSize: PAGE_SIZE,
          q: query,
          filters: {
            type: filters.type || undefined,
            minPrice: filters.minPrice ?? undefined,
            maxPrice: filters.maxPrice ?? undefined,
            minRating: filters.minRating ?? undefined,
          },
        };

        const res = await fetchVenues(params);

        if (active) {
          setVenues(res.data);
          setTotal(res.total);
          sessionStorage.setItem(key, JSON.stringify(res));
        }
      } catch (err) {
        console.error(err);
        if (active) setError("Failed to load venues. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [page, query, filters, makeCacheKey]);

  useEffect(() => {
    const id = setTimeout(() => setPage(1), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [query]);

  const onView = (venue) => {
    alert(`Open details for: ${venue.name}`);
  };

  const onFilterChange = (up) => {
    if (up.error) {
      setFilters((f) => ({ ...f, error: up.error }));
      return;
    }
    setFilters((f) => ({ ...f, ...up, error: undefined }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ type: null, minPrice: null, maxPrice: null, minRating: null });
    setPage(1);
  };

  const venueGrid = useMemo(() => {
    if (!venues || venues.length === 0) return null;
    return (
      <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
        {venues.map((venue, index) => (
          <VenueCard
            key={index}
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
        isDarkMode
          ? "bg-[#0b0b0b] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar/>

      <div className="max-w-6xl  mx-auto mt-10 grid grid-cols-12 gap-6">
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

          <Pagination
            page={page}
            total={total}
            pageSize={PAGE_SIZE}
            onChange={(p) => setPage(p)}
          />
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
