import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show success state
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center p-8 max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-300 mb-6">Your account has been successfully created. Redirecting to login...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-teal-400 to-green-400 p-6 text-white">
          <h2 className="text-2xl font-bold">Join us today</h2>
          <p className="opacity-90">Create your account in just a few steps</p>
        </div>
        
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border-l-4 border-red-400 p-4 text-red-300 rounded"
            >
              <p>{error}</p>
            </motion.div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                <FiUser className="h-5 w-5" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition placeholder-gray-400"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                <FiMail className="h-5 w-5" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition placeholder-gray-400"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                <FiLock className="h-5 w-5" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition placeholder-gray-400"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                <FiLock className="h-5 w-5" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition placeholder-gray-400"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-white font-medium rounded-lg shadow-md transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Sign up <FiArrowRight className="ml-2" />
              </>
            )}
          </motion.button>

          <div className="text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link 
              to="/login"
              className="font-medium text-teal-300 hover:text-teal-400 transition"
            >
              Sign in here
            </Link>
          </div>
        </form>
        
        <div className="px-6 py-4 bg-white/5 text-center text-xs text-gray-400 rounded-b-xl">
          By signing up, you agree to our Terms and Privacy Policy.
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;