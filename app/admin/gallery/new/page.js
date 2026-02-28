import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import GalleryForm from '@/components/admin/GalleryForm';

export default async function NewGalleryPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add gallery image</h1>
      <GalleryForm />
    </div>
  );
}
