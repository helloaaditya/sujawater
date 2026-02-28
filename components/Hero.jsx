'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig as fallbackConfig } from '@/lib/data';
import { images } from '@/lib/images';

const stackImages = [
  { src: '/assets/Hero.png', alt: 'SUJA WATERPROOFING SOLUTIONS & EPOXY FLOORING , P U SYSTEMS' },
  { src: images.serviceTerrace, alt: 'Terrace waterproofing' },
  { src: images.serviceBathroom, alt: 'Bathroom waterproofing' },
  { src: images.serviceBasement, alt: 'Basement waterproofing' },
  { src: images.servicePool, alt: 'Pool waterproofing' },
  { src: images.gallery1, alt: 'Waterproofing project' },
];
const STACK_INTERVAL_MS = 4000;

const headlineWords = [
  'Terrace,',
  'Bathroom',
  '&',
  'Basement',
  'Waterproofing',
  'Done',
  'Right.',
];

export default function Hero({ siteConfig: siteConfigProp }) {
  const siteConfig = siteConfigProp || fallbackConfig;
  const [stackIndex, setStackIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStackIndex((i) => (i + 1) % stackImages.length);
    }, STACK_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-0 pb-0">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-80">
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-blue-500/40 via-cyan-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Main content - no extra top/bottom space */}
      <div className="relative max-w-7xl mx-auto w-full py-6 lg:py-8">
        <div className="w-full grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center px-6 lg:px-12">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* 15 Years of Excellence badge - prominent credibility */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-cyan-400/30"
            >
              <span className="text-lg font-bold text-cyan-300">15</span>
              <span className="text-xs font-semibold text-cyan-100 tracking-wide">
                Years of Excellence & Industry Experience
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-400 tracking-wide">
                Waterproofing · Bangalore
              </span>
            </motion.div>

            {/* Main headline with staggered animation */}
            <div className="space-y-1">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className={`inline-block mr-2 ${
                      word === 'Right.' 
                        ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent'
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-sm md:text-base text-slate-300 max-w-md leading-relaxed"
            >
              Epoxy grouting, terrace, bathroom, pool & basement waterproofing.
              Trusted by{' '}
              <span className="font-semibold text-cyan-300">5000+ clients</span>
              {' '}with warranty-backed, guaranteed works.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 pt-2 text-xs"
            >
              <Link
                href={`tel:${siteConfig.phone}`}
                className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {siteConfig.phone}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href={`https://wa.me/${siteConfig.phone.replace(/\D/g, '')}`}
                className="group px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: stacked images, changing one by one - wider, no bottom space */}
          <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center lg:justify-end">
            {/* Stack layers (back cards for depth) */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none">
              <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-full max-h-[380px] lg:max-h-[480px]">
                <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 shadow-2xl translate-y-3 translate-x-1 scale-95" aria-hidden="true" />
                <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 shadow-xl translate-y-1.5 translate-x-0.5 scale-[0.98]" aria-hidden="true" />
              </div>
            </div>
            {/* Front card: image changes one by one */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-full max-h-[380px] lg:max-h-[480px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/50"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stackIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={stackImages[stackIndex].src}
                    alt={stackImages[stackIndex].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 95vw, 60vw"
                    priority={stackIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              {/* Stack position indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {stackImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStackIndex(i)}
                    className="rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-label={`Go to image ${i + 1}`}
                  >
                    <span
                      className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        i === stackIndex ? 'bg-cyan-400 scale-125' : 'bg-white/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}