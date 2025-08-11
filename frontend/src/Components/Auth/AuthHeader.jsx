import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthHeader = ({ getTitle, LoginActive, RegisterActive, handleLogin, handleSignup, otpStep, forgotPasswordStep, itemVariants, buttonVariants }) => (
   
   <>
        <motion.div
            className="auth-title w-full h-[10%] mt-5 text-center text-3xl font-bold"
            variants={itemVariants}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={getTitle()}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {getTitle()}
                </motion.div>
            </AnimatePresence>
        </motion.div>

        {!otpStep && !forgotPasswordStep && (
            <motion.div
                className="auth-btn w-full h-[10%] flex justify-center space-x-10 text-lg font-medium"
                variants={itemVariants}
            >
                <motion.button
                    onClick={handleLogin}
                    className={`border-2 px-5 mt-5 rounded-2xl cursor-pointer transition-all duration-300 ${LoginActive ? "bg-black text-white" : "hover:text-white hover:bg-black"}`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={{
                        backgroundColor: LoginActive ? "#000" : "transparent",
                        color: LoginActive ? "#fff" : "#000"
                    }}
                >
                    <i className="ri-login-box-line mr-2"></i> Log In
                </motion.button>

                <motion.button
                    onClick={handleSignup}
                    className={`border-2 px-5 mt-5 rounded-2xl cursor-pointer transition-all duration-300 ${RegisterActive ? "bg-black text-white" : "hover:text-white hover:bg-black"}`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={{
                        backgroundColor: RegisterActive ? "#000" : "transparent",
                        color: RegisterActive ? "#fff" : "#000"
                    }}
                >
                    <i className="ri-user-add-line mr-2"></i> Sign Up
                </motion.button>
            </motion.div>
        )}
    </>
);

export default AuthHeader;