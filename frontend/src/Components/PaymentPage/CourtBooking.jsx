import React, { useState, createContext, useContext } from 'react';
import Header from './Header';
import BookingForm from './BookingForm';
import BackgroundEffects from './BackGround';

const ThemeContext = createContext();
const CourtBooking = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen flex flex-col transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
      }`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <BookingForm darkMode={darkMode} />
        </main>

        <BackgroundEffects darkMode={darkMode} />
      </div>
    </ThemeContext.Provider>
  );
};

export default CourtBooking;
