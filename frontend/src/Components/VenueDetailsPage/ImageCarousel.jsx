
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';

const ImageCarousel = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { 
      type: 'image', 
      content: 'Badminton Court View 1', 
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    },
    { 
      type: 'image', 
      content: 'Professional Badminton Court', 
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    },
    { 
      type: 'video', 
      content: 'Court Tour Video', 
      url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop'
    },
    { 
      type: 'image', 
      content: 'Facility Overview', 
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    },
    { 
      type: 'image', 
      content: 'Equipment Display', 
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden border ${
        darkMode
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/50 border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Carousel */}
      <div className="relative h-80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={slides[currentSlide].url}
              alt={slides[currentSlide].content}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-semibold">{slides[currentSlide].content}</p>
            </div>

            {/* Video Play Button */}
            {slides[currentSlide].type === 'video' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.1, bg: 'white/30' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>

        
      </div>
    </motion.div>
  );
};



export default ImageCarousel
