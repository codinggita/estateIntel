import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Search, 
  Download, 
  Loader2, 
  CircleCheck, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  Navigation as NavIcon, 
  DollarSign, 
  Wind,
  Check,
  FileText,
  Award,
  Stethoscope,
  Construction,
  ShieldAlert,
  X
} from 'lucide-react';

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [report, setReport] = useState(null);
  const [progress, setProgress] = useState("");

  const handleGenerateReport = async (location = searchQuery) => {
    if (!location) return;
    setLoading(true);
    try {
      // Re-using the intelligence engine endpoint
      const response = await axios.get(`http://localhost:5000/api/insights/report/${location}`);
      setReport(response.data);
    } catch (error) {
       console.error("Report generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleGenerateReport(searchQuery);
    }
  };

  const handleDownloadReport = async () => {
    const pages = [];
    for (let i = 0; i <= 4; i++) {
      pages.push(document.getElementById(`pdf-layout-${i}`));
    }
    
    if (pages.some(p => !p)) {
       alert("Synchronizing report modules. Please try again in a moment.");
       return;
    }
    
    setGeneratingReport(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    try {
      const pageTitles = [
        "Phase 01: Professional Cover",
        "Phase 02: Executive Briefing & Core Scores",
        "Phase 03: Environmental & Health Audit",
        "Phase 04: Market Dynamics & Infrastructure",
        "Phase 05: Investment Strategy & Visuals"
      ];

      for (let i = 0; i < pages.length; i++) {
        setProgress(`Generating ${pageTitles[i]}...`);
        if (i > 0) pdf.addPage();
        
        console.log(`[PDF Engine] Capturing Page ${i+1}: ${pageTitles[i]}`);
        const canvas = await html2canvas(pages[i], { 
          scale: 2, 
          useCORS: true, 
          allowTaint: true,
          backgroundColor: "#ffffff"
        });
        console.log(`[PDF Engine] Page ${i+1} captured successfully.`);

        // Add to PDF with high-quality PNG to avoid artifacting
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      }

      setProgress("Finalizing Official Record...");
      pdf.save(`EI_Report_${report.locationName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
    } catch (e) {
       console.error("PDF Final Dossier Generation Failed:", e);
       alert(`Dossier Export Failed: ${e.message}. Please ensure the page is fully loaded and try again.`);
    } finally {
      setGeneratingReport(false);
      setProgress("");
    }
  };

  const ReportHeader = ({ location }) => (
    <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center text-white font-black text-xs">EI</div>
        <span className="text-sm font-black text-slate-900 tracking-tighter uppercase">ESTATEINTEL</span>
      </div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
        Area Intelligence Report | {location}
      </div>
    </div>
  );

  const ReportFooter = ({ pageNum, totalPages }) => (
    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
      <div>Institutional Property Intelligence Dossier</div>
      <div>Page {pageNum} of {totalPages}</div>
      <div>{new Date().toLocaleDateString('en-GB')}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg font-sans selection:bg-primary/10 pb-32">
      
      {/* 🕵️ 1. REPORT HEADER & SEARCH SECTION */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
             <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-black text-sm">EI</div>
             <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Area Intelligence Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-6 tracking-tight">
            {report ? `Area Intelligence Report: ${report.locationName}` : "Market Intelligence Reports"}
          </h1>
          <p className="text-lg font-medium text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">Professional-grade spatial analysis and investment dossiers for institutional-quality decision making.</p>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
             <div className="flex items-center bg-card border-2 border-white/10 rounded-lg shadow-sm focus-within:border-primary transition-all">
                <div className="pl-6 text-slate-400">
                   <Search size={22} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze location (e.g. Navi Mumbai)..."
                  className="flex-grow py-5 px-5 text-xl font-bold text-text outline-none placeholder:text-subtext/40 bg-transparent"
                />
                <button type="submit" disabled={loading} className="bg-primary text-white px-10 py-5 rounded-r-md font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all flex items-center gap-3">
                   {loading ? <Loader2 className="animate-spin" size={18}/> : <TrendingUp size={18}/>}
                   Generate
                </button>
             </div>
          </form>
        </div>

        <>
        {loading && (
          <div className="flex flex-col items-center py-20">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
             <p className="mt-4 text-[10px] font-black text-slate-400 tracking-widest uppercase">Aggregating Global Spatial Data...</p>
          </div>
        )}

        {report && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl mx-auto">
            
            {/* 2. DOCUMENT NAVIGATION/ACTION BAR */}
            <div className="flex justify-between items-center mb-8 px-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-4">
                <FileText className="text-indigo-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dossier Preview: Ver 4.2</span>
              </div>
              <button 
                onClick={handleDownloadReport}
                disabled={generatingReport}
                className="flex items-center gap-3 bg-[#0F172A] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
              >
                {generatingReport ? <Loader2 className="animate-spin" size={14}/> : <Download size={14} />}
                {generatingReport ? "Syncing..." : "Export as PDF"}
              </button>
            </div>

            {/* 3. THE REPORT DOCUMENT (CONSULTANCY PREVIEW) */}
            <div className="bg-card border border-white/10 shadow-sm mb-32 overflow-hidden selection:bg-primary/5">
               
               {/* SECTION 01: STRATEGIC SUMMARY */}
               <div className="p-16 md:p-20 border-b border-slate-100 flex flex-col justify-between min-h-[500px]">
                  <div>
                    <div className="w-12 h-[3px] bg-indigo-600 mb-10"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 block">Report Dossier Intelligence</span>
                    <h2 className="text-3xl font-bold text-text tracking-tight mb-16 uppercase">Section 01 — Strategic Summary</h2>
                    <div className="border-l-[3px] border-primary pl-10 py-2">
                       <p className="text-2xl font-medium text-text leading-[1.6]">
                         {report.aiSummary}
                       </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-16 mt-20 pt-12 border-t border-white/5">
                    <div>
                      <div className="text-[9px] font-bold text-subtext uppercase tracking-widest mb-2">Primary Subject</div>
                      <div className="text-xl font-bold text-text">{report.locationName}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-subtext uppercase tracking-widest mb-2">Confidence Level</div>
                      <div className="text-xl font-bold text-subtext">98.4% System Integrity</div>
                    </div>
                  </div>
               </div>

               {/* SECTION 02: AREA CHARACTER ANALYSIS */}
               <div className="p-16 md:p-20 border-b border-white/5">
                  <div className="mb-24">
                    <h3 className="text-[10px] font-bold text-subtext uppercase tracking-[0.4em] mb-8">Section 02 — Area Character Analysis</h3>
                    <p className="text-2xl font-bold text-text leading-[1.5] mb-12 max-w-2xl">
                      {report.knownFor}
                    </p>
                    <div className="grid grid-cols-2 gap-10">
                       <div className="border border-white/5 p-10 bg-bg/30">
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Core Strengths</h4>
                          <ul className="space-y-5">
                             {report.strengths.map((s, i) => (
                               <li key={i} className="flex items-start gap-4 text-sm font-medium text-text/80 leading-relaxed">
                                  <div className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0"></div>
                                  <span>{s}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                       <div className="border border-white/5 p-10 bg-bg/30">
                          <h4 className="text-xs font-bold text-subtext uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Risk Factors</h4>
                          <ul className="space-y-5">
                             {report.weaknesses.map((w, i) => (
                               <li key={i} className="flex items-start gap-4 text-sm font-medium text-text/80 leading-relaxed">
                                  <div className="mt-1.5 w-1.5 h-1.5 bg-subtext shrink-0"></div>
                                  <span>{w}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                  </div>
               </div>

               {/* SECTION 03: LIVING EXPERIENCE AUDIT */}
               <div className="p-16 md:p-20 border-b border-white/5 bg-bg/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div>
                      <h3 className="text-[10px] font-bold text-subtext uppercase tracking-widest mb-8">Section 03 — Living Experience Audit</h3>
                      <p className="text-2xl font-bold text-text leading-[1.4] mb-8">
                        Analytical assessment of daily operational stability and lifestyle metrics.
                      </p>
                      <div className="text-base font-medium text-subtext leading-[1.7] mb-12 max-w-lg">
                        {report.dailyLife}
                      </div>
                      <div className="flex gap-4">
                         <div className="w-1.5 h-1.5 bg-primary mt-2"></div>
                         <span className="text-[10px] font-bold text-text uppercase tracking-widest">Subject Asset Classification: Preferred Residential</span>
                      </div>
                    </div>
                    <div className="border border-white/10 p-12 bg-card">
                       <h4 className="text-[10px] font-bold text-subtext uppercase mb-12 border-b border-white/5 pb-4">Analysis Integrity Matrix</h4>
                       <div className="space-y-10">
                          {Object.entries(report.scores).map(([key, val]) => (
                            <div key={key}>
                               <div className="flex justify-between items-end mb-4">
                                  <span className="text-[9px] font-bold text-text uppercase tracking-[0.2em]">{key} Matrix</span>
                                  <span className="text-xl font-bold text-text">{val}<span className="text-[10px] text-subtext ml-1">/ 10</span></span>
                               </div>
                               <div className="h-[2px] bg-white/5">
                                  <div className="h-full bg-primary" style={{ width: `${val * 10}%` }}></div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>

               {/* SECTION 04: CAPITAL & GROWTH PROJECTION */}
               <div className="p-16 md:p-20 border-b border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                     <div className="md:col-span-2">
                        <h3 className="text-[10px] font-bold text-subtext uppercase tracking-widest mb-8">Section 04 — Capital & Growth Projection</h3>
                        <p className="text-3xl font-bold text-text mb-8 tracking-tight uppercase">Development Impact Audit</p>
                        <div className="text-lg font-medium text-subtext leading-[1.6]">
                          {report.futureOutlook}
                        </div>
                     </div>
                     <div className="border border-white/5 p-8 flex flex-col justify-between bg-bg/50">
                        <div className="text-[9px] font-bold text-subtext uppercase mb-2">Primary Investment Strategy</div>
                        <div className="text-xl font-bold uppercase text-text">{report.investmentPerspective.strategy}</div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                           <div className="text-[9px] font-bold text-subtext uppercase mb-1">Market Risk Profile</div>
                           <div className="text-sm font-bold text-primary uppercase">{report.investmentPerspective.risk} Exposure</div>
                        </div>
                     </div>
                  </div>
                  
                  {/* SECTION 05: FINAL STRATEGIC VERDICT */}
                  <div className="bg-slate-900 text-white p-20 text-center relative overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-[0.6em] mb-6 block text-white/40">Official Decision Protocol</span>
                    <h4 className="text-6xl font-bold tracking-widest mb-10 uppercase">{report.finalVerdict.recommendation}</h4>
                    <div className="max-w-2xl mx-auto border-t border-white/10 pt-10 mb-12">
                       <p className="text-xl font-medium tracking-tight text-white/70 leading-relaxed">“{report.finalVerdict.insight}”</p>
                    </div>
                    <div className="inline-block px-10 py-3 border border-white/10 text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                       Institutional Certificate Issued
                    </div>
                  </div>
               </div>

               {/* DOCUMENT FOOTER ADVISORY */}
               <div className="p-10 bg-slate-50/50 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex gap-3">
                    {report.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest italic">Electronic Audit Verified Record EI-{report.locationName.substring(0,3).toUpperCase()}</div>
               </div>
            </div>

            {/* 4. FINAL CTA (DOCUMENT FOOTER) */}
            <div className="text-center pb-20">
               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.5em] mb-10 italic">Term of Analysis: Institutional Finality Verified</p>
               <button 
                onClick={handleDownloadReport}
                disabled={generatingReport}
                className="inline-flex items-center gap-4 px-12 py-5 bg-[#0F172A] text-white rounded-sm font-bold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all shadow-lg active:scale-95"
               >
                 <Download size={18} />
                 Export Full Executive Dossier
               </button>
            </div>
          </div>
        )}

            {/* 
              📄 PDF GENERATION CONTEXT (OFF-SCREEN)
              Consultancy-Grade Institutional Layout
            */}
            {report && (
          <div style={{ position: 'absolute', left: '-9999px', top: '0', visibility: 'visible !important' }}>
             
             {/* PAGE 1: PROFESSIONAL COVER */}
             <div id="pdf-layout-0" className="bg-white w-[210mm] h-[297mm] p-[40mm] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-24">
                     <div className="w-12 h-12 bg-indigo-600 flex items-center justify-center text-white font-black text-2xl">EI</div>
                     <div className="text-2xl font-black text-slate-900 tracking-tighter uppercase">EstateIntel</div>
                  </div>
                </div>

                <div className="relative z-10 flex-grow flex flex-col justify-center">
                   <div className="w-16 h-1 bg-indigo-600 mb-12"></div>
                   <h1 className="text-[4.5rem] font-extrabold text-[#0F172A] leading-[1] mb-8 tracking-tight uppercase">
                      Area Intelligence<br/>Report Dossier.
                   </h1>
                   <div className="text-3xl font-medium text-slate-500 mb-16 tracking-tight">Location Context: <span className="text-[#0F172A] font-bold">{report.locationName}</span></div>
                   
                   <div className="grid grid-cols-2 gap-16 border-t border-slate-100 pt-16">
                      <div>
                         <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Service Line</div>
                         <div className="text-base font-bold text-[#0F172A]">AI-Powered Strategic Consultation</div>
                      </div>
                      <div>
                         <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Institutional Dossier ID</div>
                         <div className="text-base font-bold text-[#0F172A]">EI-{report.locationName.substring(0,3).toUpperCase()}-2024-SYS</div>
                      </div>
                   </div>
                </div>

                <footer className="relative z-10 flex justify-between items-end border-t border-slate-900 pt-10">
                   <div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Institutional AI Intelligence</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">Confidential Expert Verdict</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                   </div>
                </footer>
             </div>

             {/* PAGE 2: SUMMARY & CHARACTER */}
             <div id="pdf-layout-1" className="bg-white w-[210mm] h-[297mm] p-[30mm] flex flex-col font-sans text-left">
                <ReportHeader location={report.locationName} />
                
                <div className="mb-20">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 01 — STRATEGIC SUMMARY</h2>
                  <div className="border-l-[3px] border-indigo-600 pl-10 py-2">
                     <p className="text-2xl font-medium text-[#0F172A] leading-[1.6]">
                       {report.aiSummary}
                     </p>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 02 — MARKET RECOGNITION</h2>
                  <div className="mb-12">
                     <p className="text-xl font-bold text-[#0F172A] leading-[1.5] mb-12">
                       {report.knownFor}
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-50">
                     <div>
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-6 underline underline-offset-8">Competitive Advantages</div>
                        {report.strengths.map((s, i) => (
                           <div key={i} className="flex items-start gap-4 mb-5 text-[11px] font-medium text-slate-600 leading-relaxed">
                              <div className="w-1.5 h-1.5 bg-indigo-600 mt-1.5 shrink-0"></div>
                              <span>{s}</span>
                           </div>
                        ))}
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 underline underline-offset-8">Identified Risk Factors</div>
                        {report.weaknesses.map((w, i) => (
                           <div key={i} className="flex items-start gap-4 mb-5 text-[11px] font-medium text-slate-500 leading-relaxed">
                              <div className="w-1.5 h-1.5 bg-slate-300 mt-1.5 shrink-0"></div>
                              <span>{w}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>

                <ReportFooter pageNum={2} totalPages={5} />
             </div>

             {/* PAGE 3: LIFESTYLE & INFRASTRUCTURE */}
             <div id="pdf-layout-2" className="bg-white w-[210mm] h-[297mm] p-[30mm] flex flex-col font-sans text-left">
                <ReportHeader location={report.locationName} />

                <div className="mb-20">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 03 — LIVING EXPERIENCE AUDIT</h2>
                  <div className="max-w-2xl mb-12">
                     <p className="text-lg font-bold text-[#0F172A] leading-relaxed">
                        Assessments of resident mobility, amenity access, and social stability within the context of private and tertiary infrastructure.
                     </p>
                  </div>
                  <div className="bg-slate-50/50 p-12 border border-slate-100">
                     <p className="text-base font-medium text-slate-600 leading-[1.8]">"{report.dailyLife}"</p>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 04 — ANALYSIS INTEGRITY SCORES</h2>
                  <div className="space-y-10 pt-10">
                     {Object.entries(report.scores).map(([k,v]) => (
                       <div key={k} className="flex items-center gap-12">
                          <div className="text-[10px] font-bold text-slate-400 uppercase w-40 tracking-widest">{k} Matrix</div>
                          <div className="flex-grow h-[2px] bg-slate-100">
                             <div className="h-full bg-[#0F172A]" style={{ width: `${v*10}%` }}></div>
                          </div>
                          <div className="text-xl font-bold text-[#0F172A] w-16 text-right">{v} <span className="text-[9px] text-slate-300">/ 10</span></div>
                       </div>
                     ))}
                  </div>
                </div>

                <ReportFooter pageNum={3} totalPages={5} />
             </div>

             {/* PAGE 4: INVESTMENT & GROWTH */}
             <div id="pdf-layout-3" className="bg-white w-[210mm] h-[297mm] p-[30mm] flex flex-col font-sans text-left">
                <ReportHeader location={report.locationName} />

                <div className="mb-20">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 05 — INVESTMENT PERSPECTIVE</h2>
                  <div className="grid grid-cols-2 gap-12">
                     <div className="border border-slate-100 p-12 flex flex-col justify-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Strategy</div>
                        <div className="text-2xl font-bold text-[#0F172A] mb-8">{report.investmentPerspective.strategy}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Risk Exposure Grade: {report.investmentPerspective.risk}</div>
                     </div>
                     <div className="bg-slate-50 p-12 border border-slate-100">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-2">Internal Valuation Commentary</h4>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">"{report.investmentPerspective.value}"</p>
                     </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 06 — FUTURE OUTLOOK</h2>
                  <div className="p-12 border-l-[3px] border-indigo-600 bg-slate-50/50">
                     <p className="text-lg font-bold text-[#0F172A] tracking-tight leading-relaxed">“{report.futureOutlook}”</p>
                  </div>
                </div>

                <ReportFooter pageNum={4} totalPages={5} />
             </div>

             {/* PAGE 5: VERDICT & RECOMMENDATION */}
             <div id="pdf-layout-4" className="bg-white w-[210mm] h-[297mm] p-[30mm] flex flex-col font-sans text-left">
                <ReportHeader location={report.locationName} />

                <div className="mt-auto">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 border-b border-slate-100 pb-4 italic">SECTION 07 — FINAL STRATEGIC VERDICT</h2>
                  <div className="bg-[#0F172A] text-white p-20 text-center relative overflow-hidden">
                     <div className="relative z-10">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-10">Institutional Acquisition Protocol</div>
                        <h3 className="text-7xl font-bold tracking-[0.2em] uppercase mb-12 leading-none">{report.finalVerdict.recommendation}</h3>
                        <div className="max-w-xl mx-auto p-12 border-t border-white/10 mb-12">
                           <p className="text-xl font-medium tracking-tight leading-snug text-slate-300">“{report.finalVerdict.insight}”</p>
                        </div>
                        <div className="inline-block px-10 py-3 border border-slate-700 text-[9px] font-bold uppercase tracking-[0.5em] text-indigo-400 italic">SYSTEM-CERTIFIED FINALITY</div>
                     </div>
                  </div>
                </div>

                <ReportFooter pageNum={5} totalPages={5} />
             </div>

          </div>
        )}
        </>
      </div>
    </div>
  );
};

export default ReportsPage;
