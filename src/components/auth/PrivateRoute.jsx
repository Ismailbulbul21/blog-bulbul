import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../common/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // Check if user exists and has admin role
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute; 