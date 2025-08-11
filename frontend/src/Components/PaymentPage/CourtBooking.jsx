import React, { useState, createContext, useContext } from 'react';
import Navbar from '../Navabr/Navbar.jsx'
import BookingForm from './BookingForm';
import BackgroundEffects from './BackGround';
import { useDarkMode } from "../DarkModeContext.jsx";

const ThemeContext = createContext();

const CourtBooking = () => {
  const { isDarkMode,setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={`min-h-screen flex flex-col transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
      }`}>

        <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center p-4">
          <BookingForm darkMode={isDarkMode} />
        </main>

        <BackgroundEffects darkMode={isDarkMode} />
      </div>
    </ThemeContext.Provider>
  );
};

export default CourtBooking;
