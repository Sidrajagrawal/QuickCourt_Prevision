import react from "react";
import { useState } from "react";
import { useDarkMode } from "../DarkModeContext.jsx";
import Sidebar from "./Sidebar.jsx";
import EditProfileForm from "./EditProfileForm.jsx";
import BookingsList from "./BookingsList.jsx";

export default function ProfilePage() {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("bookings"); // "edit" or "bookings"

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 p-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          {activeTab === "edit" ? <EditProfileForm /> : <BookingsList />}
        </div>
      </div>
    </div>
  );
}
