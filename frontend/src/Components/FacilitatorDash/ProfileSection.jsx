import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests

const ProfileSection = ({ onEditVenueClick, onAddVenueClick }) => {
  // State to hold user data, loading status, and any errors
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      // Get the access token from localStorage
      const token = localStorage.getItem('access');
      if (!token) {
        setError("User not authenticated.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user data from the '/accounts/auth/me/' endpoint
        const response = await axios.get('http://127.0.0.1:8000/accounts/auth/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Store the fetched user data in state
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Display a loading message while data is being fetched
  if (isLoading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  // Display an error message if fetching failed
  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  
  // Display a message if no user data was found after loading
  if (!user) {
    return <div className="p-4 text-center">Could not load user profile.</div>;
  }

  // Generate user initials for the avatar from first_name and last_name
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {/* Display user initials */}
            {getInitials(user.first_name, user.last_name)}
          </div>
          <div>
            {/* Display user's full name */}
            <h2 className="text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            onClick={onAddVenueClick}
          >
            Add Venue
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            onClick={onEditVenueClick}>
            Edit Venue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
