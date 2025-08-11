import React, { useState } from "react";
import Navbar from "../navbar/navbar.jsx";
import PopularSports from "./PopularSports.jsx";
import VenueCard from "./VenueCard.jsx";
import heroImage from "../../assets/hero.png"; // replace with your actual hero image path
import { useDarkMode } from "../DarkModeContext.jsx"; // ✅ use global dark mode

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("Ahmedabad");

  const { isDarkMode } = useDarkMode(); // ✅ from context

  const venues = [
    {
      name: "SBR Badminton",
      sport: "Badminton",
      rating: "4.5",
      reviews: "6",
      location: "Vaishnaodevi Clr",
      isTopRated: true,
    },
    {
      name: "Elite Tennis Club",
      sport: "Tennis",
      rating: "4.8",
      reviews: "12",
      location: "SG Highway",
      isTopRated: true,
    },
    {
      name: "Aqua Sports Center",
      sport: "Swimming",
      rating: "4.6",
      reviews: "8",
      location: "Bodakdev",
      isTopRated: true,
    },
    {
      name: "Green Field Arena",
      sport: "Football",
      rating: "4.4",
      reviews: "15",
      location: "Satellite",
      isTopRated: true,
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % venues.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + venues.length) % venues.length);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Navbar handles theme toggle */}
      <Navbar />

      {/* Hero Section */}
      <div className="px-4 md:px-6 py-12 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-20 w-72 h-72 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-800 to-blue-800' 
              : 'bg-gradient-to-br from-purple-200 to-blue-200'
          } rounded-full opacity-20 blur-3xl animate-pulse`} />
          <div className={`absolute bottom-20 left-10 w-96 h-96 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-indigo-800 to-purple-800' 
              : 'bg-gradient-to-br from-indigo-200 to-purple-200'
          } rounded-full opacity-15 blur-3xl`} />
        </div>

        <div className="max-w-lg mx-auto md:mx-0 space-y-8 relative z-10">
          {/* Removed local dark mode toggle button */}
          
          {/* Search Input */}
          <div className="relative group">
            <svg
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-200 ${
                isDarkMode ? 'text-gray-400 group-hover:text-purple-400' : 'text-gray-500 group-hover:text-blue-500'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Search locations in India..."
              className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl transform hover:scale-[1.01] focus:scale-[1.02] ${
                isDarkMode
                  ? 'bg-gray-800/80 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                  : 'bg-white/80 backdrop-blur-sm border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
              } focus:outline-none`}
            />
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FIND PLAYERS &
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VENUES NEARBY
              </span>
            </h1>
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Seamlessly explore sports venues and play with
              <br />
              sports enthusiasts just like you!
            </p>
          </div>
        </div>

        {/* Hero Image for Desktop */}
        <div className={`hidden md:block absolute right-6 top-20 w-96 h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 ${
          isDarkMode ? 'border-2 border-gray-600' : 'border-2 border-white/50'
        }`}>
          <div className={`w-full h-full relative ${
            isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
          }`}>
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={`w-full h-full ${
              isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
            } hidden items-center justify-center text-lg font-medium`}>
              Preview Image
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Badge */}
      <div className="md:hidden px-4 mb-8">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-emerald-400 hover:to-green-400">
            Joyful Yak
          </div>
        </div>
      </div>

      {/* Venues Section */}
      <div className="px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Book Venues
          </h2>
          <button className={`transition-all duration-300 text-sm flex items-center space-x-2 font-semibold hover:scale-105 ${
            isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}>
            <span>See all venues</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
          {venues.map((venue, index) => (
            <VenueCard
              key={index}
              venue={venue}
              showBadge={index === 1}
              badgeText="Joyful Yak"
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-12">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {venues.map((venue, index) => (
                <div key={index} className="w-full flex-shrink-0 px-3">
                  <VenueCard
                    venue={venue}
                    showBadge={index === 1}
                    badgeText="Big Penguin"
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Carousel Controls */}
          <div className="flex justify-center items-center space-x-8 mt-10">
            <button
              onClick={prevSlide}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800/80 backdrop-blur-sm border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white'
                  : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            
            <div className="flex space-x-3">
              {venues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg'
                      : `w-3 h-3 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                isDarkMode
                  ? 'bg-gray-800/80 backdrop-blur-sm border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white'
                  : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Popular Sports */}
      <PopularSports isDarkMode={isDarkMode} />

      {/* Enhanced Footer */}
      <footer className={`text-center py-12 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 text-2xl mb-4">
            <span className="animate-bounce">🏸</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⚽</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🏊</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎾</span>
          </div>
          <p className="text-lg font-medium">Made with ❤️ for Sports Enthusiasts</p>
          <div className={`h-px w-32 mx-auto ${
            isDarkMode ? 'bg-gradient-to-r from-transparent via-gray-600 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'
          }`} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
