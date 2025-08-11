import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home.jsx"; // ✅ Correct path & name
import { DarkModeProvider } from "./Components/DarkModeContext.jsx";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
