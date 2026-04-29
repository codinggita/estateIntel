import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import TopSections from "./components/TopSections";
import BottomSections from "./components/BottomSections";
import SignIn from "./components/SignIn";
import MapComponent from "./components/Map";
import ResourcesPage from "./components/ResourcesPage";
import AboutPage from "./components/AboutPage";
import InsightsPage from "./components/InsightsPage";
import ReportsPage from "./components/ReportsPage";

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    document.title = "EstateIntel - Smart Property Decisions";
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {user && <Navigation user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<PublicRoute user={user}><SignIn onLogin={handleLogin} /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute user={user}><SignIn onLogin={handleLogin} /></PublicRoute>} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute user={user}>
              <TopSections />
              <BottomSections />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/map" 
          element={
            <ProtectedRoute user={user}>
              <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col min-h-screen">
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <span className="text-indigo-600 font-black uppercase tracking-[.25em] text-sm italic">Live Tracking</span>
                  <h1 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 tracking-tight">Neighborhood Map</h1>
                </div>
                <div className="flex-grow h-[600px] md:h-0 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                  <MapComponent />
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="/resources" element={<ProtectedRoute user={user}><ResourcesPage /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute user={user}><InsightsPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute user={user}><ReportsPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute user={user}><AboutPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
