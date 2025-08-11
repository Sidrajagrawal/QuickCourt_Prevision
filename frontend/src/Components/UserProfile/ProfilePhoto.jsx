import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

export default function ProfilePhoto({ editable }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div
        className={`w-24 h-24 rounded-full overflow-hidden border-4 shadow-md ${profileImage ? "border-orange-500" : "bg-gray-500 border-gray-400"
          }`}
        whileHover={{ scale: 1.05 }}
      >
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold bg-gray-700">
            S
          </div>
        )}
      </motion.div>

      {editable && (
        <>
          <motion.label
            htmlFor="profile-upload"
            className="absolute -bottom-1 -right-1 bg-orange-500 p-2 rounded-full cursor-pointer shadow-lg"
            title="Change profile photo"
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Pencil className="h-4 w-4 text-white" />
          </motion.label>
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