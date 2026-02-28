import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function GET(request, { params }) {
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const { data, error } = await supabase.from('services').select('*').eq('id', params.id).single();
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request, { params }) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const body = await request.json();
  const payload = {
    updated_at: new Date().toISOString(),
  };
  if (body.slug !== undefined) payload.slug = body.slug;
  if (body.title !== undefined) payload.title = body.title;
  if (body.shortDesc !== undefined) payload.short_desc = body.shortDesc;
  if (body.longDesc !== undefined) payload.long_desc = body.longDesc;
  if (body.icon !== undefined) payload.icon = body.icon;
  if (body.image_url !== undefined) payload.image_url = (body.image_url || '').trim() || null;
  if (body.benefits !== undefined) payload.benefits = Array.isArray(body.benefits) ? body.benefits : [];
  if (body.process !== undefined) payload.process = Array.isArray(body.process) ? body.process : [];
  if (body.sort_order !== undefined) payload.sort_order = body.sort_order;
  const { data, error } = await supabase.from('services').update(payload).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const { error } = await supabase.from('services').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
