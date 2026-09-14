import { useState, useEffect, useRef } from 'react'
const logoSrc = 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo'

const NAV_ITEMS = ['Home', 'About', 'Blog', 'Contact']

const SERVICES = [
  {
    id: 'webdev',
    label: 'Web Dev & SEO/AEO/GEO',
    desc: 'Custom websites, apps, and next-gen search visibility.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id: 'pdf',
    label: 'PDF Accessibility & WCAG',
    desc: 'ADA-compliant documents and accessibility audits.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 'zoho',
    label: 'Zoho Deployment & Customization',
    desc: 'Implementation, automation, and custom integrations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
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
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? 'rgba(10,14,26,0.82)'
            : 'rgba(10,14,26,0.4)',
          backdropFilter: scrolled ? 'blur(28px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'blur(12px)',
          borderBottom: scrolled
            ? '1px solid rgba(0,180,216,0.18)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
          padding: scrolled ? '10px 0' : '18px 0',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group"
          >
            <img
              src={logoSrc}
              alt="SNAiO Tech logo"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="font-bold text-xl tracking-tight gradient-text"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Snaiotech
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                onClick={() => navigate('home')}
                className={`nav-link text-sm font-medium ${currentPage === 'home' ? 'active text-cyan-400' : 'text-white/80'}`}
              >
                Home
              </button>
            </li>

            {/* Services dropdown */}
            <li className="relative" ref={dropRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
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
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 glass-strong rounded-2xl p-2 shadow-2xl animate-fadeIn">
                  <div className="px-3 pt-2 pb-1">
                    <p className="eyebrow text-xs mb-2">What we do</p>
                  </div>
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(s.id)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white/90" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                          {s.label}
                        </div>
                        <div className="text-xs text-white/50 mt-0.5">{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </li>

            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item}>
                <button
                  onClick={() => navigate(item.toLowerCase())}
                  className={`nav-link text-sm font-medium ${currentPage === item.toLowerCase() ? 'active text-cyan-400' : 'text-white/80'}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('contact')}
              className="btn-primary px-5 py-2.5 rounded-full text-sm"
            >
              Get a Free Consultation
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-20 md:hidden">
          <div
            className="absolute inset-0 bg-[#0A0E1A]/90"
            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative glass-strong mx-4 mt-2 rounded-2xl p-6 animate-fadeUp">
            <nav className="flex flex-col gap-1">
              <button onClick={() => navigate('home')} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium text-white/90 transition-colors">Home</button>

              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium text-white/90 transition-colors flex items-center justify-between"
              >
                Services
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {SERVICES.map((s) => (
                    <button key={s.id} onClick={() => navigate(s.id)} className="text-left px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-cyan-300 transition-colors flex items-center gap-2">
                      <span className="text-cyan-400">{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              )}

              {NAV_ITEMS.slice(1).map((item) => (
                <button key={item} onClick={() => navigate(item.toLowerCase())} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium text-white/90 transition-colors">
                  {item}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10">
                <button onClick={() => navigate('contact')} className="btn-primary w-full py-3 rounded-xl text-sm">
                  Get a Free Consultation
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
