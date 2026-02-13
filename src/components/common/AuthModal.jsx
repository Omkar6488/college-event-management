import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, UserPlus, LogIn, Shield, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, initialRole = 'student' }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication - in production, this would call an API
    console.log(isSignup ? 'Signing up' : 'Logging in', { ...formData, role });
    
    // Close modal and navigate
    onClose();
    if (role === 'student') {
      navigate('/dashboard/student');
    } else {
      navigate('/dashboard/admin');
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container - Centers modal while allowing scroll */}
        <div className="min-h-screen flex items-center justify-center p-4">
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md my-8 overflow-hidden z-10"
          >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              {role === 'student' ? (
                <UserCircle size={32} />
              ) : (
                <Shield size={32} />
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-white/90 text-sm">
                  {role === 'student' ? 'Student' : 'Admin'} {isSignup ? 'Registration' : 'Login'}
                </p>
              </div>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="flex border-b dark:border-gray-700">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                role === 'student'
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <UserCircle size={18} className="inline mr-2" />
              Student
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                role === 'admin'
                  ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border-b-2 border-accent-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Shield size={18} className="inline mr-2" />
              Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignup}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={isSignup}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {isSignup ? (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </motion.button>

            <div className="text-center pt-4 border-t dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                >
                  {isSignup ? 'Login here' : 'Sign up here'}
                </button>
              </p>
            </div>
          </form>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
