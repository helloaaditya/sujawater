'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const initial = { name: '', mobile: '', email: '', message: '' };
const errorsInitial = { name: '', mobile: '', email: '', message: '' };

function validate(values) {
  const e = { ...errorsInitial };
  if (!values.name.trim()) e.name = 'Name is required';
  if (!values.mobile.trim()) e.mobile = 'Mobile is required';
  else if (!/^[6-9]\d{9}$/.test(values.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number';
  if (!values.email.trim()) e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email';
  if (!values.message.trim()) e.message = 'Message is required';
  return e;
}

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState(errorsInitial);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate(form);
    setErrors(e2);
    if (Object.values(e2).some(Boolean)) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors && typeof data.errors === 'object') {
          setErrors((prev) => ({ ...errorsInitial, ...data.errors }));
          setStatus(null);
        } else {
          setStatus('error');
        }
        return;
      }
      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-labelledby="form-heading">
      <h3 id="form-heading" className="sr-only">Enquiry form</h3>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
          Your name <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-mobile" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-mobile"
          type="tel"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
          autoComplete="tel"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50"
          aria-invalid={!!errors.mobile}
          aria-describedby={errors.mobile ? 'contact-mobile-error' : undefined}
        />
        {errors.mobile && (
          <p id="contact-mobile-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.mobile}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'success' && (
        <p className="text-green-600 text-sm" role="status">
          Thank you. Your enquiry has been sent. We will contact you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm" role="alert">
          Something went wrong. Please call or WhatsApp us directly.
        </p>
      )}

      <motion.button
        type="submit"
        className="btn-primary w-full sm:w-auto disabled:opacity-50"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </motion.button>
    </form>
  );
}
