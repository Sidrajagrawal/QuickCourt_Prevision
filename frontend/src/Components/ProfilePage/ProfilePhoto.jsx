import { useState } from "react";
import PropTypes from "prop-types";

export default function ProfilePhoto({ editable }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="relative w-20 mx-auto">
      {/* Profile Image */}
      <div
        className={`w-20 h-20 rounded-full overflow-hidden ${
          profileImage ? "" : "bg-gray-500"
        }`}
      >
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Pencil Icon Below */}
      {editable && (
        <>
          <label
            htmlFor="profile-upload"
            className="absolute right-0 top-[85px] bg-green-500 p-1 rounded-full cursor-pointer hover:bg-green-400"
            title="Change profile photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 11l6 6M9 11l6-6M4 20h4l10-10a2.828 2.828 0 00-4-4L4 16v4z"
              />
            </svg>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </>
      )}
    </div>
  );
}

ProfilePhoto.propTypes = {
  editable: PropTypes.bool.isRequired,
};
