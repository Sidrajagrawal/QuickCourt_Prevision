import { useState } from "react";
import BookingCard from "./BookingCard.jsx";

export default function BookingsList() {
  const [filter, setFilter] = useState("upcoming");

  const bookings = [
    { id: 1, venue: "Skyline Badminton Court", sport: "Badminton", date: new Date(2025, 5, 18), time: "5:00 PM - 6:00 PM", city: "Rajkot, Gujarat", status: "Confirmed" },
    { id: 2, venue: "Grand Sports Arena", sport: "Box Cricket", date: new Date(2024, 4, 10), time: "7:00 PM - 8:00 PM", city: "Ahmedabad, Gujarat", status: "Completed" },
  ];

  const now = new Date();
  const filteredBookings = bookings.filter(b => filter === 'upcoming' ? b.date >= now : b.date < now);

  const commonTabStyles = "px-4 py-2 text-sm rounded-full font-semibold transition-colors duration-200";
  const activeTabStyles = "bg-orange-500 text-white";
  const inactiveTabStyles = "text-gray-600 hover:bg-gray-200";

  return (
    <div className="rounded-2xl border p-8 shadow-sm bg-white border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
        <div className="p-1 rounded-full bg-gray-100">
          <button onClick={() => setFilter('upcoming')} className={`${commonTabStyles} ${filter === 'upcoming' ? activeTabStyles : inactiveTabStyles}`}>Upcoming</button>
          <button onClick={() => setFilter('past')} className={`${commonTabStyles} ${filter === 'past' ? activeTabStyles : inactiveTabStyles}`}>Past</button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => <BookingCard key={b.id} booking={b} />)
        ) : (
          <p className="text-center text-gray-500 py-8">No {filter} bookings found.</p>
        )}
      </div>
    </div>
  );
}