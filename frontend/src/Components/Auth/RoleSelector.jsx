import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RoleSelector = ({ isOpen, setIsOpen, selected, setSelected, options, otpStep, forgotPasswordStep }) => (
    <>
        {!otpStep && !forgotPasswordStep && (
            <div className="relative w-64 mx-18 md:mx-55 mt-5">
                <motion.div
                    className="border-1 px-5 py-2 rounded-lg bg-white text-black cursor-pointer flex justify-between items-center transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{selected}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                    }}
                                    className="px-5 py-2 hover:bg-black hover:text-white cursor-pointer transition-colors duration-200"
                                >
                                    {option}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
    </>
);

export default RoleSelector;