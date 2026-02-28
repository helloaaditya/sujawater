import { siteConfig as fallbackConfig } from '@/lib/data';

export default function LocalBusinessSchema({ siteConfig: siteConfigProp }) {
  const siteConfig = siteConfigProp || fallbackConfig;
  const address = siteConfig.address || fallbackConfig.address;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.fullName || siteConfig.name,
    description: siteConfig.tagline,
    telephone: siteConfig.phoneFull,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address?.line1,
      addressLocality: address?.city,
      addressRegion: address?.state,
      postalCode: address?.pincode,
      addressCountry: address?.country,
    },
    url: 'https://sujawaterproofing.com',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '23:00',
    },
    priceRange: '₹₹',
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
