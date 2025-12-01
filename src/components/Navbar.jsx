// src/components/Navbar.jsx - Tailwind Version
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <span className="text-4xl transform group-hover:scale-110 transition-transform duration-200">
              🏛️
            </span>
            <div className="hidden sm:block">
              <span className="text-white text-xl font-bold">Ontario ADA</span>
              <span className="text-primary-100 text-sm block">Compliance Analyzer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition duration-200 font-medium"
              >
                📊 Dashboard
              </Link>
              <Link
                to="/analyze"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition duration-200 font-medium"
              >
                🔍 Analyze
              </Link>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3 border-l border-white/20 pl-4 ml-4">
                <div className="text-right hidden lg:block">
                  <p className="text-white text-sm font-medium">{user.email}</p>
                  <p className="text-primary-100 text-xs">{user.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && mobileMenuOpen && (
        <div className="md:hidden bg-primary-700 border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/dashboard"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/analyze"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔍 Analyze
            </Link>
            <div className="border-t border-white/10 pt-2 mt-2">
              <p className="text-white px-4 py-2 text-sm font-medium">{user.email}</p>
              <p className="text-primary-100 px-4 text-xs mb-2">{user.email}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-white hover:bg-white/10 px-4 py-2 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
