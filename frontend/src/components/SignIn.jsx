import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft, User, ChevronRight } from 'lucide-react';

const SignIn = ({ onBack }) => {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-indigo-100">
      
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Compact Header Navigation */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-indigo-600 font-bold flex items-center gap-2 transition-all group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-400 group-hover:bg-indigo-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase text-[10px] tracking-widest font-black">Back</span>
        </button>
      </div>

      <div className="w-full max-w-[420px] max-h-full flex flex-col relative z-10 animate-in fade-in zoom-in duration-500 overflow-y-auto lg:overflow-visible py-4">
        
        {/* Compressed Branding */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 mb-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
               <Shield size={18} fill="currentColor" />
             </div>
             <span className="text-lg font-black text-slate-800 tracking-tight">estateIntel</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tighter leading-none">
            {view === 'login' ? 'Intelligence Login' : 'Secure Registration'}
          </h1>
        </div>

        {/* High-Density Card */}
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-6 shadow-2xl shadow-indigo-100/50 relative">
          
          {/* Compact Tab Switcher */}
          <div className="flex p-1.5 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
            <button 
              onClick={() => setView('login')}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'login' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setView('register')}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'register' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {view === 'register' && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-left duration-300">
                <label className="text-[10px] font-black text-slate-700 uppercase ml-1 tracking-widest">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input required placeholder="Your Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-bold text-sm text-slate-900 placeholder:text-slate-400" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-700 uppercase ml-1 tracking-widest">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="email" placeholder="name@company.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-bold text-sm text-slate-900 placeholder:text-slate-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Password</label>
                {view === 'login' && <button type="button" className="text-[10px] font-black text-indigo-600">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-bold text-sm text-slate-900 placeholder:text-slate-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={isLoading} className="w-full py-4 bg-indigo-950 text-white font-black rounded-xl hover:bg-black shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{view === 'login' ? 'Authorize' : 'Initialize'}</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-slate-100"></div></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]"><span className="px-4 bg-white text-slate-200">Gateway</span></div>
            </div>

            <button type="button" className="w-full py-3 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>
          </form>
        </div>

        {/* Minimal Bottom Nav */}
        <div className="text-center mt-4">
          <p className="text-[11px] font-bold text-slate-500">
            {view === 'login' ? "Need access?" : "Member?"}
            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="ml-2 text-indigo-600 font-black hover:underline"
            >
              {view === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Absolute Footer Links - Low profile */}
        <div className="mt-auto pt-6 flex justify-center gap-8 text-[9px] font-black text-slate-300 uppercase tracking-widest">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Security</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
