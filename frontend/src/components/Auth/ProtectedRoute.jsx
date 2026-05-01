// Protected Route Component
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = isUserAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
