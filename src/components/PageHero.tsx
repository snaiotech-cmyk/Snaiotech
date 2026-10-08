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
}: PageHeroProps) {
  return (
    <section className="page-hero gradient-mesh grid-overlay relative overflow-hidden">
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="page-hero__layout">
          <div className="page-hero__content">
            <h1 className="page-hero__title">
              {title} <span className="gradient-text">{accent}</span>
            </h1>
            <p className="page-hero__description">{description}</p>
            <div className="page-hero__actions">
              <button
                onClick={() => primaryTarget
                  ? document.getElementById(primaryTarget)?.scrollIntoView({ behavior: "smooth" })
                  : onNavigate("contact")}
                className="btn-primary px-7 py-3.5 rounded-full text-sm"
              >
                {primaryLabel}
              </button>
              <button
                onClick={() => document.getElementById(secondaryTarget)?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost px-7 py-3.5 rounded-full text-sm"
              >
                {secondaryLabel}
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          <div className="page-hero__visual">
            <div className="page-hero__image-wrap">
              <img src={image} alt={imageAlt} className="page-hero__image" />
              <div className="page-hero__image-shade" aria-hidden="true" />
              <div className="page-hero__image-label">
                <span className="page-hero__pulse" aria-hidden="true" />
                {service} · thoughtful by design
              </div>
            </div>
            <div className="page-hero__highlights" aria-label={`${service} highlights`}>
              {highlights.map((highlight) => (
                <span key={highlight} className="page-hero__highlight">{highlight}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
