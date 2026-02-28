'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TestimonialForm({ testimonial }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: testimonial?.name ?? '',
    location: testimonial?.location ?? '',
    rating: testimonial?.rating ?? 5,
    text: testimonial?.text ?? '',
  });
  const isEdit = !!testimonial?.id;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'rating' ? parseInt(value, 10) : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/testimonials/${testimonial.id}` : '/api/admin/testimonials';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed'); return; }
      router.push('/admin/testimonials');
      router.refresh();
    } catch { setError('Something went wrong'); } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
        <select name="rating" value={form.rating} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text *</label>
        <textarea name="text" value={form.text} onChange={handleChange} required rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
        </button>
        <Link href="/admin/testimonials" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
