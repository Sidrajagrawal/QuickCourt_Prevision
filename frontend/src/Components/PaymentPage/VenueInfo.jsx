
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


const VenueInfo = ({ darkMode }) => (
  <motion.div 
    className="mb-6 text-center"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <h2 className="text-2xl font-bold mb-2">SBR Badminton</h2>
    <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
      <div className="flex items-center">
        <MapPin className="w-4 h-4 mr-1 text-red-500" />
        Satellite, Jodhpur Village
      </div>
      <div className="flex items-center">
        <Star className="w-4 h-4 mr-1 text-yellow-500" />
        4.5 (6)
      </div>
    </div>
  </motion.div>
);

export default VenueInfo
