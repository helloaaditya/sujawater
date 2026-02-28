import { redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';
import ServiceForm from '@/components/admin/ServiceForm';

const ICONS = ['terrace', 'bathroom', 'basement', 'pool', 'epoxy', 'lift', 'metro', 'wall', 'tank', 'membrane', 'sheet', 'pu', 'garden', 'wallMembrane', 'oldBuilding', 'newBuilding', 'balcony', 'epoxywaterproofing', 'puflooring', 'epoxyflooring', 'selfleveling', 'terracottacoating', 'cementissue', 'undergroundwaterproofing'];

export default async function EditServicePage({ params }) {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect('/admin');
  const supabase = createServerClient();
  let service = null;
  if (supabase) {
    const { data } = await supabase.from('services').select('*').eq('id', params.id).single();
    service = data;
  }
  if (!service) return <p className="text-red-600">Service not found. Is the database configured?</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Service</h1>
      <ServiceForm icons={ICONS} service={service} />
    </div>
  );
}
