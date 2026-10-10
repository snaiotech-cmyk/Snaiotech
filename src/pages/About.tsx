import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import logoSrc from '@/imports/logo.png'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface AboutProps {
  onNavigate: (page: string) => void
}

export default function About({ onNavigate }: AboutProps) {
  const { ref: storyRef, visible: storyVis } = useReveal()
  const { ref: anatomyRef, visible: anatomyVis } = useReveal()
  const { ref: statsRef, visible: statsVis } = useReveal()
  const { ref: valuesRef, visible: valuesVis } = useReveal()
  const { ref: compRef, visible: compVis } = useReveal()

  const [activeSymbol, setActiveSymbol] = useState<'globe' | 'code' | 'gear'>('code')

  const symbols = {
    globe: {
      icon: '🌐',
      name: 'Global Perspective',
      subtitle: 'Borderless Digital Engineering',
      desc: 'The globe woven into the negative space of our logo is not decorative. It represents our commitment to serving enterprises and agencies across India, North America, the UK, and the Middle East with zero geographic friction.',
      stat: 'Clients across 4 continents',
    },
    code: {
      icon: '</>',
      name: 'Development Depth',
      subtitle: 'Hands-On Code Reality',
      desc: 'We are software engineers, not slide-deck consultants. The code brackets symbolize that every recommendation we make is grounded in architecture we can actually build, test, and ship.',
      stat: 'React 19 · Vite · TypeScript · SSG',
    },
    gear: {
      icon: '⚙️',
      name: 'Service as Craft',
      subtitle: 'Tailored Precision & Automation',
      desc: 'The gear represents relentless customization. We never force-fit off-the-shelf packages. We configure Zoho systems, WCAG compliance workflows, and web architectures to fit your unique business mechanics.',
      stat: 'Bespoke automation pipelines',
    },
  }

  const values = [
    {
      icon: '🌍',
      title: 'Global Perspective',
      tag: '01 / Reach',
      desc: "Clients anywhere, solutions that work at any scale, and an engineering worldview that doesn't privilege any single market.",
    },
    {
      icon: '</>',
      title: 'Development Depth',
      tag: '02 / Execution',
      desc: "Every strategy we recommend, we can also execute with production-grade code. No handoffs to outsourced mystery teams.",
    },
    {
      icon: '⚙️',
      title: 'Service as Craft',
      tag: '03 / Precision',
      desc: "We configure solutions to fit your exact operational workflows, staying engaged post-launch with proactive support.",
    },
    {
      icon: '🔒',
      title: 'Integrity First',
      tag: '04 / Transparency',
      desc: "We tell clients what they need to hear, not what they want to hear. Honest scoping, realistic timelines, and zero scope creep theater.",
    },
  ]

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="SNAiO Tech"
        title="Digital work that"
        accent="works for everyone."
        description="We bring PDF accessibility (WCAG 2.2 AA), connected Zoho business automation, and search-optimized web development together under one roof in Chennai, India."
        image="/images/mascot-arms-crossed.png"
        imageAlt="SNAiO Tech wolf mascot standing with arms crossed"
        highlights={['PDF accessibility', 'Zoho systems', 'Websites & apps']}
        primaryLabel="Talk with our team"
        secondaryLabel="What we stand for"
        secondaryTarget="values"
        onNavigate={onNavigate}
      />

      {/* ── Interactive Brand Story & Logo Anatomy ── */}
      <section className="py-24 gradient-mesh-light relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={storyRef as React.RefObject<HTMLDivElement>}>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-6 reveal-left ${storyVis ? 'visible' : ''} space-y-6`}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Engineering Ethos
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Every Icon in Our Logo{' '}
                  <span className="gradient-text block">Means Something.</span>
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  The Snaiotech logo is an interlocked “S” and “N” — but look closer. Three distinct geometric symbols are engineered into the negative space: a globe, code brackets, and a gear. That’s not a graphic accident. It’s our founding charter.
                </p>

                {/* Interactive Symbol Selectors */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {(['globe', 'code', 'gear'] as const).map((key) => {
                    const item = symbols[key]
                    const isActive = activeSymbol === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveSymbol(key)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(0,180,216,0.3)] scale-[1.03]'
                            : 'glass border-white/10 hover:border-cyan-400/30'
                        }`}
                      >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="text-xs font-bold text-white truncate" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                          {item.name}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Active Symbol Deep Dive Card */}
                <div className="p-6 rounded-2xl glass border border-cyan-500/30 shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                      {symbols[activeSymbol].subtitle}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      {symbols[activeSymbol].stat}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {symbols[activeSymbol].desc}
                  </p>
                </div>
              </div>

              {/* Photo & Floating Cyber Overlays */}
              <div className={`lg:col-span-6 reveal-right ${storyVis ? 'visible' : ''}`}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                    <img
                      src={img('1681949103006-70066fb25dfe', 900, 560)}
                      alt="SNAiO Tech engineering team in session"
                      className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(11,79,138,0.3), rgba(0,180,216,0.1))' }}
                    />
                  </div>

                  {/* Floating Logo Badge */}
                  <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 flex items-center justify-center shadow-2xl border border-cyan-400/40 animate-float" style={{ width: 92, height: 92 }}>
                    <img src={logoSrc} alt="Snaiotech logo" className="w-12 h-12 object-contain" />
                  </div>

                  {/* Floating Stat Badge */}
                  <div className="absolute -top-5 -right-5 glass rounded-2xl px-6 py-3.5 shadow-2xl border border-white/15">
                    <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      200+
                    </div>
                    <div className="text-[11px] text-white/60 font-mono">
                      Completed Projects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Engineering Performance Bento ── */}
      <section className="py-20 gradient-mesh relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={statsRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${statsVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-2">Quantifiable Standards</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Engineering Backed by <span className="gradient-text">Hard Benchmarks</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { val: '200+', label: 'Delivered Deployments', sub: 'Across Web, PDF, and Zoho CRM' },
                { val: '100%', label: 'WCAG 2.2 AA Compliance', sub: 'Flawless Section 508 & ADA Audit Rate' },
                { val: '0.6s', label: 'Average LCP Speed', sub: 'Sub-second Core Web Vitals Load Times' },
                { val: '24/7', label: 'Proactive Monitoring', sub: 'Direct Chennai Engineering Access' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-7 border border-white/10 hover:border-cyan-400/40 transition-all text-center group"
                >
                  <div className="text-4xl sm:text-5xl font-black gradient-text mb-2 group-hover:scale-105 transition-transform" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {stat.val}
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section id="values" className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={valuesRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${valuesVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Our Core Pillars</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                What We <span className="gradient-text">Stand For</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="glass rounded-2xl p-7 border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 mb-3 block">
                      {v.tag}
                    </span>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                      {v.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2 text-base group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {v.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Delivery Comparison: Typical Agency vs SNAiO Tech ── */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-5xl mx-auto px-6">
          <div ref={compRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${compVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-2">The SNAiO Difference</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                How We Operate <span className="gradient-text">vs. Traditional Agencies</span>
              </h3>
            </div>

            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-white/5 border-b border-white/10 font-mono text-cyan-300">
                    <tr>
                      <th className="p-4 sm:p-5">Dimension</th>
                      <th className="p-4 sm:p-5 text-red-300">Typical Agency</th>
                      <th className="p-4 sm:p-5 text-cyan-300">SNAiO Tech</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Project Scoping</td>
                      <td className="p-4 sm:p-5 text-white/50">Vague proposals leading to scope creep & change orders</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Exhaustive technical specs agreed before code is written</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Accessibility</td>
                      <td className="p-4 sm:p-5 text-white/50">Third-party overlay widget pasted onto site (fails court tests)</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Semantic WCAG 2.2 AA & PDF/UA built into source code</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Search Visibility</td>
                      <td className="p-4 sm:p-5 text-white/50">Empty client-side SPA shells invisible to AI search crawlers</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Full SSG pre-rendering, Schema.org graphs, AEO/GEO ready</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Post-Launch Support</td>
                      <td className="p-4 sm:p-5 text-white/50">Handoff files and vanish into silence</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Dedicated retainers, live Slack/Teams channels, continuous tuning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCTA
        title="Digital work that"
        accent="works for everyone."
        description="Tell us what your team is working on, and we'll help you engineer the right next step from our Chennai lab."
        buttonLabel="Start a conversation"
        onNavigate={onNavigate}
      />
    </div>
  )
}
