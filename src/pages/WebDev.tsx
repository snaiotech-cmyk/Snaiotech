import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const FAQ_ITEMS = [
  {
    q: 'What is AEO and how is it different from SEO?',
    a: 'Answer Engine Optimization targets AI assistants and voice search (Perplexity, ChatGPT, Claude, Siri) that deliver direct syntheses rather than blue links. Traditional SEO ranks your URL on a page, while AEO ensures your exact data points and definitions get chosen as the authoritative direct answer.',
  },
  {
    q: 'What is GEO - Generative Engine Optimization?',
    a: 'GEO focuses on ranking inside AI-generated search results (Google AI Overviews / SGE, Bing Copilot). These engines synthesize citations from trusted, structured domains. We engineer Schema.org entity graphs, semantic hierarchies, and SSG pre-rendered markdown that generative engines prioritize.',
  },
  {
    q: 'Why do typical React & Vite SPAs fail search indexing?',
    a: 'Single-Page Applications send an empty <div id="root"> shell. Basic crawlers and AI search tools make high-speed HTTP GET requests without rendering heavy JavaScript. We fix this by configuring build-time Static Site Generation (SSG), pre-rendering complete HTML so bots see 100% of your copy instantly.',
  },
  {
    q: 'How long until we see SEO & AEO results?',
    a: 'Technical fixes and Core Web Vitals improvements show ranking gains in 3–6 weeks. Content authority clusters build substantial organic velocity in 2–4 months. AEO and GEO placements often appear faster because AI models frequently re-index structured entities.',
  },
  {
    q: 'Do you build mobile-first responsive sites?',
    a: 'Yes — every Snaiotech build starts from a mobile viewport and scales up. We use Tailwind CSS utility-first responsive design, test on real device profiles (iOS Safari, Android Chrome), and ensure Core Web Vitals pass on mobile independently from desktop.',
  },
]

