
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


const TimeSelection = ({ startTime, setStartTime, darkMode }) => (
  <FormField label="Start Time" delay={0.5}>
    <div className="relative">
      <input
        type="time"
        value="13:00"
        onChange={(e) => setStartTime(e.target.value)}
        className={`w-full p-3 rounded-lg border transition-all text-sm ${
          darkMode
            ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
            : 'bg-white border-gray-300 focus:border-blue-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      />
      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60" />
    </div>
  </FormField>
);

export default TimeSelection
