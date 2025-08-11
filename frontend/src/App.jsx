import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home.jsx"; // ✅ Correct path & name
import VenuesPage from "./Components/venuespage/VenuePage.jsx";
import { DarkModeProvider } from "./Components/DarkModeContext.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<VenuesPage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
