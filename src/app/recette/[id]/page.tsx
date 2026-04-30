'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Badge } from '@/components/ui/Badge';
import { ORIENTATION_COLORS, ORIENTATION_LABELS } from '@/lib/utils';
import { Recipe, RecipeDifficulty } from '@/types';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

const DIFFICULTY_LABELS: Record<RecipeDifficulty, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
};

const DIFFICULTY_COLORS: Record<RecipeDifficulty, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

const CATEGORY_LABELS: Record<string, string> = { starter: 'Entrée', main: 'Plat principal', dessert: 'Dessert' };

export default function RecipePage({ params }: RecipePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(r => r.json())
      .then(setRecipe)
      .catch(() => setRecipe(null));
  }, [id]);

  if (recipe === undefined) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-4 animate-pulse p-4">
          <div className="h-40 bg-slate-200 rounded-xl" />
          <div className="h-24 bg-slate-200 rounded-xl" />
          <div className="h-48 bg-slate-200 rounded-xl" />
        </div>
      </AppLayout>
    );
  }

  if (!recipe) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <span className="text-5xl">🔍</span>
          <p className="mt-4 text-slate-600 font-medium">Recette introuvable</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-block text-sm font-medium text-blue-600 underline"
          >
            Retour
          </button>
        </div>
      </AppLayout>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <AppLayout>
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour au menu
      </button>

      {/* En-tête recette */}
      <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden mb-4">
        <div className="bg-slate-800 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">
                {CATEGORY_LABELS[recipe.category]}
              </p>
              <h1 className="text-xl font-bold text-white leading-tight">{recipe.title}</h1>
              <p className="text-slate-300 text-sm mt-1">{recipe.description}</p>
            </div>
            <span className="text-3xl shrink-0">
              {recipe.category === 'starter' ? '🥗' : '🍽️'}
            </span>
          </div>
        </div>

        {/* Méta-infos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 border-t border-slate-200">
          <div className="flex flex-col items-center py-3 px-2 gap-0.5">
            <span className="text-lg">⏱️</span>
            <span className="text-xs text-slate-500">Préparation</span>
            <span className="text-sm font-bold text-slate-800">{recipe.prepTime} min</span>
          </div>
          <div className="flex flex-col items-center py-3 px-2 gap-0.5">
            <span className="text-lg">🔥</span>
            <span className="text-xs text-slate-500">Cuisson</span>
            <span className="text-sm font-bold text-slate-800">{recipe.cookTime > 0 ? `${recipe.cookTime} min` : '—'}</span>
          </div>
          <div className="flex flex-col items-center py-3 px-2 gap-0.5">
            <span className="text-lg">👥</span>
            <span className="text-xs text-slate-500">Couverts</span>
            <span className="text-sm font-bold text-slate-800">{recipe.servings}</span>
          </div>
          <div className="flex flex-col items-center py-3 px-2 gap-0.5">
            <span className="text-lg">📊</span>
            <span className="text-xs text-slate-500">Difficulté</span>
            <Badge className={DIFFICULTY_COLORS[recipe.difficulty]} size="sm">
              {DIFFICULTY_LABELS[recipe.difficulty]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Orientations nutritionnelles */}
      {recipe.orientations.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-4 mb-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Orientations</h2>
          <div className="flex flex-wrap gap-2">
            {recipe.orientations.map(o => (
              <div key={o} className="flex items-center gap-2">
                <Badge className={ORIENTATION_COLORS[o]}>{o}</Badge>
                <span className="text-xs text-slate-600">{ORIENTATION_LABELS[o]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Ingrédients */}
        <section className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
            <span>🧺</span>
            <h2 className="font-semibold text-white">Ingrédients</h2>
            <span className="ml-auto text-slate-400 text-xs">Pour {recipe.servings} couverts</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors">
                <span className="text-sm text-slate-800 font-medium">{ing.name}</span>
                <span className="text-sm text-slate-500 shrink-0 ml-2">
                  {ing.quantity}{ing.unit ? ` ${ing.unit}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Valeurs nutritionnelles */}
        <section className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden self-start">
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
            <span>📊</span>
            <h2 className="font-semibold text-white">Valeurs nutritionnelles</h2>
            <span className="ml-auto text-slate-400 text-xs">Par portion</span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-700">{recipe.nutrition.calories}</div>
              <div className="text-xs text-orange-600 font-medium">kcal</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-700">{recipe.nutrition.protein}g</div>
              <div className="text-xs text-blue-600 font-medium">Protéines</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-700">{recipe.nutrition.carbs}g</div>
              <div className="text-xs text-amber-600 font-medium">Glucides</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-700">{recipe.nutrition.fat}g</div>
              <div className="text-xs text-slate-600 font-medium">Lipides</div>
            </div>
            {recipe.nutrition.fiber !== undefined && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center col-span-2">
                <div className="text-xl font-bold text-green-700">{recipe.nutrition.fiber}g</div>
                <div className="text-xs text-green-600 font-medium">Fibres</div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Étapes de préparation */}
      <section className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
          <span>👨‍🍳</span>
          <h2 className="font-semibold text-white">Préparation</h2>
          <span className="ml-auto text-slate-400 text-xs">Temps total : {totalTime} min</span>
        </div>
        <ol className="divide-y divide-slate-100">
          {recipe.steps.map((step) => (
            <li key={step.order} className="flex gap-4 px-4 py-4 hover:bg-slate-50 transition-colors">
              <span className="shrink-0 w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {step.order}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{step.instruction}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
