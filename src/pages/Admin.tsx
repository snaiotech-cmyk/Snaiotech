import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '@/lib/supabase'

interface AdminProps { onNavigate: (page: string) => void }
type Tab = 'overview' | 'pages' | 'submissions' | 'settings'
type Status = 'new' | 'contacted' | 'archived'
interface PageSetting { id?: number; page: string; title: string; slug: string; description: string; keywords: string; indexable: boolean }
interface SiteSetting { id?: boolean; site_name: string; logo_url: string; favicon_url: string; canonical_url: string; default_description: string; og_image_url: string; instagram: string; facebook: string; linkedin: string; email: string; robots: string; schema_type: string }
interface Submission { id: string; name: string; email: string; company: string; service: string; message: string; created_at: string; status: Status }

const emptySite: SiteSetting = { site_name: 'Snaiotech', logo_url: '', favicon_url: '', canonical_url: '', default_description: '', og_image_url: '', instagram: '', facebook: '', linkedin: '', email: '', robots: 'index, follow', schema_type: 'ProfessionalService' }

export default function Admin({ onNavigate }: AdminProps) {
  const [tab, setTab] = useState<Tab>('overview')
  const [session, setSession] = useState<Awaited<ReturnType<NonNullable<typeof supabase>['auth']['getSession']>>['data']['session']>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pages, setPages] = useState<PageSetting[]>([])
  const [site, setSite] = useState<SiteSetting>(emptySite)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!supabase || !session) return
    Promise.all([
      supabase.from('page_settings').select('*').order('id'),
      supabase.from('site_settings').select('*').eq('id', true).single(),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }),
    ]).then(([pageResult, siteResult, submissionResult]) => {
      if (pageResult.error || siteResult.error || submissionResult.error) setMessage('Unable to load Supabase data. Check the SQL policies.')
      else { setPages(pageResult.data || []); setSite(siteResult.data || emptySite); setSubmissions(submissionResult.data || []) }
    })
  }, [session])

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault(); if (!supabase) return
    setBusy(true); setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : 'Signed in.')
    setBusy(false)
  }

  const save = async () => {
    if (!supabase) return
    setBusy(true); setMessage('')
    const pageResult = await supabase.from('page_settings').upsert(pages, { onConflict: 'page' })
    const siteResult = await supabase.from('site_settings').upsert({ ...site, id: true })
    setMessage(pageResult.error || siteResult.error ? 'Save failed. Check your Supabase policies.' : 'Saved to Supabase.')
    setBusy(false)
  }

  const updateStatus = async (id: string, status: Status) => {
    if (!supabase) return
    setSubmissions(current => current.map(item => item.id === id ? { ...item, status } : item))
    const { error } = await supabase.from('submissions').update({ status }).eq('id', id)
    if (error) setMessage(error.message)
  }

  if (!supabaseConfigured) return <Shell><Notice title="Supabase is not configured">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel and your local environment.</Notice></Shell>
  if (!session) return <Shell><form onSubmit={signIn} className="glass rounded-2xl p-8 max-w-md mx-auto space-y-5"><div><p className="eyebrow mb-3">Private workspace</p><h1 className="text-3xl font-black text-white">Admin <span className="gradient-text">sign in</span></h1><p className="text-sm text-white/50 mt-2">Use the admin user created in Supabase Authentication.</p></div><AdminInput label="Email" value={email} onChange={setEmail} type="email" /><AdminInput label="Password" value={password} onChange={setPassword} type="password" /><button disabled={busy} className="btn-primary w-full rounded-xl py-3">{busy ? 'Signing in...' : 'Sign in'}</button>{message && <p role="alert" className="text-sm text-red-300">{message}</p>}</form></Shell>

  return <Shell><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"><div><p className="eyebrow mb-3">Supabase workspace</p><h1 className="text-4xl font-black text-white">Admin <span className="gradient-text">Portal</span></h1><p className="text-white/55 mt-3">Manage the live site and incoming conversations.</p></div><div className="flex gap-3"><button onClick={() => supabase?.auth.signOut()} className="btn-ghost rounded-xl px-4 py-2.5 text-sm">Sign out</button><button onClick={() => onNavigate('home')} className="btn-ghost rounded-xl px-4 py-2.5 text-sm">View website</button></div></div><div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start"><aside className="glass rounded-2xl p-2 lg:sticky lg:top-24">{([['overview', 'Overview'], ['pages', 'Pages & SEO'], ['submissions', 'Submissions'], ['settings', 'Site settings']] as [Tab, string][]).map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`w-full text-left px-4 py-3 rounded-xl text-sm ${tab === id ? 'bg-cyan-400/15 text-cyan-300' : 'text-white/60 hover:bg-white/5'}`}>{label}</button>)}</aside><section className="space-y-6">{tab === 'overview' && <div className="grid sm:grid-cols-3 gap-4">{[['Pages', pages.length], ['New leads', submissions.filter(item => item.status === 'new').length], ['Indexable', pages.filter(item => item.indexable).length]].map(([label, value]) => <div key={label} className="glass rounded-2xl p-5"><p className="text-sm text-white/50">{label}</p><p className="text-3xl font-black text-white mt-2">{value}</p></div>)}</div>}{tab === 'pages' && <Editor title="Pages & SEO" onSave={save} busy={busy} message={message}>{pages.map((page, index) => <div key={page.page} className="glass rounded-2xl p-5 space-y-4"><div className="flex justify-between"><h3 className="font-bold text-white">{page.page}</h3><label className="text-xs text-white/60"><input type="checkbox" checked={page.indexable} onChange={event => setPages(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, indexable: event.target.checked } : item))} className="accent-cyan-400 mr-2" />Indexable</label></div><div className="grid md:grid-cols-2 gap-4">{(['title', 'slug', 'description', 'keywords'] as const).map(field => <AdminInput key={field} label={field} value={page[field]} onChange={value => setPages(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item))} />)}</div></div>)}</Editor>}{tab === 'submissions' && <><h2 className="text-2xl font-bold text-white">Submissions</h2>{submissions.length === 0 ? <div className="glass rounded-2xl p-10 text-center text-white/50">No submissions yet.</div> : submissions.map(item => <article key={item.id} className="glass rounded-2xl p-5"><div className="flex justify-between gap-4"><div><h3 className="font-bold text-white">{item.name}</h3><a href={`mailto:${item.email}`} className="text-sm text-cyan-300">{item.email}</a><p className="text-xs text-white/40 mt-2">{new Date(item.created_at).toLocaleString()} · {item.service || 'General enquiry'}</p></div><select value={item.status} onChange={event => updateStatus(item.id, event.target.value as Status)} className="glass-input rounded-lg px-3 py-2 text-sm"><option value="new">New</option><option value="contacted">Contacted</option><option value="archived">Archived</option></select></div><p className="text-sm text-white/70 mt-4 whitespace-pre-wrap">{item.message}</p></article>)}</>}{tab === 'settings' && <Editor title="Site settings" onSave={save} busy={busy} message={message}><div className="glass rounded-2xl p-5 grid md:grid-cols-2 gap-4">{Object.keys(emptySite).filter(key => key !== 'id').map(key => <AdminInput key={key} label={key.replace(/_/g, ' ')} value={site[key as keyof SiteSetting] as string} onChange={value => setSite(current => ({ ...current, [key]: value }))} />)}</div></Editor>}</section></div></Shell>
}

function Shell({ children }: { children: React.ReactNode }) { return <div className="min-h-screen gradient-mesh-light pt-28 pb-20"><div className="max-w-7xl mx-auto px-6">{children}</div></div> }
function Notice({ title, children }: { title: string; children: React.ReactNode }) { return <div className="glass rounded-2xl p-8 max-w-xl mx-auto"><h1 className="text-2xl font-bold text-white">{title}</h1><p className="text-white/60 mt-3">{children}</p></div> }
function Editor({ title, onSave, busy, message, children }: { title: string; onSave: () => void; busy: boolean; message: string; children: React.ReactNode }) { return <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">{title}</h2><button onClick={onSave} disabled={busy} className="btn-primary rounded-xl px-4 py-2.5 text-sm">{busy ? 'Saving...' : 'Save changes'}</button></div>{children}{message && <p className="text-sm text-cyan-300">{message}</p>}</div> }
function AdminInput({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="block"><span className="block text-xs text-white/45 mb-2 capitalize">{label}</span><input type={type} value={value} onChange={event => onChange(event.target.value)} className="glass-input w-full rounded-xl px-3 py-3 text-sm" required={type !== 'password'} /></label> }
