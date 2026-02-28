'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/site-config', label: 'Site Config' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer when route changes (e.g. after clicking a nav link)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open so nav is clearly visible
  useEffect(() => {
    if (!open) return;
    const style = document.body.style;
    const prev = style.overflow;
    style.overflow = 'hidden';
    return () => { style.overflow = prev; };
  }, [open]);

  return (
    <>
      {/* Mobile: sticky header with hamburger - tap to open nav (Dashboard, Leads, Services, etc.) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[200] min-h-[56px] h-14 bg-gray-800 text-white flex items-center gap-2 px-3 py-2 shadow-lg border-b border-gray-700 safe-area-inset-top">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex items-center gap-2 min-h-[44px] min-w-[44px] pl-2 pr-3 py-2 -ml-2 rounded-lg hover:bg-gray-700 active:bg-gray-600 touch-manipulation select-none"
        >
          <span className="w-7 h-7 shrink-0 flex items-center justify-center rounded border border-gray-500 bg-gray-700/50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
          <span className="text-base font-semibold">Menu</span>
        </button>
        <Link href="/admin/dashboard" className="font-bold text-lg truncate ml-1">Admin</Link>
      </header>

      {/* Backdrop when sidebar open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[210] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar: desktop always visible; mobile fixed overlay - z above backdrop */}
      <nav
        className={`
          w-64 sm:w-56 min-h-screen bg-gray-800 text-white flex flex-col flex-shrink-0
          fixed lg:static inset-y-0 left-0 z-[220] lg:z-auto
          transform transition-transform duration-200 ease-out
          shadow-2xl lg:shadow-none
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <Link href="/admin/dashboard" className="font-bold text-lg">Admin</Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex-1 p-2 space-y-1 overflow-y-auto">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-3 py-2 rounded-lg text-sm ${pathname === href || (href !== '/admin/dashboard' && pathname?.startsWith(href)) ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-2 border-t border-gray-700">
          <a href="/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">
            View site →
          </a>
          <form action="/api/admin/logout" method="POST" className="mt-1">
            <button type="submit" className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
