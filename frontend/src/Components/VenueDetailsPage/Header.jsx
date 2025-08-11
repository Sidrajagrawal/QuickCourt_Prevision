import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Heart,
    Share2,
    Sun,
    Moon,
    MapPin // Add MapPin icon
} from 'lucide-react';
import { useLocation } from '../../utils/LocationContext'; 

const Header = ({ darkMode, toggleDarkMode }) => {
    // Use the hook to get location data and the request function
    const { location, permissionStatus, requestLocation } = useLocation();

    return (
        <motion.header
            // ... (your existing header styles and animations)
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* ... (your existing left side) */}

                <div className="flex items-center gap-3">
                    {/* --- NEW LOCATION BUTTON --- */}
                    <motion.button
                        onClick={requestLocation} // Request location on click
                        className={`p-2 rounded-lg flex items-center gap-2 ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={permissionStatus === 'granted'} // Disable if we already have location
                    >
                        <MapPin className={`w-5 h-5 ${location ? 'text-green-500' : ''}`} />
                        <span className="text-sm">
                            {permissionStatus === 'granted' ? 'Location On' : 'Get Location'}
                        </span>
                    </motion.button>

                    {/* ... (your other buttons: Heart, Share, Theme) */}
                </div>
            </div>
            {/* You can optionally display the coordinates for debugging */}
            {location && (
                 <div className="text-center text-xs pt-2">
                     Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                 </div>
            )}
        </motion.header>
    );
};

export default Header;