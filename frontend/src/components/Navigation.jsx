import React, { useState, useEffect } from 'react';
import { Shield, Sun, Moon, Menu, X, LogOut, Settings } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Avatar from './Avatar';
import { getNameFromEmail } from '../utils/avatar';

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
    { name: 'Map', path: '/app/map' },
    { name: 'Resources', path: '/app/resources' },
    { name: 'Insights', path: '/app/insights' },
    { name: 'Reports', path: '/app/reports' },
    { name: 'Booking', path: '/app/inspection' },
    { name: 'About', path: '/app/about' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav 
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-bg/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="EstateIntel Home"
        >
          <motion.div 
            whileHover={{ rotate: 10, scale:1.1 }}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
            aria-hidden="true"
          >
            <Shield size={24} fill="currentColor" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-text">
            estate<span className="text-primary italic">Intel</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => 
                `relative text-xs sm:text-sm font-bold transition-colors hover:text-primary whitespace-nowrap ${
                  isActive ? 'text-primary' : 'text-subtext'
                }`
              }
              aria-label={`Navigate to ${link.name}`}
              aria-current={link.path === '/' ? 'page' : undefined}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      aria-hidden="true"
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
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            type="button"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User/Auth */}
          <div className="hidden lg:flex items-center justify-end">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/signin"
                  aria-label="Sign in to EstateIntel"
                >
                  <Button variant="ghost" className="text-sm">Sign in</Button>
                </Link>
                <Link 
                  to="/signup"
                  aria-label="Sign up for EstateIntel"
                >
                  <Button className="text-sm rounded-full">Explore Now</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-text">{getNameFromEmail(user)}</p>
                  <p className="text-xs text-subtext">{user.email}</p>
                </div>
                <Avatar user={user} size="md" aria-label={`User avatar for ${user.email}`} />
                <button 
                  onClick={onLogout}
                  className="p-2 bg-card border border-white/10 text-text rounded-full hover:bg-primary hover:text-white transition-colors"
                  aria-label="Sign out from EstateIntel"
                  type="button"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-card border border-white/10 text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
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
            className="xl:hidden bg-card border-b border-white/10 overflow-hidden"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-text hover:text-primary transition-colors"
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-white/5" />
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/signin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Sign in to EstateIntel"
                  >
                    <Button variant="outline" fullWidth>Sign in</Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Sign up for EstateIntel"
                  >
                    <Button fullWidth>Get Started</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* User Profile Section */}
                  <div className="flex items-center justify-between gap-4 p-4 bg-card/50 rounded-xl border border-white/5">
                    <div className="flex-1">
                      <p className="font-medium text-text">{getNameFromEmail(user)}</p>
                      <p className="text-sm text-subtext">{user.email}</p>
                    </div>
                    <Avatar user={user} size="lg" />
                  </div>
                  
                  <Button onClick={onLogout} variant="outline" fullWidth>
                    <LogOut size={18} className="mr-2" /> Sign Out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
