export type UserRole = 'cook' | 'coach' | 'player' | 'nutritionist';

export type TrainingSlot = 'morning' | 'afternoon';
export type TrainingIntensity = 'low' | 'moderate' | 'high';

export interface Training {
  id?: string;
  slot: TrainingSlot;
  type: string;
  intensity: TrainingIntensity;
  duration?: number;
}

export type NutritionalOrientation =
  | 'ANTI-INFLAM'
  | 'GLUC-MOD'
  | 'GLUC-HAUT'
  | 'PROT-BON'
  | 'PROT-MAIGRE'
  | 'ANTIOXYDANT'
  | 'VIANDE-BLANCHE'
  | 'GROSSE-MAT';

export interface MenuOption {
  id: string;
  title: string;
  description: string;
  available: boolean;
  recipeId?: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export type RecipeDifficulty = 'easy' | 'medium' | 'hard';
export type RecipeCategory = 'starter' | 'main' | 'dessert';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: RecipeDifficulty;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition: NutritionFacts;
  tags: string[];
  orientations: NutritionalOrientation[];
}

export interface IngredientInput {
  _key: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface StepInput {
  _key: string;
  instruction: string;
  durationMin?: number;
}

export interface RecipeFormData {
  title: string;
  description: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTimeMin: number;
  cookTimeMin: number;
  servings: number;
  ingredients: IngredientInput[];
  steps: StepInput[];
}

export interface DayMenu {
  starters: MenuOption[];
  mains: MenuOption[];
  desserts: MenuOption[];
}

export interface DayData {
  date: string;
  trainings: Training[];
  orientations: NutritionalOrientation[];
  menu: DayMenu;
}
