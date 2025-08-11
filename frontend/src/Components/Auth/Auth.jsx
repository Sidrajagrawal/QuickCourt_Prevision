import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthHeader from './AuthHeader';
import RoleSelector from './RoleSelector';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpVerification from './OtpVerification';
import ForgotPasswordFlow from './ForgotPasswordFlow';
import { LoadingSpinner, SuccessIcon } from './AnimatedIcons';
import { ChevronDown } from "lucide-react"; // Make sure to import this for RoleSelector

const API_BASE = 'http://localhost:8000/accounts/auth';

const Auth = () => {
    // State management
    const [LoginActive, setLoginActive] = useState(true);
    const [RegisterActive, setRegisterActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState('');
    const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetStep, setResetStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("User");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [signupData, setSignupData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
    });

    const options = ["User", "Facility User", "Admin"];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    };

    const formVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120
            }
        },
        exit: {
            x: -20,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(254, 91, 19, 0.1)",
            transition: { duration: 0.2 }
        }
    };

    // Corrected handler functions
    const handleLogin = () => {
        setLoginActive(true);
        setRegisterActive(false);
        setForgotPasswordStep(false);
        setOtpStep(false);
        setResetStep(1);
        setErrors({});
        setIsSuccess(false);
    };

    const handleSignup = () => {
        setLoginActive(false);
        setRegisterActive(true);
        setForgotPasswordStep(false);
        setOtpStep(false);
        setResetStep(1);
        setErrors({});
        setIsSuccess(false);
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateName = (name) => {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    };

    const validateSignupForm = () => {
        const newErrors = {};
        if (!signupData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(signupData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!signupData.first_name) {
            newErrors.first_name = 'First name is required';
        } else if (!validateName(signupData.first_name)) {
            newErrors.first_name = 'First name must be at least 2 characters and contain only letters';
        }
        if (!signupData.last_name) {
            newErrors.last_name = 'Last name is required';
        } else if (!validateName(signupData.last_name)) {
            newErrors.last_name = 'Last name must be at least 2 characters and contain only letters';
        }
        if (!signupData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(signupData.password)) {
            newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
        }
        if (!signupData.password2) {
            newErrors.password2 = 'Please confirm your password';
        } else if (signupData.password !== signupData.password2) {
            newErrors.password2 = "Passwords don't match";
        }
        if (!acceptTerms) {
            newErrors.terms = 'Please accept the terms and conditions';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateLoginForm = () => {
        const newErrors = {};
        if (!loginData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(loginData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!loginData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // All the async handler functions
const handleLoginSubmit = async () => {
    if (!validateLoginForm()) return;
    setIsLoading(true);
    setIsSuccess(false);
    try {
        const res = await fetch(`${API_BASE}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...loginData, role: selected }),
        });
        const data = await res.json();
        
        if (res.ok) {
            // Normalize case before comparison to fix the issue
            if (data.role && data.role.toLowerCase() !== selected.toLowerCase()) {
                setErrors({ form: `You registered as "${data.role}". Please login with that role.` });
                setIsLoading(false);
                return;
            }
            
            localStorage.setItem('access', data.access_token);
            localStorage.setItem('refresh', data.refresh_token);
            if (data.avatar_url) localStorage.setItem('avatar', data.avatar_url);
            if (data.role) localStorage.setItem('role', data.role);
            
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            if (data.detail && data.detail.toLowerCase().includes('not found')) {
                setErrors({ form: 'Please sign up first before logging in.' });
            } else {
                setErrors({ form: data.detail || 'Login failed.' });
            }
        }
    } catch {
        setErrors({ form: 'Network error. Try again.' });
    } finally {
        setIsLoading(false);
    }
};    
const handleSignupSubmit = async () => {
    if (!validateSignupForm()) return;
    setIsLoading(true);
    // Convert the selected role to uppercase before sending it to the API
    const payload = { ...signupData, role: selected.toUpperCase() };
    try {
        const res = await fetch(`${API_BASE}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok) {
            setOtpStep(true);
        } else {
            setErrors({ form: data.detail || 'Signup failed.' });
        }
    } catch {
        setErrors({ form: 'Network error. Try again.' });
    } finally {
        setIsLoading(false);
    }
};    
    const handleOtpSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/verify-otp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: signupData.email, otp }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setOtpStep(false);
                    setLoginActive(true);
                    setRegisterActive(false);
                }, 1000);
            } else {
                setErrors({ form: data.detail || 'Invalid OTP' });
            }
        } catch {
            setErrors({ form: 'Network error. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleForgotPassword = async () => {
        if (!validateEmail(resetEmail)) {
            setErrors({ form: 'Please enter a valid email' });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/forgot-password/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });
            if (res.ok) {
                setResetStep(2);
                setErrors({});
            } else {
                const data = await res.json();
                setErrors({ form: data.detail || 'Failed to send reset email' });
            }
        } catch {
            setErrors({ form: 'Network error. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResetPasswordOtp = async () => {
        if (resetOtp.length !== 6) {
            setErrors({ form: 'Please enter a valid 6-digit OTP' });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/verify-reset-otp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, otp: resetOtp }),
            });
            if (res.ok) {
                setResetStep(3);
                setErrors({});
            } else {
                const data = await res.json();
                setErrors({ form: data.detail || 'Invalid OTP' });
            }
        } catch {
            setErrors({ form: 'Network error. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResetPassword = async () => {
        if (!validatePassword(newPassword)) {
            setErrors({ form: 'Password must be at least 8 characters with uppercase, lowercase, and number' });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/reset-password/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: resetEmail,
                    otp: resetOtp,
                    new_password: newPassword
                }),
            });
            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setForgotPasswordStep(false);
                    setResetStep(1);
                    setResetEmail('');
                    setResetOtp('');
                    setNewPassword('');
                    setLoginActive(true);
                    setErrors({});
                }, 1500);
            } else {
                const data = await res.json();
                setErrors({ form: data.detail || 'Password reset failed' });
            }
        } catch {
            setErrors({ form: 'Network error. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResendOtp = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/resend-otp/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: signupData.email }),
            });
            if (res.ok) {
                setErrors({ form: 'OTP resent successfully!' });
                setTimeout(() => setErrors({}), 3000);
            } else {
                const data = await res.json();
                setErrors({ form: data.detail || 'Failed to resend OTP' });
            }
        } catch {
            setErrors({ form: 'Network error. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getTitle = () => {
        if (otpStep) return 'Verify Your Email';
        if (forgotPasswordStep) {
            if (resetStep === 1) return 'Reset Password';
            if (resetStep === 2) return 'Enter Reset Code';
            if (resetStep === 3) return 'Set New Password';
        }
        return LoginActive ? 'Login to your account' : 'Create an account';
    };

    return (
        <motion.div
            className="h-full w-full border-2 min-h-screen bg-gray-50 border-2 overflow-auto md:overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="md:hidden text-[18px] text-black cursor-pointer font-bold ml-4 mt-2 hover:text-[#FE5B13]"
                variants={itemVariants}
            >
                <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Home
                </motion.button>
            </motion.div>

            <AuthHeader
                getTitle={getTitle}
                LoginActive={LoginActive}
                RegisterActive={RegisterActive}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                otpStep={otpStep}
                forgotPasswordStep={forgotPasswordStep}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
            />

            <RoleSelector
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selected={selected}
                setSelected={setSelected}
                options={options}
                otpStep={otpStep}
                forgotPasswordStep={forgotPasswordStep}
            />

            <motion.div
                className="auth-form w-full flex justify-center mt-8"
                variants={itemVariants}
            >
                <AnimatePresence mode="wait">
                    {otpStep ? (
                        <OtpVerification
                            signupData={signupData}
                            otp={otp}
                            setOtp={setOtp}
                            handleOtpSubmit={handleOtpSubmit}
                            handleResendOtp={handleResendOtp}
                            setOtpStep={setOtpStep}
                            setRegisterActive={setRegisterActive}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            errors={errors}
                            formVariants={formVariants}
                            inputVariants={inputVariants}
                            buttonVariants={buttonVariants}
                            LoadingSpinner={LoadingSpinner}
                            SuccessIcon={SuccessIcon}
                        />
                    ) : forgotPasswordStep ? (
                        <ForgotPasswordFlow
                            resetStep={resetStep}
                            resetEmail={resetEmail}
                            setResetEmail={setResetEmail}
                            resetOtp={resetOtp}
                            setResetOtp={setResetOtp}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            showNewPassword={showNewPassword}
                            setShowNewPassword={setShowNewPassword}
                            handleForgotPassword={handleForgotPassword}
                            handleResetPasswordOtp={handleResetPasswordOtp}
                            handleResetPassword={handleResetPassword}
                            setForgotPasswordStep={setForgotPasswordStep}
                            setLoginActive={setLoginActive}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            errors={errors}
                            formVariants={formVariants}
                            inputVariants={inputVariants}
                            buttonVariants={buttonVariants}
                            LoadingSpinner={LoadingSpinner}
                            SuccessIcon={SuccessIcon}
                        />
                    ) : LoginActive ? (
                        <LoginForm
                            loginData={loginData}
                            handleLoginChange={handleLoginChange}
                            handleLoginSubmit={handleLoginSubmit}
                            errors={errors}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            setForgotPasswordStep={setForgotPasswordStep}
                            formVariants={formVariants}
                            inputVariants={inputVariants}
                            buttonVariants={buttonVariants}
                            LoadingSpinner={LoadingSpinner}
                            SuccessIcon={SuccessIcon}
                        />
                    ) : (
                        <SignupForm
                            signupData={signupData}
                            handleSignupChange={handleSignupChange}
                            handleSignupSubmit={handleSignupSubmit}
                            errors={errors}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            showConfirm={showConfirm}
                            setShowConfirm={setShowConfirm}
                            acceptTerms={acceptTerms}
                            setAcceptTerms={setAcceptTerms}
                            isLoading={isLoading}
                            isSuccess={isSuccess}
                            formVariants={formVariants}
                            inputVariants={inputVariants}
                            buttonVariants={buttonVariants}
                            LoadingSpinner={LoadingSpinner}
                            SuccessIcon={SuccessIcon}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Auth;