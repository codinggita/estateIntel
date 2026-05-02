import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '') + '/api';

class ReportService {
  // Save report to backend for sharing
  async saveReport(reportData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/reports/save`, {
        locality: reportData.locality,
        city: reportData.city,
        tier: reportData.tier,
        updated: reportData.updated,
        metrics: {
          aqi: reportData.aqi,
          safety: reportData.safety,
          marketComparison: reportData.marketComparison,
          infrastructure: reportData.infrastructure,
          waterUtility: reportData.waterUtility,
          connectivity: reportData.connectivity,
          healthcare: reportData.healthcare,
          futureDevelopment: reportData.futureDevelopment,
          realEstate: reportData.realEstate,
          environment: reportData.environment,
          demographics: reportData.demographics,
          lifestyle: reportData.livability
        },
        alerts: reportData.alerts,
        aiSummary: reportData.aiSummary,
        generatedAt: new Date().toISOString()
      });

      return response.data;
    } catch (error) {
      console.error('Error saving report:', error);
      throw new Error('Failed to save report for sharing');
    }
  }

  // Get shared report by ID
  async getSharedReport(reportId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${reportId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shared report:', error);
      throw new Error('Report not found or expired');
    }
  }

  // Generate AI summary using OpenAI
  async generateAISummary(reportData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/generate-summary`, {
        locality: reportData.locality,
        city: reportData.city,
        metrics: {
          aqi: reportData.aqi,
          safety: reportData.safety,
          marketComparison: reportData.marketComparison,
          infrastructure: reportData.infrastructure,
          realEstate: reportData.realEstate,
          connectivity: reportData.connectivity
        },
        alerts: reportData.alerts
      });

      return response.data;
    } catch (error) {
      console.error('Error generating AI summary:', error);
      throw new Error('Failed to generate AI insights');
    }
  }

  // Fetch live data from external APIs
  async fetchLiveData(locality, city) {
    try {
      const response = await axios.post(`${API_BASE_URL}/data/live`, {
        locality,
        city
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching live data:', error);
      throw new Error('Failed to fetch live data');
    }
  }
}

export default new ReportService();
