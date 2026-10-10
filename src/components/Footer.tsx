import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react'

const defaultLogoSrc = 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo'

const getLogoSrc = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return defaultLogoSrc
    return JSON.parse(localStorage.getItem('snaiotech-site-settings') || '{}').logoUrl || defaultLogoSrc
  } catch {
    return defaultLogoSrc
  }
}

const MARQUEE_ITEMS = [
  'WCAG 2.2 AA',
  'PDF Accessibility',
  'Zoho Implementation',
  'Web Development',
  'SEO · AEO · GEO',
  'Digital work that works for everyone',
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/snaiotech/',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17.5 6.5h.01',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/snaiotech',
    path: 'M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/snaiotech/',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
]

const SERVICE_LINKS = [
  { label: 'PDF Accessibility', page: 'pdf', path: '/pdf' },
  { label: 'WCAG Compliance', page: 'pdf', path: '/pdf' },
  { label: 'Zoho Implementation', page: 'zoho', path: '/zoho' },
  { label: 'CRM Automation', page: 'zoho', path: '/zoho' },
  { label: 'Web Development', page: 'webdev', path: '/webdev' },
  { label: 'SEO, AEO & GEO', page: 'webdev', path: '/webdev' },
]

const COMPANY_LINKS = [
  { label: 'About SNAiO Tech', page: 'about', path: '/about' },
  { label: 'Insights & Blog', page: 'blog', path: '/blog' },
  { label: 'Contact', page: 'contact', path: '/contact' },
]

interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)
  const pointerRef = useRef({ x: 0, y: 0, u: 0.58, inside: false })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    let visible = false
    let frame = 0
    let last = performance.now()
    let time = last / 1000
    let beam = 58
    let glow = 0
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setGlow = () => {
      footer.style.setProperty('--sn-footer-glow', pointerRef.current.inside ? '1' : '0')
      footer.style.setProperty('--sn-footer-pointer-x', `${pointerRef.current.x}px`)
      footer.style.setProperty('--sn-footer-pointer-y', `${pointerRef.current.y}px`)
    }

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      time += dt
      const pointer = pointerRef.current
      const drift = 58 + 9 * (0.7 * Math.sin(time * 0.21) + 0.3 * Math.sin(time * 0.077 + 1.3))
      const target = pointer.inside && !motionQuery.matches ? pointer.u * 72 + drift * 0.28 : drift
      const ease = 1 - Math.pow(0.965, dt * 60)
      beam += (target - beam) * ease
      glow += ((pointer.inside ? 1 : 0) - glow) * (1 - Math.pow(0.92, dt * 60))
      footer.style.setProperty('--sn-footer-beam', `${beam}%`)
      footer.style.setProperty('--sn-footer-glow', glow.toFixed(3))
      footer.style.setProperty('--sn-footer-pointer-x', `${pointer.x}px`)
      footer.style.setProperty('--sn-footer-pointer-y', `${pointer.y}px`)
      frame = window.requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        setSeen(true)
        if (!motionQuery.matches && !frame) {
          last = performance.now()
          frame = window.requestAnimationFrame(animate)
        }
      } else if (frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    }, { threshold: 0.08 })

    const onMotionChange = () => {
      if (motionQuery.matches && frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
        footer.style.setProperty('--sn-footer-beam', '58%')
        setGlow()
      } else if (!motionQuery.matches && visible && !frame) {
        last = performance.now()
        frame = window.requestAnimationFrame(animate)
      }
    }

    observer.observe(footer)
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      observer.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navigate = (page: string) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    pointerRef.current = {
      x,
      y,
      u: rect.width ? x / rect.width : 0.58,
      inside: true,
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.currentTarget.style.setProperty('--sn-footer-pointer-x', `${x}px`)
      event.currentTarget.style.setProperty('--sn-footer-pointer-y', `${y}px`)
      event.currentTarget.style.setProperty('--sn-footer-glow', '1')
    }
  }

  const onPointerLeave = () => {
    pointerRef.current.inside = false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      footerRef.current?.style.setProperty('--sn-footer-glow', '0')
    }
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  const hopLetter = (event: MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const letter = event.currentTarget
    letter.classList.remove('sn-footer__letter--hop')
    void letter.offsetWidth
    letter.classList.add('sn-footer__letter--hop')
  }

  return (
    <>
      <div className="sn-footer__marquee" aria-label="SNAiO Tech services">
        <div className="sn-footer__marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="sn-footer__marquee-group" key={copy}>
              {MARQUEE_ITEMS.map((item) => (
                <span className="sn-footer__marquee-item" key={`${copy}-${item}`}>
                  <span className="sn-footer__marquee-dot" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="sr-only">{MARQUEE_ITEMS.join(' · ')}</span>
      </div>

      <footer
        ref={footerRef}
        className="sn-footer"
        data-seen={seen ? 'true' : 'false'}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="sn-footer__beam" aria-hidden="true" />
        <div className="sn-footer__glow" aria-hidden="true" />
        <div className="sn-footer__grain" aria-hidden="true" />

        <div className="sn-footer__inner">
          <div className="sn-footer__grid">
            <section className="sn-footer__brand">
              <p className="sn-footer__label">© {new Date().getFullYear()} SNAiO Tech</p>
              <button onClick={() => navigate('home')} className="sn-footer__logo" aria-label="SNAiO Tech home">
                <img src={getLogoSrc()} alt="" />
                <span>SNAiO <b>Tech</b></span>
              </button>
              <p className="sn-footer__tagline">Digital work that works for everyone.</p>
              <p className="sn-footer__description">
                Thoughtful digital solutions for accessible documents, connected systems, and websites built to be found.
              </p>
              <ul className="sn-footer__socials" aria-label="Social media">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="sn-footer__social">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={social.path} />
                      </svg>
                      <span>{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <nav className="sn-footer__column" aria-label="Services">
              <p className="sn-footer__label">What we do</p>
              <ul>
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      className="sn-footer__link"
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(link.page)
                      }}
                    >
                      <span>{link.label}</span>
                      <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 9.5l7-7M4 2.5h5.5V8" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="sn-footer__column" aria-label="Company">
              <p className="sn-footer__label">Explore</p>
              <ul>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      className="sn-footer__link"
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(link.page)
                      }}
                    >
                      <span>{link.label}</span>
                      <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 9.5l7-7M4 2.5h5.5V8" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <section className="sn-footer__column sn-footer__contact">
              <p className="sn-footer__label">Get in touch</p>
              <a className="sn-footer__contact-link" href="mailto:Info@snaiotech.com">
                <span className="sn-footer__contact-icon" aria-hidden="true">@</span>
                Info@snaiotech.com
              </a>
              <a className="sn-footer__contact-link" href="tel:+919585010283">
                <span className="sn-footer__contact-icon" aria-hidden="true">+</span>
                +91 95850 10283
              </a>
              <p className="sn-footer__location">Choolaimedu, Chennai - 600094</p>
              <a
                className="sn-footer__contact-cta inline-flex items-center gap-2"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('contact')
                }}
              >
                Start a conversation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </section>
          </div>

          <div className="sn-footer__bottom">
            <span>© {new Date().getFullYear()} SNAiO Tech. All rights reserved.</span>
            <span>Built with care in Chennai, India</span>
          </div>
        </div>

        <div className="sn-footer__wordmark" aria-label="SNAiO Tech">
          <span className="sr-only">SNAiO Tech</span>
          <div className="sn-footer__wordmark-inner" aria-hidden="true">
            {Array.from('SNAIOTECH').map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="sn-footer__letter-wrap"
                style={{
                  '--sn-letter-index': index,
                  '--sn-letter-position': `${index * 12.5}%`,
                } as CSSProperties}
              >
                <span className="sn-footer__letter" onClick={hopLetter} onAnimationEnd={(event) => event.currentTarget.classList.remove('sn-footer__letter--hop')}>
                  {letter}
                </span>
              </span>
            ))}
          </div>
        </div>
      </footer>

      <button onClick={scrollToTop} className="sn-footer__to-top" aria-label={`Back to top, ${Math.round(scrollProgress)}% page progress`}>
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(0,180,216,0.2)" strokeWidth="2" />
          <circle
            cx="18" cy="18" r={radius}
            fill="none"
            stroke="#00B4D8"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 14 6-6 6 6" />
        </svg>
      </button>
    </>
  )
}
