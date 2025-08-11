import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";

function VenueCard({ venue, onView, showBadge = false, badgeText = "" }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer relative hover:shadow-lg ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:border-gray-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      {showBadge && (
        <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
          {badgeText}
        </div>
      )}

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
            onClick={() => onView(venue)}
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
  showBadge: PropTypes.bool,
  badgeText: PropTypes.string,
};

export default VenueCard;
import React from "react";
import { useDarkMode } from "../DarkModeContext";

const VenueCard = ({ venue, showBadge = false, badgeText = "" }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:border-gray-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      } rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer relative hover:shadow-lg`}
    >
      {showBadge && (
        <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
          {badgeText}
        </div>
      )}

      <div
        className={`h-32 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        } flex items-center justify-center ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        } text-sm font-medium transition-colors duration-200`}
      >
        Image
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-1 text-yellow-400 text-sm">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="font-medium">{venue.rating}</span>
          <span
            className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            ({venue.reviews})
          </span>
        </div>

        <h3
          className={`font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          } text-sm transition-colors duration-200`}
        >
          {venue.name}
        </h3>

        <div
          className={`flex items-center space-x-1 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } text-xs transition-colors duration-200`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>{venue.location}</span>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"
              } text-xs rounded-full font-medium transition-colors duration-200`}
            >
              # {venue.sport.toLowerCase()}
            </span>
            <span
              className={`px-3 py-1 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"
              } text-xs rounded-full font-medium transition-colors duration-200`}
            >
              ₹ Outdoor
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-semibold">
              ★ Top Rated
            </span>
            <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-semibold">
              ₹ Budget
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
