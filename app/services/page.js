import Link from 'next/link';
import { serviceProcess } from '@/lib/data';
import { getServices, getSiteConfig } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';
import ServicesListWithSearch from '@/components/ServicesListWithSearch';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Waterproofing Services in Bangalore',
  description:
    'Professional waterproofing services in Bangalore: terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, swimming pool, lift pit. Free site inspection.',
  keywords: 'waterproofing services Bangalore, terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting Bangalore, swimming pool waterproofing',
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  const [services, siteConfig] = await Promise.all([getServices(), getSiteConfig()]);
  return (
    <>
      <Breadcrumb items={[{ label: 'Services', href: '/services' }]} />

      {/* Hero / Intro */}
      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="container-wide px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h1 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-800 mb-4 sm:mb-6 leading-tight">
              Our Waterproofing Services in Bangalore
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              {(siteConfig.fullName || siteConfig.name) + ' offers end-to-end waterproofing for residential, commercial, and industrial buildings across Bangalore and nearby areas. From terrace and roof waterproofing to bathroom tile joints, basement waterproofing, epoxy grouting, swimming pool and water tank waterproofing, lift pit waterproofing, wall crack repair, APP membrane, sheet membrane, and PU coating—we do it all with quality materials and trained applicators.'}
            </p>
          </div>

          {/* Services grid with search */}
          <ServicesListWithSearch services={services} />
        </div>
      </section>

      {/* How we work */}
      <section className="section-padding bg-gray-50" aria-labelledby="process-heading">
        <div className="container-wide px-4 sm:px-6">
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            How We Work
          </h2>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {serviceProcess.map((item) => (
              <div key={item.step} className="relative pl-10 sm:pl-12">
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white" aria-hidden="true">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white" aria-labelledby="cta-heading">
        <div className="container-wide px-4 sm:px-6 text-center">
          <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-4">
            Need a Site Visit?
          </h2>
          <p className="text-primary-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Tell us your requirement—terrace, bathroom, basement, pool, or any other waterproofing. We will visit your site, assess the problem, and give you a detailed quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phoneFull}`} className="btn-accent" aria-label="Call us">
              Call {siteConfig.phone}
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors" aria-label="WhatsApp">
              WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-800 transition-colors">
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
