import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";

const BookingDetails = () => {
  const [selectedTab, setSelectedTab] = useState("past");
  const [bookingsData, setBookingsData] = useState({ past: [], current: [], upcoming: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch("http://localhost:8000/api/v1/bookings/facilitator/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();

        // Categorize bookings
        const today = new Date().toISOString().split("T")[0];
        const past = data.filter(b => b.date < today);
        const current = data.filter(b => b.date === today);
        const upcoming = data.filter(b => b.date > today);

        setBookingsData({ past, current, upcoming });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const tabs = [
    { key: "past", label: "Past", count: bookingsData.past.length },
    { key: "current", label: "Current", count: bookingsData.current.length },
    { key: "upcoming", label: "Upcoming", count: bookingsData.upcoming.length },
  ];

  const bookings = bookingsData[selectedTab];

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Total Bookings</h3>
      </div>
      
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === tab.key 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{booking.venue_name}</h4>
                <p className="text-sm text-gray-600">Customer: {booking.user_name}</p>
                <p className="text-sm text-gray-600">Date: {booking.date}</p>
                <p className="text-sm text-gray-600">Time: {booking.time}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">₹{booking.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDetails;
