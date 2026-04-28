import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialView = location.pathname === '/signup' ? 'register' : 'login';
  const [view, setView] = useState(initialView); // 'login' or 'register'
  
  useEffect(() => {
    setView(location.pathname === '/signup' ? 'register' : 'login');
  }, [location.pathname]);

  const handleViewChange = (newView) => {
    navigate(newView === 'login' ? '/login' : '/signup');
  };

  const handleBack = () => {
    navigate('/');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const { fullName, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = view === 'login' ? '/api/user/login' : '/api/user/register';
      const body = view === 'login' 
        ? { email, password } 
        : { fullName, email, password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success
      onLogin(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginImg = "/hero.png";
  const registerImg = "/signup-bg.png";

  return (
    <div className="flex min-h-screen w-full bg-[#f4f7fc] text-slate-900 font-sans absolute inset-0 z-50">
      
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-black">
        <img 
          src={view === 'login' ? loginImg : registerImg} 
          alt="Real Estate" 
          className="object-cover w-full h-full opacity-80 transition-opacity duration-700 ease-in-out" 
          key={view}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-black/40 to-transparent"></div>
        <div className="absolute bottom-16 left-12 right-12 xl:bottom-24 xl:left-16 xl:right-16 text-white">
          <h2 className="text-[40px] xl:text-[48px] font-bold mt-2 leading-tight tracking-tight mb-3">
            {view === 'login' ? 'Smarter Property Decisions' : 'Unlock the Market'}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
            {view === 'login' 
              ? 'Access real-time analytics, accurate valuations, and predictive insights for your real estate portfolio.' 
              : 'Join estateIntel to discover premium properties, neighborhood analytics, and data-driven insights.'}
          </p>
          <div className="flex space-x-2 items-center">
            <div className={`h-1.5 w-8 rounded-full ${view === 'login' ? 'bg-white' : 'bg-white/40'} transition-all duration-300`}></div>
            <div className={`h-1.5 w-2 rounded-full ${view === 'register' ? 'bg-white w-8' : 'bg-white/40'} transition-all duration-300`}></div>
            <div className="h-1.5 w-2 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col items-center justify-center relative py-12 px-6 sm:px-12 lg:px-16 xl:px-24 h-screen overflow-y-auto">
        
        {/* Back Button */}
        <button 
          type="button"
          onClick={handleBack}
          className="absolute top-8 left-6 sm:left-8 flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200/50 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
        </button>

        {/* Top Right Toggle */}
        <div className="absolute top-8 right-6 sm:right-12">
          <button 
            type="button"
            onClick={() => handleViewChange(view === 'login' ? 'register' : 'login')} 
            className="bg-[#111827] text-white px-6 sm:px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            {view === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        <div className="w-full max-w-[440px] mt-16 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
          
          <div className="mb-10">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-slate-900 tracking-tight mb-2">
              {view === 'login' ? 'Welcome Back to estateIntel!' : 'Create an Account!'}
            </h1>
            <p className="text-slate-500 text-[15px]">
              {view === 'login' ? 'Sign in your account' : 'Fill in the details to get started.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-1 duration-300">
                {error}
              </div>
            )}

            {view === 'register' && (
              <div className="space-y-1.5 animate-in fade-in zoom-in-95 duration-300">
                <label className="text-[13px] font-semibold text-slate-700 ml-1">Full Name</label>
                <input 
                  required 
                  name="fullName"
                  value={fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-transparent placeholder-slate-400 text-slate-900 font-medium transition-all shadow-sm" 
                  placeholder="John Doe" 
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-slate-700 ml-1">Your Email</label>
              <input 
                required 
                type="email" 
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-transparent placeholder-slate-400 text-slate-900 font-medium transition-all shadow-sm" 
                placeholder="info.madhu786@gmail.com" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-12 py-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827] focus:border-transparent placeholder-slate-400 text-slate-900 font-medium transition-all shadow-sm" 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[14px] text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {view === 'login' && (
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#111827] focus:ring-[#111827] cursor-pointer" />
                  <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember Me</span>
                </label>
                <button type="button" className="text-[13px] font-medium text-slate-400 hover:text-[#111827] transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button disabled={isLoading} className="w-full py-4 mt-8 bg-[#18181b] hover:bg-black text-white font-semibold rounded-xl transition-all shadow-lg shadow-black/10 active:scale-[0.99] flex items-center justify-center">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                view === 'login' ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Instant {view === 'login' ? 'Login' : 'Sign Up'}
            </span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button type="button" className="flex items-center justify-center space-x-2 py-3.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors text-[13px] font-semibold text-slate-700 shadow-sm active:scale-[0.99]">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button type="button" className="flex items-center justify-center space-x-2 py-3.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors text-[13px] font-semibold text-slate-700 shadow-sm active:scale-[0.99]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            {view === 'login' ? "Don't have any account? " : "Already have an account? "}
            <button type="button" onClick={() => handleViewChange(view === 'login' ? 'register' : 'login')} className="font-bold text-[#111827] hover:underline decoration-2 underline-offset-4">
              {view === 'login' ? 'Register' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
