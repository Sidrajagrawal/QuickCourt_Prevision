import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target
} from 'lucide-react';
import PlayerCard from './PlayerCard';

const PlayersList = ({ darkMode }) => {
    const [showAll, setShowAll] = useState(false);

    const players = [
    { 
      name: "Sujal kishore kumar", 
      rating: 5, 
      status: "Very very good experienced", 
      isTop: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    { 
      name: "Velvety Dog", 
      rating: 4, 
      status: "Good player", 
      isTop: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    { 
      name: "Adolescence", 
      rating: 5, 
      status: "Experienced player", 
      isTop: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    { 
      name: "Rocket team", 
      rating: 4, 
      status: "Team player", 
      isTop: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    { 
      name: "Rocket team", 
      rating: 3, 
      status: "Learning fast", 
      isTop: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    { 
      name: "Rocket team", 
      rating: 4, 
      status: "Consistent player", 
      isTop: false,
      avatar: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=150&h=150&fit=crop&crop=face"
    }
  ];

    const visiblePlayers = showAll ? players : players.slice(0, 3);

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg md:text-xl font-bold">Players Joined</h3>
            </div>
            {visiblePlayers.map((player, index) => (
                <PlayerCard key={index} player={player} index={index} darkMode={darkMode} />
            ))}

            {players.length > 3 && (
                <div className="pt-2 text-center">
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showAll ? 'Show Less' : 'View More'}
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default PlayersList;