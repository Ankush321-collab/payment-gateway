import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import RequestCallback from './RequestCallback';
import { motion, AnimatePresence } from 'framer-motion';

// Fire SVG as a React component with animation
const FireLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 animate-fire-flame">
    <defs>
      <radialGradient id="fire-glow" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#fff176" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#ff9800" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#e65100" stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id="fire-main" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffde4" />
        <stop offset="60%" stopColor="#ff9800" />
        <stop offset="100%" stopColor="#e65100" />
      </linearGradient>
    </defs>
    <g>
      <ellipse cx="16" cy="28" rx="8" ry="4" fill="url(#fire-glow)" opacity="0.7" />
      <path d="M16 28c-4-6-7-10-7-15 0-5 4-9 7-11 3 2 7 6 7 11 0 5-3 9-7 15z" fill="url(#fire-main)" />
      <path d="M16 20c-2-3-3-5-3-7 0-2 2-4 3-5 1 1 3 3 3 5 0 2-1 4-3 7z" fill="#fffde4" fillOpacity="0.7" />
    </g>
  </svg>
);

// Add fire animation keyframes
const fireAnimationStyle = `<style>
@keyframes fire-flame {
  0%, 100% { transform: scaleY(1) translateY(0); filter: blur(0px); }
  20% { transform: scaleY(1.05) translateY(-2px) scaleX(0.98); filter: blur(0.5px); }
  40% { transform: scaleY(0.97) translateY(1px) scaleX(1.02); filter: blur(0.2px); }
  60% { transform: scaleY(1.04) translateY(-1.5px) scaleX(0.99); filter: blur(0.4px); }
  80% { transform: scaleY(0.98) translateY(1.5px) scaleX(1.01); filter: blur(0.1px); }
}
.animate-fire-flame { animation: fire-flame 1.2s infinite cubic-bezier(.4,0,.2,1); }
</style>`;
document.head.insertAdjacentHTML('beforeend', fireAnimationStyle);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const navigate = useNavigate();

  // Framer Motion variants for Navbar
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#2dd4bf" }, // teal-400
    tap: { scale: 0.95 }
  };

  // Framer Motion variants for Profile Dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  // Framer Motion variants for Mobile Navigation items
  const mobileLinkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email.split('@')[0]);
        setIsAdminUser(userData.role === 'admin');
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        setUserName('User');
        setIsAdminUser(false);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setIsAdminUser(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setIsAdminUser(false);
    navigate('/login'); // Redirect to login page after logout
    setShowProfileDropdown(false);
  };

  return (
    <motion.nav 
      className="bg-transparent text-white p-4 relative z-20"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Site Title */}
        <Link to="/home" className="flex items-center space-x-2">
          <FireLogo />
          <span className="text-lg font-bold bg-gradient-to-r from-code-help-start to-code-help-end bg-clip-text text-fill-transparent">Computer Point Nepal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}><Link to="/home" className="hover:text-teal-400 transition-colors">Home</Link></motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}><Link to="/courses" className="hover:text-teal-400 transition-colors">Courses</Link></motion.div>
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}><Link to="/online-training" className="hover:text-teal-400 transition-colors">OnlineTraining</Link></motion.div>
          
          {isAdminUser ? (
            <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
              <Link to="/admin/callbacks" className="hover:text-teal-400 transition-colors">User Callbacks</Link>
            </motion.div>
          ) : (
            <motion.button 
              whileHover="hover" 
              whileTap="tap" 
              variants={linkVariants}
              onClick={() => setShowCallbackModal(true)} 
              className="hover:text-teal-400 transition-colors bg-transparent border-none cursor-pointer text-base p-0"
            >
              Request Callback
            </motion.button>
          )}
          
          {isLoggedIn ? (
            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className="text-teal-400 font-medium mr-2">{userName}</span>
                <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" onClick={() => setShowProfileDropdown(false)}>Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Sign Out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition-colors">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-transparent py-4 absolute top-full left-0 w-full shadow-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { 
                opacity: 1, 
                height: "auto", 
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              },
              exit: {
                opacity: 0, 
                height: 0, 
                transition: {
                  when: "afterChildren",
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div variants={mobileLinkVariants} whileHover="hover" whileTap="tap" className="w-full text-center"><Link to="/home" className="block hover:text-teal-400 transition-colors py-2" onClick={() => setIsOpen(false)}>Home</Link></motion.div>
              <motion.div variants={mobileLinkVariants} whileHover="hover" whileTap="tap" className="w-full text-center"><Link to="/courses" className="block hover:text-teal-400 transition-colors py-2" onClick={() => setIsOpen(false)}>Courses</Link></motion.div>
              <motion.div variants={mobileLinkVariants} whileHover="hover" whileTap="tap" className="w-full text-center"><Link to="/online-training" className="block hover:text-teal-400 transition-colors py-2" onClick={() => setIsOpen(false)}>KODR</Link></motion.div>
              
              {isAdminUser ? (
                <motion.div variants={mobileLinkVariants} whileHover="hover" whileTap="tap" className="w-full text-center">
                  <Link to="/admin/callbacks" className="block hover:text-teal-400 transition-colors py-2" onClick={() => setIsOpen(false)}>User Callbacks</Link>
                </motion.div>
              ) : (
                <motion.button 
                  variants={mobileLinkVariants}
                  whileHover="hover" 
                  whileTap="tap" 
                  onClick={() => { setShowCallbackModal(true); setIsOpen(false); }} 
                  className="hover:text-teal-400 transition-colors bg-transparent border-none cursor-pointer text-base p-0 w-full text-center py-2"
                >
                  Request Callback
                </motion.button>
              )}
              
              {isLoggedIn ? (
                <>
                  <motion.span variants={mobileLinkVariants} className="text-teal-400 font-medium py-2">{userName}</motion.span>
                  <motion.div variants={mobileLinkVariants} whileHover="hover" whileTap="tap" className="w-full text-center"><Link to="/profile" className="block hover:text-teal-400 transition-colors py-2" onClick={() => { setShowProfileDropdown(false); setIsOpen(false); }}>Profile</Link></motion.div>
                  <motion.button variants={mobileLinkVariants} onClick={handleLogout} className="w-full text-center py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full transition-colors" style={{ maxWidth: '150px' }}>Sign Out</motion.button>
                </>
              ) : (
                <motion.div variants={mobileLinkVariants} className="w-full text-center">
                  <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition-colors inline-block" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Callback Modal */}
      {showCallbackModal && (
        <RequestCallback 
          isOpen={showCallbackModal}
          onClose={() => setShowCallbackModal(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navbar; 