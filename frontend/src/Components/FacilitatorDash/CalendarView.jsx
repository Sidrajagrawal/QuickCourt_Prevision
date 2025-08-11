import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Filter,
  Clock,
  Users
} from 'lucide-react';

// Calendar Component
const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Calendar calculations
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Sample booking data
  const bookingData = {
    1: { status: 2, bookings: 8, revenue: 2400 },
    3: { status: 1, bookings: 5, revenue: 1500 },
    5: { status: 0, bookings: 0, revenue: 0 },
    8: { status: 2, bookings: 12, revenue: 3600 },
    12: { status: 1, bookings: 3, revenue: 900 },
    15: { status: 0, bookings: 0, revenue: 0 },
    18: { status: 2, bookings: 10, revenue: 3000 },
    22: { status: 1, bookings: 7, revenue: 2100 },
    25: { status: 0, bookings: 0, revenue: 0 },
    28: { status: 2, bookings: 15, revenue: 4500 },
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-green-500 shadow-green-500/50';
      case 1: return 'bg-blue-500 shadow-blue-500/50';
      case 2: return 'bg-red-500 shadow-red-500/50';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 0: return <CheckCircle2 className="w-2.5 h-2.5 text-white" />;
      case 1: return <AlertCircle className="w-2.5 h-2.5 text-white" />;
      case 2: return <XCircle className="w-2.5 h-2.5 text-white" />;
      default: return null;
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const isToday = (day) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const getDayData = (day) => bookingData[day] || { status: 0, bookings: 0, revenue: 0 };

  // Generate calendar days
  const calendarDays = [];
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // ... (BookingModal component remains the same)

  return (
    // CHANGE: Reduced overall width from max-w-7xl to max-w-5xl
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Side - Calendar */}
        {/* CHANGE: Reduced column span for a smaller calendar */}
        <motion.div 
          className="lg:col-span-2 order-2 lg:order-1"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* CHANGE: Reduced padding from p-4 sm:p-8 to p-4 sm:p-6 */}
          <div className="rounded-2xl p-4 sm:p-6 bg-white/70 border border-gray-200 backdrop-blur-sm shadow-lg">
            
            {/* Calendar Header */}
            {/* CHANGE: Reduced bottom margin */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                {/* CHANGE: Reduced font size */}
                <h2 className="text-xl sm:text-2xl font-bold">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                
                <motion.button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.button
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Day Names */}
            {/* CHANGE: Reduced bottom margin and font size */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center py-2 text-xs font-bold opacity-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {/* CHANGE: Reduced gap between cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dayData = getDayData(day);
                const isCurrentDay = isToday(day);

                return (
                  <motion.div
                    key={day}
                    // CHANGE: Made day cells smaller and less rounded
                    className={`relative aspect-square rounded-lg border cursor-pointer group ${
                      isCurrentDay
                        ?  'border-blue-500 bg-blue-50'
                        :  'border-gray-200 hover:border-gray-300 bg-white/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={() => {
                      setSelectedDate(day);
                      setShowBookingModal(true);
                    }}
                  >
                    {/* CHANGE: Reduced padding inside day cell */}
                    <div className="p-1.5 h-full flex flex-col justify-between text-xs">
                      <div className="flex items-start justify-between">
                        <span className={`font-bold ${
                          isCurrentDay ? 'text-blue-600' : ''
                        }`}>
                          {day}
                        </span>
                        {dayData.status !== undefined && (
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(dayData.status)} flex items-center justify-center`}>
                            {getStatusIcon(dayData.status)}
                          </div>
                        )}
                      </div>
                      
                      {dayData.bookings > 0 && (
                        // CHANGE: Adjusted text size for smaller cells
                        <div className="space-y-0.5 text-[9px] font-semibold">
                          <div className="text-blue-600">{dayData.bookings} bookings</div>
                          <div className="text-green-600">₹{dayData.revenue}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Quick Stats & Legend */}
        <motion.div 
          className="lg:col-span-1 order-1 lg:order-2 space-y-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-xl p-4 bg-white/70 border border-gray-200 shadow-lg">
            <h3 className="font-bold text-base mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              This Month
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="opacity-70">Total Bookings</span>
                <span className="font-bold text-blue-500">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Revenue</span>
                <span className="font-bold text-green-500">₹18,900</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Occupancy</span>
                <span className="font-bold text-purple-500">68%</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white/70 border border-gray-200 shadow-lg">
            <h3 className="font-bold text-base mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              Status Legend
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Partially Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Fully Occupied</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarView;