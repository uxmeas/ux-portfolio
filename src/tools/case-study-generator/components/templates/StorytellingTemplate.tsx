import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';

interface StorytellingTemplateProps {
  caseStudy: CaseStudy;
}

const StorytellingTemplate: FC<StorytellingTemplateProps> = ({ caseStudy }) => {
  return (
    <article className="bg-white">
      <section className="py-24 text-center">
        <h1 className="text-6xl font-bold">{caseStudy.project}</h1>
        <p className="text-xl mt-4 text-gray-600">Storytelling template coming soon...</p>
      </section>
    </article>
  );
};

export default StorytellingTemplate;