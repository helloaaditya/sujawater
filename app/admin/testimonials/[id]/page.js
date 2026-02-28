import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default async function EditTestimonialPage({ params }) {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  const supabase = createServerClient();
  let testimonial = null;
  if (supabase) {
    const { data } = await supabase.from('testimonials').select('*').eq('id', params.id).single();
    testimonial = data;
  }
  if (!testimonial) return <p className="text-red-600">Testimonial not found.</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
