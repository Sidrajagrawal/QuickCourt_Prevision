import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "../Utils/LocationContext.jsx";
import { useDarkMode } from "../DarkModeContext.jsx";
import { ChevronDown, User, LogOut, MapPin } from "lucide-react"; // Import necessary icons
import { AnimatePresence, motion } from "framer-motion"; // <-- Corrected: Import AnimatePresence and motion

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { findAndFetchNearbyVenues, isLoading } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown menu

  const dropdownRef = useRef(null);

  // Use useEffect to check for an access token on page load
  useEffect(() => {
    const checkUserSession = async () => {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        try {
          const response = await fetch('http://127.0.0.1:8000/accounts/auth/me/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setIsLoggedIn(true);
            setUser(userData);
          } else {
            console.error('Session expired, logging out.');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setIsLoggedIn(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);

  const logout = async () => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (accessToken) {
      try {
        await fetch('http://127.0.0.1:8000/accounts/auth/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/auth'); // Redirect to the login page after logout
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {/* Desktop Navbar Component */}
      <nav
        className={`hidden md:flex items-center justify-between px-6 py-4 shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="text-xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>QUICKCOURT</div>
          
        <div className="flex items-center space-x-6">
         
          

          {loading ? (
            <div className="text-sm font-medium">Loading...</div>
          ) : isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-full  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">Hi, {user.first_name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-xl z-50 origin-top-right ring-1 ring-black ring-opacity-5 ${
                      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                    }`}
                  >
                   

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </button>
                    <button
                      onClick={logout}
                      className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                 
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium cursor-pointer" onClick={() => navigate("/auth")}>Login / Sign Up</span>
            </button>
          )}
              {/* --- NEW: Get Location Button --- */}
                <button
                    onClick={findAndFetchNearbyVenues}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <MapPin className='w-4 h-4  text-green-500' />
                    <span className="font-medium">
                        {location ? "Location Acquired" : "Get My Location"}
                    </span>
                </button>
                {/* --- End of New Button --- */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            {isDarkMode ? "☀️ " : "🌙"}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar Component */}
      <nav
        className={`md:hidden shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-lg font-bold tracking-wide">QUICKCOURT</div>

          <div className="flex items-center gap-2">
            {/* Light/Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="px-4 py-3 border-t border-gray-700 space-y-3">
          {loading ? (
            <div className="text-sm font-medium">Loading...</div>
          ) : isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-800 rounded-lg">
                  <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                  <span className="font-medium">Hi, {user.first_name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Book</span>
                </button>

                <button className="flex items-center space-x-3 w-full px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium cursor-pointer" onClick={() => navigate("/auth")}>Login / Sign Up</span>
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;