import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Assuming Navbar can be used for admin section
import { useNavigate } from 'react-router-dom';

const AdminCallbackList = () => {
  const [callbackRequests, setCallbackRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCallbackRequests = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        navigate('/admin/login'); // Redirect to admin login if not authenticated
        return;
      }

      try {
        const userData = JSON.parse(user);
        if (userData.role !== 'admin') {
          navigate('/login'); // Redirect non-admin users
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
          localStorage.removeItem('token'); // Clear invalid token
          localStorage.removeItem('user');
          navigate('/admin/login');
        } else {
          setError('Failed to load callback requests. Server error.');
        }
        setLoading(false);
      }
    };

    fetchCallbackRequests();
  }, [navigate]);

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