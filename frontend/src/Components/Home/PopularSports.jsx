import React from 'react';

const PopularSports = ({ isDarkMode }) => {
  const sports = [
    { name: 'Badminton', color: 'from-green-600 via-green-500 to-green-400', icon: '🏸' },
    { name: 'Football', color: 'from-blue-600 via-blue-500 to-blue-400', icon: '⚽' },
    { name: 'Cricket', color: 'from-orange-600 via-orange-500 to-orange-400', icon: '🏏' },
    { name: 'Swimming', color: 'from-cyan-600 via-cyan-500 to-cyan-400', icon: '🏊' },
    { name: 'Tennis', color: 'from-purple-600 via-purple-500 to-purple-400', icon: '🎾' },
    { name: 'Table Tennis', color: 'from-red-600 via-red-500 to-red-400', icon: '🏓' }
  ];

  return (
    <div className={`rounded-3xl shadow-2xl p-8 mx-4 md:mx-6 mb-8 border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700 shadow-black/30' 
        : 'bg-white/90 backdrop-blur-sm border-gray-200 shadow-gray-300/30'
    }`}>
      <h2 className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Popular Sports
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {sports.map((sport, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center space-y-4 p-6 rounded-3xl transition-all duration-300 cursor-pointer group transform hover:scale-105 hover:-translate-y-2 ${
              isDarkMode 
                ? 'hover:bg-gray-700/60 hover:shadow-xl hover:shadow-gray-900/40' 
                : 'hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-200/40'
            }`}
          >
            <div className={`w-24 h-24 bg-gradient-to-br ${sport.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden group-hover:rotate-6`}>
              <span className="text-3xl filter drop-shadow-lg">{sport.icon}</span>
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-3xl"></div>
            </div>
            <span className={`text-sm font-bold text-center leading-tight transition-all duration-300 ${
              isDarkMode 
                ? 'text-gray-200 group-hover:text-white' 
                : 'text-gray-800 group-hover:text-gray-900'
            }`}>
              {sport.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSports;