import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import PageHero from '@/components/PageHero'
import PageCTA from '@/components/PageCTA'

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const FAQ_ITEMS = [
  { q: 'We already purchased Zoho - can you still help?', a: 'That\'s exactly who we serve. Most of our clients come to us after purchasing Zoho and realizing the gap between "installed" and "working." We assess your current setup, clean up any misconfiguration, and build out what you actually need.' },
  { q: 'How long does a typical Zoho CRM deployment take?', a: 'A foundational CRM setup for a small-to-mid-size team (up to 50 users) typically takes 4–6 weeks. This includes data migration, pipeline configuration, automation rules, and initial training. Complex multi-product deployments run 8–12 weeks.' },
  { q: 'Can you migrate our data from Salesforce / HubSpot / spreadsheets?', a: 'Yes. We handle data migration from all major CRMs and from Excel/Google Sheets. We map fields, clean data before import, and verify record counts and relationships post-migration. We always migrate to a staging environment first.' },
  { q: 'What is Zoho Blueprint and do we need it?', a: 'Blueprint is Zoho CRM\'s process management feature - it enforces specific stages and required actions before a record can move forward. Think of it as a guardrail for your sales or service process. Most teams with defined workflows benefit significantly from Blueprint implementation.' },
  { q: 'Do you provide training for our team?', a: 'Yes, training is a standard part of every engagement. We provide role-based training sessions (admin, sales users, managers), recorded walkthroughs, and a custom operations guide specific to your configuration. We also offer ongoing monthly support retainers.' },
]

const ZOHO_APPS = [
  { name: 'Zoho CRM', cat: 'Sales' },
  { name: 'Zoho Books', cat: 'Finance' },
  { name: 'Zoho Desk', cat: 'Support' },
  { name: 'Zoho Analytics', cat: 'BI' },
  { name: 'Zoho Projects', cat: 'PM' },
  { name: 'Zoho Campaigns', cat: 'Marketing' },
  { name: 'Zoho Recruit', cat: 'HR' },
  { name: 'Zoho Inventory', cat: 'Ops' },
  { name: 'Zoho Sign', cat: 'Legal' },
  { name: 'Zoho Forms', cat: 'Data' },
  { name: 'Zoho Flow', cat: 'Automation' },
  { name: 'Zoho Creator', cat: 'Custom Apps' },
]

interface ZohoProps { onNavigate: (page: string) => void }

export default function Zoho({ onNavigate }: ZohoProps) {
  const { ref: appsRef, visible: appsVis } = useReveal()
  const { ref: servRef, visible: servVis } = useReveal()
  const { ref: faqRef, visible: faqVis } = useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const services = [
    {
      title: 'Deployment & Setup',
      desc: 'From org setup to user roles, pipelines, fields, and modules - we configure Zoho to match your business, not the other way around.',
      points: ['Org configuration & security', 'Custom fields & modules', 'Pipeline & stage setup', 'Data migration from any source'],
    },
    {
      title: 'Workflow Automation',
      desc: 'Eliminate manual tasks with intelligent automation: triggers, rules, Blueprint processes, and cross-app workflows via Zoho Flow.',
      points: ['Workflow rules & triggers', 'Blueprint process flows', 'Zoho Flow multi-app automations', 'Email, SMS, and task automation'],
    },
    {
      title: 'Custom Integrations',
      desc: 'Connect Zoho to your existing tools - payment processors, ERP systems, marketing platforms, and custom-built apps.',
      points: ['REST API integrations', 'Webhook configuration', 'Third-party app connectors', 'Custom Deluge scripting'],
    },
    {
      title: 'Training & Support',
      desc: 'We don\'t hand over a configured system and disappear. Role-based training, documentation, and ongoing support are standard.',
      points: ['Admin & end-user training', 'Custom operations guide', 'Recorded walkthrough videos', 'Monthly support retainers available'],
    },
  ]

  return (
    <div className="overflow-x-hidden">
      <PageHero
        service="Zoho implementation"
        title="Systems shaped"
        accent="around your team."
        description="A clearer, more connected Zoho setup—configured, integrated, and explained so your team can make it part of the way they work."
        image="/images/discipline-zoho-implementation.png"
        imageAlt="SNAiO Tech illustration for Zoho implementation"
        highlights={["Setup & migration", "Connected workflows", "Team training"]}
        primaryLabel="Plan your Zoho setup"
        secondaryLabel="Explore Zoho apps"
        secondaryTarget="zoho-apps"
        onNavigate={onNavigate}
      />

      {/* Problem statement */}
      <section className="py-20 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">The problem we solve</p>
              <h2 className="text-3xl font-black text-white mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Most teams use <span className="gradient-text">10% of what Zoho can do.</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Zoho is one of the most powerful business software suites available. It's also remarkably complex. Most implementations are done by IT generalists or by the team itself - resulting in a configuration that's technically "installed" but practically useless.
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                We're specialists. We've implemented Zoho for law firms, logistics companies, healthcare practices, and professional services teams. We know where the common mistakes happen, and we build around them.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { issue: 'Data stuck in spreadsheets', fix: 'Clean migration into structured CRM records' },
                { issue: 'Manual follow-up tasks', fix: 'Automated workflows triggered by deal stage' },
                { issue: 'Inconsistent sales process', fix: 'Blueprint enforcement across the pipeline' },
                { issue: 'Siloed departments', fix: 'Cross-app automation between CRM, Books, Desk' },
                { issue: 'No visibility into numbers', fix: 'Custom Zoho Analytics dashboards' },
              ].map((item) => (
                <div key={item.issue} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <span className="text-red-400/70 text-xs line-through">{item.issue}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-cyan-400 flex-shrink-0">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                  <div className="flex-1">
                    <span className="text-green-400/80 text-xs">{item.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zoho apps grid */}
      <section id="zoho-apps" className="py-24 gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={appsRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${appsVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">Supported products</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                The Zoho apps <span className="gradient-text">we know inside out</span>
              </h2>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger ${appsVis ? 'visible' : ''}`}>
              {ZOHO_APPS.map((app) => (
                <div key={app.name} className="neumorph rounded-2xl p-5 text-center group hover:border hover:border-cyan-500/20 transition-all">
                  <div className="text-xs eyebrow mb-2 text-cyan-400/60">{app.cat}</div>
                  <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                    {app.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 gradient-mesh-light">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={servRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-14 reveal ${servVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">What's included</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Full-cycle <span className="gradient-text">implementation services</span>
              </h2>
            </div>
            <div className={`grid md:grid-cols-2 gap-6 stagger ${servVis ? 'visible' : ''}`}>
              {services.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-8">
                  <h3 className="font-bold text-white text-lg mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{s.title}</h3>
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

      {/* FAQ */}
      <section className="py-24 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef as React.RefObject<HTMLDivElement>}>
            <div className={`text-center mb-12 reveal ${faqVis ? 'visible' : ''}`}>
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Zoho <span className="gradient-text">questions answered</span>
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
      <PageCTA
        title="Make Zoho fit"
        accent="the way you work."
        description="Whether you're starting fresh or improving an existing setup, let's map out the next practical step."
        buttonLabel="Talk about Zoho"
        onNavigate={onNavigate}
      />
    </div>
  )
}
