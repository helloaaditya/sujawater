'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig as fallbackConfig } from '@/lib/data';

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const socialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.941 2.013 9.281 2 11.997 2h.08zm0 5.838a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zM12.002 18a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" clipRule="evenodd" />
      <path d="M18.406 8.35a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer({ siteConfig: siteConfigProp }) {
  const siteConfig = siteConfigProp || fallbackConfig;
  const social = siteConfig.social || {};
  const socialKeys = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'];

  return (
    <motion.footer
      className="bg-gray-900 text-gray-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      role="contentinfo"
    >
      <div className="container-wide py-8 sm:py-10">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-6 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Logo & Business */}
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
            >
              <Image
                src="/assets/logo.png"
                alt={siteConfig.fullName || siteConfig.name}
                width={320}
                height={96}
                className="h-16 sm:h-20 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-lg font-semibold text-white">
                  {siteConfig.name || siteConfig.fullName}
                </div>
                {siteConfig.tagline && (
                  <div className="text-sm text-gray-300">{siteConfig.tagline}</div>
                )}
              </div>
            </Link>
            {/* WAK – Waterproofing Association of Karnataka */}
            {siteConfig.wak?.logoUrl && (
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <Image
                  src={siteConfig.wak.logoUrl}
                  alt={siteConfig.wak.name}
                  width={72}
                  height={48}
                  className="object-contain h-12 w-auto opacity-90"
                />
                <div>
                  <p className="text-xs font-semibold text-white">Member of WAK</p>
                  <p className="text-xs text-gray-400">Waterproofing Association of Karnataka</p>
                  <Link href="/about#certification-heading" className="text-xs text-primary-400 hover:text-primary-300 mt-0.5 inline-block">
                    View certificate →
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Address */}
          <motion.div variants={item}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Office
            </h3>
            <address className="not-italic text-gray-400 text-sm leading-relaxed space-y-1">
              <p>{siteConfig.address.line1}</p>
              <p>
                {siteConfig.address.city}, {siteConfig.address.state}
              </p>
              <p>
                {siteConfig.address.country} – {siteConfig.address.pincode}
              </p>
            </address>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.phoneFull}`}
                  className="text-gray-400 hover:text-primary-400 focus:outline-none focus:underline transition-colors flex items-center gap-2"
                  aria-label="Call us"
                >
                  <span className="text-primary-400" aria-hidden="true">
                    {siteConfig.phoneFull}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gray-400 hover:text-primary-400 focus:outline-none focus:underline transition-colors"
                  aria-label="Email us"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 focus:outline-none focus:underline transition-colors inline-flex items-center gap-2"
                  aria-label="WhatsApp"
                >
                  <span className="text-green-400">WhatsApp</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div variants={item} className="pr-20 sm:pr-0">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Business Hours
            </h3>
            <div className="text-sm">
              <table className="w-full text-gray-400" role="table" aria-label="Business hours">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 font-medium text-white">Day</th>
                    <th className="text-right py-2 font-medium text-white">Open</th>
                    <th className="text-right py-2 font-medium text-white">Close</th>
                  </tr>
                </thead>
                <tbody>
                  {(siteConfig.businessHoursDetailed || []).map((row, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-1.5">{row.day}</td>
                      <td className="text-right py-1.5">{row.open}</td>
                      <td className="text-right py-1.5">{row.close}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-primary-400 focus:outline-none focus:underline transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-700 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-medium text-white">Follow us</span>
          <div className="flex items-center gap-2">
            {socialKeys.map((key) => {
              const url = social[key];
              const icon = socialIcons[key];
              if (!icon) return null;
              if (url) {
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary-400 transition-colors p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label={key}
                  >
                    {icon}
                  </a>
                );
              }
              return (
                <span
                  key={key}
                  className="text-white/60 p-2 rounded-lg bg-gray-800/50 cursor-default"
                  aria-hidden="true"
                >
                  {icon}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          className="mt-6 pt-6 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms"
              className="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
            >
              Terms and Conditions
            </Link>
            <span className="text-gray-600" aria-hidden="true">
              |
            </span>
            <Link
              href="/disclaimer"
              className="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
            >
              Disclaimer
            </Link>
            <span className="text-gray-600" aria-hidden="true">
              |
            </span>
            <Link
              href="/faq"
              className="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
            >
              FAQs
            </Link>
            <span className="text-gray-600" aria-hidden="true">
              |
            </span>
            <Link
              href="/sitemap.xml"
              className="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
            >
              Site Map
            </Link>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-6 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName || siteConfig.name}. All rights reserved.
          </p>
          <p className="text-gray-400">
            Designed and deployed by{' '}
            <a
              href="https://quantumsolution.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium focus:outline-none focus:underline transition-colors"
            >
              Quantum Solution
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}