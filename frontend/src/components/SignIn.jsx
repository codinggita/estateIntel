import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import { handleGoogleLogin } from '../utils/googleAuth';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(location.pathname === '/signup' ? 'register' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const newView = location.pathname === '/signup' ? 'register' : 'login';
    setView(newView);
    formik.resetForm();
    setServerError('');
  }, [location.pathname]);

  const handleViewChange = (newView) => {
    navigate(newView === 'login' ? '/login' : '/signup');
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setServerError('');
    
    try {
      console.log('🔐 Starting Google sign-in from SignIn component...');
      
      const result = await handleGoogleLogin();
      
      if (result.success) {
        console.log('✅ Google authentication successful:', result.user);
        
        // Call parent login handler
        onLogin(result.user);
        
        // Let the App component handle the redirect via onAuthStateChanged
        // This prevents race conditions
        console.log('� User data sent to parent, waiting for redirect...');
                
        if (result.warning) {
          console.warn('⚠️ Warning:', result.warning);
        }
      } else {
        setServerError(result.error || 'Google sign-in failed');
        console.error('❌ Google authentication failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Unexpected error during Google sign-in:', error);
      setServerError('An unexpected error occurred during Google sign-in');
    }
  };

  const validationSchema = Yup.object({
    fullName: view === 'register' 
      ? Yup.string().min(2, 'Name is too short').required('Full name is required') 
      : Yup.string(),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const endpoint = view === 'login' ? '/api/user/login' : '/api/user/register';
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        onLogin(data.user);
        navigate('/');
      } catch (err) {
        setServerError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full bg-bg text-text font-sans absolute inset-0 z-[200]">
      
      {/* Left Panel - Modern Gradient & Image */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
        <img 
          src={view === 'login' 
            ? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" 
            : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"} 
          alt="Real Estate" 
          className="object-cover w-full h-full transition-transform duration-1000 ease-in-out scale-105" 
          key={view}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-20"></div>
        
        <div className="absolute bottom-16 left-12 right-12 z-30">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Shield size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              estate<span className="italic">Intel</span>
            </span>
          </Link>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={view + 'title'}
            className="text-5xl font-bold mt-2 leading-tight tracking-tight mb-4 text-white"
          >
            {view === 'login' ? 'Smarter Property Decisions' : 'Unlock the Market'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={view + 'desc'}
            className="text-white/70 text-lg mb-8 max-w-md leading-relaxed"
          >
            {view === 'login' 
              ? 'Access real-time analytics, accurate valuations, and predictive insights for your real estate portfolio.' 
              : 'Join estateIntel to discover premium properties, neighborhood analytics, and data-driven insights.'}
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col items-center justify-center relative py-12 px-6 sm:px-12 lg:px-16 xl:px-24 bg-bg overflow-y-auto">
        
        {/* Back Button */}
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="absolute top-8 left-6 sm:left-8 flex items-center space-x-2 text-subtext hover:text-text transition-colors font-bold text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-card border border-white/5 flex items-center justify-center transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
        </button>

        {/* Top Right Toggle */}
        <div className="absolute top-8 right-6 sm:right-12">
          <Button 
            variant="secondary"
            onClick={() => handleViewChange(view === 'login' ? 'register' : 'login')} 
            className="text-sm px-6 rounded-full"
          >
            {view === 'login' ? 'Create Account' : 'Sign In'}
          </Button>
        </div>

        <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
          
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-text tracking-tight mb-3">
              {view === 'login' ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-subtext font-medium">
              {view === 'login' ? 'Sign in to access your property insights' : 'Join thousands of smart property investors'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <AlertCircle size={18} />
                {serverError}
              </div>
            )}

            {view === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Full Name</label>
                <input 
                  {...formik.getFieldProps('fullName')}
                  type="text" 
                  className={`w-full px-5 py-4 bg-card border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-white/30'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-subtext font-bold transition-all placeholder:text-subtext/40`} 
                  placeholder="John Doe" 
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-xs ml-1 font-bold">{formik.errors.fullName}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Email Address</label>
              <input 
                {...formik.getFieldProps('email')}
                type="email" 
                className={`w-full px-5 py-4 bg-card border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white/30'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-subtext font-bold transition-all placeholder:text-subtext/40`} 
                placeholder="you@example.com" 
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs ml-1 font-bold">{formik.errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Password</label>
              <div className="relative group">
                <input 
                  {...formik.getFieldProps('password')}
                  type={showPassword ? "text" : "password"} 
                  className={`w-full pl-5 pr-14 py-4 bg-card border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-white/30'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-subtext font-bold transition-all placeholder:text-subtext/40`} 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[18px] text-subtext hover:text-text transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs ml-1 font-bold">{formik.errors.password}</p>
              )}
            </div>
            
            {view === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-card text-primary focus:ring-primary/50 cursor-pointer" />
                  <span className="text-sm font-bold text-subtext group-hover:text-text transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit"
              variant="secondary"
              disabled={formik.isSubmitting} 
              fullWidth
              className="py-4 rounded-2xl text-lg mt-4 shadow-xl"
            >
              {formik.isSubmitting ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <span className="!text-black font-black uppercase tracking-widest text-sm">
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                </span>
              )}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-[10px] font-black text-subtext uppercase tracking-[0.2em] whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="w-full">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-card border border-white/30 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all font-bold text-sm shadow-sm"
              type="button"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
