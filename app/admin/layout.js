import dynamic from 'next/dynamic';
import { isAdminLoggedIn } from '@/lib/admin-auth';

const AdminNav = dynamic(() => import('@/components/admin/AdminNav'), { ssr: false });

export default async function AdminLayout({ children }) {
  const loggedIn = await isAdminLoggedIn();
  return (
    <div className="min-h-screen bg-gray-100">
      {loggedIn ? (
        <div className="flex min-h-screen">
          <AdminNav />
          <main className="flex-1 w-0 min-w-0 p-4 sm:p-6 pt-16 sm:pt-6 overflow-auto">{children}</main>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
