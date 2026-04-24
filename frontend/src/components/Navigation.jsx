import React from 'react';
import { Shield } from 'lucide-react';

const Navigation = ({ onSignIn }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
           <Shield size={24} fill="currentColor" />
        </div>
        <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          estateIntel
        </span>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
        <span className="hover:text-indigo-600 transition-colors cursor-default">Home</span>
        <span className="hover:text-indigo-600 transition-colors cursor-default">Map</span>
        <span className="hover:text-indigo-600 transition-colors cursor-default">Resources</span>
        <span className="hover:text-indigo-600 transition-colors cursor-default">Insights</span>
        <span className="hover:text-indigo-600 transition-colors cursor-default">Reports</span>
        <span className="hover:text-indigo-600 transition-colors cursor-default">About</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onSignIn}
          className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors px-4 py-2"
        >
          Sign in
        </button>
        <button className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-full hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 transition-all active:scale-95">
          Get started
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;
