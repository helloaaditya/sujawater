import { getTestimonials, getSiteConfig } from '@/lib/data-source';
import TestimonialCard from '@/components/TestimonialCard';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Testimonials & Reviews',
  description: 'What our clients say about us. Real reviews from Bangalore customers for terrace waterproofing, bathroom waterproofing, basement waterproofing.',
  keywords: 'Suja Waterproofing reviews, waterproofing testimonials Bangalore, terrace waterproofing reviews',
};

export default async function TestimonialsPage() {
  const [testimonials, siteConfig] = await Promise.all([getTestimonials(), getSiteConfig()]);
  return (
    <>
      <Breadcrumb items={[{ label: 'Testimonials', href: '/testimonials' }]} />
      <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
        <div className="container-wide px-4 sm:px-6">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <h1 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Testimonials &amp; Reviews
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
              Feedback from our customers across Bangalore—residential and commercial clients who have used our terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, and other services. {(siteConfig.fullName || siteConfig.name) + ' is trusted by thousands'} of clients in Bengaluru and nearby areas. Read what they say about our work and customer service.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
