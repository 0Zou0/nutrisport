'use client';

import { useState, useEffect } from 'react';
import { Recipe, RecipeFormData, IngredientInput, StepInput, RecipeCategory, RecipeDifficulty } from '@/types';

interface Props {
  recipe?: Recipe | null;
  onClose: () => void;
  onSave: (data: RecipeFormData) => Promise<void>;
}

const EMPTY_FORM: RecipeFormData = {
  title:       '',
  description: '',
  category:    'main',
  difficulty:  'easy',
  prepTimeMin: 15,
  cookTimeMin: 0,
  servings:    4,
  ingredients: [],
  steps:       [],
};

function uid() {
  return Math.random().toString(36).slice(2);
}

function recipeToForm(r: Recipe): RecipeFormData {
  return {
    title:       r.title,
    description: r.description,
    category:    r.category,
    difficulty:  r.difficulty,
    prepTimeMin: r.prepTime,
    cookTimeMin: r.cookTime,
    servings:    r.servings,
    ingredients: r.ingredients.map(ing => ({
      _key:     uid(),
      name:     ing.name,
      quantity: Number(ing.quantity),
      unit:     ing.unit ?? '',
    })),
    steps: r.steps.map(s => ({
      _key:        uid(),
      instruction: s.instruction,
      durationMin: undefined,
    })),
  };
}

export function RecipeFormModal({ recipe, onClose, onSave }: Props) {
  const [form, setForm] = useState<RecipeFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(recipe ? recipeToForm(recipe) : EMPTY_FORM);
    setError(null);
  }, [recipe]);

  function setField<K extends keyof RecipeFormData>(key: K, value: RecipeFormData[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  // ── Ingrédients ──────────────────────────────────────────────────────────
  function addIngredient() {
    setField('ingredients', [...form.ingredients, { _key: uid(), name: '', quantity: 1, unit: '' }]);
  }
  function removeIngredient(key: string) {
    setField('ingredients', form.ingredients.filter(i => i._key !== key));
  }
  function updateIngredient(key: string, patch: Partial<IngredientInput>) {
    setField('ingredients', form.ingredients.map(i => i._key === key ? { ...i, ...patch } : i));
  }

  // ── Étapes ───────────────────────────────────────────────────────────────
  function addStep() {
    setField('steps', [...form.steps, { _key: uid(), instruction: '' }]);
  }
  function removeStep(key: string) {
    setField('steps', form.steps.filter(s => s._key !== key));
  }
  function updateStep(key: string, patch: Partial<StepInput>) {
    setField('steps', form.steps.map(s => s._key === key ? { ...s, ...patch } : s));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError('Le titre est requis'); return; }
    if (form.ingredients.length === 0) { setError('Ajoutez au moins un ingrédient'); return; }
    if (form.steps.length === 0) { setError('Ajoutez au moins une étape'); return; }
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
      onClose();
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {recipe ? 'Modifier la recette' : 'Nouvelle recette'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setField('title', e.target.value)}
              placeholder="ex: Salade César"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              rows={2}
              placeholder="Description rapide de la recette..."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Catégorie + Difficulté */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Catégorie</label>
              <select
                value={form.category}
                onChange={e => setField('category', e.target.value as RecipeCategory)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="starter">Entrée</option>
                <option value="main">Plat</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Difficulté</label>
              <select
                value={form.difficulty}
                onChange={e => setField('difficulty', e.target.value as RecipeDifficulty)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
              </select>
            </div>
          </div>

          {/* Temps + Servings */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Prép. (min)</label>
              <input
                type="number"
                min={0}
                value={form.prepTimeMin}
                onChange={e => setField('prepTimeMin', Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Cuisson (min)</label>
              <input
                type="number"
                min={0}
                value={form.cookTimeMin}
                onChange={e => setField('cookTimeMin', Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Personnes</label>
              <input
                type="number"
                min={1}
                value={form.servings}
                onChange={e => setField('servings', Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Ingrédients */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ingrédients *</label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium"
              >
                + Ajouter
              </button>
            </div>
            {form.ingredients.length === 0 && (
              <p className="text-xs text-slate-400 italic py-2">Aucun ingrédient — cliquez sur "+ Ajouter"</p>
            )}
            <div className="space-y-2">
              {form.ingredients.map((ing, idx) => (
                <div key={ing._key} className="flex gap-2 items-center">
                  <span className="text-xs text-slate-400 w-4 shrink-0">{idx + 1}.</span>
                  <input
                    type="text"
                    value={ing.name}
                    onChange={e => updateIngredient(ing._key, { name: e.target.value })}
                    placeholder="Nom"
                    className="flex-1 min-w-0 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={ing.quantity}
                    onChange={e => updateIngredient(ing._key, { quantity: Number(e.target.value) })}
                    placeholder="Qté"
                    className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={e => updateIngredient(ing._key, { unit: e.target.value })}
                    placeholder="Unité"
                    className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(ing._key)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Étapes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Étapes *</label>
              <button
                type="button"
                onClick={addStep}
                className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium"
              >
                + Ajouter
              </button>
            </div>
            {form.steps.length === 0 && (
              <p className="text-xs text-slate-400 italic py-2">Aucune étape — cliquez sur "+ Ajouter"</p>
            )}
            <div className="space-y-2">
              {form.steps.map((step, idx) => (
                <div key={step._key} className="flex gap-2 items-start">
                  <span className="text-xs text-slate-400 w-4 shrink-0 mt-2">{idx + 1}.</span>
                  <textarea
                    value={step.instruction}
                    onChange={e => updateStep(step._key, { instruction: e.target.value })}
                    placeholder={`Étape ${idx + 1}...`}
                    rows={2}
                    className="flex-1 min-w-0 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(step._key)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0 mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Enregistrement…' : recipe ? 'Mettre à jour' : 'Créer la recette'}
          </button>
        </div>
      </div>
    </div>
  );
}
