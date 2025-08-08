'use client';

import { useState } from 'react';
import { CaseStudy } from '@/types/case-study';
import CaseStudyForm from '@/components/CaseStudyForm';
import TemplateSelector from '@/components/TemplateSelector';
import PreviewPane from '@/components/PreviewPane';
import ExportOptions from '@/components/ExportOptions';

// Sample data for testing - Real AKM Secure case study
const sampleCaseStudy: CaseStudy = {
  id: '1',
  project: 'AKM Secure',
  client: 'AKM Secure (Cybersecurity Startup)',
  tagline: '400% Increase in Demo Requests Through Strategic UX Transformation',
  role: 'Lead UX/UI Designer & Strategic Consultant',
  timeline: '4 Weeks',
  team: ['CEO', 'CTO', 'Marketing Team'],
  tools: ['Tailwind CSS', 'Bootstrap 5', 'Figma', 'Core Web Vitals', 'SEO Optimization'],
  deliverables: ['Brand Strategy', 'Visual System', 'Responsive Website', 'Performance Optimization', 'Conversion Architecture'],
  results: [
    '400% increase in demo request submissions',
    '85% improvement in mobile engagement time',
    '67% reduction in bounce rate',
    '3.2x increase in qualified lead generation',
    '2 enterprise contracts closed directly from website',
    'Successful Series A funding (website cited as key asset)'
  ],
  metrics: [
    { label: 'Demo Requests', value: '+400%', trend: 'up' },
    { label: 'Mobile Engagement', value: '+85%', trend: 'up' },
    { label: 'Bounce Rate', value: '-67%', trend: 'down' },
    { label: 'Lead Generation', value: '3.2x', trend: 'up' }
  ],
  // AKM Secure brand colors (dark military/cyber theme)
  colors: {
    primary: '#00D9FF',      // Cyan/Electric Blue
    secondary: '#0A0E27',    // Dark Navy
    accent: '#00A6CC',       // Darker Cyan
    background: '#000000',   // Black
    text: '#FFFFFF'          // White
  },
  images: {
    hero: '/images/akm-hero.jpg',
    thumbnail: '/images/akm-thumb.jpg',
    gallery: ['/images/akm-1.jpg', '/images/akm-2.jpg', '/images/akm-3.jpg']
  },
  sections: [
    {
      id: '1',
      type: 'challenge',
      title: 'The Challenge: When Cutting-Edge Tech Meets Outdated Presentation',
      content: 'AKM Secure had developed revolutionary cybersecurity technology for Operational Technology (OT) systems—protection that cloud solutions simply cannot provide. Their technology was breakthrough, but their digital presence was holding them back from competing with established players like Palantir and Anduril.',
      bullets: [
        'Legacy Wix site converting less than 1% of visitors to demos',
        'Mobile experience driving 73% bounce rate',
        'Brand positioning unclear to enterprise decision-makers',
        'No visual differentiation in a crowded cybersecurity market'
      ],
      layout: 'text-only'
    },
    {
      id: '2',
      type: 'solution',
      title: 'Strategic Approach: Data-Driven Design Meets Industry Expertise',
      content: 'I conducted an in-depth analysis of 15 cybersecurity leaders (Palantir, Anduril, CrowdStrike) to identify conversion patterns and visual strategies that resonate with enterprise buyers.',
      bullets: [
        'Enterprise buyers scan for trust signals within 8 seconds',
        'Technical credibility conveyed through visual sophistication, not complexity',
        'Mobile-first approach critical (67% of initial research happens on mobile)',
        'Military-grade aesthetic with institutional credibility',
        'Archivo font family for authoritative communication',
        'Monochromatic palette with strategic cyan accents'
      ],
      layout: 'text-left'
    },
    {
      id: '3',
      type: 'process',
      title: 'Technical Execution: Built for Performance and Scale',
      content: 'Every component designed and tested on mobile devices first, ensuring optimal performance across all screen sizes. The technical stack was chosen for maintainability and scale.',
      bullets: [
        '90% improvement in page load speeds',
        'Fully responsive across 15+ device types',
        'Accessibility compliant (WCAG 2.1 AA)',
        'SEO-optimized for cybersecurity industry keywords',
        'Future-ready architecture for CRM integrations'
      ],
      layout: 'text-right'
    },
    {
      id: '4',
      type: 'results',
      title: 'Measurable Results: When Design Drives Revenue',
      content: 'The transformation delivered immediate and significant business impact within 90 days of launch. The website became their most effective sales tool, directly contributing to enterprise contracts and successful funding.',
      layout: 'full-width'
    },
    {
      id: '5',
      type: 'testimonial',
      title: 'Client Testimonial',
      content: '',
      quote: {
        text: 'This transformation gave us the digital presence our technology deserves. We\'re now competing directly with established players and winning. The website has become our most effective sales tool.',
        author: 'CEO, AKM Secure',
        role: 'Chief Executive Officer'
      },
      layout: 'text-only'
    }
  ],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    template: 'minimal'
  }
};

export default function Home() {
  const [caseStudy, setCaseStudy] = useState<CaseStudy>(sampleCaseStudy);
  const [selectedTemplate, setSelectedTemplate] = useState<'minimal' | 'detailed' | 'visual' | 'storytelling'>('minimal');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Case Study Generator</h1>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Preview
                </button>
              </div>
              <ExportOptions caseStudy={caseStudy} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'edit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CaseStudyForm 
                caseStudy={caseStudy} 
                onChange={setCaseStudy} 
              />
            </div>
            <div>
              <TemplateSelector
                selected={selectedTemplate}
                onChange={setSelectedTemplate}
              />
            </div>
          </div>
        ) : (
          <PreviewPane
            caseStudy={caseStudy}
            template={selectedTemplate}
          />
        )}
      </main>
    </div>
  );
}