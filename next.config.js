/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'sujawaterproofing.com' },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
      { protocol: 'https', hostname: 'structuralrepairs.com.my' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.20mcc.in' },
      { protocol: 'https', hostname: 'www.sujawaterproofing.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/latest-update/terrace-waterproofing-service-in-kengeri-bangalore-contact-99458436999019095733-5821',
        destination: '/services/terrace-waterproofing-services-bangalore',
        permanent: true,
      },
      {
        source: '/latest-update/bathroom-waterproofing-in-indiranagar-bangalore-call-now-9945843699-12888',
        destination: '/services/bathroom-waterproofing-services-bangalore',
        permanent: true,
      },
      {
        source: '/latest-update/underground-water-tank-sump-waterproofing-in-horamavu-bangalore-call-now-9945843699-854',
        destination: '/services/sump-water-tank-waterproofing-bangalore',
        permanent: true,
      },
      {
        source: '/latest-update/lift-pit-waterproofing-in-jayanagar-bangalore-call-now-9945843699-13436',
        destination: '/services/basement-lift-pit-waterproofing-bangalore',
        permanent: true,
      },
      {
        source: '/latest-update/app-membrane-waterproofing-services-in-bangalore-13176',
        destination: '/services/app-membrane-waterproofing',
        permanent: true,
      },
      {
        source: '/latest-update/pu-grouting-work-in-ramamurthynagar-bangalore-call-now-9945843699-1457',
        destination: '/services/epoxy-pu-grouting-services-bangalore',
        permanent: true,
      },
      {
        source: '/latest-update/industrial-pu-flooring-in-wilson-garden-bangalore-call-now-9945843699-12028',
        destination: '/services/pu-concrete-flooring-bangalore',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
