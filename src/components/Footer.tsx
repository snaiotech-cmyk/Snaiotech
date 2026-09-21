import { useState, useEffect } from 'react'
const defaultLogoSrc = 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo'
const getLogoSrc = () => {
  try { return JSON.parse(localStorage.getItem('snaiotech-site-settings') || '{}').logoUrl || defaultLogoSrc } catch { return defaultLogoSrc }
}
const MARQUEE_ITEMS = [
  'WCAG Compliant', 'SEO Optimized', 'AEO & GEO Ready',
  'Zoho Certified', 'ADA Section 508', 'Web Accessibility',
  'Custom Dev', 'CRM Automation', 'PDF Remediation',
  'Answer Engine Optimization', 'Generative Engine Optimization',
]

interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  const navigate = (page: string) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Marquee strip */}
      <div
        className="relative overflow-hidden py-4 border-y border-white/6"
        style={{ background: 'rgba(21,101,192,0.12)' }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-6">
              <span className="eyebrow text-cyan-300/80">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <footer className="gradient-cta relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00B4D8, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #1565C0, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand col */}
            <div className="lg:col-span-1">
              <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-4 group">
                <img src={getLogoSrc()} alt="Snaiotech" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xl gradient-text" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Snaiotech</span>
              </button>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Premium digital services for businesses that demand excellence — from global reach to accessible, compliant, and automated solutions.
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/snaiotech/', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17.5 6.5h.01' },
                  { label: 'Facebook', href: 'https://www.facebook.com/snaiotech', path: 'M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/snaiotech/', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <path d={social.path}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white/90 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Services</h4>
              <ul className="space-y-2.5">
                {[
                  ['webdev', 'Web Dev & SEO'],
                  ['webdev', 'AEO & GEO'],
                  ['pdf', 'PDF Accessibility'],
                  ['pdf', 'WCAG Compliance'],
                  ['zoho', 'Zoho Deployment'],
                  ['zoho', 'CRM Customization'],
                ].map(([page, label]) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(page)}
                      className="text-sm text-white/50 hover:text-cyan-300 transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white/90 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Company</h4>
              <ul className="space-y-2.5">
                {[
                  ['about', 'Who We Are'],
                  ['about', 'Our Mission'],
                  ['blog', 'Blog'],
                  ['contact', 'Careers'],
                  ['contact', 'Contact Us'],
                ].map(([page, label]) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(page)}
                      className="text-sm text-white/50 hover:text-cyan-300 transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white/90 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Get In Touch</h4>
              <div className="space-y-3">
                {[
                  { icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z', text: 'Info@snaiotech.com' },
                  { icon: 'M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+91 95850 10283' },
                  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z', text: 'Choolaimedu, Chennai - 600094' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5">
                      <path d={item.icon}/>
                    </svg>
                    <span className="text-sm text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} Snaiotech. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
                <button key={item} className="text-xs text-white/35 hover:text-cyan-400 transition-colors">
                  {item}
                </button>
              ))}
              <button onClick={() => navigate('admin')} className="text-xs text-white/35 hover:text-cyan-400 transition-colors">
                Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center glass-blue rounded-full hover:scale-110 transition-transform shadow-lg z-30 group"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 36 36" className="absolute w-12 h-12 -rotate-90">
            <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(0,180,216,0.2)" strokeWidth="2"/>
            <circle
              cx="18" cy="18" r={radius}
              fill="none"
              stroke="#00B4D8"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-cyan-400 relative z-10 group-hover:-translate-y-0.5 transition-transform">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </footer>
    </>
  )
}
