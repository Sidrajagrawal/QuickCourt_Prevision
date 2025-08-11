import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home.jsx";
import VenuesPage from "./Components/venuespage/VenuePage.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import { DarkModeProvider } from "./Components/DarkModeContext.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
