import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X
} from 'lucide-react';

const SportsCard = ({ sport, index, darkMode, onHover, onLeave, showPopover, popoverData }) => {
  const IconComponent = sport.icon;
  
  return (
    <div className="relative">
      <motion.div
        className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
            : 'bg-white/50 border-gray-200 hover:bg-white/70'
        }`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        onMouseEnter={() => onHover(sport)}
        onMouseLeave={onLeave}
      >
        <div className="text-center">
          <motion.div
            className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="w-6 h-6 text-blue-500" />
          </motion.div>
          <h3 className="font-semibold text-sm">{sport.name}</h3>
        </div>
      </motion.div>

      {/* Popover */}
      <AnimatePresence>
        {showPopover && popoverData?.id === sport.id && (
          <motion.div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 rounded-xl border shadow-xl z-50 ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{sport.name}</h3>
                <button
                  onClick={onLeave}
                  className={`p-1 rounded-lg ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Pricing is subjected to change and is controlled by venue
              </p>

              <div className="space-y-3">
                <div className="font-semibold">{sport.courtType}</div>
                
                {sport.pricing.map((price, idx) => (
                  <div key={idx}>
                    <div className="font-medium text-sm mb-2">{price.period}</div>
                    {price.slots.map((slot, slotIdx) => (
                      <div key={slotIdx} className="flex justify-between items-center py-1">
                        <span className="text-sm">{slot.rate}</span>
                        <span className="text-sm font-medium">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default SportsCard
