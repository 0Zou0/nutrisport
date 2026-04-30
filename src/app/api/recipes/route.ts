import { NextRequest, NextResponse } from 'next/server';
import { getRecipesByClub, createRecipe } from '@/lib/services/recipes';

const DEFAULT_CLUB = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';

export async function GET() {
  try {
    const recipes = await getRecipesByClub(DEFAULT_CLUB);
    return NextResponse.json(recipes);
  } catch (err) {
    console.error('[GET /api/recipes]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const recipe = await createRecipe(data, DEFAULT_CLUB);
    return NextResponse.json(recipe, { status: 201 });
  } catch (err) {
    console.error('[POST /api/recipes]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
