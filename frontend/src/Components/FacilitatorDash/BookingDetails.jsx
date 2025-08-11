import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";

const BookingDetails = ({data}) => {
  const [selectedTab, setSelectedTab] = useState("past");
  const bookings = data.bookings[selectedTab];

  const tabs = [
    { key: "past", label: "Past", count: data.bookings.past.length },
    { key: "current", label: "Current", count: data.bookings.current.length },
    { key: "upcoming", label: "Upcoming", count: data.bookings.upcoming.length }
  ];

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
                <h4 className="font-medium">{booking.venueName}</h4>
                <p className="text-sm text-gray-600">Customer: {booking.customer}</p>
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


export default BookingDetails
