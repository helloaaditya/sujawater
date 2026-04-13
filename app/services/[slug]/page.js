import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { serviceProcess, serviceBenefits } from '@/lib/data';
import { getServices, getSiteConfig } from '@/lib/data-source';
import { images } from '@/lib/images';
import Breadcrumb from '@/components/Breadcrumb';
import CtaStrip from '@/components/CtaStrip';

const serviceImages = {
  terrace: images.serviceTerrace,
  bathroom: images.serviceBathroom,
  basement: images.serviceBasement,
  pool: images.servicePool,
  epoxy: images.serviceEpoxy,
  lift: images.serviceLift,
  metro: images.serviceMetro,
  wall: images.serviceWall,
  tank: images.serviceTank,
  membrane: images.serviceMembrane,
  sheet: images.serviceSheet,
  pu: images.servicePu,
  garden: images.serviceGarden,
  wallMembrane: images.serviceWallMembrane,
  oldBuilding: images.serviceOldBuilding,
  newBuilding: images.serviceNewBuilding,
  balcony: images.serviceBalcony,
  epoxywaterproofing: images.serviceEpoxywaterproofing,
  puflooring: images.servicePuflooring,
  epoxyflooring: images.serviceEpoxyflooring,
  selfleveling: images.serviceSelfleveling,
  terracottacoating: images.serviceTerracottacoating,
  cementissue: images.serviceCementissue,
  undergroundwaterproofing: images.serviceUndergroundwaterproofing,
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const [services, siteConfig] = await Promise.all([getServices(), getSiteConfig()]);
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service' };
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDesc,
    keywords: `${service.title}, waterproofing Bangalore, ${service.slug}`,
  };
}

export default async function ServicePage({ params }) {
  const [services, siteConfig] = await Promise.all([getServices(), getSiteConfig()]);
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const serviceImg = service.image_url || serviceImages[service.icon] || images.serviceTerrace;
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <article className="section-padding bg-white" aria-labelledby="service-heading">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start mb-12 sm:mb-16">
            <div>
              <h1 id="service-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                {service.shortDesc}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href={`tel:${siteConfig.phoneFull}`} className="btn-primary text-sm sm:text-base" aria-label="Call us">
                  Call {siteConfig.phone}
                </a>
                <Link href="/contact" className="btn-accent text-sm sm:text-base">
                  Get Free Quote
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-[4/3] lg:aspect-[16/10] bg-gray-100 ring-2 ring-primary-500/20 border border-gray-200">
              <Image
                src={serviceImg}
                alt={`${service.title} - ${siteConfig.fullName || siteConfig.name} Bangalore`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-4xl">
            <section className="mb-10 sm:mb-14" aria-labelledby="about-service">
              <h2 id="about-service" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-primary-500 pl-4">
                About {service.title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                {service.longDesc ? (
                  typeof service.longDesc === 'string' && service.longDesc.includes('\n\n')
                    ? service.longDesc.split(/\n\n+/).map((para, i) => <p key={i}>{para.trim()}</p>)
                    : <p>{service.longDesc}</p>
                ) : (
                  <p>
                    We provide professional {service.title.toLowerCase()} in Bangalore and surrounding areas. Our trained team uses quality materials and proven methods to deliver lasting results. Contact us for a free site inspection and quote.
                  </p>
                )}
                <p>
                  Call <a href={`tel:${siteConfig.phoneFull}`} className="text-primary-600 hover:underline font-medium">{siteConfig.phoneFull}</a> or{' '}
                  <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">WhatsApp</a> for a free site visit and quote. We serve Bangalore, Laggere, and nearby areas.
                </p>
              </div>
            </section>

            {/* Optional separate sections with their own headings (from service.sections) */}
            {service.sections?.length > 0 && service.sections.map((sec, idx) => (
              <section key={idx} className="mb-10 sm:mb-14" aria-labelledby={`section-${idx}`}>
                <h2 id={`section-${idx}`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-primary-500 pl-4">
                  {sec.heading}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                  {typeof sec.content === 'string' && sec.content.includes('\n\n')
                    ? sec.content.split(/\n\n+/).map((block, i) => {
                        const trimmed = block.trim();
                        const lines = trimmed.split(/\n/).map((l) => l.trim()).filter(Boolean);
                        if (lines.length > 1) return <ul key={i} className="list-disc pl-6 space-y-1 my-3">{lines.map((line, j) => <li key={j}>{line}</li>)}</ul>;
                        return <p key={i}>{trimmed}</p>;
                      })
                    : <p>{sec.content}</p>}
                </div>
              </section>
            ))}

            {/* Key benefits */}
            {(service.benefits?.length > 0 || serviceBenefits.length > 0) && (
              <section className="mb-10 sm:mb-14" aria-labelledby="benefits-heading">
                <h2 id="benefits-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-primary-500 pl-4">
                  Why Choose Suja for {service.title}
                </h2>
                <ul className="space-y-3 text-gray-700">
                  {(service.benefits?.length ? service.benefits : serviceBenefits).filter(Boolean).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-600" aria-hidden="true" />
                      <span className="text-base sm:text-lg leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Our process */}
            {(service.process?.length > 0 || serviceProcess.length > 0) && (
              <section className="mb-10 sm:mb-14" aria-labelledby="process-heading">
                <h2 id="process-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
                  Our Process
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {(service.process?.length ? service.process : serviceProcess).filter((p) => p && (p.title || p.desc)).map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white" aria-hidden="true">
                        {item.step || idx + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Service-specific FAQs */}
            {service.faqs?.length > 0 && (
              <section className="mb-10 sm:mb-14" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
                  Frequently Asked Questions
                </h2>
                <ul className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <li key={i} className="border-b border-gray-100 pb-4 last:border-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related services */}
            {relatedServices.length > 0 && (
              <section className="mb-10 sm:mb-14" aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
                  Other Services You May Need
                </h2>
                <ul className="space-y-3">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline font-medium text-base sm:text-lg"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="inline-block mt-4 text-primary-600 hover:underline font-medium">
                  View all services →
                </Link>
              </section>
            )}

            {/* CTA */}
            <section className="rounded-2xl bg-primary-600 text-white p-6 sm:p-8" aria-labelledby="cta-heading">
              <h2 id="cta-heading" className="text-xl sm:text-2xl font-bold mb-3">
                Get a Free Site Inspection
              </h2>
              <p className="text-primary-100 mb-6 text-sm sm:text-base">
                Tell us your requirement. We will visit your site, assess the problem, and give you a detailed quote for {service.title.toLowerCase()}.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href={`tel:${siteConfig.phoneFull}`} className="btn-accent text-sm sm:text-base" aria-label="Call us">
                  Call {siteConfig.phone}
                </a>
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors text-sm sm:text-base">
                  WhatsApp
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-800 transition-colors text-sm sm:text-base">
                  Send Enquiry
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
      <CtaStrip siteConfig={siteConfig} />
    </>
  );
}
