import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const FAQ_ITEMS = [
  { q: 'What is AEO and how is it different from SEO?', a: 'Answer Engine Optimization targets AI assistants and voice search - Perplexity, ChatGPT, Siri, Alexa - that deliver direct answers rather than a list of links. Where traditional SEO ranks your page, AEO gets your content selected as the answer. The two are complementary but require different content architectures.' },
  { q: 'What is GEO - Generative Engine Optimization?', a: 'GEO focuses on appearing inside AI-generated search results (Google SGE, Bing Copilot, etc.). These systems synthesize answers from multiple sources and cite the ones with the most authoritative, structured, and semantically rich content. We optimize your pages to be cited and referenced in these AI summaries.' },
  { q: 'How long until we see SEO results?', a: 'Technical fixes and Core Web Vitals improvements can show ranking lifts in 4–8 weeks. Content strategy and authority-building typically show material gains in 3–6 months. AEO/GEO placements can appear faster as AI systems re-index more frequently than traditional crawlers.' },
  { q: 'Do you build on WordPress, Webflow, or custom frameworks?', a: 'All of the above. We build custom React/Next.js applications, WordPress sites with custom themes, Webflow projects, and hybrid headless architectures. We recommend the right stack for your scale and team, not the one we find most convenient.' },
  { q: 'Can you take over an existing site or does it need to be rebuilt?', a: 'Most often we can improve an existing site without a full rebuild. We audit what you have, identify what\'s holding you back, and make targeted interventions. A full rebuild is only recommended when the existing architecture fundamentally can\'t support your goals.' },
]

interface WebDevProps { onNavigate: (page: string) => void }

export default function WebDev({ onNavigate }: WebDevProps) {
  const { ref: servRef, visible: servVis } = useReveal()
  const { ref: processRef, visible: processVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const disciplines = [
    {
      title: 'Custom Web Development',
      tag: 'Build',
      color: '#1565C0',
      points: [
        'React, Next.js, and TypeScript applications',
        'WordPress with bespoke themes and plugins',
        'Webflow projects and CMS integrations',
        'Headless CMS architectures (Sanity, Contentful)',
        'E-commerce (WooCommerce, Shopify)',
        'API design and third-party integrations',
      ],
    },
    {
      title: 'SEO - Search Engine Optimization',
      tag: 'Rank',
      color: '#00B4D8',
      points: [
        'Technical SEO audit and remediation',
        'Core Web Vitals & page speed optimization',
        'Keyword research and content strategy',
        'Schema markup and structured data',
        'Link building and authority development',
        'Monthly reporting against agreed KPIs',
      ],
    },
    {
      title: 'AEO - Answer Engine Optimization',
      tag: 'Answer',
      color: '#2FD3E8',
      points: [
        'Content structured for direct-answer selection',
        'FAQ and Q&A content architecture',
        'Voice search optimization',
        'Featured snippet targeting',
        'Local voice search (for location-based businesses)',
        'Perplexity and ChatGPT Browse visibility',
      ],
    },
    {
      title: 'GEO - Generative Engine Optimization',
      tag: 'Generate',
      color: '#1565C0',
      points: [
        'Google SGE & Bing Copilot citation strategy',
        'Semantic content clusters and topic authority',
        'E-E-A-T signals and trust-building content',
        'AI-friendly content formatting and structure',
        'Brand mention monitoring in AI outputs',
        'Iterative optimization as AI models update',
      ],
    },
  ]

  const tools = ['React', 'Next.js', 'TypeScript', 'WordPress', 'Webflow', 'Sanity', 'Semrush', 'Ahrefs', 'Google Search Console', 'PageSpeed Insights', 'Schema.org', 'Cloudflare']

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="Web development"
        title="Websites built to"
        accent="work harder."
        description="Fast, accessible websites and web apps, with search visibility built in from the start."
        image="/images/discipline-web-development.png"
        imageAlt="SNAiO Tech illustration for web development"
        highlights={["Websites & apps", "SEO, AEO & GEO", "Accessibility-first"]}
        primaryLabel="Plan your website"
        secondaryLabel="Explore capabilities"
        secondaryTarget="disciplines"
        onNavigate={onNavigate}
      />

      {/* Disciplines */}
      <section id="disciplines" className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={servRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${servVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">What's included</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Four disciplines. <span className="gradient-text">One integrated service.</span>
              </h2>
            </div>
            <div className={`grid md:grid-cols-2 gap-6 stagger ${servVis ? 'visible' : ''}`}>
              {disciplines.map((d) => (
                <div key={d.title} className="glass rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="eyebrow px-3 py-1 rounded-full text-xs"
                      style={{ background: `${d.color}22`, border: `1px solid ${d.color}44`, color: d.color }}
                    >
                      {d.tag}
                    </span>
                    <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{d.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {d.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-white/65">
                        <span style={{ color: d.color }}><IconCheck /></span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <p className="eyebrow text-center mb-8">Tools & Technologies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((t) => (
              <span key={t} className="neumorph rounded-full px-4 py-2 text-sm text-white/65 font-medium" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={processRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${processVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Engagement model</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                How a project <span className="gradient-text">comes to life</span>
              </h2>
            </div>
            <div className={`space-y-4 stagger ${processVis ? 'visible' : ''}`}>
              {[
                { n: '01', t: 'Discovery & Audit', d: 'We examine your existing site, competitors, keyword landscape, and technical health to baseline where you are and define where you need to be.' },
                { n: '02', t: 'Strategy & Architecture', d: 'A detailed project plan: sitemap, content strategy, SEO/AEO/GEO framework, and technical spec - all agreed before a line of code is written.' },
                { n: '03', t: 'Design & Development', d: 'Pixel-perfect designs reviewed with you, then built on a staging environment with full version control, accessibility checks, and performance profiling.' },
                { n: '04', t: 'SEO & Visibility Setup', d: 'Schema markup, XML sitemaps, robots.txt, Search Console setup, and the AEO/GEO content layer - done before launch, not after.' },
                { n: '05', t: 'Launch & Ongoing Optimization', d: 'We deploy, monitor, and continuously optimize. Monthly reporting against your KPIs. Proactive recommendations as search landscapes shift.' },
              ].map((step) => (
                <div key={step.n} className="glass rounded-xl p-6 flex gap-6 items-start">
                  <span className="gradient-text text-2xl font-black flex-shrink-0" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{step.n}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{step.t}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${faqVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Common <span className="gradient-text">questions</span>
              </h2>
            </div>
            <div className={`space-y-3 reveal ${faqVis ? 'visible' : ''}`}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-white/90 text-sm pr-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{item.q}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div className={`accordion-body ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-5 pb-5 text-sm text-white/55 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Ready to build"
        accent="what's next?"
        description="Tell us what your website needs to do. We'll help you find a clear, practical way to get there."
        buttonLabel="Start a conversation"
        onNavigate={onNavigate}
      />
    </div>
  )
}
