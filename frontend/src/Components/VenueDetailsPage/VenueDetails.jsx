import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users
} from 'lucide-react';
import PlayersList from './PlayerList';
import Header from './Header';
import SportsAvailable from './SportsAvailable';
import Amenities from './Amenities';
import VenueDetailsCard from './VenueDetailsCard';
import ImageCarousel from './ImageCarousel';

const ThemeContext = React.createContext();

const VenueDetails = () => {
  const [darkMode, setDarkMode] = useState(true);

   const [venue] = useState({
        name: "Joyful Whale",
        location: {
            address: "Bay Area, San Francisco",
            coordinates: { lat: 37.7749, lng: -122.4194 } // Example coordinates for the Bay Area
        },
        // ... other venue data
    });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <motion.div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Image Carousel and Venue Details */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ImageCarousel darkMode={darkMode} />
              <VenueDetailsCard darkMode={darkMode} venue={venue}/>
            </motion.div>

            {/* Right Side - Sports, Amenities and Players */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SportsAvailable darkMode={darkMode} />
              <Amenities darkMode={darkMode} />
              <PlayersList darkMode={darkMode} />
            </motion.div>
          </div>
        </main>

        {/* Floating Action Button */}
        <motion.button
          className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
            darkMode
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800'
          } text-white`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
        >
          <Users className="w-6 h-6" />
        </motion.button>

        {/* Background Effects */}
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
      </motion.div>
    </ThemeContext.Provider>
  );
};

export default VenueDetails;
