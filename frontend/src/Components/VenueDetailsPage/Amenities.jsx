import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Car,
    Coffee,
    Shield,
    Wind,
    Sofa,
    Wifi,
    BookOpen,
    X,
    Check
} from 'lucide-react';


const Amenities = ({ darkMode }) => {
    const [showAll, setShowAll] = useState(false);

    const amenities = [
        { name: 'Parking', icon: Car, available: true },
        { name: 'Restroom', icon: Car, available: true },
        { name: 'Refreshments', icon: Coffee, available: true },
        { name: 'CCTV Surveillance', icon: Shield, available: true },
        { name: 'Centrally Air Conditioned Hall', icon: Wind, available: true },
        { name: 'Seating Arrangement', icon: Sofa, available: true },
        { name: 'WiFi', icon: Wifi, available: true },
        { name: 'Library', icon: BookOpen, available: true }
    ];

    const visibleAmenities = showAll ? amenities : amenities.slice(0, 4);

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h3 className="text-lg md:text-xl font-bold mb-6">Amenities</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visibleAmenities.map((amenity, index) => {
                    const IconComponent = amenity.icon;
                    return (
                        <motion.div
                            key={amenity.name}
                            className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/30' : 'bg-white/30'
                                }`}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={`p-2 rounded-lg ${amenity.available
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-gray-500/20 text-gray-500'
                                }`}>
                                {amenity.available ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <X className="w-4 h-4" />
                                )}
                            </div>
                            <IconComponent className="w-5 h-5" />
                            <span className="text-xs md:text-sm font-medium">{amenity.name}</span>
                        </motion.div>
                    );
                })}
            </div>

            {amenities.length > 4 && (
                <div className="mt-6 text-center">
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


export default Amenities;