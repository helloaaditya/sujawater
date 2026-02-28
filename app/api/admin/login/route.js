import { NextResponse } from 'next/server';
import { setAdminSession, getAdminToken } from '@/lib/admin-auth';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const token = getAdminToken();
    if (!token) {
      return NextResponse.json({ ok: false, message: 'Admin not configured. Set ADMIN_PASSWORD in .env' }, { status: 503 });
    }
    const expected = process.env.ADMIN_PASSWORD;
    if (password !== expected) {
      return NextResponse.json({ ok: false, message: 'Invalid password' }, { status: 401 });
    }
    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, message: 'Error' }, { status: 500 });
  }
}
