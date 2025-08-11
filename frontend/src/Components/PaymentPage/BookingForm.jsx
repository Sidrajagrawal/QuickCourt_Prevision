
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import PaymentModal from './PaymentModal';
import VenueInfo from './VenueInfo';
import DateSelection from './DataSelection';
import TimeSelection from './TimeSelection';
import CourtSelection from './CourtSelection';
import SportSelection from './SportsSelection';
import DurationControl from './DurationControl';

const BookingForm = ({ darkMode }) => {
  const [selectedSport, setSelectedSport] = useState('Badminton');
  const [selectedDate, setSelectedDate] = useState('2025-05-06');
  const [startTime, setStartTime] = useState('01:00 PM');
  const [duration, setDuration] = useState(2);
  const [selectedCourts, setSelectedCourts] = useState(['Table 1', 'Table 2']);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calculateTotal = () => {
    return selectedCourts.length * duration * 300;
  };

  return (
    <>
      <motion.div
        className={`w-full max-w-md mx-auto rounded-2xl p-6 border transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
            : 'bg-white/70 border-gray-200 backdrop-blur-sm shadow-xl'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <VenueInfo darkMode={darkMode} />

        <div className="space-y-4">
          <SportSelection
            selectedSport={selectedSport} 
            setSelectedSport={setSelectedSport} 
            darkMode={darkMode} 
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
          />
        </div>

        {/* Continue to Payment Button */}
        <motion.button
          onClick={() => setShowPaymentModal(true)}
          disabled={selectedCourts.length === 0}
          className={`w-full mt-6 p-3 rounded-lg font-bold text-sm transition-all ${
            selectedCourts.length === 0
              ? 'bg-gray-500/50 cursor-not-allowed text-gray-400'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
          }`}
          whileHover={selectedCourts.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedCourts.length > 0 ? { scale: 0.98 } : {}}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Continue to Payment - ₹{calculateTotal()}.00
        </motion.button>
      </motion.div>

      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        darkMode={darkMode}
        totalAmount={calculateTotal()}
      />
    </>
  );
};

export default BookingForm
