import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import GalleryList from '@/components/admin/GalleryList';

export default async function AdminGalleryPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <Link href="/admin/gallery/new" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
          Add image
        </Link>
      </div>
      <p className="text-gray-600 mb-4">Edit, add, or delete images shown on the Gallery page.</p>
      <GalleryList />
    </div>
  );
}
