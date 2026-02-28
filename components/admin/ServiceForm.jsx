'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ServiceForm({ service, icons }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    slug: service?.slug ?? '',
    title: service?.title ?? '',
    shortDesc: service?.short_desc ?? '',
    longDesc: service?.long_desc ?? '',
    icon: service?.icon ?? 'terrace',
    image_url: service?.image_url ?? '',
    benefits: Array.isArray(service?.benefits) ? [...service.benefits] : [],
    process: Array.isArray(service?.process) ? service.process.map((p) => ({ step: p.step ?? 0, title: p.title ?? '', desc: p.desc ?? '' })) : [],
  });

  const isEdit = !!service?.id;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && !isEdit) {
      setForm((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      }));
    }
  }

  function addBenefit() {
    setForm((prev) => ({ ...prev, benefits: [...prev.benefits, ''] }));
  }
  function removeBenefit(i) {
    setForm((prev) => ({ ...prev, benefits: prev.benefits.filter((_, idx) => idx !== i) }));
  }
  function updateBenefit(i, val) {
    setForm((prev) => ({ ...prev, benefits: prev.benefits.map((b, idx) => (idx === i ? val : b)) }));
  }
  function addProcessStep() {
    const next = (form.process.length + 1);
    setForm((prev) => ({ ...prev, process: [...prev.process, { step: next, title: '', desc: '' }] }));
  }
  function removeProcessStep(i) {
    setForm((prev) => ({
      ...prev,
      process: prev.process
        .filter((_, idx) => idx !== i)
        .map((p, idx) => ({ ...p, step: idx + 1 })),
    }));
  }
  function updateProcessStep(i, field, val) {
    setForm((prev) => ({
      ...prev,
      process: prev.process.map((item, idx) => (idx === i ? { ...item, [field]: field === 'step' ? (parseInt(val, 10) || 0) : val } : item)),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/services/${service.id}` : '/api/admin/services';
      const method = isEdit ? 'PUT' : 'POST';
      const body = isEdit
        ? { slug: form.slug, title: form.title, shortDesc: form.shortDesc, longDesc: form.longDesc, icon: form.icon, image_url: form.image_url, benefits: form.benefits, process: form.process }
        : form;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save');
        return;
      }
      router.push('/admin/services');
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
        <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
        <input name="slug" value={form.slug} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
        <textarea name="shortDesc" value={form.shortDesc} onChange={handleChange} rows={2} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Long description</label>
        <textarea name="longDesc" value={form.longDesc} onChange={handleChange} rows={6} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input name="image_url" type="url" value={form.image_url} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2" placeholder="https://... (leave empty to use icon default)" />
        {form.image_url && (
          <div className="mt-2 relative aspect-video w-full max-w-xs rounded border border-gray-200 overflow-hidden bg-gray-100">
            <Image src={form.image_url} alt={form.title} fill className="object-cover" sizes="320px" unoptimized />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Icon (fallback if no image URL)</label>
        <select name="icon" value={form.icon} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2">
          {icons.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Benefits (Why Choose Suja)</label>
          <button type="button" onClick={addBenefit} className="text-sm text-primary-600 hover:underline">+ Add</button>
        </div>
        <p className="text-gray-500 text-xs mb-3">Bullet points shown under &quot;Why Choose Suja for this service&quot;. Leave empty to use site default.</p>
        <ul className="space-y-2">
          {form.benefits.map((b, i) => (
            <li key={i} className="flex gap-2">
              <input
                value={b}
                onChange={(e) => updateBenefit(i, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="e.g. Free site inspection and detailed quote"
              />
              <button type="button" onClick={() => removeBenefit(i)} className="shrink-0 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Our Process</label>
          <button type="button" onClick={addProcessStep} className="text-sm text-primary-600 hover:underline">+ Add step</button>
        </div>
        <p className="text-gray-500 text-xs mb-3">Steps shown in &quot;Our Process&quot;. Leave empty to use site default.</p>
        <div className="space-y-4">
          {form.process.map((p, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={1}
                  value={p.step}
                  onChange={(e) => updateProcessStep(i, 'step', e.target.value)}
                  className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                />
                <input
                  value={p.title}
                  onChange={(e) => updateProcessStep(i, 'title', e.target.value)}
                  placeholder="Step title"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
                />
                <button type="button" onClick={() => removeProcessStep(i)} className="shrink-0 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">Remove</button>
              </div>
              <textarea
                value={p.desc}
                onChange={(e) => updateProcessStep(i, 'desc', e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
        </button>
        <Link href="/admin/services" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
