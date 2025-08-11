import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginForm = ({
    loginData,
    handleLoginChange,
    handleLoginSubmit,
    errors,
    showPassword,
    setShowPassword,
    isLoading,
    isSuccess,
    setForgotPasswordStep,
    formVariants,
    inputVariants,
    buttonVariants,
    LoadingSpinner,
    SuccessIcon
}) => (
    <motion.div
        key="login-form"
        className="flex flex-col w-80"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
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
            name="email"
            placeholder="Email"
            className="mt-5 bg-[#F4F8F9] rounded-xl p-3 w-full shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#FE5B13] focus:border-transparent"
            value={loginData.email}
            onChange={handleLoginChange}
            variants={inputVariants}
            whileFocus="focus"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
        />
        {errors.email && (
            <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
            >
                {errors.email}
            </motion.p>
        )}

        <motion.div
            className="mt-4 relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <motion.input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full bg-[#F4F8F9] rounded-xl p-3 shadow-sm border pr-12 focus:outline-none focus:ring-2 focus:ring-[#FE5B13] focus:border-transparent"
                value={loginData.password}
                onChange={handleLoginChange}
                variants={inputVariants}
                whileFocus="focus"
            />
            <motion.i
                className={`ri-eye${showPassword ? '-off' : ''}-line text-gray-500 text-xl absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-700`}
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            />
        </motion.div>
        {errors.password && (
            <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
            >
                {errors.password}
            </motion.p>
        )}

        <motion.button
            onClick={handleLoginSubmit}
            disabled={isLoading || isSuccess}
            className={`mt-8 bg-[#FE5B13] w-full p-3 rounded-2xl text-center text-white font-medium text-lg transition-all duration-300 flex items-center justify-center ${isLoading || isSuccess
                ? 'opacity-80 cursor-not-allowed'
                : 'hover:transform hover:scale-105 hover:shadow-lg cursor-pointer'
                } ${isSuccess ? 'bg-green-500' : ''}`}
            variants={buttonVariants}
            whileHover={!isLoading && !isSuccess ? "hover" : {}}
            whileTap={!isLoading && !isSuccess ? "tap" : {}}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingSpinner key="loading" />
                ) : isSuccess ? (
                    <SuccessIcon key="success" />
                ) : (
                    <motion.span
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Submit
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>

        <motion.button
            onClick={() => setForgotPasswordStep(true)}
            className="mt-4 text-[#FE5B13] text-sm hover:underline text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Forgot Password?
        </motion.button>
    </motion.div>
);

export default LoginForm;