import react from "react";
import { useDarkMode } from "../DarkModeContext.jsx";

export default function BookingCard({ booking }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`rounded-lg p-4 border ${
        isDarkMode
          ? "bg-gray-700 border-gray-600"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <h3 className="font-semibold">{booking.venue} ({booking.sport})</h3>
      <p className="text-sm text-gray-400">{booking.date} | {booking.time}</p>
      <p className="text-xs text-gray-500">{booking.city}</p>
      <p
        className={`mt-2 font-medium ${
          booking.status === "Confirmed"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {booking.status}
      </p>
      <div className="mt-3 flex space-x-2">
        {!booking.past && (
          <button className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs">
            Cancel Booking
          </button>
        )}
        <button className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs">
          Write Review
        </button>
      </div>
    </div>
  );
};
