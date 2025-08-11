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
  const [venueName, setVenueName] = useState(venueData?.name || "");
  const [location, setLocation] = useState(venueData?.location || null);
  const [price, setPrice] = useState(venueData?.price_per_hour || "");
  const [openingTime, setOpeningTime] = useState(venueData?.operational_hours.split(' - ')[0] || "09:00");
  const [closingTime, setClosingTime] = useState(venueData?.operational_hours.split(' - ')[1] || "18:00");
  const [sports, setSports] = useState(venueData?.sports || []);
  const [amenities, setAmenities] = useState(venueData?.amenities || []);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState(venueData?.description || "");

  const [locationSaved, setLocationSaved] = useState(!!venueData?.location);
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

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

  const uploadFileToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'quickcourt');
    formData.append('folder', 'quickcourt');
    
    const url = `https://api.cloudinary.com/v1_1/${'dqqjsp6xo'}/${type}/upload`;
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        throw new Error('Cloudinary upload failed.');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const confirmUpdate = async () => {
    setShowConfirm(false);
    setUploadStatus({ loading: true, success: false, error: null });
    const accessToken = localStorage.getItem('access');

    try {
      // Handle file uploads (only if new files are selected)
      const photoUrls = photos.length > 0
        ? await Promise.all(photos.map(file => uploadFileToCloudinary(file, 'image')))
        : venueData.photos_links;

      const videoUrl = videos.length > 0
        ? await uploadFileToCloudinary(videos[0], 'video')
        : venueData.video_link;

      const updatedPayload = {
        name: venueName,
        location: {
            id: location.id, // Pass the existing location ID
            line1: location.line1,
            line2: location.line2,
            landmark: location.landmark,
            pincode: location.pincode,
            city: location.city,
            state: location.state,
        },
        price_per_hour: Number(price),
        operational_hours: `${openingTime} - ${closingTime}`,
        sports: sports,
        amenities: amenities,
        photos_links: photoUrls,
        video_link: videoUrl,
        description: description,
      };

      const response = await fetch(`http://127.0.0.1:8000/api/v1/venues/${venueData.id}/`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update venue. Please check your form data.');
      }

      setUploadStatus({ loading: false, success: true, error: null });
      setTimeout(() => {
        onUpdate();
        handleClose();
      }, 1500);

    } catch (error) {
      setUploadStatus({ loading: false, success: false, error: error.message });
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => setPhotos([...e.target.files]);
  const handleVideoChange = (e) => setVideos([...e.target.files]);

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
                {photos.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {photos.length} photo(s) selected
                  </p>
                )}
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
                {videos.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {videos.length} video(s) selected
                  </p>
                )}
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
