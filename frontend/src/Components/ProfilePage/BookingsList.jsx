import react from "react";
import BookingCard from "./BookingCard.jsx";
import { useDarkMode } from "../DarkModeContext.jsx";

export default function BookingsList() {
  const { isDarkMode } = useDarkMode();

  // Dummy data
  const bookings = [
    {
      id: 1,
      venue: "Skyline Badminton Court",
      sport: "Badminton",
      date: "18 June 2025",
      time: "5:00 PM - 6:00 PM",
      city: "Rajkot, Gujarat",
      status: "Confirmed",
      past: false,
    },
    {
      id: 2,
      venue: "Skyline Badminton Court",
      sport: "Badminton",
      date: "18 June 2024",
      time: "5:00 PM - 6:00 PM",
      city: "Rajkot, Gujarat",
      status: "Confirmed",
      past: true,
    },
  ];

  return (
    <div
      className={`rounded-xl border p-6 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">All Bookings</h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
}
