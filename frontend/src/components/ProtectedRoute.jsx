import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check both user prop and localStorage for authentication
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      console.log('🔍 ProtectedRoute - User prop:', !!user, 'LocalStorage:', !!storedUser);
      
      if (user || storedUser) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    // Small delay to ensure localStorage is ready
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-subtext">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🚀 ProtectedRoute - Redirecting to login (not authenticated)');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
