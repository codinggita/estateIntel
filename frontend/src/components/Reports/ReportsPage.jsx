import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { 
  Search, MapPin, TrendingUp, FileText, Download, Share2, Filter, X,
  AlertTriangle, CheckCircle, AlertCircle, Activity, BarChart3, PieChart,
  Users, Building, Zap, Shield, Droplets, Wind, Thermometer,
  TreePine, Home, School, Hospital, Car, Train, Plane, DollarSign,
  TrendingDown, Calendar, Clock, Award, Target, Trophy, Menu,
  Settings, LogOut, HelpCircle, Bookmark, Brain, Briefcase, LayoutDashboard,
  Printer, Layout, BarChart2, PieChartIcon, TrendingUpIcon, AlertCircleIcon,
  ChevronRight, ArrowUp, ArrowDown, Minus, RefreshCw, FileSpreadsheet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart as RechartsPieChart, Cell, RadialBarChart, RadialBar } from 'recharts';
import Button from '../ui/Button';
import { generatePDF, generateMultiPagePDF, generateSummaryPDF, printReport } from '../../utils/pdfExport';
import ReportActionBar from './ReportActionBar';

const ReportsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
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
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            <Brain className="w-4 h-4" />
            AI-Powered Intelligence
          </motion.div>
          
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Estate Locality
            </span>
            Intelligence Reports
          </h1>
          
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Generate institutional-grade real estate analytics, investment forecasts, infrastructure intelligence, 
            and livability insights instantly with AI-powered analysis.
          </p>
        </div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl shadow-xl border p-8 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'}`}
        >
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locality, city, region, or PIN code..."
              className={`w-full pl-12 pr-4 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Suggested Searches */}
          <div className="mb-6">
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Indiranagar', 'Whitefield', 'Koramangala', 'HSR Layout', 'Gachibowli', 'Bandra West'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Search results:</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredLocalities.map((locality) => (
                  <div
                    key={locality.id}
                    onClick={() => handleGenerateReport(locality)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-zinc-700 hover:bg-zinc-600' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{locality.name}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{locality.city}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>₹{locality.price.toLocaleString()}/sqft</div>
                        <div className="text-xs text-green-600">+{locality.growth}% growth</div>
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
    <div className={`w-full pt-20 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
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
        <div id="report-content" className="w-full px-6 lg:px-8 pb-12">
          {/* HEADER */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">LOCALITY INTELLIGENCE REPORT</div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{reportData.locality}, {reportData.city}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Comprehensive data analysis for investment and livability assessment.</p>
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

          {/* CRITICAL ALERTS SECTION */}
          <div className={`rounded-2xl p-6 mb-8 ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <AlertCircle className="w-6 h-6 text-red-600" />
              Critical Alerts & Future Outlook
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`rounded-xl p-4 border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-red-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Train className="w-5 h-5 text-red-600" />
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Metro Phase Construction</h3>
                </div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Metro connectivity expansion improving accessibility</p>
                <div className="text-sm font-medium text-red-600">+12% appreciation impact</div>
              </div>
              <div className={`rounded-xl p-4 border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-red-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-red-600" />
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Commercial Zoning</h3>
                </div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Mixed-use redevelopment and retail expansion</p>
                <div className="text-sm font-medium text-red-600">+8% rental yield improvement</div>
              </div>
              <div className={`rounded-xl p-4 border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-red-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-red-600" />
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Government Development</h3>
                </div>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Road widening and smart city infrastructure</p>
                <div className="text-sm font-medium text-red-600">+15% civic investment impact</div>
              </div>
            </div>
          </div>

          {/* ROW 1: AQI and Safety Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* AQI Card */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AIR QUALITY INDEX (AQI)</h2>
              <div className="flex items-baseline gap-4 mb-4">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">{reportData.aqi.score}</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">{reportData.aqi.status}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Real-time and historical air quality trends.</p>
              
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.aqi.pollutants}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === 'dark' ? "#374151" : "#f0f0f0"} 
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: theme === 'dark' ? "#9CA3AF" : "#6B7280" }} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: theme === 'dark' ? "#9CA3AF" : "#6B7280" }} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? "#1F2937" : "#FFFFFF",
                        border: `1px solid ${theme === 'dark' ? "#374151" : "#E5E7EB"}`,
                        borderRadius: "8px"
                      }}
                      labelStyle={{ color: theme === 'dark' ? "#F9FAFB" : "#111827" }}
                    />
                    <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-5 gap-2 text-xs">
                {reportData.aqi.pollutants.map((pollutant, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-gray-900 dark:text-white">{pollutant.value}</div>
                    <div className="text-gray-500 dark:text-gray-400">{pollutant.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Score Card */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">SAFETY & CRIME INDEX</h2>
              <div className="flex items-baseline gap-4 mb-4">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">{reportData.safety.score}</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">{reportData.safety.level}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Comprehensive safety metrics and crime statistics.</p>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={theme === 'dark' ? "#374151" : "#E5E7EB"}
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
                  <div key={index} className={`flex justify-between items-center py-2 border-b last:border-0 ${
                    theme === 'dark' ? 'border-zinc-700' : 'border-gray-100'
                  }`}>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{metric.label}</span>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 2: Market Comparison Table */}
          <div className={`rounded-2xl border shadow-sm p-6 mb-8 ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Market Comparison: Nearby Nodes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Metric</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-600">Indiranagar (Subject)</th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Koramangala</th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>HSR Layout</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.marketComparison.map((row, index) => (
                    <tr key={index} className={`border-b ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-100'}`}>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{row.metric}</td>
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">{row.indiranagar}</td>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{row.koramangala}</td>
                      <td className={`py-3 px-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{row.hsr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROW 3: Infrastructure and Water Utility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Infrastructure Audit */}
            <div className={`rounded-2xl border shadow-sm p-6 ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Infrastructure Audit</h2>
              <div className="space-y-4">
                {reportData.infrastructure.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.metric}</span>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.score}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className={`text-xs italic mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>*Expert analysis based on municipal data and resident feedback</p>
            </div>

            {/* Water & Utility Resilience */}
            <div className={`rounded-2xl border shadow-sm p-6 ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Water & Utility Resilience</h2>
              <div className={`border rounded-lg p-3 mb-4 ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="text-sm font-medium text-blue-700">{reportData.waterUtility.connectivity}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {reportData.waterUtility.metrics.map((metric, index) => (
                  <div key={index} className={`rounded-lg p-3 ${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{metric.label}</div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{metric.value}</div>
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
        )}
      </div>

      {/* SIMPLE WORKING ACTION BUTTONS */}
      {reportData && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border p-4 ${
            theme === 'dark'
              ? 'bg-zinc-900/90 border-zinc-700/50'
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex gap-2">
              {/* Share Button */}
              <button
                onClick={async () => {
                  try {
                    const shareUrl = window.location.href;
                    if (navigator.share) {
                      await navigator.share({
                        title: `${reportData.locality} Intelligence Report`,
                        text: `Check out this comprehensive real estate intelligence report for ${reportData.locality}, ${reportData.city}`,
                        url: shareUrl
                      });
                    } else {
                      await navigator.clipboard.writeText(shareUrl);
                      alert('Share link copied to clipboard!');
                    }
                  } catch (error) {
                    alert('Failed to share report');
                  }
                }}
                className={`p-3 rounded-lg text-white transition-colors ${
                  theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title="Share Report"
              >
                <Share2 size={20} />
              </button>

              {/* PDF Button */}
              <button
                onClick={async () => {
                  try {
                    const fileName = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-report-${Date.now()}`;
                    const { generateMultiPagePDF } = await import('../utils/pdfExport');
                    await generateMultiPagePDF('report-content', fileName);
                    alert('PDF exported successfully!');
                  } catch (error) {
                    alert('Failed to export PDF');
                  }
                }}
                className={`p-3 rounded-lg text-white transition-colors ${
                  theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                }`}
                title="Export PDF"
              >
                <Download size={20} />
              </button>

              {/* Analytics Button */}
              <button
                onClick={() => {
                  try {
                    const analyticsData = [
                      ['Metric', 'Value'],
                      ['Locality', reportData.locality],
                      ['City', reportData.city],
                      ['AQI Score', reportData.aqi.score],
                      ['Safety Score', reportData.safety.overallScore],
                      ['Average Price', `₹${reportData.realEstate.avgPrice}`],
                      ['Appreciation', `${reportData.realEstate.appreciation}%`],
                      ['Rental Yield', `${reportData.realEstate.rentalYield}%`]
                    ];
                    
                    const csvContent = analyticsData.map(row => row.join(',')).join('\n');
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-analytics.csv`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    
                    alert('Analytics exported successfully!');
                  } catch (error) {
                    alert('Failed to export analytics');
                  }
                }}
                className={`p-3 rounded-lg text-white transition-colors ${
                  theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                }`}
                title="Download Analytics"
              >
                <FileSpreadsheet size={20} />
              </button>

              {/* AI Summary Button */}
              <button
                onClick={() => {
                  const summary = `
${reportData.locality} Intelligence Report - AI Summary

${reportData.locality} in ${reportData.city} presents a compelling investment opportunity with strong fundamentals. The area demonstrates excellent livability with ${reportData.aqi.score} AQI rating and ${reportData.safety.overallScore}/10 safety score.

INVESTMENT RECOMMENDATION:
${reportData.realEstate.appreciation >= 8 ? "STRONG BUY" : "BUY"}
Expected Returns: ${reportData.realEstate.appreciation}% annual appreciation + ${reportData.realEstate.rentalYield}% rental yield
Risk Level: Low

ROI PROJECTION:
Year 1: ${reportData.realEstate.appreciation + 2}%
Year 3: ${(reportData.realEstate.appreciation * 3) + 8}%
Year 5: ${(reportData.realEstate.appreciation * 5) + 15}%
Total Return: ${(reportData.realEstate.appreciation * 5) + 15 + (reportData.realEstate.rentalYield * 5)}%

FINAL RECOMMENDATION:
${reportData.locality} offers an excellent investment opportunity with strong growth prospects driven by infrastructure development and increasing demand. Recommended for both end-users and investors seeking medium to long-term gains.
                  `.trim();

                  alert(summary);
                }}
                className={`p-3 rounded-lg text-white transition-colors ${
                  theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'
                }`}
                title="AI Summary"
              >
                <Brain size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ReportsPage;
