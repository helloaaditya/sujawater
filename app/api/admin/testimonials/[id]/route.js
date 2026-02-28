import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function PUT(request, { params }) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const body = await request.json();
  const payload = { updated_at: new Date().toISOString() };
  if (body.name !== undefined) payload.name = body.name;
  if (body.location !== undefined) payload.location = body.location;
  if (body.rating !== undefined) payload.rating = body.rating;
  if (body.text !== undefined) payload.text = body.text;
  if (body.sort_order !== undefined) payload.sort_order = body.sort_order;
  const { data, error } = await supabase.from('testimonials').update(payload).eq('id', params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  const { error } = await supabase.from('testimonials').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
