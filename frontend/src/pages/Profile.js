import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        navigate('/login'); // Redirect if user data is corrupted
      }
    } else {
      navigate('/login'); // Redirect if no user data found
    }
  }, [navigate]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">User Profile</h1>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 max-w-md">
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Name:</span> <span className="text-white">{userData.name}</span>
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Email:</span> <span className="text-white">{userData.email}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-300">Role:</span> <span className="text-white">{userData.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 