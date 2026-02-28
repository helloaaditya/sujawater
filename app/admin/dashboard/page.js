import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { getServices, getTestimonials, getFaqs, getGallery, hasSupabase } from '@/lib/data-source';
import { createServerClient } from '@/lib/supabase';

export default async function AdminDashboardPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  const [services, testimonials, faqs, gallery, leadsCount] = await Promise.all([
    getServices(),
    getTestimonials(),
    getFaqs(),
    getGallery(),
    (async () => {
      const supabase = createServerClient();
      if (!supabase) return 0;
      const { count } = await supabase.from('leads').select('id', { count: 'exact', head: true });
      return count ?? 0;
    })(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {!hasSupabase && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
          <strong>Database not configured.</strong> Add <code className="bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
          <code className="bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{' '}
          <code className="bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to .env and run the SQL in <code className="bg-amber-100 px-1">supabase/schema.sql</code> in your Supabase project. Then use &quot;Seed from site&quot; in Site Config to copy current content.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/leads"
          className="block p-4 sm:p-6 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Leads</h2>
          <p className="text-2xl sm:text-3xl font-bold text-primary-600 mt-1">{leadsCount}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Contact form submissions</p>
        </Link>
        <Link
          href="/admin/services"
          className="block p-6 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">Services</h2>
          <p className="text-3xl font-bold text-primary-600 mt-1">{services.length}</p>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete services</p>
        </Link>
        <Link
          href="/admin/gallery"
          className="block p-6 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">Gallery</h2>
          <p className="text-3xl font-bold text-primary-600 mt-1">{gallery.length}</p>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete gallery images</p>
        </Link>
        <Link
          href="/admin/testimonials"
          className="block p-6 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
          <p className="text-3xl font-bold text-primary-600 mt-1">{testimonials.length}</p>
          <p className="text-sm text-gray-500 mt-1">Manage customer reviews</p>
        </Link>
        <Link
          href="/admin/faqs"
          className="block p-6 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
          <p className="text-3xl font-bold text-primary-600 mt-1">{faqs.length}</p>
          <p className="text-sm text-gray-500 mt-1">Edit FAQ questions and answers</p>
        </Link>
      </div>
      <div className="mt-6">
        <Link
          href="/admin/site-config"
          className="inline-block p-4 bg-white rounded-xl shadow border border-gray-200 hover:border-primary-500"
        >
          <h2 className="text-lg font-semibold text-gray-900">Site Config</h2>
          <p className="text-sm text-gray-500 mt-1">Company name, contact, address, social links</p>
        </Link>
      </div>
    </div>
  );
}
