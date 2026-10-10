#!/usr/bin/env node
/**
 * scripts/prerender.js
 * Static Site Generation (SSG) Pre-rendering Script for SNAiO Tech
 *
 * This script runs after `vite build` during deployment.
 * It compiles an SSR bundle, renders every route into rich, semantic HTML,
 * injects deep SEO metadata, Open Graph tags, Twitter cards, and Schema.org JSON-LD,
 * ensuring AI agents (OpenAI, Claude, Perplexity), search engine crawlers (Google, Bing),
 * and social previews receive complete HTML content with zero JavaScript dependency.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const ROOT_DIR = process.cwd()
const DIST_DIR = resolve(ROOT_DIR, 'dist')
const SSR_DIR = resolve(ROOT_DIR, 'dist-ssr')

console.log('🚀 Starting Pre-rendering for Static Site Generation (SSG)...')

// 1. Build the SSR bundle using Vite
console.log('📦 Compiling SSR bundle...')
try {
  execSync('npx vite build --ssr src/entry-server.tsx --outDir dist-ssr', {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  })
} catch (err) {
  console.error('❌ Failed to compile SSR bundle:', err)
  process.exit(1)
}

// 2. Load the SSR bundle
const entryUrl = pathToFileURL(resolve(SSR_DIR, 'entry-server.js')).href
const { render } = await import(entryUrl)

// 3. Read client dist/index.html as template
const templatePath = resolve(DIST_DIR, 'index.html')
if (!existsSync(templatePath)) {
  console.error('❌ dist/index.html not found! Ensure `vite build` runs first.')
  process.exit(1)
}
const baseTemplate = readFileSync(templatePath, 'utf8')

// 4. Shared JSON-LD definitions
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://snaiotech.com/#organization',
  name: 'SNAiO Tech',
  alternateName: ['Snaiotech', 'Snaiotech Chennai', 'SNAiO Tech Solutions'],
  url: 'https://snaiotech.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo',
    caption: 'SNAiO Tech Logo',
  },
  description:
    'SNAiO Tech delivers premium web development, SEO/AEO/GEO, PDF accessibility (WCAG 2.2 AA), and Zoho deployment services from Chennai, India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Choolaimedu',
    addressLocality: 'Chennai',
    postalCode: '600094',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9585010283',
    contactType: 'customer service',
    email: 'Info@snaiotech.com',
    areaServed: ['IN', 'US', 'GB', 'AE', 'Worldwide'],
    availableLanguage: ['English', 'Tamil'],
  },
  sameAs: [
    'https://www.instagram.com/snaiotech/',
    'https://www.facebook.com/snaiotech',
    'https://www.linkedin.com/in/snaiotech/',
  ],
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://snaiotech.com/#website',
  name: 'SNAiO Tech',
  alternateName: 'Snaiotech',
  url: 'https://snaiotech.com',
  publisher: {
    '@id': 'https://snaiotech.com/#organization',
  },
}

// 5. Route configurations
const ROUTES = [
  {
    id: 'home',
    path: '/',
    title: 'SNAiO Tech | Web Dev, PDF Accessibility & Zoho Solutions',
    description:
      'SNAiO Tech delivers premium web development, SEO/AEO/GEO, PDF accessibility (WCAG 2.2 AA), and Zoho deployment services from Chennai, India.',
    canonical: 'https://snaiotech.com/',
    schemas: [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://snaiotech.com/#service',
        name: 'SNAiO Tech',
        url: 'https://snaiotech.com',
        image: 'https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo',
        telephone: '+91-9585010283',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Choolaimedu',
          addressLocality: 'Chennai',
          postalCode: '600094',
          addressCountry: 'IN',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'PDF Accessibility & WCAG Compliance Remediation',
                url: 'https://snaiotech.com/pdf',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Development & Modern SEO/AEO/GEO',
                url: 'https://snaiotech.com/webdev',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Zoho Implementation & Workflow Automation',
                url: 'https://snaiotech.com/zoho',
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'webdev',
    path: '/webdev',
    title: 'Web Development & Modern SEO/AEO/GEO Services | SNAiO Tech',
    description:
      'High-performance React websites, technical SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) engineered for top search & AI visibility.',
    canonical: 'https://snaiotech.com/webdev',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Web Development & Technical SEO/AEO/GEO',
        provider: { '@id': 'https://snaiotech.com/#organization' },
        serviceType: 'Web Development and AI Search Engine Optimization',
        description:
          'Engineering modern web applications with sub-second performance, accessible semantic HTML, and Answer Engine / Generative Engine Optimization.',
        url: 'https://snaiotech.com/webdev',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Web Development', item: 'https://snaiotech.com/webdev' },
        ],
      },
    ],
  },
  {
    id: 'pdf',
    path: '/pdf',
    title: 'PDF Accessibility & WCAG 2.2 AA Compliance Services | SNAiO Tech',
    description:
      'Certified PDF accessibility remediation, Section 508, ADA, and WCAG 2.2 AA compliance audits with full screen reader verification & PAC compliance.',
    canonical: 'https://snaiotech.com/pdf',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'PDF Accessibility & WCAG Compliance Remediation',
        provider: { '@id': 'https://snaiotech.com/#organization' },
        serviceType: 'Document Accessibility & Remediation',
        description:
          'Transforming inaccessible documents into certified, WCAG 2.2 AA, PDF/UA, and Section 508 compliant assets tested with screen readers.',
        url: 'https://snaiotech.com/pdf',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'PDF Accessibility', item: 'https://snaiotech.com/pdf' },
        ],
      },
    ],
  },
  {
    id: 'zoho',
    path: '/zoho',
    title: 'Zoho Implementation, Automation & Customization | SNAiO Tech',
    description:
      'Expert Zoho CRM deployment, Deluge scripting, workflow automation, and custom integrations tailored for modern business scalability.',
    canonical: 'https://snaiotech.com/zoho',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Zoho CRM Implementation & Workflow Automation',
        provider: { '@id': 'https://snaiotech.com/#organization' },
        serviceType: 'CRM Implementation and Business Automation',
        description:
          'Custom Zoho architecture, Deluge automation, Zoho Creator solutions, and third-party API integrations.',
        url: 'https://snaiotech.com/zoho',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Zoho Implementation', item: 'https://snaiotech.com/zoho' },
        ],
      },
    ],
  },
  {
    id: 'about',
    path: '/about',
    title: 'About SNAiO Tech | Digital Agency in Chennai, India',
    description:
      'Discover SNAiO Tech: an agile digital agency delivering world-class web development, PDF document accessibility, and cloud workflow automation from Chennai.',
    canonical: 'https://snaiotech.com/about',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About SNAiO Tech',
        url: 'https://snaiotech.com/about',
        description: 'Who We Are — Digital services built for durability, clarity, and real-world results.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://snaiotech.com/about' },
        ],
      },
    ],
  },
  {
    id: 'blog',
    path: '/blog',
    title: 'Insights & Technology Blog | SNAiO Tech',
    description:
      'Actionable guides, in-depth case studies, and insights on WCAG accessibility, web performance engineering, generative engine optimization, and Zoho automation.',
    canonical: 'https://snaiotech.com/blog',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'SNAiO Tech Insights & Blog',
        url: 'https://snaiotech.com/blog',
        description: 'Industry insights, compliance walkthroughs, and technical breakdowns from our specialists.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://snaiotech.com/blog' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    path: '/contact',
    title: 'Contact SNAiO Tech | Start Your Project Today',
    description:
      'Contact SNAiO Tech in Chennai, India for custom web development, PDF accessibility remediation, or Zoho CRM deployment. Free consultation and fast response.',
    canonical: 'https://snaiotech.com/contact',
    schemas: [
      ORGANIZATION_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact SNAiO Tech',
        url: 'https://snaiotech.com/contact',
        description: 'Reach our Chennai team directly via email, phone, or project consultation form.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://snaiotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://snaiotech.com/contact' },
        ],
      },
    ],
  },
]

// 6. Pre-render each route
for (const route of ROUTES) {
  console.log(`\n📄 Rendering route: ${route.path} (${route.id})...`)
  const renderedHtml = render(route.id)

  let html = baseTemplate

  // Update Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)

  // Update Description
  if (/<meta\s+name=["']description["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${route.description}" />`,
    )
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${route.description}" />\n</head>`)
  }

  // Update Canonical
  if (/<link\s+rel=["']canonical["']/i.test(html)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${route.canonical}" />`,
    )
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n</head>`)
  }

  // Update Open Graph tags
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${route.title}" />`,
  )
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${route.description}" />`,
  )

  const extraMeta = `
    <meta name="author" content="SNAiO Tech" />
    <meta name="keywords" content="SNAiO Tech, Snaiotech, web development Chennai, PDF accessibility, WCAG 2.2 AA remediation, Zoho implementation, Zoho CRM customization, SEO AEO GEO" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:site_name" content="SNAiO Tech" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
`

  // Inject Structured Data (JSON-LD)
  const jsonLdTags = route.schemas
    .map((s) => `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('\n')

  html = html.replace('</head>', `${extraMeta}\n${jsonLdTags}\n  </head>`)

  // Inject pre-rendered content into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`)

  // Write out HTML files
  if (route.path === '/') {
    writeFileSync(resolve(DIST_DIR, 'index.html'), html, 'utf8')
    console.log(`   ✅ Wrote: dist/index.html (${html.length.toLocaleString()} bytes)`)
  } else {
    const routeDir = resolve(DIST_DIR, route.id)
    if (!existsSync(routeDir)) {
      mkdirSync(routeDir, { recursive: true })
    }
    writeFileSync(resolve(routeDir, 'index.html'), html, 'utf8')
    writeFileSync(resolve(DIST_DIR, `${route.id}.html`), html, 'utf8')
    console.log(`   ✅ Wrote: dist/${route.id}/index.html and dist/${route.id}.html (${html.length.toLocaleString()} bytes)`)
  }
}

// 7. Cleanup SSR build directory
console.log('\n🧹 Cleaning up temporary SSR artifacts...')
rmSync(SSR_DIR, { recursive: true, force: true })

console.log('✨ All 7 routes successfully pre-rendered into static HTML!')
