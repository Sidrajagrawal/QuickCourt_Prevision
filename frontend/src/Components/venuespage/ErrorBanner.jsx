import React from "react";
import { useDarkMode } from "../DarkModeContext.jsx";

function ErrorBanner({ message }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-md shadow-lg animate-pulse ${
        isDarkMode
          ? "border-red-400/30 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200"
          : "border-red-300 bg-gradient-to-r from-red-100 to-red-200 text-red-800"
      }`}
    >
      <span className="font-medium">⚠ {message}</span>
    </div>
  );
}

export default ErrorBanner;
