import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, TrendingUp, Inbox, Download, UserCheck } from 'lucide-react';
import { SectionWrapper, Heading } from '../ui/Layout';
import Card from '../ui/Card';

const Features = () => {
  const features = [
    { title: "Standardized Ratings", desc: "Compare properties objectively with our 1-10 proprietary scoring system.", icon: <Check /> },
    { title: "Risk Identification", desc: "Early detection of seepage, structural flaws, or legal red flags.", icon: <AlertTriangle /> },
    { title: "Defect Tracking", desc: "Real-time tracking of identified defects with repair cost estimates.", icon: <TrendingUp /> },
    { title: "Digital Inspections", desc: "State-of-the-art 120-point digital checklist used by experts.", icon: <Inbox /> },
    { title: "Instant Reports", desc: "Institutional-grade PDF reports available immediately after audit.", icon: <Download /> },
    { title: "Expert Civil Support", desc: "Direct access to senior civil engineers for technical queries.", icon: <UserCheck /> }
  ];

  return (
    <SectionWrapper className="bg-card/30">
      <Heading 
        badge="Features"
        subtitle="We've standardized property intelligence to make it as simple as checking a credit score."
      >
        Built for Modern <br /> Homebuyers
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="p-8 group hover:bg-bg transition-colors h-full border-none shadow-none hover:shadow-premium">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(feature.icon, { size: 24 })}
              </div>
              <h3 className="text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-subtext leading-relaxed">
                {feature.desc}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Features;
