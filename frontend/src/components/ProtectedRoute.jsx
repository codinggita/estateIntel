import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 ProtectedRoute - Checking authentication...');
    
    // Check authentication immediately
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const isAuthenticated = user || storedUser;
      
      console.log('🔍 ProtectedRoute - User prop:', !!user, 'LocalStorage:', !!storedUser);
      console.log('🌐 Current domain:', window.location.hostname);
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('📊 Stored user data structure:', Object.keys(userData));
          console.log('📧 Stored user email:', userData.email || userData.name || 'No email');
        } catch (error) {
          console.error('❌ Error parsing stored user in ProtectedRoute:', error);
        }
      }
      
      setIsLoading(false);
    };

    // Small delay to ensure localStorage is ready
    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
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

  const storedUser = localStorage.getItem('user');
  const isAuthenticated = user || storedUser;

  if (!isAuthenticated) {
    console.log('🚀 ProtectedRoute - Redirecting to login (not authenticated)');
    console.log('🔍 Debug - User prop exists:', !!user);
    console.log('🔍 Debug - localStorage exists:', !!storedUser);
    return <Navigate to="/login" replace />;
  }

  console.log('✅ ProtectedRoute - Rendering protected content');
  return children;
};

export default ProtectedRoute;
