import { useState, useRef, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useCountUp } from '@/hooks/useCountUp'

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

// ── Animated particle network ─────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight
    const particles: P[] = []

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * W(), y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.5, a: Math.random() * 0.5 + 0.2,
      })
    }

    let hubs = [
      { x: W() * 0.2, y: H() * 0.3, phase: 0 },
      { x: W() * 0.75, y: H() * 0.5, phase: Math.PI },
      { x: W() * 0.5, y: H() * 0.75, phase: Math.PI / 2 },
    ]

    let raf: number
    let t = 0

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, W(), H())

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -20) p.x = W() + 20
        if (p.x > W() + 20) p.x = -20
        if (p.y < -20) p.y = H() + 20
        if (p.y > H() + 20) p.y = -20
      }

      // particle-particle links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,180,216,${(1 - d / 100) * 0.16})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // hub nodes
      for (const hub of hubs) {
        hub.x += Math.sin(t * 0.5 + hub.phase) * 0.28
        hub.y += Math.cos(t * 0.4 + hub.phase) * 0.22
        const pulse = (Math.sin(t * 2 + hub.phase) + 1) / 2

        for (const p of particles) {
          const d = Math.hypot(hub.x - p.x, hub.y - p.y)
          if (d < 170) {
            ctx.beginPath()
            ctx.moveTo(hub.x, hub.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(47,211,232,${(1 - d / 170) * 0.32})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        const gr = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 22 + pulse * 8)
        gr.addColorStop(0, `rgba(0,180,216,${0.55 + pulse * 0.25})`)
        gr.addColorStop(1, 'rgba(0,180,216,0)')
        ctx.beginPath(); ctx.arc(hub.x, hub.y, 22 + pulse * 8, 0, Math.PI * 2)
        ctx.fillStyle = gr; ctx.fill()

        ctx.beginPath(); ctx.arc(hub.x, hub.y, 3.5 + pulse, 0, Math.PI * 2)
        ctx.fillStyle = '#2FD3E8'; ctx.fill()
      }

      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,180,216,${p.a})`; ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />
}

// ── Card tilt ────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `perspective(900px) rotateX(${-(y / r.height) * 9}deg) rotateY(${(x / r.width) * 9}deg) translateZ(8px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`card-tilt transition-transform duration-200 ${className}`}>{children}</div>
}

