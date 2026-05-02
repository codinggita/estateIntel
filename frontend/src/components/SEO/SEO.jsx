import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  schemaMarkup = null,
  additionalSchemas = []
}) => {
  const siteTitle = title ? `${title} | EstateIntel` : 'EstateIntel - Smart Property Decisions';
  const siteDescription = description || 'Discover premium real estate listings, buy property, rent apartments, and find luxury homes with EstateIntel. Your trusted platform for verified property listings and real estate investment opportunities.';
  const siteKeywords = keywords || 'EstateIntel, real estate platform, buy property online, apartments for rent, flats for sale, luxury homes, commercial property, verified property listings, affordable housing, property investment, real estate near me, best property website, homes for sale, rental properties, real estate in Ahmedabad, Gujarat property listings, smart property decisions, real estate analytics, property investment platform, buy property, rent apartment, property management, real estate experts, verified listings, property search, real estate services, property portal';
  const siteUrl = canonicalUrl || 'https://estateintel-5.onrender.com';
  const siteImage = ogImage || 'https://estateintel-5.onrender.com/og-image.jpg';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Robots Meta Tag */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="EstateIntel" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:creator" content="@estateintel" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="EstateIntel" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="ICBM" content="40.7128; -74.0060" />
      
      {/* Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
      
      {/* Additional Schemas */}
      {additionalSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
