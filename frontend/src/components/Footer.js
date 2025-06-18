import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>Computer Point</p>
              <p>Phone: +977 9803293300</p>
              <p>Email: ankushadhikari321@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/courses" className="hover:text-gray-300">Courses</a></li>
              <li><a href="/online-training" className="hover:text-gray-300">Online Training</a></li>
              <li><a href="/profile" className="hover:text-gray-300">Profile</a></li>
            </ul>
          </div>

          {/* Let's Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Let's Connect With Us</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center space-x-2 hover:text-gray-300">
                <i className="fab fa-facebook text-2xl"></i>
                <span>Facebook</span>
              </a>
              <a href="https://wa.me/9779803293300" className="flex items-center space-x-2 hover:text-gray-300">
                <i className="fab fa-whatsapp text-2xl"></i>
                <span>WhatsApp</span>
              </a>
              <a href="mailto:ankushadhikari321@gmail.com" className="flex items-center space-x-2 hover:text-gray-300">
                <i className="fas fa-envelope text-2xl"></i>
                <span>Gmail</span>
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gray-300">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Computer Point. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 