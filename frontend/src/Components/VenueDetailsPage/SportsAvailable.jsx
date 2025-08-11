import React, { useState } from 'react';
import { motion} from 'framer-motion';
import {
    Trophy,
    Target,
    Zap

} from 'lucide-react';
import SportsCard from './SportsCard';


const SportsAvailable = ({ darkMode }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState(null);

  const sports = [
    {
      id: 'badminton',
      name: 'Badminton',
      icon: Trophy,
      courtType: 'Badminton Standard Synthetic',
      pricing: [
        {
          period: 'Monday - Friday',
          slots: [
            { rate: 'INR 500.0 / hour', time: '05:00 AM - 07:00 AM' },
            { rate: 'INR 500.0 / hour', time: '04:00 PM - 10:00 PM' }
          ]
        },
        {
          period: 'Saturday - Sunday',
          slots: [
            { rate: 'INR 500.0 / hour', time: '05:00 AM - 10:00 PM' }
          ]
        },
        {
          period: 'Holiday(s)',
          slots: [
            { rate: 'INR 500.0 / hour', time: '05:00 AM - 10:00 PM' }
          ]
        }
      ]
    },
    {
      id: 'table-tennis',
      name: 'Table Tennis',
      icon: Target,
      courtType: 'Table Tennis Premium',
      pricing: [
        {
          period: 'Monday - Friday',
          slots: [
            { rate: 'INR 300.0 / hour', time: '05:00 AM - 07:00 AM' },
            { rate: 'INR 350.0 / hour', time: '04:00 PM - 10:00 PM' }
          ]
        },
        {
          period: 'Saturday - Sunday',
          slots: [
            { rate: 'INR 400.0 / hour', time: '05:00 AM - 10:00 PM' }
          ]
        }
      ]
    },
    {
      id: 'box-cricket',
      name: 'Box Cricket',
      icon: Zap,
      courtType: 'Box Cricket Arena',
      pricing: [
        {
          period: 'Monday - Friday',
          slots: [
            { rate: 'INR 800.0 / hour', time: '06:00 AM - 08:00 AM' },
            { rate: 'INR 1000.0 / hour', time: '05:00 PM - 11:00 PM' }
          ]
        },
        {
          period: 'Saturday - Sunday',
          slots: [
            { rate: 'INR 1200.0 / hour', time: '06:00 AM - 11:00 PM' }
          ]
        }
      ]
    }
  ];

  const handleSportHover = (sport) => {
    setPopoverData(sport);
    setShowPopover(true);
  };

  const handlePopoverLeave = () => {
    setShowPopover(false);
    setPopoverData(null);
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Sports Available</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          (Click on sports to view price chart)
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {sports.map((sport, index) => (
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

export default SportsAvailable
