import React, { useState } from "react";
import { useDarkMode } from "../DarkModeContext.jsx";
import { useLocation } from "../../utils/LocationContext"; // 1. Import your location hook
import { MapPin, Calendar, User } from 'lucide-react'; // 2. Import a location icon


// Desktop Navbar Component
const DesktopNavbar = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    // 3. Use the location hook
    const { findAndFetchNearbyVenues, isLoading } = useLocation();

    return (
        <nav
            className={`hidden md:flex items-center justify-between px-6 py-4 shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            <div className="text-xl font-bold tracking-wide">QUICKCOURT</div>

            <div className="flex items-center space-x-6">
                {/* Book Button */}
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 bg-gray-800 text-white hover:bg-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Book</span>
                </button>

                

                {/* Login Button */}
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Login / Sign Up</span>
                </button>
                {/* --- NEW: Get Location Button --- */}
                <button
                    onClick={findAndFetchNearbyVenues}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <MapPin className={`w-4 h-4 ${location ? 'text-green-500' : ''}`} />
                    <span className="font-medium">
                        {location ? "Location Acquired" : "Get My Location"}
                    </span>
                </button>
                {/* --- End of New Button --- */}

                {/* Light/Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                    {isDarkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
};

// Mobile Navbar Component
const MobileNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    // 4. Use the location hook here as well
    const { requestLocation, location, permissionStatus } = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav
            className={`md:hidden shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <div className="text-lg font-bold tracking-wide">QUICKCOURT</div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                        {isDarkMode ? "☀️" : "🌙"}
                    </button>
                    <button
                        onClick={toggleMenu}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {/* ... (your existing menu icon logic) ... */}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="px-4 py-3 border-t border-gray-700 space-y-3">
                    <button className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">Book</span>
                    </button>

                    {/* --- NEW: Get Location Button for Mobile --- */}
                    <button
                        onClick={() => {
                            requestLocation();
                            toggleMenu(); // Close menu after click
                        }}
                        disabled={permissionStatus === 'granted'}
                        className="flex items-center space-x-3 w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                    >
                        <MapPin className={`w-5 h-5 ${location ? 'text-green-500' : ''}`} />
                        <span className="font-medium">
                            {location ? "Location Acquired" : "Get My Location"}
                        </span>
                    </button>
                    {/* --- End of New Button --- */}

                    <button className="flex items-center space-x-3 w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        <User className="w-5 h-5" />
                        <span className="font-medium">Login / Sign Up</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

// Main Navbar that renders both
const Navbar = () => {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    );
};

export default Navbar;