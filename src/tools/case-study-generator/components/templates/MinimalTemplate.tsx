import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';

interface MinimalTemplateProps {
  caseStudy: CaseStudy;
}

const MinimalTemplate: FC<MinimalTemplateProps> = ({ caseStudy }) => {
  // Use client colors or fallback to default theme
  const colors = {
    primary: caseStudy.colors?.primary || '#3B82F6', // blue-500
    secondary: caseStudy.colors?.secondary || '#1E40AF', // blue-800
    accent: caseStudy.colors?.accent || '#2563EB', // blue-600
    background: caseStudy.colors?.background || '#FFFFFF',
    text: caseStudy.colors?.text || '#1F2937' // gray-800
  };
  return (
    <article className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center" style={{
        background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.accent})`
      }}>
        <div className="text-center text-white px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{caseStudy.project}</h1>
          {caseStudy.tagline && (
            <p className="text-xl md:text-2xl opacity-90 mb-8">{caseStudy.tagline}</p>
          )}
          <div className="flex items-center justify-center gap-8 text-lg">
            <div>
              <span className="opacity-75">Role:</span> <span className="font-medium">{caseStudy.role}</span>
            </div>
            <div className="w-px h-6 bg-white opacity-50"></div>
            <div>
              <span className="opacity-75">Timeline:</span> <span className="font-medium">{caseStudy.timeline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: colors.primary }}>{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {caseStudy.sections.map((section, index) => (
        <section key={section.id} className={`py-24 px-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto">
            {section.type === 'testimonial' && section.quote ? (
              <div className="text-center">
                <div className="mb-8">
                  <svg className="w-12 h-12 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <blockquote className="text-2xl font-medium text-gray-700 italic mb-6">
                  "{section.quote.text}"
                </blockquote>
                <cite className="text-lg font-semibold text-gray-900 not-italic">
                  — {section.quote.author}
                  {section.quote.role && (
                    <span className="block text-sm font-normal text-gray-600 mt-1">{section.quote.role}</span>
                  )}
                </cite>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                {section.content && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.primary }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </section>
      ))}

      {/* Tools & Deliverables Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {caseStudy.tools && caseStudy.tools.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">Tools & Technologies</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {caseStudy.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {caseStudy.deliverables && caseStudy.deliverables.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">Deliverables</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {caseStudy.deliverables.map((deliverable, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${colors.primary}1A`,
                        color: colors.primary
                      }}
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-900 text-white text-center">
        <p className="text-lg mb-2">Thank you for viewing this case study</p>
        <p className="text-gray-400">© {new Date().getFullYear()} {caseStudy.role}</p>
      </footer>
    </article>
  );
};

export default MinimalTemplate;