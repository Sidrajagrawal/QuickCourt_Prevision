import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './Components/Home'

function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
  )
}

export default App
