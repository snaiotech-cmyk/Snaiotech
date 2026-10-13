import { useState, useEffect, useRef } from 'react'
const defaultLogoSrc = 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo'
const getLogoSrc = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return defaultLogoSrc
    return JSON.parse(localStorage.getItem('snaiotech-site-settings') || '{}').logoUrl || defaultLogoSrc
  } catch {
    return defaultLogoSrc
  }
}

const getPathForPage = (page: string) => (page === 'home' ? '/' : `/${page}`)

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

const SERVICES = [
  {
    id: 'pdf',
    label: 'PDF Accessibility',
    desc: 'Accessible PDFs with clear remediation findings.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="17" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 'zoho',
    label: 'Zoho Implementation',
    desc: 'Implementation, automation, and custom integrations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
  },
  {
    id: 'webdev',
    label: 'Web Development',
    desc: 'Fast, accessible websites and web apps built to be found.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
]

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 80)
      if (currentScrollY <= 24) {
        setHidden(false)
      } else if (currentScrollY > lastScrollY + 3) {
        setHidden(true)
        setServicesOpen(false)
      } else if (currentScrollY < lastScrollY - 3) {
        setHidden(false)
      }
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as HTMLElement)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navigate = (page: string) => {
    onNavigate(page)
    setMobileOpen(false)
    setServicesOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${hidden ? 'site-header--hidden' : ''}`}
        style={{
          background: scrolled
            ? 'rgba(10,14,26,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0,180,216,0.2)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
          padding: scrolled ? '10px 0' : '18px 0',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate('home')
            }}
            className="flex items-center gap-3 group"
            aria-label="Snaiotech Home"
          >
            <img
              src={getLogoSrc()}
              alt="Snaiotech logo"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              width={36}
              height={36}
            />
            <span
              className="font-bold text-xl tracking-tight gradient-text"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Snaiotech
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('home')
                }}
                className={`nav-link text-sm font-medium ${currentPage === 'home' ? 'active text-cyan-400' : 'text-white/80'}`}
              >
                Home
              </a>
            </li>

            {/* Services dropdown */}
            <li className="relative" ref={dropRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`nav-link text-sm font-medium flex items-center gap-1 ${['webdev','pdf','zoho'].includes(currentPage) ? 'active text-cyan-400' : 'text-white/80'}`}
              >
                Services
                <svg
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {servicesOpen && (
                <div className="services-mega-menu absolute left-1/2 top-8 w-[min(620px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-3xl p-3 shadow-2xl animate-fadeIn">
                  <div className="services-mega-menu__heading flex items-end justify-between gap-4 px-4 pb-3 pt-4">
                    <div>
                      <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Digital work, made practical.</h2>
                      <p className="mt-1 text-xs text-white/55">Three focused services. One hands-on team.</p>
                    </div>
                    <span className="mb-1 font-mono text-[10px] tracking-widest text-cyan-300">01 - 03</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {SERVICES.map((s, index) => (
                      <a
                        key={s.id}
                        href={getPathForPage(s.id)}
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(s.id)
                        }}
                        className={`services-mega-menu__item group relative flex min-h-40 flex-col items-start overflow-hidden rounded-2xl p-4 text-left ${currentPage === s.id ? 'is-current' : ''}`}
                      >
                        <span className="services-mega-menu__item-number">{String(index + 1).padStart(2, '0')}</span>
                        <span className="services-mega-menu__icon mb-5 flex h-10 w-10 items-center justify-center rounded-xl text-cyan-200 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          {s.icon}
                        </span>
                        <span className="relative z-10 text-sm font-semibold leading-snug text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                          {s.label}
                        </span>
                        <span className="relative z-10 mt-2 text-[11px] leading-relaxed text-white/55">
                          {s.desc}
                        </span>
                        <span className="services-mega-menu__arrow" aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-cyan-300/[0.07] px-4 py-3">
                    <span className="text-xs text-white/70">Not sure where to start?</span>
                    <a
                      href="/contact"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('contact')
                      }}
                      className="text-xs font-semibold text-cyan-200 transition-colors hover:text-white"
                    >
                      Talk it through <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              )}
            </li>

            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item.id}>
                <a
                  href={getPathForPage(item.id)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(item.id)
                  }}
                  className={`nav-link text-sm font-medium ${currentPage === item.id ? 'active text-cyan-400' : 'text-white/80'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault()
                navigate('contact')
              }}
              className="btn-primary px-5 py-2.5 rounded-full text-sm inline-block"
            >
              Get a Free Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Interactive Cybernetic Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden overflow-y-auto">
          {/* Backdrop blur with soft glow */}
          <div
            className="fixed inset-0 bg-[#070B14]/95 backdrop-blur-2xl transition-opacity animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative min-h-full flex flex-col p-6 z-10 animate-fadeUp">
            {/* Header row inside drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('home')
                }}
                className="flex items-center gap-3"
              >
                <img src={getLogoSrc()} alt="Snaiotech" className="w-8 h-8 object-contain" />
                <span className="font-bold text-lg tracking-tight gradient-text" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Snaiotech
                </span>
              </a>
              <button
                type="button"
                className="w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2" aria-label="Mobile Navigation">
              {/* Home */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('home')
                }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${currentPage === 'home' ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-semibold' : 'glass border border-white/5 text-white/85 hover:bg-white/10'}`}
              >
                <span className="text-base font-medium">Home</span>
                <span className="text-xs font-mono text-white/30">00</span>
              </a>

              {/* Interactive Services Section with Accordion */}
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 transition-all text-left ${['webdev', 'pdf', 'zoho'].includes(currentPage) ? 'text-cyan-300 font-semibold' : 'text-white/85'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-base font-medium">Services</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                      03 Solutions
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 bg-cyan-400/20 text-cyan-300' : 'text-white/60'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </button>

                {mobileServicesOpen && (
                  <div className="p-3 pt-0 flex flex-col gap-2.5 animate-fadeIn">
                    {SERVICES.map((s, idx) => (
                      <a
                        key={s.id}
                        href={getPathForPage(s.id)}
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(s.id)
                        }}
                        className={`group relative flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${currentPage === s.id ? 'bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_20px_rgba(0,180,216,0.2)]' : 'bg-[#0B1526]/80 border-white/10 hover:border-cyan-400/30'}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                          {s.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                              {s.label}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-400/60">0{idx + 1}</span>
                          </div>
                          <p className="text-[11px] text-white/55 leading-relaxed line-clamp-2">
                            {s.desc}
                          </p>
                        </div>
                        <span className="text-xs text-cyan-400/60 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Navigation Items */}
              {NAV_ITEMS.slice(1).map((item, idx) => (
                <a
                  key={item.id}
                  href={getPathForPage(item.id)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(item.id)
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${currentPage === item.id ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-semibold' : 'glass border border-white/5 text-white/85 hover:bg-white/10'}`}
                >
                  <span className="text-base font-medium">{item.label}</span>
                  <span className="text-xs font-mono text-white/30">0{idx + 4}</span>
                </a>
              ))}
            </nav>

            {/* Quick Action Contacts & Consultation */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('contact')
                }}
                className="btn-primary w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,180,216,0.3)]"
              >
                <span>Get a Free Consultation</span>
                <span>→</span>
              </a>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href="tel:+919585010283"
                  className="p-3 rounded-xl glass border border-white/10 flex flex-col items-center justify-center text-center text-white/70 hover:text-white hover:border-cyan-400/40 transition-colors"
                >
                  <span className="text-[10px] text-cyan-400">Call Engineering</span>
                  <span className="truncate">+91 95850 10283</span>
                </a>
                <a
                  href="mailto:Info@snaiotech.com"
                  className="p-3 rounded-xl glass border border-white/10 flex flex-col items-center justify-center text-center text-white/70 hover:text-white hover:border-cyan-400/40 transition-colors"
                >
                  <span className="text-[10px] text-cyan-400">Direct Email</span>
                  <span className="truncate">Info@snaiotech.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

