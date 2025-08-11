import React, { useEffect, useState } from "react";
import TagsInput from "./TagsInput";
import TimePicker from "react-time-picker";
import LocationForm from "./LocationForm";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const EditVenueForm = ({ venueData, onClose, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form fields
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState("");
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("18:00");
  const [sports, setSports] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState("");

  const [locationSaved, setLocationSaved] = useState(false);

  // Prefill form from venueData
  useEffect(() => {
    if (venueData) {
      setVenueName(venueData.venueName || "");
      setLocation(venueData.location || null);
      setPrice(venueData.price || "");
      setOpeningTime(venueData.openingTime || "09:00");
      setClosingTime(venueData.closingTime || "18:00");
      setSports(venueData.sports || []);
      setAmenities(venueData.amenities || []);
      setDescription(venueData.description || "");
      setLocationSaved(!!venueData.location);
    }
  }, [venueData]);

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationSaved) return; // prevent update without location
    setShowConfirm(true);
  };

  const confirmUpdate = () => {
    setShowConfirm(false);
    const updatedData = {
      venueName,
      location,
      price,
      openingTime,
      closingTime,
      sports,
      amenities,
      photos,
      videos,
      description,
    };
    onUpdate(updatedData);
    handleClose();
  };

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideos([...e.target.files]);
  };

  return (
    <>
      {/* Main form */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Blur background */}
        <div
          className="absolute inset-0 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        {/* Popup form container */}
        <div
          className={`relative bg-white rounded-lg w-full max-w-md shadow-lg transform transition-all duration-300 ${
            show ? "scale-100 opacity-100" : "scale-90 opacity-0"
          } max-h-[90vh] flex flex-col`}
        >
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Edit Venue</h2>
          </div>

          {/* Scrollable content */}
          <div className="p-6 overflow-y-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setShowLocationForm(true)}
                >
                  {locationSaved ? "Edit Location" : "Add Location"}
                </button>
                {!locationSaved && (
                  <p className="text-red-500 text-sm mt-1">
                    Save address details
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price per Hour
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Times in one row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Opening Time
                  </label>
                  <TimePicker
                    onChange={setOpeningTime}
                    value={openingTime}
                    disableClock={false}
                    clearIcon={null}
                    className="border rounded p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Closing Time
                  </label>
                  <TimePicker
                    onChange={setClosingTime}
                    value={closingTime}
                    disableClock={false}
                    clearIcon={null}
                    className="border rounded p-2"
                  />
                </div>
              </div>

              {/* Tags */}
              <TagsInput
                label="Sports"
                tags={sports}
                setTags={setSports}
                placeholder="Type a sport and press Enter"
              />
              <TagsInput
                label="Amenities"
                tags={amenities}
                setTags={setAmenities}
                placeholder="Type an amenity and press Enter"
              />

              {/* File uploads */}
              <div>
                <label className="block text-sm font-medium mb-1">Photos</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Videos</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Location popup */}
      {showLocationForm && (
        <LocationForm
          onClose={() => setShowLocationForm(false)}
          onSave={(loc) => {
            setLocation(loc);
            setLocationSaved(true);
            setShowLocationForm(false);
          }}
        />
      )}

      {/* Confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowConfirm(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <p className="mb-4">Are you sure you want to update this venue?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={confirmUpdate}
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditVenueForm;