
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


const SportSelection = ({ selectedSport, setSelectedSport, darkMode }) => {
  const sports = ['Badminton', 'Tennis', 'Basketball', 'Volleyball'];
  
  return (
    <FormField label="Sport" delay={0.3}>
      <div className="relative">
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className={`w-full p-3 rounded-lg border transition-all text-sm ${
            darkMode
              ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
              : 'bg-white border-gray-300 focus:border-blue-500'
          } appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        >
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60" />
      </div>
    </FormField>
  );
};


export default SportSelection

