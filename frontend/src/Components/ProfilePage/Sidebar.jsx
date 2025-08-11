import PropTypes from "prop-types";
import { useDarkMode } from "../DarkModeContext.jsx";
import ProfilePhoto from "./ProfilePhoto.jsx";

export default function Sidebar({ activeTab, setActiveTab, user }) {
  const { isDarkMode } = useDarkMode();

  return (
    <aside
      className={`rounded-xl border p-4 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <ProfilePhoto editable={activeTab === "edit"} />
      <br></br>
      <h3 className="font-semibold mt-3 text-center">{user.name}</h3>

      {activeTab === "bookings" && (
        <>
          <p className="text-sm text-gray-400 text-center">{user.phone}</p>
          <p className="text-xs text-gray-400 text-center">{user.email}</p>
        </>
      )}

      <nav className="flex flex-col space-y-2 mt-6">
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
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
