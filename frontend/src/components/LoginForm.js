import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = ({ userType }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState(userType || 'user');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { ...formData, role: selectedLoginType });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (selectedLoginType === 'admin') {
        navigate('/admin/callbacks');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
      />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <form
        className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-8 py-10 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedLoginType('user')}
            className={`flex-1 py-2 rounded-full font-semibold transition-all
              ${selectedLoginType === 'user' 
                ? 'bg-teal-500 text-white border-teal-500' 
                : 'border border-teal-400 text-teal-300 bg-transparent'
              }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setSelectedLoginType('admin')}
            className={`flex-1 py-2 rounded-full font-semibold transition-all
              ${selectedLoginType === 'admin' 
                ? 'bg-teal-500 text-white border-teal-500' 
                : 'border border-teal-400 text-teal-300 bg-transparent'
              }`}
          >
            Admin
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-center">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiMail />
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email here"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 text-gray-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="flex justify-end mt-1">
            <a href="#" className="text-teal-300 text-xs hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-full bg-gradient-to-r from-teal-400 to-green-400 text-white font-bold text-lg shadow-md hover:from-teal-500 hover:to-green-500 transition disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In Now'}
        </button>
        <div className="text-center text-gray-300 text-sm mt-2">
          Don't have access yet?{' '}
          <Link to="/signup" className="text-teal-300 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
      <div className="relative text-center text-gray-400 text-xs mt-6">
        Copyright © 2025 Computer Point Nepal. All Rights Reserved.
      </div>
    </div>
  );
};

export default LoginForm; 