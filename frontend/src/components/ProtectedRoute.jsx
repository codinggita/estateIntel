import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 ProtectedRoute - Checking authentication...');
    
    // Check both user prop and localStorage for authentication
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      console.log('🔍 ProtectedRoute - User prop:', !!user, 'LocalStorage:', !!storedUser);
      
      if (user || storedUser) {
        setIsAuthenticated(true);
        console.log('✅ ProtectedRoute - User is authenticated');
      } else {
        setIsAuthenticated(false);
        console.log('❌ ProtectedRoute - User is not authenticated');
      }
      setIsLoading(false);
    };

    // Check immediately, no delay needed
    checkAuth();
  }, [user]);

  if (isLoading) {
    console.log('⏳ ProtectedRoute - Loading authentication state...');
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

  console.log('✅ ProtectedRoute - Rendering protected content');
  return children;
};

export default ProtectedRoute;
