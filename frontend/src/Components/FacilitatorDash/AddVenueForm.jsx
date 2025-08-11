
import TagsInput from "./TagInput";
import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";

const AddVenueForm = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const [sports, setSports] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      sports,
      amenities,
      photos,
      videos,
    });
    handleClose();
  };

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideos([...e.target.files]);
  };

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
            <div>
              <label className="block text-sm font-medium mb-1">Venue Name</label>
              <input
                type="text"
                placeholder="Enter venue name"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price per Hour</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Operational Hours</label>
              <input
                type="text"
                placeholder="e.g., 9:00 AM - 9:00 PM"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
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

            {/* Photos upload */}
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
                <p className="text-xs text-gray-500 mt-1">{photos.length} photo(s) selected</p>
              )}
            </div>

            {/* Videos upload */}
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
                <p className="text-xs text-gray-500 mt-1">{videos.length} video(s) selected</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                placeholder="Enter details"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>

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
    </div>
  );
};

export default AddVenueForm;
