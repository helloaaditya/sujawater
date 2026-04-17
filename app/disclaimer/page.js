import { getSiteConfig } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'Disclaimer',
    description: `Disclaimer for ${siteConfig.fullName || siteConfig.name} website. Information about waterproofing services in Bangalore is for general use only.`,
    alternates: {
      canonical: '/disclaimer',
    },
  };
}

export default async function DisclaimerPage() {
  const siteConfig = await getSiteConfig();
  const address = siteConfig.address || {};
  return (
    <>
      <Breadcrumb items={[{ label: 'Disclaimer', href: '/disclaimer' }]} />
      <article className="section-padding bg-white" aria-labelledby="disclaimer-heading">
        <div className="container-tight max-w-3xl">
          <h1 id="disclaimer-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Disclaimer
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            The information on this website is for general purposes only. {(siteConfig.fullName || siteConfig.name)}, Bangalore, does not guarantee that all content is error-free or suitable for every situation.
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">General Information</h2>
              <p>
                The content on this site (including text, images, and descriptions of terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, and other services) is intended to give visitors an overview of our offerings in Bangalore. It is not a substitute for a site inspection or a formal quote. Actual solutions and pricing depend on your specific site and requirements.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">No Professional Advice</h2>
              <p>
                This website does not provide professional engineering or architectural advice. For structural or design-related decisions, please consult qualified professionals. We recommend a free site inspection by our team before deciding on any waterproofing work.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Accuracy</h2>
              <p>
                We strive to keep information accurate and up to date. However, we do not warrant that the website is complete, current, or free of errors. Contact us at {siteConfig.phone} or {siteConfig.email} for the latest information on our services, availability, and pricing in Bangalore.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Contact</h2>
              <p>
                {siteConfig.fullName || siteConfig.name}, {address.line1}, {address.city}, {address.state} {address.pincode}. Phone: {siteConfig.phoneFull}. Email: {siteConfig.email}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
