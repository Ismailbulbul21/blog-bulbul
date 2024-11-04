import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import PostsList from './PostsList';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
          >
            Admin Dashboard
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/admin/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create New Post
            </Link>
          </motion.div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Routes>
            <Route index element={<PostsList />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 