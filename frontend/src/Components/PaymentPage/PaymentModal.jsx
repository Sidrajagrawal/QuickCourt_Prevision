
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  ChevronDown,
  Plus,
  Minus,
  X,
  CreditCard,
  Smartphone,
  Building,
  Shield,
  Sun,
  Moon
} from 'lucide-react';


const PaymentModal = ({ showPaymentModal, setShowPaymentModal, darkMode, totalAmount }) => (
  <AnimatePresence>
    {showPaymentModal && (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPaymentModal(false)}
      >
        <motion.div
          className={`w-full max-w-sm rounded-2xl p-6 ${
            darkMode
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Payment Options</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { icon: CreditCard, title: 'Credit/Debit Card', subtitle: 'Visa, MasterCard, RuPay', color: 'blue' },
              { icon: Smartphone, title: 'UPI Payment', subtitle: 'PhonePe, GPay, Paytm', color: 'purple' },
              { icon: Building, title: 'Net Banking', subtitle: 'All major banks', color: 'green' }
            ].map((payment, index) => (
              <motion.button
                key={index}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  darkMode
                    ? `border-gray-600 hover:border-${payment.color}-500 bg-gray-700/50`
                    : `border-gray-200 hover:border-${payment.color}-500 bg-gray-50`
                } flex items-center space-x-3`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <payment.icon className={`w-5 h-5 text-${payment.color}-500`} />
                <div className="text-left">
                  <div className="font-semibold text-sm">{payment.title}</div>
                  <div className="text-xs opacity-70">{payment.subtitle}</div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className={`mt-4 p-3 rounded-lg ${
            darkMode ? 'bg-gray-700/30' : 'bg-gray-100'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">Total Amount</span>
              <span className="text-lg font-bold text-green-500">₹{totalAmount}.00</span>
            </div>
            <div className="flex items-center mt-1 text-xs opacity-70">
              <Shield className="w-3 h-3 mr-1" />
              <span>Secure payment powered by Razorpay</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
export default PaymentModal
