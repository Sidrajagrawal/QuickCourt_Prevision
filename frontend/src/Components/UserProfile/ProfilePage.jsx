import { useState } from "react";
import Sidebar from "./SideBar.jsx";
import EditProfileForm from "./EditProfileForm.jsx";
import BookingsList from "./BookingsList.jsx";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("bookings");

  const userData = {
    name: "Saksham Gupta",
    email: "sakshamgupta@gmail.com",
    phone: "9999999999",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 p-4 md:p-8">
        <motion.div
          className="md:col-span-4 lg:col-span-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={userData} />
        </motion.div>
        <motion.div
          className="md:col-span-8 lg:col-span-9"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {activeTab === "edit" ? (
            <EditProfileForm user={userData} />
          ) : (
            <BookingsList />
          )}
        </motion.div>
      </div>
    </div>
  );
}