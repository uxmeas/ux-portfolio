'use client';

import { FC, useState } from 'react';
import { CaseStudy } from '@/types/case-study';

interface ExportOptionsProps {
  caseStudy: CaseStudy;
  template: string;
}

const ExportOptions: FC<ExportOptionsProps> = ({ caseStudy, template }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      
      const element = document.getElementById('case-study-preview');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${caseStudy.project.toLowerCase().replace(/\s+/g, '-')}-case-study.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      const element = document.getElementById('case-study-preview');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${caseStudy.project.toLowerCase().replace(/\s+/g, '-')}-case-study.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsHTML = () => {
    const element = document.getElementById('case-study-preview');
    if (!element) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${caseStudy.project} - Case Study</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body>
    ${element.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${caseStudy.project.toLowerCase().replace(/\s+/g, '-')}-case-study.html`;
    link.href = url;
    link.click();
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/case-study/${caseStudy.id}`;
    navigator.clipboard.writeText(url);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportAsImage}
        disabled={isExporting}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isExporting ? 'Exporting...' : 'Export as Image'}
      </button>
      <button
        onClick={exportAsPDF}
        disabled={isExporting}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        PDF
      </button>
      <button
        onClick={exportAsHTML}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        HTML
      </button>
      <button
        onClick={copyShareLink}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Share Link
      </button>
    </div>
  );
};

export default ExportOptions;