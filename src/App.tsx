import { useState, useEffect } from 'react'
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

type Page = 'home' | 'webdev' | 'pdf' | 'zoho' | 'about' | 'blog' | 'contact' | 'admin'

const PAGE_TITLES: Record<Page, string> = {
  home: 'Snaiotech — Digital Services Built to Dominate',
  webdev: 'Web Dev & SEO/AEO/GEO — Snaiotech',
  pdf: 'PDF Accessibility & WCAG Compliance — Snaiotech',
  zoho: 'Zoho Deployment & Customization — Snaiotech',
  about: 'Who We Are — Snaiotech',
  blog: 'Blog — Snaiotech',
  contact: 'Contact Us — Snaiotech',
  admin: 'Admin Portal — Snaiotech',
}

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: string) => {
    if (Object.keys(PAGE_TITLES).includes(p)) {
      setPage(p as Page)
    }
  }

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem('snaiotech-page-settings') || '[]') as { page?: string; title?: string; description?: string; indexable?: boolean }[]
    const savedSite = JSON.parse(localStorage.getItem('snaiotech-site-settings') || '{}') as { defaultDescription?: string; canonicalUrl?: string; faviconUrl?: string }
    const pageName = page === 'home' ? 'Home' : page === 'pdf' ? 'PDF' : page === 'zoho' ? 'Zoho' : page.charAt(0).toUpperCase() + page.slice(1)
    const pageSettings = savedPages.find(item => item.page === pageName)
    document.title = pageSettings?.title || PAGE_TITLES[page]
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }))
    description.setAttribute('content', pageSettings?.description || savedSite.defaultDescription || 'Premium digital services from Snaiotech.')
    if (savedSite.canonicalUrl) {
      const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
      canonical.setAttribute('href', `${savedSite.canonicalUrl.replace(/\/$/, '')}${page === 'home' ? '/' : `/${page}`}`)
    }
    if (savedSite.faviconUrl) {
      const favicon = document.querySelector('link[rel="icon"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
      favicon.setAttribute('href', savedSite.faviconUrl)
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
