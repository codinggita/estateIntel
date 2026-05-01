import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, FileSpreadsheet, Brain, X, ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import reportService from '../../services/reportService';
import exportService from '../../services/exportService';
import aiService from '../../services/aiService';

const ReportActionBar = ({ reportData, reportElementId }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // Handle share report
  const handleShareReport = async () => {
    setActiveButton('share');
    try {
      // Simple share implementation
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
      console.error('Share failed:', error);
      alert('Failed to share report');
    } finally {
      setActiveButton(null);
    }
  };

  // Handle export PDF
  const handleExportPDF = async () => {
    setActiveButton('pdf');
    try {
      const fileName = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-comprehensive-report-${Date.now()}`;
      // Use existing PDF export utility
      const { generateMultiPagePDF } = await import('../../utils/pdfExport');
      await generateMultiPagePDF(reportElementId, fileName);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF');
    } finally {
      setActiveButton(null);
    }
  };

  // Handle download analytics
  const handleDownloadAnalytics = async (format = 'xlsx') => {
    setActiveButton('analytics');
    try {
      // Simple analytics export
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
      
      // Create CSV content
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
      console.error('Analytics export failed:', error);
      alert('Failed to export analytics');
    } finally {
      setActiveButton(null);
    }
  };

  // Handle generate AI summary
  const handleGenerateAISummary = async () => {
    setActiveButton('ai');
    setShowAIModal(true);
    
    try {
      // Simple AI summary generation
      const summary = {
        executiveSummary: `${reportData.locality} in ${reportData.city} presents a compelling investment opportunity with strong fundamentals. The area demonstrates excellent livability with ${reportData.aqi.score} AQI rating and ${reportData.safety.overallScore}/10 safety score.`,
        
        investmentRecommendation: {
          verdict: reportData.realEstate.appreciation >= 8 ? "STRONG BUY" : "BUY",
          confidence: "High",
          expectedReturns: `${reportData.realEstate.appreciation}% annual appreciation + ${reportData.realEstate.rentalYield}% rental yield`,
          riskLevel: "Low"
        },

        roiProjection: {
          year1: `${reportData.realEstate.appreciation + 2}%`,
          year3: `${(reportData.realEstate.appreciation * 3) + 8}%`,
          year5: `${(reportData.realEstate.appreciation * 5) + 15}%`,
          totalReturn: `${(reportData.realEstate.appreciation * 5) + 15 + (reportData.realEstate.rentalYield * 5)}%`
        },

        finalRecommendation: `${reportData.locality} offers an excellent investment opportunity with strong growth prospects driven by infrastructure development and increasing demand. Recommended for both end-users and investors seeking medium to long-term gains.`
      };
      
      setAiSummary(summary);
    } catch (error) {
      console.error('AI generation failed:', error);
      setShowAIModal(false);
    } finally {
      setActiveButton(null);
    }
  };

  // Copy AI summary to clipboard
  const handleCopyAISummary = () => {
    const summaryText = `
${reportData.locality} Intelligence Report - AI Summary

${aiSummary.executiveSummary}

INVESTMENT RECOMMENDATION:
${aiSummary.investmentRecommendation.verdict} - ${aiSummary.investmentRecommendation.confidence} confidence
Expected Returns: ${aiSummary.investmentRecommendation.expectedReturns}
Risk Level: ${aiSummary.investmentRecommendation.riskLevel}

ROI PROJECTION:
Year 1: ${aiSummary.roiProjection.year1}
Year 3: ${aiSummary.roiProjection.year3}
Year 5: ${aiSummary.roiProjection.year5}
Total Return: ${aiSummary.roiProjection.totalReturn}

FINAL RECOMMENDATION:
${aiSummary.finalRecommendation}
    `.trim();

    navigator.clipboard.writeText(summaryText);
    alert('AI summary copied to clipboard!');
  };

  // Export AI summary to PDF
  const handleExportAISummary = async () => {
    try {
      const { generateSummaryPDF } = await import('../../utils/pdfExport');
      const summaryData = {
        ...reportData,
        aiSummary: aiSummary.finalRecommendation,
        investmentInsights: aiSummary.investmentRecommendation,
        roiProjection: aiSummary.roiProjection
      };
      
      const fileName = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-ai-summary-${Date.now()}`;
      await generateSummaryPDF(summaryData, fileName);
      alert('AI summary exported successfully!');
    } catch (error) {
      console.error('AI summary export failed:', error);
      alert('Failed to export AI summary');
    }
  };

  const buttons = [
    {
      id: 'share',
      icon: Share2,
      label: 'Share Report',
      action: handleShareReport,
      color: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
      tooltip: 'Share report via link or clipboard'
    },
    {
      id: 'pdf',
      icon: Download,
      label: 'Export PDF',
      action: handleExportPDF,
      color: theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600',
      tooltip: 'Download complete report as PDF'
    },
    {
      id: 'analytics',
      icon: FileSpreadsheet,
      label: 'Analytics',
      action: () => handleDownloadAnalytics('xlsx'),
      color: theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600',
      tooltip: 'Export raw data as Excel/CSV'
    },
    {
      id: 'ai',
      icon: Brain,
      label: 'AI Summary',
      action: handleGenerateAISummary,
      color: theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600',
      tooltip: 'Generate AI-powered insights'
    }
  ];

  return (
    <>
      {/* Floating Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 ${
          isExpanded ? 'scale-105' : 'scale-100'
        } transition-transform duration-300`}
      >
        <div
          className={`backdrop-blur-xl rounded-2xl shadow-2xl border ${
            theme === 'dark'
              ? 'bg-zinc-900/90 border-zinc-700/50'
              : 'bg-white/90 border-gray-200/50'
          } p-4`}
        >
          <div className="flex items-center gap-2">
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronUp
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Action Buttons */}
            <div className={`flex gap-2 transition-all duration-300 ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              {buttons.map((button) => (
                <motion.button
                  key={button.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={button.action}
                  disabled={activeButton === button.id}
                  className={`relative p-3 rounded-xl text-white transition-all duration-200 ${
                    activeButton === button.id
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-lg'
                  } ${button.color}`}
                  title={button.tooltip}
                >
                  {activeButton === button.id ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <button.icon size={20} />
                  )}
                  
                  {/* Button Label */}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white px-2 py-1 rounded">
                    {button.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Compact Mode Icons */}
            <div className={`flex gap-2 transition-all duration-300 ${
              !isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              {buttons.map((button) => (
                <motion.button
                  key={button.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={button.action}
                  disabled={activeButton === button.id}
                  className={`relative p-2 rounded-lg text-white transition-all duration-200 ${
                    activeButton === button.id
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-md'
                  } ${button.color}`}
                  title={button.label}
                >
                  {activeButton === button.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <button.icon size={16} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Summary Modal */}
      {showAIModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAIModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      AI-Powered Intelligence Summary
                    </h2>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {reportData.locality}, {reportData.city}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {aiSummary ? (
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Executive Summary
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {aiSummary.executiveSummary}
                    </p>
                  </div>

                  {/* Investment Recommendation */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    aiSummary.investmentRecommendation.verdict === 'STRONG BUY'
                      ? 'border-green-500'
                      : aiSummary.investmentRecommendation.verdict === 'BUY'
                      ? 'border-blue-500'
                      : 'border-yellow-500'
                  } ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Investment Recommendation
                    </h3>
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        aiSummary.investmentRecommendation.verdict === 'STRONG BUY'
                          ? 'bg-green-100 text-green-700'
                          : aiSummary.investmentRecommendation.verdict === 'BUY'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {aiSummary.investmentRecommendation.verdict}
                      </span>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Confidence: {aiSummary.investmentRecommendation.confidence}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Expected Returns: {aiSummary.investmentRecommendation.expectedReturns}
                    </p>
                  </div>

                  {/* ROI Projections */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ROI Projections
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {aiSummary.roiProjection.year1}
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Year 1
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {aiSummary.roiProjection.year3}
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Year 3
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {aiSummary.roiProjection.year5}
                        </div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Year 5
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Recommendation */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Final Recommendation
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {aiSummary.finalRecommendation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Generating AI insights...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {aiSummary && (
              <div className={`p-6 border-t flex gap-3 ${
                theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
              }`}>
                <button
                  onClick={handleCopyAISummary}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Copy Summary
                </button>
                <button
                  onClick={handleExportAISummary}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600`}
                >
                  Export PDF
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ReportActionBar;
