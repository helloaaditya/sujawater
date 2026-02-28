import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import LeadsList from '@/components/admin/LeadsList';

export default async function AdminLeadsPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Leads</h1>
      <p className="text-gray-600 text-sm mb-6">Contact form submissions. New leads appear here when someone submits the form on the website.</p>
      <LeadsList />
    </div>
  );
}
