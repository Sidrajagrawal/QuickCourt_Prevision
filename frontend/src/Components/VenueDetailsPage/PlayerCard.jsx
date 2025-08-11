import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star,  
  Zap
} from 'lucide-react';
const PlayerCard = ({ player, index, darkMode }) => {
  return (
    <motion.div
      className={`rounded-xl p-4 backdrop-blur-lg border ${
        darkMode
          ? 'bg-gray-800/30 border-gray-700'
          : 'bg-white/30 border-gray-200'
      }`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div 
          className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={player.avatar}
            alt={player.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background with initials if image fails
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className={`w-full h-full absolute inset-0 hidden items-center justify-center font-bold text-white text-sm ${
              player.isTop 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}
          >
            {player.name[0]}
          </div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{player.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(player.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        {player.isTop && (
          <motion.div
            className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Zap className="w-3 h-3" />
            Top Player
          </motion.div>
        )}
      </div>
      <p className="text-sm opacity-75">{player.status}</p>
    </motion.div>
  );
};


export default PlayerCard
