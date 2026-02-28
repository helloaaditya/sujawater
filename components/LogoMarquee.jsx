'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * LogoMarquee – infinite horizontal scroll of logos with transparent background.
 * @param {string} folder - Folder under /assets/ (e.g. 'partners' or 'clients')
 * @param {string[]} filenames - Image filenames (e.g. ['1.png', '2.png'])
 * @param {string} [altPrefix='Logo'] - Alt text prefix (e.g. 'Partner', 'Client')
 * @param {number} [height=80] - Logo row height in pixels
 * @param {number} [speed=30] - Scroll duration in seconds (higher = slower)
 */
export default function LogoMarquee({ folder, filenames, altPrefix = 'Logo', height = 80, speed = 30 }) {
  if (!filenames?.length) return null;

  const basePath = `/assets/${folder}`;
  const images = filenames.map((name, i) => ({
    src: `${basePath}/${encodeURI(name)}`,
    alt: `${altPrefix} ${i + 1}`,
  }));

  return (
    <div
      className="w-full overflow-hidden bg-transparent"
      style={{ minHeight: height }}
      role="list"
      aria-label={`${altPrefix}s`}
    >
      <motion.div
        className="flex shrink-0 items-center gap-12 md:gap-16"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        aria-hidden="true"
      >
        {[1, 2].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-12 md:gap-16">
            {images.map((img, i) => (
              <div
                key={`${copy}-${i}`}
                className="relative flex shrink-0 items-center justify-center transition-opacity hover:opacity-90"
                style={{ height, minWidth: height * 2 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={height * 2}
                  height={height}
                  className="object-contain object-center w-auto max-h-full"
                  style={{ maxHeight: height, width: 'auto' }}
                  unoptimized
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
