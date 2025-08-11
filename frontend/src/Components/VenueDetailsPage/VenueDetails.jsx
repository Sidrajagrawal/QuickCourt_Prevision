// frontend/src/Components/Venue/VenueDetails.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Navabr/Navbar.jsx';
import SportsAvailable from './SportsAvailable';
import Amenities from './Amenities';
import PlayersList from './PlayerList';
import VenueDetailsCard from './VenueDetailsCard';
import ImageCarousel from './ImageCarousel';
import { useDarkMode } from "../DarkModeContext.jsx";


const VenueDetails = () => {
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const params = useParams();

    // Try to get venue from location.state (when clicking from Home)
    const venueFromState = location.state?.venue;
    const venueId = venueFromState?.id || params.id; // support both ways

    const [venue, setVenue] = useState(venueFromState || null);
    const [loading, setLoading] = useState(!venueFromState);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!venue && venueId) {
            setLoading(true);
            fetch(`http://127.0.0.1:8000/api/v1/venues/${venueId}/`)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    setVenue(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching venue:", err);
                    setError("Venue not found or could not be loaded.");
                    setLoading(false);
                });
        }
    }, [venueId, venue]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold">Loading venue details...</h1>
            </div>
        );
    }

    if (error || !venue) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">{error || "Venue not found"}</h1>
            </div>
        );
    }

    return (
        <motion.div
            className={`min-h-screen transition-all duration-500 ${isDarkMode
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
                        <ImageCarousel media={venue.photos_links || []} video={venue.video_link} />
                        <VenueDetailsCard venue={venue} darkMode={isDarkMode} />
                    </motion.div>

                    {/* Right Side - Sports, Amenities and Players */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SportsAvailable darkMode={isDarkMode} sports={venue.sports} />

                        <Amenities darkMode={isDarkMode} amenities={venue.amenities} />

                        <PlayersList />
                    </motion.div>
                </div>
            </main>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
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
                    className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
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
