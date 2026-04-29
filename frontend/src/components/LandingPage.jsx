import React from 'react';
import Hero from './landing/Hero';
import Solutions from './landing/Solutions';
import Features from './landing/Features';
import ProcessSection from './landing/ProcessSection';
import TestimonialsSection from './landing/TestimonialsSection';
import PricingSection from './landing/PricingSection';
import FooterSection from './landing/FooterSection';

const LandingPage = () => {
  return (
    <main className="bg-bg overflow-x-hidden">
      <Hero />
      <Solutions />
      <ProcessSection />
      <Features />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </main>
  );
};

export default LandingPage;
