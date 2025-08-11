import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {Users} from 'lucide-react';
import PlayersList from './PlayerList';
import Navbar from '../Navabr/Navbar.jsx'
import SportsAvailable from './SportsAvailable';
import Amenities from './Amenities';
import VenueDetailsCard from './VenueDetailsCard';
import ImageCarousel from './ImageCarousel';
import { useDarkMode } from "../DarkModeContext.jsx";


const VenueDetails = () => {
    const { isDarkMode } = useDarkMode();
    const location = useLocation();

    const venue = location.state?.venue; // Safely access the venue object

    if (!venue) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">Venue not found or could not be loaded.</h1>
            </div>
        );
    }

    return (
        <motion.div
            className={`min-h-screen transition-all duration-500 ${
                isDarkMode
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
                    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Side - Image Carousel and Venue Details */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ImageCarousel />
                        <VenueDetailsCard venue={venue} /> {/* Pass the received venue object */}
                    </motion.div>

                    {/* Right Side - Sports, Amenities and Players */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SportsAvailable />
                        <Amenities />
                        <PlayersList />
                    </motion.div>
                </div>
            </main>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
                        isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
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
                        isDarkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
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
    );
};

export default VenueDetails;