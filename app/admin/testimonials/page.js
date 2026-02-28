import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import TestimonialsList from '@/components/admin/TestimonialsList';

export default async function AdminTestimonialsPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
          Add Testimonial
        </Link>
      </div>
      <TestimonialsList />
    </div>
  );
}
