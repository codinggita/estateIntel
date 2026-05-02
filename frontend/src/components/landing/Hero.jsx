import React from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Button from '../ui/Button';
import { SectionWrapper } from '../ui/Layout';

const Hero = () => {
  return (
    <SectionWrapper className="relative overflow-hidden pt-32 sm:pt-36 md:pt-48 pb-16 sm:pb-20 md:pb-32">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-card border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-card bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-[10px] font-bold text-text">4.9/5</span>
              </div>
              <p className="text-[10px] font-bold text-subtext uppercase tracking-widest leading-none">Trusted by 10,000+ Buyers</p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-text tracking-tight">
            Make Smart Property Decisions with <br />
            <span className="text-gradient">Data & Inspection</span>
          </h1>

          <p className="text-lg sm:text-xl text-subtext leading-relaxed max-w-lg sm:max-w-xl">
            Before you invest crores, know what you're really buying. Standardized neighborhood reports and expert inspections — powered by precision data.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-2xl group">
              <Map size={20} className="group-hover:rotate-12 transition-transform" />
              Get Neighborhood Report
            </Button>
            <Button variant="secondary" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-2xl group">
              Book Inspection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-4 text-subtext">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <ShieldCheck size={18} className="text-accent" />
              Institutional Grade Data
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <ShieldCheck size={18} className="text-accent" />
              Expert Civil Engineers
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-[3rem] group-hover:bg-primary/20 transition-all duration-700"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-3">
            <div className="absolute top-0 left-0 right-0 h-8 bg-card/60 flex items-center px-4 gap-1.5 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
              alt="EstateIntel Data Dashboard" 
              className="w-full h-auto object-cover rounded-2xl shadow-inner mt-6"
            />
          </div>
          
          {/* Floating Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-12 p-6 glass rounded-2xl shadow-2xl border border-white/10 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-subtext uppercase tracking-widest">Property Rating</p>
                <p className="text-2xl font-bold text-text">8.4 / 10</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;
