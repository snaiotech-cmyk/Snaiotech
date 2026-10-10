import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import WebDev from '@/pages/WebDev'
import PDFAccess from '@/pages/PDFAccess'
import Zoho from '@/pages/Zoho'
import About from '@/pages/About'
import Blog from '@/pages/Blog'
import Contact from '@/pages/Contact'
import Admin from '@/pages/Admin'
import BlogPostDetail from '@/pages/BlogPostDetail'

export type Page = 'home' | 'webdev' | 'pdf' | 'zoho' | 'about' | 'blog' | 'contact' | 'admin' | 'blog-detail'

export const PAGE_TITLES: Record<Page, string> = {
  home: 'Snaiotech - Digital Services Built to Dominate',
  webdev: 'Web Dev & SEO/AEO/GEO - Snaiotech',
  pdf: 'PDF Accessibility & WCAG Compliance - Snaiotech',
  zoho: 'Zoho Deployment & Customization - Snaiotech',
  about: 'Who We Are - Snaiotech',
  blog: 'Blog - Snaiotech',
  contact: 'Contact Us - Snaiotech',
  admin: 'Admin Portal - Snaiotech',
  'blog-detail': 'Why AI Agents & Search Engines Can\'t Read Your React Website - Snaiotech',
}

export const getPageFromPath = (pathname?: string): Page => {
  const path = (pathname ?? (typeof window !== 'undefined' ? window.location.pathname : ''))
    .replace(/^\/|\/$/g, '')
    .toLowerCase()
  if (!path || path === 'home') return 'home'
  if (path === 'webdev' || path === 'web-development') return 'webdev'
  if (path === 'pdf' || path === 'pdf-accessibility') return 'pdf'
  if (path === 'zoho' || path === 'zoho-implementation') return 'zoho'
  if (path === 'about') return 'about'
  if (path.includes('why-ai') || path === 'blog-detail' || path === 'blog/why-ai-agents-cant-read-your-react-website') return 'blog-detail'
  if (path === 'blog') return 'blog'
  if (path === 'contact') return 'contact'
  if (path === 'admin') return 'admin'
  return 'home'
}

export const getPathForPage = (p: Page): string => {
  if (p === 'home') return '/'
  if (p === 'blog-detail') return '/blog/why-ai-agents-cant-read-your-react-website'
  return `/${p}`
}

interface AppProps {
  initialPage?: Page
}

export default function App({ initialPage }: AppProps = {}) {
  const [page, setPage] = useState<Page>(() => initialPage || getPageFromPath())

  const navigate = useCallback((p: string) => {
    const target = getPageFromPath(p)
    setPage(target)
    if (typeof window !== 'undefined') {
      const nextPath = getPathForPage(target)
      if (window.location.pathname !== nextPath) {
        window.history.pushState({ page: target }, '', nextPath)
      }
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Global anchor click listener so ANY internal <a href="/..."> seamlessly updates URL
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return
      if (href.startsWith('http://') || href.startsWith('https://')) {
        // Only intercept if it's the same origin
        try {
          const url = new URL(href)
          if (url.origin !== window.location.origin) return
          e.preventDefault()
          navigate(url.pathname)
          return
        } catch {
          return
        }
      }
      if (href.startsWith('/')) {
        e.preventDefault()
        navigate(href)
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [navigate])

  useEffect(() => {
    try {
      const savedPages = JSON.parse(localStorage.getItem('snaiotech-page-settings') || '[]') as { page?: string; title?: string; description?: string; indexable?: boolean }[]
      const savedSite = JSON.parse(localStorage.getItem('snaiotech-site-settings') || '{}') as { defaultDescription?: string; canonicalUrl?: string; faviconUrl?: string }
      const pageName = page === 'home' ? 'Home' : page === 'pdf' ? 'PDF' : page === 'zoho' ? 'Zoho' : page.charAt(0).toUpperCase() + page.slice(1)
      const pageSettings = savedPages.find(item => item.page === pageName)
      document.title = pageSettings?.title || PAGE_TITLES[page]
      
      const description = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }))
      description.setAttribute('content', pageSettings?.description || savedSite.defaultDescription || 'Premium digital services from Snaiotech.')
      
      // Always guarantee canonical tag matches current page route
      const baseDomain = savedSite.canonicalUrl ? savedSite.canonicalUrl.replace(/\/$/, '') : 'https://snaiotech.com'
      const pagePath = getPathForPage(page)
      const fullCanonicalUrl = `${baseDomain}${pagePath}`
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', fullCanonicalUrl)

      // Update Open Graph URL as well
      let ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) {
        ogUrl.setAttribute('content', fullCanonicalUrl)
      }

      if (savedSite.faviconUrl) {
        const favicon = document.querySelector('link[rel="icon"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
        favicon.setAttribute('href', savedSite.faviconUrl)
      }
    } catch {
      document.title = PAGE_TITLES[page]
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const PageComponent = {
    home: <Home onNavigate={navigate} />,
    webdev: <WebDev onNavigate={navigate} />,
    pdf: <PDFAccess onNavigate={navigate} />,
    zoho: <Zoho onNavigate={navigate} />,
    about: <About onNavigate={navigate} />,
    blog: <Blog onNavigate={navigate} />,
    contact: <Contact onNavigate={navigate} />,
    admin: <Admin onNavigate={navigate} />,
    'blog-detail': <BlogPostDetail onNavigate={navigate} />,
  }[page]

  const isAdmin = page === 'admin'

  return (
    <div className="min-h-full flex flex-col" style={{ background: '#0A0E1A' }}>
      {!isAdmin && <Navbar currentPage={page} onNavigate={navigate} />}
      <main className="flex-1">
        {PageComponent}
      </main>
      {!isAdmin && <Footer onNavigate={navigate} />}
    </div>
  )
}
