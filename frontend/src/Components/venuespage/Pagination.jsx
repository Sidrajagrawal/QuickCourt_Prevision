import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";

function Pagination({ page, total, pageSize, onChange }) {
  const { isDarkMode } = useDarkMode();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  if (totalPages === 1) return null;

  return (
    <nav aria-label="Pagination" className="flex gap-2 justify-center mt-8">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-3 py-1 rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          isDarkMode
            ? "border-gray-600/50 bg-white/5 hover:bg-white/10"
            : "border-gray-300 bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`px-3 py-1 rounded-lg transition-all border ${
            p === page
              ? "bg-green-500 text-white border-green-500 shadow-md"
              : isDarkMode
              ? "border-gray-600/50 bg-white/5 hover:bg-white/10"
              : "border-gray-300 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          isDarkMode
            ? "border-gray-600/50 bg-white/5 hover:bg-white/10"
            : "border-gray-300 bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
