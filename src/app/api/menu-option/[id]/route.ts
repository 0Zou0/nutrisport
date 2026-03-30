import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/menu-option/[id] — toggle disponibilité
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { available } = await req.json();

    const option = await prisma.menuOption.update({
      where: { id },
      data: { available },
    });

    return NextResponse.json(option);
  } catch (err) {
    console.error('[PUT /api/menu-option]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
