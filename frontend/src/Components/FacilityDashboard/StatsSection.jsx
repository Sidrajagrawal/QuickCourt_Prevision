import React from "react";

const StatCard = ({ label }) => (
  <div className="bg-white px-4 py-2 rounded-md shadow text-sm text-center font-medium hover:shadow-md cursor-pointer">
    {label}
  </div>
);

const StatsSection = () => {
  const stats = ["Total Bookings", "Active Orders", "Earnings", "Time Slots"];

  return (
    <div className="bg-gray-200 rounded-lg p-3 mt-4 shadow-md">
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
 