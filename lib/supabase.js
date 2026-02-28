import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// New dashboard: "Secret" key (sb_secret_...). Legacy: "service_role" (eyJ...).
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

/** Client for server-side use with service role (admin writes). Use in API routes only. */
export function createServerClient() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
}

/** Client for server-side read (e.g. in Server Components). Prefer anon key for public read. */
export function createReadClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const hasSupabase = !!(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));
