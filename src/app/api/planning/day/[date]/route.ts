import { NextRequest, NextResponse } from 'next/server';
import { getDayData as getFromDB } from '@/lib/services/planning';
import { getDayData as getFromMock } from '@/lib/mock-data';

const CLUB_ID = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';
const USE_DB   = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[password]');

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;

  try {
    const data = USE_DB
      ? await getFromDB(date, CLUB_ID)
      : getFromMock(date);

    if (!data) return NextResponse.json(null);
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API /planning/day]', err);
    const fallback = getFromMock(date);
    return NextResponse.json(fallback);
  }
}
