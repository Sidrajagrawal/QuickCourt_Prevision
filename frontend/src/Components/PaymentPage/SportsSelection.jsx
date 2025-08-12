import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SportSelection = ({ selectedSport, setSelectedSport, darkMode, availableSports = [] }) => {
  // Use venue's sports or fallback to common sports
  const sports = availableSports.length > 0 ? availableSports : ['Badminton', 'Tennis', 'Basketball'];
  
  // Ensure selected sport is valid, if not set to first available sport
  React.useEffect(() => {
    if (sports.length > 0 && !sports.includes(selectedSport)) {
      setSelectedSport(sports[0]);
    }
  }, [sports, selectedSport, setSelectedSport]);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <label className={`block text-sm font-medium ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        Select Sport *
      </label>
      
      <div className="relative">
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className={`w-full p-3 rounded-lg border transition-all duration-200 appearance-none cursor-pointer ${
            darkMode
              ? 'bg-gray-700/50 border-gray-600 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
              : 'bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          } focus:outline-none`}
        >
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        
        <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
      </div>
      
      {/* Show available sports count */}
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {sports.length} sport{sports.length !== 1 ? 's' : ''} available at this venue
      </p>
      
      {/* Show sports as pills for better UX */}
      <div className="flex flex-wrap gap-2 mt-2">
        {sports.map((sport) => (
          <motion.button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
              selectedSport === sport
                ? darkMode
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-blue-500 border-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600/30'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sport}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SportSelection;