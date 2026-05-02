import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { 
  Search, MapPin, TrendingUp, FileText, Download, Share2, Filter, X,
  Brain, Building, Train, Zap, AlertCircle, Minus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart as RechartsPieChart, Cell, RadialBarChart, RadialBar } from 'recharts';
import Button from './ui/Button';
import { generatePDF, generateMultiPagePDF, generateSummaryPDF, printReport } from '../utils/pdfExport';
import logger from '../utils/logger';

const ReportsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const filteredLocalities = localities.filter(locality =>
    locality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    locality.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    locality.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateReport = async (locality) => {
    setSelectedLocation(locality);
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock report data based on selected locality
    const mockReportData = {
      locality: locality.name,
      city: locality.city,
      tier: locality.tier,
      updated: '2h ago',
      aqi: {
        score: 64,
        status: 'MODERATE',
        pollutants: [
          { name: 'PM2.5', value: 45, color: '#10B981' },
          { name: 'PM10', value: 62, color: '#10B981' },
          { name: 'NO2', value: 28, color: '#10B981' },
          { name: 'SO2', value: 18, color: '#10B981' },
          { name: 'CO', value: 0.8, color: '#10B981' }
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
        { metric: 'Avg Rental Yield', indiranagar: '4.2%', koramangala: '3.8%', hsr: '3.5%' },
        { metric: 'Property Appreciation', indiranagar: '+8.5%', koramangala: '+9.8%', hsr: '+10.2%' },
        { metric: 'Cap Rate', indiranagar: '3.8%', koramangala: '4.2%', hsr: '3.5%' },
        { metric: 'Walkability Index', indiranagar: '78', koramangala: '72', hsr: '85' },
        { metric: 'Green Cover %', indiranagar: '15', koramangala: '18', hsr: '22' },
        { metric: 'Livability Score', indiranagar: '82', koramangala: '79', hsr: '81' },
        { metric: 'Median Property Price', indiranagar: '₹2.8Cr', koramangala: '₹3.1Cr', hsr: '₹2.4Cr' },
        { metric: 'Price per Sq Ft', indiranagar: '₹14,500', koramangala: '₹13,500', hsr: '₹11,200' },
        { metric: 'Vacancy Rate', indiranagar: '3.2%', koramangala: '4.5%', hsr: '3.8%' }
      ],
      infrastructure: [
        { metric: 'Road Maintenance', score: 85 },
        { metric: 'Public Transport Access', score: 92 },
        { metric: 'Internet Connectivity', score: 95 },
        { metric: 'Power Reliability', score: 88 },
        { metric: 'Metro Connectivity', score: 89 },
        { metric: 'EV Charging Availability', score: 72 }
      ],
      waterUtility: {
        connectivity: 'BWSSB Supply Connectivity',
        metrics: [
          { label: 'Avg Ground Water Level', value: 'Normal' },
          { label: 'Water Quality Score', value: '8.2/10' },
          { label: 'Power Outage Frequency', value: '2/month' },
          { label: 'Flood Risk', value: 'Low' },
          { label: 'Rainwater Harvesting', value: '45%' },
          { label: 'Sewage Infrastructure', value: 'Good' }
        ]
      },
      connectivity: {
        metrics: [
          { label: 'Distance to Airport', value: '45 km' },
          { label: 'Metro Accessibility', value: '5 min walk' },
          { label: 'Highway Connectivity', value: 'Excellent' },
          { label: 'Average Commute Time', value: '25 min' },
          { label: 'Traffic Congestion', value: 'Moderate' },
          { label: 'Public Transport Score', value: '85/100' }
        ]
      },
      healthcareEducation: {
        metrics: [
          { label: 'Nearby Hospitals', value: '5' },
          { label: 'School Ratings', value: '4.2/5' },
          { label: 'College Accessibility', value: 'Excellent' },
          { label: 'Healthcare Quality', value: '8.5/10' },
          { label: 'Pharmacy Density', value: 'High' }
        ]
      }
    };
    
    setReportData(mockReportData);
    setIsGenerating(false);
  };

  // PDF Export Handlers
  const handleDownloadFullPDF = async () => {
    try {
      await generateMultiPagePDF('report-content', `${reportData.locality}_Intelligence_Report_Full.pdf`);
    } catch (error) {
      logger.error('Error generating full PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleShareReport = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${reportData.locality} Intelligence Report`,
          text: 'Comprehensive data analysis for investment and livability assessment',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Report link copied to clipboard!');
      }
    } catch (error) {
      logger.error('Error sharing report:', error);
    }
  };

  // Render search hero section
 const renderSearchHero = () => (
  <div
    className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
      theme === "dark"
        ? "bg-zinc-950"
        : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    }`}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl w-full"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            theme === "dark"
              ? "bg-blue-950 text-blue-300 border border-blue-900"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          <Brain className="w-4 h-4" />
          AI-Powered Intelligence
        </motion.div>

        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
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
            theme === "dark" ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          Generate institutional-grade real estate analytics, investment
          forecasts, infrastructure intelligence, and livability insights
          instantly with AI-powered analysis.
        </p>
      </div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`rounded-2xl shadow-xl border p-8 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-zinc-900 border-zinc-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="relative mb-6">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              theme === "dark" ? "text-zinc-500" : "text-gray-400"
            }`}
            size={20}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locality, city, region, or PIN code..."
            className={`w-full pl-12 pr-4 py-4 rounded-xl text-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              theme === "dark"
                ? "bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500"
                : "bg-gray-50 border-gray-200 text-gray-900"
            }`}
          />
        </div>

        {/* Suggested Searches */}
        <div className="mb-6">
          <p
            className={`text-sm mb-3 ${
              theme === "dark" ? "text-zinc-400" : "text-gray-500"
            }`}
          >
            Popular searches:
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Indiranagar",
              "Whitefield",
              "Koramangala",
              "HSR Layout",
              "Gachibowli",
              "Bandra West",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <p
              className={`text-sm mb-3 ${
                theme === "dark" ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              Search results:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredLocalities.map((locality) => (
                <div
                  key={locality.id}
                  onClick={() => handleGenerateReport(locality)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`font-semibold ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {locality.name}
                      </div>

                      <div
                        className={`text-sm ${
                          theme === "dark"
                            ? "text-zinc-400"
                            : "text-gray-600"
                        }`}
                      >
                        {locality.city}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        ₹{locality.price.toLocaleString()}/sqft
                      </div>

                      <div className="text-xs text-green-500">
                        +{locality.growth}% growth
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={() => {
            const selected = filteredLocalities[0];

            if (selected) {
              handleGenerateReport(selected);
            }
          }}
          disabled={!searchQuery || filteredLocalities.length === 0}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Intelligence Report
        </Button>
      </motion.div>
    </motion.div>
  </div>
);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-[#F5F7FA]'}`}>
      {/* MAIN CONTENT */}
      <div className="w-full pt-20">
        {isGenerating ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Generating Intelligence Report...</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2`}>This may take a few moments</p>
            </div>
          </div>
        ) : !reportData ? (
          renderSearchHero()
        ) : (
          <div id="report-content" className="max-w-7xl mx-auto px-8 py-8">
          {/* HEADER */}
          <div className="mb-8">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>LOCALITY INTELLIGENCE REPORT</div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{reportData.locality}, {reportData.city}</h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Comprehensive data analysis for investment and livability assessment.</p>
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

          {/* CRITICAL ALERTS SECTION */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Critical Alerts & Future Outlook
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <Train className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Metro Phase Construction</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Metro connectivity expansion improving accessibility</p>
                <div className="text-sm font-medium text-red-600">+12% appreciation impact</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Commercial Zoning</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Mixed-use redevelopment and retail expansion</p>
                <div className="text-sm font-medium text-red-600">+8% rental yield improvement</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Government Development</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Road widening and smart city infrastructure</p>
                <div className="text-sm font-medium text-red-600">+15% civic investment impact</div>
              </div>
            </div>
          </div>

          {/* ROW 1: AQI and Safety Score */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* AQI Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AIR QUALITY INDEX (AQI)</h2>
              <div className="flex items-baseline gap-4 mb-4">
                <div className="text-5xl font-bold text-gray-900">{reportData.aqi.score}</div>
                <div className="text-lg text-gray-600">{reportData.aqi.status}</div>
              </div>
              <p className="text-sm text-gray-600 mb-6">Real-time and historical air quality trends.</p>
              
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.aqi.pollutants}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-5 gap-2 text-xs">
                {reportData.aqi.pollutants.map((pollutant, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-gray-900">{pollutant.value}</div>
                    <div className="text-gray-500">{pollutant.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Score Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Safety Score</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#3B82F6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - reportData.safety.score / 10)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-blue-600">{reportData.safety.score}</div>
                    <div className="text-sm text-gray-600">{reportData.safety.status}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {reportData.safety.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 2: Market Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Market Comparison: Nearby Nodes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Metric</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-600">Indiranagar (Subject)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Koramangala</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">HSR Layout</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.marketComparison.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{row.metric}</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">{row.indiranagar}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{row.koramangala}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{row.hsr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROW 3: Infrastructure and Water Utility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Infrastructure Audit */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Infrastructure Audit</h2>
              <div className="space-y-4">
                {reportData.infrastructure.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{item.metric}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic mt-4">*Expert analysis based on municipal data and resident feedback</p>
            </div>

            {/* Water & Utility Resilience */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Water & Utility Resilience</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="text-sm font-medium text-blue-700">{reportData.waterUtility.connectivity}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {reportData.waterUtility.metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                    <div className="text-sm font-medium text-gray-900">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 4: Connectivity and Healthcare */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Connectivity Analysis */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Connectivity Analysis</h2>
              <div className="space-y-3">
                {reportData.connectivity.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-xs text-gray-500">Traffic Heatmap</div>
              </div>
            </div>

            {/* Healthcare & Education */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Healthcare & Education Index</h2>
              <div className="space-y-3">
                {reportData.healthcareEducation.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 5: Future Development and Real Estate Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Future Development & Growth */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Future Development & Growth</h2>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <Train className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Metro expansion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">IT park projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Commercial hubs</span>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-xs text-gray-500">5-Year Appreciation Graph</div>
              </div>
            </div>

            {/* Real Estate Trends */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Real Estate Trends</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Property price trend</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rental trend</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Demand vs supply</span>
                  <Minus className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                <div className="text-xs text-gray-500">Trend Analysis Chart</div>
              </div>
            </div>
          </div>

          {/* ROW 6: Environment & Livability */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Environment & Livability</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Green spaces', value: 'High' },
                { label: 'Noise pollution', value: 'Moderate' },
                { label: 'Heat index', value: 'Normal' },
                { label: 'Walkability', value: '78/100' },
                { label: 'Cycling friendliness', value: 'Good' },
                { label: 'Urban density', value: 'Medium' },
                { label: 'Parks nearby', value: '8' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="h-32 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-xs text-gray-500">Livability Score Gauge</div>
            </div>
          </div>

          {/* EXPERT COMMENTARY */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Expert Commentary</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Indiranagar presents a compelling investment opportunity with strong fundamentals supporting both capital appreciation and rental yields. The area's strategic location, coupled with ongoing infrastructure development including the metro expansion, positions it for sustained growth over the next 3-5 years.
              </p>
              <p>
                The locality benefits from excellent connectivity to major employment hubs, a robust social infrastructure with quality healthcare and educational institutions, and a vibrant commercial ecosystem. The mixed-use zoning policies and upcoming smart city initiatives further enhance the investment thesis.
              </p>
              <p>
                While traffic congestion remains a concern during peak hours, the comprehensive infrastructure improvements and enhanced public transport connectivity are expected to mitigate these challenges. The area's established reputation as a premium residential-commercial hub continues to attract both end-users and investors, ensuring sustained demand and value appreciation.
              </p>
            </div>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-2xl border border-gray-200 px-8 py-4 flex items-center gap-6 z-50 animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={handleShareReport}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all font-bold text-sm"
            >
              <Share2 size={18} /> Share
            </button>
            <button 
              onClick={handleDownloadFullPDF}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-200"
            >
              <Download size={18} /> Export Full PDF
            </button>
            <button 
              onClick={() => {
                const csvData = [
                  ['Metric', 'Value'],
                  ['Locality', reportData.locality],
                  ['City', reportData.city],
                  ['AQI Score', reportData.aqi.score],
                  ['Safety Score', reportData.safety.score],
                  ['Road Maintenance', '85%'],
                  ['Internet', '95%']
                ].map(row => row.join(',')).join('\n');
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${reportData.locality}_Analytics.csv`;
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all font-bold text-sm"
            >
              <FileText size={18} /> Analytics CSV
            </button>
            <button 
              onClick={() => {
                alert(`AI SUMMARY: ${reportData.locality} is a ${reportData.tier} area with a high safety score of ${reportData.safety.score}/10 and robust infrastructure (${reportData.infrastructure[0].score}% road maintenance). Recommended for ${reportData.healthcareEducation.metrics[0].value} nearby medical facilities access.`);
              }}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-all font-bold text-sm border border-indigo-100"
            >
              <Brain size={18} /> AI Summary
            </button>
          </div>
        </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ReportsPage;
