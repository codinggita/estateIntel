import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Map, Zap, Droplets, Building2, Shield, Brain, Check, AlertTriangle, TrendingUp, MessageSquare, Download, Mail } from 'lucide-react';

const TopSections = () => {
  const navigate = useNavigate();

  const handleGetNeighborhoodReport = () => {
    navigate('/reports');
  };

  const handleBookInspection = () => {
    navigate('/inspection');
  };

  return (
  <>
    {/* Hero Section */}
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full text-green-700 font-bold text-sm shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Trusted by 10,000+ Indian homebuyers
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 tracking-tight">
            Make Smart Property Decisions with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Data & Inspection</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
            Before you invest crores, know what you're really buying. Get standardized neighborhood reports and pre-purchase property inspections — all in one trusted platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleGetNeighborhoodReport}
              className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 group"
            >
              <Map size={20} />
              Get Neighborhood Report
            </button>
            <button 
              onClick={handleBookInspection}
              className="bg-white text-slate-900 border-2 border-slate-200 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
            >
              Book Inspection →
            </button>
          </div>
        </div>
        
        <div className="relative animate-in fade-in slide-in-from-right duration-1000">
          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-[3rem]"></div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/50">
            <img 
              src="/dashboard.png" 
              alt="EstateIntel Data Dashboard" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Solutions Section */}
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-indigo-600 font-black uppercase tracking-[.25em] text-sm italic">Our Solutions</span>
        <h2 className="text-4xl md:text-5xl font-black mt-4 mb-16 text-slate-900 tracking-tight">Two powerful tools. One smart decision.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-left group hover:-translate-y-2 transition-all duration-500">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl mb-8 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              <Search size={40} />
            </div>
            <h3 className="text-3xl font-black mb-4 text-slate-900">Neighborhood Intel</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">Analyze any project or locality across schools, safety, amenities, and water quality before you buy.</p>
            <ul className="space-y-4 mb-10">
              {["Water stability & quality reports", "School & hospital accessibility", "Neighborhood safety audit", "Future appreciation potential"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold">
                  <div className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={handleGetNeighborhoodReport}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all"
            >
              Get Neighborhood Report
            </button>
          </div>
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-left group hover:-translate-y-2 transition-all duration-500">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl mb-8 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-3xl font-black mb-4 text-slate-900">Property Audit</h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">Experts physically audit the property for seepage, structural damage, plumbing, and electrical issues.</p>
             <ul className="space-y-4 mb-10">
              {["120-point digital checklist", "Thermal imaging for leaks", "Electrical safety audit", "Standardized defect report"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold">
                  <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={handleBookInspection}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              Book Property Audit
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-emerald-600 font-black uppercase tracking-[.25em] text-sm italic">Features</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 text-slate-900 tracking-tight">Standardized property intelligence</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { title: "Standardized Ratings", desc: "Compare any two properties using our objective 1-10 scores.", icon: <Check size={28} /> },
            { title: "Risk Identification", desc: "Know about potential seepage, structural flaws, or document issues.", icon: <AlertTriangle size={28} /> },
            { title: "Defect Tracking", desc: "Track all identified defects and their repair estimates.", icon: <TrendingUp size={28} /> },
            { title: "Digital Inspections", desc: "Proprietary 120-point digital checklist.", icon: <MessageSquare size={28} /> },
            { title: "Instant Reports", desc: "Download high-quality PDF reports instantly.", icon: <Download size={28} /> },
            { title: "Expert Support", desc: "Talk to our senior civil engineers.", icon: <Mail size={28} /> }
          ].map((feature, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="shrink-0 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default TopSections;
