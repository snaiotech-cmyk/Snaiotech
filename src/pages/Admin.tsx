import { useEffect, useState, useCallback } from 'react'
import { supabase, supabaseConfigured } from '@/lib/supabase'

interface AdminProps { onNavigate: (page: string) => void }
type Tab = 'overview' | 'pages' | 'submissions' | 'settings'
type Status = 'new' | 'contacted' | 'archived'

interface PageSetting {
  id?: number
  page: string
  title: string
  slug: string
  description: string
  keywords: string
  indexable: boolean
}

interface SiteSetting {
  id?: boolean
  site_name: string
  logo_url: string
  favicon_url: string
  canonical_url: string
  default_description: string
  og_image_url: string
  instagram: string
  facebook: string
  linkedin: string
  email: string
  robots: string
  schema_type: string
  ga_id: string
  gsc_verification: string
  geo_region: string
  geo_placename: string
  geo_position: string
}

interface Submission {
  id: string
  name: string
  email: string
  company: string
  service: string
  message: string
  created_at: string
  status: Status
}

const emptySite: SiteSetting = {
  site_name: 'Snaiotech',
  logo_url: '',
  favicon_url: '',
  canonical_url: 'https://snaiotech.com',
  default_description: '',
  og_image_url: '',
  instagram: 'https://www.instagram.com/snaiotech/',
  facebook: 'https://www.facebook.com/snaiotech',
  linkedin: 'https://www.linkedin.com/in/snaiotech/',
  email: 'Info@snaiotech.com',
  robots: 'index, follow',
  schema_type: 'ProfessionalService',
  ga_id: '',
  gsc_verification: '',
  geo_region: 'IN-TN',
  geo_placename: 'Chennai, Tamil Nadu, India',
  geo_position: '13.0827;80.2707',
}

const SERVICE_LABELS: Record<string, string> = {
  webdev: 'Web Dev & SEO/AEO/GEO',
  pdf: 'PDF Accessibility & WCAG',
  zoho: 'Zoho Deployment',
  multiple: 'Multiple services',
  other: 'Not sure yet',
}

const STATUS_COLORS: Record<Status, string> = {
  new: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  contacted: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  archived: 'text-white/30 bg-white/5 border-white/10',
}

