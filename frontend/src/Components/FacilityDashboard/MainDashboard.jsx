import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import StatsSection from "./StatsSection";
import VenueCard from "../Home/VenueCard"; // Assuming this is your venue display card
import EditVenueForm from "./EditVenueForm";
import AddVenueForm from "./AddVenueForm"; //

const MainDashboard = () => {
  const [showVenueList, setShowVenueList] = useState(false);
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "City Sports Ground",
      location: "Downtown",
      price: 500,
      sports: ["Cricket", "Football"],
      amenities: ["Parking", "Floodlights"],
    },
    {
      id: 2,
      name: "Greenfield Arena",
      location: "Uptown",
      price: 700,
      sports: ["Tennis", "Badminton"],
      amenities: ["Cafeteria", "Restrooms"],
    },
  ]);

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const handleEditClick = (venue) => {
    setSelectedVenue(venue);
    setIsEditPopupOpen(true);
  };

  const handleUpdateVenue = (updatedVenue) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
    );
    setIsEditPopupOpen(false);
  };

  // Add venue handler
  const handleAddVenue = (newVenue) => {
    setVenues((prev) => [
      ...prev,
      { ...newVenue, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setIsAddPopupOpen(false);
  };

  return (
    <div className="p-4">
      <ProfileSection
        onAddVenueClick={() => setIsAddPopupOpen(true)}
        onEditVenueClick={() => setShowVenueList(true)}
      />
      <StatsSection />

      {/* Venue list appears only when Edit Venue is clicked */}
      {showVenueList && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold">{venue.name}</h2>
              <p className="text-gray-500">{venue.location}</p>
              <p>
                <strong>Price:</strong> ₹{venue.price} / hour
              </p>
              <p>
                <strong>Sports:</strong> {venue.sports.join(", ")}
              </p>
              <p>
                <strong>Amenities:</strong> {venue.amenities.join(", ")}
              </p>
              <button
                onClick={() => handleEditClick(venue)}
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Venue Popup */}
      {isAddPopupOpen && (
        <AddVenueForm
          onClose={() => setIsAddPopupOpen(false)}
          onAddVenue={handleAddVenue}
        />
      )}

      {/* Edit Venue Popup */}
      {isEditPopupOpen && (
        <EditVenueForm
          venueData={selectedVenue}
          onClose={() => setIsEditPopupOpen(false)}
          onUpdate={handleUpdateVenue}
        />
      )}
    </div>
  );
};

export default MainDashboard;
