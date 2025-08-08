import { FC } from 'react';
import { CaseStudy } from '@/types/case-study';

interface BehanceTemplateProps {
  caseStudy: CaseStudy;
}

const BehanceTemplate: FC<BehanceTemplateProps> = ({ caseStudy }) => {
  // Use client colors or fallback to default theme
  const colors = {
    primary: caseStudy.colors?.primary || '#06b6d4', // cyan-500
    secondary: caseStudy.colors?.secondary || '#1f2937', // gray-800
    accent: caseStudy.colors?.accent || '#0891b2', // cyan-600
    background: caseStudy.colors?.background || '#111827', // gray-900
    text: caseStudy.colors?.text || '#ffffff'
  };
  return (
    <article className="text-white" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* 1. Cover Section (Hero) */}
      <section className="relative min-h-screen flex items-center justify-center px-8" style={{
        background: `linear-gradient(to bottom right, ${colors.background}, ${colors.secondary}, ${colors.primary}33)`
      }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {caseStudy.project}: <span style={{ color: colors.primary }}>400% Increase</span> in Demo Requests Through Strategic UX Transformation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Built a conversion-first, mobile-optimized website for a cybersecurity startup competing with Palantir & Anduril.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <span className="px-6 py-3 bg-gray-800 rounded-full text-sm font-medium border border-gray-700">
              ⏱ 4 Weeks
            </span>
            <span className="px-6 py-3 bg-gray-800 rounded-full text-sm font-medium border border-gray-700">
              🎯 400% Demo Uplift
            </span>
            <span className="px-6 py-3 bg-gray-800 rounded-full text-sm font-medium border border-gray-700">
              📈 85% Mobile Engagement
            </span>
            <span className="px-6 py-3 rounded-full text-sm font-medium" style={{
              backgroundColor: `${colors.primary}22`,
              borderColor: colors.primary,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}>
              🔗 Live Site
            </span>
          </div>
          
          {/* Placeholder for hero mockup */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 aspect-video flex items-center justify-center">
            <p className="text-gray-400">[ Homepage Hero Mockup/Screenshot ]</p>
          </div>
        </div>
      </section>

      {/* 2. The Challenge Section */}
      <section className="py-24 px-8 bg-gray-850">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            📉 The Challenge — <span style={{ color: colors.primary }}>When Cutting-Edge Tech Meets Outdated Presentation</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg p-8 border-l-4 border-red-500" style={{ backgroundColor: colors.secondary }}>
              <h3 className="text-2xl font-bold mb-4 text-red-400">The Problem</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Legacy Wix site converting less than 1% of visitors
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Mobile experience driving 73% bounce rate
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  Brand positioning unclear to enterprise buyers
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  No visual differentiation in crowded market
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg p-8 border-l-4" style={{ backgroundColor: colors.secondary, borderLeftColor: colors.primary }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>The Opportunity</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3" style={{ color: colors.primary }}>•</span>
                  Transform digital presence to match tech sophistication
                </li>
                <li className="flex items-start">
                  <span className="mr-3" style={{ color: colors.primary }}>•</span>
                  Capture high-value enterprise contracts
                </li>
                <li className="flex items-start">
                  <span className="mr-3" style={{ color: colors.primary }}>•</span>
                  Position as credible alternative to giants
                </li>
                <li className="flex items-start">
                  <span className="mr-3" style={{ color: colors.primary }}>•</span>
                  Build scalable conversion machine
                </li>
              </ul>
            </div>
          </div>
          
          {/* Before/After Slider Placeholder */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <p className="text-center text-gray-400">[ Before vs. After Image Slider ]</p>
          </div>
        </div>
      </section>

      {/* 3. Strategic Approach Timeline */}
      <section className="py-24 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            🧠 Strategic Approach Timeline
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ backgroundColor: colors.primary }}>1</div>
              <h3 className="text-xl font-bold mb-4">Competitive Intelligence</h3>
              <div className="bg-gray-800 rounded-lg p-6 mb-4 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-sm">[ Palantir/Anduril Analysis ]</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 8-second trust signals</li>
                <li>• Visual sophistication matters</li>
                <li>• Mobile-first critical</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ backgroundColor: colors.primary }}>2</div>
              <h3 className="text-xl font-bold mb-4">Brand + Visual System</h3>
              <div className="bg-gray-800 rounded-lg p-6 mb-4 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-sm">[ Moodboard + Style Tile ]</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Military-grade aesthetic</li>
                <li>• Archivo font family</li>
                <li>• Monochrome + cyan</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ backgroundColor: colors.primary }}>3</div>
              <h3 className="text-xl font-bold mb-4">Conversion Architecture</h3>
              <div className="bg-gray-800 rounded-lg p-6 mb-4 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-sm">[ Wireframe Breakdown ]</p>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Hero → Problem clarity</li>
                <li>• Social proof placement</li>
                <li>• Multiple CTAs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UX/UI Highlights */}
      <section className="py-24 bg-gray-850">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center px-8">
            💻 UX/UI Highlights
          </h2>
          
          {/* Alternating image/text blocks */}
          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-12 items-center px-8">
              <div className="bg-gray-800 rounded-lg p-8 aspect-video flex items-center justify-center">
                <p className="text-gray-400">[ Homepage Hero + CTA Focus ]</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Homepage Hero</h3>
                <p className="text-gray-300 mb-4">6-second clarity rule applied with immediate value proposition.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>6-sec clarity rule</span>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>Trust signals here</span>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>Multiple conversion paths</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center px-8">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Mobile Experience</h3>
                <p className="text-gray-300 mb-4">Responsive design with touch-optimized navigation and CTAs.</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>Touch targets</span>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>Thumb-friendly</span>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: `${colors.primary}33` }}>Fast load</span>
                </div>
              </div>
              <div className="order-1 md:order-2 bg-gray-800 rounded-lg p-8 aspect-[9/16] max-w-sm mx-auto flex items-center justify-center">
                <p className="text-gray-400">[ Mobile Mockup ]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Technical Execution */}
      <section className="py-24 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            ⚙️ Technical Execution
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Tailwind CSS', 'Bootstrap 5', 'Figma', 'Core Web Vitals'].map((tool) => (
                  <div key={tool} className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                    {tool}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <span className="px-4 py-2 bg-green-900 rounded text-sm">WCAG 2.1 AA</span>
                <span className="px-4 py-2 bg-green-900 rounded text-sm">SEO Optimized</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Features</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">✓</span>
                  90% improvement in page load speeds
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">✓</span>
                  Fully responsive across 15+ device types
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">✓</span>
                  Future-ready for CRM integrations
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">✓</span>
                  Scalable component architecture
                </li>
              </ul>
            </div>
          </div>
          
          {/* Performance GIF Placeholder */}
          <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700">
            <p className="text-center text-gray-400">[ Lighthouse Performance Report GIF ]</p>
          </div>
        </div>
      </section>

      {/* 6. Results & Business Impact */}
      <section className="py-24 px-8 bg-gray-850">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            📊 Results & Business Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {caseStudy.metrics?.map((metric, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
                <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-bold mb-8 text-center">What This Unlocked</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold mb-2">Secured Series A</h4>
              <p className="text-gray-400 text-sm">Website cited as key asset in funding</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold mb-2">Closed 2 Enterprise Deals</h4>
              <p className="text-gray-400 text-sm">Directly attributed to website credibility</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold mb-2">Industry Recognition</h4>
              <p className="text-gray-400 text-sm">Speaking opportunities at conferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonial Quote */}
      <section className="py-24 px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <blockquote className="text-3xl font-medium text-gray-200 italic mb-8">
            "This transformation gave us the digital presence our technology deserves. We're now competing directly with established players and winning. The website has become our most effective sales tool."
          </blockquote>
          <cite className="text-xl font-semibold not-italic">
            — CEO, AKM Secure
          </cite>
        </div>
      </section>

      {/* 8. The Strategic Difference */}
      <section className="py-24 px-8 bg-gray-850">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">
            🧠 The Strategic Difference
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-400">Old Way</h3>
              <ul className="space-y-4 text-gray-400">
                <li>❌ Generic redesign</li>
                <li>❌ Focus on aesthetics only</li>
                <li>❌ No business metrics</li>
                <li>❌ Template approach</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">New Way</h3>
              <ul className="space-y-4 text-gray-300">
                <li>✅ Business-aligned design</li>
                <li>✅ Enterprise buyer psychology</li>
                <li>✅ Brand positioning + tech architecture</li>
                <li>✅ Scalable delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="py-32 px-8" style={{
        background: `linear-gradient(to bottom right, ${colors.primary}44, ${colors.background})`
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to compete like Palantir, without a Palantir-sized budget?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's transform your digital presence into your most valuable sales asset.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#" className="px-8 py-4 font-bold rounded-lg transition-all hover:opacity-90" style={{
              backgroundColor: colors.primary,
              color: colors.background
            }}>
              Let's Talk →
            </a>
            <a href="#" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 font-bold rounded-lg transition-colors">
              View More Projects
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BehanceTemplate;