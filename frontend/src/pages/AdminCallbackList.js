import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Assuming Navbar can be used for admin section
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminCallbackList = () => {
  const [callbackRequests, setCallbackRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCallbackRequests = async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:5000/api/callbacks/all', config);
      setCallbackRequests(response.data.requests);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching callback requests:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('You are not authorized to view this page. Please log in as an administrator.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
      } else {
        setError('Failed to load callback requests. Server error.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallbackRequests();
  }, [navigate]);

  const handleMarkAsViewed = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`http://localhost:5000/api/callbacks/${id}/view`, {}, config);
      const updatedCallback = response.data.callback;

      setCallbackRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === id
            ? { ...request, isViewed: true, deleteAt: updatedCallback.deleteAt }
            : request
        )
      );

      toast.success('Marked as viewed. This request will be deleted automatically in 1 hours.');
      fetchCallbackRequests();
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('This callback no longer exists.');
        setCallbackRequests(prev => prev.filter(request => request._id !== id));
        fetchCallbackRequests();
      } else {
        toast.error(error.response?.data?.message || 'Failed to mark callback as viewed');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/callbacks/${id}`, config);
      setCallbackRequests(prev => prev.filter(request => request._id !== id));
      toast.success('Callback request deleted successfully');
      fetchCallbackRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete callback request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading callback requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar /> {/* You might want a separate Admin Navbar for consistency */}
      <div className="container mx-auto py-16 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-teal-400">Admin: Callback Requests</h1>
        
        {callbackRequests.length === 0 ? (
          <p className="text-gray-400">No callback requests found.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Enquiry For</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Submitted At</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {callbackRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{request.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{new Date(request.date).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{request.enquiryFor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : request.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{new Date(request.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                      {request.isViewed ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(request._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                          >
                            Delete
                          </motion.button>
                          {request.deleteAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              Scheduled for deletion: {new Date(request.deleteAt).toLocaleString()}
                            </p>
                          )}
                        </>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMarkAsViewed(request._id)}
                          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200"
                        >
                          Mark as Viewed
                        </motion.button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCallbackList; 