import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import PostsList from './PostsList';

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/create"
          className="btn-primary"
        >
          Create New Post
        </Link>
      </div>
      
      <Routes>
        <Route index element={<PostsList />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard; 