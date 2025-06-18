import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ENQUIRY_OPTIONS = [
  'Online Courses (Website)',
  'Offline Courses',
  'Corporate Training',
  'Other',
];

const RequestCallback = ({ isOpen, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({
    name: '',
    phone: '',
    datetime: '',
    enquiry: ENQUIRY_OPTIONS[0],
  });
  const boxRef = useRef(null);

  const handleMouseMove = (e) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/callbacks/submit', {
        name: form.name,
        phone: form.phone,
        date: form.datetime,
        enquiryFor: form.enquiry,
      });
      toast.success('Your callback request has been submitted! Our team will contact you soon.');
      if (onClose) onClose();
    } catch (error) {
      toast.error('Failed to submit callback request. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={boxRef}
        className="rounded-lg p-8 max-w-md w-full relative overflow-hidden border-2 border-red-500 transition-all duration-300"
        onMouseMove={handleMouseMove}
        style={{
          background: 'linear-gradient(135deg, #0c0c0c 0%, #202020 100%)',
          boxShadow: '0 0 32px 8px rgba(255,0,0,0.45), 0 0 0 4px rgba(255,0,0,0.25)',
        }}
      >
        {/* Red glow effect */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,0,0,0.18) 0%, rgba(255,0,0,0) 70%)',
            transition: 'all 0.1s ease-out',
            zIndex: 1,
          }}
        />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-20"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1 text-white text-center">Request a callback</h2>
          <p className="text-gray-300 text-center mb-6">Fill the form below to request a callback from our team.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-grey-200 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-red-500 rounded-md text-white placeholder-black-400 focus:ring-2 focus:ring-red-500 focus:border-red-600 bg-transparent transition-all duration-200"
                placeholder="Name"
                style={{ background: 'transparent' }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">Phone</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black-400">
                  <i className="fas fa-phone"></i>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border-2 border-red-500 rounded-md text-white placeholder-black-400 focus:ring-2 focus:ring-red-500 focus:border-red-600 bg-transparent transition-all duration-200"
                  placeholder="Phone"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-200 mb-1">Select Date and Time</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  value={form.datetime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-red-500 rounded-md text-white placeholder-black-400 focus:ring-2 focus:ring-red-500 focus:border-red-600 bg-transparent transition-all duration-200"
                  placeholder="dd-mm-yyyy --:--"
                  style={{ background: 'transparent' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="far fa-calendar-alt"></i>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="enquiry" className="block text-sm font-medium text-gray-200 mb-1">Enquiry For</label>
              <select
                id="enquiry"
                name="enquiry"
                value={form.enquiry}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-red-500 rounded-md text-black-200  focus:ring-2 focus:ring-red-500 focus:border-red-600 bg-transparent transition-all duration-200"
                style={{ background: ' transparent' }}
              >
                {ENQUIRY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-red-600 hover:bg-teal-600 text-white font-bold rounded-md transition-colors text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestCallback; 