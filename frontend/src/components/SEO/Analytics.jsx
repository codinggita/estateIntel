import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `;
    document.head.appendChild(script2);

    // Google Search Console verification
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = 'YOUR_VERIFICATION_CODE';
    document.head.appendChild(meta);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Helmet>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </script>
      
      {/* Google Search Console */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      
      {/* Bing Webmaster Tools */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      
      {/* Yandex Webmaster */}
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
    </Helmet>
  );
};

export default Analytics;
