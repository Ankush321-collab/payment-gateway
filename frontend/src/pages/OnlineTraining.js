import React from 'react';
import Navbar from '../components/Navbar';

const OnlineTraining = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">Online Training (KODR)</h1>
        <p className="text-lg text-gray-300">Information about our online training programs will be displayed here.</p>
      </div>
    </div>
  );
};

export default OnlineTraining; 