/* ─── Sub-components ─── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gradient-mesh-light pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </div>
  )
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-8 max-w-xl mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.25)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.8" className="w-7 h-7">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{title}</h2>
      <p className="text-white/55 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

function AdminInput({
  label, value, onChange, type = 'text', placeholder = '', rows,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; rows?: number;
}) {
  const id = `admin-field-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <label className="block" htmlFor={id}>
      <span className="block text-xs text-white/45 mb-1.5 capitalize font-medium">{label}</span>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="glass-input w-full rounded-xl px-3 py-2.5 text-sm resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="glass-input w-full rounded-xl px-3 py-2.5 text-sm"
        />
      )}
    </label>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function StatCard({ label, value, icon, accent = '#00B4D8' }: { label: string; value: number | string; icon: string; accent?: string }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" className="w-5 h-5">
          <path d={icon}/>
        </svg>
      </div>
      <div>
        <p className="text-xs text-white/40 mb-1">{label}</p>
        <p className="text-3xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{value}</p>
      </div>
    </div>
  )
}

/* ─── Main component ─── */
export default function Admin({ onNavigate }: AdminProps) {
  const [tab, setTab] = useState<Tab>('overview')
  const [session, setSession] = useState<Awaited<ReturnType<NonNullable<typeof supabase>['auth']['getSession']>>['data']['session']>(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [pages, setPages] = useState<PageSetting[]>([])
  const [site, setSite] = useState<SiteSetting>(emptySite)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all')
  const [isSignUp, setIsSignUp] = useState(false)
  const [authSuccess, setAuthSuccess] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => listener.subscription.unsubscribe()
  }, [])

  const loadData = useCallback(async () => {
    if (!supabase) return
    const [pageResult, siteResult, subResult] = await Promise.all([
      supabase.from('page_settings').select('*').order('id'),
      supabase.from('site_settings').select('*').eq('id', true).single(),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }),
    ])
    if (!pageResult.error) setPages(pageResult.data || [])
    if (!siteResult.error && siteResult.data) setSite({ ...emptySite, ...siteResult.data })
    if (!subResult.error) setSubmissions(subResult.data || [])
    if (pageResult.error || siteResult.error || subResult.error) {
      setSaveMsg('Some data failed to load. Check Supabase RLS policies.')
    }
  }, [])

  useEffect(() => {
    if (session) loadData()
  }, [session, loadData])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setBusy(true)
    setSaveMsg('')
    setAuthSuccess('')

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email: loginEmail,
        password: loginPassword,
      })
      if (error) {
        setSaveMsg(error.message)
      } else if (data.session) {
        setSession(data.session)
      } else {
        setAuthSuccess('Account created successfully! If email confirmation is required, check your inbox, or sign in now.')
        setIsSignUp(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })
      if (error) setSaveMsg(error.message)
    }
    setBusy(false)
  }

  const save = async () => {
    if (!supabase) return
    setBusy(true)
    setSaveMsg('')
    const [p, s] = await Promise.all([
      supabase.from('page_settings').upsert(pages, { onConflict: 'page' }),
      supabase.from('site_settings').upsert({ ...site, id: true }),
    ])
    setSaveMsg(p.error || s.error ? `Save failed: ${p.error?.message || s.error?.message}` : '✓ Changes saved successfully.')
    setBusy(false)
  }

  const updateStatus = async (id: string, status: Status) => {
    if (!supabase) return
    setSubmissions(cur => cur.map(s => s.id === id ? { ...s, status } : s))
    const { error } = await supabase.from('submissions').update({ status }).eq('id', id)
    if (error) setSaveMsg(error.message)
  }

  const filtered = filterStatus === 'all' ? submissions : submissions.filter(s => s.status === filterStatus)
  const newCount = submissions.filter(s => s.status === 'new').length

  /* ─── Not configured ─── */
  if (!supabaseConfigured) {
    return (
      <Shell>
        <Notice title="Supabase not configured">
          Add <code className="text-cyan-300">VITE_SUPABASE_URL</code> and <code className="text-cyan-300">VITE_SUPABASE_ANON_KEY</code> (or the <code className="text-cyan-300">NEXT_PUBLIC_</code> equivalents) to your Vercel environment variables, then redeploy.
        </Notice>
      </Shell>
    )
  }

  /* ─── Login screen ─── */
  if (!session) {
    return (
      <div className="min-h-screen gradient-mesh grid-overlay flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <img src="https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo" alt="Snaiotech" className="w-10 h-10 object-contain" />
              <span className="font-black text-2xl gradient-text" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Snaiotech</span>
            </div>
            <p className="eyebrow mb-2">Private workspace</p>
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              {isSignUp ? 'Create Admin Account' : <>Admin <span className="gradient-text">Portal</span></>}
            </h1>
            <p className="text-sm text-white/45 mt-2">
              {isSignUp ? 'Register your administrator credentials in Supabase.' : 'Sign in with your Supabase admin account.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="glass rounded-2xl p-8 space-y-5">
            <AdminInput label="Email address" value={loginEmail} onChange={setLoginEmail} type="email" placeholder="admin@example.com" />
            <AdminInput label="Password" value={loginPassword} onChange={setLoginPassword} type="password" placeholder="••••••••" />

            {saveMsg && (
              <p role="alert" className="text-sm text-red-300 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {saveMsg}
              </p>
            )}

            {authSuccess && (
              <p role="status" className="text-sm text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
                {authSuccess}
              </p>
            )}

            <button disabled={busy} className="btn-primary w-full rounded-xl py-3.5 text-sm" type="submit">
              {busy ? (isSignUp ? 'Creating account…' : 'Signing in…') : (isSignUp ? 'Create Account & Enter' : 'Sign in to Admin')}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setSaveMsg(''); setAuthSuccess('') }}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
              >
                {isSignUp ? 'Already created an account? Sign in instead' : "First time? Click here to create your admin account"}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-white/25 mt-6">
            This portal is for Snaiotech team members only.
          </p>
        </div>
      </div>
    )
  }

  /* ─── Dashboard ─── */
  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m0-7h6' },
    { id: 'pages', label: 'Pages & SEO', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z' },
    { id: 'submissions', label: 'Submissions', icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z', badge: newCount || undefined },
    { id: 'settings', label: 'Site Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
  ]

  return (
    <div className="min-h-screen gradient-mesh-light">
      {/* Admin topbar */}
      <header className="glass-strong sticky top-0 z-40 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 group">
              <img src="https://res.cloudinary.com/piyrx4qi/image/upload/f_auto,q_auto/logo" alt="Snaiotech" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
              <span className="font-black text-lg gradient-text" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Snaiotech</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.2)' }}>
              <span className="text-xs text-cyan-300 font-medium">Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/35 hidden sm:block">{session.user.email}</span>
            <button onClick={() => onNavigate('home')} className="btn-ghost rounded-xl px-4 py-2 text-sm">
              <span className="hidden sm:inline">View Website</span>
              <span className="sm:hidden">Site</span>
            </button>
            <button onClick={() => supabase?.auth.signOut()} className="glass-input rounded-xl px-4 py-2 text-sm text-white/60 hover:text-red-300 hover:border-red-400/30 transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <p className="eyebrow mb-2">Supabase workspace</p>
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Admin <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-white/45 mt-2 text-sm">Manage pages, SEO settings, and incoming leads.</p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <aside className="glass rounded-2xl p-2 lg:sticky lg:top-24">
            {tabs.map(({ id, label, icon, badge }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center gap-3 transition-all duration-150 ${
                  tab === id
                    ? 'bg-cyan-400/15 text-cyan-300'
                    : 'text-white/55 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 flex-shrink-0">
                  <path d={icon}/>
                </svg>
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className="text-xs bg-cyan-400 text-black font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
                ) : null}
              </button>
            ))}

            <div className="mt-3 pt-3 border-t border-white/8 px-2">
              <button
                onClick={save}
                disabled={busy}
                className="btn-primary w-full rounded-xl py-2.5 text-sm"
              >
                {busy ? 'Saving…' : 'Save changes'}
              </button>
              {saveMsg && (
                <p className={`text-xs mt-2 px-1 ${saveMsg.startsWith('✓') ? 'text-emerald-400' : 'text-red-300'}`}>
                  {saveMsg}
                </p>
              )}
            </div>
          </aside>

          {/* Main content */}
          <section className="space-y-6 min-w-0">

            {/* ── Overview ── */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <StatCard
                    label="Total pages"
                    value={pages.length}
                    icon="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
                  />
                  <StatCard
                    label="New leads"
                    value={newCount}
                    icon="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                    accent="#2FD3E8"
                  />
                  <StatCard
                    label="Indexable pages"
                    value={pages.filter(p => p.indexable).length}
                    icon="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                    accent="#a78bfa"
                  />
                </div>

                {/* Quick links */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Quick actions</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Manage page SEO', desc: 'Edit titles, slugs & meta descriptions', tab: 'pages' as Tab, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z' },
                      { label: 'View submissions', desc: 'Read and manage contact form leads', tab: 'submissions' as Tab, icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z' },
                      { label: 'Site settings', desc: 'Logo, favicon, schema & social links', tab: 'settings' as Tab, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
                      { label: 'View your website', desc: 'See the live public-facing site', tab: null as unknown as Tab, icon: 'M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14' },
                    ].map(({ label, desc, tab: t, icon }) => (
                      <button
                        key={label}
                        onClick={() => t ? setTab(t) : onNavigate('home')}
                        className="glass rounded-xl p-4 text-left flex items-start gap-3 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all group"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <path d={icon}/>
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-white/85 group-hover:text-white">{label}</p>
                          <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent submissions preview */}
                {submissions.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Recent leads</h3>
                      <button onClick={() => setTab('submissions')} className="text-xs text-cyan-400 hover:text-cyan-300">View all →</button>
                    </div>
                    <div className="space-y-3">
                      {submissions.slice(0, 3).map(s => (
                        <div key={s.id} className="flex items-center justify-between gap-4 py-2 border-b border-white/6 last:border-0">
                          <div>
                            <p className="text-sm text-white/80 font-medium">{s.name}</p>
                            <p className="text-xs text-white/35">{new Date(s.created_at).toLocaleDateString()} · {SERVICE_LABELS[s.service] || s.service || 'General'}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Pages & SEO ── */}
            {tab === 'pages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Pages &amp; SEO</h2>
                    <p className="text-sm text-white/40 mt-1">Configure page titles, URL slugs, meta descriptions, and keywords.</p>
                  </div>
                </div>

                {pages.length === 0 ? (
                  <div className="glass rounded-2xl p-10 text-center text-white/40">
                    No pages found. Run the Supabase migration SQL to seed initial pages.
                  </div>
                ) : (
                  pages.map((page, idx) => (
                    <div key={page.page} className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.2)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2" className="w-4 h-4">
                              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
                            </svg>
                          </div>
                          <h3 className="font-bold text-white">{page.page}</h3>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={page.indexable}
                            onChange={e => setPages(cur => cur.map((p, i) => i === idx ? { ...p, indexable: e.target.checked } : p))}
                            className="accent-cyan-400 w-4 h-4"
                          />
                          <span className="text-xs text-white/50">Indexable</span>
                        </label>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <AdminInput
                          label="Page title"
                          value={page.title}
                          onChange={v => setPages(cur => cur.map((p, i) => i === idx ? { ...p, title: v } : p))}
                          placeholder="Snaiotech – Page Name"
                        />
                        <AdminInput
                          label="URL slug"
                          value={page.slug}
                          onChange={v => setPages(cur => cur.map((p, i) => i === idx ? { ...p, slug: v } : p))}
                          placeholder="/page-slug"
                        />
                        <div className="md:col-span-2">
                          <AdminInput
                            label="Meta description"
                            value={page.description}
                            onChange={v => setPages(cur => cur.map((p, i) => i === idx ? { ...p, description: v } : p))}
                            placeholder="150–160 character description for search engines"
                            rows={2}
                          />
                          <p className={`text-xs mt-1 ${page.description.length > 160 ? 'text-red-400' : page.description.length > 120 ? 'text-emerald-400' : 'text-white/30'}`}>
                            {page.description.length}/160 characters
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <AdminInput
                            label="Keywords (comma-separated)"
                            value={page.keywords}
                            onChange={v => setPages(cur => cur.map((p, i) => i === idx ? { ...p, keywords: v } : p))}
                            placeholder="seo, web development, chennai"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── Submissions ── */}
            {tab === 'submissions' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Submissions</h2>
                    <p className="text-sm text-white/40 mt-1">{submissions.length} total · {newCount} new</p>
                  </div>
                  <div className="flex gap-2">
                    {(['all', 'new', 'contacted', 'archived'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFilterStatus(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${
                          filterStatus === f
                            ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/25'
                            : 'glass text-white/50 hover:text-white/80'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center text-white/35">
                    No {filterStatus === 'all' ? '' : filterStatus + ' '}submissions yet.
                  </div>
                ) : (
                  filtered.map(item => (
                    <article key={item.id} className="glass rounded-2xl overflow-hidden">
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-bold text-white">{item.name}</h3>
                              {item.status === 'new' && (
                                <span className="text-xs bg-cyan-400 text-black font-bold px-2 py-0.5 rounded-full">NEW</span>
                              )}
                            </div>
                            <a href={`mailto:${item.email}`} className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                              {item.email}
                            </a>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-white/35">
                              <span>{new Date(item.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                              {item.company && <span>· {item.company}</span>}
                              {item.service && <span>· {SERVICE_LABELS[item.service] || item.service}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <select
                              value={item.status}
                              onChange={e => updateStatus(item.id, e.target.value as Status)}
                              className="glass-input rounded-lg px-3 py-2 text-xs"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="archived">Archived</option>
                            </select>
                            <button
                              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                              className="glass-input rounded-lg px-3 py-2 text-xs text-white/60 hover:text-white transition-colors"
                            >
                              {expandedId === item.id ? 'Collapse' : 'Read'}
                            </button>
                            <a
                              href={`mailto:${item.email}?subject=Re: Your Snaiotech enquiry`}
                              className="btn-primary rounded-lg px-3 py-2 text-xs"
                            >
                              Reply
                            </a>
                          </div>
                        </div>

                        {expandedId === item.id && (
                          <div className="mt-4 pt-4 border-t border-white/8">
                            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{item.message}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}

            {/* ── Site Settings ── */}
            {tab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Site Settings</h2>
                  <p className="text-sm text-white/40 mt-1">Manage global site branding, SEO, AEO, GEO, and social links.</p>
                </div>

                {/* Branding */}
                <SectionCard title="🎨 Branding">
                  <AdminInput label="Site name" value={site.site_name} onChange={v => setSite(s => ({ ...s, site_name: v }))} placeholder="Snaiotech" />
                  <AdminInput label="Logo URL" value={site.logo_url} onChange={v => setSite(s => ({ ...s, logo_url: v }))} placeholder="https://..." />
                  <AdminInput label="Favicon URL" value={site.favicon_url} onChange={v => setSite(s => ({ ...s, favicon_url: v }))} placeholder="https://.../favicon.ico" />
                  <AdminInput label="OG / Social share image URL" value={site.og_image_url} onChange={v => setSite(s => ({ ...s, og_image_url: v }))} placeholder="https://..." />
                </SectionCard>

                {/* SEO */}
                <SectionCard title="🔍 SEO — Search Engine Optimization">
                  <AdminInput label="Canonical base URL" value={site.canonical_url} onChange={v => setSite(s => ({ ...s, canonical_url: v }))} placeholder="https://snaiotech.com" />
                  <AdminInput label="Robots directive" value={site.robots} onChange={v => setSite(s => ({ ...s, robots: v }))} placeholder="index, follow" />
                  <AdminInput label="Schema.org type" value={site.schema_type} onChange={v => setSite(s => ({ ...s, schema_type: v }))} placeholder="ProfessionalService" />
                  <AdminInput label="Google Analytics ID" value={site.ga_id} onChange={v => setSite(s => ({ ...s, ga_id: v }))} placeholder="G-XXXXXXXXXX" />
                  <div className="md:col-span-2">
                    <AdminInput
                      label="Default meta description"
                      value={site.default_description}
                      onChange={v => setSite(s => ({ ...s, default_description: v }))}
                      placeholder="150–160 character site-wide default description"
                      rows={2}
                    />
                    <p className={`text-xs mt-1 ${site.default_description.length > 160 ? 'text-red-400' : site.default_description.length > 120 ? 'text-emerald-400' : 'text-white/30'}`}>
                      {site.default_description.length}/160 characters
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <AdminInput
                      label="Google Search Console verification (meta content value)"
                      value={site.gsc_verification}
                      onChange={v => setSite(s => ({ ...s, gsc_verification: v }))}
                      placeholder="Paste the content= value from your verification meta tag"
                    />
                  </div>
                </SectionCard>

                {/* GEO / AEO */}
                <SectionCard title="🌍 GEO & AEO — Geo & Answer Engine Optimization">
                  <AdminInput label="GEO region code (ISO 3166-2)" value={site.geo_region} onChange={v => setSite(s => ({ ...s, geo_region: v }))} placeholder="IN-TN" />
                  <AdminInput label="GEO placename" value={site.geo_placename} onChange={v => setSite(s => ({ ...s, geo_placename: v }))} placeholder="Chennai, Tamil Nadu, India" />
                  <AdminInput label="GEO position (lat;lon)" value={site.geo_position} onChange={v => setSite(s => ({ ...s, geo_position: v }))} placeholder="13.0827;80.2707" />
                  <div className="glass-blue rounded-xl p-4 text-xs text-white/55 leading-relaxed">
                    <strong className="text-cyan-300">AEO Tip:</strong> GEO meta tags help search engines associate your business with a specific region, improving local results and featured snippet eligibility for geo-specific queries.
                  </div>
                </SectionCard>

                {/* Social */}
                <SectionCard title="📱 Social & Contact">
                  <AdminInput label="Instagram URL" value={site.instagram} onChange={v => setSite(s => ({ ...s, instagram: v }))} placeholder="https://www.instagram.com/snaiotech/" />
                  <AdminInput label="Facebook URL" value={site.facebook} onChange={v => setSite(s => ({ ...s, facebook: v }))} placeholder="https://www.facebook.com/snaiotech" />
                  <AdminInput label="LinkedIn URL" value={site.linkedin} onChange={v => setSite(s => ({ ...s, linkedin: v }))} placeholder="https://www.linkedin.com/in/snaiotech/" />
                  <AdminInput label="Contact email" value={site.email} onChange={v => setSite(s => ({ ...s, email: v }))} placeholder="Info@snaiotech.com" type="email" />
                </SectionCard>

                {/* Info callout */}
                <div className="glass rounded-2xl p-5 flex items-start gap-4" style={{ border: '1px solid rgba(0,180,216,0.2)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-1">Changes take effect on next deploy</p>
                    <p className="text-xs text-white/45 leading-relaxed">
                      Site settings are saved to Supabase and applied to the live site in real-time via the App component. Structural changes (e.g., schema.org in HTML head) require a new Vercel deploy.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
  )
}
