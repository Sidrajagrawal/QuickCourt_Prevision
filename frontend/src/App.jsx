import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkModeContext, { DarkModeProvider } from "./Components/DarkModeContext.jsx"; // Assuming you have this provider
import BackAuth from './Components/Auth/BackAuth.jsx';
import Home from "./Components/Home/Home.jsx";
import VenuesPage from "./Components/VenuePage/VenuePage.jsx";
import CourtBooking from "./Components/PaymentPage/CourtBooking.jsx";
import VenueDetails from "./Components/VenueDetailsPage/VenueDetails.jsx";
import Navbar from "./Components/Navabr/Navbar.jsx";
import './App.css';

// This component will consume the dark mode context and render the main app content.
const AppContent = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<BackAuth />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venue-details" element={<VenueDetails />} />
        <Route path="/payments" element={<CourtBooking />} />
      </Routes>
    </Router>
  );
};

// This is the main App component that provides all contexts.
function App() {
  return (
    <DarkModeProvider>
        <AppContent />
    </DarkModeProvider>
  );
}

export default App;
