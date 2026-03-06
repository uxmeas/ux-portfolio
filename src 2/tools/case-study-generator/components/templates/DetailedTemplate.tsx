import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';

interface DetailedTemplateProps {
  caseStudy: CaseStudy;
}

const DetailedTemplate: FC<DetailedTemplateProps> = ({ caseStudy }) => {
  return (
    <article className="bg-white">
      <section className="py-24 text-center">
        <h1 className="text-6xl font-bold">{caseStudy.project}</h1>
        <p className="text-xl mt-4 text-gray-600">Detailed template coming soon...</p>
      </section>
    </article>
  );
};

export default DetailedTemplate;