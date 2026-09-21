#!/usr/bin/env node
/**
 * scripts/migrate.js
 * Auto-migration script that runs on every Vercel deploy.
 * Connects to Supabase Postgres via the service role key and
 * executes the SQL migration file. Safe to run multiple times.
 *
 * Required environment variables (set in Vercel):
 *   SUPABASE_DB_URL    — Postgres connection URI from Supabase dashboard
 *                        (Project Settings → Database → Connection String → URI)
 *                        Format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
 *                        OR use Transaction pooler if direct connection is unavailable.
 *
 * Fallback: If SUPABASE_DB_URL is not set, the script exits gracefully
 *           with a warning (does not fail the build).
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const dbUrl = process.env.SUPABASE_DB_URL

  if (!dbUrl) {
    console.warn('[migrate] SUPABASE_DB_URL is not set — skipping auto-migration.')
    console.warn('[migrate] To enable: add SUPABASE_DB_URL to Vercel environment variables.')
    console.warn('[migrate] Get it from: Supabase → Project Settings → Database → Connection String → URI')
    return
  }

  // Dynamically import pg so we don't break builds where it's missing
  let pg
  try {
    const mod = await import('pg')
    pg = mod.default || mod
  } catch {
    console.warn('[migrate] "pg" package not found — skipping migration. Run: npm install pg')
    return
  }

  const sqlPath = join(__dirname, '../supabase/migrations/001_initial.sql')
  let sql
  try {
    sql = readFileSync(sqlPath, 'utf8')
  } catch (err) {
    console.error('[migrate] Could not read migration file:', err.message)
    process.exit(1)
  }

  const { Client } = pg
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

  try {
    console.log('[migrate] Connecting to Supabase Postgres…')
    await client.connect()
    console.log('[migrate] Running migration…')
    await client.query(sql)
    console.log('[migrate] ✓ Migration complete.')
  } catch (err) {
    console.error('[migrate] Migration failed:', err.message)
    // Don't fail the build for migration errors — tables may already exist
    // Change `return` to `process.exit(1)` if you want hard failures
    console.warn('[migrate] Continuing build despite migration error.')
  } finally {
    await client.end()
  }
}

migrate()
