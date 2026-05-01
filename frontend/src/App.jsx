// Fixed React Router App Component - No overlapping UI
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ThemeProvider } from "./context/ThemeContext";

// Layout and Page Components
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import MapComponent from "./components/Map";
import ResourcesPage from "./components/ResourcesPage";
import AboutPage from "./components/AboutPage";
import InsightsPage from "./components/InsightsPage";
import ReportsPage from "./components/ReportsPage";
import InspectionPage from "./components/InspectionPage";
import LandingPage from "./components/LandingPage";

// Component to protect routes
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Component to redirect if already logged in
const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EstateIntel - Smart Property Decisions";
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const currentPath = window.location.pathname;
      console.log('🔍 onAuthStateChanged - Current path:', currentPath, 'User:', firebaseUser?.displayName);
      
      if (firebaseUser) {
        // User is signed in
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('👤 User is signed in:', firebaseUser.displayName);
        
        // Only redirect if user is on auth pages and NOT already on home
        // This prevents interfering with manual navigation or redirects from login flow
        if ((currentPath === '/login' || currentPath === '/signup') && currentPath !== '/') {
          console.log('🚀 Redirecting to home from auth page:', currentPath);
          // Use setTimeout to avoid race conditions with login component redirects
          setTimeout(() => {
            if (window.location.pathname === currentPath) { // Double check we're still on the same page
              navigate('/');
            }
          }, 100);
        }
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('user');
        console.log('👤 User is signed out');
        
        // Only redirect to login if on protected routes
        if (currentPath !== '/login' && currentPath !== '/signup') {
          console.log('🚀 Redirecting to login from:', currentPath);
          navigate('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [location.pathname]);

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

        {/* Legacy Dashboard Route - Redirect to home */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* Catch all route - redirect to login or home */}
        <Route path="*" element={
          user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
