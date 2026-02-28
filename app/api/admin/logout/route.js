import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/admin-auth';

export async function POST(request) {
  await clearAdminSession();
  const url = request.nextUrl ?? new URL(request.url);
  return NextResponse.redirect(new URL('/admin', url.origin));
}
