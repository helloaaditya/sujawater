import { NextResponse } from 'next/server';

/**
 * Set Cache-Control so page requests are not cached by the browser.
 * Admin changes (site config, FAQs, services, etc.) then show on normal refresh.
 * Static assets (_next/static, images, etc.) are left to default caching.
 */
export function middleware(request) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  const isPageRequest =
    request.headers.get('accept')?.includes('text/html') ||
    (!pathname.includes('.') && !pathname.startsWith('/_next'));

  if (isPageRequest) {
    response.headers.set(
      'Cache-Control',
      'private, no-store, no-cache, must-revalidate, max-age=0'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, assets, images
     */
    '/((?!_next/static|_next/image|favicon.ico|assets|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?)$).*)',
  ],
};
