'use client';

import { FC, useState } from 'react';
import { CaseStudy, CaseStudySection } from '@/types/case-study';

interface CaseStudyFormProps {
  caseStudy: CaseStudy;
  onChange: (caseStudy: CaseStudy) => void;
}

const CaseStudyForm: FC<CaseStudyFormProps> = ({ caseStudy, onChange }) => {
  const [activeSection, setActiveSection] = useState('basic');

  const updateField = (field: keyof CaseStudy, value: any) => {
    onChange({ ...caseStudy, [field]: value });
  };

  const updateSection = (index: number, updates: Partial<CaseStudySection>) => {
    const newSections = [...caseStudy.sections];
    newSections[index] = { ...newSections[index], ...updates };
    updateField('sections', newSections);
  };

  const addSection = () => {
    const newSection: CaseStudySection = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'New Section',
      content: '',
      layout: 'text-only'
    };
    updateField('sections', [...caseStudy.sections, newSection]);
  };

  const removeSection = (index: number) => {
    updateField('sections', caseStudy.sections.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Form Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {['basic', 'results', 'sections', 'images'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeSection === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Basic Info */}
        {activeSection === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={caseStudy.project}
                onChange={(e) => updateField('project', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <input
                type="text"
                value={caseStudy.client || ''}
                onChange={(e) => updateField('client', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={caseStudy.tagline || ''}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Short description of the project"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Role
                </label>
                <input
                  type="text"
                  value={caseStudy.role}
                  onChange={(e) => updateField('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeline
                </label>
                <input
                  type="text"
                  value={caseStudy.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tools Used
              </label>
              <input
                type="text"
                value={caseStudy.tools?.join(', ') || ''}
                onChange={(e) => updateField('tools', e.target.value.split(',').map(s => s.trim()))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Figma, React, Tailwind CSS"
              />
            </div>
          </div>
        )}

        {/* Results */}
        {activeSection === 'results' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Results (one per line)
              </label>
              <textarea
                value={caseStudy.results.join('\n')}
                onChange={(e) => updateField('results', e.target.value.split('\n').filter(s => s.trim()))}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="400% increase in demo requests&#10;85% improvement in mobile experience"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metrics
              </label>
              <div className="space-y-3">
                {caseStudy.metrics?.map((metric, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const newMetrics = [...(caseStudy.metrics || [])];
                        newMetrics[index] = { ...metric, label: e.target.value };
                        updateField('metrics', newMetrics);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Metric name"
                    />
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => {
                        const newMetrics = [...(caseStudy.metrics || [])];
                        newMetrics[index] = { ...metric, value: e.target.value };
                        updateField('metrics', newMetrics);
                      }}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="+400%"
                    />
                    <button
                      onClick={() => {
                        updateField('metrics', caseStudy.metrics?.filter((_, i) => i !== index));
                      }}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updateField('metrics', [...(caseStudy.metrics || []), { label: '', value: '', trend: 'up' }]);
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400"
                >
                  + Add Metric
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sections */}
        {activeSection === 'sections' && (
          <div className="space-y-4">
            {caseStudy.sections.map((section, index) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <select
                    value={section.type}
                    onChange={(e) => updateSection(index, { type: e.target.value as CaseStudySection['type'] })}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="challenge">Challenge</option>
                    <option value="solution">Solution</option>
                    <option value="process">Process</option>
                    <option value="results">Results</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="custom">Custom</option>
                  </select>
                  <button
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(index, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                  placeholder="Section Title"
                />

                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, { content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                  placeholder="Section content..."
                />

                <select
                  value={section.layout}
                  onChange={(e) => updateSection(index, { layout: e.target.value as CaseStudySection['layout'] })}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="text-only">Text Only</option>
                  <option value="text-left">Text Left</option>
                  <option value="text-right">Text Right</option>
                  <option value="full-width">Full Width</option>
                  <option value="split">Split Layout</option>
                </select>
              </div>
            ))}

            <button
              onClick={addSection}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400"
            >
              + Add Section
            </button>
          </div>
        )}

        {/* Images */}
        {activeSection === 'images' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Image URL
              </label>
              <input
                type="text"
                value={caseStudy.images.hero || ''}
                onChange={(e) => updateField('images', { ...caseStudy.images, hero: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Images (one URL per line)
              </label>
              <textarea
                value={caseStudy.images.gallery?.join('\n') || ''}
                onChange={(e) => updateField('images', { 
                  ...caseStudy.images, 
                  gallery: e.target.value.split('\n').filter(s => s.trim()) 
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="https://..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyForm;