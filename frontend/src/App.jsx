// Fixed React Router App Component - No overlapping UI
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

// Layout and Page Components
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import Settings from "./components/Settings";
import LandingPage from "./components/LandingPage";
import MapComponent from "./components/Map";
import ProtectedRoute from "./components/ProtectedRoute";
import InsightsPage from "./components/InsightsPage";
import ReportsPage from "./components/ReportsPage";
import InspectionPage from "./components/InspectionPage";
import AboutPage from "./components/AboutPage";
import ResourcesPage from "./components/ResourcesPage";


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
        // Check if we already have user data from Google login
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            console.log('👤 User is signed in (from localStorage):', userData.name);
            
            // Only redirect if user is on auth pages
            if (currentPath === '/login' || currentPath === '/signup') {
              console.log('🚀 Redirecting to home from auth page:', currentPath);
              navigate('/');
            }
          } catch (error) {
            console.error('❌ Error parsing stored user data:', error);
            localStorage.removeItem('user');
          }
        } else {
          // Create user data from Firebase
          const userData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photo: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('👤 User is signed in (from Firebase):', firebaseUser.displayName);
          
          // Only redirect if user is on auth pages
          if (currentPath === '/login' || currentPath === '/signup') {
            console.log('🚀 Redirecting to home from auth page:', currentPath);
            navigate('/');
          }
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

        {/* Settings Route */}
        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <Settings user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* Legacy Dashboard Route - Redirect to home */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

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
  );
};

export default App;
