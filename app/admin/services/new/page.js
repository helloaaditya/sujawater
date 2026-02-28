import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import ServiceForm from '@/components/admin/ServiceForm';

const ICONS = ['terrace', 'bathroom', 'basement', 'pool', 'epoxy', 'lift', 'metro', 'wall', 'tank', 'membrane', 'sheet', 'pu', 'garden', 'wallMembrane', 'oldBuilding', 'newBuilding', 'balcony', 'epoxywaterproofing', 'puflooring', 'epoxyflooring', 'selfleveling', 'terracottacoating', 'cementissue', 'undergroundwaterproofing'];

export default async function NewServicePage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Service</h1>
      <ServiceForm icons={ICONS} />
    </div>
  );
}
