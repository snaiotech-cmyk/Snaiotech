interface PageHeroProps {
  service: string
  title: string
  accent: string
  description: string
  image: string
  imageAlt: string
  highlights: string[]
  primaryLabel: string
  secondaryLabel: string
  secondaryTarget: string
  primaryTarget?: string
  onNavigate: (page: string) => void
  stats?: { value: string; label: string }[]
}

export default function PageHero({
  service,
  title,
  accent,
  description,
  image,
  imageAlt,
  highlights,
  primaryLabel,
  secondaryLabel,
  secondaryTarget,
  primaryTarget,
  onNavigate,
  stats,
}: PageHeroProps) {
  return (
    <section className="page-hero gradient-mesh grid-overlay relative overflow-hidden">
      {/* Animated ambient glow orbs */}
      <div className="page-hero__glow" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 320,
          height: 320,
          bottom: '-8%',
          left: '-5%',
          borderRadius: '50%',
          background: 'rgba(100, 223, 223, 0.09)',
          filter: 'blur(90px)',
        }}
      />

      {/* Scattered dot grid accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,180,216,0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 80% 40%, black 20%, transparent 75%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="page-hero__layout">
          {/* ── Left: Copy ── */}
          <div className="page-hero__content">
            {/* Animated service eyebrow chip */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
              style={{
                background: 'rgba(0,180,216,0.08)',
                borderColor: 'rgba(0,180,216,0.3)',
                animation: 'fadeUp 0.5s 0.05s both ease-out',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-cyan-400"
                style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
              />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                {service}
              </span>
            </div>

            <h1
              className="page-hero__title"
              style={{ animation: 'fadeUp 0.6s 0.15s both ease-out' }}
            >
              {title} <span className="gradient-text">{accent}</span>
            </h1>

            <p
              className="page-hero__description"
              style={{ animation: 'fadeUp 0.6s 0.25s both ease-out' }}
            >
              {description}
            </p>

            {/* Optional inline stats row */}
            {stats && stats.length > 0 && (
              <div
                className="flex flex-wrap gap-6 mt-6"
                style={{ animation: 'fadeUp 0.6s 0.3s both ease-out' }}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-black gradient-text"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-white/50 font-mono mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div
              className="page-hero__actions"
              style={{ animation: 'fadeUp 0.6s 0.35s both ease-out' }}
            >
              <button
                onClick={() =>
                  primaryTarget
                    ? document
                        .getElementById(primaryTarget)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    : onNavigate('contact')
                }
                className="btn-primary px-7 py-3.5 rounded-full text-sm"
              >
                {primaryLabel}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById(secondaryTarget)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-ghost px-7 py-3.5 rounded-full text-sm"
              >
                {secondaryLabel}
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          {/* ── Right: Visual Frame ── */}
          <div className="page-hero__visual">
            <div className="page-hero__image-wrap">
              <img src={image} alt={imageAlt} className="page-hero__image" />
              <div className="page-hero__image-shade" aria-hidden="true" />

              {/* Floating highlight chips (animated stagger in) */}
              {highlights.map((h, i) => (
                <div
                  key={h}
                  className="absolute px-3 py-1.5 rounded-full border text-[11px] font-mono text-white/90"
                  style={{
                    background: 'rgba(0,10,25,0.7)',
                    borderColor: 'rgba(0,180,216,0.35)',
                    backdropFilter: 'blur(12px)',
                    top: `${18 + i * 22}%`,
                    right: '-12px',
                    animation: `fadeUp 0.5s ${0.4 + i * 0.12}s both ease-out, float ${6 + i}s ${i * 0.7}s ease-in-out infinite`,
                    zIndex: 4,
                    boxShadow: '0 4px 20px rgba(0,180,216,0.15)',
                  }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 align-middle" />
                  {h}
                </div>
              ))}

              {/* Bottom live label */}
              <div className="page-hero__image-label">
                <span className="page-hero__pulse" aria-hidden="true" />
                {service} · thoughtful by design
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
