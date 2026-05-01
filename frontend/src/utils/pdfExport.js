import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, fileName, options = {}) => {
  const {
    scale = 2,
    format = 'a4',
    orientation = 'portrait',
    quality = 0.95,
    backgroundColor = '#ffffff'
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingElement.innerHTML = `
      <div class="bg-white rounded-lg p-6 shadow-xl">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-gray-700">Generating PDF...</span>
        </div>
      </div>
    `;
    document.body.appendChild(loadingElement);

    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor,
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // Remove loading state
    document.body.removeChild(loadingElement);

    // Calculate PDF dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: format
    });

    // Get PDF page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate scale to fit content to page
    const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png', quality);
    pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

    // Save PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateMultiPagePDF = async (elementId, fileName, options = {}) => {
  const {
    scale = 2,
    format = 'a4',
    orientation = 'portrait',
    quality = 0.95,
    backgroundColor = '#ffffff',
    pageBreak = 800 // Approximate page height in pixels
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingElement.innerHTML = `
      <div class="bg-white rounded-lg p-6 shadow-xl">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-gray-700">Generating multi-page PDF...</span>
        </div>
      </div>
    `;
    document.body.appendChild(loadingElement);

    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: format
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate total height and number of pages needed
    const totalHeight = element.scrollHeight;
    const numPages = Math.ceil(totalHeight / pageBreak);

    for (let i = 0; i < numPages; i++) {
      const startY = i * pageBreak;
      const endY = Math.min((i + 1) * pageBreak, totalHeight);

      // Create temporary container for current page
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = element.offsetWidth + 'px';
      tempContainer.style.height = pageBreak + 'px';
      tempContainer.style.overflow = 'hidden';
      
      // Clone the element and adjust for current page
      const clonedElement = element.cloneNode(true);
      clonedElement.style.transform = `translateY(-${startY}px)`;
      clonedElement.style.position = 'relative';
      tempContainer.appendChild(clonedElement);
      
      document.body.appendChild(tempContainer);

      // Create canvas for current page
      const canvas = await html2canvas(clonedElement, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor,
        logging: false,
        width: element.offsetWidth,
        height: pageBreak,
        windowWidth: element.offsetWidth,
        windowHeight: pageBreak
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Add new page (except for first page)
      if (i > 0) {
        pdf.addPage();
      }

      // Add image to current page
      const imgData = canvas.toDataURL('image/png', quality);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate scale to fit content to page
      const contentScale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const scaledWidth = imgWidth * contentScale;
      const scaledHeight = imgHeight * contentScale;

      pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
    }

    // Remove loading state
    document.body.removeChild(loadingElement);

    // Save PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating multi-page PDF:', error);
    throw error;
  }
};

export const generateSummaryPDF = async (reportData, fileName) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add custom font for better typography
    pdf.setFont('helvetica');

    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Header
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${reportData.locality} Intelligence Report`, margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${reportData.city} • ${reportData.tier} • Updated ${new Date(reportData.lastUpdated).toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Executive Summary
    checkPageBreak(20);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const summaryLines = pdf.splitTextToSize(reportData.aiSummary, pageWidth - 2 * margin);
    summaryLines.forEach(line => {
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 10;

    // Key Metrics
    checkPageBreak(30);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Metrics', margin, yPosition);
    yPosition += 10;

    const metrics = [
      { label: 'Overall Score', value: '92/100' },
      { label: 'Ranking', value: `#${reportData.ranking}` },
      { label: 'Growth Rate', value: `+${reportData.investment.priceAppreciation}%` },
      { label: 'Rental Yield', value: `${reportData.investment.rentalYield}%` },
      { label: 'Safety Score', value: `${reportData.safety.overallScore}/10` },
      { label: 'AQI Status', value: reportData.aqi.status }
    ];

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    metrics.forEach((metric, index) => {
      checkPageBreak(lineHeight * 2);
      pdf.text(`${metric.label}:`, margin, yPosition);
      pdf.text(metric.value, margin + 60, yPosition);
      yPosition += lineHeight * 1.5;
    });
    yPosition += 10;

    // Critical Alerts
    checkPageBreak(20);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Critical Alerts', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    reportData.alerts.slice(0, 3).forEach((alert, index) => {
      checkPageBreak(lineHeight * 3);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${alert.title}`, margin, yPosition);
      yPosition += lineHeight;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`   ${alert.category} • ${alert.level} • ${alert.timeline}`, margin, yPosition);
      yPosition += lineHeight;
      
      const descriptionLines = pdf.splitTextToSize(alert.description, pageWidth - 2 * margin - 10);
      descriptionLines.forEach(line => {
        checkPageBreak(lineHeight);
        pdf.text(`   ${line}`, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 5;
    });

    // Investment Outlook
    checkPageBreak(20);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Investment Outlook', margin, yPosition);
    yPosition += 10;

    const outlook = `${reportData.locality} presents a compelling investment opportunity with strong fundamentals supporting both capital appreciation and rental yields. The area's strategic location, coupled with ongoing infrastructure development, positions it for sustained growth over the next 3-5 years.`;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const outlookLines = pdf.splitTextToSize(outlook, pageWidth - 2 * margin);
    outlookLines.forEach(line => {
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
      pdf.text('Generated by EstateIntel AI', margin, pageHeight - 10);
    }

    // Save PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating summary PDF:', error);
    throw error;
  }
};

export const printReport = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  // Copy the element content
  const clonedElement = element.cloneNode(true);
  
  // Create a complete HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Real Estate Intelligence Report</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
          color: #1f2937;
        }
        .no-print { display: none !important; }
        @media print {
          body { margin: 0.5in; }
          .page-break { page-break-before: always; }
        }
        h1, h2, h3 { 
          color: #1f2937;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .chart-container { 
          page-break-inside: avoid;
          margin: 20px 0;
        }
        table { 
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td { 
          border: 1px solid #e5e7eb;
          padding: 8px;
          text-align: left;
        }
        th { 
          background-color: #f9fafb;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      ${clonedElement.innerHTML}
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};
