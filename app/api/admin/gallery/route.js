import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { data, error } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const body = await request.json();
  const title = (body.title || '').trim();
  const image_url = (body.image_url || '').trim();
  if (!title || !image_url) {
    return NextResponse.json({ error: 'title and image_url required' }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('gallery')
    .insert({
      title,
      image_url,
      alt: (body.alt || '').trim(),
      sort_order: body.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