// ── Stat counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, label, suffix = '', start }: { value: number; label: string; suffix?: string; start: boolean }) {
  const count = useCountUp(value, 2200, start)
  return (
    <div className="neumorph rounded-2xl p-6 text-center">
      <div className="text-4xl font-black gradient-text mb-1 stat-num">{count.toLocaleString()}{suffix}</div>
      <div className="text-xs text-white/45 leading-snug" style={{ fontFamily: 'Space Mono, monospace' }}>{label}</div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface HomeProps { onNavigate: (page: string) => void }

export default function Home({ onNavigate }: HomeProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 22, y: (e.clientY / window.innerHeight - 0.5) * 14 })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const { ref: servicesRef, visible: servicesVisible } = useReveal()
  const { ref: statsRef, visible: statsVisible } = useReveal()
  const { ref: processRef, visible: processVisible } = useReveal()
  const { ref: blogRef, visible: blogVisible } = useReveal()
  const { ref: ctaRef, visible: ctaVisible } = useReveal()

  const steps = [
    { n: '01', title: 'Discovery Call', desc: 'We audit your current state, goals, and gaps in a focused 60-minute session.', imgId: '1556761175-b413da4baf72' },
    { n: '02', title: 'Strategy & Scope', desc: 'A tailored roadmap with clear deliverables, timeline, and measurable KPIs.', imgId: '1551288049-bebda4e38f71' },
    { n: '03', title: 'Build & Implement', desc: 'Our engineers execute with precision — no handoffs, no surprises.', imgId: '1515879218367-8466d910aaa4' },
    { n: '04', title: 'Test & Refine', desc: 'QA across devices, browsers, and accessibility standards before go-live.', imgId: '1778873750399-338b94f7feda' },
    { n: '05', title: 'Launch & Grow', desc: 'We stay on as partners — monitoring, optimizing, and scaling with you.', imgId: '1572021335469-31706a17aaef' },
  ]

  const techItems = ['React', 'Next.js', 'Zoho CRM', 'Zoho Books', 'Zoho Desk', 'Figma', 'TypeScript', 'Python', 'WordPress', 'Webflow', 'PostgreSQL', 'AWS', 'Zoho Analytics', 'WCAG 2.2', 'PDF/UA', 'Google Search Console', 'Semrush']

  const posts = [
    { cat: 'SEO/AI', date: 'Sep 2, 2026', title: 'What is GEO? How to Rank in AI-Generated Search Results', excerpt: "Generative Engine Optimization is the new frontier. Here's what it means and how to prepare your content.", imgId: '1686061593213-98dad7c599b9', readTime: '7 min' },
    { cat: 'Accessibility', date: 'Aug 28, 2026', title: 'WCAG 2.2 — What Changed and Why It Matters for Your Business', excerpt: 'The latest WCAG update brings 9 new success criteria. We break down each with practical remediation steps.', imgId: '1778873750399-338b94f7feda', readTime: '10 min' },
    { cat: 'Zoho', date: 'Aug 20, 2026', title: 'Zoho CRM vs Salesforce: The 2026 Honest Comparison', excerpt: "We've implemented both. Here's what teams actually experience, and when Zoho wins on value.", imgId: '1551288049-bebda4e38f71', readTime: '12 min' },
  ]

  const BG_OVERLAY = { background: 'linear-gradient(to bottom, rgba(10,14,26,0.15), rgba(10,14,26,0.88))' }

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden" style={{ background: '#050912' }}>
        <ParticleCanvas />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(21,101,192,0.14) 0%, transparent 70%), rgba(5,9,18,0.5)' }} />
        <div className="absolute inset-0 grid-overlay opacity-35 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span className="eyebrow">Global · Dev · Automation</span>
              </div>
              <h1 className="text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-extrabold leading-[0.95] mb-6 display-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Digital services{' '}
                <em className="gradient-text not-italic block">built to dominate.</em>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
                From custom web applications to WCAG-compliant PDFs and enterprise Zoho implementations — Snaiotech delivers with precision, not promises.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button onClick={() => onNavigate('contact')} className="btn-primary px-7 py-3.5 rounded-full text-sm">Get a Free Consultation</button>
                <button onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                  Explore Services <IconArrow />
                </button>
              </div>
              <div className="flex flex-wrap gap-8">
                {[{ val: '3', label: 'Core Services' }, { val: '48h', label: 'Response SLA' }, { val: '100%', label: 'Transparent Pricing' }].map((b) => (
                  <div key={b.val}>
                    <div className="text-2xl font-black text-white stat-num">{b.val}</div>
                    <div className="text-xs text-white/35 mt-0.5" style={{ fontFamily: 'Space Mono, monospace' }}>{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating service cards with images */}
            <div className="relative h-[440px] lg:h-[520px] animate-fadeIn" style={{ animationDelay: '0.35s' }}>
              <div className="absolute w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.16), transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(24px)' }} />

              {[
                { id: 'webdev', imgId: '1611078489935-0cb964de46d6', icon: <IconGlobe className="w-4 h-4 text-white" />, title: 'Web Dev & SEO/AEO/GEO', desc: 'Rank everywhere — Google, AI engines, and beyond.', accent: '#1565C0', pos: 'top-0 left-0', animClass: 'animate-float', delay: '0s', dur: '7s', mx: 0.4, my: 0.35 },
                { id: 'pdf', imgId: '1778873750399-338b94f7feda', icon: <IconCode className="w-4 h-4 text-white" />, title: 'PDF Accessibility & WCAG', desc: 'ADA-compliant documents. Audit-ready in days.', accent: '#00B4D8', pos: 'top-36 right-0', animClass: 'animate-float-b', delay: '1.5s', dur: '9s', mx: -0.5, my: 0.55 },
                { id: 'zoho', imgId: '1551288049-bebda4e38f71', icon: <IconGear className="w-4 h-4 text-white" />, title: 'Zoho Deployment', desc: 'Implementation, automation, ongoing support.', accent: '#2FD3E8', pos: 'bottom-0 left-6', animClass: 'animate-float', delay: '3s', dur: '8s', mx: 0.3, my: -0.4 },
              ].map((card) => (
                <div
                  key={card.id}
                  className={`absolute w-[248px] glass rounded-2xl overflow-hidden shadow-2xl ${card.animClass} ${card.pos}`}
                  style={{ animationDelay: card.delay, animationDuration: card.dur, transform: `translate(${mouse.x * card.mx}px, ${mouse.y * card.my}px)` }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <img src={img(card.imgId, 496, 224)} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(10,14,26,0.2), rgba(10,14,26,0.86))` }} />
                    <div className="absolute top-2.5 left-3 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${card.accent}bb` }}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{card.title}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35">
          <span className="eyebrow text-white/30">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </section>

      {/* ── SERVICES — asymmetric grid ─────────────────────────────────── */}
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

            <div className={`grid lg:grid-cols-5 gap-5 stagger ${servicesVisible ? 'visible' : ''}`}>
              {/* Hero card — 3 cols */}
              <TiltCard className="lg:col-span-3">
                <div className="glass rounded-2xl overflow-hidden h-full min-h-[380px] flex flex-col group hover:border-blue-500/30 transition-colors duration-300 cursor-pointer" onClick={() => onNavigate('webdev')}>
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <img src={img('1515879218367-8466d910aaa4', 800, 416)} alt="Code on screen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,79,138,0.35), rgba(10,14,26,0.92))' }} />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(21,101,192,0.7)', border: '1px solid rgba(0,180,216,0.4)' }}>
                        <IconGlobe className="w-5 h-5 text-cyan-300" />
                      </div>
                      <span className="eyebrow px-2.5 py-1 rounded-full" style={{ background: 'rgba(21,101,192,0.4)', border: '1px solid rgba(0,180,216,0.3)' }}>Service 01</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-extrabold text-white mb-3 display-close" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Web Dev & SEO / AEO / GEO</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">Custom websites and web applications built for performance, with technical SEO, Answer Engine Optimization for voice/AI, and Generative Engine Optimization for AI-generated search.</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-6">
                      {['Custom apps', 'Core Web Vitals', 'AEO strategy', 'Schema markup'].map((f) => (
                        <span key={f} className="flex items-center gap-1.5 text-xs text-white/60"><span className="text-blue-400"><IconCheck className="w-3 h-3" /></span> {f}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      Learn more <IconArrow />
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Two stacked cards — 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {[
                  { id: 'pdf', n: '02', imgId: '1772588627342-5ec373e236d8', accent: '#00B4D8', icon: <IconCode className="w-4 h-4 text-cyan-300" />, title: 'PDF Accessibility & WCAG', desc: 'Make your documents ADA, Section 508, and WCAG 2.2 compliant. Audits, remediation, and certification.', features: ['PDF remediation', 'WCAG audits', 'ADA compliance'] },
                  { id: 'zoho', n: '03', imgId: '1560472354-b33ff0c44a43', accent: '#2FD3E8', icon: <IconGear className="w-4 h-4 text-cyan-300" />, title: 'Zoho Deployment & Customization', desc: "Got Zoho? We implement, automate, and customize across the full suite so your team actually uses it.", features: ['Full deployment', 'Workflow automation', 'Custom integrations'] },
                ].map((s) => (
                  <TiltCard key={s.id} className="flex-1">
                    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group hover:border-cyan-500/30 transition-colors duration-300 cursor-pointer" onClick={() => onNavigate(s.id)}>
                      <div className="relative h-32 overflow-hidden flex-shrink-0">
                        <img src={img(s.imgId, 600, 256)} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0" style={BG_OVERLAY} />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.accent}44`, border: `1px solid ${s.accent}55` }}>{s.icon}</div>
                          <span className="eyebrow" style={{ color: s.accent }}>Service {s.n}</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-extrabold text-white mb-2 text-base leading-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{s.title}</h3>
                        <p className="text-white/45 text-xs leading-relaxed mb-4 flex-1">{s.desc}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {s.features.map((f) => (
                            <span key={f} className="text-xs text-white/50 flex items-center gap-1"><span style={{ color: s.accent }}><IconCheck className="w-3 h-3" /></span> {f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="py-24 gradient-mesh relative">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={statsRef as React.RefObject<HTMLDivElement>}>
            <div className={`grid lg:grid-cols-5 gap-12 items-start mb-14 reveal ${statsVisible ? 'visible' : ''}`}>
              <div className="lg:col-span-3">
                <p className="eyebrow mb-4">What we bring to the table</p>
                <h2 className="text-4xl lg:text-5xl font-extrabold display-snug mb-5" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Fresh start.{' '}<span className="gradient-text">Serious commitment.</span>
                </h2>
                <p className="text-white/50 text-base leading-relaxed max-w-lg">We're a brand-new company — and that means you get our full attention, sharp pricing, and a team that has everything to prove. No corporate layers, no handoffs, no excuses.</p>
              </div>
              <div className={`lg:col-span-2 grid grid-cols-2 gap-4 stagger ${statsVisible ? 'visible' : ''}`}>
                <StatCounter value={3} label="Specialised services" suffix="" start={statsVisible} />
                <StatCounter value={48} label="Hour response SLA" suffix="h" start={statsVisible} />
                <StatCounter value={100} label="Transparent pricing" suffix="%" start={statsVisible} />
                <StatCounter value={0} label="Hidden fees, ever" suffix="" start={statsVisible} />
              </div>
            </div>

            <div className={`grid md:grid-cols-3 gap-5 stagger ${statsVisible ? 'visible' : ''}`}>
              {[
                { icon: '🎯', title: 'Precision Engineering', desc: "We architect before we build. Every engagement starts with deep discovery to ensure the solution fits the problem." },
                { icon: '⚡', title: 'Fast, Reliable Delivery', desc: "48-hour response SLA and sprint-based delivery means you're never left waiting for progress updates." },
                { icon: '🔒', title: 'Compliance-First Mindset', desc: "Accessibility, security, and standards compliance aren't afterthoughts — they're baked into every build." },
                { icon: '🌍', title: 'Global Reach, Local Care', desc: "Remote-first team with global client success — yet every engagement feels like a boutique partnership." },
                { icon: '📈', title: 'Measurable ROI', desc: "We set KPIs before we start and report against them. No vanity metrics, no vague deliverables." },
                { icon: '🤝', title: 'Long-term Partnership', desc: "We don't ship and disappear. Post-launch support and growth planning are part of the deal." },
              ].map((vp) => (
                <div key={vp.title} className="glass rounded-2xl p-6 flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{vp.icon}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1.5 text-sm" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{vp.title}</h4>
                    <p className="text-white/45 text-xs leading-relaxed">{vp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS — with step images ─────────────────────────────────── */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={processRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-16 reveal ${processVisible ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Our process — <span className="gradient-text">no ambiguity.</span>
              </h2>
            </div>
            <div className={`grid md:grid-cols-5 gap-4 stagger ${processVisible ? 'visible' : ''}`}>
              {steps.map((step, i) => (
                <div key={step.n} className="relative">
                  {i < steps.length - 1 && <div className="hidden md:block absolute top-12 left-[62%] right-0 h-px bg-gradient-to-r from-cyan-500/30 to-transparent z-10" />}
                  <div className="neumorph rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative h-28 overflow-hidden flex-shrink-0">
                      <img src={img(step.imgId, 320, 224)} alt={step.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.1), rgba(13,24,41,0.92))' }} />
                      <span className="absolute bottom-2 left-3 text-2xl font-black stat-num gradient-text">{step.n}</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h4 className="font-bold text-white text-sm mb-1.5" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{step.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────────────────────── */}
      <section className="py-14 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center eyebrow text-white/35">Technologies & standards we work with</p>
        </div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techItems, ...techItems].map((item, i) => (
            <span key={i} className="mx-5 neumorph rounded-full px-5 py-2 text-sm text-white/55 font-medium flex-shrink-0" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{item}</span>
          ))}
        </div>
      </section>



      {/* ── BLOG — asymmetric 3+2 ──────────────────────────────────────── */}
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

            <div className={`grid lg:grid-cols-5 gap-5 stagger ${blogVisible ? 'visible' : ''}`}>
              <TiltCard className="lg:col-span-3">
                <button onClick={() => onNavigate('blog')} className="glass rounded-2xl overflow-hidden text-left flex flex-col h-full group w-full hover:border-cyan-500/25 transition-colors duration-200">
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img src={img(posts[0].imgId, 800, 448)} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={BG_OVERLAY} />
                    <span className="absolute top-4 left-4 eyebrow px-3 py-1 rounded-full" style={{ background: 'rgba(0,180,216,0.2)', border: '1px solid rgba(0,180,216,0.3)', color: '#2FD3E8' }}>{posts[0].cat}</span>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <span className="text-xs text-white/35 mb-2">{posts[0].date} · {posts[0].readTime} read</span>
                    <h3 className="font-bold text-white text-lg leading-snug mb-3 flex-1 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{posts[0].title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-5 text-cyan-400 text-sm font-semibold">Read article <IconArrow /></div>
                  </div>
                </button>
              </TiltCard>

              <div className="lg:col-span-2 flex flex-col gap-5">
                {posts.slice(1).map((post) => (
                  <TiltCard key={post.title} className="flex-1">
                    <button onClick={() => onNavigate('blog')} className="glass rounded-2xl overflow-hidden text-left flex flex-col h-full group w-full hover:border-cyan-500/25 transition-colors duration-200">
                      <div className="relative h-36 overflow-hidden flex-shrink-0">
                        <img src={img(post.imgId, 600, 288)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0" style={BG_OVERLAY} />
                        <span className="absolute top-3 left-3 eyebrow px-2.5 py-0.5 rounded-full text-xs" style={{ background: 'rgba(0,180,216,0.18)', border: '1px solid rgba(0,180,216,0.25)', color: '#2FD3E8' }}>{post.cat}</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-xs text-white/30 mb-2">{post.date} · {post.readTime} read</span>
                        <h3 className="font-bold text-white text-sm leading-snug flex-1 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{post.title}</h3>
                        <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-semibold">Read more <IconArrow className="w-3 h-3" /></div>
                      </div>
                    </button>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-cta" />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-12 animate-spin-slow"
          style={{ background: 'conic-gradient(from 0deg, #1565C0, #00B4D8, #1565C0)', filter: 'blur(80px)', top: '-30%', right: '-10%' }} />

        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className="max-w-4xl mx-auto px-6 text-center relative">
          <div className={`reveal ${ctaVisible ? 'visible' : ''}`}>
            <p className="eyebrow mb-4">Ready to get started?</p>
            <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 display-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Your competition is{' '}
              <em className="gradient-text not-italic">already moving.</em>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Book a free 60-minute strategy call. No pitch deck, no pressure — just honest diagnosis and a path forward.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => onNavigate('contact')} className="btn-primary px-8 py-4 rounded-full text-base">Get a Free Consultation</button>
              <button onClick={() => onNavigate('about')} className="btn-ghost px-8 py-4 rounded-full text-base">Learn about us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
