'use client';

import { useState, useMemo } from 'react';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesListWithSearch({ services }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return services;
    const q = query.trim().toLowerCase();
    return services.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.shortDesc?.toLowerCase().includes(q) ||
        s.slug?.toLowerCase().includes(q.replace(/\s+/g, '-'))
    );
  }, [services, query]);

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center md:text-left">
          All Our Services
        </h2>
        <label className="sr-only" htmlFor="service-search">
          Search services
        </label>
        <div className="relative max-w-md w-full sm:w-72">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400" aria-hidden="true">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            id="service-search"
            type="search"
            role="searchbox"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors sm:text-sm"
            aria-label="Search services by name or description"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
          <p className="text-gray-600 text-base sm:text-lg mb-2">No services match your search.</p>
          <p className="text-gray-500 text-sm">Try a different keyword (e.g. terrace, bathroom, epoxy, basement).</p>
        </div>
      )}
    </div>
  );
}
