import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const { data, error } = await supabase.from('site_config').select('data').eq('id', 1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.data || {});
}

export async function PUT(request) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const body = await request.json();
  const { data, error } = await supabase
    .from('site_config')
    .update({ data: body, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select('data')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.data || {});
}
