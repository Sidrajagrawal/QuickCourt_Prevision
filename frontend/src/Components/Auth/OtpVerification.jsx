import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OtpVerification = ({
    signupData,
    otp,
    setOtp,
    handleOtpSubmit,
    handleResendOtp,
    setOtpStep,
    setRegisterActive,
    isLoading,
    isSuccess,
    errors,
    formVariants,
    inputVariants,
    buttonVariants,
    LoadingSpinner,
    SuccessIcon
}) => (
    <motion.div
        key="otp-form"
        className="flex flex-col w-80"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Verify Your Email</h3>
            <p className="text-sm text-gray-600 mt-1">
                Enter the 6-digit code sent to {signupData.email}
            </p>
        </div>

        {errors.form && (
            <motion.p
                className={`text-sm mt-1 text-center ${errors.form.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                {errors.form}
            </motion.p>
        )}

        <motion.input
            type="text"
            placeholder="Enter OTP"
            className="mt-5 bg-[#F4F8F9] rounded-xl p-3 w-full text-center text-xl tracking-widest shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#FE5B13]"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength="6"
            variants={inputVariants}
            whileFocus="focus"
        />

        <motion.button
            onClick={handleOtpSubmit}
            disabled={isLoading || otp.length !== 6}
            className={`mt-6 bg-[#FE5B13] w-full p-3 rounded-2xl text-white font-medium flex items-center justify-center ${isLoading || otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isSuccess ? 'bg-green-500' : ''}`}
            variants={buttonVariants}
            whileHover={!isLoading && otp.length === 6 ? "hover" : {}}
            whileTap={!isLoading && otp.length === 6 ? "tap" : {}}
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingSpinner key="loading" />
                ) : isSuccess ? (
                    <SuccessIcon key="success" />
                ) : (
                    <motion.span
                        key="verify"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Verify OTP
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>

        <motion.button
            onClick={handleResendOtp}
            disabled={isLoading}
            className="mt-4 text-[#FE5B13] text-sm hover:underline disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Resend OTP
        </motion.button>

        <motion.button
            onClick={() => {
                setOtpStep(false);
                setRegisterActive(true);
                setOtp('');
            }}
            className="mt-2 text-gray-500 text-sm hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Back to Signup
        </motion.button>
    </motion.div>
);

export default OtpVerification;