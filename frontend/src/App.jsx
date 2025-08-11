import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import BackAuth from './Components/Auth/BackAuth.jsx'

function App() {
  return (
     <Router>
        <Routes>
          <Route path="/auth" element={<BackAuth />} />
        </Routes>
      </Router>
  )
}

export default App
