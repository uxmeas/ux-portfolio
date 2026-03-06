import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';

interface VisualTemplateProps {
  caseStudy: CaseStudy;
}

const VisualTemplate: FC<VisualTemplateProps> = ({ caseStudy }) => {
  return (
    <article className="bg-white">
      <section className="py-24 text-center">
        <h1 className="text-6xl font-bold">{caseStudy.project}</h1>
        <p className="text-xl mt-4 text-gray-600">Visual template coming soon...</p>
      </section>
    </article>
  );
};

export default VisualTemplate;