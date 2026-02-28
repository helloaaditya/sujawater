'use client';

import { motion } from 'framer-motion';
import { siteConfig as fallbackConfig } from '@/lib/data';

const getMarqueeText = (siteConfig) =>
  `${siteConfig.fullName || siteConfig.name} Call Now on : ${siteConfig.phone}${siteConfig.phoneAlt ? ` / ${siteConfig.phoneAlt}` : ''} For - Epoxy Tiles Grouting | Terrace Waterproofing | Bathroom Waterproofing | Swimming Pool Waterproofing | Basement Waterproofing | Expansion Joint Waterproofing | Gardening Waterproofing | Exterior Wall Waterproofing.`;

export default function CtaStrip({ siteConfig: siteConfigProp }) {
  const siteConfig = siteConfigProp || fallbackConfig;
  return (
    <motion.div
      className="bg-primary-600 text-white py-3 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      role="complementary"
      aria-label="Quick contact and services"
    >
      <div className="relative flex w-full">
        <motion.div
          className="flex shrink-0 items-center gap-12 pr-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {[1, 2].map((i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium"
              aria-hidden={i === 2}
            >
              {getMarqueeText(siteConfig)}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
