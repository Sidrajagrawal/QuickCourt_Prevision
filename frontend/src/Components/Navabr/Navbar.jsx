  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";
  import { useDarkMode } from "../DarkModeContext.jsx";


  const DesktopNavbar = () => {
    const navigate = useNavigate();
    
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
      <nav
        className={`hidden md:flex items-center justify-between px-6 py-4 shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="text-xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>QUICKCOURT</div>

        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 bg-gray-800 text-white hover:bg-gray-700">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Book</span>
          </button>

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

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>
    );
  };

  // Mobile Navbar Component
  const MobileNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
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
          </div>
        )}
      </nav>
    );
  };

  const Navbar = () => {
    return (
      <>
        <DesktopNavbar />
        <MobileNavbar />
      </>
    );
  };

  export default Navbar;