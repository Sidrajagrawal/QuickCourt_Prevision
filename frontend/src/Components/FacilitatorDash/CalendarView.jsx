
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Sun,
  Moon,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  Filter
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
      case 0: return <CheckCircle2 className="w-3 h-3 text-white" />;
      case 1: return <AlertCircle className="w-3 h-3 text-white" />;
      case 2: return <XCircle className="w-3 h-3 text-white" />;
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
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Booking Modal Component
  const BookingModal = () => (
    <AnimatePresence>
      {showBookingModal && selectedDate && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
            className={`w-full max-w-md rounded-3xl p-6 
              bg-white border border-gray-200
            shadow-2xl`}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {monthNames[currentMonth]} {selectedDate}, {currentYear}
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Booking Details
              </p>
            </div>

            {(() => {
              const dayData = getDayData(selectedDate);
              return (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl ${'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Status</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dayData.status === 0 ? 'bg-green-100 text-green-800' :
                        dayData.status === 1 ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {dayData.status === 0 ? 'Available' :
                         dayData.status === 1 ? 'Partially Booked' :
                         'Fully Occupied'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{dayData.bookings}</div>
                        <div className="text-sm opacity-70">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">₹{dayData.revenue}</div>
                        <div className="text-sm opacity-70">Revenue</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add Booking
                    </motion.button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
        'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      
      

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Left Side - Calendar */}
          <motion.div 
            className="lg:col-span-3 order-2 lg:order-1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`rounded-3xl p-4 sm:p-8 border transition-all duration-300 ${
              'bg-white/70 border-gray-200 backdrop-blur-sm shadow-2xl'
            }`}>
              
              {/* Calendar Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => navigateMonth(-1)}
                    className={`p-2 sm:p-3 rounded-full transition-all ${
                     'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  
                  <motion.button
                    onClick={() => navigateMonth(1)}
                    className={`p-2 sm:p-3 rounded-full transition-all ${
                       'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                <div className="flex space-x-2">
                  
                  <motion.button
                    className={`p-2 rounded-xl transition-all ${
                      'bg-gray-200 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="text-center py-2 sm:py-3 text-xs sm:text-sm font-bold opacity-60">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.slice(0, 1)}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dayData = getDayData(day);
                  const isCurrentDay = isToday(day);

                  return (
                    <motion.div
                      key={day}
                      className={`relative aspect-square rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all group ${
                        isCurrentDay
                          ?  'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/25'
                          :  'border-gray-200 hover:border-gray-300 bg-white/50 hover:bg-white/80'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedDate(day);
                        setShowBookingModal(true);
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                    >
                      <div className="p-1 sm:p-2 h-full flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <span className={`text-xs sm:text-sm font-bold ${
                            isCurrentDay ? 'text-blue-600' : ''
                          }`}>
                            {day}
                          </span>
                          {dayData.status !== undefined && (
                            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusColor(dayData.status)} shadow-lg flex items-center justify-center`}>
                              {getStatusIcon(dayData.status)}
                            </div>
                          )}
                        </div>
                        
                        {dayData.bookings > 0 && (
                          <div className="space-y-0.5">
                            <div className="text-[8px] sm:text-xs font-semibold text-blue-500">
                              {dayData.bookings} bookings
                            </div>
                            <div className="text-[8px] sm:text-xs font-medium text-green-500">
                              ₹{dayData.revenue}
                            </div>
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
            className="lg:col-span-1 order-1 lg:order-2 space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            {/* Quick Stats */}
            <div className={`rounded-2xl p-4 sm:p-6 border ${
              
                 'bg-white/70 border-gray-200'
            } shadow-xl`}>
              <h3 className="font-bold text-base sm:text-lg mb-4 flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm opacity-70">Total Bookings</span>
                  <span className="font-bold text-blue-500">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm opacity-70">Revenue</span>
                  <span className="font-bold text-green-500">₹18,900</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm opacity-70">Occupancy</span>
                  <span className="font-bold text-purple-500">68%</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className={`rounded-2xl p-4 sm:p-6 border ${
              'bg-white/70 border-gray-200'
            } shadow-xl`}>
              <h3 className="font-bold text-base sm:text-lg mb-4 flex items-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                Status Legend
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg flex items-center justify-center">
                    <AlertCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm">Partially Booked</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg flex items-center justify-center">
                    <XCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm">Fully Occupied</span>
                </div>
              </div>
            </div>

            {/* Today's Summary */}
            <div className={`rounded-2xl p-4 sm:p-6 border ${
              'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
            } shadow-xl`}>
              <h3 className="font-bold text-base sm:text-lg mb-4">Today's Summary</h3>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">8</div>
                <div className="text-xs sm:text-sm opacity-70 mb-3">Active Bookings</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs sm:text-sm opacity-70 mt-2">75% Capacity</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
          'bg-blue-400/20'
          } blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            'bg-purple-400/20'
          } blur-3xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CalendarView;