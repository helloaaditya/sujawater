import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { data, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
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
  const slug = (body.slug || body.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '').trim();
  if (!slug || !body.title) {
    return NextResponse.json({ error: 'slug and title required' }, { status: 400 });
  }
  const benefits = Array.isArray(body.benefits) ? body.benefits : [];
  const process = Array.isArray(body.process) ? body.process : [];
  const { data, error } = await supabase
    .from('services')
    .insert({
      slug,
      title: body.title,
      short_desc: body.shortDesc ?? '',
      long_desc: body.longDesc ?? '',
      icon: body.icon ?? 'terrace',
      image_url: (body.image_url || '').trim() || null,
      benefits,
      process,
      sort_order: body.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
