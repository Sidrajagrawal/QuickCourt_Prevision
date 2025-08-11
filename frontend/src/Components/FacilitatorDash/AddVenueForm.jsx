import React, { useEffect, useState } from "react";
import TagsInput from "./TagsInput";
import LocationForm from "./LocationForm";


const AddVenueForm = ({ onClose, onAddVenue }) => {
  const [show, setShow] = useState(false);
  const [sports, setSports] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  // Start & End time states
  const [startHour, setStartHour] = useState("9");
  const [startMinute, setStartMinute] = useState("00");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endHour, setEndHour] = useState("6");
  const [endMinute, setEndMinute] = useState("00");
  const [endPeriod, setEndPeriod] = useState("PM");
  const [locationPopup, setLocationPopup] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationError, setLocationError] = useState(false);



  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 300);
  };

  const [venueName, setVenueName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const openingTime = `${startHour}:${startMinute} ${startPeriod}`;
    const closingTime = `${endHour}:${endMinute} ${endPeriod}`;
    if (!locationData) {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    // Build new venue object
    const newVenue = {
      name: venueName,
      location: locationData ? `${locationData.address1}, ${locationData.city}, ${locationData.state}` : "",
      price: price ? Number(price) : 0,
      sports,
      amenities,
      openingTime,
      closingTime,
      photos,
      videos,
      description,
    };
    if (onAddVenue) onAddVenue(newVenue);
    handleClose();
  };

  const handlePhotoChange = (e) => setPhotos([...e.target.files]);
  const handleVideoChange = (e) => setVideos([...e.target.files]);

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i < 10 ? `0${i}` : String(i)
  );

  return (
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
          <h2 className="text-xl font-semibold">Add New Venue</h2>
        </div>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Venue Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Venue Name
              </label>
              <input
                type="text"
                value={venueName}
                onChange={e => setVenueName(e.target.value)}
                placeholder="Enter venue name"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <button
                    type="button"
                    onClick={() => setLocationPopup(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {locationData ? "Edit Location" : "Set Location"}
                </button>
                {locationData && (
                    <p className="text-xs text-gray-500 mt-1">
                    {locationData.address1}, {locationData.city}, {locationData.state}
                    </p>
                )}
                {locationError && (
                    <p className="text-xs text-red-500 mt-1">Please save address details before submitting.</p>
                )}
            </div>



            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Price per Hour
              </label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            {/* Opening & Closing Time (same row) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Rental Timing
              </label>
              <div className="flex gap-4">
                {/* Start Time */}
                <div className="flex items-center gap-1">
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="border rounded p-1"
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  :
                  <select
                    value={startMinute}
                    onChange={(e) => setStartMinute(e.target.value)}
                    className="border rounded p-1"
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={startPeriod}
                    onChange={(e) => setStartPeriod(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                <span className="self-center">to</span>

                {/* End Time */}
                <div className="flex items-center gap-1">
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="border rounded p-1"
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  :
                  <select
                    value={endMinute}
                    onChange={(e) => setEndMinute(e.target.value)}
                    className="border rounded p-1"
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={endPeriod}
                    onChange={(e) => setEndPeriod(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sports tags */}
            <TagsInput
              label="Sports"
              tags={sports}
              setTags={setSports}
              placeholder="Type a sport and press Enter"
            />

            {/* Amenities tags */}
            <TagsInput
              label="Amenities"
              tags={amenities}
              setTags={setAmenities}
              placeholder="Type an amenity and press Enter"
            />

            {/* Photos */}
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

            {/* Videos */}
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter details"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>

            {/* Buttons */}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {locationPopup && (
        <LocationForm
            onClose={() => setLocationPopup(false)}
            onSave={(loc) => {
            setLocationData(loc);
            setLocationError(false);
            setLocationPopup(false);
            }}
        />
        )}

    </div>
  );
};

export default AddVenueForm;