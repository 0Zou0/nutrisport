'use client';

import { Recipe } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  starter: 'Entrée',
  main:    'Plat',
  dessert: 'Dessert',
};
const CATEGORY_COLORS: Record<string, string> = {
  starter: 'bg-amber-100 text-amber-700',
  main:    'bg-blue-100 text-blue-700',
  dessert: 'bg-pink-100 text-pink-700',
};
const DIFFICULTY_LABELS: Record<string, string> = {
  easy:   'Facile',
  medium: 'Moyen',
  hard:   'Difficile',
};
const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   'bg-green-100 text-green-700',
  medium: 'bg-orange-100 text-orange-700',
  hard:   'bg-red-100 text-red-700',
};

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 text-base leading-tight">{recipe.title}</h3>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(recipe)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5rem]">
        {recipe.description || <span className="text-slate-300 italic">Aucune description</span>}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[recipe.category]}`}>
          {CATEGORY_LABELS[recipe.category]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
          {DIFFICULTY_LABELS[recipe.difficulty]}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-100 pt-2">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {totalTime} min
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {recipe.servings} pers.
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {recipe.ingredients.length} ingr.
        </span>
      </div>
    </div>
  );
}
