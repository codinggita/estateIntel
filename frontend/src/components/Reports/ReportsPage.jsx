import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Brain,
  AlertCircle,
  Train,
  Building,
  Zap,
  TrendingUp,
  Minus,
  Download,
  Share2,
  BarChart3,
  Bot
} from 'lucide-react';

// Lazy load heavy components for performance
const BarChart = lazy(() => import('recharts').then(module => ({ default: module.BarChart })));
const Bar = lazy(() => import('recharts').then(module => ({ default: module.Bar })));
const XAxis = lazy(() => import('recharts').then(module => ({ default: module.XAxis })));
const YAxis = lazy(() => import('recharts').then(module => ({ default: module.YAxis })));
const CartesianGrid = lazy(() => import('recharts').then(module => ({ default: module.CartesianGrid })));
const Tooltip = lazy(() => import('recharts').then(module => ({ default: module.Tooltip })));
const ResponsiveContainer = lazy(() => import('recharts').then(module => ({ default: module.ResponsiveContainer })));

import Button from '../ui/Button';

const ReportsPage = () => {
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Mock data for localities
  const localities = [
    { id: 1, name: 'Indiranagar', city: 'Bengaluru', tier: 'Tier 1', price: 14500, growth: 8.5 },
    { id: 2, name: 'Whitefield', city: 'Bengaluru', tier: 'Tier 1', price: 12800, growth: 12.3 },
    { id: 3, name: 'Koramangala', city: 'Bengaluru', tier: 'Tier 1', price: 13500, growth: 9.8 },
    { id: 4, name: 'HSR Layout', city: 'Bengaluru', tier: 'Tier 1', price: 11200, growth: 10.2 },
    { id: 5, name: 'Electronic City', city: 'Bengaluru', tier: 'Tier 1', price: 9800, growth: 11.5 },
    { id: 6, name: 'Gachibowli', city: 'Hyderabad', tier: 'Tier 1', price: 8500, growth: 14.2 },
    { id: 7, name: 'Bandra West', city: 'Mumbai', tier: 'Tier 1', price: 28000, growth: 6.8 },
    { id: 8, name: 'Jubilee Hills', city: 'Hyderabad', tier: 'Tier 1', price: 12000, growth: 9.5 }
  ];

  // Memoize filtered localities for performance
  const filteredLocalities = useMemo(() => {
    return localities.filter(
      (locality) =>
        locality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locality.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locality.tier.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Optimize report generation with useCallback
  const handleGenerateReport = useCallback(async (locality) => {
    setSelectedLocation(locality);
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockReportData = {
      locality: locality.name,
      city: locality.city,
      tier: locality.tier,
      updated: '2h ago',

      aqi: {
        score: 64,
        status: 'MODERATE',
        pollutants: [
          { name: 'PM2.5', value: 45 },
          { name: 'PM10', value: 62 },
          { name: 'NO2', value: 28 },
          { name: 'SO2', value: 18 },
          { name: 'CO', value: 0.8 }
        ]
      },

      safety: {
        score: 8.9,
        status: 'VERY SAFE',
        metrics: [
          { label: 'Night patrol frequency', value: 'High' },
          { label: 'Street lighting', value: '92%' },
          { label: 'Incident Rate (YoY)', value: '-12%' },
          { label: 'Women safety score', value: '8.7/10' },
          { label: 'Emergency response', value: 'Excellent' }
        ]
      },

      marketComparison: [
        {
          metric: 'Avg Rental Yield',
          indiranagar: '4.2%',
          koramangala: '3.8%',
          hsr: '3.5%'
        },
        {
          metric: 'Property Appreciation',
          indiranagar: '+8.5%',
          koramangala: '+9.8%',
          hsr: '+10.2%'
        },
        {
          metric: 'Cap Rate',
          indiranagar: '3.8%',
          koramangala: '4.2%',
          hsr: '3.5%'
        }
      ],

      infrastructure: [
        { metric: 'Road Maintenance', score: 85 },
        { metric: 'Public Transport Access', score: 92 },
        { metric: 'Internet Connectivity', score: 95 },
        { metric: 'Power Reliability', score: 88 }
      ],

      waterUtility: {
        connectivity: 'BWSSB Supply Connectivity',
        metrics: [
          { label: 'Avg Ground Water Level', value: 'Normal' },
          { label: 'Water Quality Score', value: '8.2/10' },
          { label: 'Flood Risk', value: 'Low' }
        ]
      },

      connectivity: {
        metrics: [
          { label: 'Distance to Airport', value: '45 km' },
          { label: 'Metro Accessibility', value: '5 min walk' },
          { label: 'Traffic Congestion', value: 'Moderate' }
        ]
      },

      healthcareEducation: {
        metrics: [
          { label: 'Nearby Hospitals', value: '5' },
          { label: 'School Ratings', value: '4.2/5' },
          { label: 'Healthcare Quality', value: '8.5/10' }
        ]
      }
    };

    setReportData(mockReportData);
    setIsGenerating(false);
  }, []);

  const renderSearchHero = () => (
    <main
      role="main"
      aria-label="Real Estate Reports Search"
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-zinc-950'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}
    >
      <div className="max-w-4xl w-full">
        <header className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark'
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                : 'bg-blue-100 text-blue-700'
            }`}
            role="status"
            aria-live="polite"
          >
            <Brain className="w-4 h-4" aria-hidden="true" />
            AI-Powered Intelligence
          </div>

          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Estate Locality
            </span>
            <br />
            Intelligence Reports
          </h1>

          <p
            className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Generate institutional-grade real estate analytics and livability insights instantly.
          </p>
        </header>

        <section
          className={`rounded-2xl shadow-xl border p-8 ${
            theme === 'dark'
              ? 'bg-zinc-800 border-zinc-700'
              : 'bg-white border-gray-200'
          }`}
          aria-labelledby="search-heading"
        >
          <h2 id="search-heading" className="sr-only">Search Localities</h2>
          
          <div className="relative mb-6">
            <label htmlFor="locality-search" className="sr-only">
              Search locality, city, or region
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
              aria-hidden="true"
            />

            <input
              id="locality-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locality, city, region..."
              className={`w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-gray-50 text-gray-900'
              }`}
              aria-describedby="search-help"
              autoComplete="off"
              role="combobox"
              aria-expanded={searchQuery.length > 0}
              aria-autocomplete="list"
            />
            <div id="search-help" className="sr-only">
              Type to search for localities, cities, or regions. Use arrow keys to navigate results.
            </div>
          </div>

          {searchQuery && (
            <ul
              className="space-y-2 mb-6"
              role="listbox"
              aria-label="Search results"
            >
              {filteredLocalities.map((locality) => (
                <li key={locality.id}>
                  <button
                    type="button"
                    onClick={() => handleGenerateReport(locality)}
                    className={`w-full p-4 rounded-lg cursor-pointer transition text-left ${
                      theme === 'dark'
                        ? 'bg-zinc-700 hover:bg-zinc-600'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    role="option"
                    aria-selected={selectedLocation?.id === locality.id}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div
                          className={`font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {locality.name}
                        </div>

                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {locality.city}
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          ₹{locality.price.toLocaleString()}/sqft
                        </div>

                        <div className="text-xs text-green-600">
                          +{locality.growth}% growth
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Button
            onClick={() => {
              if (filteredLocalities.length > 0) {
                handleGenerateReport(filteredLocalities[0]);
              }
            }}
            disabled={!searchQuery || filteredLocalities.length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
            aria-describedby="generate-help"
          >
            Generate Intelligence Report
          </Button>
          <div id="generate-help" className="sr-only">
            Generate a comprehensive real estate intelligence report for the selected locality
          </div>
        </section>
      </div>
    </main>
  );

  if (isGenerating) {
    return (
      <main
        role="main"
        aria-label="Generating Report"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            role="status"
            aria-label="Loading indicator"
          ></div>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Generating Intelligence Report...
          </p>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Please wait while we generate your comprehensive real estate report
          </div>
        </div>
      </main>
    );
  }

  if (!reportData) {
    return renderSearchHero();
  }

  return (
    <main
      role="main"
      aria-label="Real Estate Intelligence Report"
      className={`w-full pt-20 px-6 lg:px-8 pb-12 ${
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      {/* HEADER */}
      <header className="mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          LOCALITY INTELLIGENCE REPORT
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {reportData.locality}, {reportData.city}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive data analysis for investment and livability assessment.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {reportData.tier}
            </div>

            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Updated {reportData.updated}
            </div>
          </div>
        </div>
      </header>

      {/* ALERTS */}
      <section
        className={`rounded-2xl p-6 mb-8 ${
          theme === 'dark'
            ? 'bg-red-900/20 border border-red-800'
            : 'bg-red-50 border border-red-200'
        }`}
        aria-labelledby="alerts-heading"
      >
        <h2
          id="alerts-heading"
          className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <AlertCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
          Critical Alerts & Future Outlook
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Train className="w-5 h-5 text-red-600" aria-hidden="true" />
              <h3 className="font-semibold">Metro Phase Construction</h3>
            </div>

            <p className="text-sm mb-2">
              Metro connectivity expansion improving accessibility
            </p>

            <div className="text-sm font-medium text-red-600">
              +12% appreciation impact
            </div>
          </article>

          <article className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-5 h-5 text-red-600" aria-hidden="true" />
              <h3 className="font-semibold">Commercial Zoning</h3>
            </div>

            <p className="text-sm mb-2">
              Mixed-use redevelopment and retail expansion
            </p>

            <div className="text-sm font-medium text-red-600">
              +8% rental yield improvement
            </div>
          </article>

          <article className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-red-600" aria-hidden="true" />
              <h3 className="font-semibold">Government Development</h3>
            </div>

            <p className="text-sm mb-2">
              Road widening and smart city infrastructure
            </p>

            <div className="text-sm font-medium text-red-600">
              +15% civic investment impact
            </div>
          </article>
        </div>
      </section>

      {/* AQI + SAFETY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AQI */}
        <section 
          className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6"
          aria-labelledby="aqi-heading"
        >
          <h2 id="aqi-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            AIR QUALITY INDEX (AQI)
          </h2>

          <div className="flex items-baseline gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-900 dark:text-white">
              {reportData.aqi.score}
            </div>

            <div className="text-lg text-gray-600 dark:text-gray-300">
              {reportData.aqi.status}
            </div>
          </div>

          <div className="h-48 mb-4">
            <Suspense fallback={<div className="flex items-center justify-center h-full">Loading chart...</div>}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.aqi.pollutants}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </div>
        </section>

        {/* SAFETY */}
        <section 
          className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6"
          aria-labelledby="safety-heading"
        >
          <h2 id="safety-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            SAFETY & CRIME INDEX
          </h2>

          <div className="flex items-baseline gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-900 dark:text-white">
              {reportData.safety.score}
            </div>

            <div className="text-lg text-gray-600 dark:text-gray-300">
              {reportData.safety.status}
            </div>
          </div>

          <ul className="space-y-3">
            {reportData.safety.metrics.map((metric, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-700"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.label}
                </span>

                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {metric.value}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* REAL ESTATE TRENDS */}
      <section 
        className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6"
        aria-labelledby="trends-heading"
      >
        <h2 id="trends-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Real Estate Trends
        </h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Property price trend
            </span>

            <TrendingUp className="w-4 h-4 text-green-600" aria-hidden="true" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Rental trend
            </span>

            <TrendingUp className="w-4 h-4 text-green-600" aria-hidden="true" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Demand vs supply
            </span>

            <Minus className="w-4 h-4 text-gray-600" aria-hidden="true" />
          </div>
        </div>

        <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
          <div className="text-xs text-gray-500">Trend Analysis Chart</div>
        </div>
      </section>

      {/* WORKING FLOATING BUTTONS */}
      {reportData && (
        <nav
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50"
          role="navigation"
          aria-label="Report actions"
        >
          <div className="bg-gray-900 dark:bg-zinc-800 p-2.5 rounded-2xl shadow-2xl border border-gray-700 dark:border-zinc-600 flex gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Real Estate Report - ${reportData.locality}`,
                    text: `Check out this comprehensive real estate intelligence report for ${reportData.locality}, ${reportData.city}`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
              aria-label="Share report"
            >
              <Share2 size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
              aria-label="Download PDF"
            >
              <Download size={16} aria-hidden="true" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              onClick={() => {
                // Navigate to analytics page
                window.location.href = '/app/analytics';
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium"
              aria-label="View analytics"
            >
              <BarChart3 size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Analytics</span>
            </button>

            <button
              onClick={() => {
                // Trigger AI analysis
                alert('AI Analysis feature coming soon!');
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm font-medium"
              aria-label="AI analysis"
            >
              <Bot size={16} aria-hidden="true" />
              <span className="hidden sm:inline">AI</span>
            </button>
          </div>
        </nav>
      )}
    </main>
  );
};

export default ReportsPage;