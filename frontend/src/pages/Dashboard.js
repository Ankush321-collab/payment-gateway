import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard!</h1>
        <p className="text-lg text-gray-300">This is a placeholder for your user dashboard. You can add more content here.</p>
        <p className="text-gray-400 mt-4">Feel free to explore your courses, progress, and other features.</p>
      </div>
    </div>
  );
};

export default Dashboard; 