import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminCallbackList from './pages/AdminCallbackList';
import Courses from './pages/Courses';
import OnlineTraining from './pages/OnlineTraining';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = () => {
    // Check if a token exists in localStorage
    return localStorage.getItem('token') !== null;
  };

  const isAdmin = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role === 'admin';
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        return false;
      }
    }
    return false;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-dark-home flex flex-col">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/"
              element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/online-training" element={<OnlineTraining />} />
            <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" replace />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/callbacks"
              element={isAdmin() ? <AdminCallbackList /> : <Navigate to="/admin/login" replace />}
            />
            {/* Add more routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 