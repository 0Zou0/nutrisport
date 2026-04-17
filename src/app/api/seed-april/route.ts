import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TrainingSlot, TrainingIntensity, NutritionalOrientation, MenuCategory } from '@prisma/client';

const SEASON_ID = 'season-2025-2026';
const USER_ID   = 'user-nutri';

type DayConfig = {
  date: string;
  trainings: { id: string; slot: TrainingSlot; type: string; intensity: TrainingIntensity; durationMin: number | null }[];
  orientations: { id: string; orientation: NutritionalOrientation; priority: number }[];
  starters: { id: string; recipeId: string }[];
  mains:    { id: string; recipeId: string }[];
};

const DAYS: DayConfig[] = [
  {
    date: '2026-04-06',
    trainings: [
      { id:'ts-0406a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80 },
      { id:'ts-0406b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.MODERATE, durationMin:90 },
    ],
    orientations: [
      { id:'do-0406a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0406b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0406-s1', recipeId:'std-s1' }, { id:'mo-0406-s2', recipeId:'std-s2' }],
    mains:    [{ id:'mo-0406-m1', recipeId:'std-m1' }, { id:'mo-0406-m2', recipeId:'std-m2' }],
  },
  {
    date: '2026-04-07',
    trainings: [
      { id:'ts-0407a', slot:TrainingSlot.MORNING,   type:'Cardio', intensity:TrainingIntensity.MODERATE, durationMin:50 },
      { id:'ts-0407b', slot:TrainingSlot.AFTERNOON, type:'Repos',  intensity:TrainingIntensity.LOW,      durationMin:null },
    ],
    orientations: [
      { id:'do-0407a', orientation:NutritionalOrientation.ANTI_INFLAM,  priority:0 },
      { id:'do-0407b', orientation:NutritionalOrientation.PROT_MAIGRE,  priority:1 },
    ],
    starters: [{ id:'mo-0407-s1', recipeId:'ai-s1' }, { id:'mo-0407-s2', recipeId:'ai-s3' }],
    mains:    [{ id:'mo-0407-m1', recipeId:'ai-m1' }, { id:'mo-0407-m2', recipeId:'ai-m2' }],
  },
  {
    date: '2026-04-08',
    trainings: [
      { id:'ts-0408a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,  durationMin:40 },
      { id:'ts-0408b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:95 },
    ],
    orientations: [
      { id:'do-0408a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0 },
      { id:'do-0408b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1 },
    ],
    starters: [{ id:'mo-0408-s1', recipeId:'std-s1' }, { id:'mo-0408-s2', recipeId:'std-s3' }],
    mains:    [{ id:'mo-0408-m1', recipeId:'std-m1' }, { id:'mo-0408-m2', recipeId:'std-m3' }],
  },
  {
    date: '2026-04-09',
    trainings: [
      { id:'ts-0409a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH, durationMin:75 },
      { id:'ts-0409b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:90 },
    ],
    orientations: [
      { id:'do-0409a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0409b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0409-s1', recipeId:'md-s2' }, { id:'mo-0409-s2', recipeId:'std-s1' }],
    mains:    [{ id:'mo-0409-m1', recipeId:'md-m1' }, { id:'mo-0409-m2', recipeId:'std-m3' }],
  },
  {
    date: '2026-04-10',
    trainings: [
      { id:'ts-0410a', slot:TrainingSlot.MORNING, type:'Récupération', intensity:TrainingIntensity.LOW, durationMin:30 },
    ],
    orientations: [
      { id:'do-0410a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0410b', orientation:NutritionalOrientation.ANTIOXYDANT, priority:1 },
    ],
    starters: [{ id:'mo-0410-s1', recipeId:'ai-s2' }],
    mains:    [{ id:'mo-0410-m1', recipeId:'ai-m1' }, { id:'mo-0410-m2', recipeId:'ai-m3' }],
  },
  {
    date: '2026-04-11',
    trainings: [
      { id:'ts-0411a', slot:TrainingSlot.AFTERNOON, type:'Match', intensity:TrainingIntensity.HIGH, durationMin:80 },
    ],
    orientations: [
      { id:'do-0411a', orientation:NutritionalOrientation.GROSSE_MAT, priority:0 },
      { id:'do-0411b', orientation:NutritionalOrientation.GLUC_HAUT,  priority:1 },
    ],
    starters: [{ id:'mo-0411-s1', recipeId:'md-s1' }, { id:'mo-0411-s2', recipeId:'md-s2' }],
    mains:    [{ id:'mo-0411-m1', recipeId:'md-m1' }, { id:'mo-0411-m2', recipeId:'md-m2' }],
  },
  {
    date: '2026-04-12',
    trainings: [],
    orientations: [{ id:'do-0412a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 }],
    starters: [{ id:'mo-0412-s1', recipeId:'ai-s3' }],
    mains:    [{ id:'mo-0412-m1', recipeId:'ai-m2' }],
  },
  {
    date: '2026-04-13',
    trainings: [
      { id:'ts-0413a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80 },
      { id:'ts-0413b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.MODERATE, durationMin:85 },
    ],
    orientations: [
      { id:'do-0413a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0413b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0413-s1', recipeId:'std-s2' }, { id:'mo-0413-s2', recipeId:'std-s3' }],
    mains:    [{ id:'mo-0413-m1', recipeId:'std-m1' }, { id:'mo-0413-m2', recipeId:'std-m2' }],
  },
  {
    date: '2026-04-14',
    trainings: [
      { id:'ts-0414a', slot:TrainingSlot.MORNING,   type:'Cardio', intensity:TrainingIntensity.MODERATE, durationMin:45 },
      { id:'ts-0414b', slot:TrainingSlot.AFTERNOON, type:'Repos',  intensity:TrainingIntensity.LOW,      durationMin:null },
    ],
    orientations: [
      { id:'do-0414a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0414b', orientation:NutritionalOrientation.PROT_MAIGRE, priority:1 },
    ],
    starters: [{ id:'mo-0414-s1', recipeId:'ai-s1' }, { id:'mo-0414-s2', recipeId:'ai-s2' }],
    mains:    [{ id:'mo-0414-m1', recipeId:'ai-m2' }, { id:'mo-0414-m2', recipeId:'ai-m3' }],
  },
  {
    date: '2026-04-15',
    trainings: [
      { id:'ts-0415a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,  durationMin:40 },
      { id:'ts-0415b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:90 },
    ],
    orientations: [
      { id:'do-0415a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0 },
      { id:'do-0415b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1 },
    ],
    starters: [{ id:'mo-0415-s1', recipeId:'std-s1' }, { id:'mo-0415-s2', recipeId:'md-s3' }],
    mains:    [{ id:'mo-0415-m1', recipeId:'std-m2' }, { id:'mo-0415-m2', recipeId:'md-m2' }],
  },
  {
    date: '2026-04-16',
    trainings: [
      { id:'ts-0416a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH, durationMin:80 },
      { id:'ts-0416b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:95 },
    ],
    orientations: [
      { id:'do-0416a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0416b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0416-s1', recipeId:'md-s1' }, { id:'mo-0416-s2', recipeId:'std-s2' }],
    mains:    [{ id:'mo-0416-m1', recipeId:'md-m1' }, { id:'mo-0416-m2', recipeId:'std-m3' }],
  },
  {
    date: '2026-04-17',
    trainings: [
      { id:'ts-0417a', slot:TrainingSlot.MORNING, type:'Récupération active', intensity:TrainingIntensity.LOW, durationMin:35 },
    ],
    orientations: [
      { id:'do-0417a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0417b', orientation:NutritionalOrientation.ANTIOXYDANT, priority:1 },
    ],
    starters: [{ id:'mo-0417-s1', recipeId:'ai-s1' }],
    mains:    [{ id:'mo-0417-m1', recipeId:'ai-m1' }, { id:'mo-0417-m2', recipeId:'ai-m2' }],
  },
  {
    date: '2026-04-18',
    trainings: [
      { id:'ts-0418a', slot:TrainingSlot.AFTERNOON, type:'Match', intensity:TrainingIntensity.HIGH, durationMin:80 },
    ],
    orientations: [
      { id:'do-0418a', orientation:NutritionalOrientation.GROSSE_MAT, priority:0 },
      { id:'do-0418b', orientation:NutritionalOrientation.GLUC_HAUT,  priority:1 },
    ],
    starters: [{ id:'mo-0418-s1', recipeId:'md-s1' }, { id:'mo-0418-s2', recipeId:'md-s3' }],
    mains:    [{ id:'mo-0418-m1', recipeId:'md-m1' }, { id:'mo-0418-m2', recipeId:'md-m3' }],
  },
  {
    date: '2026-04-19',
    trainings: [],
    orientations: [{ id:'do-0419a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 }],
    starters: [{ id:'mo-0419-s1', recipeId:'ai-s3' }],
    mains:    [{ id:'mo-0419-m1', recipeId:'ai-m3' }],
  },
  {
    date: '2026-04-20',
    trainings: [
      { id:'ts-0420a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.MODERATE, durationMin:70 },
      { id:'ts-0420b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.MODERATE, durationMin:85 },
    ],
    orientations: [
      { id:'do-0420a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0420b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0420-s1', recipeId:'std-s3' }, { id:'mo-0420-s2', recipeId:'std-s1' }],
    mains:    [{ id:'mo-0420-m1', recipeId:'std-m2' }, { id:'mo-0420-m2', recipeId:'std-m1' }],
  },
  {
    date: '2026-04-21',
    trainings: [
      { id:'ts-0421a', slot:TrainingSlot.MORNING, type:'Cardio', intensity:TrainingIntensity.MODERATE, durationMin:50 },
    ],
    orientations: [
      { id:'do-0421a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0421b', orientation:NutritionalOrientation.PROT_MAIGRE, priority:1 },
    ],
    starters: [{ id:'mo-0421-s1', recipeId:'ai-s2' }],
    mains:    [{ id:'mo-0421-m1', recipeId:'ai-m1' }],
  },
  {
    date: '2026-04-22',
    trainings: [
      { id:'ts-0422a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,  durationMin:40 },
      { id:'ts-0422b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:90 },
    ],
    orientations: [
      { id:'do-0422a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0 },
      { id:'do-0422b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1 },
    ],
    starters: [{ id:'mo-0422-s1', recipeId:'std-s1' }, { id:'mo-0422-s2', recipeId:'std-s2' }],
    mains:    [{ id:'mo-0422-m1', recipeId:'std-m1' }, { id:'mo-0422-m2', recipeId:'std-m3' }],
  },
  {
    date: '2026-04-23',
    trainings: [
      { id:'ts-0423a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH, durationMin:80 },
      { id:'ts-0423b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:95 },
    ],
    orientations: [
      { id:'do-0423a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0423b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0423-s1', recipeId:'md-s2' }, { id:'mo-0423-s2', recipeId:'md-s3' }],
    mains:    [{ id:'mo-0423-m1', recipeId:'md-m1' }, { id:'mo-0423-m2', recipeId:'md-m2' }],
  },
  {
    date: '2026-04-24',
    trainings: [
      { id:'ts-0424a', slot:TrainingSlot.MORNING, type:'Récupération', intensity:TrainingIntensity.LOW, durationMin:30 },
    ],
    orientations: [
      { id:'do-0424a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0424b', orientation:NutritionalOrientation.ANTIOXYDANT, priority:1 },
    ],
    starters: [{ id:'mo-0424-s1', recipeId:'ai-s1' }, { id:'mo-0424-s2', recipeId:'ai-s3' }],
    mains:    [{ id:'mo-0424-m1', recipeId:'ai-m2' }, { id:'mo-0424-m2', recipeId:'ai-m3' }],
  },
  {
    date: '2026-04-25',
    trainings: [
      { id:'ts-0425a', slot:TrainingSlot.AFTERNOON, type:'Match', intensity:TrainingIntensity.HIGH, durationMin:80 },
    ],
    orientations: [
      { id:'do-0425a', orientation:NutritionalOrientation.GROSSE_MAT, priority:0 },
      { id:'do-0425b', orientation:NutritionalOrientation.GLUC_HAUT,  priority:1 },
    ],
    starters: [{ id:'mo-0425-s1', recipeId:'md-s1' }, { id:'mo-0425-s2', recipeId:'md-s2' }],
    mains:    [{ id:'mo-0425-m1', recipeId:'md-m1' }, { id:'mo-0425-m2', recipeId:'md-m3' }],
  },
  {
    date: '2026-04-26',
    trainings: [],
    orientations: [{ id:'do-0426a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 }],
    starters: [{ id:'mo-0426-s1', recipeId:'ai-s1' }],
    mains:    [{ id:'mo-0426-m1', recipeId:'ai-m2' }],
  },
  {
    date: '2026-04-27',
    trainings: [
      { id:'ts-0427a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:75 },
      { id:'ts-0427b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.MODERATE, durationMin:90 },
    ],
    orientations: [
      { id:'do-0427a', orientation:NutritionalOrientation.GLUC_HAUT, priority:0 },
      { id:'do-0427b', orientation:NutritionalOrientation.PROT_BON,  priority:1 },
    ],
    starters: [{ id:'mo-0427-s1', recipeId:'std-s1' }, { id:'mo-0427-s2', recipeId:'std-s3' }],
    mains:    [{ id:'mo-0427-m1', recipeId:'std-m1' }, { id:'mo-0427-m2', recipeId:'std-m2' }],
  },
  {
    date: '2026-04-28',
    trainings: [
      { id:'ts-0428a', slot:TrainingSlot.MORNING,   type:'Cardio', intensity:TrainingIntensity.MODERATE, durationMin:45 },
      { id:'ts-0428b', slot:TrainingSlot.AFTERNOON, type:'Repos',  intensity:TrainingIntensity.LOW,      durationMin:null },
    ],
    orientations: [
      { id:'do-0428a', orientation:NutritionalOrientation.ANTI_INFLAM, priority:0 },
      { id:'do-0428b', orientation:NutritionalOrientation.PROT_MAIGRE, priority:1 },
    ],
    starters: [{ id:'mo-0428-s1', recipeId:'ai-s2' }, { id:'mo-0428-s2', recipeId:'ai-s3' }],
    mains:    [{ id:'mo-0428-m1', recipeId:'ai-m1' }, { id:'mo-0428-m2', recipeId:'ai-m3' }],
  },
  {
    date: '2026-04-29',
    trainings: [
      { id:'ts-0429a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,  durationMin:40 },
      { id:'ts-0429b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.HIGH, durationMin:90 },
    ],
    orientations: [
      { id:'do-0429a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0 },
      { id:'do-0429b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1 },
    ],
    starters: [{ id:'mo-0429-s1', recipeId:'std-s2' }, { id:'mo-0429-s2', recipeId:'md-s3' }],
    mains:    [{ id:'mo-0429-m1', recipeId:'std-m2' }, { id:'mo-0429-m2', recipeId:'md-m2' }],
  },
  {
    date: '2026-04-30',
    trainings: [
      { id:'ts-0430a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.MODERATE, durationMin:70 },
      { id:'ts-0430b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective',  intensity:TrainingIntensity.MODERATE, durationMin:80 },
    ],
    orientations: [
      { id:'do-0430a', orientation:NutritionalOrientation.GLUC_MOD, priority:0 },
      { id:'do-0430b', orientation:NutritionalOrientation.PROT_BON, priority:1 },
    ],
    starters: [{ id:'mo-0430-s1', recipeId:'std-s1' }, { id:'mo-0430-s2', recipeId:'std-s3' }],
    mains:    [{ id:'mo-0430-m1', recipeId:'std-m1' }, { id:'mo-0430-m2', recipeId:'std-m3' }],
  },
];

export async function GET() {
  let inserted = 0;
  const errors: string[] = [];

  for (const day of DAYS) {
    try {
      // 1. Trouver ou créer le DayPlan
      const dp = await prisma.dayPlan.upsert({
        where: { id: `dp-${day.date}` },
        create: {
          id: `dp-${day.date}`,
          date: new Date(day.date + 'T12:00:00Z'),
          seasonId: SEASON_ID,
          createdById: USER_ID,
        },
        update: {},
      });

      // 2. Séances d'entraînement
      for (const t of day.trainings) {
        await prisma.trainingSession.upsert({
          where: { id: t.id },
          create: { ...t, dayPlanId: dp.id },
          update: {},
        });
      }

      // 3. Orientations
      for (const o of day.orientations) {
        await prisma.dayOrientation.upsert({
          where: { id: o.id },
          create: { ...o, dayPlanId: dp.id },
          update: {},
        });
      }

      // 4. Menu du jour
      const dmId = `dm-${day.date.slice(5)}`; // dm-04-06
      const dm = await prisma.dayMenu.upsert({
        where: { id: dmId },
        create: { id: dmId, dayPlanId: dp.id },
        update: {},
      });

      // 5. Options de menu
      for (const s of day.starters) {
        await prisma.menuOption.upsert({
          where: { id: s.id },
          create: { id: s.id, category: MenuCategory.STARTER, available: true, sortOrder: day.starters.indexOf(s), dayMenuId: dm.id, recipeId: s.recipeId },
          update: {},
        });
      }
      for (const m of day.mains) {
        await prisma.menuOption.upsert({
          where: { id: m.id },
          create: { id: m.id, category: MenuCategory.MAIN, available: true, sortOrder: day.mains.indexOf(m), dayMenuId: dm.id, recipeId: m.recipeId },
          update: {},
        });
      }

      inserted++;
    } catch (e) {
      errors.push(`${day.date}: ${String(e).slice(0, 120)}`);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, inserted, errors });
}
