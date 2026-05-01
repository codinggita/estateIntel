import { generatePDF, generateMultiPagePDF } from '../utils/pdfExport';
import * as XLSX from 'xlsx';

class ExportService {
  // Export complete report as multi-page PDF
  async exportFullPDF(elementId, fileName, options = {}) {
    try {
      const defaultOptions = {
        scale: 2,
        format: 'a4',
        orientation: 'portrait',
        quality: 0.95,
        backgroundColor: '#ffffff',
        pageBreak: 800
      };

      const exportOptions = { ...defaultOptions, ...options };
      
      // Show loading state
      this.showLoadingOverlay('Generating comprehensive PDF report...');
      
      const success = await generateMultiPagePDF(elementId, fileName, exportOptions);
      
      this.hideLoadingOverlay();
      
      if (success) {
        this.showSuccessToast('PDF report generated successfully!');
      }
      
      return success;
    } catch (error) {
      this.hideLoadingOverlay();
      this.showErrorToast('Failed to generate PDF. Please try again.');
      throw error;
    }
  }

  // Export analytics data as Excel/CSV
  exportAnalytics(reportData, format = 'xlsx') {
    try {
      this.showLoadingOverlay('Exporting analytics data...');

      // Create workbook with multiple sheets
      const wb = XLSX.utils.book_new();

      // Sheet 1: Summary
      const summaryData = [
        ['Metric', 'Value', 'Status'],
        ['Locality', reportData.locality, ''],
        ['City', reportData.city, ''],
        ['Tier', reportData.tier, ''],
        ['AQI Score', reportData.aqi.score, reportData.aqi.status],
        ['Safety Score', reportData.safety.overallScore, '/10'],
        ['Overall Ranking', `#${reportData.ranking || 'N/A'}`, ''],
        ['Last Updated', reportData.updated, '']
      ];

      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

      // Sheet 2: AQI Details
      const aqiData = [
        ['Pollutant', 'Value', 'Status'],
        ...reportData.aqi.pollutants.map(p => [p.name, p.value, p.status])
      ];

      const aqiWs = XLSX.utils.aoa_to_sheet(aqiData);
      XLSX.utils.book_append_sheet(wb, aqiWs, 'Air Quality');

      // Sheet 3: Market Comparison
      const marketData = [
        ['Metric', reportData.locality, 'Koramangala', 'HSR Layout'],
        ...reportData.marketComparison.map(row => [
          row.metric,
          row.indiranagar,
          row.koramangala,
          row.hsr
        ])
      ];

      const marketWs = XLSX.utils.aoa_to_sheet(marketData);
      XLSX.utils.book_append_sheet(wb, marketWs, 'Market Analysis');

      // Sheet 4: Infrastructure
      const infraData = [
        ['Infrastructure', 'Score (%)', 'Status'],
        ...reportData.infrastructure.map(item => [
          item.metric,
          item.score,
          item.score >= 80 ? 'Good' : item.score >= 60 ? 'Fair' : 'Poor'
        ])
      ];

      const infraWs = XLSX.utils.aoa_to_sheet(infraData);
      XLSX.utils.book_append_sheet(wb, infraWs, 'Infrastructure');

      // Sheet 5: Real Estate Trends
      const realEstateData = [
        ['Metric', 'Value', 'Trend'],
        ['Average Price/sqft', `₹${reportData.realEstate.avgPrice}`, ''],
        ['Price Appreciation', `${reportData.realEstate.appreciation}%`, ''],
        ['Rental Yield', `${reportData.realEstate.rentalYield}%`, ''],
        ['Demand Index', reportData.realEstate.demand, ''],
        ['Supply Index', reportData.realEstate.supply, '']
      ];

      const realEstateWs = XLSX.utils.aoa_to_sheet(realEstateData);
      XLSX.utils.book_append_sheet(wb, realEstateWs, 'Real Estate');

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-analytics-${timestamp}`;

      // Export file
      if (format === 'csv') {
        // Export each sheet as separate CSV
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        this.showSuccessToast('Analytics exported successfully!');
      } else {
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        this.showSuccessToast('Analytics exported successfully!');
      }

      this.hideLoadingOverlay();
    } catch (error) {
      this.hideLoadingOverlay();
      this.showErrorToast('Failed to export analytics. Please try again.');
      throw error;
    }
  }

  // Share report utilities
  async shareReport(reportData) {
    try {
      this.showLoadingOverlay('Preparing share link...');

      // Generate unique report ID (in production, this would come from backend)
      const reportId = this.generateReportId();
      
      // Create shareable URL
      const shareUrl = `${window.location.origin}/reports/${reportId}`;
      
      // Try native share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${reportData.locality} Intelligence Report`,
            text: `Check out this comprehensive real estate intelligence report for ${reportData.locality}, ${reportData.city}`,
            url: shareUrl
          });
          
          this.hideLoadingOverlay();
          this.showSuccessToast('Report shared successfully!');
          return true;
        } catch (shareError) {
          if (shareError.name !== 'AbortError') {
            throw shareError;
          }
        }
      }

      // Fallback to clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      this.hideLoadingOverlay();
      this.showSuccessToast('Share link copied to clipboard!');
      
      return shareUrl;
    } catch (error) {
      this.hideLoadingOverlay();
      this.showErrorToast('Failed to share report. Please try again.');
      throw error;
    }
  }

  // Generate unique report ID
  generateReportId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  }

  // UI Helper methods
  showLoadingOverlay(message = 'Loading...') {
    const existing = document.getElementById('export-loading-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'export-loading-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
      <div class="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-xl max-w-sm mx-4">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-gray-700 dark:text-gray-200">${message}</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  hideLoadingOverlay() {
    const overlay = document.getElementById('export-loading-overlay');
    if (overlay) overlay.remove();
  }

  showSuccessToast(message) {
    this.showToast(message, 'success');
  }

  showErrorToast(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const existing = document.getElementById('export-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'export-toast';
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 hover:opacity-75">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }
}

export default new ExportService();
