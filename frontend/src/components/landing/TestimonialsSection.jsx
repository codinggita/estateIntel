import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionWrapper, Heading } from '../ui/Layout';
import Card from '../ui/Card';

const testimonials = [
  { 
    name: "Rajesh Kumar", 
    role: "Software Engineer", 
    text: "Saved me from major seepage issues in a new project. The audit report was so detailed that the builder had to fix everything before I took possession.",
    image: "https://i.pravatar.cc/100?img=12"
  },
  { 
    name: "Priya Sharma", 
    role: "Marketing Manager", 
    text: "The Neighborhood Intel report was a game changer. Knowing the water quality and school accessibility without visiting was huge for my family.",
    image: "https://i.pravatar.cc/100?img=25"
  },
  { 
    name: "Amit Patel", 
    role: "Business Owner", 
    text: "Professional service and comprehensive reports. Standardizing the ratings makes it so much easier to compare two different localities objectively.",
    image: "https://i.pravatar.cc/100?img=33"
  }
];

const TestimonialsSection = () => {
  return (
    <SectionWrapper className="bg-card/20 overflow-hidden">
      <Heading 
        badge="Testimonials"
        subtitle="Join thousands of happy homeowners who secured their future with EstateIntel."
        centered
      >
        Trusted by Modern <br /> Homebuyers
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="p-8 h-full relative group bg-card">
              <Quote className="absolute top-6 right-8 text-primary/5 group-hover:text-primary/10 transition-colors" size={64} />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-text/90 text-lg leading-relaxed mb-8 italic relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-primary/20 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-text">{t.name}</h4>
                  <p className="text-xs font-bold text-subtext uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-20 border-t border-white/5 text-center">
        {[
          { label: "Reports Generated", value: "25,000+" },
          { label: "Accuracy Rate", value: "98.5%" },
          { label: "Expert Civil Engineers", value: "50+" },
          { label: "Partner Localities", value: "500+" }
        ].map((stat, i) => (
          <div key={i}>
            <p className="text-3xl md:text-4xl font-bold text-text mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-subtext uppercase tracking-widest leading-relaxed">{stat.label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
