import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Sample remediation data ──────────────────────────────────────────────────
const SAMPLES = [
  {
    id: 1,
    title: 'ESG & Financial Annual Report',
    org: 'Meridian Capital Group',
    year: '2025',
    badge: 'WCAG 2.2 AA',
    pages: 48,
    tag: 'Finance',
    imgId: '1778873750399-338b94f7feda',
    desc: 'Full remediation of 48-page corporate report: 2D table header association, human alt text for complex charts, and PDF/UA-1 structure.',
    score: '100% PAC 2024 Pass',
  },
  {
    id: 2,
    title: 'Government Licensing & Benefit Application',
    org: 'State Regulatory Board',
    year: '2024',
    badge: 'Section 508',
    pages: 12,
    tag: 'Government',
    imgId: '1772588627342-5ec373e236d8',
    desc: 'Interactive fillable form remediation: descriptive tooltips, programmatic tab ordering, and required field validation for screen readers.',
    score: '100% Section 508 Compliant',
  },
  {
    id: 3,
    title: 'University Curriculum Handbook & Catalog',
    org: 'Westbrook Institute of Tech',
    year: '2025',
    badge: 'PDF/UA-1',
    pages: 86,
    tag: 'Education',
    imgId: '1461749280684-dccba630e2f6',
    desc: 'Multi-column academic syllabus reordered. Fully nested bookmarks, mathematical formulas tagged, and footnote cross-links verified.',
    score: 'ISO 14289-1 Certified',
  },
  {
    id: 4,
    title: 'Clinical Trial Consent & Patient Protocol',
    org: 'Apex Health Science Network',
    year: '2026',
    badge: 'WCAG 2.2 AA',
    pages: 6,
    tag: 'Healthcare',
    imgId: '1542831371-29b0f74f9713',
    desc: 'Medical consent document optimized for low-vision and assistive tech: high-contrast layout, clear sign-off tags, and HIPAA compliance.',
    score: '100% HHS Conformance',
  },
  {
    id: 5,
    title: 'Corporate Legal Disclosure & Bylaws',
    org: 'Strata Financial Partners',
    year: '2025',
    badge: 'ADA Title III',
    pages: 34,
    tag: 'Legal',
    imgId: '1515879218367-8466d910aaa4',
    desc: 'Court-tested remediation: explicit language declarations, strict heading levels H1-H5, and legal disclaimer table restructuring.',
    score: 'Zero Audit Deficiencies',
  },
  {
    id: 6,
    title: 'International Conference Proceedings',
    org: 'Digital Futures Research Institute',
    year: '2026',
    badge: 'WCAG 2.1 AA',
    pages: 120,
    tag: 'Academic',
    imgId: '1526628953301-3e589a6a8b74',
    desc: 'Complex academic monograph remediation: complex vector diagram descriptions, citation anchors, and tabular matrix tagging.',
    score: 'Full VPAT 2.5 Report',
  },
]

const TAG_COLORS: Record<string, string> = {
  Finance: '#2563EB',
  Government: '#0891B2',
  Education: '#0284C7',
  Healthcare: '#059669',
  Legal: '#4F46E5',
  Academic: '#7C3AED',
}

