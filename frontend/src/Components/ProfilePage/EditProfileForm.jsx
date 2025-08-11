import { useState, useEffect } from "react";
import { useDarkMode } from "../DarkModeContext.jsx";
import PropTypes from "prop-types";

export default function EditProfileForm({ name, email }) {
  const { isDarkMode } = useDarkMode();
  const [form, setForm] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  // Prefill when component mounts or props change
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: name || "",
      email: email || "",
    }));
  }, [name, email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert(`Profile updated! Name: ${form.name}, Email: ${form.email}`);
  };

  return (
    <div
      className={`rounded-xl border p-6 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
      <form className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300"
        />
        <input
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300"
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300"
        />
        <div className="flex space-x-4">
          <button
            type="reset"
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-green-500 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

EditProfileForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};
