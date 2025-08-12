import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import PaymentModal from './PaymentModal';
import VenueInfo from './VenueInfo';
import DateSelection from './DataSelection';
import TimeSelection from './TimeSelection';
import CourtSelection from './CourtSelection';
import SportSelection from './SportsSelection';
import DurationControl from './DurationControl';
import { MapPin, Clock, Star, Phone, Wifi, Car, Users } from 'lucide-react';

// API service for booking
const bookingAPI = {
  async createBooking(bookingData) {
    try {
      const token = localStorage.getItem('access'); // Assuming you store auth token
      
      console.log('Sending booking data:', bookingData); // Debug log
      
      const response = await fetch('http://localhost:8000/api/v1/bookings/', { // Add full URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }), // Only add if token exists
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Response status:', response.status); // Debug log
      console.log('Response headers:', response.headers); // Debug log

      // Check if response has content
      const contentType = response.headers.get('content-type');
      const hasJsonContent = contentType && contentType.includes('application/json');
      
      if (!response.ok) {
        let errorMessage = 'Booking failed';
        
        if (hasJsonContent) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
          } catch (jsonError) {
            console.error('Error parsing error response JSON:', jsonError);
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        } else {
          // Handle non-JSON error responses
          const errorText = await response.text();
          console.log('Non-JSON error response:', errorText);
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Handle successful response
      if (hasJsonContent) {
        const responseText = await response.text();
        console.log('Response text:', responseText); // Debug log
        
        if (!responseText.trim()) {
          throw new Error('Empty response from server');
        }
        
        try {
          return JSON.parse(responseText);
        } catch (jsonError) {
          console.error('Error parsing success response JSON:', jsonError);
          console.error('Response text that failed to parse:', responseText);
          throw new Error('Invalid JSON response from server');
        }
      } else {
        // Handle non-JSON success response (like 204 No Content)
        console.log('Non-JSON success response');
        return { success: true, message: 'Booking created successfully' };
      }
      
    } catch (error) {
      console.error('API Error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      
      throw error;
    }
  }
};

const BookingForm = ({ darkMode }) => {
  const location = useLocation();
  const venue = location.state?.venue; // Get venue from navigation state

  // Initialize form based on venue data
  const [selectedSport, setSelectedSport] = useState(venue?.sports?.[0] || 'Badminton');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [duration, setDuration] = useState(1);
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Get venue-specific data
  const venueAddress = venue?.location?.landmark 
    ? `${venue.location.landmark}, ${venue.location.city || ''}`
    : venue?.location?.city || '';
  
  const pricePerHour = parseFloat(venue?.price_per_hour) || 300;

  const calculateTotal = () => {
    return selectedCourts.length * duration * pricePerHour;
  };

  // Convert time format for API (from "01:00 PM" to "13:00:00")
  const convertTimeFormat = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const handleBooking = async (paymentMethod = 'online') => {
    if (!venue) {
      setBookingError('Venue information is missing');
      return;
    }

    if (selectedCourts.length === 0) {
      setBookingError('Please select at least one court');
      return;
    }

    setIsLoading(true);
    setBookingError(null);
    setBookingSuccess(null);

    try {
      console.log('Starting booking process...'); // Debug log
      
      const bookingData = {
        venue: venue.id,
        sport: selectedSport,
        date: selectedDate,
        time: convertTimeFormat(startTime),
        duration: duration,
        courts: selectedCourts.length,
        total_price: calculateTotal(),
        payment_status: paymentMethod === 'cov' ? 'pending' : 'pending'
      };

      console.log('Booking data prepared:', bookingData); // Debug log

      const booking = await bookingAPI.createBooking(bookingData);
      
      console.log('Booking response:', booking); // Debug log
      
      if (paymentMethod === 'cov') {
        // For COV, show success message and don't open payment modal
        setBookingSuccess({
          message: 'Booking confirmed! You can pay cash at the venue.',
          bookingId: booking.booking?.id || booking.id,
          paymentMethod: 'Cash on Venue'
        });
      } else {
        // For online payment, show payment modal
        setShowPaymentModal(true);
      }
      
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Venue Details Card */}
        <motion.div
          className={`lg:col-span-1 rounded-2xl p-6 border h-fit transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
              : 'bg-white/70 border-gray-200 backdrop-blur-sm shadow-xl'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {venue ? (
            <>
              {/* Venue Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {venue.name}
                  </h2>
                  <motion.div
                    className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    Available
                  </motion.div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {venueAddress}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{venue.rating || "4.5"}</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({venue.reviews_count || "42"} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Operating Hours
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {venue.operational_hours || "6:00 AM - 11:00 PM"}
                </p>
              </div>

              {/* Available Sports */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Available Sports
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(venue.sports || ['Badminton']).map((sport, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {venue.amenities && (
                <div className="mb-6">
                  <span className={`font-medium block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Amenities
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.amenities.includes('wifi') && (
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          WiFi
                        </span>
                      </div>
                    )}
                    {venue.amenities.includes('parking') && (
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-green-500" />
                        <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Parking
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Price Info */}
              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-center">
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Starting from
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{pricePerHour}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    per hour per court
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>No venue selected</p>
              <p className="text-sm mt-2">Please select a venue to continue booking</p>
            </div>
          )}
        </motion.div>

        {/* Booking Form */}
        <motion.div
          className={`lg:col-span-2 rounded-2xl p-6 border transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
              : 'bg-white/70 border-gray-200 backdrop-blur-sm shadow-xl'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Book Your Slot
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fill in the details below to reserve your court
            </p>
          </div>

          <div className="space-y-6">
            <SportSelection
              selectedSport={selectedSport} 
              setSelectedSport={setSelectedSport} 
              darkMode={darkMode}
              availableSports={venue?.sports || []}
            />
            <DateSelection
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              darkMode={darkMode} 
            />
            <TimeSelection
              startTime={startTime} 
              setStartTime={setStartTime} 
              darkMode={darkMode}
              operatingHours={venue?.operational_hours}
            />
            <DurationControl
              duration={duration} 
              setDuration={setDuration} 
              darkMode={darkMode} 
            />
            <CourtSelection
              selectedCourts={selectedCourts} 
              setSelectedCourts={setSelectedCourts} 
              darkMode={darkMode}
              totalCourts={venue?.total_courts || 4}
              courtNames={venue?.court_names}
            />
          </div>

          {/* Booking Summary */}
          {selectedCourts.length > 0 && (
            <motion.div
              className={`mt-6 p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-blue-50 border-blue-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Booking Summary
              </h4>
              <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex justify-between">
                  <span>Sport:</span>
                  <span className="font-medium">{selectedSport}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{duration} hour(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Courts:</span>
                  <span className="font-medium">{selectedCourts.join(', ')}</span>
                </div>
                <div className={`flex justify-between pt-2 border-t ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                } font-bold text-lg`}>
                  <span>Total:</span>
                  <span className="text-green-600">₹{calculateTotal()}.00</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {bookingSuccess && (
            <motion.div
              className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-semibold">Booking Confirmed!</span>
              </div>
              <p className="text-sm mb-2">{bookingSuccess.message}</p>
              <div className="text-xs space-y-1">
                <p><span className="font-medium">Booking ID:</span> #{bookingSuccess.bookingId}</p>
                <p><span className="font-medium">Payment:</span> {bookingSuccess.paymentMethod}</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {bookingError && (
            <motion.div
              className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {bookingError}
            </motion.div>
          )}

          {/* Payment Options - Two buttons */}
          <div className="space-y-3 mt-6">
            {/* Online Payment Button */}
            <motion.button
              onClick={() => handleBooking('online')}
              disabled={selectedCourts.length === 0 || isLoading || !venue || bookingSuccess}
              className={`w-full p-4 rounded-lg font-bold text-lg transition-all ${
                selectedCourts.length === 0 || isLoading || !venue || bookingSuccess
                  ? 'bg-gray-500/50 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={selectedCourts.length > 0 && !isLoading && !venue && !bookingSuccess ? { scale: 1.02 } : {}}
              whileTap={selectedCourts.length > 0 && !isLoading && !venue && !bookingSuccess ? { scale: 0.98 } : {}}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {isLoading ? 'Processing...' : `Pay Online - ₹${calculateTotal()}.00`}
            </motion.button>

            {/* Cash on Venue Button */}
            <motion.button
              onClick={() => handleBooking('cov')}
              disabled={selectedCourts.length === 0 || isLoading || !venue || bookingSuccess}
              className={`w-full p-4 rounded-lg font-bold text-lg border-2 transition-all ${
                selectedCourts.length === 0 || isLoading || !venue || bookingSuccess
                  ? 'bg-gray-500/50 border-gray-500/50 cursor-not-allowed text-gray-400'
                  : darkMode
                    ? 'bg-gray-800/50 border-green-500 text-green-400 hover:bg-green-500/10 hover:shadow-lg'
                    : 'bg-white border-green-500 text-green-600 hover:bg-green-50 hover:shadow-lg'
              }`}
              whileHover={selectedCourts.length > 0 && !isLoading && venue && !bookingSuccess ? { scale: 1.02 } : {}}
              whileTap={selectedCourts.length > 0 && !isLoading && venue && !bookingSuccess ? { scale: 0.98 } : {}}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {isLoading ? 'Creating Booking...' : `Cash on Venue (COV) - ₹${calculateTotal()}.00`}
            </motion.button>
          </div>

          {/* Payment Info */}
          <motion.div
            className={`mt-4 p-3 rounded-lg text-sm ${
              darkMode ? 'bg-gray-700/30 text-gray-300' : 'bg-gray-50 text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="font-medium mb-2">Payment Options:</p>
            <ul className="text-xs space-y-1">
              <li>• <span className="font-medium">Pay Online:</span> Secure payment gateway with instant confirmation</li>
              <li>• <span className="font-medium">Cash on Venue (COV):</span> Pay directly at the venue when you arrive</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        darkMode={darkMode}
        totalAmount={calculateTotal()}
        bookingData={{
          venue,
          sport: selectedSport,
          date: selectedDate,
          time: startTime,
          duration,
          courts: selectedCourts.length
        }}
      />
    </>
  );
};

export default BookingForm