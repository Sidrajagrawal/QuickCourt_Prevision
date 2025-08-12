
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


const BackgroundEffects = ({ darkMode }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
        darkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
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
        darkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
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
);


export default BackgroundEffects