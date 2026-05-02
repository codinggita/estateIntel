import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Shield, Star, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionWrapper, Heading } from '../ui/Layout';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';

const plans = [
  {
    name: "Basic",
    price: { oneTime: "₹999", subscription: "₹299" },
    desc: "Perfect for initial area scouting.",
    features: [
      "Standard Neighborhood Report",
      "School & Hospital Data",
      "Hydraulic Stability Overview",
      "1 Report Download (PDF)",
      "Email Support"
    ],
    highlight: false,
    icon: <HelpCircle className="text-blue-500" />
  },
  {
    name: "Premium",
    price: { oneTime: "₹2,499", subscription: "₹799" },
    desc: "Deep comparative data for serious buyers.",
    features: [
      "Everything in Basic",
      "5 Comparison Reports",
      "Price Trend Analysis",
      "Water Quality Lab Data",
      "Priority Chat Support",
      "Expert Property Shortlisting"
    ],
    highlight: true,
    icon: <Star className="text-amber-500" />
  },
  {
    name: "Inspection",
    price: { oneTime: "₹7,999", subscription: "₹2,499" },
    desc: "Full structural & technical audit.",
    features: [
      "Everything in Premium",
      "Physical Site Inspection",
      "120-Point Technical Checklist",
      "Seepage & Thermal Scanning",
      "Structure Health Audit",
      "Civil Engineer Consultation"
    ],
    highlight: false,
    icon: <Shield className="text-emerald-500" />
  }
];

const PricingSection = () => {
  const [isSubscription, setIsSubscription] = useState(false);

  return (
    <SectionWrapper className="bg-bg relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col items-center">
        <Heading 
          badge="Pricing"
          subtitle="Transparent pricing. No hidden fees. Choose the plan that fits your search."
          centered
        >
          Secure Your Future <br /> at Every Scale
        </Heading>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ToggleSwitch 
            active={isSubscription}
            onChange={setIsSubscription}
            leftLabel="One-Time"
            rightLabel="Subscription"
          />
          <p className="text-center mt-4 text-xs font-bold text-accent uppercase tracking-widest animate-pulse">
            Save up to 30% with monthly plans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="grow"
            >
              <Card 
                className={`relative flex flex-col h-full transition-all duration-500 hover:-translate-y-4 ${
                  plan.highlight 
                    ? 'bg-primary text-white scale-105 z-10 shadow-primary/30 ring-4 ring-primary/20' 
                    : 'bg-card text-text border border-white/5'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-2xl ${plan.highlight ? 'bg-white/20' : 'bg-primary/10'}`}>
                    {React.cloneElement(plan.icon, { size: 32, className: plan.highlight ? 'text-white' : '' })}
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={isSubscription ? 'sub' : 'one'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-5xl font-bold tracking-tight"
                    >
                      {isSubscription ? plan.price.subscription : plan.price.oneTime}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-white/60' : 'text-subtext'}`}>
                    /{isSubscription ? 'month' : 'report'}
                  </span>
                </div>

                <p className={`text-sm mb-10 ${plan.highlight ? 'text-white/80' : 'text-subtext'}`}>
                  {plan.desc}
                </p>

                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-semibold">
                      <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className={plan.highlight ? 'text-white/90' : 'text-text/80'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button 
                    variant={plan.highlight ? 'white' : 'primary'} 
                    fullWidth 
                    className="h-14 rounded-2xl group"
                  >
                    Get Started Now
                    <Zap size={18} className="transition-transform group-hover:scale-125" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PricingSection;
