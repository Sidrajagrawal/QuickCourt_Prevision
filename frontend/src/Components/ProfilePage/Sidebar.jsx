import react from "react";
import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { isDarkMode } = useDarkMode();

  return (
    <aside
      className={`rounded-xl border p-4 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* User Info */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-500 mb-3" />
        <h3 className="font-semibold">Mitchell Admin</h3>
        <p className="text-sm text-gray-400">9999999999</p>
        <p className="text-xs text-gray-400">mitchelladmin2187@gmail.com</p>
      </div>

      {/* Nav Buttons */}
      <nav className="flex flex-col space-y-2">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 rounded-lg text-left font-medium ${
            activeTab === "edit"
              ? "bg-green-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded-lg text-left font-medium ${
            activeTab === "bookings"
              ? "bg-green-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Bookings
        </button>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
