import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CLUB_ID = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';

const ORIENTATION_REVERSE: Record<string, string> = {
  'ANTI-INFLAM':    'ANTI_INFLAM',
  'GLUC-MOD':       'GLUC_MOD',
  'GLUC-HAUT':      'GLUC_HAUT',
  'PROT-BON':       'PROT_BON',
  'PROT-MAIGRE':    'PROT_MAIGRE',
  'ANTIOXYDANT':    'ANTIOXYDANT',
  'VIANDE-BLANCHE': 'VIANDE_BLANCHE',
  'GROSSE-MAT':     'GROSSE_MAT',
};

// PUT /api/orientation?date=YYYY-MM-DD — remplacer toutes les orientations du jour
export async function PUT(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get('date');
    if (!date) return NextResponse.json({ error: 'date requis' }, { status: 400 });

    const { orientations } = await req.json() as { orientations: string[] };

    const dayPlan = await prisma.dayPlan.findFirst({
      where: { date: new Date(date), season: { clubId: CLUB_ID, active: true } },
    });
    if (!dayPlan) return NextResponse.json({ error: 'DayPlan introuvable' }, { status: 404 });

    // Remplace toutes les orientations du jour
    await prisma.dayOrientation.deleteMany({ where: { dayPlanId: dayPlan.id } });

    if (orientations.length > 0) {
      await prisma.dayOrientation.createMany({
        data: orientations.map((o, i) => ({
          orientation: ORIENTATION_REVERSE[o] as never,
          priority: i,
          dayPlanId: dayPlan.id,
        })),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[PUT /api/orientation]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
