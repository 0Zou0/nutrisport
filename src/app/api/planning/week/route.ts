import { NextRequest, NextResponse } from 'next/server';
import { getWeekData as getFromDB } from '@/lib/services/planning';
import { getWeekData as getFromMock } from '@/lib/mock-data';

const CLUB_ID = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';
const USE_DB   = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[password]');

export async function GET(req: NextRequest) {
  const dates = req.nextUrl.searchParams.get('dates')?.split(',') ?? [];

  if (dates.length === 0) {
    return NextResponse.json({ error: 'dates param required' }, { status: 400 });
  }

  try {
    const data = USE_DB
      ? await getFromDB(dates, CLUB_ID)
      : getFromMock(dates);

    return NextResponse.json(data);
  } catch (err) {
    console.error('[API /planning/week]', err);
    return NextResponse.json(getFromMock(dates));
  }
}
