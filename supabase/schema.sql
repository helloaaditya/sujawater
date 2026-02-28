-- Run this in Supabase Dashboard → SQL Editor
-- Creates tables for admin-managed content

-- Services (slug is unique). image_url overrides icon-based image when set.
-- benefits = jsonb array of strings; process = jsonb array of { step, title, desc }.
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_desc text,
  long_desc text,
  icon text default 'terrace',
  image_url text,
  benefits jsonb default '[]',
  process jsonb default '[]',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating int default 5 check (rating >= 1 and rating <= 5),
  text text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- FAQs
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  q text not null,
  a text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Site config: single row storing full config as JSONB
create table if not exists public.site_config (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Gallery images (title, image_url, alt, sort_order)
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  alt text default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads (contact form submissions)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Insert default row for site_config (admin will edit)
insert into public.site_config (id, data) values (1, '{}')
on conflict (id) do nothing;

-- Allow anon read for public site (optional: enable RLS and add policies)
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_config enable row level security;
alter table public.gallery enable row level security;
alter table public.leads enable row level security;

create policy "Public read services" on public.services for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);
create policy "Public read faqs" on public.faqs for select using (true);
create policy "Public read site_config" on public.site_config for select using (true);
create policy "Public read gallery" on public.gallery for select using (true);
-- Leads: RLS on, no anon policy – only service role (API/admin) can read/write

-- Service role (backend) can do everything; anon cannot insert/update/delete
-- So no insert/update/delete policies for anon – only API routes with service role will write.

-- If you already had the services table, run these once to add new columns:
-- alter table public.services add column if not exists image_url text;
-- alter table public.services add column if not exists benefits jsonb default '[]';
-- alter table public.services add column if not exists process jsonb default '[]';

-- If you need the leads table (contact form submissions), run:
-- create table if not exists public.leads (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   mobile text not null,
--   message text not null,
--   created_at timestamptz default now()
-- );
-- alter table public.leads enable row level security;
