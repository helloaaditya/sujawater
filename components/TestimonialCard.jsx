'use client';

import { motion } from 'framer-motion';

export default function TestimonialCard({ testimonial, index = 0 }) {
  const { name, location, rating, text } = testimonial;

  return (
    <motion.blockquote
      className="group bg-white p-6 rounded-xl border-l-4 border-primary-500 border border-gray-100 shadow-soft ring-2 ring-primary-500/10 transition-all duration-300 hover:shadow-soft-lg hover:ring-primary-500/25 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div className="flex gap-1 mb-3" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="text-amber-500 transition-transform duration-200 group-hover:scale-110"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + i * 0.05 }}
            aria-hidden="true"
          >
            ★
          </motion.span>
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed mb-4 first-letter:text-2xl first-letter:font-bold first-letter:text-primary-600 first-letter:mr-1 first-letter:float-left first-letter:leading-none">&ldquo;{text}&rdquo;</p>
      <footer>
        <cite className="not-italic font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{name}</cite>
        <span className="text-gray-500 text-sm block">{location}</span>
      </footer>
    </motion.blockquote>
  );
}
