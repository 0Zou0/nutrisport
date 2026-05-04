import { DayData } from '@/types';

const WEEK_MENUS = {
  standard: {
    starters: [
      { id: 'std-s1', title: 'Salade de quinoa', description: 'Quinoa, légumes grillés, vinaigrette citron', available: true, recipeId: 'std-s1' },
      { id: 'std-s2', title: 'Velouté de potiron', description: 'Courge butternut, noix de muscade, crème légère', available: true, recipeId: 'std-s2' },
      { id: 'std-s3', title: 'Carpaccio de betterave', description: 'Betterave rôtie, chèvre frais, graines de tournesol', available: true, recipeId: 'std-s3' },
    ],
    mains: [
      { id: 'std-m1', title: 'Poulet rôti patates douces', description: 'Filet de poulet fermier, patates douces rôties, haricots verts', available: true, recipeId: 'std-m1' },
      { id: 'std-m2', title: 'Saumon grillé riz complet', description: 'Pavé de saumon, riz complet, brocolis vapeur', available: true, recipeId: 'std-m2' },
      { id: 'std-m3', title: 'Pâtes bolognaise sport', description: 'Pâtes semi-complètes, bœuf haché maigre, tomates fraîches', available: true, recipeId: 'std-m3' },
    ],
    desserts: [],
  },
  antiInflam: {
    starters: [
      { id: 'ai-s1', title: 'Smoothie vert anti-inflammatoire', description: 'Épinards, concombre, gingembre, citron vert', available: true, recipeId: 'ai-s1' },
      { id: 'ai-s2', title: 'Tartare de thon', description: 'Thon frais, avocat, sésame, sauce soja légère', available: true, recipeId: 'ai-s2' },
      { id: 'ai-s3', title: 'Salade de mâche grenade', description: 'Mâche, grenade, noix, vinaigrette tumérique', available: true, recipeId: 'ai-s3' },
    ],
    mains: [
      { id: 'ai-m1', title: 'Saumon avocat quinoa', description: 'Saumon sauvage, quinoa noir, avocat, épinards', available: true, recipeId: 'ai-m1' },
      { id: 'ai-m2', title: 'Poulet curcuma légumes colorés', description: 'Poulet mariné curcuma-gingembre, légumes colorés', available: true, recipeId: 'ai-m2' },
      { id: 'ai-m3', title: 'Bowl végétarien complet', description: 'Pois chiches rôtis, patate douce, chou rouge, tahini', available: true, recipeId: 'ai-m3' },
    ],
    desserts: [],
  },
  matchDay: {
    starters: [
      { id: 'md-s1', title: 'Riz au lait protéiné', description: 'Riz complet, lait d\'amande, cannelle, miel', available: true, recipeId: 'md-s1' },
      { id: 'md-s2', title: 'Soupe de légumineuses', description: 'Lentilles corail, tomates, épices douces', available: true, recipeId: 'md-s2' },
      { id: 'md-s3', title: 'Tartines complètes œufs pochés avocat', description: 'Pain complet, œufs pochés, avocat, graines chia', available: true, recipeId: 'md-s3' },
    ],
    mains: [
      { id: 'md-m1', title: 'Pâtes poulet sauce tomate', description: 'Pâtes complètes, blanc de poulet, sauce tomate maison', available: true, recipeId: 'md-m1' },
      { id: 'md-m2', title: 'Risotto jambon herbes', description: 'Riz arborio, jambon blanc, parmesan léger, herbes', available: true, recipeId: 'md-m2' },
      { id: 'md-m3', title: 'Burger sport maison', description: 'Pain complet, steak haché 5% MG, légumes, sauce yaourt', available: true, recipeId: 'md-m3' },
    ],
    desserts: [],
  },
};

