interface PageCTAProps {
  title: string
  accent: string
  description: string
  buttonLabel: string
  onNavigate: (page: string) => void
}

export default function PageCTA({ title, accent, description, buttonLabel, onNavigate }: PageCTAProps) {
  return (
    <section className="page-cta-wrap gradient-mesh-light">
      <div className="page-cta max-w-6xl mx-auto">
        <div className="page-cta__glow" aria-hidden="true" />
        <div className="page-cta__content">
          <h2 className="page-cta__title">
            {title} <span className="gradient-text">{accent}</span>
          </h2>
          <p className="page-cta__description">{description}</p>
          <button onClick={() => onNavigate("contact")} className="btn-primary px-7 py-3.5 rounded-full text-sm">
            {buttonLabel}
          </button>
        </div>
        <div className="page-cta__mark" aria-hidden="true">
          <span>SN</span>
          <i />
        </div>
      </div>
    </section>
  )
}
