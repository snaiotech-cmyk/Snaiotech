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
      <div className="page-cta max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="page-cta__glow" aria-hidden="true" />
        
        <div className="page-cta__content flex-1 z-10">
          <h2 className="page-cta__title text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {title} <span className="gradient-text">{accent}</span>
          </h2>
          <p className="page-cta__description text-sm sm:text-base text-white/70 max-w-xl my-4 leading-relaxed">
            {description}
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold shadow-[0_0_30px_rgba(0,180,216,0.4)]"
          >
            {buttonLabel}
          </button>
        </div>

        {/* Mascot Pointing into Action */}
        <div className="flex-shrink-0 z-10 relative flex items-end justify-center pr-4">
          <div className="relative">
            {/* Soft cyan particle halo behind mascot */}
            <div className="absolute -inset-4 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
            <img
              src="/images/mascot-pointing.png"
              alt="SNAiO Tech mascot pointing to get started"
              className="w-44 sm:w-52 lg:w-60 h-auto object-contain transition-transform duration-500 hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
