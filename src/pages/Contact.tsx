import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { supabase } from '@/lib/supabase'

interface ContactProps { onNavigate: (page: string) => void }

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/snaiotech/',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17.5 6.5h.01',
    color: '#E1306C',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/snaiotech',
    path: 'M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z',
    color: '#1877F2',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/snaiotech/',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    color: '#0A66C2',
  },
  {
    label: 'Email',
    href: 'mailto:Info@snaiotech.com',
    path: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
    color: '#00B4D8',
  },
]

export default function Contact({ onNavigate }: ContactProps) {
  const { ref: formRef, visible: formVis } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || 'Unable to send your message right now.')
      }

      if (supabase) {
        const { error: databaseError } = await supabase.from('submissions').insert(form)
        if (databaseError) console.warn('Supabase insert failed:', databaseError.message)
      }
      setSent(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your message right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="gradient-mesh grid-overlay pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-fadeUp">
            <p className="eyebrow mb-3">Let's work together</p>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Contact <span className="gradient-text">Snaiotech</span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl">
              Every engagement starts with an honest conversation. No pitch deck, no pressure — just a direct discussion about your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16 pb-28 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={formRef as React.RefObject<HTMLDivElement>}>
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className={`lg:col-span-3 reveal-left ${formVis ? 'visible' : ''}`}>
                <div className="glass rounded-2xl p-8">
                  {sent ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow" style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.4)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5" className="w-7 h-7">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Message sent!</h3>
                      <p className="text-white/55 text-sm mb-8">We'll be in touch within one business day. In the meantime, feel free to explore our services.</p>
                      <button
                        onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
                        className="btn-ghost px-6 py-2.5 rounded-full text-sm"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div>
                        <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Get in touch</h2>
                        <p className="text-white/45 text-sm">We respond within one business day.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="relative" style={{ isolation: 'isolate' }}>
                          <label
                            htmlFor="contact-name"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none select-none ${
                              focused === 'name' || form.name
                                ? 'top-2 text-xs text-cyan-400'
                                : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif', zIndex: 3 }}
                          >
                            Your name *
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            value={form.name}
                            autoComplete="name"
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            onChange={handleChange('name')}
                            className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm caret-cyan-300"
                            required
                            style={{ zIndex: 1 }}
                          />
                        </div>

                        {/* Email */}
                        <div className="relative" style={{ isolation: 'isolate' }}>
                          <label
                            htmlFor="contact-email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none select-none ${
                              focused === 'email' || form.email
                                ? 'top-2 text-xs text-cyan-400'
                                : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif', zIndex: 3 }}
                          >
                            Email address *
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={form.email}
                            autoComplete="email"
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            onChange={handleChange('email')}
                            className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm caret-cyan-300"
                            required
                            style={{ zIndex: 1 }}
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="relative" style={{ isolation: 'isolate' }}>
                        <label
                          htmlFor="contact-company"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none select-none ${
                            focused === 'company' || form.company
                              ? 'top-2 text-xs text-cyan-400'
                              : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', zIndex: 3 }}
                        >
                          Company / Organization
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          value={form.company}
                          autoComplete="organization"
                          onFocus={() => setFocused('company')}
                          onBlur={() => setFocused(null)}
                          onChange={handleChange('company')}
                          className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm caret-cyan-300"
                          style={{ zIndex: 1 }}
                        />
                      </div>

                      {/* Service select */}
                      <div className="relative" style={{ isolation: 'isolate' }}>
                        <label
                          htmlFor="contact-service"
                          className={`absolute left-4 pointer-events-none select-none transition-all duration-200 ${
                            form.service ? 'top-2 text-xs text-cyan-400' : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
                          }`}
                          style={{ zIndex: 3 }}
                        >
                          Service of interest
                        </label>
                        <select
                          id="contact-service"
                          name="service"
                          value={form.service}
                          onChange={handleChange('service')}
                          className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm appearance-none"
                          style={{ background: 'rgba(255,255,255,0.04)', zIndex: 1 }}
                        >
                          <option value="" style={{ background: '#0d1829' }}></option>
                          <option value="webdev" style={{ background: '#0d1829' }}>Web Dev &amp; SEO/AEO/GEO</option>
                          <option value="pdf" style={{ background: '#0d1829' }}>PDF Accessibility &amp; WCAG</option>
                          <option value="zoho" style={{ background: '#0d1829' }}>Zoho Deployment &amp; Customization</option>
                          <option value="multiple" style={{ background: '#0d1829' }}>Multiple services</option>
                          <option value="other" style={{ background: '#0d1829' }}>Not sure yet</option>
                        </select>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" style={{ zIndex: 4 }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>

                      {/* Message */}
                      <div className="relative" style={{ isolation: 'isolate' }}>
                        <label
                          htmlFor="contact-message"
                          className={`absolute left-4 pointer-events-none select-none transition-all duration-200 ${
                            focused === 'message' || form.message ? 'top-2 text-xs text-cyan-400' : 'top-4 text-sm text-white/40'
                          }`}
                          style={{ zIndex: 3 }}
                        >
                          Tell us about your project *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={form.message}
                          autoComplete="off"
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          onChange={handleChange('message')}
                          className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm resize-none caret-cyan-300"
                          required
                          style={{ zIndex: 1 }}
                        />
                      </div>

                      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}

                      <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 rounded-xl text-sm disabled:cursor-wait disabled:opacity-70">
                        {submitting ? 'Sending…' : 'Send message'}
                      </button>

                      <p className="text-center text-xs text-white/30">
                        By submitting, you agree to our Privacy Policy. We never share your data.
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact info */}
              <div className={`lg:col-span-2 space-y-5 reveal-right ${formVis ? 'visible' : ''}`}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Contact information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z', label: 'Email', val: 'Info@snaiotech.com', href: 'mailto:Info@snaiotech.com' },
                      { icon: 'M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', val: '+91 95850 10283', href: 'tel:+919585010283' },
                      { icon: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', label: 'Address', val: 'Choolaimedu, Chennai - 600094', href: 'https://maps.google.com/?q=Choolaimedu+Chennai' },
                    ].map((item) => (
                      <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-start gap-3 group no-underline">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.2)' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.8" className="w-4 h-4">
                            <path d={item.icon}/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-white/35 mb-0.5">{item.label}</div>
                          <div className="text-sm text-white/80 group-hover:text-cyan-300 transition-colors">{item.val}</div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <p className="text-xs text-white/35 mb-3">Follow us</p>
                    <div className="flex gap-2">
                      {SOCIALS.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target={social.href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noreferrer"
                          aria-label={social.label}
                          title={social.label}
                          className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                          style={{ '--hover-color': social.color } as React.CSSProperties}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = social.color; (e.currentTarget as HTMLElement).style.borderColor = social.color + '50' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; (e.currentTarget as HTMLElement).style.borderColor = '' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                            <path d={social.path}/>
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Office hours</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM IST' },
                      { day: 'Saturday', hours: '10:00 AM – 2:00 PM IST' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-white/55">{h.day}</span>
                        <span className="text-white/80">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400">Available now</span>
                  </div>
                </div>

                <div className="glass-blue rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Not sure where to start?</h3>
                  <p className="text-white/55 text-sm mb-4">Browse our services or read our blog to get a feel for how we think before reaching out.</p>
                  <div className="flex gap-3">
                    <button onClick={() => onNavigate('webdev')} className="btn-ghost px-4 py-2 rounded-lg text-xs flex-1">
                      Services
                    </button>
                    <button onClick={() => onNavigate('blog')} className="btn-ghost px-4 py-2 rounded-lg text-xs flex-1">
                      Blog
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
