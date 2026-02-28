'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryForm({ item }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: item?.title ?? '',
    image_url: item?.image_url ?? '',
    alt: item?.alt ?? '',
    sort_order: item?.sort_order ?? 0,
  });

  const isEdit = !!item?.id;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/gallery/${item.id}` : '/api/admin/gallery';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save');
        return;
      }
      router.push('/admin/gallery');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-2" placeholder="e.g. Terrace Waterproofing" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
        <input name="image_url" type="url" value={form.image_url} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-2" placeholder="https://..." />
        {form.image_url && (
          <div className="mt-2 relative aspect-video w-full max-w-xs rounded border border-gray-200 overflow-hidden bg-gray-100">
            <Image src={form.image_url} alt={form.alt || form.title} fill className="object-cover" sizes="320px" unoptimized />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alt text (for accessibility)</label>
        <input name="alt" value={form.alt} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2" placeholder="Short description of image" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort order</label>
        <input name="sort_order" type="number" min={0} value={form.sort_order} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 max-w-[8rem]" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Update' : 'Add image'}
        </button>
        <Link href="/admin/gallery" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
