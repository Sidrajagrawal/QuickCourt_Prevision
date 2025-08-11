import PropTypes from "prop-types";
import ProfilePhoto from "./ProfilePhoto.jsx";
import { User, CalendarDays } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, user }) {
  const commonButtonStyles = "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200";
  const activeStyles = "bg-orange-500 text-white shadow-lg";
  const inactiveStyles = "bg-gray-100 hover:bg-gray-200 text-gray-700";

  return (
    <aside className="rounded-2xl p-6 shadow-sm bg-white border border-gray-200">
      <ProfilePhoto editable={activeTab === "edit"} />
      <div className="text-center mt-4">
        <h3 className="font-bold text-xl text-gray-900">{user.name}</h3>
        {activeTab === "bookings" && (
          <>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </>
        )}
      </div>

      <nav className="flex flex-col space-y-3 mt-8">
        <button
          onClick={() => setActiveTab("edit")}
          className={`${commonButtonStyles} ${activeTab === "edit" ? activeStyles : inactiveStyles}`}
        >
          <User size={20} />
          <span>Edit Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`${commonButtonStyles} ${activeTab === "bookings" ? activeStyles : inactiveStyles}`}
        >
          <CalendarDays size={20} />
          <span>All Bookings</span>
        </button>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};