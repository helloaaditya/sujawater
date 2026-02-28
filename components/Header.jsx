'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig as fallbackConfig } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ siteConfig: siteConfigProp }) {
  const siteConfig = siteConfigProp || fallbackConfig;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-soft"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      role="banner"
    >
      <div className="bg-primary-600 text-white">
        <div className="container-wide flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.phoneFull}`} className="inline-flex items-center gap-1.5 hover:underline focus:outline-none focus:underline" aria-label="Call us">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
              </svg>
              {siteConfig.phoneFull}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 hover:underline focus:outline-none focus:underline" aria-label="Email us">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              aria-label="Chat on WhatsApp"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              WhatsApp
            </motion.a>
            <Link href="/contact" className="btn-accent !py-1.5 !px-3 text-sm" aria-label="Contact us">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <nav className="container-wide flex items-center justify-between py-4" aria-label="Main navigation" style={{ padding: '0 10px' }}>
        <Link
          href="/"
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          aria-label={`${siteConfig.fullName || siteConfig.name} - Home`}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt={siteConfig.name || siteConfig.fullName}
              width={320}
              height={96}
              className="h-20 sm:h-24 w-auto object-contain bg-transparent"
              priority
            />
            <div className="hidden sm:block max-w-[36ch] overflow-hidden">
              <div
                title={siteConfig.name || siteConfig.fullName}
                className="text-base sm:text-lg font-semibold text-primary-800 leading-tight truncate"
              >
                {siteConfig.name || siteConfig.fullName}
              </div>
              {(siteConfig.shortTagline || siteConfig.tagline) && (
                <div title={siteConfig.shortTagline || siteConfig.tagline} className="text-xs text-gray-600 truncate">
                  {siteConfig.shortTagline || siteConfig.tagline}
                </div>
              )}
            </div>
          </div>
        </Link>
        <motion.button
          type="button"
          className="md:hidden rounded-lg p-2 text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
        <ul
          id="main-menu"
          className={`absolute left-0 right-0 top-full mt-0 flex flex-col gap-0 bg-white shadow-soft-lg md:static md:flex md:flex-row md:gap-1 md:shadow-none transition-all duration-200 ${
            menuOpen ? 'block' : 'hidden md:flex'
          }`}
          role="list"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href} role="listitem">
              <Link
                href={href}
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 md:px-3 md:py-2 md:rounded-lg md:hover:bg-primary-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
