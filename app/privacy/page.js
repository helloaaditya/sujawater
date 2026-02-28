import { getSiteConfig } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'Privacy Policy',
    description: `Privacy policy of ${siteConfig.fullName || siteConfig.name}, Bangalore. How we collect, use and protect your data when you contact us for waterproofing services.`,
  };
}

export default async function PrivacyPage() {
  const siteConfig = await getSiteConfig();
  const address = siteConfig.address || {};
  return (
    <>
      <Breadcrumb items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
      <article className="section-padding bg-white" aria-labelledby="privacy-heading">
        <div className="container-tight max-w-3xl">
          <h1 id="privacy-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN')}. {siteConfig.fullName || siteConfig.name} ({address.city}, {address.state}) is committed to protecting your privacy.
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Information We Collect</h2>
              <p>
                When you contact us for waterproofing services in Bangalore (via phone, WhatsApp, email, or the contact form), we may collect your name, phone number, email address, address, and details of your enquiry. This information is used only to respond to your request, provide site inspection and quotes, and deliver our terrace, bathroom, basement, and other waterproofing services.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">How We Use Your Information</h2>
              <p>
                We use the information you provide to schedule site visits, send quotes, and communicate about your waterproofing project. We do not sell or share your personal data with third parties for marketing. We may retain your contact details for follow-up and service records as required for our business in Bangalore.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Data Security</h2>
              <p>
                We take reasonable steps to protect your personal information. Our team has access only to the data needed to serve your waterproofing requirements. If you wish to correct or delete your data, contact us at {siteConfig.email} or call {siteConfig.phone}.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Contact Us</h2>
              <p>
                For any privacy-related questions, contact {siteConfig.fullName || siteConfig.name} at {siteConfig.email}, {siteConfig.phoneFull}, or visit our office at {address.line1}, {address.city}, {address.pincode}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
