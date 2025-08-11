import React, { useState, useEffect } from "react";

const LocationForm = ({ onClose, onSave }) => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState({
    address1: "",
    address2: "",
    landmark: "",
    pincode: "", // <-- Added the pincode field
    city: "",
    state: "",
  });

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(location);
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Separate Blur for Location Popup */}
      <div className="absolute inset-0 backdrop-blur-sm" onClick={handleClose}></div>

      {/* Popup */}
      <div
        className={`relative bg-white rounded-lg w-full max-w-md shadow-lg transform transition-all duration-300 p-6 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Add Location Details</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={location.address1}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={location.address2}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={location.landmark}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={location.city}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={location.state}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {/* Add the new pincode input field */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={location.pincode}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
