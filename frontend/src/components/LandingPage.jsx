import React from 'react';
import SEO from './SEO/SEO';
import Hero from './landing/Hero';
import Solutions from './landing/Solutions';
import Features from './landing/Features';
import ProcessSection from './landing/ProcessSection';
import TestimonialsSection from './landing/TestimonialsSection';
import PricingSection from './landing/PricingSection';
import FooterSection from './landing/FooterSection';

const LandingPage = () => {
  // Schema markup for home page
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EstateIntel",
    "url": "https://estateintel-5.onrender.com",
    "logo": "https://estateintel-5.onrender.com/logo.png",
    "description": "Smart real estate platform for verified property listings, luxury homes, apartments for rent, and real estate investment opportunities.",
    "sameAs": [
      "https://www.facebook.com/estateintel",
      "https://www.twitter.com/estateintel",
      "https://www.instagram.com/estateintel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-ESTATE",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EstateIntel",
    "url": "https://estateintel-5.onrender.com",
    "description": "Discover premium real estate listings, buy property, rent apartments, and find luxury homes with EstateIntel. Your trusted platform for verified property listings and real estate investment opportunities.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://estateintel-5.onrender.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Smart Real Estate Platform - Buy Property, Rent Apartments, Luxury Homes"
        description="Discover premium real estate listings, buy property, rent apartments, and find luxury homes with EstateIntel. Your trusted platform for verified property listings and real estate investment opportunities."
        keywords="real estate, property listing, buy property, rent apartment, luxury homes, commercial property, flats for sale, real estate investment, affordable housing, property management, homes for sale, apartments for rent, verified property listings, best real estate platform, real estate near me, property search"
        canonicalUrl="https://estateintel-5.onrender.com"
        ogImage="https://estateintel-5.onrender.com/og-home.jpg"
        schemaMarkup={organizationSchema}
      />
      <main className="bg-bg overflow-x-hidden">
        <header>
          <h1 className="sr-only">EstateIntel - Smart Real Estate Platform</h1>
          <p className="sr-only">Buy property, rent apartments, find luxury homes and commercial properties with verified listings and real estate investment opportunities</p>
        </header>
        <Hero />
        <Solutions />
        <ProcessSection />
        <Features />
        <TestimonialsSection />
        <PricingSection />
        <FooterSection />
      </main>
    </>
  );
};

export default LandingPage;
