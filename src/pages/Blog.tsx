import { useState } from 'react'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const CATEGORIES = ['All', 'Web Dev', 'Accessibility', 'Zoho', 'SEO/AI']

const POSTS = [
  { cat: 'SEO/AI', date: 'Sep 2, 2026', title: 'What is GEO? How to Rank in AI-Generated Search Results', excerpt: "Generative Engine Optimization is the new frontier of search visibility. As Google SGE and Bing Copilot synthesize answers, being 'found' means being cited. Here's what it means and how to prepare your content now.", imgId: '1686061593213-98dad7c599b9', readTime: '7 min' },
  { cat: 'Accessibility', date: 'Aug 28, 2026', title: 'WCAG 2.2 — What Changed and Why It Matters for Your Business', excerpt: 'The latest WCAG update introduces 9 new success criteria. We break down each with practical remediation steps, real-world impact examples, and a prioritization framework.', imgId: '1778873750399-338b94f7feda', readTime: '10 min' },
  { cat: 'Zoho', date: 'Aug 20, 2026', title: 'Zoho CRM vs Salesforce: The 2026 Honest Comparison', excerpt: "We've implemented both extensively. Here's what teams actually experience, when Zoho wins on value and flexibility, and when Salesforce is genuinely the better choice.", imgId: '1551288049-bebda4e38f71', readTime: '12 min' },
  { cat: 'Web Dev', date: 'Aug 12, 2026', title: 'Core Web Vitals in 2026: What Still Matters and What Changed', excerpt: "Google's ranking signals have evolved. We audit dozens of sites per year and see the same Core Web Vitals failures repeatedly. This is what actually moves the needle.", imgId: '1611078489935-0cb964de46d6', readTime: '8 min' },
  { cat: 'SEO/AI', date: 'Aug 5, 2026', title: 'Answer Engine Optimization: A Practical Guide for Non-Technical Teams', excerpt: "AEO doesn't require an engineering team. It requires understanding how AI assistants select answers, and structuring your content to be chosen.", imgId: '1515879218367-8466d910aaa4', readTime: '9 min' },
  { cat: 'Accessibility', date: 'Jul 28, 2026', title: 'The ADA PDF Lawsuit Landscape: What Businesses Need to Know', excerpt: 'Over 4,600 ADA digital accessibility lawsuits were filed in 2024. A significant portion target inaccessible PDFs. We explain the legal landscape and what remediation actually costs.', imgId: '1772588627342-5ec373e236d8', readTime: '11 min' },
  { cat: 'Zoho', date: 'Jul 15, 2026', title: "Zoho Blueprint: How to Actually Use It (and Why Most Teams Don't)", excerpt: "Blueprint is one of Zoho CRM's most powerful features and one of the most underused. This step-by-step guide shows how to design and deploy a process your team will actually follow.", imgId: '1560472354-b33ff0c44a43', readTime: '13 min' },
  { cat: 'Web Dev', date: 'Jul 8, 2026', title: "Headless CMS in 2026: When It's Worth It and When It's Overkill", excerpt: 'Headless architecture is often recommended for the wrong reasons. We lay out a decision framework based on team size, publishing frequency, personalization needs, and performance goals.', imgId: '1542831371-29b0f74f9713', readTime: '8 min' },
  { cat: 'SEO/AI', date: 'Jun 30, 2026', title: "E-E-A-T: Google's Hidden Ranking Factor That Most Teams Get Wrong", excerpt: "Experience, Expertise, Authoritativeness, Trustworthiness — Google's quality rater guidelines describe what AI-era ranking actually rewards. Here's how to demonstrate all four.", imgId: '1461749280684-dccba630e2f6', readTime: '10 min' },
]

const CAT_COLORS: Record<string, string> = {
  'Web Dev': '#1565C0',
  'Accessibility': '#00B4D8',
  'Zoho': '#2FD3E8',
  'SEO/AI': '#0B4F8A',
}

interface BlogProps { onNavigate: (page: string) => void }

export default function Blog({ onNavigate }: BlogProps) {
  const [activecat, setActivecat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = POSTS.filter((p) => {
    const matchCat = activecat === 'All' || p.cat === activecat
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = POSTS[0]

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="gradient-mesh grid-overlay pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-fadeUp">
            <p className="eyebrow mb-3">Insights & expertise</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-4 display-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              The Snaiotech <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl">
              Practical thinking on web development, digital accessibility, Zoho, and the evolving landscape of AI-driven search.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post with real image */}
      <section className="py-12 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={img(featured.imgId, 800, 500)} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,14,26,0.6))' }} />
                <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,14,26,0.88))' }} />
                <span className="absolute top-4 left-4 eyebrow px-3 py-1 rounded-full"
                  style={{ background: `${CAT_COLORS[featured.cat]}22`, border: `1px solid ${CAT_COLORS[featured.cat]}44`, color: CAT_COLORS[featured.cat] }}>
                  Featured · {featured.cat}
                </span>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-extrabold text-white mb-4 leading-snug display-close" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  {featured.title}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/35" style={{ fontFamily: 'Space Mono, monospace' }}>
                    <span>{featured.date}</span><span>·</span><span>{featured.readTime} read</span>
                  </div>
                  <button className="btn-primary px-5 py-2.5 rounded-full text-sm">Read article</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + search */}
      <section className="py-8 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivecat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activecat === cat ? 'btn-primary' : 'btn-ghost text-white/60'}`}
                  style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="glass-input rounded-full pl-9 pr-5 py-2 text-sm w-56"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post grid with real images */}
      <section className="py-6 pb-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No posts match your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <button key={post.title} className="glass rounded-2xl overflow-hidden text-left flex flex-col h-full group hover:border-cyan-500/30 transition-all duration-200">
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={img(post.imgId, 600, 352)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.05), rgba(10,14,26,0.78))' }} />
                    <span className="absolute top-3 left-4 eyebrow px-2.5 py-0.5 rounded-full text-xs"
                      style={{ background: `${CAT_COLORS[post.cat]}22`, border: `1px solid ${CAT_COLORS[post.cat]}44`, color: CAT_COLORS[post.cat] }}>
                      {post.cat}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs text-white/35 mb-2 flex items-center gap-2" style={{ fontFamily: 'Space Mono, monospace' }}>
                      {post.date} <span>·</span> {post.readTime} read
                    </span>
                    <h3 className="font-bold text-white text-sm leading-snug mb-3 flex-1 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/45 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-medium">
                      Read more
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
