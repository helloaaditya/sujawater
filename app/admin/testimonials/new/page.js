import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default async function NewTestimonialPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
