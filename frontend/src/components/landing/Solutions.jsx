import React from 'react';
import { Search, ShieldCheck, ArrowRight, Droplets, Building2, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionWrapper, Heading } from '../ui/Layout';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Solutions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <SectionWrapper className="bg-bg relative">
      <Heading 
        badge="Our Solutions"
        subtitle="Two powerful tools designed to give you absolute clarity before you commit your life's savings."
        centered
      >
        One Smart Platform. <br /> Two Powerful Decisions.
      </Heading>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Neighborhood Intel */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 md:p-12 h-full flex flex-col group border-primary/5 hover:border-primary/20 bg-gradient-to-b from-card to-bg/50">
            <div className="bg-linear-to-b from-primary/10 to-transparent border-l-4 border-primary/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
              <Search size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-text">Neighborhood Intel</h3>
            <p className="text-subtext text-lg leading-relaxed mb-8 flex-grow">
              Deep-dive analysis of any project or locality. Know the reality of water, safety, and amenities before visiting.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Water stability & quality reports",
                "School & hospital accessibility",
                "Neighborhood safety audit",
                "Future appreciation potential"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text font-semibold">
                  <div className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/app/map">
              <Button variant="primary" fullWidth className="h-14 rounded-2xl">
                Get Neighborhood Report
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Property Audit */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 md:p-12 h-full flex flex-col group border-secondary/5 hover:border-secondary/20 bg-gradient-to-b from-card to-bg/50">
            <div className="bg-linear-to-b from-secondary/10 to-transparent border-r-4 border-secondary/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-lg shadow-secondary/5">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-text">Property Audit</h3>
            <p className="text-subtext text-lg leading-relaxed mb-8 flex-grow">
              Physical inspection by expert civil engineers to detect hidden defects, seepage, and structural issues.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "120-point digital checklist",
                "Thermal imaging for leaks",
                "Electrical safety audit",
                "Standardized defect report"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text font-semibold">
                  <div className="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/app/inspection">
              <Button variant="secondary" fullWidth className="h-14 rounded-2xl">
                Book Property Audit
              </Button>
            </Link>
          </Card>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Solutions;
