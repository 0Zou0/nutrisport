import { NextRequest, NextResponse } from 'next/server';
import { getMonthData as getFromDB } from '@/lib/services/planning';
import { getMonthData as getFromMock } from '@/lib/mock-data';

const CLUB_ID = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';
const USE_DB   = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[password]');

export async function GET(req: NextRequest) {
  const year  = Number(req.nextUrl.searchParams.get('year'));
  const month = Number(req.nextUrl.searchParams.get('month'));

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json({ error: 'year and month params required' }, { status: 400 });
  }

  try {
    const data = USE_DB
      ? await getFromDB(year, month, CLUB_ID)
      : getFromMock(year, month);

    return NextResponse.json(data);
  } catch (err) {
    console.error('[API /planning/month]', err);
    return NextResponse.json(getFromMock(year, month));
  }
}
