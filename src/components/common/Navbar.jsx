import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase/config';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Blog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
            <Link to="/contact" className="hover:text-blue-500">Contact</Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/admin" className="hover:text-blue-500">Admin</Link>
                )}
                <button 
                  onClick={() => auth.signOut()}
                  className="hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">Login</Link>
                <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                {user ? (
                  <>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        auth.signOut();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-500 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;