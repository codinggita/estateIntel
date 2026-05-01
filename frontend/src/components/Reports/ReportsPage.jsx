import React, { useState } from 'react';
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
  Minus
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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

  const filteredLocalities = localities.filter(
    (locality) =>
      locality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locality.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locality.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateReport = async (locality) => {
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
  };

  const renderSearchHero = () => (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-zinc-950'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark'
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            <Brain className="w-4 h-4" />
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
        </div>

        <div
          className={`rounded-2xl shadow-xl border p-8 ${
            theme === 'dark'
              ? 'bg-zinc-800 border-zinc-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locality, city, region..."
              className={`w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-gray-50 text-gray-900'
              }`}
            />
          </div>

          {searchQuery && (
            <div className="space-y-2 mb-6">
              {filteredLocalities.map((locality) => (
                <div
                  key={locality.id}
                  onClick={() => handleGenerateReport(locality)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    theme === 'dark'
                      ? 'bg-zinc-700 hover:bg-zinc-600'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
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
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={() => {
              if (filteredLocalities.length > 0) {
                handleGenerateReport(filteredLocalities[0]);
              }
            }}
            disabled={!searchQuery || filteredLocalities.length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
          >
            Generate Intelligence Report
          </Button>
        </div>
      </motion.div>
    </div>
  );

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Generating Intelligence Report...
          </p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return renderSearchHero();
  }

  return (
    <div
      className={`w-full pt-20 px-6 lg:px-8 pb-12 ${
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      {/* HEADER */}
      <div className="mb-8">
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
      </div>

      {/* ALERTS */}
      <div
        className={`rounded-2xl p-6 mb-8 ${
          theme === 'dark'
            ? 'bg-red-900/20 border border-red-800'
            : 'bg-red-50 border border-red-200'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <AlertCircle className="w-6 h-6 text-red-600" />
          Critical Alerts & Future Outlook
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Train className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">Metro Phase Construction</h3>
            </div>

            <p className="text-sm mb-2">
              Metro connectivity expansion improving accessibility
            </p>

            <div className="text-sm font-medium text-red-600">
              +12% appreciation impact
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">Commercial Zoning</h3>
            </div>

            <p className="text-sm mb-2">
              Mixed-use redevelopment and retail expansion
            </p>

            <div className="text-sm font-medium text-red-600">
              +8% rental yield improvement
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">Government Development</h3>
            </div>

            <p className="text-sm mb-2">
              Road widening and smart city infrastructure
            </p>

            <div className="text-sm font-medium text-red-600">
              +15% civic investment impact
            </div>
          </div>
        </div>
      </div>

      {/* AQI + SAFETY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AQI */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.aqi.pollutants}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SAFETY */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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

          <div className="space-y-3">
            {reportData.safety.metrics.map((metric, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-700"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.label}
                </span>

                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REAL ESTATE TRENDS */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Real Estate Trends
        </h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Property price trend
            </span>

            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Rental trend
            </span>

            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Demand vs supply
            </span>

            <Minus className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
          <div className="text-xs text-gray-500">Trend Analysis Chart</div>
        </div>
      </div>

      {/* WORKING FLOATING BUTTONS */}
      {reportData && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              gap: '5px'
            }}
          >
            <button
              onClick={function() { alert('SHARE BUTTON WORKS!'); }}
              style={{
                padding: '10px',
                background: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Share
            </button>

            <button
              onClick={function() { alert('PDF BUTTON WORKS!'); }}
              style={{
                padding: '10px',
                background: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              PDF
            </button>

            <button
              onClick={function() { alert('ANALYTICS BUTTON WORKS!'); }}
              style={{
                padding: '10px',
                background: 'purple',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Analytics
            </button>

            <button
              onClick={function() { alert('AI BUTTON WORKS!'); }}
              style={{
                padding: '10px',
                background: 'orange',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;