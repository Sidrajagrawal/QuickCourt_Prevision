
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


const Header = ({ darkMode, toggleDarkMode }) => (
  <motion.header 
    className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
    }`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Court Booking
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-white hover:bg-gray-100 shadow-lg'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>
    </div>
  </motion.header>
);


export default Header
