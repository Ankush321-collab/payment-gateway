import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FiArrowUpRight, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import Footer from '../components/Footer';

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    hover: { scale: 1.1, rotate: 10 },
    tap: { scale: 0.9 }
  };

  // Mouse move handler for spotlight effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark-home text-white overflow-hidden relative">
      <Navbar />
     
      <div className="container mx-auto py-16 px-4 md:px-8 relative z-10">
        {/* Top Right Arrow Icon */}
        <motion.div 
          className="absolute top-0 right-0 p-4 md:p-8"
          initial={{ opacity: 0, x: 50, y: -50, rotate: 0 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-codehelp-green bg-[#18181b] shadow-codehelp-glow">
            <FiTrendingUp className="h-8 w-8 text-codehelp-green" />
          </span>
        </motion.div>

        <div className="flex justify-center items-center min-h-[60vh]">
          <div
            className={`w-full max-w-5xl p-8 md:p-16 flex flex-col md:flex-row gap-10 md:gap-0 relative overflow-hidden bg-[#18181b] rounded-3xl transition-all duration-300 ${hovered ? 'border-[1.5px] border-codehelp-green shadow-[0_0_24px_2px_rgba(34,216,131,0.2)]' : 'border-[1.5px] border-transparent shadow-none'}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ cursor: hovered ? 'pointer' : 'default' }}
          >
            {/* Green spotlight effect */}
            {hovered && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 1,
                  background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,216,131,0.18) 0%, rgba(34,216,131,0.10) 40%, transparent 80%)`,
                  transition: 'background 0.2s',
                }}
              />
            )}
            {/* Left Column: Who are We Section */}
            <motion.div 
              className="md:w-1/2 flex flex-col justify-center relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={itemVariants} className="text-codehelp-green text-lg font-semibold mb-2">Who are We</motion.p>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Empowering Coders,<br />Enabling Dreams
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base text-gray-300 max-w-lg mb-8">
                Unveil the essence of Computer Point Nepal: a trusted institute and community-driven platform dedicated to empowering learners in computer education and IT skills.<br />
                <br />
                Discover who we are and how we're shaping the future of coding education.
              </motion.p>
              <motion.div variants={itemVariants} className="flex gap-4">
                <Link 
                  to="/contact"
                  className="inline-block bg-[#6d7ee6] hover:bg-[#5a6ad1] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-colors"
                >
                  Let's Connect
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Features */}
            <motion.div 
              className="md:w-1/2 flex flex-col gap-8 justify-center relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Grow: Elevate Your Career */}
              <motion.div variants={itemVariants} className="flex gap-4 items-start border-b border-gray-700 pb-8">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-codehelp-green bg-[#18181b]">
                  <FiTrendingUp className="h-6 w-6 text-codehelp-green" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Grow: Elevate Your Career</h2>
                  <p className="text-gray-400 text-sm">
                    Climb with Computer Point Nepal Grow. Upskill through Computer Point Nepal and achieve career success.
                  </p>
                </div>
              </motion.div>
              {/* Hands-On Learning Experience */}
              <motion.div variants={itemVariants} className="flex gap-4 items-start">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-400 bg-[#18181b]">
                  <FiBookOpen className="h-6 w-6 text-yellow-400" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Hands-On Learning Experience</h2>
                  <p className="text-gray-400 text-sm">
                    Emphasize that your courses are crafted by industry experts to ensure high-quality, up-to-date content.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 