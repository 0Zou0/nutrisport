'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { Recipe, RecipeFormData, RecipeCategory } from '@/types';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { RecipeFormModal } from '@/components/recipes/RecipeFormModal';
import { todayISO } from '@/lib/utils';

const CATEGORY_FILTERS: Array<{ label: string; value: RecipeCategory | 'all' }> = [
  { label: 'Toutes',   value: 'all' },
  { label: 'Entrées',  value: 'starter' },
  { label: 'Plats',    value: 'main' },
  { label: 'Desserts', value: 'dessert' },
];

export default function RecettesPage() {
  const { role, loading } = useRole();
  const router = useRouter();

  const [recipes, setRecipes]       = useState<Recipe[]>([]);
  const [fetching, setFetching]     = useState(true);
  const [category, setCategory]     = useState<RecipeCategory | 'all'>('all');
  const [search, setSearch]         = useState('');
  const [modalOpen, setModalOpen]   = useState(false);
  const [editing, setEditing]       = useState<Recipe | null>(null);

  useEffect(() => {
    if (!loading && !role) router.replace('/login');
    if (!loading && role && role !== 'cook') router.replace('/');
  }, [role, loading, router]);

  useEffect(() => {
    if (role !== 'cook') return;
    fetch('/api/recipes')
      .then(r => r.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
      .catch(() => setRecipes([]))
      .finally(() => setFetching(false));
  }, [role]);

  const filtered = recipes.filter(r => {
    const matchCat  = category === 'all' || r.category === category;
    const matchText = !search || r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  async function handleSave(data: RecipeFormData) {
    if (editing) {
      const res = await fetch(`/api/recipes/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const updated: Recipe = await res.json();
      setRecipes(rs => rs.map(r => r.id === updated.id ? updated : r));
    } else {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const created: Recipe = await res.json();
      setRecipes(rs => [...rs, created]);
    }
    setEditing(null);
    setModalOpen(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette recette définitivement ?')) return;
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    if (res.ok) setRecipes(rs => rs.filter(r => r.id !== id));
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(recipe: Recipe) {
    setEditing(recipe);
    setModalOpen(true);
  }

  if (loading || !role) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb retour */}
      <div className="mb-5">
        <Link
          href={`/planning/jour/${todayISO()}`}
          prefetch={false}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 hover:text-white transition-all border border-white/5 shadow-sm"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Planning du jour
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mes recettes</h1>
          <p className="text-sm text-slate-500 mt-0.5">{recipes.length} recette{recipes.length !== 1 ? 's' : ''} dans votre bibliothèque</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle recette
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher…"
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <div className="flex gap-2">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setCategory(f.value)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                category === f.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      {fetching ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <p className="text-slate-600 font-medium">
            {recipes.length === 0 ? 'Aucune recette pour l\'instant' : 'Aucune recette ne correspond'}
          </p>
          {recipes.length === 0 && (
            <p className="text-sm text-slate-400 mt-1">Créez votre première recette en cliquant sur le bouton ci-dessus</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <RecipeFormModal
          recipe={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
