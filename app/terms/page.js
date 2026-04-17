import { getSiteConfig } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'Terms and Conditions',
    description: `Terms and conditions for using ${siteConfig.fullName || siteConfig.name} website and services. Waterproofing services in Bangalore - terrace, bathroom, basement.`,
    alternates: {
      canonical: '/terms',
    },
  };
}

export default async function TermsPage() {
  const siteConfig = await getSiteConfig();
  const address = siteConfig.address || {};
  return (
    <>
      <Breadcrumb items={[{ label: 'Terms and Conditions', href: '/terms' }]} />
      <article className="section-padding bg-white" aria-labelledby="terms-heading">
        <div className="container-tight max-w-3xl">
          <h1 id="terms-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            By using this website and engaging {siteConfig.fullName || siteConfig.name} for waterproofing services in Bangalore, you agree to the following terms.
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Services</h2>
              <p>
                {siteConfig.fullName || siteConfig.name} provides terrace waterproofing, bathroom tile joints, basement waterproofing, swimming pool waterproofing, epoxy grouting, lift pit waterproofing, and related services in Bangalore and nearby areas. Scope of work, materials, and pricing will be specified in our quote and agreement. We offer free site inspection before providing a formal quote.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Quotes and Payment</h2>
              <p>
                Quotes are valid for the period stated and are subject to site conditions. Payment terms will be agreed upon before work begins. We accept payment as per the agreed schedule. Any additional work beyond the quoted scope will be communicated and agreed in advance.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Warranty</h2>
              <p>
                We use quality materials and trained applicators. Warranty for our waterproofing work will be as per the terms in your work order. Defects due to workmanship or materials will be addressed as per our warranty policy. Normal wear, structural movement, or third-party damage are excluded.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
              <p>
                For questions about these terms, contact us at {siteConfig.email}, {siteConfig.phoneFull}, or {address.line1}, {address.city}, {address.pincode}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
