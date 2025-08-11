import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Star, X } from "lucide-react";

export default function BookingCard({ booking }) {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const now = new Date();
  const isPast = booking.date < now;

  return (
    <div className="relative rounded-lg p-5 border bg-white border-gray-200 text-gray-800 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{booking.venue}</h3>
          <p className="text-sm font-medium text-orange-600">{booking.sport}</p>
        </div>
        <div className={`text-xs font-bold px-3 py-1 rounded-full text-white ${isPast ? 'bg-gray-500' : 'bg-green-500'}`}>
          {isPast ? "Completed" : "Confirmed"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2"><Calendar size={16} /><p>{booking.date.toLocaleDateString()}</p></div>
        <div className="flex items-center gap-2"><Clock size={16} /><p>{booking.time}</p></div>
        <div className="flex items-center gap-2 col-span-2"><MapPin size={16} /><p>{booking.city}</p></div>
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4 flex space-x-3">
        {!isPast && (
          <button onClick={() => setShowCancelPopup(true)} className="px-4 py-2 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold">Cancel Booking</button>
        )}
        {isPast && (
          <button onClick={() => setShowReviewBox(p => !p)} className="px-4 py-2 text-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold">{showReviewBox ? "Close" : "Write Review"}</button>
        )}
      </div>

      <AnimatePresence>
        {showReviewBox && <ReviewSection onCancel={() => setShowReviewBox(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCancelPopup && <CancelPopup booking={booking} onCancel={() => setShowCancelPopup(false)} onConfirm={() => { console.log('Cancelled!'); setShowCancelPopup(false); }} />}
      </AnimatePresence>
    </div>
  );
}

const ReviewSection = ({ onCancel }) => {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3 pt-4">
      <h4 className="font-semibold text-gray-800">Your Review</h4>
      <textarea placeholder="How was your experience?" className="w-full p-2 rounded-lg bg-gray-100 border-gray-300 text-gray-800" rows={3}></textarea>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 text-xs rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
        <button className="px-3 py-1 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600">Submit</button>
      </div>
    </motion.div>
  );
};

const CancelPopup = ({ booking, onCancel, onConfirm }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
      <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }} className="bg-white rounded-lg shadow-xl p-6 w-80 border border-gray-200">
        <h4 className="font-bold text-lg mb-2 text-gray-900">Cancel Booking?</h4>
        <p className="text-sm text-gray-600 mb-6">Are you sure you want to cancel the booking for <span className="font-semibold text-gray-800">{booking.venue}</span>?</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold">No, Keep It</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold">Yes, Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.shape({
    venue: PropTypes.string,
    sport: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    time: PropTypes.string,
    city: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};