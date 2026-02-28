'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-2" role="region" aria-labelledby="faq-heading">
      {items.map((item, i) => {
        const isOpen = openId === i;
        return (
          <motion.div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
            initial={false}
            whileHover={{ scale: 1.005 }}
          >
            <h2>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-t-xl transition-colors"
                onClick={() => setOpenId(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                {item.q}
                <motion.span
                  className="shrink-0 text-primary-600 text-xl leading-none"
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 py-4 text-gray-700 bg-white border-t border-gray-200">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
