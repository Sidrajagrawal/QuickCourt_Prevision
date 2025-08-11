import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star,   
  MapPinIcon,
  Navigation
} from 'lucide-react';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types"; // Import PropTypes

const VenueDetailsCard = ({ venue, darkMode }) => {
  const navigate = useNavigate();
  
  // Use venue data from props
  const { name, rating, reviews, location, city, pricePerHour } = venue;
  const venueAddress = `${location}, ${city}`;

  const handleBookVenue = () => {
    console.log('Navigating to /payments');
    navigate('/payments', { state: { venue } }); // Pass the venue data to the payment page
  };

  const handleGetDirections = () => {
    // This is a placeholder, a real app would use the specific address
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;
    window.open(url, '_blank');
  };

  // Coordinates for a general location (e.g., center of Ahmedabad)
  const venuePosition = {
    lat: 23.0225,
    lng: 72.5714
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Venue Title and Rating */}
      <motion.div
        className={`rounded-2xl p-6 backdrop-blur-lg border ${
          darkMode
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          {/* Display dynamic venue name */}
          <h1 className="text-3xl font-bold">{name}</h1> 
          <motion.div
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {/* You had a hardcoded name here, which might be a venue type or a badge */}
            {/* Assuming it was a type, you can use venue.type */}
            Joyful Whale 
          </motion.div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            {/* Display dynamic venue address/location */}
            <span className="text-sm">{location}, {city}</span> 
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            {/* Display dynamic rating and reviews */}
            <span className="font-semibold">{rating}</span> 
            <span className="text-sm opacity-75">({reviews})</span> 
          </div>
        </div>

        {/* Book This Venue Button */}
        <motion.button
          onClick={handleBookVenue}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book This Venue
        </motion.button>
      </motion.div>

      {/* Operating Hours */}
      <motion.div
        className={`rounded-2xl p-6 backdrop-blur-lg border ${
          darkMode
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Operating Hours</h3>
        </div>
        <p className="text-2xl font-bold">7:00AM - 11:00PM</p>
      </motion.div>

      {/* Address with Enhanced Map */}
      <motion.div
        className={`rounded-2xl p-6 backdrop-blur-lg border ${
          darkMode
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold">Address</h3>
          </div>
          <motion.button
            onClick={handleGetDirections}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
              darkMode 
                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="w-4 h-4" />
            Directions
          </motion.button>
        </div>
        
        {/* Display dynamic address */}
        <p className="text-sm leading-relaxed mb-4">
          {venueAddress}
        </p>
        
        {/* Enhanced Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="overflow-hidden rounded-xl"
        >
          {/* This Map component needs to be enhanced to work with the venue prop, if it needs to display a specific location */}
          {/* For now, it uses a generic coordinate. You would need to add coordinates to your venue data for this to be dynamic. */}
          
          <Map 
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            position={venuePosition}
            darkMode={darkMode}
            height="200px"
          />
         
          
        </motion.div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-4">
          <motion.button
            onClick={() => window.open(`tel:+911234567890`)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              darkMode 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📞 Call
          </motion.button>
          <motion.button
            onClick={() => window.open(`https://wa.me/911234567890`)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              darkMode 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💬 WhatsApp
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

VenueDetailsCard.propTypes = {
  venue: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default VenueDetailsCard;