import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json({ success: false, message: 'Deprecated endpoint' }, { status: 410 });
}