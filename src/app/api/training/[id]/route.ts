import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/training/[id] — modifier une séance
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { slot, type, intensity, durationMin } = body;

    const training = await prisma.trainingSession.update({
      where: { id },
      data: {
        ...(slot      && { slot }),
        ...(type      && { type }),
        ...(intensity && { intensity }),
        durationMin: durationMin ?? null,
      },
    });

    return NextResponse.json(training);
  } catch (err) {
    console.error('[PUT /api/training]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/training/[id] — supprimer une séance
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.trainingSession.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /api/training]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
