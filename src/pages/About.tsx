import { useReveal } from '@/hooks/useReveal'
import logoSrc from '@/imports/logo.png'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface AboutProps { onNavigate: (page: string) => void }

export default function About({ onNavigate }: AboutProps) {
  const { ref: storyRef, visible: storyVis } = useReveal()

  const values = [
    { icon: '🌍', title: 'Global Perspective', desc: "The globe in our logo isn't decorative - it represents our commitment to serving clients across geographies, industries, and scales." },
    { icon: '</>', title: 'Development Depth', desc: "We build things. The code bracket in our mark is a reminder that every recommendation we make is grounded in what we know how to actually build." },
    { icon: '⚙️', title: 'Service as Craft', desc: "The gear represents precision and customization. We don't sell packages - we engineer solutions." },
    { icon: '🔒', title: 'Integrity First', desc: "We tell clients what they need to hear, not what they want to hear. Honest scoping, realistic timelines, no scope creep theater." },
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
