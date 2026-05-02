// Fixed React Router App Component - No overlapping UI
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { HelmetProvider } from "react-helmet-async";
import { auth } from "./firebase";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

// Layout and Page Components
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import Settings from "./components/Settings";
import LandingPage from "./components/LandingPage";
import MapComponent from "./components/Map";
import InsightsPage from "./components/InsightsPage";
import ReportsPage from "./components/Reports/ReportsPage";
import InspectionPage from "./components/InspectionPage";
import ResourcesPage from "./components/ResourcesPage";
import AboutPage from "./components/AboutPage";
import Sitemap from "./components/Sitemap/Sitemap";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize user from localStorage on app startup
  useEffect(() => {
    console.log('🚀 App initializing...');
    document.title = "EstateIntel - Smart Property Decisions";
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Check localStorage first for immediate authentication
    const storedUser = localStorage.getItem('user');
    console.log('🔍 App startup - Checking localStorage for user:', !!storedUser);
    console.log('🌐 Current domain:', window.location.hostname);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('✅ User found in localStorage:', userData.email || userData.name || userData.fullName);
        console.log('📊 User data structure:', Object.keys(userData));
        setUser(userData);
        setIsLoading(false);
        console.log('👤 User authenticated on startup:', !!userData);
      } catch (error) {
        console.error('❌ Error parsing stored user data:', error);
        localStorage.removeItem('user');
        setIsLoading(false);
      }
    } else {
      console.log('📝 No user found in localStorage');
      setIsLoading(false);
    }
  }, []);

  // Listen to Firebase auth changes (for Google auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('� Firebase auth state changed:', firebaseUser?.email);
      
      if (firebaseUser) {
        // Firebase user is authenticated, check if we have stored user data
        const storedUser = localStorage.getItem('user');
        
        if (!storedUser) {
          // Create user data from Firebase for Google auth
          const userData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photo: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          console.log('✅ Firebase user created and stored:', userData.email);
        }
      } else {
        // Firebase user signed out, but don't clear localStorage if user logged in via email/password
        console.log('📝 Firebase user signed out, keeping localStorage auth if present');
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle redirects based on authentication state
  useEffect(() => {
    if (isLoading) return; // Don't redirect while loading
    
    const currentPath = window.location.pathname;
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = user || storedUser;
    
    console.log('🔍 Auth redirect check - Path:', currentPath, 'User:', !!user, 'StoredUser:', !!storedUser);
    
    if (isAuthenticated) {
      // User is authenticated
      if (currentPath === '/login' || currentPath === '/signup') {
        console.log('🚀 Redirecting authenticated user from auth page to home');
        navigate('/', { replace: true });
      }
    } else {
      // User is not authenticated
      if (currentPath !== '/login' && currentPath !== '/signup' && currentPath !== '/') {
        console.log('🚀 Redirecting unauthenticated user to login from:', currentPath);
        navigate('/login', { replace: true });
      }
    }
  }, [user, isLoading, location.pathname]);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      console.log('🚪 Starting logout process...');
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local state and storage
      localStorage.removeItem('user');
      setUser(null);
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      
      // Force logout even if Firebase fails
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/login" element={<PublicRoute user={user}><SignIn onLogin={handleLogin} /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute user={user}><SignIn onLogin={handleLogin} /></PublicRoute>} />

        {/* Home page - LandingPage with Layout */}
        <Route path="/" element={
          <ProtectedRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <LandingPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* About page - standalone */}
        <Route path="/about" element={
          <ProtectedRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <AboutPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Protected Routes with Layout */}
        <Route path="/app" element={
          <ProtectedRoute user={user}>
            <Layout user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route path="map" element={
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col min-h-screen">
              <div className="mb-6">
                <span className="text-primary font-bold uppercase tracking-widest text-sm italic">Live Tracking</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-2 text-text tracking-tight">Neighborhood Map</h1>
              </div>
              <div className="flex-grow h-[600px] md:h-0 rounded-3xl overflow-hidden shadow-premium border border-white/10 bg-card">
                <MapComponent />
              </div>
            </div>
          } />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="inspection" element={<InspectionPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        {/* Settings Route */}
        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <Settings user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* Legacy Dashboard Route - Redirect to home */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* Sitemap Route - Public */}
        <Route path="/sitemap.xml" element={<Sitemap />} />

        {/* Catch all route - redirect to login or home */}
        <Route path="*" element={
          user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
      
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#374151',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#ffffff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ffffff',
              secondary: '#ef4444',
            },
          },
          loading: {
            iconTheme: {
              primary: '#ffffff',
              secondary: '#3b82f6',
            },
          },
        }}
      />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
