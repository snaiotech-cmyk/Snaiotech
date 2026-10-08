import { useState, useRef, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'
import ArcFlowCarousel from '@/components/ArcFlowCarousel'

// ── Image CDN helper ─────────────────────────────────────────────────────────
const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

// ── SVG icons ────────────────────────────────────────────────────────────────
const IconGlobe = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IconCode = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const IconGear = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
  </svg>
)
const IconCheck = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconArrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const valueCards = [
  { icon: 'target', title: 'Precision Engineering', desc: 'We architect before we build. Every engagement starts with deep discovery to ensure the solution fits the problem.' },
  { icon: 'pulse', title: 'Fast, Reliable Delivery', desc: "48-hour response SLA and sprint-based delivery means you're never left waiting for progress updates." },
  { icon: 'shield', title: 'Compliance-First Mindset', desc: "Accessibility, security, and standards compliance aren't afterthoughts - they're baked into every build." },
  { icon: 'globe', title: 'Global Reach, Local Care', desc: 'Remote-first team with global client success - yet every engagement feels like a boutique partnership.' },
  { icon: 'chart', title: 'Measurable ROI', desc: 'We set KPIs before we start and report against them. No vanity metrics, no vague deliverables.' },
  { icon: 'link', title: 'Long-term Partnership', desc: "We don't ship and disappear. Post-launch support and growth planning are part of the deal." },
] as const

