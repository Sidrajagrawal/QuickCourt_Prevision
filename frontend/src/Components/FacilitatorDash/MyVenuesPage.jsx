// src/Components/MyVenuesPage.jsx
import React, { useState, useEffect } from "react";
import EditVenueForm from "./EditVenueForm";
import AddVenueForm from "./AddVenueForm";
import Navbar from "../Navabr/Navbar";
import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";

const MyVenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null);
  const [showAddVenueForm, setShowAddVenueForm] = useState(false);
  const [viewState, setViewState] = useState("profile"); // New state to manage views: "profile" or "venues"

  const fetchMyVenues = async () => {
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (!accessToken || userRole !== 'FACILITY') {
      setError("Not authorized. Please log in as a Facility Owner.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/venues/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVenues(data);
    } catch (err) {
      console.error("Failed to fetch venues:", err);
      setError("Failed to load venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVenues();
  }, []);

  const handleEditClick = (venue) => {
    setEditingVenue(venue);
  };

  const handleUpdateSuccess = () => {
    setEditingVenue(null);
    fetchMyVenues();
  };
  
  const handleAddVenueSuccess = () => {
    setShowAddVenueForm(false);
    fetchMyVenues();
  };

  const handleEditVenueClick = () => {
    console.log("Edit Venue button clicked. Changing viewState to 'venues'.");
    setViewState("venues");
  };

  const renderContent = () => {
    if (viewState === "profile") {
      return (
        <ProfileSection 
          onEditVenueClick={handleEditVenueClick}
          onAddVenueClick={() => setShowAddVenueForm(true)}
        />
      );
    } else if (viewState === "venues") {
      return (
        <>
          <h1 className="text-3xl font-bold">My Venues</h1>
          {loading ? (
            <p>Loading your venues...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {venues.map((venue) => (
                <div key={venue.id} className="border p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold">{venue.name}</h2>
                  <p>{venue.location.city}</p>
                  <button
                    onClick={() => handleEditClick(venue)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {showAddVenueForm && (
        <AddVenueForm
          onClose={() => setShowAddVenueForm(false)}
          onAddVenue={handleAddVenueSuccess}
        />
      )}

      {editingVenue && (
        <EditVenueForm
          venueData={editingVenue}
          onClose={() => setEditingVenue(null)}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default MyVenuesPage;
