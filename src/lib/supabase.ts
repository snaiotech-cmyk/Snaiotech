import { createClient } from '@supabase/supabase-js'

// Fallback to project defaults if environment variables are not injected at build time
const DEFAULT_SUPABASE_URL = 'https://eloqsfhbhnbzjyjtfyru.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_P0iN_58f246OCuRNyNQwkg_g7FwqX3m'

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
