import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ── Accurate Official Zoho Brand SVG Logos ─────────────────────────────────
const ZohoAppLogos: Record<string, { bg: string; glow: string; icon: React.ReactNode; connectsWith: string }> = {
  'Zoho CRM': {
    bg: 'from-[#FF4D4D] to-[#C91B1B]',
    glow: 'rgba(239, 68, 68, 0.35)',
    connectsWith: 'Books, Flow, Desk, Sign',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#crm-grad)" />
        <path d="M16 7L24 11.5V20.5L16 25L8 20.5V11.5L16 7Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="white" fillOpacity="0.15" />
        <circle cx="16" cy="16" r="3.5" fill="white" />
        <path d="M16 7V12.5M24 20.5L19 17.5M8 20.5L13 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="crm-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4D4D" />
            <stop offset="1" stopColor="#C91B1B" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Books': {
    bg: 'from-[#2563EB] to-[#0F3899]',
    glow: 'rgba(37, 99, 235, 0.35)',
    connectsWith: 'CRM, Inventory, Flow, Banking',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#books-grad)" />
        <path d="M7 9C7 7.89543 7.89543 7 9 7H21C22.1046 7 23 7.89543 23 9V23C23 24.1046 22.1046 25 21 25H9C7.89543 25 7 24.1046 7 23V9Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.8" />
        <path d="M10 7V25M14 11H19M14 15H19M14 19H17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="23" cy="16" r="3" fill="#FBBF24" />
        <path d="M22 15L24 17M24 15L22 17" stroke="#1E3A8A" strokeWidth="1.2" />
        <defs>
          <linearGradient id="books-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#0F3899" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Desk': {
    bg: 'from-[#10B981] to-[#047857]',
    glow: 'rgba(16, 185, 129, 0.35)',
    connectsWith: 'CRM, Analytics, Flow, SLAs',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#desk-grad)" />
        <path d="M8 17C8 12.5817 11.5817 9 16 9C20.4183 9 24 12.5817 24 17V20C24 21.1046 23.1046 22 22 22H21C19.8954 22 19 21.1046 19 20V17C19 15.8954 19.8954 15 21 15H22" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 17H9C10.1046 17 11 15.8954 11 17V20C11 21.1046 10.1046 22 9 22H8C6.89543 22 6 21.1046 6 20V17" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 22C19 23.6569 17.6569 25 16 25H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <defs>
          <linearGradient id="desk-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Flow': {
    bg: 'from-[#FB923C] to-[#C2410C]',
    glow: 'rgba(249, 115, 22, 0.35)',
    connectsWith: 'All 50+ Zoho Apps, REST APIs, Webhooks',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#flow-grad)" />
        <circle cx="9" cy="11" r="2.5" fill="white" />
        <circle cx="23" cy="11" r="2.5" fill="white" />
        <circle cx="16" cy="22" r="3" fill="#FED7AA" stroke="white" strokeWidth="1.5" />
        <path d="M9 13.5C9 17 13 18 16 19M23 13.5C23 17 19 18 16 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 19V22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#C2410C" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Analytics': {
    bg: 'from-[#A78BFA] to-[#5B21B6]',
    glow: 'rgba(139, 92, 246, 0.35)',
    connectsWith: 'CRM, Books, Projects, SQL Sync',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#analytics-grad)" />
        <rect x="7" y="17" width="4" height="8" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="14" y="12" width="4" height="13" rx="1" fill="white" fillOpacity="0.85" />
        <rect x="21" y="8" width="4" height="17" rx="1" fill="white" />
        <path d="M8 14L15 9L23 6" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="23" cy="6" r="1.5" fill="#FDE047" />
        <defs>
          <linearGradient id="analytics-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Campaigns': {
    bg: 'from-[#F472B6] to-[#9D174D]',
    glow: 'rgba(236, 72, 153, 0.35)',
    connectsWith: 'CRM Lead Pipelines, Segment Lists',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#campaigns-grad)" />
        <rect x="7" y="11" width="18" height="13" rx="2" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.8" />
        <path d="M7 12L16 18L25 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7C14.5 5.5 17.5 5.5 20 7" stroke="#FBCFE8" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 5C13.5 3 18.5 3 23 5" stroke="#FBCFE8" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="campaigns-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="1" stopColor="#9D174D" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Creator': {
    bg: 'from-[#60A5FA] to-[#1E40AF]',
    glow: 'rgba(59, 130, 246, 0.35)',
    connectsWith: 'Custom Portals, Deluge Apps, Databases',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#creator-grad)" />
        <path d="M11 12L7 16L11 20M21 12L25 16L21 20M18 10L14 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="creator-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Inventory': {
    bg: 'from-[#F59E0B] to-[#B45309]',
    glow: 'rgba(245, 158, 11, 0.35)',
    connectsWith: 'Books, CRM, Shopify, FedEx',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#inventory-grad)" />
        <path d="M16 6L25 11V21L16 26L7 21V11L16 6Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 6V16M25 11L16 16M7 11L16 16M16 16V26" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <defs>
          <linearGradient id="inventory-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Sign': {
    bg: 'from-[#22D3EE] to-[#0891B2]',
    glow: 'rgba(6, 182, 212, 0.35)',
    connectsWith: 'CRM Deals, Books Invoices, Legal SOPs',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#sign-grad)" />
        <path d="M21 7L24 10L13 21H10V18L21 7Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 25C11 23 14 26 18 24C20 23 23 23.5 25 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <defs>
          <linearGradient id="sign-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#0891B2" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Forms': {
    bg: 'from-[#2DD4BF] to-[#0F766E]',
    glow: 'rgba(20, 184, 166, 0.35)',
    connectsWith: 'CRM Leads, Desk Tickets, Webhooks',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#forms-grad)" />
        <rect x="8" y="7" width="16" height="18" rx="2" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.15" />
        <path d="M12 12H20M12 16H17M12 20H15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="18" r="2.5" fill="#34D399" />
        <path d="M19 18L19.8 19L21.5 17" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="forms-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DD4BF" />
            <stop offset="1" stopColor="#0F766E" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Projects': {
    bg: 'from-[#3B82F6] to-[#1E3A8A]',
    glow: 'rgba(59, 130, 246, 0.35)',
    connectsWith: 'CRM Closed Won, Desk SLA, Timesheets',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#projects-grad)" />
        <rect x="7" y="9" width="18" height="14" rx="2" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.15" />
        <path d="M10 13H15M13 17H21M10 20H18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="projects-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'Zoho Recruit': {
    bg: 'from-[#8B5CF6] to-[#4C1D95]',
    glow: 'rgba(139, 92, 246, 0.35)',
    connectsWith: 'People HR, Mail, Career Portals',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <rect width="32" height="32" rx="7" fill="url(#recruit-grad)" />
        <circle cx="14" cy="13" r="4" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.2" />
        <path d="M8 23C8 20 11 18 14 18C17 18 20 20 20 23" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="21" cy="20" r="3.5" stroke="#FDE047" strokeWidth="1.8" />
        <path d="M23.5 22.5L26 25" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
        <defs>
          <linearGradient id="recruit-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
}

const FAQ_ITEMS = [
  {
    q: 'We already purchased Zoho - can you still help us?',
    a: 'That is who we serve most often. Many clients come to us after purchasing Zoho licenses and finding the gap between "installed" and "actually working." We audit your current configuration, fix misconfigurations, eliminate duplicate fields, and build the custom automation your team needs.',
  },
  {
    q: 'How long does a typical Zoho CRM deployment take?',
    a: 'A foundational CRM setup for a team of up to 50 users typically takes 4–6 weeks. This includes clean data migration, custom pipeline setup, automated Blueprint rules, and hands-on staff training. Complex multi-app suites (CRM + Books + Desk + Flow) run 8–12 weeks.',
  },
  {
    q: 'Can you migrate our data from Salesforce, HubSpot, or spreadsheets?',
    a: 'Yes. We migrate data from Salesforce, HubSpot, Pipedrive, and Excel/Google Sheets. We map custom fields, sanitize records before import, resolve relational foreign keys (Contacts to Accounts to Deals), and verify counts in a staging sandbox before going live.',
  },
  {
    q: 'What is Zoho Blueprint and why is it critical?',
    a: 'Blueprint is Zoho CRM\'s workflow enforcement engine. It prevents sales reps from skipping mandatory steps or moving deals forward without capturing crucial data (e.g. budget, decision-maker, deal notes). It provides guaranteed guardrails for your revenue operations.',
  },
  {
    q: 'Do you provide post-launch training and documentation?',
    a: 'Yes, training is included in every single engagement. We provide role-based video sessions (for admins, managers, and sales reps) plus custom operational SOP documentation written specifically for your customized instance.',
  },
]

const ZOHO_APPS = [
  { name: 'Zoho CRM', cat: 'sales', desc: 'Lead & deal revenue pipeline with Blueprint guardrails' },
  { name: 'Zoho Books', cat: 'finance', desc: 'GST/Tax compliant invoicing, automated billing & ledgers' },
  { name: 'Zoho Desk', cat: 'support', desc: 'Omnichannel customer support & SLA ticket management' },
  { name: 'Zoho Flow', cat: 'automation', desc: 'Webhook & trigger logic connecting internal and external tools' },
  { name: 'Zoho Analytics', cat: 'bi', desc: 'Cross-functional BI dashboards & executive forecasting' },
  { name: 'Zoho Campaigns', cat: 'sales', desc: 'Segmented email marketing synced with CRM deal stages' },
  { name: 'Zoho Creator', cat: 'automation', desc: 'Bespoke custom low-code portals and enterprise apps' },
  { name: 'Zoho Inventory', cat: 'finance', desc: 'Multi-warehouse stock tracking, sales orders, & packaging' },
  { name: 'Zoho Sign', cat: 'sales', desc: 'Legally binding digital signature workflows integrated in CRM' },
  { name: 'Zoho Forms', cat: 'sales', desc: 'Lead capture forms with auto-routing into CRM pipelines' },
  { name: 'Zoho Projects', cat: 'automation', desc: 'Milestone tracking & task allocation post-deal closure' },
  { name: 'Zoho Recruit', cat: 'support', desc: 'ATS candidate tracking & onboarding pipelines' },
]

interface ZohoProps {
  onNavigate: (page: string) => void
}

export default function Zoho({ onNavigate }: ZohoProps) {
  const { ref: appsRef, visible: appsVis } = useReveal()
  const { ref: pipeRef, visible: pipeVis } = useReveal()
  const { ref: servRef, visible: servVis } = useReveal()
  const { ref: roiRef, visible: roiVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()

  const [activeAppCategory, setActiveAppCategory] = useState<'all' | 'sales' | 'finance' | 'support' | 'automation' | 'bi'>('all')
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0)
  const [activeDepthStage, setActiveDepthStage] = useState<number>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Interactive Sandboxes State for End-to-End Depth
  const [migrationSource, setMigrationSource] = useState<'Salesforce' | 'HubSpot' | 'Spreadsheets'>('Salesforce')
  const [migrationRunning, setMigrationRunning] = useState<boolean>(false)
  const [migrationProgress, setMigrationProgress] = useState<number>(100)
  const [blueprintActiveGate, setBlueprintActiveGate] = useState<number>(1)
  const [delugeExecuting, setDelugeExecuting] = useState<boolean>(false)
  const [delugeOutputLog, setDelugeOutputLog] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<'reps' | 'admin' | 'vp' | 'finance'>('reps')

  const runMigrationSim = () => {
    setMigrationRunning(true)
    setMigrationProgress(0)
    let p = 0
    const int = setInterval(() => {
      p += 20
      setMigrationProgress(p)
      if (p >= 100) {
        clearInterval(int)
        setMigrationRunning(false)
      }
    }, 180)
  }

  const runDelugeSim = () => {
    setDelugeExecuting(true)
    setDelugeOutputLog(null)
    setTimeout(() => {
      setDelugeExecuting(false)
      setDelugeOutputLog(`[200 OK] Deal #D-9481 "Closed Won"
↳ Created Invoice #INV-2026-881 in Zoho Books
↳ Triggered Zoho Flow Webhook "client_onboard_v2"
↳ Latency: 38ms · Zero validation errors`)
    }, 700)
  }

  const pipelineStages = [
    {
      step: '01',
      name: 'Lead Capture & Enrichment',
      app: 'Zoho Forms + CRM',
      trigger: 'Form Submission on Web',
      action: 'Auto-deduplicates contact, parses domain metadata, assigns rep based on geography.',
      metric: '< 30 sec response time',
    },
    {
      step: '02',
      name: 'Blueprint Qualification',
      app: 'Zoho CRM Blueprint',
      trigger: 'Stage Change to Qualified',
      action: 'Forces mandatory BANT qualification fields. Generates automated calendar invite & SMS reminder.',
      metric: '100% data capture rate',
    },
    {
      step: '03',
      name: 'Deal Proposal & Digital Sign',
      app: 'Zoho Sign + CRM',
      trigger: 'Proposal Generated',
      action: 'Pulls deal line-items into branded PDF contract. Routes to stakeholder for electronic signature.',
      metric: 'Auto-updated stage on signing',
    },
    {
      step: '04',
      name: 'Automated Invoicing & ERP',
      app: 'Zoho Books + Flow',
      trigger: 'Contract Signed',
      action: 'Instantly creates Sales Order in Zoho Books, generates tax invoice, and provisions client portal.',
      metric: 'Zero manual data re-entry',
    },
    {
      step: '05',
      name: 'Project Kickoff & SLA Support',
      app: 'Zoho Projects + Desk',
      trigger: 'Invoice Marked Paid',
      action: 'Clones delivery project template with milestones and provisions VIP support desk ticket queue.',
      metric: 'Automated kickoff within 5 min',
    },
  ]

  const depthStages = [
    {
      id: '01',
      tag: '01 / SETUP',
      title: 'Deployment & Data Migration',
      badge: 'Data Architecture',
      subtitle: 'Zero Data Loss Migration from Salesforce, HubSpot or Legacy Spreadsheets',
      description: 'From org-wide role hierarchies to custom modules, fields, and sanitization of legacy spreadsheets or Salesforce data.',
      deliverables: [
        'Clean data migration from Salesforce, HubSpot, or Sheets',
        'Custom module & field architecture with validation rules',
        'Security profiles, role hierarchies, and territory management',
        'Multi-currency & global localization setup',
      ],
      outcome: '100% Relational Record Parity · Zero Dropped Rows',
    },
    {
      id: '02',
      tag: '02 / GUARDRAILS',
      title: 'Workflow & Blueprint Automation',
      badge: 'Revenue Operations',
      subtitle: 'Enforced Sales Discipline with Zero Dropped Deals',
      description: 'Eliminate human error with intelligent Blueprint rules, scheduled triggers, and automated notification engines.',
      deliverables: [
        'Enforced sales process guardrails via Zoho Blueprint',
        'Cross-departmental logic via Zoho Flow connectors',
        'Automated lead scoring, routing, and round-robin assignment',
        'Real-time SLA alerting and escalation triggers',
      ],
      outcome: 'No Sales Rep Skips Mandatory Qualification Gates',
    },
    {
      id: '03',
      tag: '03 / CODE DEPTH',
      title: 'Custom Integrations & Deluge Scripts',
      badge: 'Full-Stack Depth',
      subtitle: 'Bespoke Logic Beyond Default Platform Constraints',
      description: 'Connect Zoho to ERPs, custom web apps, payment gateways, and third-party APIs via bespoke Deluge scripting.',
      deliverables: [
        'Custom Deluge script logic for complex calculations',
        'Bi-directional REST API & webhook connectors',
        'Payment gateway integration (Stripe, Razorpay, PayPal)',
        'Custom client portals & enterprise micro-apps in Zoho Creator',
      ],
      outcome: 'Unlimited platform extensibility without vendor lock-in',
    },
    {
      id: '04',
      tag: '04 / ADOPTION',
      title: 'Role-Based Training & Support',
      badge: 'Human Adoption',
      subtitle: 'Ensuring Your Team Actually Uses the Software Daily',
      description: 'We don\'t just deploy and disappear. We deliver tailored training sessions and custom SOP guides to ensure 100% adoption.',
      deliverables: [
        'Recorded role-based training (Sales, Admin, Management)',
        'Tailored operational SOP guide for your exact setup',
        '30-day post-launch hypercare with dedicated engineer',
        'Quarterly business reviews & ongoing workflow optimization',
      ],
      outcome: '100% user adoption across sales, operations, and leadership',
    },
  ]

  const filteredApps =
    activeAppCategory === 'all'
      ? ZOHO_APPS
      : ZOHO_APPS.filter((a) => a.cat === activeAppCategory)

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="Zoho deployment"
        title="CRM & automation that"
        accent="actually works."
        description="We configure, automate, and integrate Zoho systems to fit your business mechanics—with clean data, enforced guardrails, and hands-on team training."
        image="/images/discipline-zoho-implementation.png"
        imageAlt="SNAiO Tech illustration for Zoho implementation"
        highlights={['Zoho CRM & One', 'Blueprint automation', 'Custom Deluge APIs']}
        primaryLabel="Explore Zoho setup"
        secondaryLabel="View capabilities"
        secondaryTarget="depth"
        onNavigate={onNavigate}
      />

      {/* ── Interactive Automation Pipeline Simulator ── */}
      <section className="py-24 gradient-mesh-light relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={pipeRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${pipeVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Blueprint Workflow Simulator</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                How Connected Automation <span className="gradient-text">Eliminates Busywork</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Click through the interactive pipeline stages below to inspect the automated triggers, cross-app data handoffs, and guardrails we engineer.
              </p>
            </div>

            {/* Pipeline Stage Track */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass border border-white/10 max-w-4xl mx-auto mb-10">
              {pipelineStages.map((stg, idx) => {
                const isActive = activePipelineStage === idx
                return (
                  <button
                    key={stg.step}
                    type="button"
                    onClick={() => setActivePipelineStage(idx)}
                    className={`flex-1 min-w-[150px] py-3 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,180,216,0.4)] scale-[1.02]'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono text-cyan-200">{stg.step}</span>
                    <span className="truncate">{stg.name.split('&')[0]}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Stage Detail Bento Card */}
            <div className="glass rounded-3xl p-8 sm:p-12 border border-cyan-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      Stage {pipelineStages[activePipelineStage].step}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-white/60 bg-white/5 border border-white/10">
                      {pipelineStages[activePipelineStage].app}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {pipelineStages[activePipelineStage].name}
                  </h3>

                  <div className="space-y-3 pt-2 text-sm text-white/80">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs flex items-center gap-3">
                      <span className="text-cyan-400 font-bold">TRIGGER:</span>
                      <span className="text-white/90">{pipelineStages[activePipelineStage].trigger}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/20 border border-cyan-400/20">
                      <span className="text-xs font-bold text-cyan-300 block mb-1">AUTOMATED ACTIONS EXECUTED:</span>
                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                        {pipelineStages[activePipelineStage].action}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side Outcome & KPI Card with Journey Mascot */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative mb-3 hidden sm:flex items-center justify-center">
                    <div className="absolute -inset-4 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />
                    <img
                      src="/images/mascot-backpack.png"
                      alt="SNAiO Tech wolf mascot walking with backpack"
                      className="w-36 sm:w-44 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-[#0B1528] to-[#070B14] border border-cyan-400/30 shadow-xl text-center space-y-3 w-full">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      Guaranteed Outcome
                    </span>
                    <div className="text-3xl sm:text-4xl font-black gradient-text py-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                      {pipelineStages[activePipelineStage].metric}
                    </div>
                    <p className="text-xs text-white/55 leading-relaxed">
                      Every handoff is enforced by system logic. No deals drop through the cracks, and no human manual data transcription is required.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('contact')}
                        className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold"
                      >
                        Plan Your Custom Pipeline →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand-New Animated Cybernetic Kinetic Cockpit: End-to-End Implementation Depth ── */}
      <section id="depth" className="py-24 gradient-mesh relative overflow-hidden">
        {/* Subtle background radar circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div ref={servRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${servVis ? 'visible' : ''}`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Enterprise Architecture Engine
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                End-to-End <span className="gradient-text">Implementation Depth</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Explore our full implementation lifecycle. Click through the interconnected stages below to test drive our live migration calculators, Blueprint guardrail gates, Deluge code execution, and adoption roadmaps.
              </p>
            </div>

            {/* Glowing Pipeline Circuit Bus Header */}
            <div className="relative mb-8">
              {/* Connecting laser conduit line behind stages on desktop */}
              <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20 z-0">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-[0_0_15px_rgba(0,180,216,0.8)]"
                  style={{ width: `${(activeDepthStage + 1) * 25}%` }}
                />
              </div>

              {/* 4 Kinetic Stage Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {depthStages.map((stg, idx) => {
                  const isActive = activeDepthStage === idx
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveDepthStage(idx)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? 'bg-gradient-to-br from-[#0c1830] to-[#070e1c] border-cyan-400 shadow-[0_0_35px_rgba(0,180,216,0.35)] -translate-y-1.5'
                          : 'glass border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Active indicator beacon */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className={`text-[11px] font-mono font-bold tracking-wider ${isActive ? 'text-cyan-300' : 'text-white/40 group-hover:text-cyan-400'}`}>
                          {stg.tag}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-cyan-400 ring-4 ring-cyan-400/20 animate-pulse' : 'bg-white/20'}`} />
                      </div>

                      <div className="font-extrabold text-sm sm:text-base text-white leading-tight mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {stg.title}
                      </div>

                      <div className="text-[11px] font-mono text-cyan-400/80">
                        {stg.badge}
                      </div>

                      {/* Bottom active accent line */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Kinetic Stage Sandbox / Deep Dive Cockpit */}
            <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left: Stage Specifications & Guaranteed Benchmarks */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                      Pillar {depthStages[activeDepthStage].id} · {depthStages[activeDepthStage].badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      PRODUCTION READY
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {depthStages[activeDepthStage].title}
                  </h3>

                  <p className="text-sm text-cyan-100/80 leading-relaxed">
                    {depthStages[activeDepthStage].description}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Key Architecture Deliverables:</span>
                    {depthStages[activeDepthStage].deliverables.map((deliv) => (
                      <div key={deliv} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                        <span className="text-cyan-400 mt-0.5">
                          <IconCheck />
                        </span>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚡</span>
                      <span className="text-white/60">SLA Guarantee:</span>
                      <span className="text-white font-semibold">{depthStages[activeDepthStage].outcome}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Unique Interactive Simulation Engine per Stage */}
                <div className="lg:col-span-6">
                  {activeDepthStage === 0 && (
                    /* Stage 01 Interactive: Data Migration Sanitization Sandbox */
                    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#060D1A] to-[#02050B] border border-cyan-500/30 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-xs font-mono text-cyan-300 font-bold">DATA MIGRATION ENGINE</span>
                        </div>
                        <span className="text-[10px] font-mono text-white/50">PARITY VERIFIER</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[11px] text-white/60 font-mono block">SELECT SOURCE ENVIRONMENT:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Salesforce', 'HubSpot', 'Spreadsheets'] as const).map((src) => (
                            <button
                              key={src}
                              type="button"
                              onClick={() => {
                                setMigrationSource(src)
                                runMigrationSim()
                              }}
                              className={`py-2 px-2 rounded-lg text-xs font-mono border transition-all ${
                                migrationSource === src
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                              }`}
                            >
                              {src}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Simulation Progress & Counters */}
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-white/70">Sanitization & Schema Normalization:</span>
                          <span className="text-cyan-400 font-bold">{migrationProgress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                            style={{ width: `${migrationProgress}%` }}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <div className="text-emerald-400 font-bold text-sm">25,000</div>
                            <div className="text-[10px] text-white/40">Records Mapped</div>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <div className="text-cyan-400 font-bold text-sm">3,840</div>
                            <div className="text-[10px] text-white/40">Dupes Cleaned</div>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <div className="text-amber-400 font-bold text-sm">0</div>
                            <div className="text-[10px] text-white/40">Data Loss</div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={runMigrationSim}
                        disabled={migrationRunning}
                        className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        {migrationRunning ? 'Simulating Schema Ingestion...' : 'Re-Run Migration Audit Simulation →'}
                      </button>
                    </div>
                  )}

                  {activeDepthStage === 1 && (
                    /* Stage 02 Interactive: Blueprint Gatekeeper State Machine */
                    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#060D1A] to-[#02050B] border border-cyan-500/30 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-xs font-mono text-cyan-300 font-bold">BLUEPRINT STATE GATEKEEPER</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">ENFORCED GUARDRAILS</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[11px] text-white/60 font-mono block">CLICK A PIPELINE GATE TO TEST GUARDRAIL:</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 1, name: 'Lead Ingestion', rule: 'Auto-checks duplicates & assigns territory rep within 30s' },
                            { id: 2, name: 'BANT Qualification', rule: 'BLOCKS advance if Budget, Authority or Need are empty' },
                            { id: 3, name: 'Discount Signoff', rule: 'Requires VP Approval if deal margin discount > 15%' },
                            { id: 4, name: 'Closed Won Trigger', rule: 'Auto-generates Books invoice & provisions client portal' },
                          ].map((gate) => (
                            <button
                              key={gate.id}
                              type="button"
                              onClick={() => setBlueprintActiveGate(gate.id)}
                              className={`p-3 rounded-xl text-left border transition-all ${
                                blueprintActiveGate === gate.id
                                  ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-mono font-bold text-white">Gate 0{gate.id}</span>
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${blueprintActiveGate === gate.id ? 'bg-amber-400 text-black font-bold' : 'text-white/40'}`}>
                                  {blueprintActiveGate === gate.id ? 'ACTIVE' : 'TEST'}
                                </span>
                              </div>
                              <div className="text-[11px] text-white/80 font-semibold">{gate.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Active Gate Security Enforcement Banner */}
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-400/40 text-xs font-mono text-amber-200 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-amber-300">
                          <span>🛡️ Mandatory Enforcement Rule:</span>
                        </div>
                        <p className="text-[11px] text-white/80 leading-relaxed">
                          {[
                            'Lead Ingestion: Ingests forms, verifies valid email format, auto-tags lead origin source and assigns SDR.',
                            'BANT Guardrail: Reps cannot drag deal to "Proposal" stage without filling Budget, Decision Maker Role, and Timeline.',
                            'Discount Gate: Deluge validation blocks deals exceeding 15% discount until VP approval token is cryptographically signed.',
                            'Won State: Instantly converts deal to project, generates Books invoice, and notifies executive Slack channel.',
                          ][blueprintActiveGate - 1]}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeDepthStage === 2 && (
                    /* Stage 03 Interactive: Live Deluge Code Runner Terminal */
                    <div className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#060913] shadow-2xl">
                      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 text-xs font-mono text-cyan-300">automation_workflow.deluge</span>
                        </div>
                        <button
                          type="button"
                          onClick={runDelugeSim}
                          disabled={delugeExecuting}
                          className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-400/30 transition-all flex items-center gap-1.5"
                        >
                          {delugeExecuting ? 'Running...' : '▶ Run Deluge Script'}
                        </button>
                      </div>

                      <pre className="p-4 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-52">
                        <code>{`// SNAiO Tech Deluge Automation
dealRecord = zoho.crm.getRecordById("Deals", dealId);
if (dealRecord.get("Stage") == "Closed Won") {
  invoiceData = {
    "customer_id": dealRecord.get("Account_Name").get("id"),
    "line_items": dealRecord.get("Products"),
    "currency_code": "USD"
  };
  invoice = zoho.books.createRecord("Invoices", invoiceData);
  zoho.flow.trigger("webhook_provision_client", invoice.get("id"));
}`}</code>
                      </pre>

                      <div className="p-3 bg-black/60 border-t border-white/10 text-[11px] font-mono">
                        {delugeOutputLog ? (
                          <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{delugeOutputLog}</pre>
                        ) : (
                          <div className="text-white/40 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Terminal Idle. Click "Run Deluge Script" above to test API execution.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeDepthStage === 3 && (
                    /* Stage 04 Interactive: Role-Based User Training Matrix */
                    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#060D1A] to-[#02050B] border border-cyan-500/30 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-mono text-cyan-300 font-bold">USER ADOPTION MATRIX</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400">100% RETENTION</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[11px] text-white/60 font-mono block">SELECT USER AUDIENCE:</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'reps', label: 'Sales Rep' },
                            { id: 'admin', label: 'Sys Admin' },
                            { id: 'vp', label: 'VP Revenue' },
                            { id: 'finance', label: 'Finance' },
                          ].map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setSelectedRole(r.id as any)}
                              className={`py-2 px-1 rounded-lg text-[11px] font-mono transition-all text-center border ${
                                selectedRole === r.id
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-cyan-300 font-bold">
                          <span>
                            {selectedRole === 'reps' && 'Daily Sales & Pipeline Fast-Track'}
                            {selectedRole === 'admin' && 'Enterprise System Governance & Security'}
                            {selectedRole === 'vp' && 'Executive Forecast & Revenue Dashboards'}
                            {selectedRole === 'finance' && 'Books, Invoicing & Tax Ledger Workflows'}
                          </span>
                          <span className="text-emerald-400 text-[10px]">VIDEO + DOCS</span>
                        </div>

                        <ul className="space-y-1.5 text-white/75 text-[11px]">
                          {selectedRole === 'reps' && [
                            '✓ 1-Click Lead Conversion & Call Logging',
                            '✓ Blueprint Navigation & Stage Advancement',
                            '✓ Mobile App synchronization on iOS & Android',
                          ].map((item) => <li key={item}>{item}</li>)}
                          {selectedRole === 'admin' && [
                            '✓ User Roles, Profiles & Field-Level Security',
                            '✓ Deluge API Monitoring & Error Webhook Alerts',
                            '✓ Data Backup & Periodic Hygiene Audits',
                          ].map((item) => <li key={item}>{item}</li>)}
                          {selectedRole === 'vp' && [
                            '✓ Sales Rep Quota & Conversion Funnel Analytics',
                            '✓ Real-time Revenue Forecasting Dashboards',
                            '✓ Discount Approval workflows directly from Email',
                          ].map((item) => <li key={item}>{item}</li>)}
                          {selectedRole === 'finance' && [
                            '✓ Automatic Invoicing synced from Closed Deals',
                            '✓ GST / VAT compliant reconciliation & tax audit',
                            '✓ Payment gateway status & overdue reminder triggers',
                          ].map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                        <span>Includes 30-Day Hypercare:</span>
                        <span className="font-bold text-white">Direct Slack/Teams Access</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Zoho Apps Cloud with Authentic Brand Logos & Ecosystem Connectors ── */}
      <section className="py-20 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={appsRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-10 reveal ${appsVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-2">Multi-Product Expertise</p>
              <h3 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Zoho Ecosystem <span className="gradient-text">Architected as One</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto mt-2">
                We engineer seamless multi-app suites where data flows instantly without duplicate entry or disconnected silos.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'all', label: 'All Applications' },
                { id: 'sales', label: 'Sales & Revenue' },
                { id: 'finance', label: 'Finance & Invoicing' },
                { id: 'support', label: 'Support & HR' },
                { id: 'automation', label: 'Custom Apps & Logic' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveAppCategory(c.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                    activeAppCategory === c.id
                      ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,180,216,0.3)]'
                      : 'glass border border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Apps Grid with Authentic Official Logos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredApps.map((app) => {
                const logoData = ZohoAppLogos[app.name] ?? {
                  bg: 'from-cyan-500 to-blue-600',
                  glow: 'rgba(0,180,216,0.3)',
                  connectsWith: 'CRM, Flow',
                  icon: <span className="font-bold text-xs">Z</span>,
                }
                return (
                  <div
                    key={app.name}
                    className="glass rounded-2xl p-5 border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                          style={{ boxShadow: `0 0 20px ${logoData.glow}` }}
                        >
                          {logoData.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10 uppercase">
                          {app.cat}
                        </span>
                      </div>
                      <span className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors block mb-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                        {app.name}
                      </span>
                      <p className="text-xs text-white/50 leading-relaxed mb-3">
                        {app.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-400/70">
                      <span>Integrates:</span>
                      <span className="text-white/60 truncate max-w-[150px]">{logoData.connectsWith}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Honest Comparison: Zoho vs Salesforce / HubSpot ── */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-5xl mx-auto px-6">
          <div ref={roiRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${roiVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-2">Cost & Practicality</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Why Growing Teams Choose <span className="gradient-text">Zoho Over Salesforce</span>
              </h3>
            </div>

            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-white/5 border-b border-white/10 font-mono text-cyan-300">
                    <tr>
                      <th className="p-4 sm:p-5">Platform Attribute</th>
                      <th className="p-4 sm:p-5 text-red-300">Salesforce / HubSpot</th>
                      <th className="p-4 sm:p-5 text-cyan-300">Zoho One with SNAiO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">License Cost (per user/yr)</td>
                      <td className="p-4 sm:p-5 text-white/50">$1,800 – $3,600+ with steep renewal hikes</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">$360 – $600 with 45+ apps included</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">All-In-One Native Stack</td>
                      <td className="p-4 sm:p-5 text-white/50">Requires expensive third-party AppExchange add-ons</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">CRM, Invoicing, Helpdesk, Sign & BI under 1 roof</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Data Ownership & Control</td>
                      <td className="p-4 sm:p-5 text-white/50">High lock-in and painful API rate limit pricing</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Complete export control and full REST API access</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold text-white">Custom Automation Velocity</td>
                      <td className="p-4 sm:p-5 text-white/50">Demands rare, expensive Apex/Flow developers</td>
                      <td className="p-4 sm:p-5 text-cyan-200 font-semibold">Rapid Deluge scripts & Zoho Flow deployment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 gradient-mesh-light">
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
        title="Stop struggling with"
        accent="broken CRM setups."
        description="Let's audit your current Zoho instance or design a fresh deployment that runs on rails with zero manual friction."
        buttonLabel="Schedule a technical audit"
        onNavigate={onNavigate}
      />
    </div>
  )
}
