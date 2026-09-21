import { createClient } from '@supabase/supabase-js'

// Fallback to project defaults if environment variables are not injected at build time
const DEFAULT_SUPABASE_URL = 'https://fiicryblohagmfcvshcw.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_7CR16dc-HoOh3kLGCDAB_w_xTs5FU_7'

// Support VITE_, NEXT_PUBLIC_, and provided defaults
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  DEFAULT_SUPABASE_URL

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
