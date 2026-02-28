import { NextResponse } from 'next/server';
import { isAdminLoggedIn } from '@/lib/admin-auth';

export async function GET() {
  const ok = await isAdminLoggedIn();
  return NextResponse.json({ ok });
}
