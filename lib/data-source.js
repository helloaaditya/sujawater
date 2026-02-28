import { unstable_noStore as noStore } from 'next/cache';
import { createReadClient, createServerClient, hasSupabase } from './supabase';
import {
  siteConfig as staticSiteConfig,
  services as staticServices,
  testimonials as staticTestimonials,
  faqs as staticFaqs,
  gallery as staticGallery,
} from './data';

/** Map DB row to site service shape */
function toService(row) {
  if (!row) return null;
  const benefits = row.benefits != null ? (Array.isArray(row.benefits) ? row.benefits : []) : [];
  const process = row.process != null ? (Array.isArray(row.process) ? row.process : []) : [];
  const faqs = row.faqs != null ? (Array.isArray(row.faqs) ? row.faqs : []) : [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDesc: row.short_desc ?? '',
    longDesc: row.long_desc ?? '',
    icon: row.icon ?? 'terrace',
    image_url: row.image_url ?? null,
    benefits,
    process,
    faqs,
  };
}

/** Map DB row to testimonial shape */
function toTestimonial(row) {
  if (!row) return null;
  return { name: row.name, location: row.location ?? '', rating: row.rating ?? 5, text: row.text };
}

/** Map DB row to FAQ shape */
function toFaq(row) {
  if (!row) return null;
  return { q: row.q, a: row.a };
}

/** Map DB row to gallery item shape */
function toGalleryItem(row) {
  if (!row) return null;
  return { id: row.id, title: row.title, image_url: row.image_url, alt: row.alt ?? '', sort_order: row.sort_order ?? 0 };
}

/**
 * Get services: from Supabase if configured, else static data.
 * When using Supabase: each DB service is merged with static data by slug (so rich content
 * from lib/data.js is used), and any service that exists only in static data is appended.
 */
export async function getServices() {
  noStore();
  const supabase = createReadClient();
  if (supabase) {
    const { data, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
    if (!error && data?.length) {
      const dbServices = data.map(toService);
      const dbSlugs = new Set(dbServices.map((s) => s.slug));
      const merged = dbServices.map((dbSvc) => {
        const staticSvc = staticServices.find((s) => s.slug === dbSvc.slug);
        if (!staticSvc) return dbSvc;
        return {
          ...dbSvc,
          title: staticSvc.title ?? dbSvc.title,
          shortDesc: staticSvc.shortDesc || dbSvc.shortDesc,
          longDesc: staticSvc.longDesc || dbSvc.longDesc,
          sections: Array.isArray(staticSvc.sections) && staticSvc.sections.length > 0 ? staticSvc.sections : dbSvc.sections,
          benefits: Array.isArray(staticSvc.benefits) && staticSvc.benefits.length > 0 ? staticSvc.benefits : dbSvc.benefits,
          process: Array.isArray(staticSvc.process) && staticSvc.process.length > 0 ? staticSvc.process : dbSvc.process,
          faqs: Array.isArray(staticSvc.faqs) && staticSvc.faqs.length > 0 ? staticSvc.faqs : dbSvc.faqs,
        };
      });
      const staticOnly = staticServices.filter((s) => !dbSlugs.has(s.slug)).map((s) => ({ ...s, id: null }));
      return [...merged, ...staticOnly];
    }
  }
  return staticServices;
}

/**
 * Get testimonials: from Supabase if configured, else static.
 */
export async function getTestimonials() {
  noStore();
  const supabase = createReadClient();
  if (supabase) {
    const { data, error } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
    if (!error && data?.length) return data.map(toTestimonial);
  }
  return staticTestimonials;
}

/**
 * Get FAQs: from Supabase if configured, else static.
 */
export async function getFaqs() {
  noStore();
  const supabase = createReadClient();
  if (supabase) {
    const { data, error } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
    if (!error && data?.length) return data.map(toFaq);
  }
  return staticFaqs;
}

/**
 * Get site config: from Supabase if configured, else static.
 */
export async function getSiteConfig() {
  noStore();
  const supabase = createReadClient();
  if (supabase) {
    const { data, error } = await supabase.from('site_config').select('data').eq('id', 1).single();
    if (!error && data?.data && Object.keys(data.data).length > 0) {
      return { ...staticSiteConfig, ...data.data };
    }
  }
  return staticSiteConfig;
}

/**
 * Get gallery items: from Supabase if configured, else static.
 * Returns array of { id?, title, image_url, alt, sort_order }.
 */
export async function getGallery() {
  noStore();
  const supabase = createReadClient();
  if (supabase) {
    const { data, error } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true });
    if (!error && data?.length) return data.map(toGalleryItem);
  }
  return staticGallery.map((g, i) => ({ ...g, sort_order: i }));
}

export { hasSupabase };
