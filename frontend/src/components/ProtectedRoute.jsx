import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import logger from '../utils/logger';

const ProtectedRoute = ({ user, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication immediately without delay
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = user || storedUser;
        
        if (storedUser) {
          try {
            JSON.parse(storedUser); // Validate JSON format
          } catch (error) {
            logger.warn('Invalid stored user data in ProtectedRoute:', error);
            localStorage.removeItem('user');
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        logger.error('ProtectedRoute auth check error:', error);
        setIsLoading(false);
      }
    };

    // Check immediately without delay to prevent blocking
    checkAuth();
  }, [user]);

  if (isLoading) {
    // Minimal loading state to prevent blocking FCP
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text" role="status" aria-label="Checking authentication">
        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden="true"></div>
      </div>
    );
  }

  const storedUser = localStorage.getItem('user');
  const isAuthenticated = user || storedUser;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
