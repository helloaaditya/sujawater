'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FaqsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this FAQ?')) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    if (res.ok) setItems((prev) => prev.filter((f) => f.id !== id));
    else alert((await res.json()).error);
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (items.length === 0) return <p className="text-gray-500">No FAQs. Add one or run Seed from Site Config.</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-left min-w-[400px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Question</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-900 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => (
            <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{f.q?.slice(0, 80)}…</td>
              <td className="px-4 py-3 flex gap-2">
                <Link href={`/admin/faqs/${f.id}`} className="text-primary-600 hover:underline text-sm">Edit</Link>
                <button type="button" onClick={() => handleDelete(f.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
