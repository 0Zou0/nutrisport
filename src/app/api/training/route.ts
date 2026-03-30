import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CLUB_ID = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';

// POST /api/training — créer une séance
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, slot, type, intensity, durationMin } = body;

    if (!date || !slot || !type || !intensity) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    // Trouver ou créer le DayPlan
    let dayPlan = await prisma.dayPlan.findFirst({
      where: { date: new Date(date), season: { clubId: CLUB_ID, active: true } },
    });

    if (!dayPlan) {
      const season = await prisma.season.findFirst({
        where: { clubId: CLUB_ID, active: true },
      });
      const systemUser = await prisma.user.findFirst({ where: { clubId: CLUB_ID } });
      if (!season || !systemUser) {
        return NextResponse.json({ error: 'Saison ou utilisateur introuvable' }, { status: 404 });
      }
      dayPlan = await prisma.dayPlan.create({
        data: { date: new Date(date), seasonId: season.id, createdById: systemUser.id },
      });
    }

    const training = await prisma.trainingSession.create({
      data: {
        slot,
        type,
        intensity,
        durationMin: durationMin ?? null,
        dayPlanId: dayPlan.id,
      },
    });

    return NextResponse.json(training, { status: 201 });
  } catch (err) {
    console.error('[POST /api/training]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
