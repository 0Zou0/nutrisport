import { prisma } from '@/lib/prisma';
import { DayData, Training, NutritionalOrientation, DayMenu, MenuOption } from '@/types';
import type {
  TrainingSession, DayOrientation, MenuOption as PrismaMenuOption,
  Recipe, DayPlan,
} from '@prisma/client';

type DayPlanFull = DayPlan & {
  trainings: TrainingSession[];
  orientations: DayOrientation[];
  menu: null | {
    options: (PrismaMenuOption & { recipe: Recipe | null })[];
  };
};

// Mapping Prisma enum → type app
const SLOT_MAP: Record<string, 'morning' | 'afternoon'> = {
  MORNING: 'morning', AFTERNOON: 'afternoon',
};
const INTENSITY_MAP: Record<string, 'low' | 'moderate' | 'high'> = {
  LOW: 'low', MODERATE: 'moderate', HIGH: 'high',
};
const ORIENTATION_MAP: Record<string, NutritionalOrientation> = {
  ANTI_INFLAM:    'ANTI-INFLAM',
  GLUC_MOD:       'GLUC-MOD',
  GLUC_HAUT:      'GLUC-HAUT',
  PROT_BON:       'PROT-BON',
  PROT_MAIGRE:    'PROT-MAIGRE',
  ANTIOXYDANT:    'ANTIOXYDANT',
  VIANDE_BLANCHE: 'VIANDE-BLANCHE',
  GROSSE_MAT:     'GROSSE-MAT',
};

function mapDayPlan(date: string, dayPlan: DayPlanFull): DayData {
  const trainings: Training[] = dayPlan.trainings.map((t: TrainingSession) => ({
    slot:      SLOT_MAP[t.slot],
    type:      t.type,
    intensity: INTENSITY_MAP[t.intensity],
    duration:  t.durationMin ?? undefined,
  }));

  const orientations: NutritionalOrientation[] = dayPlan.orientations.map(
    (o: DayOrientation) => ORIENTATION_MAP[o.orientation]
  );

  const menu: DayMenu = { starters: [], mains: [] };
  if (dayPlan.menu) {
    for (const opt of dayPlan.menu.options) {
      const item: MenuOption = {
        id:          opt.id,
        title:       opt.recipe?.title ?? '',
        description: opt.recipe?.description ?? '',
        available:   opt.available,
        recipeId:    opt.recipeId ?? undefined,
      };
      if (opt.category === 'STARTER') menu.starters.push(item);
      else if (opt.category === 'MAIN') menu.mains.push(item);
    }
  }

  return { date, trainings, orientations, menu };
}

// ─────────────────────────────────────────
// Récupère le DayPlan complet pour une date
// ─────────────────────────────────────────
export async function getDayData(date: string, clubId: string): Promise<DayData | null> {
  const dayPlan = await prisma.dayPlan.findFirst({
    where: {
      date: new Date(date),
      season: { clubId, active: true },
    },
    include: {
      trainings:    { orderBy: { slot: 'asc' } },
      orientations: { orderBy: { priority: 'asc' } },
      menu: {
        include: {
          options: {
            include: { recipe: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  if (!dayPlan) return null;
  return mapDayPlan(date, dayPlan as DayPlanFull);
}

// ─────────────────────────────────────────
// Récupère les données pour une semaine
// ─────────────────────────────────────────
export async function getWeekData(dates: string[], clubId: string): Promise<(DayData | null)[]> {
  const dayPlans = await prisma.dayPlan.findMany({
    where: {
      date: { in: dates.map(d => new Date(d)) },
      season: { clubId, active: true },
    },
    include: {
      trainings:    { orderBy: { slot: 'asc' } },
      orientations: { orderBy: { priority: 'asc' } },
      menu: {
        include: {
          options: {
            include: { recipe: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  return dates.map(date => {
    const dayPlan = dayPlans.find(
      dp => dp.date.toISOString().split('T')[0] === date
    );
    if (!dayPlan) return null;
    return mapDayPlan(date, dayPlan as DayPlanFull);
  });
}

// ─────────────────────────────────────────
// Récupère les données pour un mois entier
// ─────────────────────────────────────────
export async function getMonthData(
  year: number,
  month: number,
  clubId: string
): Promise<Record<string, DayData>> {
  const start = new Date(year, month, 1);
  const end   = new Date(year, month + 1, 0);

  const dayPlans = await prisma.dayPlan.findMany({
    where: {
      date: { gte: start, lte: end },
      season: { clubId, active: true },
    },
    include: {
      trainings:    true,
      orientations: true,
    },
  });

  const result: Record<string, DayData> = {};
  for (const dp of dayPlans) {
    const dateStr = dp.date.toISOString().split('T')[0];
    result[dateStr] = mapDayPlan(dateStr, { ...dp, menu: null } as DayPlanFull);
  }

  return result;
}
