import { useState, useEffect, useRef } from 'react'

interface BlogPostDetailProps {
  onNavigate: (page: string) => void
}

const TOC_SECTIONS = [
  { id: 'the-discovery', label: '1. The Discovery: AI Agents See Empty Shells' },
  { id: 'the-spa-illusion', label: '2. The "It Works in Chrome" Illusion' },
  { id: 'how-ai-crawlers-work', label: '3. How Modern AI Crawlers Actually Read the Web' },
  { id: 'the-button-trap', label: '4. The <button> vs <a> Crawling Trap' },
  { id: 'google-typo-conundrum', label: '5. The Google Typo Conundrum ("Snaiotech" vs "Snitch")' },
  { id: 'the-ssg-solution', label: '6. The Solution: Static Pre-Rendering (SSG) in React 19' },
  { id: 'before-after-metrics', label: '7. Production Benchmarks: Before vs. After' },
  { id: 'developer-checklist', label: '8. Actionable Checklist for Agencies & Freelancers' },
]

export default function BlogPostDetail({ onNavigate }: BlogPostDetailProps) {
  const [activeSection, setActiveSection] = useState(TOC_SECTIONS[0].id)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [comparisonTab, setComparisonTab] = useState<'developer' | 'crawler'>('crawler')
  const contentRef = useRef<HTMLDivElement>(null)

  // Reading progress tracker & active TOC highlight
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const current = window.scrollY
      setScrollProgress(total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0)

      // Section spy
      const sectionElements = TOC_SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i]
        if (item.el) {
          const rect = item.el.getBoundingClientRect()
          if (rect.top <= 180) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const copyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="overflow-x-hidden pt-24 pb-20 relative bg-[#070B14]">
      {/* Top sticky scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 transition-all duration-150 shadow-[0_0_12px_rgba(0,180,216,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Cybernetic ambient backgrounds */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[40%] right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute bottom-20 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] -z-10" />

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-3 text-xs text-white/50 mb-8" style={{ fontFamily: 'Space Mono, monospace' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('home')
            }}
            className="hover:text-cyan-400 transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('blog')
            }}
            className="hover:text-cyan-400 transition-colors"
          >
            Blog
          </a>
          <span>/</span>
          <span className="text-cyan-300 truncate max-w-xs">Technical Case Study</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Engineering Deep-Dive
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-white/60 bg-white/5 border border-white/10">
            AEO & Generative Engine Optimization
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-white/60 bg-white/5 border border-white/10">
            React 19 · Vite · SSG
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.1] tracking-tight mb-8"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          Why AI Agents & Search Engines Can&apos;t Read Your React Website{' '}
          <span className="gradient-text block mt-1">(And How We Solved It)</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
          Most modern React and Vite websites are completely invisible to AI search tools like Perplexity, ChatGPT, and Claude. Here is why client-side Single Page Applications fail the modern AEO test, and the exact Static Site Generation blueprint we engineered to fix it.
        </p>

        {/* Metadata bar & Share tools */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10 text-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#0B101D] flex items-center justify-center text-xs font-bold text-cyan-300">
                SN
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">SNAiO Tech Engineering Team</div>
              <div className="text-xs text-white/45 flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                <span>Oct 11, 2026</span>
                <span>·</span>
                <span>8 min read</span>
                <span>·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                  Verified Production Incident
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyUrl}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 text-white/80 transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>Share Article</span>
                </>
              )}
            </button>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('blog')
              }}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-all"
            >
              ← Back to Journal
            </a>
          </div>
        </div>
      </div>

      {/* Featured Image with futuristic frame */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
          <img
            src="/images/blog-ai-react-indexing.png"
            alt="Futuristic AI search crawlers inspecting a React website wireframe matrix"
            className="w-full h-[360px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/60">
            <span className="flex items-center gap-2 bg-[#070B14]/80 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              SNAiO Architecture Blueprint · AI Web Crawler Diagnostics
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-white/40">Visualized in Chennai Lab</span>
          </div>
        </div>
      </div>

      {/* Executive Summary / Key Takeaways Box */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative overflow-hidden rounded-2xl p-7 sm:p-9 bg-gradient-to-br from-cyan-950/40 via-[#0B1528] to-[#0A0E1A] border border-cyan-400/30 shadow-[0_0_35px_rgba(0,180,216,0.1)]">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Executive Summary (TL;DR)
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/75 leading-relaxed">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-cyan-400 font-bold mt-0.5">01</span>
              <p>
                <strong className="text-white">The Blank Canvas Dilemma:</strong> Traditional React SPAs send an empty <code className="text-cyan-300">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code>. To basic scrapers and AI agents, your page has 0 words of body content.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-cyan-400 font-bold mt-0.5">02</span>
              <p>
                <strong className="text-white">AI Crawlers Skip JS:</strong> Tools like Perplexity, Claude, and ChatGPT browse using high-speed HTTP GET requests without rendering heavy JavaScript.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-cyan-400 font-bold mt-0.5">03</span>
              <p>
                <strong className="text-white">Why Google Suggests Typos:</strong> Search engines seeing zero readable body text treat the brand as thin content, leading to queries getting redirected (e.g., &quot;Snaiotech&quot; → &quot;Snitch&quot;).
              </p>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-cyan-400 font-bold mt-0.5">04</span>
              <p>
                <strong className="text-white">The SSG Fix:</strong> Pre-rendering static HTML at build time embeds 50+ KB of full semantic content immediately, keeping SPA client hydration intact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 sticky top-20 order-2 lg:order-1">
            <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Table of Contents
                </span>
                <span className="text-[11px] font-mono text-white/40">{Math.round(scrollProgress)}%</span>
              </div>
              <nav className="space-y-1 text-xs">
                {TOC_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-cyan-400/15 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-3'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{section.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Sidebar Action Card */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-400/20 text-center">
                  <div className="text-xs font-bold text-white mb-1">Need an AEO / SEO Audit?</div>
                  <p className="text-[11px] text-white/55 mb-3 leading-relaxed">
                    We evaluate your website for AI crawler visibility, Core Web Vitals, and WCAG compliance.
                  </p>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('contact')
                    }}
                    className="btn-primary text-xs py-2 px-4 w-full block text-center rounded-lg"
                  >
                    Request Free Audit
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content (8 cols) */}
          <main ref={contentRef} className="lg:col-span-8 order-1 lg:order-2 space-y-16 text-white/80 leading-relaxed">
            {/* Section 1 */}
            <section id="the-discovery" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>01 // INCIDENT ANALYSIS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The Discovery: &quot;I tried, but I could only read part of your site&quot;
              </h2>
              <p>
                Earlier this week, during an automated audit conducted by an autonomous AI agent, our server returned an unsettling response:
              </p>
              <div className="p-5 rounded-2xl bg-[#0F172A] border-l-4 border-amber-400 text-white/90 italic font-mono text-sm leading-relaxed">
                &ldquo;I tried, but I could only read part of your site. The page loads its content with JavaScript, so all I got was the title and meta description. That alone tells me something useful, though.&rdquo;
              </div>
              <p>
                To any modern software engineer or agency founder, this diagnosis is alarming. In the new era of generative engines (SearchGPT, Claude, Perplexity, Gemini, and Google SGE), if an AI agent can only read your title and meta description, <strong>99% of your product value, case studies, client guarantees, and conversion copy are effectively invisible</strong>.
              </p>

              {/* Interactive Inspection Comparison Widget */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-white/15 bg-[#0A0F1D]">
                <div className="flex items-center justify-between px-5 py-3.5 bg-white/5 border-b border-white/10">
                  <span className="text-xs font-mono text-white/70">INSPECTION SIMULATOR: What Receives What?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setComparisonTab('developer')}
                      className={`text-xs px-3 py-1 rounded-md font-mono transition-colors ${
                        comparisonTab === 'developer'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Developer View (Browser)
                    </button>
                    <button
                      onClick={() => setComparisonTab('crawler')}
                      className={`text-xs px-3 py-1 rounded-md font-mono transition-colors ${
                        comparisonTab === 'crawler'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      AI Crawler View (Raw HTTP)
                    </button>
                  </div>
                </div>

                <div className="p-6 font-mono text-xs overflow-x-auto">
                  {comparisonTab === 'developer' ? (
                    <div className="space-y-2 text-emerald-300">
                      <div>✓ React 19 mounted successfully into #root</div>
                      <div>✓ 14 components rendered (HeroSlider, FlipGallery, Marquee, CTAs)</div>
                      <div>✓ 5,600+ visible characters of rich semantic copywriting rendered</div>
                      <div>✓ Animations executing at 60 FPS via GSAP and CSS transforms</div>
                      <div>✓ Status: Looks 100% complete and visually stunning</div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-red-300">
                      <div className="text-white/50">&lt;!-- WHAT THE AI AGENT ACTUALLY DOWNLOADS --&gt;</div>
                      <div>&lt;!doctype html&gt;</div>
                      <div>&lt;html lang=&quot;en&quot;&gt;</div>
                      <div>&nbsp;&nbsp;&lt;head&gt;</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;SNAiO Tech | Web Dev, PDF Accessibility...&lt;/title&gt;</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name=&quot;description&quot; content=&quot;...&quot;&gt;</div>
                      <div>&nbsp;&nbsp;&lt;/head&gt;</div>
                      <div>&nbsp;&nbsp;&lt;body&gt;</div>
                      <div className="bg-red-500/20 text-red-200 px-2 py-1 rounded border border-red-500/30 inline-block">
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;div id=&quot;root&quot;&gt;&lt;/div&gt; &lt;!-- COMPLETELY EMPTY! ZERO TEXT! --&gt;
                      </div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;script type=&quot;module&quot; src=&quot;/assets/index.js&quot;&gt;&lt;/script&gt;</div>
                      <div>&nbsp;&nbsp;&lt;/body&gt;</div>
                      <div>&lt;/html&gt;</div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="the-spa-illusion" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>02 // THE ROOT CAUSE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The &quot;It Works in Chrome&quot; Illusion
              </h2>
              <p>
                When a developer builds a Single Page Application (SPA) using Vite, Create React App, or client-only bundlers, their local testing experience is flawless. They hit <code className="text-cyan-300">npm run dev</code>, open Google Chrome, and see everything instantly.
              </p>
              <p>
                However, here is what is actually happening behind the curtain:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong className="text-white">The Server sends an empty shell:</strong> The initial HTTP GET request returns only an HTML framework containing <code className="text-cyan-300">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</code> and a script tag.
                </li>
                <li>
                  <strong className="text-white">The Browser downloads megabytes of JavaScript:</strong> The user&apos;s browser CPU parses and executes React runtime bundles.
                </li>
                <li>
                  <strong className="text-white">Client-Side Rendering (CSR) kicks in:</strong> React builds the DOM nodes on the client machine and inserts the text into the div.
                </li>
              </ol>
              <p>
                If the entity visiting your website is a real person sitting at a laptop with a high-end multi-core CPU, this works. But what happens when the visitor is an AI search agent, a link preview bot, or a search engine crawler?
              </p>
            </section>

            {/* Section 3 */}
            <section id="how-ai-crawlers-work" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>03 // CRAWLER ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                How Modern AI Crawlers Actually Read the Web
              </h2>
              <p>
                There is a dangerous myth circulating in web agencies: <em>&quot;Googlebot executes JavaScript now, so SPAs don&apos;t need server-side HTML.&quot;</em>
              </p>
              <p>
                This belief is both outdated and dangerously incomplete for three reasons:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="text-cyan-400 font-bold mb-2">1. AI Search Crawlers (Perplexity / GPTBot)</div>
                  <p className="text-xs leading-relaxed text-white/60">
                    AI models browse the web via microservices that make millisecond HTTP GET requests and convert the raw HTML into markdown. They <strong>do not spin up a headless Chromium instance</strong> for every URL. An empty div means zero content to answer queries with.
                  </p>
                </div>
                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="text-cyan-400 font-bold mb-2">2. Google&apos;s Two-Wave Rendering Queue</div>
                  <p className="text-xs leading-relaxed text-white/60">
                    Googlebot indexes raw HTML in wave one immediately. JavaScript rendering is shunted to a secondary queue that can take days or weeks, and frequently fails due to script timeouts or CSP barriers.
                  </p>
                </div>
                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="text-cyan-400 font-bold mb-2">3. Social Link Scrapers</div>
                  <p className="text-xs leading-relaxed text-white/60">
                    LinkedInBot, WhatsApp, Twitterbot, and Facebook bots never run JavaScript. If Open Graph tags and body texts aren&apos;t pre-rendered, your link previews appear broken or empty.
                  </p>
                </div>
                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="text-cyan-400 font-bold mb-2">4. AEO & Citations Penalties</div>
                  <p className="text-xs leading-relaxed text-white/60">
                    In Answer Engine Optimization, AI answer engines quote authoritative sources with high citation clarity. If an AI crawler cannot extract your statistics, it cites your competitor instead.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="the-button-trap" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>04 // MARKUP VULNERABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The <code className="text-cyan-300">&lt;button&gt;</code> vs <code className="text-cyan-300">&lt;a&gt;</code> Crawling Trap
              </h2>
              <p>
                During our audit, we discovered a second critical bottleneck that plagues 80% of modern frontend apps:
              </p>
              <p>
                In many React components, developers wire up navigation using button click handlers:
              </p>
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 font-mono text-xs text-red-200">
                &lt;button onClick=&#123;() =&gt; navigate(&apos;webdev&apos;)&#125;&gt;Web Development&lt;/button&gt;
              </div>
              <p>
                <strong>Web crawlers do not click buttons.</strong> Crawlers discover web architectures by finding and following HTML anchor elements with explicit <code className="text-cyan-300">href</code> attributes:
              </p>
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 font-mono text-xs text-emerald-200">
                &lt;a href=&quot;/webdev&quot; onClick=&#123;(e) =&gt; &#123; e.preventDefault(); navigate(&apos;webdev&apos;); &#125;&#125;&gt;Web Development&lt;/a&gt;
              </div>
              <p>
                By wrapping links in semantic anchor tags while intercepting clicks for client-side routing, you satisfy both worlds: humans get instantaneous SPA transitions, while search engine crawlers can map and crawl your entire sitemap seamlessly.
              </p>
            </section>

            {/* Section 5 */}
            <section id="google-typo-conundrum" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>05 // ENTITY RESOLUTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The Google Typo Conundrum (&quot;Snaiotech&quot; vs &quot;Snitch&quot;)
              </h2>
              <p>
                When our founder searched for &quot;snaiotech&quot; on Google, Google prominently replied:
              </p>
              <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 text-white font-mono text-xs">
                &ldquo;These are results for <span className="text-cyan-400 font-bold">snitch</span>. Search instead for <u>snaiotech</u>.&rdquo;
              </div>
              <p>
                Why does this happen? Because to Google&apos;s Knowledge Graph, an empty SPA domain has <strong>zero recognized entity signals</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No text describing what the company does</li>
                <li>No Schema.org <code className="text-cyan-300">Organization</code> metadata connecting the brand name to an address, telephone, or service catalog</li>
                <li>No internal pages crawled to confirm the domain is active</li>
              </ul>
              <p>
                Without content, Google&apos;s query parser assumes the user made a typographical error and autocorrects the query to a famous brand (like apparel retailer &quot;Snitch&quot;). Once rich semantic HTML and Organization schemas are pre-rendered into the DOM, the entity is verified, and the typo redirection disappears.
              </p>
            </section>

            {/* Section 6 */}
            <section id="the-ssg-solution" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>06 // THE ENGINEERING BLUEPRINT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The Solution: Static Pre-Rendering (SSG) in React 19
              </h2>
              <p>
                To resolve this permanently without rewriting our entire application in a heavy full-stack framework, we engineered an automated <strong>Static Site Generation (SSG) pipeline</strong> that executes during our Vite production build:
              </p>

              {/* Architecture steps */}
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="flex items-center gap-3 font-bold text-white mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center">1</span>
                    Server Entry Point (<code className="text-cyan-300 font-mono text-xs">src/entry-server.tsx</code>)
                  </div>
                  <p className="text-xs text-white/60 mb-3">
                    We exposed a server render function using React 19&apos;s <code className="text-cyan-300">renderToString</code> from <code className="text-cyan-300">react-dom/server</code>:
                  </p>
                  <pre className="p-3.5 rounded-xl bg-[#050811] text-[11px] text-cyan-200 overflow-x-auto font-mono">
                    {`import { renderToString } from 'react-dom/server'
import App, { type Page } from './App'

export function render(page: Page = 'home') {
  return renderToString(<App initialPage={page} />)
}`}
                  </pre>
                </div>

                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="flex items-center gap-3 font-bold text-white mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center">2</span>
                    Automated Build Pre-Renderer (<code className="text-cyan-300 font-mono text-xs">scripts/prerender.js</code>)
                  </div>
                  <p className="text-xs text-white/60">
                    Hooked into <code className="text-cyan-300 font-mono">&quot;build&quot;: &quot;vite build &amp;&amp; node scripts/prerender.js&quot;</code>. The script compiles an SSR bundle, renders each route (<code className="text-cyan-300">/</code>, <code className="text-cyan-300">/webdev</code>, <code className="text-cyan-300">/pdf</code>, <code className="text-cyan-300">/zoho</code>, <code className="text-cyan-300">/about</code>, <code className="text-cyan-300">/blog</code>, <code className="text-cyan-300">/contact</code>), injects Schema.org JSON-LD, and writes static HTML files with zero hydration delay.
                  </p>
                </div>

                <div className="p-5 rounded-2xl glass border border-white/10">
                  <div className="flex items-center gap-3 font-bold text-white mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center">3</span>
                    Seamless Client Hydration (<code className="text-cyan-300 font-mono text-xs">src/main.tsx</code>)
                  </div>
                  <p className="text-xs text-white/60 mb-3">
                    On browser startup, we test if <code className="text-cyan-300">#root</code> already contains pre-rendered DOM elements. If yes, it hydrates seamlessly without re-rendering:
                  </p>
                  <pre className="p-3.5 rounded-xl bg-[#050811] text-[11px] text-cyan-200 overflow-x-auto font-mono">
                    {`const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <App />)
} else {
  ReactDOM.createRoot(rootElement).render(<App />)
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="before-after-metrics" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>07 // VALIDATION & BENCHMARKS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Production Benchmarks: Before vs. After
              </h2>
              <p>
                Here are the verified live metrics from our deployment to <code className="text-cyan-300">https://snaiotech.com/</code>:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-white/10 rounded-2xl overflow-hidden">
                  <thead className="bg-white/5 font-mono text-cyan-300 border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Metric</th>
                      <th className="p-3.5">Before (Raw SPA)</th>
                      <th className="p-3.5 text-emerald-400">After (SSG Pre-rendered)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr>
                      <td className="p-3.5 text-white/80">Raw HTML Payload Size</td>
                      <td className="p-3.5 text-red-300">1.9 KB (Empty shell)</td>
                      <td className="p-3.5 text-emerald-300">51.6 KB (Complete DOM)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white/80">Body Content Visible Without JS</td>
                      <td className="p-3.5 text-red-300">0 characters</td>
                      <td className="p-3.5 text-emerald-300">5,659 characters</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white/80">AI Agent (Perplexity / Claude) Readability</td>
                      <td className="p-3.5 text-red-300">Title &amp; Meta Only</td>
                      <td className="p-3.5 text-emerald-300">100% of Headings &amp; Copy</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white/80">Schema.org JSON-LD Entities</td>
                      <td className="p-3.5 text-red-300">None</td>
                      <td className="p-3.5 text-emerald-300">Organization, WebSite, Services</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-white/80">Subpage Crawlability</td>
                      <td className="p-3.5 text-red-300">0 internal URLs discoverable</td>
                      <td className="p-3.5 text-emerald-300">All 7 URLs linked via &lt;a href&gt;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 8 */}
            <section id="developer-checklist" className="space-y-5 scroll-mt-28">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>08 // ACTION PLAN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Actionable Checklist for Agencies &amp; Freelancers
              </h2>
              <p>
                If you manage React, Vue, or Vite web apps for clients, test your production URLs immediately using this 5-point checklist:
              </p>
              <div className="space-y-3 mt-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-sans text-sm mb-1">Check Your Raw HTML Source (Ctrl + U)</strong>
                    <span>Press Ctrl+U in Chrome. If <code className="text-cyan-300">&lt;div id=&quot;root&quot;&gt;</code> is empty, your site is invisible to basic crawlers.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-sans text-sm mb-1">Test with cURL or Python</strong>
                    <span>Run <code className="text-cyan-300">curl -s https://yourdomain.com | grep -i &quot;your h1 headline&quot;</code>. If no results return, bots cannot read it.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-sans text-sm mb-1">Eliminate Navigation Buttons</strong>
                    <span>Replace <code className="text-cyan-300">&lt;button onClick=...&gt;</code> with <code className="text-cyan-300">&lt;a href=&quot;/path&quot;&gt;</code> tags across all headers and footers.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-sans text-sm mb-1">Inject Schema.org JSON-LD</strong>
                    <span>Define explicit Organization, WebSite, and ProfessionalService entities in the document head.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-sans text-sm mb-1">Explicitly Welcome AI Bots in robots.txt</strong>
                    <span>Add allow rules for GPTBot, ClaudeBot, and PerplexityBot so they are permitted to parse your sitemap.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Author Signature Box */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="p-6 rounded-2xl glass border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
                  SN
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Engineered by SNAiO Tech
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    SNAiO Tech is an agile digital engineering studio based in Chennai, India. We specialize in accessible web architectures (WCAG 2.2 AA), modern technical SEO / AEO / GEO, and enterprise Zoho business automation.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Suggested Next Articles */}
      <section className="mt-24 pt-16 border-t border-white/10 max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">Keep Reading</p>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Suggested Next Articles
            </h3>
          </div>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('blog')
            }}
            className="text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
          >
            All Articles →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 transition-all group flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3 inline-block">
                SEO & AI Search
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                What is GEO? How to Rank in AI-Generated Search Results
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                Generative Engine Optimization is the new frontier. Learn how to structure your content so Google SGE and Bing Copilot cite your business in synthesized answers.
              </p>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('blog')
              }}
              className="text-xs font-mono text-cyan-400 group-hover:underline flex items-center gap-1"
            >
              Read Article ↗
            </a>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 transition-all group flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-3 inline-block">
                Performance Engineering
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Core Web Vitals in 2026: What Still Matters and What Changed
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                Google&apos;s speed and stability metrics directly influence ranking. Explore the recurring failures we find in client audits and the exact engineering fixes that work.
              </p>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('blog')
              }}
              className="text-xs font-mono text-cyan-400 group-hover:underline flex items-center gap-1"
            >
              Read Article ↗
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mt-20 max-w-5xl mx-auto px-6">
        <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-cyan-900/40 via-[#0B1528] to-[#0A0E1A] border border-cyan-400/30 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Is Your Website Invisible to Modern AI Search?
            </h3>
            <p className="text-sm text-white/65 mb-6 leading-relaxed">
              We diagnose single-page application bottlenecks, configure static pre-rendering, inject Schema.org entities, and ensure your brand dominates AI search results.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('contact')
                }}
                className="btn-primary px-7 py-3 rounded-full text-sm font-semibold"
              >
                Schedule Technical Audit
              </a>
              <a
                href="/webdev"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('webdev')
                }}
                className="btn-ghost px-6 py-3 rounded-full text-sm font-semibold text-white/80 hover:text-white"
              >
                Explore Web Dev Services →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
