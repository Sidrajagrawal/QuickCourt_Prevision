// src/components/VenueDetails/ImageCarousel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const ImageCarousel = ({ photos = [], videos = [], darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    ...photos.map((url) => ({ type: 'image', content: 'Venue Photo', url })),
    ...videos.map((url) => ({ type: 'video', content: 'Venue Video', url }))
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) {
    return (
      <div className={`rounded-2xl p-6 text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
        No media available
      </div>
    );
  }

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
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
            {slides[currentSlide].type === 'image' ? (
              <img src={slides[currentSlide].url} alt={slides[currentSlide].content} className="w-full h-full object-cover" />
            ) : (
              <video src={slides[currentSlide].url} controls className="w-full h-full object-cover" />
            )}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-semibold">{slides[currentSlide].content}</p>
            </div>
            {slides[currentSlide].type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav Buttons */}
        <motion.button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white">
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ImageCarousel;
