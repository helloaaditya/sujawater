import Link from 'next/link';
import Image from 'next/image';
import { whyChooseUs, stats, partnerLogos, clientLogos, siteConfig as staticConfig } from '@/lib/data';
import { getSiteConfig, getServices, getTestimonials } from '@/lib/data-source';
import { images } from '@/lib/images';
import Hero from '@/components/Hero';
import CtaStrip from '@/components/CtaStrip';
import LogoMarquee from '@/components/LogoMarquee';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import AnimatedSection, { AnimatedStagger, AnimatedItem } from '@/components/AnimatedSection';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Terrace, Bathroom & Basement Waterproofing',
  description: 'Best waterproofing company in Bangalore. Terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting. Free site inspection. Call 9945843699.',
  keywords: 'waterproofing Bangalore, terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, Suja Waterproofing',
};

export default async function HomePage() {
  const [siteConfig, services, testimonials] = await Promise.all([
    getSiteConfig(),
    getServices(),
    getTestimonials(),
  ]);
  return (
    <>
      <Hero siteConfig={siteConfig} />
      <CtaStrip siteConfig={siteConfig} />

      <AnimatedSection className="section-padding bg-white px-4 sm:px-6" as="section" aria-labelledby="welcome-heading">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="welcome-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Welcome to {siteConfig.fullName || siteConfig.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-5 leading-relaxed">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-primary-600 first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                  We are a provider of commercial waterproofing and exterior building restoration. Our services are used by many clients across Bangalore and nearby areas.
                </p>
                <p>
                  We have steadily built upon its ideals and is one of the leaders in the waterproofing and construction industry. With well-equipped operations and expert manpower, we efficiently serve our customers.
                </p>
                <p>
                  We offer the right choice for your waterproofing needs with strong customer support. Ask any of our clients—we deliver quality work.
                </p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 p-3 shadow-soft-lg ring-4 ring-primary-500/20 border-4 border-primary-400 transition-all duration-300 hover:ring-primary-500/50 hover:shadow-xl hover:border-primary-500">
              <div className="relative w-full h-full rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={images.about}
                  alt={images.aboutAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <section className="section-padding bg-gray-50 px-4 sm:px-6" aria-labelledby="why-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-10 sm:mb-14">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500 max-w-3xl">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="why-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Why Choose Us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Site inspection, repair & waterproofing, and technical support—all under one roof.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedStagger className="grid gap-8 md:grid-cols-3" stagger={0.1}>
            {whyChooseUs.map((item, i) => (
              <AnimatedItem key={i}>
                <article className="group/card bg-white p-6 sm:p-8 rounded-xl border-l-4 border-primary-500 border border-gray-100 shadow-soft ring-2 ring-primary-500/10 transition-all duration-300 h-full hover:shadow-soft-lg hover:-translate-y-1 hover:ring-primary-500/25">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-5 transition-transform duration-300 group-hover/card:scale-110">
                    <span className="text-2xl" aria-hidden="true">{i === 0 ? '🔍' : i === 1 ? '🛠️' : '💬'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover/card:text-primary-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </article>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
          <AnimatedStagger className="mt-14 flex flex-wrap justify-center gap-8 md:gap-12" stagger={0.05}>
            {stats.map(({ value, label }, i) => (
              <AnimatedItem key={i}>
                <div className="text-center px-8 py-6 rounded-2xl border-2 border-primary-500/30 bg-white shadow-soft ring-2 ring-primary-500/10 transition-all duration-300 hover:scale-105 hover:shadow-soft-lg hover:ring-primary-500/25 hover:border-primary-500/50 min-w-[140px]">
                  <span className="block text-4xl md:text-5xl font-bold text-primary-600 mb-1">{value}</span>
                  <span className="text-gray-600 font-medium text-sm sm:text-base">{label}</span>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>

          {/* Trust strip: 15 Years | WAK | Warranty */}
          <AnimatedSection className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-primary-600 text-white">
              <span className="text-4xl md:text-5xl font-bold mb-2">{siteConfig.yearsOfExcellence ?? staticConfig.yearsOfExcellence ?? 15}</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-100">Years of Excellence</span>
              <span className="text-xs text-primary-200 mt-1">Industry Experience</span>
            </div>
            {siteConfig.wak?.logoUrl && (
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-2 border-primary-500/30 shadow-soft">
                <Image
                  src={siteConfig.wak.logoUrl}
                  alt={siteConfig.wak.name}
                  width={120}
                  height={80}
                  className="object-contain h-16 w-auto"
                />
                <span className="text-xs font-semibold text-gray-700 mt-3 text-center">Member of WAK</span>
                <span className="text-xs text-gray-500 text-center">Waterproofing Association of Karnataka</span>
                <Link href="/about#certification-heading" className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 underline">
                  View certificate →
                </Link>
              </div>
            )}
            <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-primary-600 text-white">
              <span className="text-2xl mb-2" aria-hidden="true">🛡️</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-100">Warranty-Backed</span>
              <span className="text-xs text-primary-200 mt-1">Guaranteed Works</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Warranty & Guarantee – visual emphasis */}
      <AnimatedSection className="section-padding bg-primary-700 text-white px-4 sm:px-6" as="section" aria-labelledby="warranty-heading">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <h2 id="warranty-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {(siteConfig.warranty?.headline || staticConfig.warranty?.headline) || 'Warranty-Backed & Guaranteed Works'}
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 leading-relaxed">
            {(siteConfig.warranty?.description || staticConfig.warranty?.description) || 'Every project we complete is backed by our commitment to quality. We stand behind our work with warranty-backed and guaranteed solutions, reinforcing reliability and long-term service assurance for all our clients in Bangalore and beyond.'}
          </p>
        </div>
      </AnimatedSection>

      <section className="section-padding bg-white px-4 sm:px-6" aria-labelledby="services-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-10 sm:mb-14">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500 max-w-3xl">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Services We Provide
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Terrace, bathroom, basement, epoxy grouting, and more—all in Bangalore.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 9).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link href="/services" className="btn-primary inline-block transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-transparent py-8" aria-labelledby="partners-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-8">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500 max-w-3xl">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="partners-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Our Partners
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trusted collaborations for quality materials and expert solutions.
              </p>
            </div>
          </AnimatedSection>
          <LogoMarquee folder="partners" filenames={partnerLogos} altPrefix="Partner" height={80} speed={35} />
        </div>
      </section>

      <section className="section-padding bg-transparent py-8" aria-labelledby="clients-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-8">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500 max-w-3xl">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="clients-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Our Clients
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Serving a wide range of sectors across Bangalore and beyond.
              </p>
            </div>
          </AnimatedSection>
          <LogoMarquee folder="clients" filenames={clientLogos} altPrefix="Client" height={80} speed={35} />
        </div>
      </section>

      {/* Certification: display WAK certificate after clients */}
      <section className="section-padding bg-white px-4 sm:px-6" aria-labelledby="certs-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-6 text-center">
            <h2 id="certs-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Certifications & Memberships
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional memberships and certifications that demonstrate our commitment to quality.
            </p>
          </AnimatedSection>

          <div className="flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg border border-gray-100 bg-gray-50 max-w-xl w-full aspect-[3/4]">
              <Image
                src="/assets/wak-certificate.png"
                alt="Certificate of Membership – Waterproofers Association of Karnataka (WAK) – Premium Member"
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, 40rem"
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-primary-700">Premium Member · Membership No. PM030 · Valid till June 2033</p>
            <Link href="/about#certification-heading" className="text-sm text-primary-600 hover:underline mt-2 inline-block">View certificate details →</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 px-4 sm:px-6" aria-labelledby="testimonials-heading">
        <div className="container-wide">
          <AnimatedSection className="mb-10 sm:mb-14">
            <div className="relative pl-6 md:pl-8 border-l-4 border-primary-500 max-w-3xl">
              <span className="absolute left-0 top-0 w-1 h-12 bg-primary-400 rounded-full -translate-x-1/2" aria-hidden="true" />
              <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trusted by thousands of customers across Bangalore.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link href="/testimonials" className="btn-primary inline-block transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              View All Testimonials
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
