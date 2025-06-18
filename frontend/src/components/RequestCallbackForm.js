import React, { useState } from 'react';
import axios from 'axios';
import { FiX, FiCalendar, FiPhone } from 'react-icons/fi';

const RequestCallbackForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    enquiryFor: 'Online Courses (Website)',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/callbacks/submit', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        name: '',
        phone: '',
        date: '',
        enquiryFor: 'Online Courses (Website)',
      });
      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 2000); // Close after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FiX className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center">Request a callback</h2>
        <p className="text-gray-400 text-center mb-6">Fill the form below to request a callback from our team.</p>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm">{error}</div>}
        {successMessage && <div className="bg-green-500/20 text-green-300 p-3 rounded mb-4 text-sm">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-1">Phone</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-300 text-sm font-medium mb-1">Select Date and Time</label>
            <div className="relative">
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-teal-500 focus:border-teal-500 [&::-webkit-calendar-picker-indicator]:invert"
                required
              />
              <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="enquiryFor" className="block text-gray-300 text-sm font-medium mb-1">Enquiry For</label>
            <select
              id="enquiryFor"
              name="enquiryFor"
              value={formData.enquiryFor}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-teal-500 focus:border-teal-500 appearance-none pr-8"
              required
            >
              <option>Online Courses (Website)</option>
              <option>Offline Courses</option>
              <option>Career Counseling</option>
              <option>Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestCallbackForm; 