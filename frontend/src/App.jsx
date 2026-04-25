import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import TopSections from "./components/TopSections";
import BottomSections from "./components/BottomSections";
import SignIn from "./components/SignIn";
import MapComponent from "./components/Map";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    document.title = "EstateIntel - Smart Property Decisions";
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  if (showSignIn) {
    return <SignIn onBack={() => setShowSignIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      <Navigation onSignIn={() => setShowSignIn(true)} />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <TopSections />
              <BottomSections />
            </>
          } 
        />
        <Route 
          path="/map" 
          element={
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col min-h-screen">
              <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <span className="text-indigo-600 font-black uppercase tracking-[.25em] text-sm italic">Live Tracking</span>
                <h1 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 tracking-tight">Neighborhood Map</h1>
              </div>
              <div className="flex-grow rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                <MapComponent />
              </div>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
