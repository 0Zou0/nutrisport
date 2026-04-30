import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/menu-option/[id] — mise à jour disponibilité et/ou recette assignée
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: { available?: boolean; recipeId?: string | null } = {};
    if (body.available !== undefined) data.available = body.available;
    if ('recipeId' in body) data.recipeId = body.recipeId;

    const option = await prisma.menuOption.update({
      where: { id },
      data,
      include: { recipe: true },
    });

    return NextResponse.json({
      id:          option.id,
      title:       option.recipe?.title ?? '',
      description: option.recipe?.description ?? '',
      available:   option.available,
      recipeId:    option.recipeId ?? undefined,
    });
  } catch (err) {
    console.error('[PUT /api/menu-option]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/menu-option/[id] — supprime un slot de menu
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.menuOption.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /api/menu-option]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