const FAQ_ITEMS = [
  {
    q: 'What is WCAG and who does it apply to?',
    a: 'WCAG (Web Content Accessibility Guidelines) published by the W3C defines international requirements for making digital content accessible to people with disabilities. In the US, Section 508 requires federal agencies and contractors to comply, while ADA Title III courts hold private businesses accountable to WCAG 2.1/2.2 AA. The European Accessibility Act (EAA) enforces strict penalties across Europe starting June 2025.',
  },
  {
    q: 'Is an inaccessible PDF a legal liability for our company?',
    a: "Yes. Inaccessible PDFs are the single most common trigger for digital accessibility demand letters and ADA Title III lawsuits. Automated web crawlers used by plaintiff firms instantly flag PDFs lacking tags or alt text. Remediation typically costs a tiny fraction of a legal settlement or defense retainer.",
  },
  {
    q: 'What does comprehensive PDF remediation actually involve?',
    a: 'True remediation is not just clicking an automated Acrobat wizard. We manually construct a semantic tag tree (<Document>, <H1>-<H6>, <P>, <Table>, <TH>, <Figure>), assign human-crafted descriptive alt text, map multi-dimensional table headers, configure logical tabbing order for forms, and verify reading with NVDA, JAWS, and PAC 2024.',
  },
  {
    q: 'Can you remediate legacy scanned PDFs or image-only files?',
    a: 'Yes. We run multi-engine OCR to generate a clean, searchable text layer, correct OCR spelling anomalies, and then construct a full structural tag tree so assistive technology can navigate the file effortlessly.',
  },
  {
    q: 'Do you provide a formal VPAT or compliance certificate?',
    a: 'Every remediation engagement includes a formal VPAT 2.5 (Voluntary Product Accessibility Template) or custom Conformance Report mapping compliance against WCAG 2.1/2.2 Level AA, Section 508, and PDF/UA-1. This provides legally defensible documentation for procurement and governance.',
  },
]

