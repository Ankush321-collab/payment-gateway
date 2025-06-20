import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">Contact Us</h1>
      <p className="mb-2">Computer Point</p>
      <p className="mb-2">Phone: +977 9803293300</p>
      <p className="mb-2">Email: ankushadhikari321@gmail.com</p>
      <p className="mt-6 text-gray-400">We'd love to hear from you! Please reach out with any questions or feedback.</p>
    </div>
  </>
);

export default Contact; 