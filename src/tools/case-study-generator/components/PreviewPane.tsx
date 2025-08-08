'use client';

import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import DetailedTemplate from '@/components/templates/DetailedTemplate';
import VisualTemplate from '@/components/templates/VisualTemplate';
import StorytellingTemplate from '@/components/templates/StorytellingTemplate';

interface PreviewPaneProps {
  caseStudy: CaseStudy;
  template: 'minimal' | 'detailed' | 'visual' | 'storytelling';
}

const PreviewPane: FC<PreviewPaneProps> = ({ caseStudy, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalTemplate caseStudy={caseStudy} />;
      case 'detailed':
        return <DetailedTemplate caseStudy={caseStudy} />;
      case 'visual':
        return <VisualTemplate caseStudy={caseStudy} />;
      case 'storytelling':
        return <StorytellingTemplate caseStudy={caseStudy} />;
      default:
        return <MinimalTemplate caseStudy={caseStudy} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div id="case-study-preview" className="w-full">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default PreviewPane;