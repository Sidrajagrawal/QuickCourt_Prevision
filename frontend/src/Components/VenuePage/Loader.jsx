import { useDarkMode } from "../DarkModeContext.jsx";

function Loader() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      role="status"
      aria-live="polite"
      className={`py-10 text-center text-sm animate-pulse ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      <div
        className={`inline-block w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mr-2 ${
          isDarkMode
            ? "border-green-400"
            : "border-green-600 border-t-transparent"
        }`}
      ></div>
      Loading venues...
    </div>
  );
}

export default Loader;