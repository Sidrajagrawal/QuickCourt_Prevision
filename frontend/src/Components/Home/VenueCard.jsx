import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";

function VenueCard({ venue, onView }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      onClick={() => onView(venue)}
      className={`rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer relative hover:shadow-lg ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:border-gray-600" // Updated to a solid gray background
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div
        className={`h-36 flex items-center justify-center text-xs transition-colors duration-200 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800/50 to-gray-700/50 text-gray-400"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        📷 Image Coming Soon
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-1 text-yellow-400 text-sm">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="font-medium">{venue.rating}</span>
        </div>

        <h3
          className={`font-semibold text-sm transition-colors duration-200 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {venue.name}
        </h3>

        <div
          className={`text-xs transition-colors duration-200 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {venue.type} • {venue.city}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            <div className="font-medium text-green-500">
              ₹{venue.pricePerHour} / hr
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(venue);
            }}
            className={`rounded-lg px-3 py-1 text-xs border transition-all ${
              isDarkMode
                ? "bg-green-500/20 hover:bg-green-500/30 border-green-400/30 text-green-200"
                : "bg-green-100 hover:bg-green-200 border-green-300 text-green-800"
            }`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
};

export default VenueCard;