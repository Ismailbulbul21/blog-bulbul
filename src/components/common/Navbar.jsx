import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase/config';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L3 19H21L12 4Z" fill="currentColor"/>
              <circle cx="12" cy="14" r="3" fill="white"/>
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-300 transition-colors">
              BulbulTalk
            </span>
          </Link>
          <div className="flex space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 