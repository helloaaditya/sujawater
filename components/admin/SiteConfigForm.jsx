'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultConfig = {
  name: '',
  fullName: '',
  tagline: '',
  phone: '',
  phoneFull: '',
  phoneAlt: '',
  email: '',
  whatsapp: '',
  businessHours: '',
  address: { line1: '', city: '', state: '', pincode: '', country: '' },
  social: { facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '' },
};

export default function SiteConfigForm() {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/site-config')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object' && Object.keys(data).length) {
          setConfig((prev) => ({ ...defaultConfig, ...prev, ...data, address: { ...defaultConfig.address, ...(data.address || {}) }, social: { ...defaultConfig.social, ...(data.social || {}) } }));
        }
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setConfig((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setConfig((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));
    } else {
      setConfig((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed'); return; }
      setError('');
    } catch { setError('Something went wrong'); } finally { setSaving(false); }
  }

  async function handleSeed() {
    setSeedLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Seed failed'); return; }
      alert('Seeded! Refreshing…');
      window.location.reload();
    } catch { setError('Seed failed'); } finally { setSeedLoading(false); }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 mb-2">
          <strong>Seed from site:</strong> Copy current website content (services, testimonials, FAQs, site config) from code into the database. Run once after setting up Supabase.
        </p>
        <button
          type="button"
          /* seed is intentionally disabled in this build to prevent accidental database overwrite */
          disabled
          title="Disabled"
          className="px-4 py-2 bg-blue-400 text-white rounded-lg text-sm font-medium cursor-not-allowed opacity-60"
        >
          Seed from site (disabled)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-xl border border-gray-200">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {['name', 'fullName', 'tagline', 'phone', 'phoneFull', 'phoneAlt', 'email', 'whatsapp', 'businessHours'].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
            <input name={key} value={config[key] || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
          </div>
        ))}
        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium text-gray-700">Address</legend>
          {['line1', 'city', 'state', 'pincode', 'country'].map((key) => (
            <div key={key} className="mt-2">
              <label className="block text-xs text-gray-500">{key}</label>
              <input name={`address.${key}`} value={config.address?.[key] || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm" />
            </div>
          ))}
        </fieldset>
        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium text-gray-700">Social URLs</legend>
          {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((key) => (
            <div key={key} className="mt-2">
              <label className="block text-xs text-gray-500">{key}</label>
              <input name={`social.${key}`} value={config.social?.[key] || ''} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm" placeholder="https://" />
            </div>
          ))}
        </fieldset>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save config'}
          </button>
          <Link href="/admin/dashboard" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Back</Link>
        </div>
      </form>
    </div>
  );
}
