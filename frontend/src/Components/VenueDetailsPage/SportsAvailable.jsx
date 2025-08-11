// frontend/src/Components/Venue/SportsAvailable.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap } from 'lucide-react';
import SportsCard from './SportsCard';

const SportsAvailable = ({ darkMode, sports = [] }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState(null);

  // Map sport names from API to icons
  const iconMap = {
    Badminton: Trophy,
    Basketball: Target,
    Cricket: Zap,
    // add more mappings here as needed
  };

  // Convert API sports array into the structure SportsCard expects
  const sportsData = sports.map((name, idx) => ({
    id: idx,
    name,
    icon: iconMap[name] || Trophy, // default icon
    courtType: `${name} Court`, // placeholder
    pricing: [
      {
        period: 'Monday - Friday',
        slots: [{ rate: 'Contact for rates', time: '—' }]
      }
    ]
  }));

  const handleSportHover = (sport) => {
    setPopoverData(sport);
    setShowPopover(true);
  };

  const handlePopoverLeave = () => {
    setShowPopover(false);
    setPopoverData(null);
  };

  if (!sports.length) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Sports Available</h3>
        <p className="text-sm opacity-70">No sports information available.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Sports Available</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 text-black">
        {sportsData.map((sport, index) => (
          <SportsCard
            key={sport.id}
            sport={sport}
            index={index}
            darkMode={darkMode}
            onHover={handleSportHover}
            onLeave={handlePopoverLeave}
            showPopover={showPopover}
            popoverData={popoverData}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SportsAvailable;