// ── Interactive Conformance Report Modal ─────────────────────────────────────
function ConformanceModal({ doc, onClose }: { doc: typeof SAMPLES[0]; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopySpec = () => {
    navigator.clipboard?.writeText(
      `SNAiO Tech Conformance Spec - ${doc.title} (${doc.org}) - Compliance: ${doc.badge} / PDF/UA-1 ISO 14289-1. Status: PASS (21/21 criteria verified).`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl glass-strong rounded-3xl p-6 sm:p-8 border border-cyan-400/40 shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                PAC 2024 & VPAT 2.5 ACCESSIBILITY AUDIT CERTIFICATE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              {doc.title}
            </h3>
            <p className="text-xs text-white/50 font-mono mt-0.5">{doc.org} · {doc.year} · {doc.pages} Pages</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <IconX />
          </button>
        </div>

        {/* Audit Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-emerald-400 font-mono font-bold text-lg">PASS</div>
            <div className="text-[10px] text-white/40 font-mono">ISO 14289-1 (PDF/UA)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-cyan-400 font-mono font-bold text-lg">LEVEL AA</div>
            <div className="text-[10px] text-white/40 font-mono">WCAG 2.2 Criteria</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-purple-400 font-mono font-bold text-lg">100%</div>
            <div className="text-[10px] text-white/40 font-mono">Screen Reader Parity</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-amber-400 font-mono font-bold text-lg">7.8 : 1</div>
            <div className="text-[10px] text-white/40 font-mono">Min Color Contrast</div>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
          <div className="text-cyan-300 font-bold mb-2">VERIFIED COMPLIANCE GATES:</div>
          <div className="grid sm:grid-cols-2 gap-2 text-white/75 text-[11px]">
            <div>✓ WCAG 1.1.1 Non-Text Alt Content</div>
            <div>✓ PDF/UA 7.1 Logical Tag Hierarchy</div>
            <div>✓ WCAG 1.3.1 2D Data Table Association</div>
            <div>✓ WCAG 1.3.2 Programmatic Reading Sequence</div>
            <div>✓ WCAG 2.4.2 Valid Document Metadata & Title</div>
            <div>✓ WCAG 3.1.1 Explicit Natural Language Tag</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleCopySpec}
            className="w-full sm:flex-1 py-3 rounded-xl btn-primary text-xs font-semibold flex items-center justify-center gap-2"
          >
            <IconDownload />
            {copied ? 'Spec Copied to Clipboard!' : 'Copy Conformance Spec Hash'}
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl glass border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Document In-Page Previewer Component ─────────────────────────────────────
function DocumentPreviewer({ highlightedTag }: { highlightedTag: string | null }) {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar p-6 sm:p-8 bg-white text-gray-800 rounded-2xl shadow-inner font-sans relative">
      {/* Top Document Header */}
      <div
        className={`border-b-2 border-gray-900 pb-4 mb-6 transition-all duration-300 ${
          highlightedTag === 'H1' ? 'ring-4 ring-cyan-500 rounded-lg p-2 bg-cyan-50/50' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
            &lt;H1&gt; TAGGED
          </span>
          <span className="text-xs text-gray-500 font-mono">ISO 14289-1 Compliant</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          2026 Fiscal Governance & ESG Performance Report
        </h1>
        <p className="text-xs text-gray-500 mt-1">Meridian Capital Group · Document Language: en-US · Tagged PDF</p>
      </div>

      {/* Summary Paragraph */}
      <div
        className={`mb-6 transition-all duration-300 ${
          highlightedTag === 'P' ? 'ring-4 ring-cyan-500 rounded-lg p-2 bg-cyan-50/50' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
            &lt;P&gt; READING ORDER 01
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          This document has been fully remediated to meet <strong>WCAG 2.2 Level AA</strong> and <strong>PDF/UA-1</strong> standards. Headings are structured strictly from H1 through H3, all decorative graphics are marked as artifacts, and complex charts include comprehensive context-rich descriptions.
        </p>
      </div>

      {/* Figure Alt Text Section */}
      <div
        className={`mb-6 p-4 rounded-xl border border-gray-200 bg-gray-50 transition-all duration-300 ${
          highlightedTag === 'Figure' ? 'ring-4 ring-cyan-500 bg-cyan-50/50' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
            &lt;Figure&gt; ALT TEXT VERIFIED
          </span>
          <span className="text-[10px] font-mono text-emerald-700">Human-Authored Alt Tag</span>
        </div>
        <div className="h-20 bg-gradient-to-r from-blue-100 via-indigo-100 to-cyan-100 rounded-lg flex items-center justify-center border border-dashed border-blue-300">
          <span className="text-xs font-mono text-blue-900 font-bold">
            [Chart: 24.8% YoY Operating Margin Growth Across 4 Cohorts]
          </span>
        </div>
        <p className="text-[11px] text-gray-600 mt-2 font-mono">
          Screen Reader Vocalization: "Figure: Clustered bar chart showing operating margin expansion from 18.2% to 24.8% in Q4 2025."
        </p>
      </div>

      {/* Compliance Table */}
      <div
        className={`transition-all duration-300 ${
          highlightedTag === 'Table' ? 'ring-4 ring-cyan-500 rounded-lg p-2 bg-cyan-50/50' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
            &lt;Table&gt; 2D HEADER ASSOCIATION
          </span>
        </div>
        <table className="w-full text-xs border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-bold" scope="col">Compliance Gate</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-bold" scope="col">Standard</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-bold" scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-1.5 font-medium">Logical Tag Tree</td>
              <td className="border border-gray-300 px-3 py-1.5 text-gray-500 font-mono">PDF/UA 7.1</td>
              <td className="border border-gray-300 px-3 py-1.5 text-emerald-700 font-bold">✓ 100% Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1.5 font-medium">Screen Reader Flow</td>
              <td className="border border-gray-300 px-3 py-1.5 text-gray-500 font-mono">WCAG 1.3.2</td>
              <td className="border border-gray-300 px-3 py-1.5 text-emerald-700 font-bold">✓ Verified</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface PDFAccessProps {
  onNavigate: (page: string) => void
}

export default function PDFAccess({ onNavigate }: PDFAccessProps) {
  const { ref: stakesRef, visible: stakesVis } = useReveal()
  const { ref: simRef, visible: simVis } = useReveal()
  const { ref: servRef, visible: servVis } = useReveal()
  const { ref: showcaseRef, visible: showcaseVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [modalDoc, setModalDoc] = useState<typeof SAMPLES[0] | null>(null)

  // Interactive Screen Reader Simulator State
  const [audioMode, setAudioMode] = useState<'unremediated' | 'remediated'>('remediated')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [transcriptIndex, setTranscriptIndex] = useState(0)

  // Interactive Document Tag Tree Inspector State
  const [highlightedTag, setHighlightedTag] = useState<string | null>('H1')

  // Interactive Legal Exposure & ROI Calculator
  const [docPageVolume, setDocPageVolume] = useState<number>(500)
  const [docIndustry, setDocIndustry] = useState<'healthcare' | 'gov' | 'finance' | 'education'>('finance')

  // Screen Reader Speech Synthesis or simulated transcription
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setTranscriptIndex((prev) => (prev + 1) % 4)
      }, 1800)
    } else {
      setTranscriptIndex(0)
    }
    return () => clearInterval(timer)
  }, [isPlayingAudio])

  const toggleScreenReaderVoice = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setIsPlayingAudio(false)
      return
    }

    setIsPlayingAudio(true)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const text =
        audioMode === 'remediated'
          ? 'Heading Level 1: 2026 Fiscal Governance and ESG Performance Report. Paragraph: Operating margin expanded to 24.8%. Table with 3 columns.'
          : 'Image graphic unlabelled... Graphic object... Table with missing header cells... Warning, reading order scrambled.'
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 1.05
      utter.onend = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utter)
    }
  }

  // Calculated risk stats
  const estimatedFineRisk =
    docPageVolume > 2000 ? '$150,000+' : docPageVolume > 500 ? '$75,000' : '$55,000'
  const turnaroundDays = docPageVolume > 2000 ? '5-7 Days' : docPageVolume > 500 ? '48-72 Hours' : '24-48 Hours'

  return (
    <div className="overflow-x-hidden">
      {/* Conformance Spec Modal */}
      {modalDoc && <ConformanceModal doc={modalDoc} onClose={() => setModalDoc(null)} />}

      <PageHero
        service="PDF accessibility"
        title="Documents everyone"
        accent="can use."
        description="We remediate and audit PDFs for full WCAG 2.2 Level AA & PDF/UA-1 compliance. Zero automated guesswork—human-tested with NVDA, JAWS, and PAC 2024."
        image="/images/discipline-pdf-accessibility.png"
        imageAlt="SNAiO Tech illustration for accessible documents"
        highlights={['WCAG 2.2 AA', 'PDF/UA-1 ISO 14289', 'VPAT 2.5 Certified']}
        primaryLabel="Request a PDF audit"
        secondaryLabel="Try live inspector"
        secondaryTarget="inspector"
        onNavigate={onNavigate}
      />

      {/* ── Interactive Screen Reader Simulation Console ── */}
      <section className="py-20 gradient-mesh relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={simRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${simVis ? 'visible' : ''}`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Assistive Technology Experience Lab
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Hear the Difference <span className="gradient-text">Screen Readers Experience</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Toggle below to experience how a blind or visually impaired user hears an untagged broken document versus a SNAiO-certified accessible PDF.
              </p>
            </div>

            {/* Audio Simulator Cockpit */}
            <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left Controller */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex p-1.5 rounded-2xl glass border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setAudioMode('unremediated')
                        if (isPlayingAudio) toggleScreenReaderVoice()
                      }}
                      className={`flex-1 py-3 px-3 rounded-xl text-xs font-semibold font-mono transition-all ${
                        audioMode === 'unremediated'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      ✗ Untagged (Broken)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAudioMode('remediated')
                        if (isPlayingAudio) toggleScreenReaderVoice()
                      }}
                      className={`flex-1 py-3 px-3 rounded-xl text-xs font-semibold font-mono transition-all ${
                        audioMode === 'remediated'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      ✓ SNAiO Remediated
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/60">AUDIT STATUS:</span>
                      <span className={audioMode === 'remediated' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {audioMode === 'remediated' ? 'PASS (WCAG 2.2 AA)' : 'FAIL (ADA Lawsuit Risk)'}
                      </span>
                    </div>

                    <div className="text-xs text-white/70 leading-relaxed">
                      {audioMode === 'remediated'
                        ? 'Full semantic tag tree enables NVDA and JAWS to announce section headers, speak table dimensions, and read human-crafted chart context.'
                        : 'Assistive software encounters an unreadable wall. Images are vocalized as meaningless file paths and multi-column text is jumbled out of order.'}
                    </div>

                    <button
                      type="button"
                      onClick={toggleScreenReaderVoice}
                      className={`w-full py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                        audioMode === 'remediated'
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                          : 'bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                          Pause Vocalization
                        </>
                      ) : (
                        <>
                          <span className="text-sm">🔊</span>
                          Play Screen Reader Voice Simulation
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Interactive Audio Waveform & Live Telemetry */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#060D1A] to-[#03060C] border border-cyan-500/30 shadow-2xl space-y-5">
                    {/* Simulated Audio Waveform Visualizer */}
                    <div className="flex items-end justify-between h-16 px-4 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                      {Array.from({ length: 28 }).map((_, idx) => {
                        const heights = isPlayingAudio
                          ? [30, 75, 45, 90, 60, 100, 40, 85, 55, 95, 35, 70, 50, 80]
                          : [15, 20, 15, 25, 18, 15, 20, 15, 25, 18, 15, 20, 15, 20]
                        const h = heights[idx % heights.length]
                        return (
                          <div
                            key={idx}
                            className={`w-1.5 rounded-full transition-all duration-150 ${
                              audioMode === 'remediated'
                                ? 'bg-gradient-to-t from-cyan-500 to-emerald-400'
                                : 'bg-gradient-to-t from-rose-600 to-amber-500'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        )
                      })}
                    </div>

                    {/* Live Screen Reader Voice Telemetry Transcript */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-white/40">
                        <span>NVDA / JAWS SYNTHESIZER TRANSCRIPT:</span>
                        <span className={isPlayingAudio ? 'text-cyan-400 animate-pulse' : 'text-white/30'}>
                          {isPlayingAudio ? '● LIVE AUDIO' : 'STANDBY'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-black/50 text-xs leading-relaxed min-h-[64px] flex items-center">
                        {audioMode === 'remediated' ? (
                          <span className="text-emerald-300">
                            {[
                              '“Heading level 1: 2026 Fiscal Governance & ESG Performance Report.”',
                              '“Paragraph: This document conforms to WCAG 2.2 AA and ISO 14289-1 standards.”',
                              '“Figure: Clustered column chart showing 24.8% operating margin expansion.”',
                              '“Table with 3 columns, 2 rows. Column 1: Compliance Gate. Row 1: Tag Tree - Pass.”',
                            ][transcriptIndex]}
                          </span>
                        ) : (
                          <span className="text-rose-300">
                            {[
                              '“Image: IMG_48201.png - No alternative text provided.”',
                              '“Warning: Reading sequence unmapped. Text block order scrambled.”',
                              '“Table: No header associations. Data cells cannot be related to headers.”',
                              '“End of page reached with 14 critical accessibility barriers.”',
                            ][transcriptIndex]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Acrobat / PAC 2024 Tag Tree & Document Inspector ── */}
      <section id="inspector" className="py-24 gradient-mesh-light relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Live Document Diagnostic Console</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Interactive <span className="gradient-text">Tag Tree Inspector</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
              Click any semantic tag in the left panel to highlight its structural placement inside the live document preview.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left: Acrobat Pro Style Tag Tree */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/mascot-laptop.png"
                      alt="SNAiO Lead Accessibility Auditor"
                      className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(0,180,216,0.5)]"
                    />
                    <div>
                      <span className="text-xs font-mono text-cyan-300 font-bold block">PAC 2024 TAG TREE</span>
                      <span className="text-[10px] text-white/40 font-mono">ISO 14289-1 AUDIT</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    21/21 PASS
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-white/50 font-mono block">CLICK A TAG TO INSPECT BOUNDING BOX:</span>

                  {[
                    { tag: 'H1', label: '<H1: Title>', desc: 'Document Title & Top Hierarchy Level' },
                    { tag: 'P', label: '<P: Summary>', desc: 'Executive Text Block with Explicit Lang en-US' },
                    { tag: 'Figure', label: '<Figure: Alt>', desc: 'Complex Data Chart with Human Descriptive Alt Text' },
                    { tag: 'Table', label: '<Table: Matrix>', desc: '2D Header Association (TH scopes & TD relationships)' },
                  ].map((node) => (
                    <button
                      key={node.tag}
                      type="button"
                      onClick={() => setHighlightedTag(node.tag)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        highlightedTag === node.tag
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_20px_rgba(0,180,216,0.3)] scale-[1.01]'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-mono font-bold">{node.label}</div>
                        <div className="text-[11px] text-white/40 mt-0.5">{node.desc}</div>
                      </div>
                      <span className="text-xs font-mono text-cyan-400">
                        {highlightedTag === node.tag ? '● ACTIVE' : 'INSPECT'}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-xs font-mono text-cyan-200">
                  <span className="text-cyan-400 font-bold">Assistive Tech Parity:</span> Every tag has verified logical reading order, zero artifact collisions, and passing color contrast.
                </div>
              </div>

              {/* Right: Live Interactive Document Renderer */}
              <div className="lg:col-span-7 h-[460px] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                <DocumentPreviewer highlightedTag={highlightedTag} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Legal Exposure & Remediation ROI Calculator ── */}
      <section className="py-20 gradient-mesh relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={stakesRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${stakesVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Compliance & Risk Mitigation</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Calculate Your <span className="gradient-text">Accessibility Exposure</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                With 4,600+ ADA lawsuits filed annually and European Accessibility Act (EAA) enforcement active, remediating your document library eliminates legal liability.
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Input Sliders */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/80 mb-2">
                      <span>DOCUMENT LIBRARY SIZE:</span>
                      <span className="text-cyan-300 font-bold text-sm">{docPageVolume} Pages</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="50"
                      value={docPageVolume}
                      onChange={(e) => setDocPageVolume(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                      <span>50 pgs</span>
                      <span>1,000 pgs</span>
                      <span>5,000+ pgs</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-white/80 block mb-2">INDUSTRY GOVERNANCE SECTOR:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'finance', label: 'Financial Services / SEC' },
                        { id: 'healthcare', label: 'Healthcare & HIPAA' },
                        { id: 'gov', label: 'Government & Section 508' },
                        { id: 'education', label: 'Higher Ed & EdTech' },
                      ].map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => setDocIndustry(ind.id as any)}
                          className={`p-3 rounded-xl text-xs font-mono text-left border transition-all ${
                            docIndustry === ind.id
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                              : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                          }`}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Real-time Exposure Scorecard */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center">
                    <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mb-1">
                      {estimatedFineRisk}
                    </div>
                    <div className="text-xs text-white/60 font-mono">DOJ / Civil Liability Risk</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mb-1">
                      100%
                    </div>
                    <div className="text-xs text-white/60 font-mono">VPAT 2.5 Defense Pass</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-center">
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mb-1">
                      {turnaroundDays}
                    </div>
                    <div className="text-xs text-white/60 font-mono">Guaranteed Turnaround</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-center">
                    <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mb-1">
                      EAA 2025
                    </div>
                    <div className="text-xs text-white/60 font-mono">EU Regulatory Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Crisp 4-Pillar Remediation Bento Grid ── */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={servRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${servVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Enterprise Capabilities</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Comprehensive <span className="gradient-text">Accessibility Engineering</span>
              </h2>
            </div>

            <div className={`grid md:grid-cols-2 gap-6 stagger ${servVis ? 'visible' : ''}`}>
              <div className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">📄</div>
                <h3 className="font-extrabold text-white text-xl mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Document Remediation & Tag Tree Construction
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  We reconstruct broken or untagged PDFs to conform strictly to ISO 14289-1 (PDF/UA-1) and WCAG 2.2 AA.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Strict Heading Structure & Logical Hierarchy (H1-H6)</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Verification of Reading Order & Programmatic Flow</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Interactive Form Fields with Tooltips & Tab Sequence</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Decorative Artifact Tagging to Eliminate Noise</li>
                </ul>
              </div>

              <div className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">🖼️</div>
                <h3 className="font-extrabold text-white text-xl mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Human-Authored Alt Text (Zero AI Guesswork)
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Automated AI alt-text tools hallucinate and fail compliance. Our accessibility specialists write context-aware descriptions for every chart and figure.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Complex Financial & Scientific Graph Deconstructions</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Multi-Layered Flowcharts & Architectural Diagrams</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Contextual Tone Aligned with Surrounding Body Copy</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Full Audit Logs for Legal Conformance Records</li>
                </ul>
              </div>

              <div className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-extrabold text-white text-xl mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  Complex Tables & 2D Data Header Association
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Multi-tier financial statements and scientific matrices require rigorous cell-to-header relationships.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Programmatic Scope ID & Headers Tag Mapping</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Merged Row and Column Span Remediation</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Screen Reader Header Announcement Verification</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Elimination of Floating Unstructured Table Layouts</li>
                </ul>
              </div>

              <div className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="font-extrabold text-white text-xl mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  VPAT 2.5 Reports & Legal Defense Documentation
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Court-ready Voluntary Product Accessibility Templates suitable for corporate procurement, government RFPs, and ADA defense.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Formal VPAT 2.5 WCAG & Section 508 Edition</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> PAC 2024 Automated Validation Logs & Scorecards</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Assistive Technology Manual Verification Audit Signoff</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400"><IconCheck /></span> Annual Digital Governance & Library Review Programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample Remediations Showcase with Interactive Modal ── */}
      <section id="showcase" className="py-24 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={showcaseRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${showcaseVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Our Work</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Featured <span className="gradient-text">Remediation Case Studies</span>
              </h2>
              <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
                Explore actual enterprise documents remediated by SNAiO. Click to inspect the full PAC 2024 compliance certificate and audit telemetry.
              </p>
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger ${showcaseVis ? 'visible' : ''}`}>
              {SAMPLES.map((doc) => (
                <div
                  key={doc.id}
                  className="glass rounded-3xl overflow-hidden flex flex-col group hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={img(doc.imgId, 600, 320)}
                      alt={`${doc.title} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060A16] via-[#060A16]/50 to-transparent" />

                    <span
                      className="absolute top-3 left-3 eyebrow px-2.5 py-0.5 rounded-full text-xs"
                      style={{
                        background: `${TAG_COLORS[doc.tag] ?? '#2563EB'}25`,
                        border: `1px solid ${TAG_COLORS[doc.tag] ?? '#2563EB'}55`,
                        color: TAG_COLORS[doc.tag] ?? '#38BDF8',
                      }}
                    >
                      {doc.tag}
                    </span>

                    <span className="absolute bottom-3 right-3 eyebrow px-2.5 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      {doc.badge}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-snug mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {doc.title}
                      </h3>
                      <p className="text-xs text-cyan-400/80 font-mono mb-2">
                        {doc.org} · {doc.year} · {doc.pages} Pages
                      </p>
                      <p className="text-xs text-white/55 leading-relaxed">
                        {doc.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setModalDoc(doc)}
                        className="flex-1 btn-primary py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <IconEye /> Inspect Audit Spec
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalDoc(doc)}
                        className="btn-ghost px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                        title="Download Certificate"
                      >
                        <IconDownload />
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
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${faqVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl font-extrabold display-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Accessibility <span className="gradient-text">Demystified</span>
              </h2>
            </div>
            <div className={`space-y-3 reveal ${faqVis ? 'visible' : ''}`}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-white/90 text-sm pr-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {item.q}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className={`accordion-body ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-5 pb-5 text-sm text-white/60 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Make your documents"
        accent="work for everyone."
        description="Send us a sample PDF or tell us about your library volume. We'll run a complimentary PAC 2024 audit and return clear remediation findings."
        buttonLabel="Request a PDF audit"
        onNavigate={onNavigate}
      />
    </div>
  )
}
