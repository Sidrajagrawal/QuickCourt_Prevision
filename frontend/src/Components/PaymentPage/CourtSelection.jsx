import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  ChevronDown,
  Plus,
  Minus,
  X,
  CreditCard,
  Smartphone,
  Building,
  Shield,
  Sun,
  Moon
} from 'lucide-react';
import FormField from './FormField';

const CourtSelection = ({ selectedCourts, setSelectedCourts, darkMode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const availableCourts = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Court A', 'Court B'];

  const toggleCourt = (court) => {
    setSelectedCourts(prev => 
      prev.includes(court) 
        ? prev.filter(c => c !== court)
        : [...prev, court]
    );
  };

  return (
    <FormField label="Court" delay={0.7}>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
            darkMode
              ? 'bg-gray-700 border-gray-600 hover:border-blue-500'
              : 'bg-white border-gray-300 hover:border-blue-500'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>
              {selectedCourts.length === 0 
                ? '--Select Court--' 
                : `${selectedCourts.length} courts selected`
              }
            </span>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </div>
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              className={`absolute top-full left-0 right-0 mt-1 rounded-lg border z-10 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-300'
              } shadow-lg`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="p-3 space-y-2 max-h-36 overflow-y-auto">
                {availableCourts.map(court => (
                  <label key={court} className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCourts.includes(court)}
                      onChange={() => toggleCourt(court)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>{court}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Courts Display */}
      {selectedCourts.length > 0 && (
        <motion.div 
          className="mt-2 flex flex-wrap gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selectedCourts.map(court => (
            <span
              key={court}
              className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                darkMode
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}
            >
              <span>{court}</span>
              <button
                onClick={() => toggleCourt(court)}
                className="hover:bg-red-500/20 rounded-full p-0.5"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </motion.div>
      )}
    </FormField>
  );
};

export default CourtSelection