const mockDays: DayData[] = [
  // --- Semaine du 16 mars ---
  {
    date: '2026-03-16',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'high', duration: 75 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'moderate', duration: 90 },
    ],
    orientations: ['GLUC-HAUT', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-17',
    trainings: [
      { slot: 'morning', type: 'Cardio', intensity: 'moderate', duration: 45 },
      { slot: 'afternoon', type: 'Repos', intensity: 'low' },
    ],
    orientations: ['ANTI-INFLAM', 'PROT-MAIGRE'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    date: '2026-03-18',
    trainings: [
      { slot: 'morning', type: 'Mobilité', intensity: 'low', duration: 40 },
      { slot: 'afternoon', type: 'Musculation', intensity: 'high', duration: 75 },
    ],
    orientations: ['GLUC-MOD', 'VIANDE-BLANCHE'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-19',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'high', duration: 75 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'high', duration: 90 },
    ],
    orientations: ['GLUC-HAUT', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-20',
    trainings: [
      { slot: 'morning', type: 'Récupération', intensity: 'low', duration: 30 },
    ],
    orientations: ['ANTI-INFLAM', 'ANTIOXYDANT'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    date: '2026-03-21',
    trainings: [
      { slot: 'afternoon', type: 'Match', intensity: 'high', duration: 80 },
    ],
    orientations: ['GROSSE-MAT', 'GLUC-HAUT'],
    menu: WEEK_MENUS.matchDay,
  },
  {
    date: '2026-03-22',
    trainings: [],
    orientations: ['ANTI-INFLAM'],
    menu: WEEK_MENUS.antiInflam,
  },

  // --- Semaine du 23 mars (semaine courante) ---
  {
    date: '2026-03-23',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'high', duration: 75 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'moderate', duration: 90 },
    ],
    orientations: ['GLUC-HAUT', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-24',
    trainings: [
      { slot: 'morning', type: 'Cardio', intensity: 'moderate', duration: 50 },
      { slot: 'afternoon', type: 'Repos', intensity: 'low' },
    ],
    orientations: ['ANTI-INFLAM', 'PROT-MAIGRE'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    // AUJOURD'HUI — 25 mars 2026
    date: '2026-03-25',
    trainings: [
      { slot: 'morning', type: 'Mobilité', intensity: 'low', duration: 40 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'high', duration: 95 },
    ],
    orientations: ['GLUC-MOD', 'VIANDE-BLANCHE'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-26',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'high', duration: 80 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'high', duration: 95 },
    ],
    orientations: ['GLUC-HAUT', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-27',
    trainings: [
      { slot: 'morning', type: 'Récupération', intensity: 'low', duration: 30 },
    ],
    orientations: ['ANTI-INFLAM', 'ANTIOXYDANT'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    date: '2026-03-28',
    trainings: [
      { slot: 'afternoon', type: 'Match', intensity: 'high', duration: 80 },
    ],
    orientations: ['GROSSE-MAT', 'GLUC-HAUT'],
    menu: WEEK_MENUS.matchDay,
  },
  {
    date: '2026-03-29',
    trainings: [],
    orientations: ['ANTI-INFLAM'],
    menu: WEEK_MENUS.antiInflam,
  },

  // --- Semaine du 30 mars ---
  {
    date: '2026-03-30',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'moderate', duration: 70 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'moderate', duration: 85 },
    ],
    orientations: ['GLUC-MOD', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-03-31',
    trainings: [
      { slot: 'morning', type: 'Cardio', intensity: 'moderate', duration: 45 },
    ],
    orientations: ['ANTI-INFLAM', 'PROT-MAIGRE'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    date: '2026-04-01',
    trainings: [
      { slot: 'morning', type: 'Mobilité', intensity: 'low', duration: 35 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'high', duration: 95 },
    ],
    orientations: ['GLUC-MOD', 'VIANDE-BLANCHE'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-04-02',
    trainings: [
      { slot: 'morning', type: 'Musculation', intensity: 'high', duration: 80 },
      { slot: 'afternoon', type: 'Rugby — séance collective', intensity: 'high', duration: 90 },
    ],
    orientations: ['GLUC-HAUT', 'PROT-BON'],
    menu: WEEK_MENUS.standard,
  },
  {
    date: '2026-04-03',
    trainings: [
      { slot: 'morning', type: 'Récupération active', intensity: 'low', duration: 30 },
    ],
    orientations: ['ANTI-INFLAM', 'ANTIOXYDANT'],
    menu: WEEK_MENUS.antiInflam,
  },
  {
    date: '2026-04-04',
    trainings: [
      { slot: 'afternoon', type: 'Match', intensity: 'high', duration: 80 },
    ],
    orientations: ['GROSSE-MAT', 'GLUC-HAUT'],
    menu: WEEK_MENUS.matchDay,
  },
  {
    date: '2026-04-05',
    trainings: [],
    orientations: ['ANTI-INFLAM'],
    menu: WEEK_MENUS.antiInflam,
  },
];

const mockDataMap: Record<string, DayData> = {};
mockDays.forEach(day => {
  mockDataMap[day.date] = day;
});

export function getDayData(date: string): DayData | null {
  return mockDataMap[date] ?? null;
}

export function getWeekData(dates: string[]): (DayData | null)[] {
  return dates.map(d => mockDataMap[d] ?? null);
}

export function getMonthData(year: number, month: number): Record<string, DayData> {
  const result: Record<string, DayData> = {};
  Object.entries(mockDataMap).forEach(([date, data]) => {
    const d = new Date(date + 'T00:00:00');
    if (d.getFullYear() === year && d.getMonth() === month) {
      result[date] = data;
    }
  });
  return result;
}
