import React, { useState, useEffect } from 'react';
import { Shield, Sun, Moon, Menu, X, LogOut, User } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const Navigation = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Resources', path: '/resources' },
    { name: 'Insights', path: '/insights' },
    { name: 'Reports', path: '/reports' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-bg/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
          >
            <Shield size={24} fill="currentColor" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-text">
            estate<span className="text-primary italic">Intel</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => 
                `relative text-sm font-bold transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-subtext'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-card border border-white/10 text-text hover:text-primary transition-all active:scale-90"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User/Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-sm rounded-full">Explore Now</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-card/50 pl-4 pr-1 py-1 rounded-full border border-white/5">
                <span className="text-sm font-bold text-subtext">
                  {user.fullName?.split(' ')[0] || 'User'}
                </span>
                <button 
                  onClick={onLogout}
                  className="p-2 bg-text text-bg rounded-full hover:bg-primary transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2.5 rounded-xl bg-card border border-white/10 text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-text hover:text-primary transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-white/5" />
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>Sign in</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button fullWidth>Get Started</Button>
                  </Link>
                </div>
              ) : (
                <Button onClick={onLogout} variant="outline" fullWidth>
                  <LogOut size={18} className="mr-2" /> Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
