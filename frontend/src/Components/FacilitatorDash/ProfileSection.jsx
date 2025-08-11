import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";

const ProfileSection = ({ onEditVenueClick, onAddVenueClick }) => {
  

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            VP
          </div>
          <div>
            <h2 className="text-xl font-semibold">Venue Paradise</h2>
            <p className="text-sm text-gray-600">Premium Sports Venue</p>
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
    