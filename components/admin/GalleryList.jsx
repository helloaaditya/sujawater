'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) setItems((prev) => prev.filter((g) => g.id !== id));
    else alert((await res.json()).error);
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (items.length === 0) return <p className="text-gray-500">No gallery images. Add one or run Seed from Site Config.</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition">
            <div className="aspect-video relative bg-gray-100">
              <Image
                src={g.image_url}
                alt={g.alt || g.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 25vw"
                unoptimized
              />
            </div>
            <div className="p-3">
              <p className="font-medium text-gray-900 truncate" title={g.title}>{g.title}</p>
              <div className="flex gap-2 mt-2">
                <Link href={`/admin/gallery/${g.id}`} className="text-primary-600 hover:underline text-sm">Edit</Link>
                <button type="button" onClick={() => handleDelete(g.id, g.title)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
