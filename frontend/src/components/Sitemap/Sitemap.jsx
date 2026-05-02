import React, { useEffect } from 'react';

const Sitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemapUrls = [
    {
      url: 'https://estateintel-5.onrender.com/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: 'https://estateintel-5.onrender.com/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: 'https://estateintel-5.onrender.com/login',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: 'https://estateintel-5.onrender.com/signup',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: 'https://estateintel-5.onrender.com/app/map',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: 'https://estateintel-5.onrender.com/app/insights',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: 'https://estateintel-5.onrender.com/app/reports',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: 'https://estateintel-5.onrender.com/app/inspection',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: 'https://estateintel-5.onrender.com/app/resources',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  const generateSitemapXML = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.url}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    return xml;
  };

  useEffect(() => {
    const sitemapXML = generateSitemapXML();
    
    // Set the content type header
    document.contentType = 'application/xml';
    
    // Replace the entire document content with XML
    document.open();
    document.write(sitemapXML);
    document.close();
    
    // Set the content type meta tag
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'application/xml; charset=utf-8';
    document.head.appendChild(meta);
  }, []);

  return null; // Component renders nothing, XML is written directly to document
};

export default Sitemap;
