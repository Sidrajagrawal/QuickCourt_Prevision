import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";

const TimeSlots = ({data}) => {
  const [selectedVenue, setSelectedVenue] = useState("all");
  const venues = [...new Set(data.timeSlots.map(slot => slot.venue))];
  
  const filteredSlots = selectedVenue === "all" 
    ? data.timeSlots 
    : data.timeSlots.filter(slot => slot.venue === selectedVenue);

  const groupedSlots = filteredSlots.reduce((acc, slot) => {
    if (!acc[slot.venue]) acc[slot.venue] = [];
    acc[slot.venue].push(slot);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Time Slots</h3>
      </div>

      <div className="mb-4">
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Venues</option>
          {venues.map((venue) => (
            <option key={venue} value={venue}>{venue}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSlots).map(([venue, slots]) => (
          <div key={venue}>
            <h4 className="font-medium mb-2 text-gray-800">{venue}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-center ${
                    slot.status === "available"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-xs mt-1">
                    {slot.status === "booked" ? slot.customer : "Available"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots
