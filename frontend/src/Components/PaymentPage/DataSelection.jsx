import React from 'react'
import FormField from './FormField';
import { Calendar } from 'lucide-react';

const DateSelection = ({ selectedDate, setSelectedDate, darkMode }) => (
  <FormField label="Date" delay={0.4}>
    <div className="relative">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={`w-full p-3 rounded-lg border transition-all text-sm ${
          darkMode
            ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
            : 'bg-white border-gray-300 focus:border-blue-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60" />
    </div>
  </FormField>
);

export default DateSelection


