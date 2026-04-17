import { getFaqs } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';
import FaqAccordion from '@/components/FaqAccordion';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting and our services in Bangalore. Free site inspection.',
  keywords: 'waterproofing FAQ Bangalore, terrace waterproofing cost, basement waterproofing questions, epoxy grouting Bangalore',
  alternates: {
    canonical: '/faq',
  },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />
      <section className="section-padding bg-white" aria-labelledby="faq-heading">
        <div className="container-tight max-w-3xl px-4 sm:px-6">
          <h1 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
            Common questions about our waterproofing services in Bangalore—terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, swimming pool waterproofing, and more. We offer free site inspection and transparent pricing across Bengaluru and nearby areas.
          </p>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
