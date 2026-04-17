import { getSiteConfig } from '@/lib/data-source';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'Contact Us',
    description: `Contact ${siteConfig.fullName || siteConfig.name} for free site inspection and waterproofing quote in Bangalore. Call ${siteConfig.phoneFull}. Terrace, bathroom, basement waterproofing.`,
    keywords: 'contact Suja Waterproofing, waterproofing Bangalore contact, free site inspection Bangalore, waterproofing quote',
    alternates: {
      canonical: '/contact',
    },
  };
}

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6263180168653!2d77.5197528750862!3d12.995736014348685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d3509828fd3%3A0x99df58f339d8a6e1!2sSuja%20waterproofing%20Solutions%20%26%20Epoxy%20Flooring%2C%20P%20U%20Coating%20services.!5e0!3m2!1sen!2sin!4v1769779099404!5m2!1sen!2sin';
const mapSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Suja+waterproofing+Solutions+Epoxy+Flooring+Laggere+Bangalore';

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const address = siteConfig.address || {};
  const fullAddress = [address.line1, address.city, address.state, address.pincode, address.country].filter(Boolean).join(', ');
  return (
    <>
      <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />
      <section className="section-padding bg-white" aria-labelledby="contact-heading">
        <div className="container-tight max-w-6xl px-4 sm:px-6">
          <h1 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl">
            Get in touch for a free site inspection and waterproofing quote in Bangalore. We serve Bengaluru, Laggere, and nearby areas for terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, swimming pool waterproofing, and more. Call or WhatsApp us for quick response.
          </p>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">Office Address</h2>
                <address className="not-italic text-gray-700 text-sm sm:text-base mb-6">
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.city}, {siteConfig.address.state}<br />
                  {siteConfig.address.country} – {siteConfig.address.pincode}
                </address>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">Contact</h2>
                <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <span className="font-medium text-gray-900">Phone:</span>{' '}
                    <a href={`tel:${siteConfig.phoneFull}`} className="text-primary-600 hover:underline">
                      {siteConfig.phoneFull}
                    </a>
                    {siteConfig.phoneAlt && (
                      <> / <a href={`tel:${siteConfig.phoneAlt}`} className="text-primary-600 hover:underline">{siteConfig.phoneAlt}</a></>
                    )}
                  </li>
                  <li>
                    <span className="font-medium text-gray-900">Email:</span>{' '}
                    <a href={`mailto:${siteConfig.email}`} className="text-primary-600 hover:underline">
                      {siteConfig.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">Business Hours</h2>
                <p className="text-gray-700 text-sm sm:text-base">{siteConfig.businessHours}</p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href={`tel:${siteConfig.phoneFull}`} className="btn-primary text-sm sm:text-base" aria-label="Call us">
                  Call Now
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent text-sm sm:text-base"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">Send Enquiry</h2>
              <ContactForm />
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-800 mb-3 sm:mb-4">Find Us on Map</h2>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full max-w-xl h-[200px] sm:h-[240px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.fullName || siteConfig.name} - Office Location`}
                className="w-full h-full absolute inset-0"
              />
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Open in Google Maps
              </a>
              {' · '}
              {fullAddress}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
