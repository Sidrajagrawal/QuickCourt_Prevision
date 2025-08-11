import React, { createContext, useContext, useState } from 'react';

// Create Dark Mode Context
const DarkModeContext = createContext();

// Custom hook to use dark mode
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Dark Mode Provider Component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const value = {
    isDarkMode,
    toggleDarkMode
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

<<<<<<< HEAD
export default DarkModeContext;
=======
export default DarkModeContext;
>>>>>>> 9ea631d33864faa4b3f548c06763c45254995d35
