import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logger from '../utils/logger';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
   TrendingUp,
   MapPin,
   DollarSign,
   School,
   Train,
   ShieldCheck,
   Zap,
   ChevronRight,
   Star,
   Download,
   Share2,
   Info,
   Loader2,
   Clock,
   Navigation as NavIcon,
   ArrowUpRight,
   BarChart3,
   Building,
   Heart,
   X,
   Sparkles,
   CircleCheck,
   AlertCircle,
   Search,
   Radar,
   Target,
   Hash,
   ArrowRight,
   Globe,
   Compass,
   Layers,
   Activity,
   Coffee,
   Utensils,
   Stethoscope,
   ShoppingBag,
   PieChart,
   ArrowRightCircle,
   FileText
} from 'lucide-react';

const InsightsPage = () => {
   const [selectedCity, setSelectedCity] = useState("Mumbai");
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [generatingReport, setGeneratingReport] = useState(false);
   const [report, setReport] = useState(null);
   const [showReport, setShowReport] = useState(false);
   const [progress, setProgress] = useState("");

   const fetchCityData = async (city) => {
      setLoading(true);
      try {
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

         const backendUrl = import.meta.env.VITE_API_URL || '';
         const response = await axios.get(`${backendUrl}/api/insights/${city}`, {
            signal: controller.signal
         });

         clearTimeout(timeoutId);
         setData(response.data);
      } catch (error) {
         if (error.name === 'AbortError') {
            logger.warn('City data fetch timeout');
         } else {
            logger.error('City data fetch failed:', error.message);
         }
      } finally {
         setLoading(false);
      }
   };

   const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         setSelectedCity(searchQuery);
         fetchCityData(searchQuery);
      }
   };

   const handleGenerateReport = async (location = selectedCity) => {
      setGeneratingReport(true);
      try {
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

         const backendUrl = import.meta.env.VITE_API_URL || '';
         const response = await axios.get(`${backendUrl}/api/insights/report/${location}`, {
            signal: controller.signal
         });

         clearTimeout(timeoutId);
         setReport(response.data);
         setShowReport(true);
      } catch (error) {
         if (error.name === 'AbortError') {
            logger.warn('Report generation timeout');
         } else {
            logger.error('Report generation failed:', error.message);
         }
      } finally {
         setGeneratingReport(false);
      }
   };

   const handleDownloadReport = async () => {
      const p1 = document.getElementById('report-page-1');
      const p2 = document.getElementById('report-page-2');
      if (!p1 || !p2) return;

      setGeneratingReport(true);
      const pdf = new jsPDF('p', 'mm', 'a4');

      try {
         setProgress("Generating Phase 01...");
         const c1 = await html2canvas(p1, { scale: 2.0, useCORS: true, backgroundColor: "#ffffff" });
         pdf.addImage(c1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);

         setProgress("Generating Phase 02...");
         pdf.addPage();
         const c2 = await html2canvas(p2, { scale: 2.0, useCORS: true, backgroundColor: "#ffffff" });
         pdf.addImage(c2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);

         setProgress("Archiving Document...");
         pdf.save(`EstateIntel_DeepAudit_${report.fullName.replace(/\s+/g, '_')}.pdf`);
      } catch (e) {
         window.print();
      } finally {
         setGeneratingReport(false);
         setProgress("");
      }
   };

   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-[10px] font-black text-slate-400 tracking-widest uppercase">Initializing Core</p>
         </div>
      );
   }

   if (generatingReport) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-[10px] font-black text-slate-400 tracking-widest uppercase">{progress || 'Generating Deep Audit...'}</p>
         </div>
      );
   }

   if (!data && !(showReport && report)) return (
      <div className="min-h-screen bg-bg font-sans">
         <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
               <div className="inline-flex items-center gap-2 mb-4 bg-card px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Sentiment Active</span>
               </div>
               <h2 className="text-6xl font-black text-text mb-8 tracking-tighter italic">
                  EstateIntel <span className="text-indigo-600 italic">Audit Hub.</span>
               </h2>
               <p className="text-slate-500 font-bold mb-8">Search any city or neighborhood to generate a deep real estate audit.</p>
               <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto">
                  <div className="flex items-center bg-card border border-white/10 rounded-[2rem] shadow-xl overflow-hidden p-1.5 group-focus-within:border-primary transition-all">
                     <div className="pl-6 text-slate-400">
                        <Search size={22} />
                     </div>
                     <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Analyze neighborhood context..."
                        className="flex-grow py-4 px-4 text-xl font-bold text-text outline-none placeholder:text-subtext/40 bg-transparent"
                     />
                     <button type="submit" disabled={generatingReport} className="bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95">
                        {generatingReport ? <Loader2 className="animate-spin" size={18} /> : 'Request'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );

   // Safe destructuring with fallbacks
   const { property = {}, overallScore = 0, verdict = "N/A" } = data || {};

   return (
      <div className="min-h-screen bg-bg font-sans selection:bg-primary/10">
         {/* 
        MAIN DASHBOARD VIEW 
      */}
         <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
               <div className="inline-flex items-center gap-2 mb-4 bg-card px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Sentiment Active</span>
               </div>
               <h2 className="text-6xl font-black text-text mb-8 tracking-tighter italic">
                  EstateIntel <span className="text-indigo-600 italic">Audit Hub.</span>
               </h2>

               <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto">
                  <div className="flex items-center bg-card border border-white/10 rounded-[2rem] shadow-xl overflow-hidden p-1.5 group-focus-within:border-primary transition-all">
                     <div className="pl-6 text-slate-400">
                        <Search size={22} />
                     </div>
                     <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Analyze neighborhood context..."
                        className="flex-grow py-4 px-4 text-xl font-bold text-text outline-none placeholder:text-subtext/40 bg-transparent"
                     />
                     <button type="submit" disabled={generatingReport} className="bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95">
                        Request
                     </button>
                  </div>
               </form>

               <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {["Mumbai", "Delhi", "Bangalore"].map((city) => (
                     <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`px-8 py-3 rounded-2xl font-bold text-xs transition-all border ${selectedCity === city
                           ? "bg-indigo-600 text-white border-indigo-600 shadow-xl"
                           : "bg-white text-slate-500 border-slate-200"
                           }`}
                     >
                        {city}
                     </button>
                  ))}
               </div>
            </div>

            {/* Hero Dashboard Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
               <div className="lg:col-span-8 relative rounded-[3.5rem] overflow-hidden shadow-2xl h-[520px] border-4 border-white group">
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent"></div>
                  <div className="absolute bottom-12 left-12">
                     <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 w-fit">
                        <MapPin size={14} className="text-indigo-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">{property.location}</span>
                     </div>
                     <h2 className="text-5xl font-black text-white mb-2 tracking-tighter leading-none italic uppercase">{property.name}</h2>
                     <p className="text-xl text-slate-300 font-bold">{property.details}</p>
                  </div>
               </div>

               <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 flex flex-col justify-between h-full shadow-xl relative overflow-hidden group">
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem]">
                              <Activity size={24} />
                           </div>
                           <div className="text-right">
                              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Index</div>
                              <div className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{overallScore}</div>
                           </div>
                        </div>
                        <div className="bg-bg p-8 rounded-[2rem] border border-white/10 mb-4 group-hover:border-primary transition-colors">
                           <h4 className="text-xl font-bold text-text mb-1 italic leading-tight uppercase">“{verdict}”</h4>
                           <p className="text-subtext font-bold text-[10px] uppercase tracking-widest mt-2">AI Logic Result</p>
                        </div>
                     </div>
                     <button
                        onClick={() => handleGenerateReport(selectedCity)}
                        disabled={generatingReport}
                        className="bg-primary text-white w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary/90 shadow-2xl transition-all"
                     >
                        {generatingReport ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Deep 2-Page Audit</>}
                     </button>
                  </div>
               </div>
            </div>

            {/* 
          BENTO GRID INSIGHT CARDS 
        */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
               {[
                  { icon: TrendingUp, title: "Price Accuracy", color: "emerald", tag: "OVERPRICED", content: "Current entry rates are 15% higher than city benchmark levels." },
                  { icon: NavIcon, title: "Transit Density", color: "blue", tag: "METRO 1KM", content: "High-density access to primary multi-modal transportation lines." },
                  { icon: School, title: "Ecology Score", color: "purple", tag: "98 INDEX", content: "Premium location with superior social infrastructure access." },
                  { icon: Building, title: "Portfolio Delta", color: "indigo", tag: "STABLE", content: "Optimized for long-term equity growth and capital preservation." },
                  { icon: ShieldCheck, title: "Security Matrix", color: "rose", tag: "HIGH", content: "Minimal incident data recorded within the local precinct." },
                  { icon: Activity, title: "Market Momentum", color: "amber", tag: "MEDIUM", content: "Consistent demand intensity from high-frequency professional clusters." }
               ].map((card, i) => (
                  <div key={i} className="bg-card p-10 rounded-[3.5rem] border border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px]">
                     <div className="flex items-center justify-between mb-10">
                        <div className={`p-4 bg-${card.color}-500/10 text-${card.color}-500 rounded-2xl`}>
                           <card.icon size={26} />
                        </div>
                        <span className="px-5 py-2 bg-bg border border-white/5 text-subtext rounded-full text-[10px] font-black uppercase tracking-widest">
                           {card.tag}
                        </span>
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-text mb-6 tracking-tight leading-none uppercase italic">{card.title}</h3>
                        <div className="bg-bg/50 p-6 rounded-[2rem] border border-white/5">
                           <p className="text-subtext font-bold text-xs leading-relaxed italic">
                              {card.content}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* 
        MULTI-PAGE DETAILED REPORT MODAL 
      */}
         {showReport && report && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-3xl overflow-hidden">
               <div className="relative bg-white w-full max-w-6xl h-[94vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">

                  {/* Header Controls */}
                  <div className="p-8 border-b-2 border-slate-200 flex items-center justify-between sticky top-0 z-20 bg-white/90 backdrop-blur-md">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
                           <FileText size={24} />
                        </div>
                        <div>
                           <h2 className="text-xl font-black text-slate-900 uppercase italic">Institutional Audit Hub</h2>
                           <p className="text-slate-400 font-bold text-[10px] mt-1 tracking-widest uppercase">{progress || "02 Pages Detected"}</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={handleDownloadReport} disabled={generatingReport} className="bg-indigo-600 text-white px-10 py-5 rounded-[1.75rem] font-black italic text-xs uppercase tracking-widest flex items-center gap-4 shadow-2xl disabled:bg-slate-700">
                           {generatingReport ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                           {generatingReport ? "Syncing..." : "Download Completed PDF"}
                        </button>
                        <button onClick={() => setShowReport(false)} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500">
                           <X size={32} />
                        </button>
                     </div>
                  </div>

                  {/* SCROLLABLE DOCUMENT PREVIEW */}
                  <div className="flex-grow overflow-y-auto p-12 bg-slate-100/50 custom-scrollbar flex flex-col gap-20 items-center">

                     {/* PAGE 1 */}
                     <div
                        id="report-page-1"
                        className="bg-white w-[210mm] min-h-[297mm] p-[30mm] shadow-2xl flex flex-col shrink-0 relative overflow-hidden"
                     >
                        <div className="absolute top-10 right-10 text-[10px] font-black text-slate-100 border border-slate-100 px-4 py-1 uppercase tracking-widest">CHAPTER 01</div>

                        <header className="border-b-[12px] border-slate-900 pb-16 mb-20 flex justify-between items-end">
                           <div>
                              <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-8">Area Audit</h1>
                              <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.8em]">Executive Summary • {new Date().toLocaleDateString()}</div>
                           </div>
                        </header>

                        <section className="mb-24 grow">
                           <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-12 italic">Subject Identification</div>
                           <div className="bg-slate-900 text-white p-16 rounded-[4rem] shadow-inner">
                              <h2 className="text-7xl font-black mb-8 tracking-tighter uppercase italic leading-[0.9]">{report.fullName}</h2>
                              <p className="text-2xl font-bold text-indigo-400 italic leading-snug">“{report.recommendation}”</p>
                           </div>
                        </section>

                        <section className="mb-24">
                           <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-12 italic">Market Health Index</div>
                           <div className="grid grid-cols-2 gap-20 items-center border-y-4 border-slate-50 py-16">
                              <div className="text-center">
                                 <div className="text-[12rem] font-black text-slate-900 leading-none tracking-[-0.05em] mb-6">{report.score}</div>
                                 <div className="flex justify-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                       <Star key={i} size={32} fill="currentColor" className={i < Math.floor(report.score) ? "text-indigo-600" : "text-slate-100"} />
                                    ))}
                                 </div>
                              </div>
                              <div className="space-y-12">
                                 <div className="bg-slate-50 p-10 border-l-[12px] border-slate-900">
                                    <p className="text-2xl font-black italic leading-tight text-slate-800 uppercase">Sentiment trajectory indicates an aggressive yield signal.</p>
                                 </div>
                                 <div>
                                    <div className="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-[0.4em]">Target Demographic</div>
                                    <div className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{report.bestFor}</div>
                                 </div>
                              </div>
                           </div>
                        </section>

                        <footer className="mt-auto pt-10 border-t border-slate-100 text-center">
                           <div className="text-[10px] font-black text-slate-200 uppercase tracking-[2em]">EstateIntel Analytics • Page 01</div>
                        </footer>
                     </div>

                     {/* PAGE 2 */}
                     <div
                        id="report-page-2"
                        className="bg-white w-[210mm] min-h-[297mm] p-[30mm] shadow-2xl flex flex-col shrink-0 relative overflow-hidden"
                     >
                        <div className="absolute top-10 right-10 text-[10px] font-black text-slate-100 border border-slate-100 px-4 py-1 uppercase tracking-widest">CHAPTER 02</div>

                        <header className="border-b-[12px] border-slate-900 pb-16 mb-20">
                           <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">Technical Audit</h1>
                        </header>

                        <section className="mb-20">
                           <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-12 italic">Deep-Spectral Analytics</div>
                           <div className="space-y-8">
                              {Object.entries(report.scores || {}).map(([key, value]) => (
                                 <div key={key} className="flex items-center gap-12 border-b-2 border-slate-50 pb-8 last:border-0">
                                    <div className="w-56">
                                       <div className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-1 italic leading-none">{key} Matrix</div>
                                    </div>
                                    <div className="flex-grow h-4 bg-slate-50 rounded-full overflow-hidden">
                                       <div className="h-full bg-slate-900" style={{ width: `${parseFloat(value) * 10}%` }}></div>
                                    </div>
                                    <div className="text-4xl font-black text-slate-900 w-24 text-right tabular-nums italic leading-none">{parseFloat(value).toFixed(1)}/10</div>
                                 </div>
                              ))}
                           </div>
                        </section>

                        <section className="mb-20">
                           <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-12 italic text-center">Facility Ecological Audit</div>
                           <div className="grid grid-cols-2 gap-10">
                              {[
                                 { title: "Educational Academies", items: ["Greenwood International", "DPS Public Academy", "Global Montessori Circle"] },
                                 { title: "Social Infrastructure", items: ["The Brew Hub", "Le Bistro & Cafe", "Elite Wellness Centre"] },
                                 { title: "Medical Primary Care", items: ["Apollo Clinic Premium", "City Care Medical", "MediConnect Multispeciality"] },
                                 { title: "Commercial Hubs", items: ["Urban Plaza Mall", "Central Mart Hub", "Grand Square Plaza"] }
                              ].map((res, i) => (
                                 <div key={i} className="bg-slate-50/50 p-10 border-t-[10px] border-slate-900">
                                    <h5 className="text-[12px] font-black text-slate-900 mb-6 tracking-[0.3em] uppercase leading-none italic text-center underline underline-offset-8 decoration-indigo-600/30">{res.title}</h5>
                                    <div className="space-y-4 text-center">
                                       {res.items.map(item => (
                                          <div key={item} className="text-[11px] font-bold text-slate-400 italic flex items-center justify-center gap-4">
                                             <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> {item}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </section>

                        <div className="mt-auto pt-10 border-t-[10px] border-slate-900">
                           <p className="text-[12px] font-bold text-slate-400 max-w-4xl italic leading-relaxed text-center">
                              Disclaimer: This dual-stream intelligence audit represents high-fidelity sentiment modeling data. All price forecasts are subject to market volatility. Approved for institutional asset review.
                           </p>
                           <div className="mt-8 text-center text-[10px] font-black text-slate-200 uppercase tracking-[3em]">EstateIntel Analytics • Page 02</div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default InsightsPage;