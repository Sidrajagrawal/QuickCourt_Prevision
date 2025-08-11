import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import VenueDetails from "./Components/VenueDetailsPage/VenueDetails";
import CourtBooking from "./Components/PaymentPage/CourtBooking";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/venueDetails" element={<VenueDetails/>} />
          <Route path="/payments" element = {<CourtBooking/>} />

        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
