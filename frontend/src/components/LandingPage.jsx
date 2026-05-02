import React from 'react';
import SEO from './SEO/SEO';
import Analytics from './SEO/Analytics';
import FAQSection from './SEO/FAQSection';
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
    "url": "https://estateintel-data-6cfs.onrender.com",
    "description": "Leading real estate platform in Ahmedabad, Gujarat offering verified property listings, luxury homes, apartments for rent, flats for sale, commercial property, and affordable housing solutions",
    "logo": "https://estateintel-data-6cfs.onrender.com/logo.png",
    "image": "https://estateintel-data-6cfs.onrender.com/og-home.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.facebook.com/estateintel",
      "https://www.twitter.com/estateintel",
      "https://www.linkedin.com/company/estateintel",
      "https://www.instagram.com/estateintel"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Ahmedabad"
      },
      {
        "@type": "State",
        "name": "Gujarat"
      }
    ],
    "serviceType": [
      "Real Estate Listings",
      "Property Investment",
      "Property Management",
      "Rental Properties",
      "Commercial Property",
      "Luxury Homes"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EstateIntel",
    "url": "https://estateintel-data-6cfs.onrender.com",
    "description": "Best real estate platform in Ahmedabad, Gujarat. Buy property online, find apartments for rent, luxury homes, flats for sale, commercial property, and verified property listings",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://estateintel-data-6cfs.onrender.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EstateIntel",
      "url": "https://estateintel-data-6cfs.onrender.com"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is EstateIntel and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EstateIntel is a leading real estate platform in Ahmedabad, Gujarat that offers verified property listings, luxury homes, apartments for rent, flats for sale, and commercial property. We provide comprehensive property investment opportunities and smart property decisions tools."
        }
      },
      {
        "@type": "Question",
        "name": "How can I buy property online through EstateIntel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can buy property online through EstateIntel by browsing our verified property listings, using our advanced search filters to find the perfect property, and connecting with our real estate experts for seamless property purchase transactions in Ahmedabad and Gujarat."
        }
      },
      {
        "@type": "Question",
        "name": "What types of properties are available on EstateIntel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EstateIntel offers a wide range of properties including luxury homes, apartments for rent, flats for sale, commercial property, affordable housing, and verified property listings across Ahmedabad and Gujarat region."
        }
      },
      {
        "@type": "Question",
        "name": "Is EstateIntel the best property website in Ahmedabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EstateIntel is recognized as one of the best property websites in Ahmedabad, offering verified listings, comprehensive property analytics, and expert real estate services to help you make smart property decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How do I find rental properties on EstateIntel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Finding rental properties on EstateIntel is easy. Use our search filters to browse apartments for rent, set your preferences for location and budget, and contact property owners directly through our platform."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Smart Real Estate Platform - Buy Property, Rent Apartments, Luxury Homes"
        description="Discover premium real estate listings, buy property, rent apartments, and find luxury homes with EstateIntel. Your trusted platform for verified property listings and real estate investment opportunities."
        keywords="EstateIntel, real estate platform, buy property online, apartments for rent, flats for sale, luxury homes, commercial property, verified property listings, affordable housing, property investment, real estate near me, best property website, homes for sale, rental properties, real estate in Ahmedabad, Gujarat property listings, smart property decisions, real estate analytics, property investment platform, buy property, rent apartment, property management, real estate experts, verified listings, property search, real estate services, property portal"
        canonicalUrl="https://estateintel-data-6cfs.onrender.com"
        ogImage="https://estateintel-data-6cfs.onrender.com/og-home.jpg"
        schemaMarkup={organizationSchema}
        additionalSchemas={[websiteSchema, faqSchema]}
      />
      <Analytics />
      <main className="bg-bg overflow-x-hidden">
        <header>
          <h1 className="sr-only">EstateIntel - Smart Real Estate Platform</h1>
          <p className="sr-only">Buy property, rent apartments, find luxury homes and commercial properties with verified listings and real estate investment opportunities</p>
        </header>
        <Hero />
        <Solutions />
        <ProcessSection />
        <Features />
        <FAQSection />
        <TestimonialsSection />
        <PricingSection />
        <FooterSection />
      </main>
    </>
  );
};

export default LandingPage;
