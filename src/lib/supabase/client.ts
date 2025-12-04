import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // checks if env variables are present to prevent crash
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("Missing Supabase Environment Variables")
  }

  return createBrowserClient(url, key)
}