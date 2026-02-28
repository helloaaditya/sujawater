import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import FaqForm from '@/components/admin/FaqForm';

export default async function NewFaqPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add FAQ</h1>
      <FaqForm />
    </div>
  );
}