function ValueIcon({ name }: { name: typeof valueCards[number]['icon'] }) {
  const paths = {
    target: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></>,
    pulse: <><path d="M3 12h4l2.5-7 5 14 2.5-7H21"/><path d="M5 4h14"/></>,
    shield: <><path d="M12 3 19 6v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></>,
    link: <><path d="m10 13.5 4-4"/><path d="M7.5 15.5 6 17a4 4 0 0 1-5.5-5.8l4-4A4 4 0 0 1 10 7"/><path d="m16.5 8.5 1.5-1.5a4 4 0 0 1 5.5 5.8l-4 4A4 4 0 0 1 14 17"/></>,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface HomeProps { onNavigate: (page: string) => void }

export default function Home({ onNavigate }: HomeProps) {
  const [heroSlide, setHeroSlide] = useState(0)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [galleryPaused, setGalleryPaused] = useState(false)
  const [activeValueIndex, setActiveValueIndex] = useState(0)
  const [valueCarouselPaused, setValueCarouselPaused] = useState(false)
  const serviceGalleryRef = useRef<HTMLDivElement>(null)
  const [galleryVisible, setGalleryVisible] = useState(false)

  const { ref: servicesRef, visible: servicesVisible } = useReveal()
  const { ref: statsRef, visible: statsVisible } = useReveal()
  const { ref: processRef, visible: processVisible } = useReveal()
  const { ref: blogRef, visible: blogVisible } = useReveal()
  const { ref: ctaRef, visible: ctaVisible } = useReveal()

  useEffect(() => {
    const handleBlogNavigation = (event: MessageEvent<{ type?: string }>) => {
      if (event.origin === window.location.origin && event.data?.type === 'snaiotech-blog-navigate') {
        onNavigate('blog')
      }
    }
    window.addEventListener('message', handleBlogNavigation)
    return () => window.removeEventListener('message', handleBlogNavigation)
  }, [onNavigate])

  useEffect(() => {
    if (valueCarouselPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setActiveValueIndex((current) => (current + 1) % valueCards.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [valueCarouselPaused])

  const steps = [
    { n: '01', title: 'Discovery Call', desc: 'We understand your current setup, goals, and biggest opportunities before mapping the next steps.', image: '/images/process-discovery.png' },
    { n: '02', title: 'Strategy & Scope', desc: 'A tailored roadmap with clear deliverables, timeline, and measurable KPIs.', image: '/images/process-strategy-scope.png' },
    { n: '03', title: 'Build & Implement', desc: 'Our engineers execute with precision - no handoffs, no surprises.', image: '/images/process-build-implement.png' },
    { n: '04', title: 'Test & Refine', desc: 'QA across devices, browsers, and accessibility standards before go-live.', image: '/images/process-qa-testing.png' },
    { n: '05', title: 'Launch & Grow', desc: 'We stay on as partners - monitoring, optimizing, and scaling with you.', image: '/images/process-launch-grow.png' },
  ]

  const techItems = ['React', 'Next.js', 'Zoho CRM', 'Zoho Books', 'Zoho Desk', 'Figma', 'TypeScript', 'Python', 'WordPress', 'Webflow', 'PostgreSQL', 'AWS', 'Zoho Analytics', 'WCAG 2.2', 'PDF/UA', 'Google Search Console', 'Semrush']

  const posts = [
    { cat: 'SEO/AI', date: 'Sep 2, 2026', title: 'What is GEO- How to Rank in AI-Generated Search Results', excerpt: "Generative Engine Optimization is the new frontier. Here's what it means and how to prepare your content.", imgId: '1686061593213-98dad7c599b9', readTime: '7 min' },
    { cat: 'Accessibility', date: 'Aug 28, 2026', title: 'WCAG 2.2 - What Changed and Why It Matters for Your Business', excerpt: 'The latest WCAG update brings 9 new success criteria. We break down each with practical remediation steps.', imgId: '1778873750399-338b94f7feda', readTime: '10 min' },
    { cat: 'Zoho', date: 'Aug 20, 2026', title: 'Zoho CRM vs Salesforce: The 2026 Honest Comparison', excerpt: "We've implemented both. Here's what teams actually experience, and when Zoho wins on value.", imgId: '1551288049-bebda4e38f71', readTime: '12 min' },
  ]

  const heroServices = [
    {
      id: 'pdf',
      tab: 'Documents',
      eyebrow: 'PDF ACCESSIBILITY',
      title: 'Documents everyone can use.',
      description: 'WCAG 2.2 AA and PDF/UA remediation, with a report to prove it.',
      action: 'Explore document accessibility',
      poster: img('1586281380349-632531db7ed4', 1800, 1000),
      video: '/videos/pdf-accessibility.mp4',
    },
    {
      id: 'zoho',
      tab: 'Systems',
      eyebrow: 'ZOHO IMPLEMENTATION',
      title: 'Systems that work together.',
      description: 'Zoho configured, connected and ready for your team.',
      action: 'Explore Zoho services',
      poster: img('1551288049-bebda4e38f71', 1800, 1000),
      video: '/videos/zoho-implementation.mp4',
    },
    {
      id: 'webdev',
      tab: 'Web',
      eyebrow: 'WEB DEVELOPMENT',
      title: 'Websites built to be found.',
      description: 'Fast, accessible websites and apps, built for search from day one.',
      action: 'Explore web development',
      poster: img('1498050108023-c5249f4df085', 1800, 1000),
      video: '/videos/web-development.mp4',
    },
  ]
  const activeHeroService = heroServices[heroSlide]
  const BG_OVERLAY = { background: 'linear-gradient(to bottom, rgba(10,14,26,0.15), rgba(10,14,26,0.88))' }
  const showcaseServices = [
    {
      id: 'webdev',
      title: 'Websites built to be found.',
      cardTitle: 'Web development',
      description: 'Fast, accessible websites and web apps, designed to perform in search and in the real world.',
      image: '/images/discipline-web-development.png',
      detail: 'SEO · GEO · AEO',
    },
    {
      id: 'pdf',
      title: 'Documents everyone can use.',
      cardTitle: 'PDF accessibility',
      description: 'WCAG 2.2 AA and PDF/UA remediation, with a clear report your team can rely on.',
      image: '/images/discipline-pdf-accessibility.png',
      detail: 'WCAG 2.2 AA · PDF/UA',
    },
    {
      id: 'zoho',
      title: 'Systems that work together.',
      cardTitle: 'Zoho implementation',
      description: 'Zoho configured around your team: connected, practical and ready for everyday work.',
      image: '/images/discipline-zoho-implementation.png',
      detail: 'Setup · Migration · Training',
    },
  ]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setHeroSlide((current) => (current + 1) % heroServices.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [heroServices.length])

  useEffect(() => {
    const element = serviceGalleryRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setGalleryVisible(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!galleryVisible || galleryPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setActiveServiceIndex((current) => (current + 1) % showcaseServices.length)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [galleryVisible, galleryPaused, showcaseServices.length])

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero-slider relative isolate h-[100vh] h-[100svh] w-screen overflow-hidden bg-[#050912]" aria-label="SNAiO Tech services">
        <video
          key={`hero-video-${activeHeroService.id}`}
          className="hero-slider__video absolute inset-0 h-full w-full object-cover"
          src={activeHeroService.video}
          autoPlay
          muted
          loop
          playsInline
          poster={activeHeroService.poster}
          aria-label={`${activeHeroService.tab} background video`}
        />
        <div className="hero-slider__shade absolute inset-0" aria-hidden="true" />
        <div key={`hero-content-${activeHeroService.id}`} className="hero-slider__content relative z-10 flex h-full w-full items-center px-6 pb-14 pt-28 sm:px-12 lg:px-[10vw]">
          <div className="max-w-3xl">
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-7xl lg:text-[6.25rem]" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              {activeHeroService.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-xl">
              {activeHeroService.description}
            </p>
            <button onClick={() => onNavigate(activeHeroService.id)} className="btn-primary mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm sm:text-base">
              {activeHeroService.action}<IconArrow />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 px-6 pb-7 sm:px-12 lg:px-[10vw] lg:pb-10">
          <div className="flex min-w-0 flex-1 gap-5 sm:gap-8" role="group" aria-label="Choose a service slide">
            {heroServices.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setHeroSlide(index)}
                aria-label={`Show ${service.tab} slide`}
                aria-current={heroSlide === index ? 'true' : undefined}
                className={`hero-slider__nav min-w-0 flex-1 text-left text-xs font-semibold uppercase tracking-[0.14em] transition-colors sm:max-w-52 sm:text-sm ${heroSlide === index ? 'text-white' : 'text-white/55 hover:text-white/90'}`}
              >
                <span className="mb-3 block h-1 overflow-hidden rounded-full bg-white/25">
                  <span className={`hero-slider__progress block h-full rounded-full bg-cyan-300 ${heroSlide === index ? 'is-active' : ''}`} />
                </span>
                {service.tab}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-mono text-sm text-white/75">{String(heroSlide + 1).padStart(2, '0')} <span className="text-white/40">/</span> {String(heroServices.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => setHeroSlide((heroSlide + heroServices.length - 1) % heroServices.length)} aria-label="Previous slide" className="hero-slider__arrow">←</button>
            <button type="button" onClick={() => setHeroSlide((heroSlide + 1) % heroServices.length)} aria-label="Next slide" className="hero-slider__arrow">→</button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services-section" className="py-24 gradient-mesh-light relative">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={servicesRef as React.RefObject<HTMLDivElement>}>
            <div className={`mb-16 reveal ${servicesVisible ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">What we deliver</p>
              <h2 className="text-4xl lg:text-6xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Three disciplines.{' '}
                  <span className="gradient-text">One committed team.</span>
                </h2>
              </div>
              <div
                ref={serviceGalleryRef}
                className="service-flip-gallery"
                role="group"
                onMouseEnter={() => setGalleryPaused(true)}
                onMouseLeave={() => setGalleryPaused(false)}
                onFocus={() => setGalleryPaused(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setGalleryPaused(false)
                }}
                aria-label="Explore our three services"
              >
                {showcaseServices.map((service, index) => {
                  const active = activeServiceIndex === index
                  return (
                    <article
                      key={service.id}
                      className={`service-flip-card ${active ? 'is-active' : ''}`}
                      style={{ backgroundImage: `linear-gradient(0deg, rgba(5,9,18,.96), rgba(5,9,18,.08) 85%), url("${service.image}")` }}
                      onMouseEnter={() => setActiveServiceIndex(index)}
                    >
                      <button
                        type="button"
                        className="service-flip-card__select"
                        onClick={() => setActiveServiceIndex(index)}
                        aria-label={`Feature ${service.cardTitle}`}
                        aria-pressed={active}
                      />
                      <span className="service-flip-card__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <div className="service-flip-card__copy">
                        <h3>{service.cardTitle}</h3>
                        <div className="service-flip-card__details">
                          <p>{service.description}</p>
                          <span>{service.detail}</span>
                          <button type="button" onClick={() => onNavigate(service.id)}>
                            Explore service <IconArrow />
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
      </section>

      {/* ── WHY SNAIOTECH ─────────────────────────────────────────────── */}
      <section className="stats-showcase-section gradient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={statsRef as React.RefObject<HTMLDivElement>}>
            <div className={`stats-showcase reveal ${statsVisible ? 'visible' : ''}`}>
              <div className="stats-showcase__mascot" aria-hidden="true">
                <img src="/images/snaiotech-wolf.png" alt="" />
              </div>
              <div className="stats-showcase__intro">
                <h2 className="text-4xl font-extrabold display-snug sm:text-5xl" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Fresh start.<br /><span className="gradient-text">Serious commitment.</span>
                </h2>
                <p>Small studio, full attention. Clear pricing, direct communication, and people who stay accountable from first call to final handoff.</p>
                <div className="stats-showcase__signature">
                  <span>Smart mind. Builds better.</span>
                  <span>Built · Automate · Grow</span>
                </div>
              </div>
            </div>

            <div
              className={`value-orbit reveal ${statsVisible ? 'visible' : ''}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="How we work"
              onMouseEnter={() => setValueCarouselPaused(true)}
              onMouseLeave={() => setValueCarouselPaused(false)}
              onFocus={() => setValueCarouselPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setValueCarouselPaused(false)
              }}
            >
              <div className="value-orbit__track" aria-live="polite">
                {valueCards.map((card, index) => {
                  const offset = (index - activeValueIndex + valueCards.length) % valueCards.length
                  const slot = offset === 0 ? 'current' : offset === 1 ? 'right' : offset === valueCards.length - 1 ? 'left' : 'hidden'

                  return (
                    <article
                      key={card.title}
                      className={`value-orbit__card value-orbit__card--${slot}`}
                      aria-hidden={slot === 'hidden'}
                    >
                      <span className="value-orbit__icon"><ValueIcon name={card.icon} /></span>
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                      </div>
                      <span className="value-orbit__index">{String(index + 1).padStart(2, '0')}</span>
                    </article>
                  )
                })}
              </div>
              <div className="value-orbit__controls">
                <span className="value-orbit__count">
                  {String(activeValueIndex + 1).padStart(2, '0')}
                  <span> / {String(valueCards.length).padStart(2, '0')}</span>
                </span>
                <div className="value-orbit__dots" aria-label="Choose a principle">
                  {valueCards.map((card, index) => (
                    <button
                      key={card.title}
                      type="button"
                      className={index === activeValueIndex ? 'is-active' : ''}
                      aria-label={`Show ${card.title}`}
                      aria-current={index === activeValueIndex ? 'true' : undefined}
                      onClick={() => setActiveValueIndex(index)}
                    />
                  ))}
                </div>
                <div className="value-orbit__arrows">
                  <button
                    type="button"
                    aria-label="Previous principle"
                    onClick={() => setActiveValueIndex((current) => (current - 1 + valueCards.length) % valueCards.length)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next principle"
                    onClick={() => setActiveValueIndex((current) => (current + 1) % valueCards.length)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="process-section py-24 gradient-mesh-light">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div ref={processRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-16 reveal ${processVisible ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our process - <span className="gradient-text">no ambiguity.</span>
              </h2>
            </div>
            <ArcFlowCarousel
              items={steps.map((step) => ({
                src: step.image,
                alt: `${step.title} process`,
                label: `STEP ${step.n}`,
                title: step.title,
                description: step.desc,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────────────────────── */}
      <section className="tech-marquee-section" aria-label="Technologies and standards we work with">
        <div className="tech-marquee__inner">
          <div className="tech-marquee__heading">
            <div>
              <p className="eyebrow mb-3">Our digital toolkit</p>
              <h2>Good work starts with <span className="gradient-text">the right tools.</span></h2>
            </div>
            <p>Thoughtfully chosen technology, accessibility standards, and platforms - all working together.</p>
          </div>
          <p className="sr-only">{techItems.join(', ')}</p>
          {[techItems, [...techItems].reverse()].map((laneItems, laneIndex) => (
            <div className={`tech-marquee__viewport tech-marquee__viewport--${laneIndex + 1}`} key={laneIndex}>
              <div className={`tech-marquee__track ${laneIndex === 0 ? 'animate-marquee' : 'animate-marquee-rev'}`} aria-hidden="true">
                {[0, 1].map((copy) => (
                  <div className="tech-marquee__group" key={copy}>
                    {laneItems.map((item) => {
                      const mark = item === 'WCAG 2.2' ? 'AA' : item === 'PDF/UA' ? 'PDF' : item.split(/[ .]+/).map((part) => part[0]).join('').slice(0, 2)
                      return (
                        <span className="tech-marquee__chip" key={`${copy}-${item}`}>
                          <span className="tech-marquee__mark">{mark}</span>
                          <span>{item}</span>
                          <span className="tech-marquee__spark" aria-hidden="true" />
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ── BLOG - asymmetric 3+2 ──────────────────────────────────────── */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={blogRef as React.RefObject<HTMLDivElement>}>
            <div className={`flex items-end justify-between mb-12 reveal ${blogVisible ? 'visible' : ''}`}>
              <div>
                <p className="eyebrow mb-2">Fresh thinking</p>
                <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  From the <span className="gradient-text">Snaiotech blog</span>
                </h2>
              </div>
              <button onClick={() => onNavigate('blog')} className="hidden sm:flex btn-ghost px-5 py-2.5 rounded-full text-sm items-center gap-2">All posts <IconArrow /></button>
            </div>

            <div className={`blog-flip-gallery reveal ${blogVisible ? 'visible' : ''}`}>
              <iframe
                src="/blog-flip-gallery.html"
                title="Featured Snaiotech blog articles"
                loading="lazy"
                className="blog-flip-gallery__frame"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="final-cta-section">
        <div className="final-cta__backdrop" aria-hidden="true">
          <div className="final-cta__glow final-cta__glow--left" />
          <div className="final-cta__glow final-cta__glow--right" />
          <div className="final-cta__orbit final-cta__orbit--outer" />
          <div className="final-cta__orbit final-cta__orbit--inner" />
        </div>
        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className="final-cta__content">
          <div className={`final-cta__panel reveal ${ctaVisible ? 'visible' : ''}`}>
            <h2>
              Your competition is
              <span className="final-cta__headline-accent"> already moving.</span>
            </h2>
            <p className="final-cta__description">
              Tell us what you need. We’ll help you find a clear, practical next step - no pitch deck, no pressure.
            </p>
            <div className="final-cta__actions">
              <button onClick={() => onNavigate('contact')} className="final-cta__primary">
                Get a free consultation <IconArrow />
              </button>
              <button onClick={() => onNavigate('about')} className="final-cta__secondary">Get to know us</button>
            </div>
            <div className="final-cta__assurances" aria-label="What to expect">
              <span><IconCheck /> Fixed-price quotes</span>
              <span><IconCheck /> Work directly with our team</span>
              <span><IconCheck /> Clear next steps</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
