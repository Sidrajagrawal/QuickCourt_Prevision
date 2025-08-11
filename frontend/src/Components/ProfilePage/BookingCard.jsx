import { useState } from "react";
import { useDarkMode } from "../DarkModeContext.jsx";
import PropTypes from "prop-types";

export default function BookingCard({ booking }) {
  const { isDarkMode } = useDarkMode();
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleSubmitReview = () => {
    console.log("Review submitted:", { rating, reviewText });
    setShowReviewBox(false);
    setReviewText("");
    setRating(0);
  };

  const confirmCancel = () => {
    console.log(`Booking for ${booking.venue} has been cancelled.`);
    setShowCancelPopup(false);
  };

  return (
    <div
      className={`relative rounded-lg p-4 border overflow-hidden ${
        isDarkMode
          ? "bg-gray-700 border-gray-600"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      {/* Fade background when popup is active */}
      <div className={`${showCancelPopup ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
        <h3 className="font-semibold">
          {booking.venue} ({booking.sport})
        </h3>
        <p className="text-sm text-gray-400">
          {booking.date} | {booking.time}
        </p>
        <p className="text-xs text-gray-500">{booking.city}</p>
        <p
          className={`mt-2 font-medium ${
            booking.status === "Confirmed" ? "text-green-500" : "text-red-500"
          }`}
        >
          {booking.status}
        </p>

        <div className="mt-3 flex space-x-2">
          {!booking.past && (
            <button
              onClick={() => setShowCancelPopup(true)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
            >
              Cancel Booking
            </button>
          )}
          <button
            onClick={() => setShowReviewBox((prev) => !prev)}
            className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs"
          >
            {showReviewBox ? "Close Review" : "Write Review"}
          </button>
        </div>

        {showReviewBox && (
          <div className="mt-3 space-y-3">
            {/* Star Rating */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={star <= (hoverRating || rating) ? "#facc15" : "none"}
                  stroke="#facc15"
                  className="w-6 h-6 cursor-pointer"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              ))}
            </div>

            {/* Review Text Area */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 rounded-lg border border-gray-300 text-sm"
              rows={3}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              className="px-3 py-1 rounded-lg bg-green-500 text-white text-xs"
              disabled={!rating || !reviewText.trim()}
            >
              Submit Review
            </button>
          </div>
        )}
      </div>

      {/* Centered Cancel Popup */}
      {showCancelPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            className={`rounded-lg shadow-lg p-4 w-72 border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <h4 className="font-semibold text-sm mb-2">Cancel Booking</h4>
            <p className="text-xs mb-4">
              Are you sure you want to cancel booking for{" "}
              <span className="font-bold">{booking.venue}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCancelPopup(false)}
                className="px-3 py-1 text-xs rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    venue: PropTypes.string,
    sport: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
    past: PropTypes.bool,
  }).isRequired,
};
