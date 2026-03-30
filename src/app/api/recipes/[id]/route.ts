import { NextRequest, NextResponse } from 'next/server';
import { getRecipe as getFromDB } from '@/lib/services/recipes';
import { getRecipe as getFromMock } from '@/lib/recipes';

const USE_DB = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[password]');

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = USE_DB
      ? await getFromDB(id)
      : getFromMock(id);

    if (!data) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API /recipes]', err);
    return NextResponse.json(getFromMock(id));
  }
}
