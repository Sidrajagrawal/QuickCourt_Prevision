import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import BackAuth from './Components/Auth/BackAuth.jsx'
import Home from "./Components/Home/Home.jsx";
import VenuesPage from "./Components/VenuePage/VenuePage.jsx";
import { DarkModeProvider } from "./Components/DarkModeContext.jsx";
import CourtBooking from "./Components/PaymentPage/CourtBooking.jsx";
import VenueDetails from "./Components/VenueDetailsPage/VenueDetails.jsx";

function App() {
  return (
     <DarkModeProvider>
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<BackAuth />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venueDetails" element={<VenueDetails/>} />
          <Route path="/payments" element = {<CourtBooking/>} />
        </Routes>
      </Router>
      </DarkModeProvider>
  )
}

export default App;
