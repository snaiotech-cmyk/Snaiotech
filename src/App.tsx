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

type Page = 'home' | 'webdev' | 'pdf' | 'zoho' | 'about' | 'blog' | 'contact'

const PAGE_TITLES: Record<Page, string> = {
  home: 'Snaiotech — Digital Services Built to Dominate',
  webdev: 'Web Dev & SEO/AEO/GEO — Snaiotech',
  pdf: 'PDF Accessibility & WCAG Compliance — Snaiotech',
  zoho: 'Zoho Deployment & Customization — Snaiotech',
  about: 'Who We Are — Snaiotech',
  blog: 'Blog — Snaiotech',
  contact: 'Contact Us — Snaiotech',
}

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: string) => {
    if (Object.keys(PAGE_TITLES).includes(p)) {
      setPage(p as Page)
    }
  }

  useEffect(() => {
    document.title = PAGE_TITLES[page]
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
  }[page]

  return (
    <div className="min-h-full flex flex-col" style={{ background: '#0A0E1A' }}>
      <Navbar currentPage={page} onNavigate={navigate} />
      <main className="flex-1">
        {PageComponent}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}
