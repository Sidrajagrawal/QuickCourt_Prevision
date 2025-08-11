import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPasswordFlow = ({
    resetStep,
    resetEmail,
    setResetEmail,
    resetOtp,
    setResetOtp,
    newPassword,
    setNewPassword,
    showNewPassword,
    setShowNewPassword,
    handleForgotPassword,
    handleResetPasswordOtp,
    handleResetPassword,
    setForgotPasswordStep,
    setLoginActive,
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
        key="forgot-password-form"
        className="flex flex-col w-80"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {resetStep === 1 && (
            <>
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Reset Password</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Enter your email to receive a reset code
                    </p>
                </div>

                {errors.form && (
                    <motion.p
                        className="text-red-500 text-sm mt-1 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {errors.form}
                    </motion.p>
                )}

                <motion.input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-5 bg-[#F4F8F9] rounded-xl p-3 w-full shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#FE5B13]"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    variants={inputVariants}
                    whileFocus="focus"
                />

                <motion.button
                    onClick={handleForgotPassword}
                    disabled={isLoading || !resetEmail}
                    className={`mt-6 bg-[#FE5B13] w-full p-3 rounded-2xl text-white font-medium flex items-center justify-center ${isLoading || !resetEmail ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    variants={buttonVariants}
                    whileHover={!isLoading && resetEmail ? "hover" : {}}
                    whileTap={!isLoading && resetEmail ? "tap" : {}}
                >
                    {isLoading ? <LoadingSpinner /> : 'Send Reset Code'}
                </motion.button>
            </>
        )}

        {resetStep === 2 && (
            <>
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Enter Reset Code</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Enter the 6-digit code sent to {resetEmail}
                    </p>
                </div>

                {errors.form && (
                    <motion.p
                        className="text-red-500 text-sm mt-1 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {errors.form}
                    </motion.p>
                )}

                <motion.input
                    type="text"
                    placeholder="Enter reset code"
                    className="mt-5 bg-[#F4F8F9] rounded-xl p-3 w-full text-center text-xl tracking-widest shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#FE5B13]"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength="6"
                    variants={inputVariants}
                    whileFocus="focus"
                />

                <motion.button
                    onClick={handleResetPasswordOtp}
                    disabled={isLoading || resetOtp.length !== 6}
                    className={`mt-6 bg-[#FE5B13] w-full p-3 rounded-2xl text-white font-medium flex items-center justify-center ${isLoading || resetOtp.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    variants={buttonVariants}
                    whileHover={!isLoading && resetOtp.length === 6 ? "hover" : {}}
                    whileTap={!isLoading && resetOtp.length === 6 ? "tap" : {}}
                >
                    {isLoading ? <LoadingSpinner /> : 'Verify Code'}
                </motion.button>
            </>
        )}

        {resetStep === 3 && (
            <>
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Set New Password</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Enter your new password
                    </p>
                </div>

                {errors.form && (
                    <motion.p
                        className="text-red-500 text-sm mt-1 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {errors.form}
                    </motion.p>
                )}

                <motion.div className="mt-5 relative">
                    <motion.input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="w-full bg-[#F4F8F9] rounded-xl p-3 shadow-sm border pr-12 focus:outline-none focus:ring-2 focus:ring-[#FE5B13] focus:border-transparent"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        variants={inputVariants}
                        whileFocus="focus"
                    />
                    <motion.i
                        className={`ri-eye${showNewPassword ? '-off' : ''}-line text-gray-500 text-xl absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-700`}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    />
                </motion.div>

                <motion.button
                    onClick={handleResetPassword}
                    disabled={isLoading || !newPassword}
                    className={`mt-6 bg-[#FE5B13] w-full p-3 rounded-2xl text-white font-medium flex items-center justify-center ${isLoading || !newPassword ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isSuccess ? 'bg-green-500' : ''}`}
                    variants={buttonVariants}
                    whileHover={!isLoading && newPassword ? "hover" : {}}
                    whileTap={!isLoading && newPassword ? "tap" : {}}
                >
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <LoadingSpinner key="loading" />
                        ) : isSuccess ? (
                            <SuccessIcon key="success" />
                        ) : (
                            <motion.span
                                key="reset"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Reset Password
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </>
        )}

        <motion.button
            onClick={() => {
                setForgotPasswordStep(false);
                setResetStep(1);
                setResetEmail('');
                setResetOtp('');
                setNewPassword('');
                setLoginActive(true);
                setErrors({});
            }}
            className="mt-4 text-gray-500 text-sm hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Back to Login
        </motion.button>
    </motion.div>
);

export default ForgotPasswordFlow;