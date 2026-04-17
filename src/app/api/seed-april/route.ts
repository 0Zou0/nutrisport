import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TrainingSlot, TrainingIntensity, NutritionalOrientation, MenuCategory } from '@prisma/client';

const SEASON_ID = 'season-2025-2026';
const USER_ID = 'user-nutri';

const days = [
  '2026-04-06','2026-04-07','2026-04-08','2026-04-09','2026-04-10',
  '2026-04-11','2026-04-12','2026-04-13','2026-04-14','2026-04-15',
  '2026-04-16','2026-04-17','2026-04-18','2026-04-19','2026-04-20',
  '2026-04-21','2026-04-22','2026-04-23','2026-04-24','2026-04-25',
  '2026-04-26','2026-04-27','2026-04-28','2026-04-29','2026-04-30',
];

function dpId(d: string) { return `dp-${d}`; }
function dmId(d: string) { return `dm-${d.slice(5)}`; } // dm-04-06

export async function GET() {
  try {
    // ── 1. DayPlans ─────────────────────────────────────────────
    await prisma.dayPlan.createMany({
      data: days.map(d => ({
        id: dpId(d),
        date: new Date(d + 'T12:00:00Z'),
        seasonId: SEASON_ID,
        createdById: USER_ID,
      })),
      skipDuplicates: true,
    });

    // ── 2. TrainingSessions ──────────────────────────────────────
    await prisma.trainingSession.createMany({
      skipDuplicates: true,
      data: [
        { id:'ts-0406a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-06') },
        { id:'ts-0406b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.MODERATE, durationMin:90, dayPlanId:dpId('2026-04-06') },
        { id:'ts-0407a', slot:TrainingSlot.MORNING,   type:'Cardio',                    intensity:TrainingIntensity.MODERATE, durationMin:50, dayPlanId:dpId('2026-04-07') },
        { id:'ts-0407b', slot:TrainingSlot.AFTERNOON, type:'Repos',                     intensity:TrainingIntensity.LOW,      durationMin:null, dayPlanId:dpId('2026-04-07') },
        { id:'ts-0408a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,      durationMin:40, dayPlanId:dpId('2026-04-08') },
        { id:'ts-0408b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:95, dayPlanId:dpId('2026-04-08') },
        { id:'ts-0409a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:75, dayPlanId:dpId('2026-04-09') },
        { id:'ts-0409b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:90, dayPlanId:dpId('2026-04-09') },
        { id:'ts-0410a', slot:TrainingSlot.MORNING,   type:'Récupération',              intensity:TrainingIntensity.LOW,      durationMin:30, dayPlanId:dpId('2026-04-10') },
        { id:'ts-0411a', slot:TrainingSlot.AFTERNOON, type:'Match',                     intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-11') },
        { id:'ts-0413a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-13') },
        { id:'ts-0413b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.MODERATE, durationMin:85, dayPlanId:dpId('2026-04-13') },
        { id:'ts-0414a', slot:TrainingSlot.MORNING,   type:'Cardio',                    intensity:TrainingIntensity.MODERATE, durationMin:45, dayPlanId:dpId('2026-04-14') },
        { id:'ts-0414b', slot:TrainingSlot.AFTERNOON, type:'Repos',                     intensity:TrainingIntensity.LOW,      durationMin:null, dayPlanId:dpId('2026-04-14') },
        { id:'ts-0415a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,      durationMin:40, dayPlanId:dpId('2026-04-15') },
        { id:'ts-0415b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:90, dayPlanId:dpId('2026-04-15') },
        { id:'ts-0416a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-16') },
        { id:'ts-0416b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:95, dayPlanId:dpId('2026-04-16') },
        { id:'ts-0417a', slot:TrainingSlot.MORNING,   type:'Récupération active',       intensity:TrainingIntensity.LOW,      durationMin:35, dayPlanId:dpId('2026-04-17') },
        { id:'ts-0418a', slot:TrainingSlot.AFTERNOON, type:'Match',                     intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-18') },
        { id:'ts-0420a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.MODERATE, durationMin:70, dayPlanId:dpId('2026-04-20') },
        { id:'ts-0420b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.MODERATE, durationMin:85, dayPlanId:dpId('2026-04-20') },
        { id:'ts-0421a', slot:TrainingSlot.MORNING,   type:'Cardio',                    intensity:TrainingIntensity.MODERATE, durationMin:50, dayPlanId:dpId('2026-04-21') },
        { id:'ts-0422a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,      durationMin:40, dayPlanId:dpId('2026-04-22') },
        { id:'ts-0422b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:90, dayPlanId:dpId('2026-04-22') },
        { id:'ts-0423a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-23') },
        { id:'ts-0423b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:95, dayPlanId:dpId('2026-04-23') },
        { id:'ts-0424a', slot:TrainingSlot.MORNING,   type:'Récupération',              intensity:TrainingIntensity.LOW,      durationMin:30, dayPlanId:dpId('2026-04-24') },
        { id:'ts-0425a', slot:TrainingSlot.AFTERNOON, type:'Match',                     intensity:TrainingIntensity.HIGH,     durationMin:80, dayPlanId:dpId('2026-04-25') },
        { id:'ts-0427a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.HIGH,     durationMin:75, dayPlanId:dpId('2026-04-27') },
        { id:'ts-0427b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.MODERATE, durationMin:90, dayPlanId:dpId('2026-04-27') },
        { id:'ts-0428a', slot:TrainingSlot.MORNING,   type:'Cardio',                    intensity:TrainingIntensity.MODERATE, durationMin:45, dayPlanId:dpId('2026-04-28') },
        { id:'ts-0428b', slot:TrainingSlot.AFTERNOON, type:'Repos',                     intensity:TrainingIntensity.LOW,      durationMin:null, dayPlanId:dpId('2026-04-28') },
        { id:'ts-0429a', slot:TrainingSlot.MORNING,   type:'Mobilité',                  intensity:TrainingIntensity.LOW,      durationMin:40, dayPlanId:dpId('2026-04-29') },
        { id:'ts-0429b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.HIGH,     durationMin:90, dayPlanId:dpId('2026-04-29') },
        { id:'ts-0430a', slot:TrainingSlot.MORNING,   type:'Musculation',               intensity:TrainingIntensity.MODERATE, durationMin:70, dayPlanId:dpId('2026-04-30') },
        { id:'ts-0430b', slot:TrainingSlot.AFTERNOON, type:'Rugby — séance collective', intensity:TrainingIntensity.MODERATE, durationMin:80, dayPlanId:dpId('2026-04-30') },
      ],
    });

    // ── 3. DayOrientations ───────────────────────────────────────
    await prisma.dayOrientation.createMany({
      skipDuplicates: true,
      data: [
        { id:'do-0406a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-06') },
        { id:'do-0406b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-06') },
        { id:'do-0407a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-07') },
        { id:'do-0407b', orientation:NutritionalOrientation.PROT_MAIGRE,    priority:1, dayPlanId:dpId('2026-04-07') },
        { id:'do-0408a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0, dayPlanId:dpId('2026-04-08') },
        { id:'do-0408b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1, dayPlanId:dpId('2026-04-08') },
        { id:'do-0409a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-09') },
        { id:'do-0409b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-09') },
        { id:'do-0410a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-10') },
        { id:'do-0410b', orientation:NutritionalOrientation.ANTIOXYDANT,    priority:1, dayPlanId:dpId('2026-04-10') },
        { id:'do-0411a', orientation:NutritionalOrientation.GROSSE_MAT,     priority:0, dayPlanId:dpId('2026-04-11') },
        { id:'do-0411b', orientation:NutritionalOrientation.GLUC_HAUT,      priority:1, dayPlanId:dpId('2026-04-11') },
        { id:'do-0412a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-12') },
        { id:'do-0413a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-13') },
        { id:'do-0413b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-13') },
        { id:'do-0414a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-14') },
        { id:'do-0414b', orientation:NutritionalOrientation.PROT_MAIGRE,    priority:1, dayPlanId:dpId('2026-04-14') },
        { id:'do-0415a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0, dayPlanId:dpId('2026-04-15') },
        { id:'do-0415b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1, dayPlanId:dpId('2026-04-15') },
        { id:'do-0416a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-16') },
        { id:'do-0416b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-16') },
        { id:'do-0417a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-17') },
        { id:'do-0417b', orientation:NutritionalOrientation.ANTIOXYDANT,    priority:1, dayPlanId:dpId('2026-04-17') },
        { id:'do-0418a', orientation:NutritionalOrientation.GROSSE_MAT,     priority:0, dayPlanId:dpId('2026-04-18') },
        { id:'do-0418b', orientation:NutritionalOrientation.GLUC_HAUT,      priority:1, dayPlanId:dpId('2026-04-18') },
        { id:'do-0419a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-19') },
        { id:'do-0420a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-20') },
        { id:'do-0420b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-20') },
        { id:'do-0421a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-21') },
        { id:'do-0421b', orientation:NutritionalOrientation.PROT_MAIGRE,    priority:1, dayPlanId:dpId('2026-04-21') },
        { id:'do-0422a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0, dayPlanId:dpId('2026-04-22') },
        { id:'do-0422b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1, dayPlanId:dpId('2026-04-22') },
        { id:'do-0423a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-23') },
        { id:'do-0423b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-23') },
        { id:'do-0424a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-24') },
        { id:'do-0424b', orientation:NutritionalOrientation.ANTIOXYDANT,    priority:1, dayPlanId:dpId('2026-04-24') },
        { id:'do-0425a', orientation:NutritionalOrientation.GROSSE_MAT,     priority:0, dayPlanId:dpId('2026-04-25') },
        { id:'do-0425b', orientation:NutritionalOrientation.GLUC_HAUT,      priority:1, dayPlanId:dpId('2026-04-25') },
        { id:'do-0426a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-26') },
        { id:'do-0427a', orientation:NutritionalOrientation.GLUC_HAUT,      priority:0, dayPlanId:dpId('2026-04-27') },
        { id:'do-0427b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-27') },
        { id:'do-0428a', orientation:NutritionalOrientation.ANTI_INFLAM,    priority:0, dayPlanId:dpId('2026-04-28') },
        { id:'do-0428b', orientation:NutritionalOrientation.PROT_MAIGRE,    priority:1, dayPlanId:dpId('2026-04-28') },
        { id:'do-0429a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0, dayPlanId:dpId('2026-04-29') },
        { id:'do-0429b', orientation:NutritionalOrientation.VIANDE_BLANCHE, priority:1, dayPlanId:dpId('2026-04-29') },
        { id:'do-0430a', orientation:NutritionalOrientation.GLUC_MOD,       priority:0, dayPlanId:dpId('2026-04-30') },
        { id:'do-0430b', orientation:NutritionalOrientation.PROT_BON,       priority:1, dayPlanId:dpId('2026-04-30') },
      ],
    });

    // ── 4. DayMenus ──────────────────────────────────────────────
    await prisma.dayMenu.createMany({
      data: days.map(d => ({ id: dmId(d), dayPlanId: dpId(d) })),
      skipDuplicates: true,
    });

    // ── 5. MenuOptions ────────────────────────────────────────────
    await prisma.menuOption.createMany({
      skipDuplicates: true,
      data: [
        // 6 avr — standard
        { id:'mo-0406-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-06'), recipeId:'std-s1' },
        { id:'mo-0406-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-06'), recipeId:'std-s2' },
        { id:'mo-0406-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-06'), recipeId:'std-m1' },
        { id:'mo-0406-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-06'), recipeId:'std-m2' },
        // 7 avr — anti-inflam
        { id:'mo-0407-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-07'), recipeId:'ai-s1' },
        { id:'mo-0407-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-07'), recipeId:'ai-s3' },
        { id:'mo-0407-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-07'), recipeId:'ai-m1' },
        { id:'mo-0407-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-07'), recipeId:'ai-m2' },
        // 8 avr — standard
        { id:'mo-0408-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-08'), recipeId:'std-s1' },
        { id:'mo-0408-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-08'), recipeId:'std-s3' },
        { id:'mo-0408-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-08'), recipeId:'std-m1' },
        { id:'mo-0408-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-08'), recipeId:'std-m3' },
        // 9 avr — pré-match
        { id:'mo-0409-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-09'), recipeId:'md-s2' },
        { id:'mo-0409-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-09'), recipeId:'std-s1' },
        { id:'mo-0409-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-09'), recipeId:'md-m1' },
        { id:'mo-0409-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-09'), recipeId:'std-m3' },
        // 10 avr — veille match
        { id:'mo-0410-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-10'), recipeId:'ai-s2' },
        { id:'mo-0410-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-10'), recipeId:'ai-m1' },
        { id:'mo-0410-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-10'), recipeId:'ai-m3' },
        // 11 avr — MATCH
        { id:'mo-0411-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-11'), recipeId:'md-s1' },
        { id:'mo-0411-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-11'), recipeId:'md-s2' },
        { id:'mo-0411-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-11'), recipeId:'md-m1' },
        { id:'mo-0411-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-11'), recipeId:'md-m2' },
        // 12 avr — récup
        { id:'mo-0412-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-12'), recipeId:'ai-s3' },
        { id:'mo-0412-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-12'), recipeId:'ai-m2' },
        // 13 avr — standard
        { id:'mo-0413-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-13'), recipeId:'std-s2' },
        { id:'mo-0413-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-13'), recipeId:'std-s3' },
        { id:'mo-0413-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-13'), recipeId:'std-m1' },
        { id:'mo-0413-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-13'), recipeId:'std-m2' },
        // 14 avr — anti-inflam
        { id:'mo-0414-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-14'), recipeId:'ai-s1' },
        { id:'mo-0414-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-14'), recipeId:'ai-s2' },
        { id:'mo-0414-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-14'), recipeId:'ai-m2' },
        { id:'mo-0414-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-14'), recipeId:'ai-m3' },
        // 15 avr — standard
        { id:'mo-0415-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-15'), recipeId:'std-s1' },
        { id:'mo-0415-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-15'), recipeId:'md-s3' },
        { id:'mo-0415-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-15'), recipeId:'std-m2' },
        { id:'mo-0415-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-15'), recipeId:'md-m2' },
        // 16 avr — pré-match
        { id:'mo-0416-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-16'), recipeId:'md-s1' },
        { id:'mo-0416-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-16'), recipeId:'std-s2' },
        { id:'mo-0416-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-16'), recipeId:'md-m1' },
        { id:'mo-0416-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-16'), recipeId:'std-m3' },
        // 17 avr — veille match
        { id:'mo-0417-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-17'), recipeId:'ai-s1' },
        { id:'mo-0417-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-17'), recipeId:'ai-m1' },
        { id:'mo-0417-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-17'), recipeId:'ai-m2' },
        // 18 avr — MATCH
        { id:'mo-0418-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-18'), recipeId:'md-s1' },
        { id:'mo-0418-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-18'), recipeId:'md-s3' },
        { id:'mo-0418-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-18'), recipeId:'md-m1' },
        { id:'mo-0418-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-18'), recipeId:'md-m3' },
        // 19 avr — récup
        { id:'mo-0419-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-19'), recipeId:'ai-s3' },
        { id:'mo-0419-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-19'), recipeId:'ai-m3' },
        // 20 avr — modéré
        { id:'mo-0420-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-20'), recipeId:'std-s3' },
        { id:'mo-0420-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-20'), recipeId:'std-s1' },
        { id:'mo-0420-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-20'), recipeId:'std-m2' },
        { id:'mo-0420-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-20'), recipeId:'std-m1' },
        // 21 avr — cardio
        { id:'mo-0421-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-21'), recipeId:'ai-s2' },
        { id:'mo-0421-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-21'), recipeId:'ai-m1' },
        // 22 avr — standard
        { id:'mo-0422-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-22'), recipeId:'std-s1' },
        { id:'mo-0422-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-22'), recipeId:'std-s2' },
        { id:'mo-0422-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-22'), recipeId:'std-m1' },
        { id:'mo-0422-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-22'), recipeId:'std-m3' },
        // 23 avr — pré-match
        { id:'mo-0423-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-23'), recipeId:'md-s2' },
        { id:'mo-0423-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-23'), recipeId:'md-s3' },
        { id:'mo-0423-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-23'), recipeId:'md-m1' },
        { id:'mo-0423-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-23'), recipeId:'md-m2' },
        // 24 avr — veille match
        { id:'mo-0424-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-24'), recipeId:'ai-s1' },
        { id:'mo-0424-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-24'), recipeId:'ai-s3' },
        { id:'mo-0424-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-24'), recipeId:'ai-m2' },
        { id:'mo-0424-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-24'), recipeId:'ai-m3' },
        // 25 avr — MATCH
        { id:'mo-0425-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-25'), recipeId:'md-s1' },
        { id:'mo-0425-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-25'), recipeId:'md-s2' },
        { id:'mo-0425-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-25'), recipeId:'md-m1' },
        { id:'mo-0425-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-25'), recipeId:'md-m3' },
        // 26 avr — récup
        { id:'mo-0426-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-26'), recipeId:'ai-s1' },
        { id:'mo-0426-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-26'), recipeId:'ai-m2' },
        // 27 avr — standard
        { id:'mo-0427-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-27'), recipeId:'std-s1' },
        { id:'mo-0427-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-27'), recipeId:'std-s3' },
        { id:'mo-0427-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-27'), recipeId:'std-m1' },
        { id:'mo-0427-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-27'), recipeId:'std-m2' },
        // 28 avr — anti-inflam
        { id:'mo-0428-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-28'), recipeId:'ai-s2' },
        { id:'mo-0428-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-28'), recipeId:'ai-s3' },
        { id:'mo-0428-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-28'), recipeId:'ai-m1' },
        { id:'mo-0428-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-28'), recipeId:'ai-m3' },
        // 29 avr — technique
        { id:'mo-0429-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-29'), recipeId:'std-s2' },
        { id:'mo-0429-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-29'), recipeId:'md-s3' },
        { id:'mo-0429-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-29'), recipeId:'std-m2' },
        { id:'mo-0429-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-29'), recipeId:'md-m2' },
        // 30 avr — fin de mois
        { id:'mo-0430-s1', category:MenuCategory.STARTER, available:true, sortOrder:0, dayMenuId:dmId('2026-04-30'), recipeId:'std-s1' },
        { id:'mo-0430-s2', category:MenuCategory.STARTER, available:true, sortOrder:1, dayMenuId:dmId('2026-04-30'), recipeId:'std-s3' },
        { id:'mo-0430-m1', category:MenuCategory.MAIN,    available:true, sortOrder:0, dayMenuId:dmId('2026-04-30'), recipeId:'std-m1' },
        { id:'mo-0430-m2', category:MenuCategory.MAIN,    available:true, sortOrder:1, dayMenuId:dmId('2026-04-30'), recipeId:'std-m3' },
      ],
    });

    return NextResponse.json({ ok: true, message: 'Avril 2026 (6→30) seedé avec succès !' });
  } catch (err) {
    console.error('[seed-april]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
