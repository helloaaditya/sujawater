import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';
import { siteConfig, services, testimonials, faqs, gallery, serviceBenefits, serviceProcess } from '@/lib/data';
import { images } from '@/lib/images';

export async function POST() {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const supabase = createServerClient();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  try {
    const now = new Date().toISOString();
    const iconToUrl = {};
    Object.keys(images).filter((k) => k.startsWith('service')).forEach((k) => {
      const icon = k.replace(/^service/, '').replace(/^./, (c) => c.toLowerCase());
      iconToUrl[icon] = images[k];
    });
    const defaultServiceImg = iconToUrl.terrace || '';
    const serviceRows = services.map((s, i) => ({
      slug: s.slug,
      title: s.title,
      short_desc: s.shortDesc ?? '',
      long_desc: s.longDesc ?? '',
      icon: s.icon ?? 'terrace',
      image_url: iconToUrl[s.icon || 'terrace'] || defaultServiceImg,
      benefits: serviceBenefits || [],
      process: serviceProcess || [],
      sort_order: i,
      updated_at: now,
    }));
    const { error: e1 } = await supabase.from('services').upsert(serviceRows, { onConflict: 'slug' });
    if (e1) throw e1;

    const testimonialRows = testimonials.map((t, i) => ({
      name: t.name,
      location: t.location ?? '',
      rating: t.rating ?? 5,
      text: t.text,
      sort_order: i,
      updated_at: now,
    }));
    await supabase.from('testimonials').delete().gte('sort_order', -1);
    const { error: e2 } = await supabase.from('testimonials').insert(testimonialRows);
    if (e2) throw e2;

    const faqRows = faqs.map((f, i) => ({
      q: f.q,
      a: f.a,
      sort_order: i,
      updated_at: now,
    }));
    await supabase.from('faqs').delete().gte('sort_order', -1);
    const { error: e3 } = await supabase.from('faqs').insert(faqRows);
    if (e3) throw e3;

    const { error: e4 } = await supabase.from('site_config').upsert(
      { id: 1, data: siteConfig, updated_at: now },
      { onConflict: 'id' }
    );
    if (e4) throw e4;

    const galleryRows = gallery.map((g, i) => ({
      title: g.title,
      image_url: g.image_url,
      alt: g.alt ?? '',
      sort_order: i,
      updated_at: now,
    }));
    await supabase.from('gallery').delete().gte('sort_order', -1);
    const { error: e5 } = await supabase.from('gallery').insert(galleryRows);
    if (e5) throw e5;

    return NextResponse.json({ ok: true, message: 'Seeded services, testimonials, faqs, site_config, gallery' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
