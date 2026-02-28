import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';
import FaqForm from '@/components/admin/FaqForm';

export default async function EditFaqPage({ params }) {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  const supabase = createServerClient();
  let faq = null;
  if (supabase) {
    const { data } = await supabase.from('faqs').select('*').eq('id', params.id).single();
    faq = data;
  }
  if (!faq) return <p className="text-red-600">FAQ not found.</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
