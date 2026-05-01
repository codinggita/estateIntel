import reportService from './reportService';

class AIService {
  // Generate comprehensive AI summary
  async generateSummary(reportData) {
    try {
      this.showLoadingOverlay('Generating AI insights...');

      // In production, this would call OpenAI API
      // For now, we'll simulate the response with structured data
      const aiResponse = await this.simulateAIGeneration(reportData);
      
      this.hideLoadingOverlay();
      
      return aiResponse;
    } catch (error) {
      this.hideLoadingOverlay();
      throw error;
    }
  }

  // Simulate AI generation (replace with actual OpenAI API call)
  async simulateAIGeneration(reportData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const locality = reportData.locality;
    const city = reportData.city;
    const aqiScore = reportData.aqi.score;
    const safetyScore = reportData.safety.overallScore;
    const avgPrice = reportData.realEstate.avgPrice;
    const appreciation = reportData.realEstate.appreciation;
    const rentalYield = reportData.realEstate.rentalYield;

    return {
      executiveSummary: `${locality} in ${city} presents a compelling investment opportunity with a comprehensive real estate intelligence score of ${this.calculateOverallScore(reportData)}/100. The area demonstrates strong fundamentals with ${aqiScore} AQI rating, ${safetyScore}/10 safety score, and robust infrastructure supporting sustained growth.`,
      
      investmentRecommendation: {
        verdict: appreciation >= 8 ? "STRONG BUY" : appreciation >= 5 ? "BUY" : "HOLD",
        confidence: appreciation >= 8 ? "High" : appreciation >= 5 ? "Medium" : "Low",
        timeHorizon: "3-5 years",
        expectedReturns: `${appreciation}% annual appreciation + ${rentalYield}% rental yield`,
        riskLevel: this.assessRiskLevel(reportData)
      },

      marketAnalysis: {
        currentTrend: appreciation >= 8 ? "Bullish" : appreciation >= 5 ? "Positive" : "Stable",
        demandSupply: reportData.realEstate.demand > reportData.realEstate.supply ? "High Demand" : "Balanced",
        pricePosition: avgPrice >= 15000 ? "Premium" : avgPrice >= 8000 ? "Mid-Range" : "Affordable",
        marketSentiment: "Optimistic"
      },

      rentalAnalysis: {
        currentYield: `${rentalYield}%`,
        demand: "Strong",
        vacancyRate: "Low (<5%)",
        tenantProfile: "Young professionals & families",
        rentalGrowth: "+4-6% annually"
      },

      infrastructureOutlook: {
        currentScore: this.calculateInfraScore(reportData.infrastructure),
        upcomingProjects: [
          "Metro expansion - 18 months",
          "Commercial development - 12 months", 
          "Road widening - 24 months"
        ],
        impact: "Significant positive impact on property values"
      },

      riskFactors: [
        {
          factor: "Traffic congestion",
          severity: "Medium",
          mitigation: "Metro expansion to address by 2025"
        },
        {
          factor: "Construction noise",
          severity: "Low",
          mitigation: "Temporary, limited to development zones"
        },
        {
          factor: "Market volatility",
          severity: "Low",
          mitigation: "Strong fundamentals provide stability"
        }
      ],

      growthDrivers: [
        {
          driver: "Infrastructure development",
          impact: "High",
          timeline: "12-24 months"
        },
        {
          driver: "Commercial expansion",
          impact: "Medium",
          timeline: "6-18 months"
        },
        {
          driver: "Connectivity improvements",
          impact: "High",
          timeline: "18-36 months"
        }
      ],

      buyerPersona: {
        primary: "Young professionals (25-35 years)",
        secondary: "Investment-focused buyers",
        budgetRange: `₹${Math.round(avgPrice * 0.8 * 1000)} - ₹${Math.round(avgPrice * 1.2 * 1000)} per sqft`,
        preferences: ["Modern amenities", "Good connectivity", "Proximity to workplaces"]
      },

      roiProjection: {
        year1: `${appreciation + 2}%`,
        year3: `${(appreciation * 3) + 8}%`,
        year5: `${(appreciation * 5) + 15}%`,
        totalReturn: `${(appreciation * 5) + 15 + (rentalYield * 5)}%`
      },

      finalRecommendation: `${locality} offers an excellent investment opportunity with strong growth prospects driven by infrastructure development and increasing demand. The area's strategic location and upcoming connectivity enhancements position it for significant appreciation over the next 3-5 years. Recommended for both end-users and investors seeking medium to long-term gains.`
    };
  }

  // Calculate overall score
  calculateOverallScore(reportData) {
    const weights = {
      aqi: 15,
      safety: 20,
      infrastructure: 20,
      market: 25,
      connectivity: 20
    };

    const scores = {
      aqi: Math.max(0, 100 - reportData.aqi.score),
      safety: reportData.safety.overallScore * 10,
      infrastructure: this.calculateInfraScore(reportData.infrastructure),
      market: this.calculateMarketScore(reportData.marketComparison, reportData.realEstate),
      connectivity: reportData.connectivity.score || 75
    };

    const weightedSum = Object.keys(weights).reduce((sum, key) => {
      return sum + (scores[key] * weights[key] / 100);
    }, 0);

    return Math.round(weightedSum);
  }

  // Calculate infrastructure score
  calculateInfraScore(infrastructure) {
    const avgScore = infrastructure.reduce((sum, item) => sum + item.score, 0) / infrastructure.length;
    return Math.round(avgScore);
  }

  // Calculate market score
  calculateMarketScore(marketComparison, realEstate) {
    const appreciationScore = Math.min(100, realEstate.appreciation * 10);
    const rentalScore = Math.min(100, realEstate.rentalYield * 10);
    const demandScore = realEstate.demand > realEstate.supply ? 80 : 60;
    
    return Math.round((appreciationScore + rentalScore + demandScore) / 3);
  }

  // Assess risk level
  assessRiskLevel(reportData) {
    const overallScore = this.calculateOverallScore(reportData);
    if (overallScore >= 80) return "Low";
    if (overallScore >= 60) return "Medium";
    return "High";
  }

  // Export AI summary to PDF
  async exportAISummary(aiSummary, reportData) {
    try {
      const { generateSummaryPDF } = await import('../utils/pdfExport');
      
      const summaryData = {
        ...reportData,
        aiSummary: aiSummary.finalRecommendation,
        investmentInsights: aiSummary.investmentRecommendation,
        marketAnalysis: aiSummary.marketAnalysis,
        riskFactors: aiSummary.riskFactors,
        roiProjection: aiSummary.roiProjection
      };

      const fileName = `${reportData.locality.toLowerCase().replace(/\s+/g, '-')}-ai-summary-${Date.now()}`;
      
      await generateSummaryPDF(summaryData, fileName);
      
      this.showSuccessToast('AI summary exported successfully!');
    } catch (error) {
      this.showErrorToast('Failed to export AI summary');
      throw error;
    }
  }

  // UI Helper methods
  showLoadingOverlay(message = 'Loading...') {
    const existing = document.getElementById('ai-loading-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ai-loading-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
      <div class="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-xl max-w-md mx-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-gray-700 dark:text-gray-200 font-medium">${message}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>AI Analysis in Progress</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  hideLoadingOverlay() {
    const overlay = document.getElementById('ai-loading-overlay');
    if (overlay) overlay.remove();
  }

  showSuccessToast(message) {
    this.showToast(message, 'success');
  }

  showErrorToast(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const existing = document.getElementById('ai-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ai-toast';
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-purple-500';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
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

export default new AIService();