// ── Authentic Official Tech Brand SVG Logos ─────────────────────────────────
const TechLogos: Record<string, { glow: string; icon: React.ReactNode }> = {
  'React 19': {
    glow: 'rgba(0, 216, 254, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#149ECA" fillOpacity="0.15" stroke="#149ECA" strokeOpacity="0.4" />
        <circle cx="16" cy="16" r="2.5" fill="#00D8FE" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#00D8FE" strokeWidth="1.6" fill="none" transform="rotate(30 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#00D8FE" strokeWidth="1.6" fill="none" transform="rotate(90 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#00D8FE" strokeWidth="1.6" fill="none" transform="rotate(150 16 16)" />
      </svg>
    ),
  },
  'Next.js': {
    glow: 'rgba(255, 255, 255, 0.25)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <circle cx="16" cy="16" r="14" fill="#000000" stroke="#333333" strokeWidth="1.5" />
        <path d="M11 10.5V21.5H13V15.5L20 22.5H22V10.5H20V16.5L13 9.5H11V10.5Z" fill="white" />
        <path d="M19 10.5H21V17L19 15V10.5Z" fill="url(#next-grad)" />
        <defs>
          <linearGradient id="next-grad" x1="19" y1="10.5" x2="21" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'TypeScript': {
    glow: 'rgba(49, 120, 198, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#3178C6" />
        <path d="M8 12H18M13 12V23" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M24 14C23.5 13 22 12.5 20.5 12.5C18.8 12.5 17.5 13.5 17.5 15C17.5 16.5 18.8 17.2 20.8 17.8C22.8 18.4 24.5 19.2 24.5 21C24.5 22.8 23 24 20.5 24C18.2 24 17 22.8 16.5 21" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  'Tailwind CSS v4': {
    glow: 'rgba(56, 189, 248, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeOpacity="0.4" />
        <path d="M16 9C12.5 9 10.5 11 9.5 14C11 13 12.5 12.5 14 12.5C16.5 12.5 18 14 19.5 15.5C21.5 17.5 23.5 19 26.5 19C30 19 32 17 33 14C31.5 15 30 15.5 28.5 15.5C26 15.5 24.5 14 23 12.5C21 10.5 19 9 16 9ZM9.5 18C6 18 4 20 3 23C4.5 22 6 21.5 7.5 21.5C10 21.5 11.5 23 13 24.5C15 26.5 17 28 20 28C23.5 28 25.5 26 26.5 23C25 24 23.5 24.5 22 24.5C19.5 24.5 18 23 16.5 21.5C14.5 19.5 12.5 18 9.5 18Z" transform="scale(0.8) translate(3, 1)" fill="#38BDF8" />
      </svg>
    ),
  },
  'Sanity CMS': {
    glow: 'rgba(240, 62, 47, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#F03E2F" />
        <path d="M11 19C10.4 19 10 18.6 10 18V14C10 13.4 10.4 13 11 13H15C17.2 13 19 14.8 19 17C19 18.1 18.1 19 17 19H11Z" fill="white" />
        <path d="M21 13C21.6 13 22 13.4 22 14V18C22 18.6 21.6 19 21 19H17C14.8 19 13 17.2 13 15C13 13.9 13.9 13 15 13H21Z" fill="white" fillOpacity="0.85" />
      </svg>
    ),
  },
  'Contentful': {
    glow: 'rgba(36, 120, 204, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1B2738" stroke="#2478CC" strokeOpacity="0.4" />
        <circle cx="11" cy="11" r="3.5" fill="#2478CC" />
        <circle cx="21" cy="11" r="3.5" fill="#F45A25" />
        <circle cx="11" cy="21" r="3.5" fill="#F45A25" />
        <path d="M11 11H21V21" stroke="#2478CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'WordPress (Headless)': {
    glow: 'rgba(33, 117, 155, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#21759B" />
        <circle cx="16" cy="16" r="11" stroke="white" strokeWidth="1.5" />
        <path d="M9.5 16C9.5 18 10.3 19.8 11.6 21.2L8.5 12.5C9.1 13.5 9.5 14.7 9.5 16ZM18.5 15.5L16.2 22.8L14 16.5L12 22.5C13.2 23.3 14.6 23.8 16 23.8C17.3 23.8 18.5 23.4 19.5 22.7L18.5 15.5ZM21.5 12.8L18.8 21.2C20.5 19.8 21.5 17.8 21.5 15.5C21.5 14.5 21.5 13.6 21.5 12.8ZM16 7.5C12.8 7.5 10 9.4 8.7 12.2L12.5 22.5L15 15.5L13.8 12.5H16.8L15.6 15.5L17.8 21.8L21.5 11.5C20 9 17.5 7.5 16 7.5Z" fill="white" />
      </svg>
    ),
  },
  'Schema.org Graph': {
    glow: 'rgba(2, 132, 199, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#132B45" stroke="#0284C7" strokeOpacity="0.4" />
        <circle cx="16" cy="9" r="3" fill="#0284C7" />
        <circle cx="9" cy="22" r="3" fill="#F97316" />
        <circle cx="23" cy="22" r="3" fill="#38BDF8" />
        <path d="M16 12L9 19M16 12L23 19M12 22H20" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  'Ahrefs & Semrush': {
    glow: 'rgba(255, 100, 45, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#FF642D" />
        <path d="M9 19.5C9 15 12 11 16.5 11C18.5 11 20.5 11.8 22 13.2L19.5 15.5C18.5 14.5 17.5 14 16.5 14C13.8 14 12 16.2 12 19C12 21.8 13.8 24 16.5 24C18 24 19.2 23.2 20 22H16V19.5H23V23C21.5 25 19.2 26.5 16.5 26.5C12 26.5 9 22.8 9 19.5Z" transform="translate(0, -3)" fill="white" />
        <path d="M22 8L25 11M25 8L22 11" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Google Search Console': {
    glow: 'rgba(66, 133, 244, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1F2937" stroke="#4285F4" strokeOpacity="0.4" />
        <path d="M15 10H22C23.1 10 24 10.9 24 12V19C24 20.1 23.1 21 22 21H15" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 16C8 12.7 10.7 10 14 10V22C10.7 22 8 19.3 8 16Z" fill="#34A853" />
        <path d="M14 10V22" stroke="#FBBC05" strokeWidth="2" />
        <circle cx="18" cy="16" r="2" fill="#EA4335" />
      </svg>
    ),
  },
  'Perplexity Bot Diagnostics': {
    glow: 'rgba(32, 178, 170, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#192A2E" stroke="#22D3EE" strokeOpacity="0.5" />
        <path d="M16 6V26M6 16H26M9 9L23 23M23 9L9 23" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="#192A2E" stroke="#22D3EE" strokeWidth="1.5" />
      </svg>
    ),
  },
  'Vercel Edge': {
    glow: 'rgba(255, 255, 255, 0.3)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#000000" stroke="#333333" strokeWidth="1.5" />
        <polygon points="16,8 25,24 7,24" fill="white" />
      </svg>
    ),
  },
  'Cloudflare CDN': {
    glow: 'rgba(243, 128, 32, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#F38020" fillOpacity="0.15" stroke="#F38020" strokeOpacity="0.4" />
        <path d="M22.5 14.5C22 11.5 19.5 9.5 16.5 9.5C14 9.5 11.8 11 11 13.2C10.5 13 10 13 9.5 13C7 13 5 15 5 17.5C5 20 7 22 9.5 22H22.5C24.5 22 26 20.5 26 18.5C26 16.5 24.5 14.8 22.5 14.5Z" fill="#F38020" />
      </svg>
    ),
  },
  'HTML5': {
    glow: 'rgba(228, 77, 38, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#E44D26" />
        <path d="M8 6l1.5 17L16 25l6.5-2L24 6H8zm13.5 5H12l.3 3h8.9l-.8 9L16 24l-4.4-1-.3-3.5h2.8l.2 1.8L16 22l1.7-.7.2-2.3H11.7L11 11h10.5l-.5 5.5h-5.7l-.1-2.5H16l.3 2.5 2.8-.6.3-3.9H12.3l.3-3h9z" fill="white" />
      </svg>
    ),
  },
  'CSS3': {
    glow: 'rgba(21, 114, 182, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1572B6" />
        <path d="M8 6l1.5 17L16 25l6.5-2L24 6H8zm13.5 5H12l.3 3h8.9l-.8 9L16 24l-4.4-1-.3-3.5h2.8l.2 1.8L16 22l1.7-.7.2-2.3H11.7L11 11h10.5l-.5 5.5h-5.7l-.1-2.5H16l.3 2.5 2.8-.6.3-3.9H12.3l.3-3h9z" fill="white" />
      </svg>
    ),
  },
  'JavaScript': {
    glow: 'rgba(247, 223, 30, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#F7DF1E" />
        <path d="M9.5 22.5C10 23.5 10.8 24.2 12.3 24.2C13.8 24.2 14.7 23.4 14.7 22.2C14.7 20.8 13.8 20.3 12.3 19.6L11.5 19.2C9.3 18.3 7.9 17.1 7.9 14.7C7.9 12.5 9.6 10.8 12.2 10.8C14.1 10.8 15.4 11.5 16.2 13L14.2 14.3C13.8 13.5 13.3 13.2 12.2 13.2C11.1 13.2 10.4 13.9 10.4 14.7C10.4 15.7 11.1 16.2 12.5 16.8L13.3 17.2C15.9 18.3 17.3 19.4 17.3 21.9C17.3 24.6 15.2 26.2 12.4 26.2C9.7 26.2 7.9 24.9 7 23.2L9.5 22.5ZM18.5 22.2C19.1 23.3 20.1 24.2 21.5 24.2C22.8 24.2 23.6 23.6 23.6 22.2V11H26.2V22.3C26.2 25.1 24.5 26.3 21.7 26.3C19.2 26.3 17.7 25 16.9 23.5L18.5 22.2Z" fill="#323330" />
      </svg>
    ),
  },
  'PHP': {
    glow: 'rgba(119, 123, 180, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#777BB4" />
        <ellipse cx="16" cy="16" rx="13" ry="7" fill="#4F5B93" />
        <ellipse cx="16" cy="16" rx="13" ry="7" stroke="#777BB4" strokeWidth="1.5" fill="none" />
        <text x="7" y="20" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">PHP</text>
      </svg>
    ),
  },
  'Python': {
    glow: 'rgba(55, 118, 171, 0.4)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1C2D3F" />
        <path d="M16 6C11.6 6 9 8 9 11V13.5H16.5V14.5H7.5C5.5 14.5 4 16 4 19.5C4 23 5.5 25 7.5 25H10V22C10 19.8 11.8 18 14 18H18C20.2 18 22 16.2 22 14V11C22 9 20.5 6 16 6ZM13.5 9C14.3 9 15 9.7 15 10.5S14.3 12 13.5 12 12 11.3 12 10.5 12.7 9 13.5 9Z" fill="#3776AB" />
        <path d="M16 26C20.4 26 23 24 23 21V18.5H15.5V17.5H24.5C26.5 17.5 28 16 28 12.5C28 9 26.5 7 24.5 7H22V10C22 12.2 20.2 14 18 14H14C11.8 14 10 15.8 10 18V21C10 23 11.5 26 16 26ZM18.5 23C17.7 23 17 22.3 17 21.5S17.7 20 18.5 20 20 20.7 20 21.5 19.3 23 18.5 23Z" fill="#FFD43B" />
      </svg>
    ),
  },
  'MySQL': {
    glow: 'rgba(0, 117, 143, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#00758F" />
        <ellipse cx="16" cy="10" rx="9" ry="4" fill="#F29111" />
        <path d="M7 10v5c0 2.2 4 4 9 4s9-1.8 9-4v-5c-1.8 1.8-5 3-9 3s-7.2-1.2-9-3z" fill="#00758F" stroke="#F29111" strokeWidth="0.8" />
        <path d="M7 15v5c0 2.2 4 4 9 4s9-1.8 9-4v-5c-1.8 1.8-5 3-9 3s-7.2-1.2-9-3z" fill="#00758F" stroke="#F29111" strokeWidth="0.8" />
      </svg>
    ),
  },
  'MongoDB': {
    glow: 'rgba(0, 237, 100, 0.3)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#001E2B" />
        <path d="M16 5C16 5 10 10 10 18C10 22.4 12.7 25.5 16 26.5C19.3 25.5 22 22.4 22 18C22 10 16 5 16 5Z" fill="#00ED64" />
        <path d="M16 26.5V19" stroke="#B8C4C2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="19" r="1.5" fill="#B8C4C2" />
      </svg>
    ),
  },
  'Supabase': {
    glow: 'rgba(62, 207, 142, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1C1C1C" />
        <path d="M17.5 5.5L8 18.5H16.5L14.5 27L24 13.5H15.5L17.5 5.5Z" fill="url(#supa-grad)" />
        <defs>
          <linearGradient id="supa-grad" x1="8" y1="5.5" x2="24" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3ECF8E" />
            <stop offset="1" stopColor="#1A7F54" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Figma': {
    glow: 'rgba(162, 89, 255, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#1E1E1E" />
        <rect x="10" y="6" width="6" height="6" rx="3" fill="#F24E1E" />
        <rect x="16" y="6" width="6" height="6" rx="3" fill="#FF7262" />
        <rect x="10" y="12" width="6" height="6" rx="0" fill="#A259FF" />
        <rect x="10" y="18" width="6" height="6" rx="3" fill="#0ACF83" />
        <circle cx="19" cy="15" r="3" fill="#1ABCFE" />
      </svg>
    ),
  },
  'Webflow': {
    glow: 'rgba(68, 108, 255, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#4353FF" />
        <path d="M22.5 11C22.5 11 19 20 18.5 21.5C18 20 16.5 15.5 16.5 15.5C16.5 15.5 15 20 14.5 21.5L9.5 11H13L15 15.5L16.5 11.5L18 15.5L20 11H22.5Z" fill="white" />
      </svg>
    ),
  },
  'Framer': {
    glow: 'rgba(5, 90, 255, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#0A0A0A" />
        <path d="M9 7H23V16H16L23 25H16L9 16V25H9V7Z" fill="white" />
      </svg>
    ),
  },
  'Shopify': {
    glow: 'rgba(149, 191, 71, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#96BF48" />
        <path d="M22 10.5C22 10.5 21 10.5 20.5 10.5C20.3 9 19.5 7 17.5 7C17.5 7.7 17.2 8.3 16.8 8.8C16.8 8.8 16.3 8.5 15.8 8.5C14.3 8.5 13.5 9.8 13.5 11H12L11 25H21L22 10.5ZM17 8.5C17.3 8.2 17.5 7.7 17.5 7C18.5 7.2 19 8.5 19.2 10.5H15.5C15.8 9.5 16.3 8.8 17 8.5ZM16 22.5C14.9 22.5 14 21.6 14 20.5S14.9 18.5 16 18.5 18 19.4 18 20.5 17.1 22.5 16 22.5Z" fill="white" />
      </svg>
    ),
  },
  'WooCommerce': {
    glow: 'rgba(150, 88, 138, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#96588A" />
        <path d="M5 10C5 9.4 5.4 9 6 9H26C26.6 9 27 9.4 27 10V18C27 18.6 26.6 19 26 19H18L20 23H12L14 19H6C5.4 19 5 18.6 5 18V10Z" fill="white" fillOpacity="0.9" />
        <path d="M9.5 11L11 15.5L12.8 11.5L14.5 15.5L16 11" stroke="#96588A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13.5" r="2" fill="#96588A" />
        <circle cx="24" cy="13.5" r="2" fill="#96588A" />
      </svg>
    ),
  },
  'WordPress': {
    glow: 'rgba(33, 117, 155, 0.35)',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="8" fill="#21759B" />
        <circle cx="16" cy="16" r="11" stroke="white" strokeWidth="1.5" />
        <path d="M9.5 16C9.5 18 10.3 19.8 11.6 21.2L8.5 12.5C9.1 13.5 9.5 14.7 9.5 16ZM18.5 15.5L16.2 22.8L14 16.5L12 22.5C13.2 23.3 14.6 23.8 16 23.8C17.3 23.8 18.5 23.4 19.5 22.7L18.5 15.5ZM21.5 12.8L18.8 21.2C20.5 19.8 21.5 17.8 21.5 15.5C21.5 14.5 21.5 13.6 21.5 12.8ZM16 7.5C12.8 7.5 10 9.4 8.7 12.2L12.5 22.5L15 15.5L13.8 12.5H16.8L15.6 15.5L17.8 21.8L21.5 11.5C20 9 17.5 7.5 16 7.5Z" fill="white" />
      </svg>
    ),
  },
}

