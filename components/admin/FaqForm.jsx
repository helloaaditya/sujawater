'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FaqForm({ faq }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ q: faq?.q ?? '', a: faq?.a ?? '' });
  const isEdit = !!faq?.id;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/faqs/${faq.id}` : '/api/admin/faqs';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed'); return; }
      router.push('/admin/faqs');
      router.refresh();
    } catch { setError('Something went wrong'); } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
        <textarea name="q" value={form.q} onChange={(e) => setForm((p) => ({ ...p, q: e.target.value }))} required rows={2} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
        <textarea name="a" value={form.a} onChange={(e) => setForm((p) => ({ ...p, a: e.target.value }))} required rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
        </button>
        <Link href="/admin/faqs" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
