'use client';

import { useState, useEffect } from 'react';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function LeadsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewLead, setViewLead] = useState(null);

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id, name) {
    if (!confirm(`Delete lead from ${name}?`)) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((l) => l.id !== id));
      if (viewLead?.id === id) setViewLead(null);
    } else alert((await res.json()).error);
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (items.length === 0) return <p className="text-gray-500">No leads yet. Contact form submissions will appear here.</p>;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900">Name</th>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900">Mobile</th>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900">Message</th>
              <th className="px-3 py-3 text-sm font-semibold text-gray-900 w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-3 text-gray-600 text-sm whitespace-nowrap">{formatDate(l.created_at)}</td>
                <td className="px-3 py-3 font-medium">{l.name}</td>
                <td className="px-3 py-3 text-gray-600 text-sm">
                  <a href={`mailto:${l.email}`} className="text-primary-600 hover:underline">{l.email}</a>
                </td>
                <td className="px-3 py-3 text-gray-600 text-sm">
                  <a href={`tel:${l.mobile}`} className="text-primary-600 hover:underline">{l.mobile}</a>
                </td>
                <td className="px-3 py-3 text-gray-600 text-sm max-w-[200px] truncate" title={l.message}>{l.message}</td>
                <td className="px-3 py-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setViewLead(l)} className="text-primary-600 hover:underline text-sm">View</button>
                  <button type="button" onClick={() => handleDelete(l.id, l.name)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View lead modal */}
      {viewLead && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setViewLead(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="view-lead-title"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="view-lead-title" className="text-xl font-bold text-gray-900">Lead details</h2>
              <button
                type="button"
                onClick={() => setViewLead(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Date</dt>
                <dd className="text-gray-900 mt-0.5">{formatDate(viewLead.created_at)}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Name</dt>
                <dd className="text-gray-900 mt-0.5">{viewLead.name}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Email</dt>
                <dd className="text-gray-900 mt-0.5">
                  <a href={`mailto:${viewLead.email}`} className="text-primary-600 hover:underline">{viewLead.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Mobile</dt>
                <dd className="text-gray-900 mt-0.5">
                  <a href={`tel:${viewLead.mobile}`} className="text-primary-600 hover:underline">{viewLead.mobile}</a>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Message</dt>
                <dd className="text-gray-900 mt-0.5 whitespace-pre-wrap">{viewLead.message}</dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-2">
              <a
                href={`mailto:${viewLead.email}`}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
              >
                Reply by email
              </a>
              <a
                href={`tel:${viewLead.mobile}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Call
              </a>
              <button
                type="button"
                onClick={() => handleDelete(viewLead.id, viewLead.name)}
                className="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
              >
                Delete lead
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
