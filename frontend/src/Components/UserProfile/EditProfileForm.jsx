import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

const InputField = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="w-full p-3 pl-12 rounded-lg border bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
      />
    </div>
  );
};

export default function EditProfileForm({ user }) {
  const [form, setForm] = useState({ name: "", email: "", oldPassword: "", newPassword: "" });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name || "", email: user.email || "" }));
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => alert(`Profile updated for ${form.name}`);

  const containerVariants = { /* ...framer motion variants... */ };
  const itemVariants = { /* ...framer motion variants... */ };

  return (
    <div className="rounded-2xl border p-8 shadow-sm bg-white border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h2>
      <motion.form
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <InputField icon={<User size={20} />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <InputField icon={<Mail size={20} />} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <InputField icon={<Lock size={20} />} name="oldPassword" type="password" placeholder="Old Password" value={form.oldPassword} onChange={handleChange} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <InputField icon={<Lock size={20} />} name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} />
        </motion.div>
        <motion.div variants={itemVariants} className="flex pt-4 space-x-4">
          <button type="reset" className="px-6 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
            Reset
          </button>
          <button type="button" onClick={handleSave} className="px-6 py-2 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            Save Changes
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

EditProfileForm.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
};