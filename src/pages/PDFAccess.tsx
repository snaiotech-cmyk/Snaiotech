import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ── Inline PDF document renderer ─────────────────────────────────────────────
function DocPreview({ doc }: { doc: typeof SAMPLES[0] }) {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Simulated document */}
      <div className="bg-white text-gray-800 min-h-full p-10 relative shadow-inner">
        {/* Tag overlay indicating accessibility */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {['H1', 'P', 'IMG', 'TABLE', 'LIST'].map((tag) => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: '#e8f4fd', color: '#1565C0', border: '1px solid #90caf9', fontSize: '9px' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Reading order indicator */}
        <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-blue-200 rounded" />
        <div className="absolute left-1.5 top-10 w-3 h-3 rounded-full bg-blue-400 flex items-center justify-center text-white" style={{ fontSize: '7px' }}>1</div>
        <div className="absolute left-1.5 top-24 w-3 h-3 rounded-full bg-blue-400 flex items-center justify-center text-white" style={{ fontSize: '7px' }}>2</div>
        <div className="absolute left-1.5 top-40 w-3 h-3 rounded-full bg-blue-400 flex items-center justify-center text-white" style={{ fontSize: '7px' }}>3</div>

        <div className="ml-4">
          {/* Doc header */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{doc.title}</h1>
            <p className="text-sm text-gray-500">{doc.org} · {doc.year}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#e8f4fd', color: '#1565C0' }}>
                Document language: English
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                Tagged PDF
              </span>
            </div>
          </div>

          {/* Body content */}
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Executive Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            This document has been remediated to meet <strong>WCAG 2.1 Level AA</strong> and <strong>PDF/UA-1 (ISO 14289-1)</strong> standards. All headings are properly tagged with H1–H6 structure. Images include descriptive alt text. Tables include header cells correctly associated with data cells. The reading order has been verified with assistive technology.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Form fields include descriptive labels. Color is not used as the sole means of conveying information. The document passes automated checking with PAC 3 and manual verification with NVDA and JAWS screen readers.
          </p>

          {/* Table example */}
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Compliance Matrix</h2>
          <table className="w-full text-sm border-collapse mb-6" role="table" aria-label="Compliance criteria status">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold" scope="col">Criteria</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold" scope="col">Standard</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {[['Document tagging', 'PDF/UA 7.1', 'Pass'], ['Reading order', 'WCAG 1.3.2', 'Pass'], ['Alt text', 'WCAG 1.1.1', 'Pass'], ['Color contrast', 'WCAG 1.4.3', 'Pass'], ['Form labels', 'WCAG 1.3.1', 'Pass']].map(([c, s, st]) => (
                <tr key={c}>
                  <td className="border border-gray-300 px-3 py-1.5">{c}</td>
                  <td className="border border-gray-300 px-3 py-1.5 text-gray-500">{s}</td>
                  <td className="border border-gray-300 px-3 py-1.5"><span className="text-green-700 font-medium">✓ {st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-green-50 border border-green-200 rounded p-4 text-sm text-green-800">
            <strong>Conformance Statement:</strong> This document conforms to WCAG 2.1 Level AA and PDF/UA-1. Remediation completed by Snaiotech · {doc.year}.
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ doc, onClose }: { doc: typeof SAMPLES[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,9,18,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col glass-strong rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1px solid rgba(0,180,216,0.2)' }}
      >
        {/* Lightbox header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-sm text-white/70 font-medium" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{doc.title}</span>
            <span className="eyebrow px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,180,216,0.15)', border: '1px solid rgba(0,180,216,0.3)', color: '#2FD3E8' }}>
              {doc.badge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-ghost px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
              onClick={() => alert('Download would start here — no real file in preview')}
            >
              <IconDownload /> Download
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <IconX />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2 flex items-center gap-4 border-b border-white/5 flex-shrink-0 bg-white/2">
          <span className="text-xs text-white/35" style={{ fontFamily: 'Space Mono, monospace' }}>Page 1 of {doc.pages}</span>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-white/35" style={{ fontFamily: 'Space Mono, monospace' }}>Tagged · Accessible · {doc.badge}</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-xs text-green-400" style={{ fontFamily: 'Space Mono, monospace' }}>Accessibility verified</span>
          </div>
        </div>

        {/* Document viewer */}
        <div className="flex-1 overflow-hidden" style={{ background: '#e5e7eb', minHeight: 0 }}>
          <DocPreview doc={doc} />
        </div>
      </div>
    </div>
  )
}

// ── Before/After toggle ──────────────────────────────────────────────────────
function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(true)
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Toggle bar */}
      <div className="flex border-b border-white/8">
        {[false, true].map((after) => (
          <button
            key={String(after)}
            onClick={() => setShowAfter(after)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${showAfter === after ? 'bg-cyan-500/15 text-cyan-300' : 'text-white/40 hover:text-white/60'}`}
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {after ? '✓ After — Remediated' : '✗ Before — Untagged'}
          </button>
        ))}
      </div>

      {/* Preview pane */}
      <div className="p-6">
        {showAfter ? (
          <div className="bg-white rounded-xl p-6 text-gray-800 text-sm relative" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="absolute top-2 right-2 flex gap-1">
              {['H1', 'P', 'IMG'].map(t => <span key={t} className="text-xs px-1 py-0.5 rounded font-mono" style={{ background: '#e8f4fd', color: '#1565C0', fontSize: '9px', border: '1px solid #90caf9' }}>{t}</span>)}
            </div>
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-200 rounded" />
            <div className="ml-3">
              <h2 className="text-base font-bold mb-2 text-blue-900">Annual Report 2025 <span className="text-xs text-green-600 font-normal ml-2">[Tagged H1]</span></h2>
              <p className="mb-3 text-gray-700 leading-relaxed">This report summarizes financial performance... <span className="text-xs text-green-600">[Alt: Chart showing revenue growth]</span></p>
              <div className="bg-blue-50 border border-blue-100 rounded p-2 text-xs text-blue-700">
                Screen reader: "Heading level 1: Annual Report 2025 — Paragraph: This report summarizes…"
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-6 text-gray-800 text-sm relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="absolute inset-0 bg-red-50/40" />
            <div className="relative">
              <p className="font-bold text-base mb-2">Annual Report 2025</p>
              <p className="mb-3 text-gray-700 leading-relaxed">[Image] This report summarizes financial performance...</p>
              <div className="bg-red-50 border border-red-200 rounded p-2 text-xs text-red-700">
                Screen reader: "Image — This report summar…" ⚠ No heading structure, no alt text, unordered reading
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sample remediation data ──────────────────────────────────────────────────
const SAMPLES = [
  { id: 1, title: 'Annual Report', org: 'Meridian Capital Group', year: '2025', badge: 'WCAG 2.1 AA', pages: 48, tag: 'Finance', imgId: '1778873750399-338b94f7feda', desc: 'Full remediation of 48-page annual report — tagged structure, alt text, table headers, and color contrast.' },
  { id: 2, title: 'Government Application Form', org: 'State Licensing Board', year: '2024', badge: 'Section 508', pages: 12, tag: 'Government', imgId: '1772588627342-5ec373e236d8', desc: 'Form fields labeled, tab order corrected, reading order verified. Passes PAC 3 and manual JAWS testing.' },
  { id: 3, title: 'University Student Handbook', org: 'Westbrook University', year: '2025', badge: 'PDF/UA', pages: 86, tag: 'Education', imgId: '1461749280684-dccba630e2f6', desc: 'Screen-reader optimized. Heading hierarchy, bookmarks, navigational links, and image alt text throughout.' },
  { id: 4, title: 'Medical Consent Form', org: 'Apex Health Network', year: '2026', badge: 'WCAG 2.2 AA', pages: 6, tag: 'Healthcare', imgId: '1542831371-29b0f74f9713', desc: 'Form labels, required field markup, error identification, and reading order for clinical consent workflow.' },
  { id: 5, title: 'Corporate Policy Manual', org: 'Strata Financial Partners', year: '2025', badge: 'ADA Title III', pages: 34, tag: 'Legal', imgId: '1515879218367-8466d910aaa4', desc: 'Tagged structure, cross-reference links, table of contents navigation, and full language declaration.' },
  { id: 6, title: 'Conference Proceedings', org: 'Digital Futures Institute', year: '2026', badge: 'WCAG 2.1 AA', pages: 120, tag: 'Academic', imgId: '1526628953301-3e589a6a8b74', desc: 'Complex multi-column layout reordered, figure captions linked to images, citation links active.' },
]

const TAG_COLORS: Record<string, string> = {
  Finance: '#1565C0', Government: '#0B4F8A', Education: '#00B4D8',
  Healthcare: '#2FD3E8', Legal: '#1565C0', Academic: '#00B4D8',
}

const FAQ_ITEMS = [
  { q: 'What is WCAG and who does it apply to?', a: "WCAG (Web Content Accessibility Guidelines) are published by the W3C and define how to make digital content accessible to people with disabilities. In the US, Section 508 of the Rehabilitation Act requires federal agencies and their contractors to comply. The ADA has been interpreted by courts to require digital accessibility for most public-facing businesses. WCAG 2.1 AA is the current de facto legal standard." },
  { q: 'Is an inaccessible PDF a legal liability?', a: "Yes. Courts across the US have ruled that inaccessible digital documents violate the ADA, particularly for organizations serving the public. Plaintiffs' attorneys actively test for accessibility failures using automated tools, and demand letters citing specific WCAG violations are common. Remediation is far cheaper than litigation." },
  { q: 'What does PDF remediation actually involve?', a: 'Remediation involves adding or correcting the "tags" that screen readers use to interpret the document: logical reading order, headings, paragraphs, lists, tables with proper headers, images with descriptive alt text, form fields with labels, and document language declaration.' },
  { q: 'Can you remediate scanned PDFs?', a: "Yes. Scanned PDFs (essentially images of documents) require OCR to make the text layer machine-readable, followed by full remediation. This is more labor-intensive than remediating a born-digital PDF but produces a fully compliant document." },
  { q: 'Do you provide a compliance report or certification?', a: "Yes. Every engagement includes a VPAT or a custom accessibility conformance report documenting compliance against WCAG 2.1/2.2 and Section 508 criteria. This report is suitable for procurement purposes, legal defense, and internal compliance records." },
]

interface PDFAccessProps { onNavigate: (page: string) => void }

export default function PDFAccess({ onNavigate }: PDFAccessProps) {
  const { ref: heroRef, visible: heroVis } = useReveal()
  const { ref: servRef, visible: servVis } = useReveal()
  const { ref: showcaseRef, visible: showcaseVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [lightboxDoc, setLightboxDoc] = useState<typeof SAMPLES[0] | null>(null)

  const services = [
    { title: 'PDF Remediation', icon: '📄', desc: 'We tag, reorder, and annotate existing PDFs to meet WCAG 2.1 AA, PDF/UA-1, and Section 508 standards.', points: ['Document tagging & structure', 'Reading order correction', 'Table header remediation', 'Form field labeling'] },
    { title: 'Accessibility Audits', icon: '🔍', desc: 'Comprehensive audits of your PDF library and web content against current WCAG criteria, with prioritized findings.', points: ['Automated + manual testing', 'WCAG 2.2 criteria mapping', 'Prioritized issue backlog', 'Retest verification included'] },
    { title: 'Alt Text & Images', icon: '🖼️', desc: "Every image, chart, and figure gets meaningful, context-aware alt text written by humans — not AI fill-ins.", points: ['Descriptive alt text writing', 'Decorative image artifact tagging', 'Complex figure descriptions', 'Consistency standards guide'] },
    { title: 'Compliance Reporting', icon: '📋', desc: 'Formal VPAT and conformance reports suitable for RFP responses, legal review, and regulatory submissions.', points: ['VPAT 2.5 WCAG edition', 'Custom conformance report', 'Section 508 mapping', 'Annual review program'] },
  ]

  const complianceStandards = [
    { name: 'WCAG 2.1 AA', desc: 'Current de facto US legal standard' },
    { name: 'WCAG 2.2 AA', desc: 'Latest W3C guidelines (2023)' },
    { name: 'PDF/UA-1', desc: 'ISO standard for accessible PDFs' },
    { name: 'Section 508', desc: 'US federal accessibility law' },
    { name: 'ADA Title III', desc: 'For public-facing businesses' },
    { name: 'EN 301 549', desc: 'European accessibility standard' },
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Lightbox */}
      {lightboxDoc && <Lightbox doc={lightboxDoc} onClose={() => setLightboxDoc(null)} />}

      {/* Hero */}
      <section className="gradient-mesh grid-overlay pt-32 pb-20 relative">
        <div className="absolute w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00B4D8, transparent)', filter: 'blur(60px)', top: '20%', right: '8%' }} />
        <div ref={heroRef as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto px-6">
          <div className={`reveal ${heroVis ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <span className="eyebrow">Service 02</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 display-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              PDF Accessibility{' '}
              <span className="gradient-text">&amp; WCAG Compliance</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mb-10">
              Inaccessible documents are a legal liability and a failure of inclusion. We remediate, audit, and certify — so your content works for everyone, and your organization is protected.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => onNavigate('contact')} className="btn-primary px-7 py-3.5 rounded-full text-sm">Request an Audit</button>
              <button onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost px-7 py-3.5 rounded-full text-sm flex items-center gap-2">
                See our work <IconArrow />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {complianceStandards.map((s) => (
                <div key={s.name} className="glass-blue rounded-xl px-4 py-2.5">
                  <div className="text-xs font-bold text-cyan-300 mb-0.5" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{s.name}</div>
                  <div className="text-xs text-white/45">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">The stakes</p>
              <h2 className="text-3xl font-extrabold text-white mb-6 display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                1 in 4 US adults has a disability. Is your content{' '}
                <span className="gradient-text">working for them?</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Screen readers, refreshable Braille displays, switch controls, and voice navigation all depend on properly structured documents. When your PDFs lack tags, proper reading order, or alt text, an entire segment of your audience hits a wall — and your organization faces real legal exposure.
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                Accessibility isn't a niche concern. It's a legal requirement, a moral imperative, and increasingly a procurement requirement for enterprise and government contracts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '4,600+', label: 'ADA lawsuits filed in 2024' },
                { val: '61M', label: 'US adults living with a disability' },
                { val: '97%', label: 'Of top websites fail accessibility' },
                { val: '72h', label: 'Average remediation turnaround' },
              ].map((s) => (
                <div key={s.val} className="neumorph rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text mb-1 stat-num">{s.val}</div>
                  <div className="text-xs text-white/45" style={{ fontFamily: 'Space Mono, monospace' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={servRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${servVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">What we offer</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Comprehensive <span className="gradient-text">accessibility services</span>
              </h2>
            </div>
            <div className={`grid md:grid-cols-2 gap-6 stagger ${servVis ? 'visible' : ''}`}>
              {services.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-8">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-extrabold text-white text-lg mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-white/65">
                        <span className="text-cyan-400"><IconCheck /></span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE/AFTER + WORK SHOWCASE ─────────────────────────── */}
      <section id="showcase" className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={showcaseRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${showcaseVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Our work</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Sample <span className="gradient-text">remediations</span>
              </h2>
              <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
                Real documents we've remediated. Click View to open an in-page preview — no downloading required.
              </p>
            </div>

            {/* Before/After featured sample */}
            <div className={`mb-12 reveal ${showcaseVis ? 'visible' : ''}`}>
              <div className="glass rounded-2xl p-6 mb-3">
                <div className="flex items-center gap-2 mb-5">
                  <span className="eyebrow text-cyan-400">Featured sample</span>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-xs text-white/40">Toggle to see the transformation</span>
                </div>
                <BeforeAfter />
              </div>
            </div>

            {/* Sample cards grid */}
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger ${showcaseVis ? 'visible' : ''}`}>
              {SAMPLES.map((doc) => (
                <div key={doc.id} className="glass rounded-2xl overflow-hidden flex flex-col group hover:border-cyan-500/30 transition-colors duration-200">
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img src={img(doc.imgId, 600, 320)} alt={`${doc.title} document preview`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.1), rgba(10,14,26,0.85))' }} />
                    {/* Tag badge */}
                    <span
                      className="absolute top-3 left-3 eyebrow px-2.5 py-0.5 rounded-full text-xs"
                      style={{ background: `${TAG_COLORS[doc.tag] ?? '#1565C0'}25`, border: `1px solid ${TAG_COLORS[doc.tag] ?? '#1565C0'}44`, color: TAG_COLORS[doc.tag] ?? '#2FD3E8' }}
                    >
                      {doc.tag}
                    </span>
                    {/* Compliance badge */}
                    <span className="absolute bottom-3 right-3 eyebrow px-2.5 py-0.5 rounded-full text-xs" style={{ background: 'rgba(0,180,216,0.18)', border: '1px solid rgba(0,180,216,0.35)', color: '#2FD3E8' }}>
                      {doc.badge}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-extrabold text-white text-sm mb-0.5 leading-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{doc.title}</h3>
                    <p className="text-xs text-cyan-400/70 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>{doc.org} · {doc.year}</p>
                    <p className="text-xs text-white/45 leading-relaxed flex-1 mb-4">{doc.desc}</p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLightboxDoc(doc)}
                        className="flex-1 btn-primary py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
                      >
                        <IconEye /> View
                      </button>
                      <button
                        onClick={() => alert('Download would start here — no real file in preview')}
                        className="btn-ghost px-3 py-2 rounded-lg text-xs flex items-center gap-1.5"
                        title="Download"
                      >
                        <IconDownload />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${faqVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Accessibility <span className="gradient-text">explained</span>
              </h2>
            </div>
            <div className={`space-y-3 reveal ${faqVis ? 'visible' : ''}`}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="glass rounded-xl overflow-hidden">
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-white/90 text-sm pr-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{item.q}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div className={`accordion-body ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-5 pb-5 text-sm text-white/55 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-cta relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-extrabold text-white mb-4 display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Make your content <span className="gradient-text">accessible to all.</span>
          </h2>
          <p className="text-white/55 mb-8">Start with a free accessibility review — we'll identify your highest-risk documents and propose a remediation plan.</p>
          <button onClick={() => onNavigate('contact')} className="btn-primary px-8 py-4 rounded-full text-base">Request a Free Review</button>
        </div>
      </section>
    </div>
  )
}
