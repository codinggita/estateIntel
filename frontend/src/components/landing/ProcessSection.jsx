import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, FileText, Calendar, CircleCheck } from 'lucide-react';
import { SectionWrapper, Heading } from '../ui/Layout';

const steps = [
  { 
    title: "Enter Location", 
    desc: "Search for a property or neighborhood to start analysis.",
    icon: <MapPin size={24} />, 
    color: "from-blue-500 to-indigo-500" 
  },
  { 
    title: "Get Data Report", 
    desc: "Scan water, safety, schools and appreciation potential.",
    icon: <FileText size={24} />, 
    color: "from-emerald-500 to-teal-400" 
  },
  { 
    title: "Book Inspection", 
    desc: "Schedule a physical audit by our civil engineers.",
    icon: <Calendar size={24} />, 
    color: "from-amber-500 to-orange-400" 
  },
  { 
    title: "Receive Analysis", 
    desc: "Get a comprehensive 120-point audit report.",
    icon: <CircleCheck size={24} />, 
    color: "from-indigo-600 to-purple-500" 
  }
];

const ProcessSection = () => {
  return (
    <SectionWrapper id="process" className="bg-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/5 -translate-y-1/2 hidden lg:block"></div>

      <Heading 
        badge="How it works"
        subtitle="A streamlined 4-step process to secure your real estate investment."
        centered
      >
        Your Path to a Safe <br /> Investment
      </Heading>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="relative flex flex-col items-center text-center group"
          >
            {/* Connection Line (Mobile line) */}
            {i < steps.length - 1 && (
              <div className="absolute top-16 left-1/2 w-0.5 h-12 bg-primary/10 lg:hidden -translate-x-1/2"></div>
            )}

            {/* Icon Circle */}
            <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} p-[2px] mb-8 shadow-xl shadow-primary/10 group-hover:scale-110 transition-transform duration-500`}>
              <div className="w-full h-full bg-white dark:bg-card rounded-[inherit] flex items-center justify-center text-text group-hover:bg-transparent group-hover:text-white transition-colors duration-500">
                {step.icon}
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-card border border-white/10 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                0{i + 1}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-text">{step.title}</h3>
            <p className="text-subtext text-sm leading-relaxed max-w-[200px]">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProcessSection;
