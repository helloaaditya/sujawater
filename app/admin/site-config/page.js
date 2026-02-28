import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import SiteConfigForm from '@/components/admin/SiteConfigForm';

export default async function SiteConfigPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Config</h1>
      <p className="text-gray-600 mb-6">Edit company name, contact details, address, and social links. Changes here appear on the website when the database is configured.</p>
      <SiteConfigForm />
    </div>
  );
}
