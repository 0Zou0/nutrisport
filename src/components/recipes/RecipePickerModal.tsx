'use client';

import { useState, useEffect } from 'react';
import { Recipe, RecipeCategory } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  all:     'Toutes',
  starter: 'Entrées',
  main:    'Plats',
  dessert: 'Desserts',
};

interface Props {
  onClose: () => void;
  onSelect: (recipe: Recipe) => void;
  filterCategory?: RecipeCategory;
}

export function RecipePickerModal({ onClose, onSelect, filterCategory }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RecipeCategory | 'all'>(filterCategory ?? 'all');

  useEffect(() => {
    fetch('/api/recipes')
      .then(r => r.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = recipes.filter(r => {
    const matchCat  = category === 'all' || r.category === category;
    const matchText = !search || r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Choisir une recette</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filtres */}
        <div className="px-6 pt-4 pb-3 space-y-3 border-b border-slate-100">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une recette…"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'starter', 'main', 'dessert'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-8">Aucune recette trouvée</p>
          )}
          {filtered.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => onSelect(recipe)}
              className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate group-hover:text-blue-700">
                    {recipe.title}
                  </p>
                  {recipe.description && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">{recipe.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs text-slate-400">
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
