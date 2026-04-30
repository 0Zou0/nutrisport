import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_CLUB = process.env.DEFAULT_CLUB_ID ?? 'club-aurillac';

// POST /api/menu-option — crée un slot de menu pour un jour donné
// body: { date: "2026-04-15", category: "STARTER" | "MAIN" | "DESSERT", recipeId?: string }
export async function POST(req: NextRequest) {
  try {
    const { date, category, recipeId } = await req.json();

    if (!date || !category) {
      return NextResponse.json({ error: 'date et category requis' }, { status: 400 });
    }

    // Cherche le DayPlan pour cette date + saison active
    const dayPlan = await prisma.dayPlan.findFirst({
      where: {
        date: new Date(date),
        season: { clubId: DEFAULT_CLUB, active: true },
      },
      include: { menu: true },
    });

    if (!dayPlan) {
      return NextResponse.json({ error: 'Jour introuvable' }, { status: 404 });
    }

    // Crée le DayMenu si absent
    let dayMenuId = dayPlan.menu?.id;
    if (!dayMenuId) {
      const newMenu = await prisma.dayMenu.create({
        data: { dayPlanId: dayPlan.id },
      });
      dayMenuId = newMenu.id;
    }

    // Compte les options existantes pour le sortOrder
    const count = await prisma.menuOption.count({ where: { dayMenuId } });

    const option = await prisma.menuOption.create({
      data: {
        dayMenuId,
        category,
        recipeId: recipeId ?? null,
        sortOrder: count,
      },
      include: { recipe: true },
    });

    return NextResponse.json({
      id:          option.id,
      title:       option.recipe?.title ?? '',
      description: option.recipe?.description ?? '',
      available:   option.available,
      recipeId:    option.recipeId ?? undefined,
      category:    option.category,
    }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/menu-option]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
