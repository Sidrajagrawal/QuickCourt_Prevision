import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDarkMode } from "../DarkModeContext.jsx";

function FiltersSidebar({ filters, onChange, onClear }) {
  const { isDarkMode } = useDarkMode();
  const [localType, setLocalType] = useState(filters.type ?? "");
  const [minPriceLocal, setMinPriceLocal] = useState(filters.minPrice ?? "");
  const [maxPriceLocal, setMaxPriceLocal] = useState(filters.maxPrice ?? "");
  const [localMinRating, setLocalMinRating] = useState(filters.minRating ?? "");

  useEffect(() => {
    setLocalType(filters.type ?? "");
    setMinPriceLocal(filters.minPrice ?? "");
    setMaxPriceLocal(filters.maxPrice ?? "");
    setLocalMinRating(filters.minRating ?? "");
  }, [filters]);

  const isValidPriceRange = (min, max) => {
    if (min !== "" && isNaN(min)) return false;
    if (max !== "" && isNaN(max)) return false;
    if (min !== "" && max !== "" && Number(min) > Number(max)) return false;
    return true;
  };

  const applyFilters = () => {
    if (!isValidPriceRange(minPriceLocal, maxPriceLocal)) {
      return onChange({ ...filters, error: "Invalid price range" });
    }
    const next = {
      type: localType || null,
      minPrice: minPriceLocal === "" ? null : Number(minPriceLocal),
      maxPrice: maxPriceLocal === "" ? null : Number(maxPriceLocal),
      minRating: localMinRating === "" ? null : Number(localMinRating),
    };
    onChange(next);
  };

  return (
    <aside className="w-full md:w-64 pr-4">
      <div
        className={`p-5 rounded-2xl backdrop-blur-md border shadow-xl transition-all hover:shadow-2xl ${
          isDarkMode
            ? "bg-white/5 border-white/20 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <h3 className="text-lg font-bold mb-5 tracking-wide">Filters</h3>

        {/* Venue Type */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Venue type</label>
          <select
            value={localType}
            onChange={(e) => setLocalType(e.target.value)}
            className={`w-full rounded-lg px-3 py-2 text-sm border focus:border-green-400 focus:ring focus:ring-green-500/40 outline-none transition-all ${
              isDarkMode
                ? "bg-white/10 border-white/20 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
          >
            <option value="">All</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Price / hour</label>
          <div className="flex gap-2">
            <input
              inputMode="numeric"
              className={`w-1/2 rounded-lg px-3 py-2 text-sm border placeholder-gray-400 focus:border-green-400 focus:ring focus:ring-green-500/40 outline-none transition-all ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              placeholder="Min"
              value={minPriceLocal}
              onChange={(e) => setMinPriceLocal(e.target.value)}
            />
            <input
              inputMode="numeric"
              className={`w-1/2 rounded-lg px-3 py-2 text-sm border placeholder-gray-400 focus:border-green-400 focus:ring focus:ring-green-500/40 outline-none transition-all ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
              placeholder="Max"
              value={maxPriceLocal}
              onChange={(e) => setMaxPriceLocal(e.target.value)}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm mb-3">Minimum Rating</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "" },
              { label: "4.5+", value: 4.5 },
              { label: "4.0+", value: 4.0 },
              { label: "3.5+", value: 3.5 },
              { label: "3.0+", value: 3.0 },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLocalMinRating(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  localMinRating === opt.value ||
                  Number(localMinRating) === Number(opt.value)
                    ? "bg-green-500 text-black border-green-500"
                    : isDarkMode
                    ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={applyFilters}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-400 to-emerald-600 hover:shadow-lg hover:scale-105 transition-all"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setLocalType("");
              setMinPriceLocal("");
              setMaxPriceLocal("");
              setLocalMinRating("");
              onClear();
            }}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              isDarkMode
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            Clear
          </button>
        </div>

        {filters.error && (
          <div className="text-xs text-red-400 mt-3">{filters.error}</div>
        )}
      </div>
    </aside>
  );
}

FiltersSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default FiltersSidebar;