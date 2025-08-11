import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

import VenueDetails from "./Components/VenueDetailsPage/VenueDetails";
import CourtBooking from "./Components/PaymentPage/CourtBooking";

import { DarkModeProvider } from "./Components/DarkModeContext";
import Home from "./Components/Home/home";
import MainDashboard from "./Components/FacilitatorDash/MainDashboard";
import ProfilePage from "./Components/UserProfile/ProfilePage";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/venueDetails" element={<VenueDetails/>} />
          <Route path="/payments" element = {<CourtBooking/>} />
          <Route path="/dash" element = {<MainDashboard/>} />
          <Route path="/user" element = {<ProfilePage/>} />


        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
