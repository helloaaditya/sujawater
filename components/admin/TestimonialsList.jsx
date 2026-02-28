'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TestimonialsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id, name) {
    if (!confirm(`Delete testimonial by ${name}?`)) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) setItems((prev) => prev.filter((t) => t.id !== id));
    else alert((await res.json()).error);
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (items.length === 0) return <p className="text-gray-500">No testimonials. Add one or run Seed from Site Config.</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-left min-w-[500px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Name</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Location</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Rating</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">{t.name}</td>
              <td className="px-4 py-3 text-gray-600">{t.location}</td>
              <td className="px-4 py-3">{t.rating}</td>
              <td className="px-4 py-3 flex gap-2">
                <Link href={`/admin/testimonials/${t.id}`} className="text-primary-600 hover:underline text-sm">Edit</Link>
                <button type="button" onClick={() => handleDelete(t.id, t.name)} className="text-red-600 hover:underline text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
