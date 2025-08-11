import React from "react";

const ProfileSection = ({ onEditVenueClick, onAddVenueClick }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
          Profile Photo
        </div>
        <h1 className="ml-4 text-xl font-bold">Name of Place</h1>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onAddVenueClick} // now working
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Venue
        </button>
        <button
          onClick={onEditVenueClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Venue
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
