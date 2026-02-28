import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default async function AdminPage() {
  const loggedIn = await isAdminLoggedIn();
  if (loggedIn) redirect('/admin/dashboard');
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Admin Login</h1>
        <p className="text-gray-600 text-sm mb-6">Enter your admin password to manage the website.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
