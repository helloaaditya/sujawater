'use client';

import { motion } from 'framer-motion';

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AnimatedSection({
  children,
  className = '',
  as: Component = 'section',
  delay = 0,
  variants = defaultVariants,
  ...props
}) {
  return (
    <motion.div
      as={Component}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      custom={delay}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStagger({ children, className = '', as: Component = 'div', stagger = 0.06 }) {
  return (
    <motion.div
      as={Component}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.1 },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
