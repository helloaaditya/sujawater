'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * When user switches back to this tab (e.g. after editing in admin),
 * refresh the page so they see the latest content without manual refresh.
 * Only runs on public site (not under /admin).
 */
export default function RefreshOnVisible() {
  const pathname = usePathname();
  const router = useRouter();
  const wasVisible = useRef(true);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        if (!wasVisible.current) {
          wasVisible.current = true;
          router.refresh();
        }
      } else {
        wasVisible.current = false;
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pathname, router]);

  return null;
}
