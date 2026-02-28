import Link from 'next/link';

// items = trail after "Home" only (e.g. [{ label: 'Gallery', href: '/gallery' }]). Do not include Home in items.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-100 border-b border-gray-200">
      <div className="container-tight py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600" role="list">
          <li>
            <Link href="/" className="hover:text-primary-600 focus:outline-none focus:underline">
              Home
            </Link>
          </li>
          {items?.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? (
                <span className="text-primary-700 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary-600 focus:outline-none focus:underline">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
