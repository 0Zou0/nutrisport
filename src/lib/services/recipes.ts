import { prisma } from '@/lib/prisma';
import { Recipe } from '@/types';
import type {
  Recipe as PrismaRecipe, Ingredient, RecipeStep,
  NutritionFacts, RecipeTag, RecipeOrientation,
} from '@prisma/client';

type RecipeFull = PrismaRecipe & {
  ingredients:  Ingredient[];
  steps:        RecipeStep[];
  nutrition:    NutritionFacts | null;
  tags:         RecipeTag[];
  orientations: RecipeOrientation[];
};

const DIFFICULTY_MAP: Record<string, 'easy' | 'medium' | 'hard'> = {
  EASY: 'easy', MEDIUM: 'medium', HARD: 'hard',
};
const CATEGORY_MAP: Record<string, 'starter' | 'main'> = {
  STARTER: 'starter', MAIN: 'main', DESSERT: 'main',
};
const ORIENTATION_MAP: Record<string, string> = {
  ANTI_INFLAM:    'ANTI-INFLAM',
  GLUC_MOD:       'GLUC-MOD',
  GLUC_HAUT:      'GLUC-HAUT',
  PROT_BON:       'PROT-BON',
  PROT_MAIGRE:    'PROT-MAIGRE',
  ANTIOXYDANT:    'ANTIOXYDANT',
  VIANDE_BLANCHE: 'VIANDE-BLANCHE',
  GROSSE_MAT:     'GROSSE-MAT',
};

function mapRecipe(r: RecipeFull): Recipe {
  return {
    id:          r.id,
    title:       r.title,
    description: r.description ?? '',
    category:    CATEGORY_MAP[r.category],
    difficulty:  DIFFICULTY_MAP[r.difficulty],
    prepTime:    r.prepTimeMin,
    cookTime:    r.cookTimeMin,
    servings:    r.servings,
    ingredients: r.ingredients.map((i: Ingredient) => ({
      name:     i.name,
      quantity: String(i.quantity),
      unit:     i.unit,
    })),
    steps: r.steps.map((s: RecipeStep) => ({
      order:       s.stepNumber,
      instruction: s.instruction,
    })),
    nutrition: r.nutrition
      ? {
          calories: r.nutrition.calories,
          protein:  r.nutrition.protein,
          carbs:    r.nutrition.carbs,
          fat:      r.nutrition.fat,
          fiber:    r.nutrition.fiber ?? undefined,
        }
      : { calories: 0, protein: 0, carbs: 0, fat: 0 },
    tags:         r.tags.map((t: RecipeTag) => t.label),
    orientations: r.orientations.map(
      (o: RecipeOrientation) => ORIENTATION_MAP[o.orientation]
    ) as Recipe['orientations'],
  };
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const r = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients:  { orderBy: { sortOrder: 'asc' } },
      steps:        { orderBy: { stepNumber: 'asc' } },
      nutrition:    true,
      tags:         true,
      orientations: true,
    },
  });

  if (!r) return null;
  return mapRecipe(r as RecipeFull);
}

export async function getRecipesByClub(clubId: string): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { clubId },
    include: {
      ingredients:  { orderBy: { sortOrder: 'asc' } },
      steps:        { orderBy: { stepNumber: 'asc' } },
      nutrition:    true,
      tags:         true,
      orientations: true,
    },
    orderBy: { title: 'asc' },
  });

  return recipes.map(r => mapRecipe(r as RecipeFull));
}
