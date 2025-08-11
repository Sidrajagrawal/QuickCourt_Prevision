// frontend/src/Components/Home/VenueCard.jsx
import React from "react";
import { MapPin, Star } from "lucide-react";

const VenueCard = ({ venue, onView, isDarkMode }) => {
  const shortLocation =
    venue.location?.landmark || venue.location?.city || "";

  const topSports = Array.isArray(venue.sports)
    ? venue.sports.slice(0, 2)
    : [];

  return (
    <div
      onClick={() => onView(venue)}
      className={`cursor-pointer p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Rating */}
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-yellow-500 mr-1" />
        <span className="font-semibold">{venue.rating || "4.5"}</span>
        <span className="text-gray-500 ml-1">
          ({venue.reviews_count || "0"})
        </span>
      </div>

      {/* Venue Name */}
      <h3 className="text-lg font-bold mb-1">{venue.name}</h3>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        {shortLocation}
      </div>

      {/* Sports & Price */}
      <div className="flex flex-wrap gap-2 mb-3">
        {topSports.map((sport, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            #{sport}
          </span>
        ))}
        <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
          ₹ {venue.price_per_hour} /hr
        </span>
      </div>

      {/* Top Rated Badge */}
      {venue.rating >= 4.5 && (
        <div className="px-2 py-1 text-xs rounded-full bg-yellow-400 text-black inline-block">
          ★ Top Rated
        </div>
      )}
    </div>
  );
};

export default VenueCard;
