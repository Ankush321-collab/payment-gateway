import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [bgVisible, setBgVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showWidgets, setShowWidgets] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [userName, setUserName] = useState('');
  const boxRef = useRef(null);
  const audioRef = useRef(null);

  // Get user name from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email?.split('@')[0] || 'User');
      } catch {
        setUserName('User');
      }
    } else {
      setUserName('User');
    }
  }, []);

  // Animation and sound
  useEffect(() => {
    setTimeout(() => setBgVisible(true), 100);
    setTimeout(() => {
      setTextVisible(true);
      // Only play sound if not played after login
      if (audioRef.current && !localStorage.getItem('dashboardSoundPlayed')) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        localStorage.setItem('dashboardSoundPlayed', 'true');
      }
      let i = 0;
      const welcomeText = `Welcome to your Dashboard, ${userName}!`;
      const typeInterval = setInterval(() => {
        setTypedText(welcomeText.slice(0, i + 1));
        i++;
        if (i === welcomeText.length) {
          clearInterval(typeInterval);
          setTimeout(() => setShowWidgets(true), 900);
        }
      }, 40);
      return () => clearInterval(typeInterval);
    }, 900);
    // eslint-disable-next-line
  }, [userName]);

  const handleUserInteraction = () => {
    // No longer needed for sound, but keep for accessibility if needed
  };

  const handleMouseMove = (e) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden"
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
    >
      <audio ref={audioRef} src="/sound/open-the-gate-190234.mp3" preload="auto" />
      {/* More black, less greenish gradient background */}
      <div
        className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-1000 ${bgVisible ? 'opacity-100' : 'opacity-0'} animate-gradient-move`}
        style={{
          background: 'linear-gradient(120deg, #10151a 0%, #1a2a22 40%, #0a0f0f 100%)',
          filter: 'brightness(1) blur(0px)',
        }}
        aria-hidden="true"
      />
      {/* Subtle green overlay for effect */}
      <div className="fixed inset-0 z-0 pointer-events-none animate-gradient-move"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0) 70%)',
          mixBlendMode: 'screen',
        }}
      />
      <Navbar bgBlackOnlyOnDashboard />
      <div className="flex-grow flex justify-center items-center relative z-10">
        <div
          ref={boxRef}
          className={`relative rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-14 flex flex-col items-center justify-center transition-all duration-300 border-2 glassmorphic
            ${isHovered ? 'border-green-400 shadow-[0_0_32px_6px_rgba(34,197,94,0.4)]' : 'border-gray-700'}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          style={{
            minHeight: 420,
            background: 'rgba(17, 24, 39, 0.55)', // more transparent
            boxShadow: isHovered
              ? '0 0 32px 6px rgba(34,197,94,0.4), 0 4px 32px 0 rgba(34,197,94,0.15)'
              : '0 4px 32px 0 rgba(34,197,94,0.10)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Green spotlight effect */}
          {isHovered && (
            <div
              className="pointer-events-none absolute z-10"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
                width: 320,
                height: 320,
                background: 'radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0) 70%)',
                transition: 'all 0.1s ease-out',
                borderRadius: '50%',
              }}
            />
          )}
          {/* 3D Welcome text with pop-in, rotateX, and neon glow */}
          <div className="relative z-20 text-center mb-8 perspective-3d">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg transition-all duration-700
                ${textVisible ? 'opacity-100 scale-110 rotate-x-0' : 'opacity-0 scale-75 rotate-x-90'}
              `}
              style={{
                color: '#6ee7b7',
                textShadow: '0 0 24px #22c55e, 0 0 48px #16a34a, 0 0 8px #fff',
                letterSpacing: '0.04em',
                fontFamily: 'monospace',
                minHeight: 60,
                transform: textVisible
                  ? 'perspective(800px) rotateX(0deg) scale(1.1)'
                  : 'perspective(800px) rotateX(90deg) scale(0.75)',
                transition: 'all 0.7s cubic-bezier(.4,0,.2,1)',
                filter: textVisible ? 'blur(0)' : 'blur(8px)',
              }}
            >
              {typedText}
              <span className="animate-pulse text-green-300">{typedText.length < (`Welcome to your Dashboard, ${userName}!`).length ? '|' : ''}</span>
            </h1>
          </div>
          {/* Animated widgets/cards with navigation */}
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center mt-2">
            <WidgetLink
              to="/courses"
              show={showWidgets}
              delay={0}
              side="left"
              title="Your Courses"
              accentColor="#22c55e"
              content="See your enrolled courses and progress."
            />
            <WidgetLink
              to="/profile"
              show={showWidgets}
              delay={200}
              side="right"
              title="Profile"
              accentColor="#16a34a"
              content="Manage your profile and settings."
            />
          </div>
        </div>
      </div>
      <Footer />
      {/* Animation keyframes for gradient overlay */}
      <style>{`
        .animate-gradient-move {
          animation: gradient-move 7s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .perspective-3d { perspective: 800px; }
        .rotate-x-0 { transform: rotateX(0deg); }
        .rotate-x-90 { transform: rotateX(90deg); }
      `}</style>
    </div>
  );
};

// Animated widget component
const WidgetLink = ({ to, show, delay, side, title, accentColor, content }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      setTimeout(() => setVisible(true), delay);
    }
  }, [show, delay]);
  return (
    <Link
      to={to}
      className={`w-full md:w-1/2 p-6 rounded-2xl glassmorphic border border-green-600 shadow-lg transition-all duration-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 hover:scale-[1.03] active:scale-95 ${
        visible
          ? 'opacity-100 blur-0 translate-x-0'
          : `opacity-0 blur-md ${side === 'left' ? '-translate-x-16' : 'translate-x-16'}`
      }`}
      style={{
        boxShadow: `0 0 32px 2px ${accentColor}33, 0 2px 16px 0 #16a34a22`,
        background: 'rgba(17, 24, 39, 0.7)',
        backdropFilter: 'blur(8px)',
        textDecoration: 'none',
      }}
      tabIndex={0}
    >
      <h2 className="text-2xl font-semibold mb-2" style={{ color: accentColor }}>{title}</h2>
      <p className="text-gray-300">{content}</p>
    </Link>
  );
};

export default Dashboard; 