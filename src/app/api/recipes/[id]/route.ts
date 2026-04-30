import { NextRequest, NextResponse } from 'next/server';
import { getRecipe as getFromDB, updateRecipe, deleteRecipe } from '@/lib/services/recipes';
import { getRecipe as getFromMock } from '@/lib/recipes';

const USE_DB = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('[password]');

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = USE_DB ? await getFromDB(id) : getFromMock(id);
    if (!data) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    console.error('[GET /api/recipes/[id]]', err);
    return NextResponse.json(getFromMock(id));
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await req.json();
    const recipe = await updateRecipe(id, data);
    return NextResponse.json(recipe);
  } catch (err) {
    console.error('[PUT /api/recipes/[id]]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteRecipe(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /api/recipes/[id]]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
