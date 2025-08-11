import FormField from './FormField';

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

const DurationControl = ({ duration, setDuration, darkMode }) => (
  <FormField label="Duration" delay={0.6}>
    <div className={`flex items-center justify-between p-3 rounded-lg border ${
      darkMode
        ? 'bg-gray-700 border-gray-600'
        : 'bg-white border-gray-300'
    }`}>
      <motion.button
        onClick={() => duration > 1 && setDuration(duration - 1)}
        className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors disabled:opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={duration <= 1}
      >
        <Minus className="w-3 h-3" />
      </motion.button>
      <span className="text-lg font-bold">{duration} Hr</span>
      <motion.button
        onClick={() => setDuration(duration + 1)}
        className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-3 h-3" />
      </motion.button>
    </div>
  </FormField>
);

export default DurationControl