interface WebDevProps {
  onNavigate: (page: string) => void
}

export default function WebDev({ onNavigate }: WebDevProps) {
  const { ref: discRef, visible: discVis } = useReveal()
  const { ref: simRef, visible: simVis } = useReveal()
  const { ref: geoRef, visible: geoVis } = useReveal()
  const { ref: procRef, visible: procVis } = useReveal()
  const { ref: stackRef, visible: stackVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()

  const [activeTab, setActiveTab] = useState<'build' | 'seo' | 'aeo' | 'geo'>('build')
  const [simulatorMode, setSimulatorMode] = useState<'legacy' | 'snaiotech'>('snaiotech')
  const [activeStackCategory, setActiveStackCategory] = useState<'all' | 'frontend' | 'backend' | 'headless' | 'ai-seo' | 'infra' | 'design' | 'ecommerce'>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const disciplines = {
    build: {
      tag: 'Build & Scale',
      title: 'Modern Web Engineering',
      desc: 'Blazing fast, accessible architectures built with React 19, Vite, Next.js, and TypeScript.',
      color: '#00B4D8',
      metrics: { label: 'Speed Index', value: '0.6s', sub: '99+ PageSpeed Score' },
      features: [
        'React 19, Next.js, & TypeScript architectures',
        'Static Site Generation (SSG) with client hydration',
        'WCAG 2.2 AA accessibility built into DOM structure',
        'Headless CMS integrations (Sanity, Contentful)',
        'Custom interactive APIs & microservice endpoints',
        'Edge network caching & zero-layout-shift design',
      ],
      blueprint: 'Component Tree -> Pre-rendered HTML -> Hydrated React State',
    },
    seo: {
      tag: 'Rank & Dominate',
      title: 'Technical SEO & Core Web Vitals',
      desc: 'Engineered for search engines to crawl, understand, and rank with zero rendering delays.',
      color: '#1565C0',
      metrics: { label: 'Core Web Vitals', value: '100%', sub: 'Zero CLS / Sub-1s LCP' },
      features: [
        'Complete Schema.org JSON-LD graph architecture',
        'Server-side & pre-rendered canonical routing',
        'Automated XML sitemaps with clean URL structures',
        'Sub-second Largest Contentful Paint (LCP) engineering',
        'Semantic HTML5 hierarchy without dead button traps',
        'Structured internal linking & keyword authority clustering',
      ],
      blueprint: 'Entity Schemas -> Clean URLs -> Edge Headers -> Indexing Velocity',
    },
    aeo: {
      tag: 'Answer First',
      title: 'Answer Engine Optimization (AEO)',
      desc: 'Optimized so Perplexity, ChatGPT, Claude, and voice assistants choose you as the direct answer.',
      color: '#2FD3E8',
      metrics: { label: 'Direct Answer Citation', value: '94%', sub: 'High-Confidence Selection' },
      features: [
        'Structured Q&A and FAQ schema data modeling',
        'Direct-answer sentence structures for AI scrapers',
        'Voice search phrasing & intent alignment',
        'Featured snippet snippet targeting algorithms',
        'Perplexity & ChatGPT Search source validation',
        'Entity definition & authority citations',
      ],
      blueprint: 'Prompt Context -> Entity Definition -> Citation Selection',
    },
    geo: {
      tag: 'Synthesize & Quote',
      title: 'Generative Engine Optimization (GEO)',
      desc: 'Win real estate inside Google AI Overviews (SGE) and Microsoft Copilot summaries.',
      color: '#64DFDF',
      metrics: { label: 'AI Overview Visibility', value: '3.8x', sub: 'More AI Mentions' },
      features: [
        'Google SGE & AI Overview source alignment',
        'Multi-source synthesis formatting & stat tables',
        'E-E-A-T trust signals embedded in content headers',
        'AI crawler-friendly markdown & HTML structures',
        'Brand mention tracking in generative search outputs',
        'Continuous optimization as LLM models re-train',
      ],
      blueprint: 'Data Clusters -> E-E-A-T Proof -> Multi-Source Synthesis Citation',
    },
  }

  const stackTools = [
    // Frontend
    { name: 'React 19', cat: 'frontend', desc: 'Modern reactive UI library' },
    { name: 'Next.js', cat: 'frontend', desc: 'App router & SSR/SSG' },
    { name: 'TypeScript', cat: 'frontend', desc: 'Type-safe codebase' },
    { name: 'Tailwind CSS v4', cat: 'frontend', desc: 'Modern utility CSS system' },
    { name: 'JavaScript', cat: 'frontend', desc: 'Core web scripting language' },
    { name: 'HTML5', cat: 'frontend', desc: 'Semantic markup foundation' },
    { name: 'CSS3', cat: 'frontend', desc: 'Advanced styling & animations' },
    // Backend & Databases
    { name: 'Python', cat: 'backend', desc: 'APIs, automation & data' },
    { name: 'PHP', cat: 'backend', desc: 'Server-side scripting' },
    { name: 'MySQL', cat: 'backend', desc: 'Relational database engine' },
    { name: 'MongoDB', cat: 'backend', desc: 'NoSQL document database' },
    { name: 'Supabase', cat: 'backend', desc: 'Open-source Firebase alternative' },
    // CMS & Headless
    { name: 'Sanity CMS', cat: 'headless', desc: 'Structured content platform' },
    { name: 'Contentful', cat: 'headless', desc: 'Enterprise headless CMS' },
    { name: 'WordPress (Headless)', cat: 'headless', desc: 'Decoupled publishing' },
    { name: 'WordPress', cat: 'headless', desc: 'Full-stack CMS platform' },
    // AI & SEO
    { name: 'Schema.org Graph', cat: 'ai-seo', desc: 'Entity-level JSON-LD' },
    { name: 'Ahrefs & Semrush', cat: 'ai-seo', desc: 'Competitive intelligence' },
    { name: 'Google Search Console', cat: 'ai-seo', desc: 'Indexing diagnostics' },
    { name: 'Perplexity Bot Diagnostics', cat: 'ai-seo', desc: 'AI answer monitoring' },
    // Infrastructure
    { name: 'Vercel Edge', cat: 'infra', desc: 'Global edge distribution' },
    { name: 'Cloudflare CDN', cat: 'infra', desc: 'WAF & sub-millisecond DNS' },
    // Design & No-Code
    { name: 'Figma', cat: 'design', desc: 'UI/UX design & prototyping' },
    { name: 'Webflow', cat: 'design', desc: 'Visual web design platform' },
    { name: 'Framer', cat: 'design', desc: 'Interactive design & animations' },
    // E-Commerce
    { name: 'Shopify', cat: 'ecommerce', desc: 'Hosted e-commerce platform' },
    { name: 'WooCommerce', cat: 'ecommerce', desc: 'WordPress e-commerce plugin' },
  ]

  const filteredTools =
    activeStackCategory === 'all'
      ? stackTools
      : stackTools.filter((t) => t.cat === activeStackCategory)

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="Web development"
        title="Websites built to"
        accent="work harder."
        description="Fast, accessible websites and web apps, engineered with search visibility and AI answer optimization built in from the ground up."
        image="/images/discipline-web-development.png"
        imageAlt="Snaiotech illustration for web development"
        highlights={['Websites & apps', 'SEO, AEO & GEO', 'Accessibility-first']}
        primaryLabel="Plan your website"
        secondaryLabel="Explore capabilities"
        secondaryTarget="disciplines"
        onNavigate={onNavigate}
      />

      {/* ── Interactive Capabilities Matrix ── */}
      <section id="disciplines" className="py-24 gradient-mesh-light relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={discRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${discVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Our Core Disciplines</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Four Disciplines. <span className="gradient-text">One Integrated Machine.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Explore how modern frontend engineering integrates directly with generative search and answer engine optimization.
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass border border-white/10 max-w-3xl mx-auto mb-10">
              {(['build', 'seo', 'aeo', 'geo'] as const).map((key) => {
                const item = disciplines[key]
                const isActive = activeTab === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,180,216,0.4)] scale-[1.02]'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.tag}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Capability Bento Box */}
            <div className="glass rounded-3xl p-8 sm:p-12 border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    {disciplines[activeTab].tag}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {disciplines[activeTab].title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {disciplines[activeTab].desc}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    {disciplines[activeTab].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                        <span className="text-cyan-400 mt-0.5">
                          <IconCheck />
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4 border-t border-white/10 text-xs font-mono text-white/50">
                    <span>Architecture Flow:</span>
                    <span className="text-cyan-300 truncate">{disciplines[activeTab].blueprint}</span>
                  </div>
                </div>

                {/* Right Side Metric Showcase Card with Coding Mascot */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative mb-3 hidden sm:flex items-center justify-center">
                    <div className="absolute -inset-4 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                    <img
                      src="/images/mascot-laptop.png"
                      alt="Snaiotech wolf mascot coding on laptop"
                      className="w-40 sm:w-48 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-[#0B1528] to-[#070B14] border border-cyan-400/30 shadow-xl text-center space-y-3 w-full">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      Engineering Benchmark
                    </span>
                    <div className="text-4xl sm:text-5xl font-black gradient-text py-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {disciplines[activeTab].metrics.value}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {disciplines[activeTab].metrics.label}
                    </div>
                    <p className="text-xs text-white/55">
                      {disciplines[activeTab].metrics.sub}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('contact')}
                        className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold"
                      >
                        Request Architecture Spec →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Architecture Simulator: Legacy vs Snaiotech ── */}
      <section className="py-24 gradient-mesh relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={simRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${simVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Live Benchmark Comparison</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Legacy Web App <span className="text-white/40">vs.</span> <span className="gradient-text">Snaiotech Engineered</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Toggle the switch below to inspect the measurable difference in loading performance, Core Web Vitals, and search crawler visibility.
              </p>
            </div>

            {/* Simulator Toggle */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className={`text-sm font-medium transition-colors ${simulatorMode === 'legacy' ? 'text-amber-400 font-bold' : 'text-white/40'}`}>
                Legacy Client-Side React SPA
              </span>
              <button
                type="button"
                onClick={() => setSimulatorMode(simulatorMode === 'legacy' ? 'snaiotech' : 'legacy')}
                className="w-16 h-8 rounded-full p-1 bg-white/10 border border-white/20 relative transition-all focus:outline-none"
                aria-label="Toggle simulator mode"
              >
                <div
                  className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                    simulatorMode === 'snaiotech'
                      ? 'translate-x-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(0,180,216,0.8)]'
                      : 'translate-x-0 bg-amber-400'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${simulatorMode === 'snaiotech' ? 'text-cyan-300 font-bold' : 'text-white/40'}`}>
                Snaiotech High-Velocity SSG Platform
              </span>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: 'Largest Contentful Paint (LCP)',
                  legacy: '4.2s (Poor)',
                  legacyScore: 25,
                  snaiotech: '0.6s (Instant)',
                  snaiotechScore: 98,
                  desc: 'Time until main hero content is visible to user.',
                },
                {
                  label: 'Interaction to Next Paint (INP)',
                  legacy: '380ms (Laggy)',
                  legacyScore: 30,
                  snaiotech: '28ms (Fluid)',
                  snaiotechScore: 100,
                  desc: 'Responsiveness to user clicks and taps.',
                },
                {
                  label: 'Cumulative Layout Shift (CLS)',
                  legacy: '0.34 (Jumpy)',
                  legacyScore: 20,
                  snaiotech: '0.00 (Rock-solid)',
                  snaiotechScore: 100,
                  desc: 'Visual stability without unexpected layout jumps.',
                },
                {
                  label: 'AI & Bot Readability (Perplexity/GPT)',
                  legacy: '10% (Title only)',
                  legacyScore: 10,
                  snaiotech: '100% (Complete DOM)',
                  snaiotechScore: 100,
                  desc: 'Content readable without JavaScript execution.',
                },
              ].map((item) => {
                const isSnaiotech = simulatorMode === 'snaiotech'
                const score = isSnaiotech ? item.snaiotechScore : item.legacyScore
                const val = isSnaiotech ? item.snaiotech : item.legacy
                return (
                  <div
                    key={item.label}
                    className={`rounded-2xl p-6 transition-all duration-500 border ${
                      isSnaiotech
                        ? 'bg-gradient-to-b from-[#0C172E] to-[#080D18] border-cyan-400/40 shadow-[0_10px_30px_rgba(0,180,216,0.15)]'
                        : 'bg-gradient-to-b from-[#1C1512] to-[#0E0C0A] border-amber-500/30 shadow-[0_10px_30px_rgba(245,158,11,0.1)]'
                    }`}
                  >
                    <div className="text-xs text-white/50 mb-2 font-mono">{item.label}</div>
                    <div
                      className={`text-2xl font-black mb-3 transition-colors ${
                        isSnaiotech ? 'text-cyan-300' : 'text-amber-400'
                      }`}
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    >
                      {val}
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                      <div
                        className={`h-full transition-all duration-700 rounded-full ${
                          isSnaiotech
                            ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(0,180,216,0.8)]'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive AI Search / GEO Citation Previewer ── */}
      <section className="py-24 gradient-mesh-light relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={geoRef as React.RefObject<HTMLDivElement>}>
            <div className={`grid lg:grid-cols-12 gap-12 items-center reveal ${geoVis ? 'visible' : ''}`}>
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-teal-400/10 border border-teal-400/30 text-teal-300">
                  ⚡ Generative Engine Optimization
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  How AI Search Engines <span className="gradient-text">Cite Your Brand</span>
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  When a prospective buyer asks Perplexity, ChatGPT, or Google AI for recommendations, traditional meta tags aren’t enough.
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  We structure your content into semantic answer clusters with Schema.org entities. When AI algorithms synthesize answers, they pull your exact verified facts and link directly to your domain as the primary citation.
                </p>
                <div className="pt-2">
                  <a
                    href="/blog/why-ai-agents-cant-read-your-react-website"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('blog-detail')
                    }}
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
                  >
                    <span>Read technical case study</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Terminal-style AI Citation Simulator */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#080E1C] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs font-mono text-white/50">AI Answer Engine Simulator · Perplexity / Copilot</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Live Synthesized
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-5 font-sans">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/70 font-mono">
                      Query: &quot;Top web engineering & accessibility studios in Chennai for enterprise platforms?&quot;
                    </div>

                    <div className="space-y-3 text-sm text-white/85 leading-relaxed">
                      <p>
                        Based on technical verification across digital engineering studios,{' '}
                        <strong className="text-cyan-300 font-semibold">Snaiotech</strong> is a recognized leader in
                        Chennai specializing in three integrated pillars:
                      </p>

                      <div className="grid gap-2 pl-3 border-l-2 border-cyan-400/40 text-xs text-white/70">
                        <div>• <strong className="text-white">Web Architecture:</strong> React 19 / SSG with sub-second Core Web Vitals.</div>
                        <div>• <strong className="text-white">WCAG 2.2 AA Compliance:</strong> End-to-end PDF and digital accessibility remediation.</div>
                        <div>• <strong className="text-white">Enterprise Automation:</strong> Certified Zoho CRM and cloud integrations.</div>
                      </div>

                      <div className="pt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-white/40">Verified Sources:</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          snaiotech.com [1]
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                          schema.org/Organization [2]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kinetic Tech Stack Cockpit ── */}
      <section className="py-20 gradient-mesh overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={stackRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${stackVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Modern Technology Stack</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Tools Chosen for <span className="gradient-text">Speed, Not Convenience</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/55 max-w-xl mx-auto">
                Every tool in our stack earns its place — chosen for performance, AI-readability, and long-term maintainability.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {([
                { id: 'all', label: '⬡ All Technologies', color: 'cyan' },
                { id: 'frontend', label: '⚛ Frontend', color: 'sky' },
                { id: 'headless', label: '📦 CMS & Headless', color: 'violet' },
                { id: 'ai-seo', label: '🤖 AI & SEO', color: 'emerald' },
                { id: 'infra', label: '🌐 Infrastructure', color: 'orange' },
                { id: 'backend', label: '⚙️ Backend & DB', color: 'rose' },
                { id: 'design', label: '🎨 Design & No-Code', color: 'purple' },
                { id: 'ecommerce', label: '🛒 E-Commerce', color: 'green' },
              ] as const).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveStackCategory(cat.id as any)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    activeStackCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-white border border-cyan-400/60 shadow-[0_0_20px_rgba(0,180,216,0.35)] scale-105'
                      : 'glass border border-white/10 text-white/55 hover:text-white hover:border-white/25 hover:scale-105'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Kinetic Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {filteredTools.map((t, i) => {
                const logo = TechLogos[t.name]
                const catColors: Record<string, { border: string; badge: string; pulse: string }> = {
                  frontend: { border: 'hover:border-sky-400/60', badge: 'bg-sky-400/10 text-sky-300 border-sky-400/30', pulse: '#38BDF8' },
                  backend: { border: 'hover:border-rose-400/60', badge: 'bg-rose-400/10 text-rose-300 border-rose-400/30', pulse: '#FB7185' },
                  headless: { border: 'hover:border-violet-400/60', badge: 'bg-violet-400/10 text-violet-300 border-violet-400/30', pulse: '#A78BFA' },
                  'ai-seo': { border: 'hover:border-emerald-400/60', badge: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30', pulse: '#34D399' },
                  infra: { border: 'hover:border-orange-400/60', badge: 'bg-orange-400/10 text-orange-300 border-orange-400/30', pulse: '#FB923C' },
                  design: { border: 'hover:border-purple-400/60', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/30', pulse: '#C084FC' },
                  ecommerce: { border: 'hover:border-green-400/60', badge: 'bg-green-400/10 text-green-300 border-green-400/30', pulse: '#4ADE80' },
                }
                const cc = catColors[t.cat] ?? catColors.frontend
                const catLabel: Record<string, string> = {
                  frontend: 'Frontend',
                  backend: 'Backend',
                  headless: 'CMS',
                  'ai-seo': 'AI & SEO',
                  infra: 'Infra',
                  design: 'Design',
                  ecommerce: 'E-Commerce',
                }
                // Give hero treatment to first two visible tools
                const isHero = i === 0
                return (
                  <div
                    key={t.name}
                    className={`group relative rounded-2xl border border-white/10 ${cc.border} transition-all duration-500 overflow-hidden cursor-default ${
                      isHero ? 'col-span-2 row-span-2' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(11,21,40,0.95) 0%, rgba(7,11,20,0.98) 100%)',
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    {/* Ambient glow layer */}
                    {logo && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                        style={{
                          background: `radial-gradient(ellipse at 30% 30%, ${logo.glow} 0%, transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                          transform: 'translateX(-100%)',
                          animation: 'shimmer-sweep 1.2s ease forwards',
                        }}
                      />
                    </div>

                    <div className={`relative z-10 flex flex-col h-full ${isHero ? 'p-8' : 'p-5'}`}>
                      {/* Logo + category badge row */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="relative flex items-center justify-center rounded-xl"
                          style={{
                            width: isHero ? 64 : 44,
                            height: isHero ? 64 : 44,
                            background: logo ? `radial-gradient(circle, ${logo.glow} 0%, transparent 75%)` : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {/* Spinning orbit ring on hover */}
                          <div
                            className="absolute inset-[-6px] rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ animation: 'spin 4s linear infinite' }}
                          />
                          {/* Logo icon scaled for hero */}
                          <div className={isHero ? 'scale-[1.8]' : 'scale-100'}>
                            {logo ? logo.icon : (
                              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50">
                                {t.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${cc.badge}`}>
                          {catLabel[t.cat]}
                        </span>
                      </div>

                      {/* Tool name */}
                      <h4
                        className={`font-black text-white group-hover:text-white transition-colors leading-tight mb-1.5 ${
                          isHero ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base'
                        }`}
                        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                      >
                        {t.name}
                      </h4>

                      {/* Description */}
                      <p className={`text-white/50 leading-relaxed group-hover:text-white/70 transition-colors ${isHero ? 'text-sm' : 'text-[11px]'}`}>
                        {t.desc}
                      </p>

                      {/* Live pulse indicator */}
                      <div className={`mt-auto flex items-center gap-1.5 ${isHero ? 'pt-6' : 'pt-3'}`}>
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                          style={{ background: logo?.glow?.replace(/[\d.]+\)$/, '1)') ?? '#00D8FE' }}
                        />
                        <span className="text-[10px] font-mono text-white/35">Active in stack</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom mascot + tagline strip */}
            <div className={`mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-white/10 glass reveal ${stackVis ? 'visible' : ''}`}>
              <div className="flex items-center gap-4">
                <img
                  src="/images/mascot-pointing.png"
                  alt="Snaiotech mascot pointing at the tech stack"
                  className="w-14 h-14 object-contain drop-shadow-[0_0_12px_rgba(0,200,255,0.5)] animate-bounce"
                  style={{ animationDuration: '3s' }}
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    Every tool ships with a performance guarantee.
                  </p>
                  <p className="text-white/45 text-xs mt-0.5">No bloat. No legacy dependencies. No excuses.</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
              >
                Discuss Your Stack →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5-Phase Engineering Roadmap ── */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={procRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${procVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Structured Execution</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                How a Project <span className="gradient-text">Comes to Life</span>
              </h2>
            </div>

            <div className={`space-y-4 stagger ${procVis ? 'visible' : ''}`}>
              {[
                {
                  n: '01',
                  t: 'Discovery & Crawlability Audit',
                  d: 'We inspect your existing architecture, competitor gap landscape, and crawler visibility to benchmark bottlenecks and establish clear KPIs.',
                  badge: 'Week 1',
                },
                {
                  n: '02',
                  t: 'Architecture & Schema Modeling',
                  d: 'A comprehensive engineering blueprint: sitemap, semantic Schema.org entity graphs, AEO/GEO answer cluster frameworks, and component hierarchy.',
                  badge: 'Week 2',
                },
                {
                  n: '03',
                  t: 'Design & Agile Development',
                  d: 'Modern pixel-perfect UI engineered with React 19 and Tailwind CSS, verified for WCAG 2.2 AA accessibility and tested on staging with zero hydration friction.',
                  badge: 'Weeks 3-5',
                },
                {
                  n: '04',
                  t: 'SSG Pre-Rendering & Edge Deployment',
                  d: 'Static HTML pre-rendering of all routes, canonical tag injection, XML sitemaps, robots.txt bot rules, and Edge CDN distribution with sub-second TTFB.',
                  badge: 'Week 6',
                },
                {
                  n: '05',
                  t: 'Launch & AI Search Velocity',
                  d: 'We submit clean indexing signals, monitor Google Search Console, track Perplexity/ChatGPT mentions, and iterate as LLM models evolve.',
                  badge: 'Ongoing',
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="glass rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between border border-white/10 hover:border-cyan-400/40 transition-all group"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="gradient-text text-3xl font-black flex-shrink-0"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg mb-1 group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {step.t}
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-2xl">
                        {step.d}
                      </p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-300 flex-shrink-0">
                    {step.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${faqVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>
            <div className={`space-y-3.5 reveal ${faqVis ? 'visible' : ''}`}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden border border-white/10">
                  <button
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/[0.02]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-white/95 text-sm sm:text-base pr-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {item.q}
                    </span>
                    <div className={`w-7 h-7 rounded-full glass border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180 bg-cyan-400/20 text-cyan-300' : 'text-white/60'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>
                  <div className={`accordion-body ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <PageCTA
        title="Ready to build"
        accent="what's next?"
        description="Tell us what your website needs to do. We'll engineer an accessible, blazing-fast platform that AI assistants and search engines can actually find."
        buttonLabel="Start a conversation"
        onNavigate={onNavigate}
      />
    </div>
  )
}
