import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";

function SearchBar({ value, onChange }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="mb-5">
      <label className="sr-only">Search venues</label>
      <input
        aria-label="Search venues"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Search by name or city"
        className={`w-full rounded-xl border px-4 py-2 text-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all placeholder:text-gray-400 ${
          isDarkMode
            ? "bg-white/5 border-gray-600/40 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;