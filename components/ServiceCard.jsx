'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

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
  default: images.serviceTerrace,
};

export default function ServiceCard({ service, index = 0 }) {
  const img = service.image_url || serviceImages[service.icon] || serviceImages.default;

  return (
    <motion.article
      className="group bg-white rounded-xl overflow-hidden shadow-soft border-l-4 border-primary-500 ring-2 ring-primary-500/10 border border-gray-100 transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-2 hover:ring-primary-500/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <Link href={`/services/${service.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-xl">
        <div className="aspect-[16/10] relative overflow-hidden bg-gray-100 p-2 m-2 rounded-lg ring-2 ring-primary-500/20 border-2 border-primary-400/50 transition-all duration-300 group-hover:ring-primary-500/40 group-hover:border-primary-500/70">
          <Image
            src={img}
            alt={`${service.title} - Waterproofing Bangalore`}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
          <span className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
            View Service
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
