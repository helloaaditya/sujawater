import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';
import GalleryForm from '@/components/admin/GalleryForm';

export default async function EditGalleryPage({ params }) {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  const supabase = createServerClient();
  let item = null;
  if (supabase) {
    const { data } = await supabase.from('gallery').select('*').eq('id', params.id).single();
    item = data;
  }
  if (!item) return <p className="text-red-600">Image not found.</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit gallery image</h1>
      <GalleryForm item={item} />
    </div>
  );
}
