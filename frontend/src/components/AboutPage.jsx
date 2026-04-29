import React from 'react';
import { 
  MapPin, 
  Map as MapIcon, 
  Search, 
  FileText, 
  Share2, 
  Calendar, 
  UserCheck, 
  Layout as LayoutIcon,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';
import Button from './ui/Button';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="p-8 h-full group hover:border-primary/20 transition-all">
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-subtext leading-relaxed font-medium">{description}</p>
    </Card>
  </motion.div>
);

const AboutPage = () => {
  return (
    <main className="bg-bg">
      {/* Intro Section */}
      <SectionWrapper className="pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading 
              badge="About EstateIntel"
              subtitle="We help you make informed real estate decisions by analyzing neighborhood resources and generating real-time intelligence reports for any location."
            >
              Analyze property locations with <br />
              <span className="text-gradient">Smart Insights</span>
            </Heading>
            <div className="flex gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Expert" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  +12
                </div>
              </div>
              <div className="text-sm">
                <span className="font-bold text-text block">Data Science Team</span>
                <span className="text-subtext text-xs">Vetting every location manually</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            
            {/* Main Stats Card */}
            <div className="relative glass p-6 rounded-[2.5rem] shadow-2xl border border-white/5 bg-card/40 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                       <MapIcon size={20} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-text">Navi Mumbai</h4>
                       <p className="text-[10px] text-subtext font-bold uppercase tracking-widest">Neighborhood Audit</p>
                    </div>
                 </div>
                 <div className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black rounded-full uppercase tracking-widest">
                    Live Data
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 {[
                   { label: 'Schools', value: '4.8', icon: <Building2 size={16} />, color: 'text-indigo-500' },
                   { label: 'Water', value: '92%', icon: <RefreshCw size={16} />, color: 'text-blue-500' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color} mb-3`}>
                         {stat.icon}
                      </div>
                      <p className="text-[10px] font-bold text-subtext uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-text">{stat.value}</p>
                   </div>
                 ))}
              </div>

              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-subtext uppercase tracking-widest">Appreciation Potential</span>
                    <span className="text-sm font-black text-primary">+12.4%</span>
                 </div>
                 <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-primary"
                    />
                 </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-accent text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Verified</p>
                  <p className="text-sm font-bold">Safe Zone</p>
               </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -left-8 glass p-4 rounded-2xl shadow-xl border border-white/10 z-20"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center">
                     <Search size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-subtext uppercase tracking-widest">Scan Radius</p>
                     <p className="text-sm font-bold text-text">2.5 KM</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-24">
          <Heading subtitle="The essential toolkit for modern homebuyers.">
            Key Features
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              index={0}
              icon={MapPin}
              title="Live Detection"
              description="Instantly detect your location to find hospitals, schools, and markets nearby."
            />
            <FeatureCard 
              index={1}
              icon={MapIcon}
              title="Interactive Maps"
              description="Real-time map integration with high-fidelity resource data and markers."
            />
            <FeatureCard 
              index={2}
              icon={Search}
              title="Smart Filters"
              description="Customize your search by location, resource type, and distance radius."
            />
            <FeatureCard 
              index={3}
              icon={FileText}
              title="Auto-Analysis"
              description="Automatically generate comprehensive reports based on surrounding amenities."
            />
            <FeatureCard 
              index={4}
              icon={Share2}
              title="Report Sharing"
              description="Easily share your generated location analysis with partners or clients."
            />
            <FeatureCard 
              index={5}
              icon={Calendar}
              title="Smart Booking"
              description="Personalized booking feature for detailed on-ground property analysis."
            />
            <FeatureCard 
              index={6}
              icon={UserCheck}
              title="Agent Visits"
              description="Our pro agents visit the location to create verified, detailed reports."
            />
            <FeatureCard 
              index={7}
              icon={LayoutIcon}
              title="Modern UI"
              description="Clean interface featuring resource cards and high-quality location imagery."
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Process Section - Reusing the one from landing but with more detail if needed */}
      <SectionWrapper className="bg-card/30">
        <Heading 
          badge="The Process"
          subtitle="Our systematic approach ensures every report is accurate and actionable."
          centered
        >
          How it Works
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: MapPin, title: "Locate", text: "Fast neighborhood detection and custom search queries." },
            { icon: RefreshCw, title: "Discover", text: "Real-time resource fetching from the global map network." },
            { icon: ShieldCheck, title: "Analyze", text: "Smart AI scoring based on density and lifestyle factors." },
            { icon: FileText, title: "Export", text: "Instant report generation or book pro agent verification." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-card p-8 rounded-3xl border border-white/5 shadow-premium text-center hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                <item.icon size={32} />
              </div>
              <h4 className="text-xl font-bold text-text mb-3">{item.title}</h4>
              <p className="text-subtext font-medium leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="text-center">
        <Card variant="primary" className="py-16 px-8 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to analyze your next property?</h2>
          <Button variant="white" className="h-16 px-10 text-xl rounded-full">
            Start Analysing <ArrowRight size={24} className="ml-2" />
          </Button>
        </Card>
      </SectionWrapper>
    </main>
  );
};

export default AboutPage;
