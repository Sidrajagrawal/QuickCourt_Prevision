import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";
import EarningsDashboard from "./EarningsDashboard";
import TimeSlots from "./TimeSlots";
import ActiveOrders from "./ActiveOrders";
import BookingDetails from "./BookingDetails";
import CalendarView from "./CalendarView";
const StatsSection = ({data}) => {
  const [activeSection, setActiveSection] = useState(null);

  const stats = [
    { key: "bookings", label: "Total Bookings", icon: FileText, color: "blue" },
    { key: "orders", label: "Active Orders", icon: Users, color: "orange" },
    { key: "earnings", label: "Earnings", icon: DollarSign, color: "green" },
    { key: "slots", label: "Time Slots", icon: Clock, color: "purple" }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "bookings":
        return <BookingDetails data = {data}/>;
      case "orders":
        return <ActiveOrders data = {data}/>;
      case "earnings":
        return <EarningsDashboard data = {data}/>;
      case "slots":
        return <TimeSlots data = {data}/>;
      default:
        return <CalendarView/>;
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-200 rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                onClick={() => setActiveSection(activeSection === stat.key ? null : stat.key)}
                className={`bg-white px-4 py-3 rounded-md shadow text-center font-medium hover:shadow-lg cursor-pointer transition-all ${
                  activeSection === stat.key ? `ring-2 ring-${stat.color}-500 bg-${stat.color}-50` : ""
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                  <span className="text-sm">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {renderActiveSection()}
    </div>
  );
};


export default StatsSection;
 