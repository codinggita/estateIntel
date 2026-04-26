import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Map as MapIcon, 
  Search, 
  FileText, 
  Share2, 
  Calendar, 
  UserCheck, 
  Layout,
  ArrowRight,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-black text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-100">
      {number}
    </div>
    <div className="pt-1">
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 font-medium">{description}</p>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Intro Section */}
        <div className="max-w-3xl mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-indigo-600 font-black uppercase tracking-[.25em] text-sm italic">About EstateIntel</span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 text-slate-900 tracking-tight leading-[1.1]">
            Analyze property locations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Smart Insights</span>
          </h1>
          <p className="text-xl text-slate-500 mt-6 font-medium leading-relaxed">
            We help you make informed real estate decisions by analyzing neighborhood resources 
            and generating real-time intelligence reports for any location.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-black text-slate-900">Key Features</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={MapPin}
              title="Live Detection"
              description="Instantly detect your location to find hospitals, schools, and markets nearby."
            />
            <FeatureCard 
              icon={MapIcon}
              title="Interactive Maps"
              description="Real-time map integration with high-fidelity resource data and markers."
            />
            <FeatureCard 
              icon={Search}
              title="Smart Filters"
              description="Customize your search by location, resource type, and distance radius."
            />
            <FeatureCard 
              icon={FileText}
              title="Auto-Analysis"
              description="Automatically generate comprehensive reports based on surrounding amenities."
            />
            <FeatureCard 
              icon={Share2}
              title="Report Sharing"
              description="Easily share your generated location analysis with partners or clients."
            />
            <FeatureCard 
              icon={Calendar}
              title="Smart Booking"
              description="Personalized booking feature for detailed on-ground property analysis."
            />
            <FeatureCard 
              icon={UserCheck}
              title="Agent Visits"
              description="Our pro agents visit the location to create verified, detailed reports."
            />
            <FeatureCard 
              icon={Layout}
              title="Modern UI"
              description="Clean interface featuring resource cards and high-quality location imagery."
            />
          </div>
        </div>

        {/* How It Works Section - Sequenced Path & Invisible-to-Visible Reveal */}
        <div className="mb-20 py-10 relative">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-black text-slate-900 whitespace-nowrap italic">The Process</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          
          <div className="relative">
            {/* Animated Draw-Once Path (Desktop only) */}
            <div className="hidden lg:block absolute top-[40%] left-0 w-full h-1 overflow-hidden z-0 px-20">
              <div className="w-full h-full border-t-4 border-dashed border-slate-200 relative">
                 <div className="absolute top-[-4px] left-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 w-full animate-draw-path origin-left" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 - Pops at 0.1s */}
              <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative hover:-translate-y-2 transition-all duration-500 animate-pop-in delay-100">
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                   <MapPin size={28} />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-2">Locate</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   Fast neighborhood detection and custom search queries.
                 </p>
              </div>

              {/* Step 2 - Pops at 0.7s */}
              <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative hover:-translate-y-2 transition-all duration-500 animate-pop-in delay-[700ms]">
                 <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                   <RefreshCw size={28} />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-2">Discover</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   Real-time resource fetching from the global map network.
                 </p>
              </div>

              {/* Step 3 - Pops at 1.4s */}
              <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative hover:-translate-y-2 transition-all duration-500 animate-pop-in delay-[1400ms]">
                 <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                   <ShieldCheck size={28} />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-2">Analyze</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   Smart AI scoring based on density and lifestyle factors.
                 </p>
              </div>

              {/* Step 4 - Pops at 2.0s */}
              <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative hover:-translate-y-2 transition-all duration-500 animate-pop-in delay-[2000ms]">
                 <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                   <FileText size={28} />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-2">Export</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   Instant report generation or book pro agent verification.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
           <Link to="/reports">
             <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black flex items-center gap-3 mx-auto hover:bg-indigo-600 hover:scale-105 transition-all shadow-xl shadow-indigo-100">
                Start Analysing <ArrowRight size={20} />
             </button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
