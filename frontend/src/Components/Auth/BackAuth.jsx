import React, { useState, useEffect } from 'react'
import Auth from './Auth.jsx'
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Map, Calendar, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackAuth = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const navigate = useNavigate();

    const cards = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Find Nearby Venues",
            description: "Browse top-rated sports facilities in your area with detailed info and photos",
            gradient: "from-[#242627] to-[#242627]",
            iconBg: "from-gray-400/30 to-gray-500/30"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Real-Time Slot Booking",
            description: "Check live court availability and reserve your preferred time instantly",
            gradient: "from-[#242627] to-[#242627]",
            iconBg: "from-gray-400/30 to-gray-500/30"
        },
        {
            icon: <Map className="w-8 h-8" />,
            title: "Location-Based Search",
            description: "Quickly find courts and facilities closest to you using integrated maps",
            gradient: "from-[#242627] to-[#242627]",
            iconBg: "from-gray-400/30 to-gray-500/30"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Track Your Bookings",
            description: "View, manage, and cancel your upcoming or past reservations with ease",
            gradient: "from-[#242627] to-[#242627]",
            iconBg: "from-gray-400/30 to-gray-500/30"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Ratings & Reviews",
            description: "Read and share experiences to choose the best venues for your game",
            gradient: "from-[#242627] to-[#242627]",
            iconBg: "from-gray-400/30 to-gray-500/30"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % cards.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [cards.length])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    }

    const backgroundVariants = {
        animate: {
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }
        }
    }

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] flex overflow-hidden'>
            {/* Left Panel - Cards Section with proper containment */}
            <motion.div 
                className="hidden md:block cardMainDiv w-[55%] h-full relative overflow-hidden z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Animated background elements with Framer Motion */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                        variants={backgroundVariants}
                        animate="animate"
                    />
                    <motion.div 
                        className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                        variants={backgroundVariants}
                        animate="animate"
                        transition={{ delay: 5 }}
                    />
                    <motion.div 
                        className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
                        variants={backgroundVariants}
                        animate="animate"
                        transition={{ delay: 10 }}
                    />
                </div>

                <motion.div 
                    className="Card-logo w-full h-[10%] flex relative z-20"
                    variants={itemVariants}
                >
                    <motion.div 
                        className='text-[18px] text-[#85AACC] cursor-pointer mt-6 ml-8 hover:text-amber-50 transition-colors duration-300' 
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Home
                    </motion.div>
                    <div className="text-2xl font-bold text-white flex w-full justify-center items-center space-x-2">
                        <motion.div 
                            className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 360,
                                transition: { duration: 0.5 }
                            }}
                        >
                            <span className="text-white text-xl">✓</span>
                        </motion.div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            QuickCourt
                        </motion.span>
                    </div>
                </motion.div>

                <motion.div 
                    className="Card-Main-title w-full h-[25%] text-white mt-8 relative z-20"
                    variants={itemVariants}
                >
                    <motion.div 
                        className='text-center text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Your Game, Your Court, Your Time!
                    </motion.div>
                    <motion.div 
                        className='text-center mt-4 text-gray-300 text-lg px-8'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        Find, reserve, and play at the best local sports venues in just a few clicks.
                    </motion.div>
                </motion.div>

                {/* Cards section with proper clipping */}
                <motion.div 
                    className="cards w-full h-[65%] flex items-center justify-center relative z-20 px-8 overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="relative w-full max-w-md overflow-hidden">
                        {/* Cards container with isolation and proper perspective for 3D effect */}
                        <div className="relative h-64 overflow-hidden" style={{ 
                            perspective: '1000px',
                            perspectiveOrigin: 'center center',
                            isolation: 'isolate'
                        }}>
                            <AnimatePresence mode="wait">
                                {cards.map((card, index) => {
                                    const isActive = index === currentCard
                                    const isPrev = index === (currentCard - 1 + cards.length) % cards.length
                                    const isNext = index === (currentCard + 1) % cards.length

                                    let x = 100;
                                    let rotateY = 45;
                                    let scale = 0.8;
                                    let opacity = 0;
                                    let zIndex = 1;

                                    if (isActive) {
                                        x = 0;
                                        rotateY = 0;
                                        scale = 1;
                                        opacity = 1;
                                        zIndex = 5;
                                    } else if (isPrev) {
                                        x = -90;
                                        rotateY = -45;
                                        scale = 0.8;
                                        opacity = 0.3;
                                        zIndex = 3;
                                    } else if (isNext) {
                                        x = 90;
                                        rotateY = 45;
                                        scale = 0.8;
                                        opacity = 0.3;
                                        zIndex = 3;
                                    }

                                    return (
                                        <motion.div
                                            key={index}
                                            className="absolute inset-0"
                                            initial={{ 
                                                x: '100%', 
                                                rotateY: 45, 
                                                scale: 0.8, 
                                                opacity: 0 
                                            }}
                                            animate={{
                                                x: `${x}%`,
                                                rotateY,
                                                scale,
                                                opacity,
                                                zIndex
                                            }}
                                            transition={{
                                                type: "spring",
                                                damping: 25,
                                                stiffness: 120,
                                                duration: 1
                                            }}
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <motion.div 
                                                className={`w-full h-full bg-gradient-to-br ${card.gradient} backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl`}
                                                whileHover={isActive ? { 
                                                    scale: 1.02,
                                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                                } : {}}
                                            >
                                                <div className="flex flex-col items-center text-center h-full">
                                                    {/* Icon with glass effect */}
                                                    <motion.div 
                                                        className={`w-16 h-16 bg-gradient-to-r ${card.iconBg} backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white`}
                                                        whileHover={{ 
                                                            scale: 1.1,
                                                            rotate: [0, -10, 10, 0],
                                                            transition: { duration: 0.5 }
                                                        }}
                                                    >
                                                        {card.icon}
                                                    </motion.div>

                                                    {/* Title */}
                                                    <motion.h3 
                                                        className="text-xl font-bold text-white mb-3 leading-tight"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        {card.title}
                                                    </motion.h3>

                                                    {/* Description */}
                                                    <motion.p 
                                                        className="text-gray-200 text-sm leading-relaxed flex-1 flex items-center"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.4 }}
                                                    >
                                                        {card.description}
                                                    </motion.p>

                                                    {/* Decorative element */}
                                                    <motion.div 
                                                        className="mt-4 flex space-x-2"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.6 }}
                                                    >
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="w-2 h-2 bg-white/40 rounded-full"
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [0.4, 0.8, 0.4]
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: Infinity,
                                                                    delay: i * 0.3
                                                                }}
                                                            />
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Progress indicators */}
                        <motion.div 
                            className="flex justify-center mt-8 space-x-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                        >
                            {cards.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentCard(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentCard
                                        ? 'bg-white shadow-lg'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        scale: index === currentCard ? 1.25 : 1,
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Feature stats */}
                        <motion.div 
                            className="mt-8 flex justify-center space-x-8 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, staggerChildren: 0.1 }}
                        >
                            {[
                                { value: "50+", label: "Sports Venues" },
                                { value: "24/7", label: "Booking Access" },
                                { value: "10+", label: "Sports Types" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ 
                                        scale: 1.05,
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 + index * 0.1 }}
                                >
                                    <motion.div 
                                        className="text-2xl font-bold text-white"
                                        whileHover={{
                                            color: index === 0 ? "#06b6d4" : index === 1 ? "#10b981" : "#8b5cf6"
                                        }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Panel - Auth Section with higher z-index */}
            <motion.div 
                className="auth w-full md:w-[45%] h-full bg-white md:rounded-l-4xl relative z-30 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 120,
                    delay: 0.5
                }}
            >
                <Auth />
            </motion.div>
        </div>
    )
}

export default BackAuth