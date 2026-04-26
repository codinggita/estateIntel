import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import TopSections from "./components/TopSections";
import BottomSections from "./components/BottomSections";
import SignIn from "./components/SignIn";
import MapComponent from "./components/Map";
import ResourcesPage from "./components/ResourcesPage";
import AboutPage from "./components/AboutPage";

function App() {
  useEffect(() => {
    document.title = "EstateIntel - Smart Property Decisions";
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      <Navigation />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignIn />} />
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
              <div className="flex-grow h-[600px] md:h-0 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                <MapComponent />
              </div>
            </div>
          } 
        />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/insights" element={<div className="pt-32 px-10 text-center"><h1 className="text-3xl font-black">Insights Dashboard</h1><p className="text-slate-500 mt-2">Coming soon: Advanced market analytics.</p></div>} />
        <Route path="/reports" element={<div className="pt-32 px-10 text-center"><h1 className="text-3xl font-black">Property Reports</h1><p className="text-slate-500 mt-2">Generate PDF investment reports in one click.</p></div>} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
