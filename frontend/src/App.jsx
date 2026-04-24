import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import TopSections from "./components/TopSections";
import BottomSections from "./components/BottomSections";
import SignIn from "./components/SignIn";

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
      <TopSections />
      <BottomSections />
    </div>
  );
}

export default App;
