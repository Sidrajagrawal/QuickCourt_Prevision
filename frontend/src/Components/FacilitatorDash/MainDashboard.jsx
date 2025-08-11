import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import ProfileSection from "./ProfileSection";
import StatsSection from "./StatsSection";
import AddVenueForm from "./AddVenueForm";
import EditVenueForm from "./EditVenueForm";

const DUMMY_DATA = {
  bookings: {
    past: [
      {
        id: 1,
        venueName: "Football Ground A",
        date: "2025-08-05",
        time: "10:00-12:00",
        customer: "John Doe",
        amount: 500,
      },
      {
        id: 2,
        venueName: "Basketball Court",
        date: "2025-08-03",
        time: "14:00-16:00",
        customer: "Jane Smith",
        amount: 300,
      },
      {
        id: 3,
        venueName: "Tennis Court",
        date: "2025-08-01",
        time: "08:00-10:00",
        customer: "Mike Johnson",
        amount: 250,
      },
    ],
    current: [
      {
        id: 4,
        venueName: "Football Ground B",
        date: "2025-08-11",
        time: "16:00-18:00",
        customer: "Alex Brown",
        amount: 600,
      },
    ],
    upcoming: [
      {
        id: 5,
        venueName: "Cricket Ground",
        date: "2025-08-15",
        time: "10:00-14:00",
        customer: "Sarah Wilson",
        amount: 800,
      },
      {
        id: 6,
        venueName: "Badminton Court",
        date: "2025-08-18",
        time: "18:00-20:00",
        customer: "Tom Davis",
        amount: 200,
      },
    ],
  },
  activeOrders: [
    {
      id: 1,
      orderNumber: "ORD-001",
      customer: "John Doe",
      venue: "Football Ground A",
      date: "2025-08-12",
      status: "Confirmed",
      amount: 500,
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customer: "Jane Smith",
      venue: "Basketball Court",
      date: "2025-08-13",
      status: "Pending",
      amount: 300,
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customer: "Mike Johnson",
      venue: "Tennis Court",
      date: "2025-08-14",
      status: "Confirmed",
      amount: 250,
    },
  ],
  earnings: {
    7: {
      totalEarnings: 2500,
      totalOrders: 8,
      data: [
        { date: "Aug 5", earnings: 500, orders: 2 },
        { date: "Aug 6", earnings: 300, orders: 1 },
        { date: "Aug 7", earnings: 450, orders: 2 },
        { date: "Aug 8", earnings: 200, orders: 1 },
        { date: "Aug 9", earnings: 350, orders: 1 },
        { date: "Aug 10", earnings: 400, orders: 1 },
        { date: "Aug 11", earnings: 300, orders: 0 },
      ],
    },
    30: {
      totalEarnings: 15000,
      totalOrders: 45,
      data: [
        { date: "Week 1", earnings: 3500, orders: 12 },
        { date: "Week 2", earnings: 4200, orders: 14 },
        { date: "Week 3", earnings: 3800, orders: 11 },
        { date: "Week 4", earnings: 3500, orders: 8 },
      ],
    },
  },
  timeSlots: [
    {
      time: "08:00-10:00",
      venue: "Football Ground A",
      status: "booked",
      customer: "John Doe",
    },
    { time: "10:00-12:00", venue: "Football Ground A", status: "available" },
    { time: "12:00-14:00", venue: "Football Ground A", status: "available" },
    {
      time: "14:00-16:00",
      venue: "Football Ground A",
      status: "booked",
      customer: "Jane Smith",
    },
    { time: "16:00-18:00", venue: "Football Ground A", status: "available" },
    {
      time: "18:00-20:00",
      venue: "Football Ground A",
      status: "booked",
      customer: "Mike Johnson",
    },
    { time: "08:00-10:00", venue: "Basketball Court", status: "available" },
    { time: "10:00-12:00", venue: "Basketball Court", status: "available" },
    {
      time: "14:00-16:00",
      venue: "Basketball Court",
      status: "booked",
      customer: "Alex Brown",
    },
    { time: "16:00-18:00", venue: "Basketball Court", status: "available" },
  ],
};

const MainDashboard = () => {
  const [showVenueList, setShowVenueList] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  
  const [venues, setVenues] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch venues from the API on component mount
  useEffect(() => {
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

    fetchMyVenues();
  }, []);

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

  const handleAddVenue = (newVenue) => {
    setVenues((prev) => [
      ...prev,
      { ...newVenue, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setIsAddPopupOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ProfileSection
        onAddVenueClick={() => setIsAddPopupOpen(true)}
        onEditVenueClick={() => setShowVenueList(!showVenueList)} // <-- Toggling the state here
      />
      
      {showVenueList ? (
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">My Venues</h1>
          {loading ? (
            <p>Loading your venues...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venues.map((venue) => (
                <div key={venue.id} className="border rounded-lg p-4 shadow">
                  <h2 className="text-lg font-semibold">{venue.name}</h2>
                  <p className="text-gray-500">
                    {/* Corrected: Accessing the city property of the location object */}
                    {venue.location.city}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{venue.price_per_hour} / hour
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
        </div>
      ) : (
        <StatsSection data={DUMMY_DATA} />
      )}

      {isAddPopupOpen && (
        <AddVenueForm
          onClose={() => setIsAddPopupOpen(false)}
          onAddVenue={handleAddVenue}
        />
      )}
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
