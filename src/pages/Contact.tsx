import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface ContactProps { onNavigate: (page: string) => void }

export default function Contact({ onNavigate }: ContactProps) {
  const { ref: formRef, visible: formVis } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const Field = ({
    name, label, type = 'text', required = false
  }: {
    name: keyof typeof form; label: string; type?: string; required?: boolean
  }) => (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          focused === name || form[name]
            ? 'top-2 text-xs text-cyan-400'
            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
        }`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        value={form[name]}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm"
        required={required}
      />
    </div>
  )

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
                      <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }} className="btn-ghost px-6 py-2.5 rounded-full text-sm">
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Get in touch</h2>
                        <p className="text-white/45 text-sm">We respond within one business day.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field name="name" label="Your name" required />
                        <Field name="email" label="Email address" type="email" required />
                      </div>
                      <Field name="company" label="Company / Organization" />

                      {/* Service select */}
                      <div className="relative">
                        <label className={`absolute left-4 pointer-events-none transition-all duration-200 z-10 ${form.service ? 'top-2 text-xs text-cyan-400' : 'top-1/2 -translate-y-1/2 text-sm text-white/40'}`}>
                          Service of interest
                        </label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm appearance-none cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          <option value="" style={{ background: '#0d1829' }}></option>
                          <option value="webdev" style={{ background: '#0d1829' }}>Web Dev & SEO/AEO/GEO</option>
                          <option value="pdf" style={{ background: '#0d1829' }}>PDF Accessibility & WCAG</option>
                          <option value="zoho" style={{ background: '#0d1829' }}>Zoho Deployment & Customization</option>
                          <option value="multiple" style={{ background: '#0d1829' }}>Multiple services</option>
                          <option value="other" style={{ background: '#0d1829' }}>Not sure yet</option>
                        </select>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <label className={`absolute left-4 pointer-events-none transition-all duration-200 ${focused === 'message' || form.message ? 'top-2 text-xs text-cyan-400' : 'top-4 text-sm text-white/40'}`}>
                          Tell us about your project *
                        </label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="glass-input w-full rounded-xl px-4 pt-7 pb-3 text-sm resize-none"
                          required
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full py-3.5 rounded-xl text-sm">
                        Send message
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
                      { icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z', label: 'Email', val: 'Info@snaiotech.com' },
                      { icon: 'M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', val: '+91 95850 10283' },
                      { icon: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', label: 'Address', val: 'Choolaimedu, Chennai - 600094' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.2)' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.8" className="w-4 h-4">
                            <path d={item.icon}/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-white/35 mb-0.5">{item.label}</div>
                          <div className="text-sm text-white/80">{item.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Office hours</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM EST' },
                      { day: 'Saturday', hours: '10:00 AM – 2:00 PM EST' },
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
