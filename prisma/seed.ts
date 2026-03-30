import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding NutriSport database...');

  // ─── Club ────────────────────────────────────────
  const club = await prisma.club.upsert({
    where:  { id: 'club-aurillac' },
    update: {},
    create: {
      id:    'club-aurillac',
      name:  'Stade Aurillacois',
      sport: 'rugby',
    },
  });
  console.log('✅ Club:', club.name);

  // ─── Utilisateurs ───────────────────────────────
  const users = await Promise.all([
    prisma.user.upsert({
      where:  { email: 'cook@nutrisport.fr' },
      update: {},
      create: { id: 'user-cook', email: 'cook@nutrisport.fr', name: 'Marie Dupont', role: 'COOK', clubId: club.id },
    }),
    prisma.user.upsert({
      where:  { email: 'coach@nutrisport.fr' },
      update: {},
      create: { id: 'user-coach', email: 'coach@nutrisport.fr', name: 'Pierre Martin', role: 'COACH', clubId: club.id },
    }),
    prisma.user.upsert({
      where:  { email: 'player@nutrisport.fr' },
      update: {},
      create: { id: 'user-player', email: 'player@nutrisport.fr', name: 'Lucas Bernard', role: 'PLAYER', clubId: club.id },
    }),
    prisma.user.upsert({
      where:  { email: 'nutri@nutrisport.fr' },
      update: {},
      create: { id: 'user-nutri', email: 'nutri@nutrisport.fr', name: 'Sophie Leroy', role: 'NUTRITIONIST', clubId: club.id },
    }),
  ]);
  console.log('✅ Utilisateurs créés:', users.length);

  // ─── Saison ─────────────────────────────────────
  const season = await prisma.season.upsert({
    where:  { id: 'season-2025-2026' },
    update: {},
    create: {
      id:        'season-2025-2026',
      name:      'Saison 2025-2026',
      startDate: new Date('2025-09-01'),
      endDate:   new Date('2026-06-30'),
      active:    true,
      clubId:    club.id,
    },
  });
  console.log('✅ Saison:', season.name);

  // ─── Recettes ───────────────────────────────────
  const recipeData = [
    {
      id: 'std-s1', title: 'Salade de quinoa', description: 'Quinoa, légumes grillés, vinaigrette citron',
      category: 'STARTER' as const, difficulty: 'EASY' as const,
      prepTimeMin: 15, cookTimeMin: 20, servings: 4,
      ingredients: [
        { name: 'Quinoa', quantity: 200, unit: 'g', sortOrder: 1 },
        { name: 'Courgette', quantity: 1, unit: 'unité', sortOrder: 2 },
        { name: 'Poivron rouge', quantity: 1, unit: 'unité', sortOrder: 3 },
        { name: 'Citron', quantity: 1, unit: 'unité', sortOrder: 4 },
        { name: 'Huile d\'olive', quantity: 3, unit: 'c. à soupe', sortOrder: 5 },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Rincer le quinoa et le cuire 15 min dans 400ml d\'eau salée.' },
        { stepNumber: 2, instruction: 'Griller les légumes coupés en dés à la poêle avec un filet d\'huile.' },
        { stepNumber: 3, instruction: 'Mélanger quinoa refroidi, légumes, jus de citron et huile d\'olive.' },
      ],
      nutrition: { calories: 280, protein: 12, carbs: 42, fat: 8, fiber: 5 },
      tags: ['végétarien', 'sans gluten', 'riche en protéines'],
      orientations: ['GLUC_MOD', 'PROT_BON'],
    },
    {
      id: 'std-m1', title: 'Poulet rôti patates douces', description: 'Filet de poulet fermier, patates douces rôties, haricots verts',
      category: 'MAIN' as const, difficulty: 'EASY' as const,
      prepTimeMin: 10, cookTimeMin: 35, servings: 4,
      ingredients: [
        { name: 'Filet de poulet', quantity: 600, unit: 'g', sortOrder: 1 },
        { name: 'Patate douce', quantity: 500, unit: 'g', sortOrder: 2 },
        { name: 'Haricots verts', quantity: 300, unit: 'g', sortOrder: 3 },
        { name: 'Huile d\'olive', quantity: 2, unit: 'c. à soupe', sortOrder: 4 },
        { name: 'Herbes de Provence', quantity: 1, unit: 'c. à café', sortOrder: 5 },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Préchauffer le four à 200°C.' },
        { stepNumber: 2, instruction: 'Couper les patates douces en cubes, assaisonner et enfourner 25 min.' },
        { stepNumber: 3, instruction: 'Poêler les filets de poulet 6 min de chaque côté.' },
        { stepNumber: 4, instruction: 'Cuire les haricots verts à la vapeur 8 min. Servir ensemble.' },
      ],
      nutrition: { calories: 420, protein: 42, carbs: 38, fat: 10, fiber: 6 },
      tags: ['sans gluten', 'riche en protéines', 'faible en matières grasses'],
      orientations: ['GLUC_MOD', 'PROT_BON', 'VIANDE_BLANCHE'],
    },
    {
      id: 'std-m2', title: 'Saumon grillé riz complet', description: 'Pavé de saumon, riz complet, brocolis vapeur',
      category: 'MAIN' as const, difficulty: 'EASY' as const,
      prepTimeMin: 10, cookTimeMin: 25, servings: 4,
      ingredients: [
        { name: 'Pavé de saumon', quantity: 600, unit: 'g', sortOrder: 1 },
        { name: 'Riz complet', quantity: 300, unit: 'g', sortOrder: 2 },
        { name: 'Brocoli', quantity: 400, unit: 'g', sortOrder: 3 },
        { name: 'Citron', quantity: 1, unit: 'unité', sortOrder: 4 },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Cuire le riz complet 20 min.' },
        { stepNumber: 2, instruction: 'Cuire les brocolis à la vapeur 8 min.' },
        { stepNumber: 3, instruction: 'Griller les pavés de saumon 4 min par côté. Servir avec citron.' },
      ],
      nutrition: { calories: 480, protein: 45, carbs: 40, fat: 14, fiber: 4 },
      tags: ['oméga-3', 'sans gluten', 'anti-inflammatoire'],
      orientations: ['ANTI_INFLAM', 'PROT_BON', 'GROSSE_MAT'],
    },
    {
      id: 'ai-m1', title: 'Saumon avocat quinoa', description: 'Saumon sauvage, quinoa noir, avocat, épinards',
      category: 'MAIN' as const, difficulty: 'MEDIUM' as const,
      prepTimeMin: 15, cookTimeMin: 20, servings: 4,
      ingredients: [
        { name: 'Saumon sauvage', quantity: 600, unit: 'g', sortOrder: 1 },
        { name: 'Quinoa noir', quantity: 240, unit: 'g', sortOrder: 2 },
        { name: 'Avocat', quantity: 2, unit: 'unité', sortOrder: 3 },
        { name: 'Épinards frais', quantity: 200, unit: 'g', sortOrder: 4 },
        { name: 'Gingembre frais', quantity: 10, unit: 'g', sortOrder: 5 },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Cuire le quinoa noir 15 min.' },
        { stepNumber: 2, instruction: 'Poêler le saumon avec gingembre râpé, 4 min par côté.' },
        { stepNumber: 3, instruction: 'Dresser quinoa, épinards, avocat tranché et saumon.' },
      ],
      nutrition: { calories: 520, protein: 46, carbs: 38, fat: 18, fiber: 7 },
      tags: ['oméga-3', 'anti-inflammatoire', 'sans gluten'],
      orientations: ['ANTI_INFLAM', 'PROT_BON', 'GROSSE_MAT'],
    },
    {
      id: 'md-m1', title: 'Pâtes poulet sauce tomate', description: 'Pâtes complètes, blanc de poulet, sauce tomate maison',
      category: 'MAIN' as const, difficulty: 'EASY' as const,
      prepTimeMin: 10, cookTimeMin: 20, servings: 4,
      ingredients: [
        { name: 'Pâtes complètes', quantity: 400, unit: 'g', sortOrder: 1 },
        { name: 'Blanc de poulet', quantity: 500, unit: 'g', sortOrder: 2 },
        { name: 'Tomates concassées', quantity: 400, unit: 'g', sortOrder: 3 },
        { name: 'Ail', quantity: 2, unit: 'gousse', sortOrder: 4 },
        { name: 'Basilic frais', quantity: 10, unit: 'g', sortOrder: 5 },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Cuire les pâtes al dente selon instructions.' },
        { stepNumber: 2, instruction: 'Faire revenir ail + poulet coupé en dés 8 min.' },
        { stepNumber: 3, instruction: 'Ajouter tomates, cuire 10 min. Mélanger avec pâtes et basilic.' },
      ],
      nutrition: { calories: 560, protein: 48, carbs: 68, fat: 8, fiber: 8 },
      tags: ['glucides', 'charge glucidique', 'jour de match'],
      orientations: ['GLUC_HAUT', 'PROT_BON'],
    },
  ];

  for (const r of recipeData) {
    await prisma.recipe.upsert({
      where:  { id: r.id },
      update: {},
      create: {
        id:          r.id,
        title:       r.title,
        description: r.description,
        category:    r.category,
        difficulty:  r.difficulty,
        prepTimeMin: r.prepTimeMin,
        cookTimeMin: r.cookTimeMin,
        servings:    r.servings,
        clubId:      club.id,
        ingredients: { create: r.ingredients },
        steps:       { create: r.steps },
        nutrition:   { create: r.nutrition },
        tags:        { create: r.tags.map(label => ({ label })) },
        orientations:{ create: r.orientations.map(o => ({ orientation: o as never })) },
      },
    });
  }
  console.log('✅ Recettes créées:', recipeData.length);

  // ─── DayPlans ───────────────────────────────────
  const days = [
    { date: '2026-03-16', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'HIGH', durationMin: 75 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'MODERATE', durationMin: 90 }], orientations: ['GLUC_HAUT', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-17', trainings: [{ slot: 'MORNING', type: 'Cardio', intensity: 'MODERATE', durationMin: 45 }, { slot: 'AFTERNOON', type: 'Repos', intensity: 'LOW', durationMin: null }], orientations: ['ANTI_INFLAM', 'PROT_MAIGRE'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-18', trainings: [{ slot: 'MORNING', type: 'Mobilité', intensity: 'LOW', durationMin: 40 }, { slot: 'AFTERNOON', type: 'Musculation', intensity: 'HIGH', durationMin: 75 }], orientations: ['GLUC_MOD', 'VIANDE_BLANCHE'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-19', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'HIGH', durationMin: 75 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'HIGH', durationMin: 90 }], orientations: ['GLUC_HAUT', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-20', trainings: [{ slot: 'MORNING', type: 'Récupération', intensity: 'LOW', durationMin: 30 }], orientations: ['ANTI_INFLAM', 'ANTIOXYDANT'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-21', trainings: [{ slot: 'AFTERNOON', type: 'Match', intensity: 'HIGH', durationMin: 80 }], orientations: ['GROSSE_MAT', 'GLUC_HAUT'], menu: { starters: ['std-s1'], mains: ['md-m1'] } },
    { date: '2026-03-22', trainings: [], orientations: ['ANTI_INFLAM'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-23', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'HIGH', durationMin: 75 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'MODERATE', durationMin: 90 }], orientations: ['GLUC_HAUT', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-24', trainings: [{ slot: 'MORNING', type: 'Cardio', intensity: 'MODERATE', durationMin: 50 }, { slot: 'AFTERNOON', type: 'Repos', intensity: 'LOW', durationMin: null }], orientations: ['ANTI_INFLAM', 'PROT_MAIGRE'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-25', trainings: [{ slot: 'MORNING', type: 'Mobilité', intensity: 'LOW', durationMin: 40 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'HIGH', durationMin: 95 }], orientations: ['GLUC_MOD', 'VIANDE_BLANCHE'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-26', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'HIGH', durationMin: 80 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'HIGH', durationMin: 95 }], orientations: ['GLUC_HAUT', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-27', trainings: [{ slot: 'MORNING', type: 'Récupération', intensity: 'LOW', durationMin: 30 }], orientations: ['ANTI_INFLAM', 'ANTIOXYDANT'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-28', trainings: [{ slot: 'AFTERNOON', type: 'Match', intensity: 'HIGH', durationMin: 80 }], orientations: ['GROSSE_MAT', 'GLUC_HAUT'], menu: { starters: ['std-s1'], mains: ['md-m1'] } },
    { date: '2026-03-29', trainings: [], orientations: ['ANTI_INFLAM'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-03-30', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'MODERATE', durationMin: 70 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'MODERATE', durationMin: 85 }], orientations: ['GLUC_MOD', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-03-31', trainings: [{ slot: 'MORNING', type: 'Cardio', intensity: 'MODERATE', durationMin: 45 }], orientations: ['ANTI_INFLAM', 'PROT_MAIGRE'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-04-01', trainings: [{ slot: 'MORNING', type: 'Mobilité', intensity: 'LOW', durationMin: 35 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'HIGH', durationMin: 95 }], orientations: ['GLUC_MOD', 'VIANDE_BLANCHE'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-04-02', trainings: [{ slot: 'MORNING', type: 'Musculation', intensity: 'HIGH', durationMin: 80 }, { slot: 'AFTERNOON', type: 'Rugby — séance collective', intensity: 'HIGH', durationMin: 90 }], orientations: ['GLUC_HAUT', 'PROT_BON'], menu: { starters: ['std-s1'], mains: ['std-m1', 'std-m2'] } },
    { date: '2026-04-03', trainings: [{ slot: 'MORNING', type: 'Récupération active', intensity: 'LOW', durationMin: 30 }], orientations: ['ANTI_INFLAM', 'ANTIOXYDANT'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
    { date: '2026-04-04', trainings: [{ slot: 'AFTERNOON', type: 'Match', intensity: 'HIGH', durationMin: 80 }], orientations: ['GROSSE_MAT', 'GLUC_HAUT'], menu: { starters: ['std-s1'], mains: ['md-m1'] } },
    { date: '2026-04-05', trainings: [], orientations: ['ANTI_INFLAM'], menu: { starters: ['std-s1'], mains: ['ai-m1'] } },
  ];

  for (const day of days) {
    const existing = await prisma.dayPlan.findFirst({
      where: { date: new Date(day.date), seasonId: season.id },
    });

    const dayPlan = existing ?? await prisma.dayPlan.create({
      data: {
        date:         new Date(day.date),
        seasonId:     season.id,
        createdById:  'user-nutri',
      },
    });

    if (!existing) {
      // Séances
      if (day.trainings.length > 0) {
        await prisma.trainingSession.createMany({
          data: day.trainings.map(t => ({
            slot:       t.slot as never,
            type:       t.type,
            intensity:  t.intensity as never,
            durationMin:t.durationMin,
            dayPlanId:  dayPlan.id,
          })),
        });
      }

      // Orientations
      await prisma.dayOrientation.createMany({
        data: day.orientations.map((o, i) => ({
          orientation: o as never,
          priority:    i,
          dayPlanId:   dayPlan.id,
        })),
      });

      // Menu
      const menu = await prisma.dayMenu.create({
        data: { dayPlanId: dayPlan.id },
      });

      const menuItems = [
        ...day.menu.starters.map((id, i) => ({ recipeId: id, category: 'STARTER' as never, sortOrder: i, dayMenuId: menu.id })),
        ...day.menu.mains.map((id, i) => ({ recipeId: id, category: 'MAIN' as never, sortOrder: i, dayMenuId: menu.id })),
      ];
      await prisma.menuOption.createMany({ data: menuItems });
    }
  }

  console.log('✅ DayPlans créés:', days.length);
  console.log('🎉 Seed terminé !');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
