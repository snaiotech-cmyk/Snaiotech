import { useReveal } from '@/hooks/useReveal'
import logoSrc from '@/imports/logo.png'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface AboutProps { onNavigate: (page: string) => void }

export default function About({ onNavigate }: AboutProps) {
  const { ref: storyRef, visible: storyVis } = useReveal()
  const { ref: teamRef, visible: teamVis } = useReveal()
  const { ref: timelineRef, visible: timelineVis } = useReveal()

  const values = [
    { icon: '🌍', title: 'Global Perspective', desc: "The globe in our logo isn't decorative - it represents our commitment to serving clients across geographies, industries, and scales." },
    { icon: '</>', title: 'Development Depth', desc: "We build things. The code bracket in our mark is a reminder that every recommendation we make is grounded in what we know how to actually build." },
    { icon: '⚙️', title: 'Service as Craft', desc: "The gear represents precision and customization. We don't sell packages - we engineer solutions." },
    { icon: '🔒', title: 'Integrity First', desc: "We tell clients what they need to hear, not what they want to hear. Honest scoping, realistic timelines, no scope creep theater." },
  ]

  const team = [
    { name: 'Amara J.', role: 'Founder & Strategy Lead', bio: 'Former digital agency director. 14 years building web presence for mid-market and enterprise brands.', imgId: '1699899657680-421c2c2d5064' },
    { name: 'Reza K.', role: 'Lead Engineer', bio: 'Full-stack engineer specializing in Next.js, performance, and technical SEO architecture.', imgId: '1590086782792-42dd2350140d' },
    { name: 'Nina P.', role: 'Accessibility Director', bio: 'CPWA-certified accessibility specialist. Former consultant to federal agencies on Section 508 compliance.', imgId: '1506863530036-1efeddceb993' },
    { name: 'Luca M.', role: 'Zoho Solutions Architect', bio: "Zoho Certified Consultant with 9+ years of CRM implementations across logistics, legal, and healthcare.", imgId: '1500648767791-00dcc994a43e' },
    { name: 'Yuki S.', role: 'Content & SEO Lead', bio: 'Specializes in AEO/GEO content strategy and E-E-A-T frameworks for AI-forward visibility.', imgId: '1543949806-2c9935e6aa78' },
    { name: 'Dara O.', role: 'Client Success Lead', bio: "Ensures every engagement delivers against the KPIs we agreed to - and then some.", imgId: '1507003211169-0a1dd7228f2d' },
  ]

  const milestones = [
    { year: '2019', event: 'Founded with a focus on web development and technical SEO.' },
    { year: '2021', event: 'Expanded into PDF accessibility services after recognizing a critical market gap.' },
    { year: '2022', event: 'Became a certified Zoho implementation partner. First enterprise-scale CRM deployment.' },
    { year: '2023', event: 'Launched AEO practice as AI assistants began disrupting traditional search behavior.' },
    { year: '2024', event: 'Built out GEO methodology as Google SGE and generative search matured.' },
    { year: '2026', event: 'Serving clients globally - 200+ successful engagements and growing.' },
  ]

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="SNAiO Tech"
        title="Digital work that"
        accent="works for everyone."
        description="We bring PDF accessibility, connected Zoho systems, and web development together—so digital tools work better for the people who rely on them."
        image="/images/snaiotech-wolf.png"
        imageAlt="SNAiO Tech wolf mascot"
        highlights={["PDF accessibility", "Zoho systems", "Websites & apps"]}
        primaryLabel="Talk with our team"
        secondaryLabel="What we stand for"
        secondaryTarget="values"
        onNavigate={onNavigate}
      />

      {/* Brand story */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={storyRef as React.RefObject<HTMLDivElement>}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={`reveal-left ${storyVis ? 'visible' : ''}`}>
                <p className="eyebrow mb-4">The story behind the mark</p>
                <h2 className="text-4xl font-extrabold text-white mb-6 display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Every icon in our logo{' '}
                  <span className="gradient-text">means something.</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-white/60 text-sm leading-relaxed">
                    The Snaiotech logo is an interlocked "S" and "N" - but look closer. Three icons are woven into the negative space: a globe, code brackets, and a gear. That's not coincidence. It's a declaration.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The <strong className="text-white/90">globe</strong> represents global reach - clients anywhere, solutions that work at any scale, and a worldview that doesn't privilege any one market or medium.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The <strong className="text-white/90">code brackets {"</>"}</strong> represent that we build things. Every strategy we recommend, we can also execute. That's rare. We think it matters.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The <strong className="text-white/90">gear</strong> represents customization and service - we configure solutions to fit businesses, not the other way around, and stay engaged after delivery.
                  </p>
                </div>
              </div>

              {/* Photo + floating overlays */}
              <div className={`reveal-right ${storyVis ? 'visible' : ''}`}>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img src={img('1681949103006-70066fb25dfe', 800, 480)} alt="Team around table" className="w-full h-64 lg:h-72 object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,79,138,0.2), rgba(0,180,216,0.08))' }} />
                  </div>
                  <div className="absolute -bottom-6 -left-6 glass-blue rounded-2xl p-4 flex items-center justify-center shadow-xl animate-float" style={{ width: 88, height: 88 }}>
                    <img src={logoSrc} alt="Snaiotech logo" className="w-12 h-12 object-contain" />
                  </div>
                  <div className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3 shadow-xl">
                    <div className="text-xl font-black gradient-text stat-num">200+</div>
                    <div className="text-xs text-white/40" style={{ fontFamily: 'Space Mono, monospace' }}>Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">What we stand for</p>
            <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Our <span className="gradient-text">core values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="neumorph rounded-2xl p-6">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-white mb-2 text-sm" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{v.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - asymmetric collage grid */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={teamRef as React.RefObject<HTMLDivElement>}>
            <div className={`mb-14 reveal ${teamVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">The team</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Specialists, not <span className="gradient-text">generalists.</span>
              </h2>
            </div>

            <div className={`grid md:grid-cols-6 gap-5 stagger ${teamVis ? 'visible' : ''}`}>
              {/* Large card - 3 cols */}
              <div className="md:col-span-3">
                <div className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-colors h-full flex flex-col">
                  <div className="relative h-60 overflow-hidden flex-shrink-0">
                    <img src={img(team[0].imgId, 600, 480)} alt={team[0].name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,14,26,0.92))' }} />
                    <div className="absolute bottom-4 left-5">
                      <div className="font-extrabold text-white text-lg" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{team[0].name}</div>
                      <div className="text-xs text-cyan-400" style={{ fontFamily: 'Space Mono, monospace' }}>{team[0].role}</div>
                    </div>
                  </div>
                  <div className="p-5 flex-1"><p className="text-white/50 text-xs leading-relaxed">{team[0].bio}</p></div>
                </div>
              </div>

              {/* Medium card - 2 cols */}
              <div className="md:col-span-2">
                <div className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-colors h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img src={img(team[1].imgId, 400, 384)} alt={team[1].name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,14,26,0.92))' }} />
                    <div className="absolute bottom-3 left-4">
                      <div className="font-extrabold text-white text-base" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{team[1].name}</div>
                      <div className="text-xs text-cyan-400" style={{ fontFamily: 'Space Mono, monospace' }}>{team[1].role}</div>
                    </div>
                  </div>
                  <div className="p-4 flex-1"><p className="text-white/50 text-xs leading-relaxed">{team[1].bio}</p></div>
                </div>
              </div>

              {/* Narrow card - 1 col */}
              <div className="md:col-span-1">
                <div className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-colors h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img src={img(team[2].imgId, 200, 320)} alt={team[2].name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(10,14,26,0.9))' }} />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="font-bold text-white text-sm mb-0.5" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{team[2].name}</div>
                    <div className="text-xs text-cyan-400 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>{team[2].role}</div>
                    <p className="text-white/45 text-xs leading-relaxed">{team[2].bio}</p>
                  </div>
                </div>
              </div>

              {/* Bottom row - 3 equal at 2 cols each */}
              {team.slice(3).map((member) => (
                <div key={member.name} className="md:col-span-2">
                  <div className="glass rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-colors h-full flex flex-col">
                    <div className="relative h-40 overflow-hidden flex-shrink-0">
                      <img src={img(member.imgId, 400, 320)} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(10,14,26,0.9))' }} />
                      <div className="absolute bottom-3 left-4">
                        <div className="font-bold text-white text-sm" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{member.name}</div>
                        <div className="text-xs text-cyan-400" style={{ fontFamily: 'Space Mono, monospace' }}>{member.role}</div>
                      </div>
                    </div>
                    <div className="p-4 flex-1"><p className="text-white/50 text-xs leading-relaxed">{member.bio}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={timelineRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${timelineVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Our journey</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Milestones that <span className="gradient-text">shaped us</span>
              </h2>
            </div>
            <div className={`relative stagger ${timelineVis ? 'visible' : ''}`}>
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-blue-600/40 to-transparent" />
              <div className="space-y-6">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-6 pl-16 relative">
                    <div className="absolute left-0 w-16 h-16 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 bg-cyan-400/20" />
                    </div>
                    <div className="glass rounded-xl p-5 flex-1">
                      <span className="eyebrow text-cyan-400">{m.year}</span>
                      <p className="text-white/75 text-sm leading-relaxed mt-1">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Digital work that"
        accent="works for everyone."
        description="Tell us what your team is working on, and we'll help you find the right next step."
        buttonLabel="Start a conversation"
        onNavigate={onNavigate}
      />
    </div>
  )
}
