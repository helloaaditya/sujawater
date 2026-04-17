import Image from 'next/image';
import Link from 'next/link';
import { whyChooseUs, stats, siteConfig as staticConfig } from '@/lib/data';
import { getSiteConfig } from '@/lib/data-source';
import { images } from '@/lib/images';
import CtaStrip from '@/components/CtaStrip';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedSection, { AnimatedStagger, AnimatedItem } from '@/components/AnimatedSection';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'About Us',
    description: `${siteConfig.fullName || siteConfig.name} is a leading provider of terrace, bathroom, basement and commercial waterproofing in Bangalore. 15+ years experience, free site inspection. Call 9945843699.`,
    keywords: 'about Suja Waterproofing, waterproofing company Bangalore, terrace waterproofing Bangalore, basement waterproofing',
    alternates: {
      canonical: '/about',
    },
  };
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  return (
    <>
      <Breadcrumb items={[{ label: 'About Us', href: '/about' }]} />
      <AnimatedSection className="section-padding bg-white" as="section" aria-labelledby="about-heading">
        <div className="container-wide px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                About {siteConfig.fullName || siteConfig.name}
              </h1>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4 text-base sm:text-lg">
                <div className="not-prose p-5 rounded-xl bg-primary-50 border-2 border-primary-200 mb-6">
                  <p className="text-primary-800 font-semibold text-lg m-0">
                    {siteConfig.yearsOfExcellence ?? 15} Years of Excellence & Industry Experience — trusted across Bangalore and Karnataka.
                  </p>
                </div>
                <p>
                  {siteConfig.fullName || siteConfig.name} is a trusted provider of commercial and residential waterproofing and exterior building restoration in Bangalore. We serve thousands of clients across Bengaluru, Laggere, and nearby areas for terrace waterproofing, bathroom tile joints, basement waterproofing, swimming pool waterproofing, epoxy grouting, and more.
                </p>
                <p>
                  With over 15 years of experience, we have built a reputation as one of the leading waterproofing companies in Bangalore. Our well-equipped operations and expert manpower enable us to deliver quality work for both new construction and old building repair. We use quality materials and proven methods to ensure lasting results.
                </p>
                <p>
                  All our completed works are <strong>warranty-backed and guaranteed</strong>, reinforcing reliability and long-term service assurance. We offer free site inspection and transparent quotes. Whether you need terrace waterproofing, basement waterproofing, or epoxy grouting in Bangalore, our team is ready to help. Contact us for a free site visit and quote.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={`tel:${siteConfig.phoneFull}`} className="btn-primary" aria-label="Call us">Call {siteConfig.phone}</a>
                <Link href="/contact" className="btn-accent">Get Free Quote</Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg aspect-[4/3] bg-gray-100 order-1 lg:order-2">
              <Image
                src={images.aboutPage}
                alt={images.aboutPageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* WAK Certificate of Membership – professional affiliation */}
      <AnimatedSection className="section-padding bg-white border-t border-gray-100" as="section" aria-labelledby="certification-heading">
        <div className="container-wide px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 id="certification-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Professional Affiliation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a Premium Member of the Waterproofers Association of Karnataka (WAK), reflecting our commitment to industry standards and trusted service.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg border-2 border-primary-100 bg-gray-50 max-w-xl w-full aspect-[3/4] sm:aspect-[4/5]">
              <Image
                src="/assets/wak-certificate.png"
                alt="Certificate of Membership – Waterproofers Association of Karnataka (R). Mr. Ashok, Suja Waterproofing, Premium Member. Valid till June 2033."
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 42rem"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-primary-700">
              Premium Member · Membership No. PM030 · Valid till June 2033
            </p>
            <a
              href="https://wok.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              Waterproofers Association of Karnataka — wok.org.in
            </a>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip siteConfig={siteConfig} />

      <section className="section-padding bg-gray-50" aria-labelledby="why-heading">
        <div className="container-wide px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 id="why-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us for Waterproofing in Bangalore
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Site inspection, repair & waterproofing, and technical support—all under one roof.
            </p>
          </AnimatedSection>
          <AnimatedStagger className="grid gap-6 sm:gap-8 md:grid-cols-3" stagger={0.1}>
            {whyChooseUs.map((item, i) => (
              <AnimatedItem key={i}>
                <article className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-5">
                    <span className="text-2xl" aria-hidden="true">{i === 0 ? '🔍' : i === 1 ? '🛠️' : '💬'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </article>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
          <AnimatedSection className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 text-center">
            {stats.map(({ value, label }, i) => (
              <div key={i} className="min-w-[120px]">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-1">{value}</span>
                <span className="text-gray-600 font-medium text-sm sm:text-base">{label}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-primary-600 text-white" as="section" aria-labelledby="contact-heading">
        <div className="container-wide px-4 sm:px-6 text-center">
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state} ({siteConfig.address.pincode})
          </p>
          <a href={`tel:${siteConfig.phoneFull}`} className="btn-accent" aria-label="Call us">
            Call {siteConfig.phone}
          </a>
        </div>
      </AnimatedSection>
    </>
  );
}
