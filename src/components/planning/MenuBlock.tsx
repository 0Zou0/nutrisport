'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DayMenu, MenuOption, Recipe, UserRole } from '@/types';
import { canEdit } from '@/lib/permissions';
import { RecipePickerModal } from '@/components/recipes/RecipePickerModal';

interface MenuBlockProps {
  menu: DayMenu;
  role: UserRole;
  date?: string;
  detailHref?: string;
}

interface MenuOptionCardProps {
  option: MenuOption;
  canToggle: boolean;
  isCook: boolean;
  saving: boolean;
  onToggle: () => void;
  onPickRecipe: () => void;
  onRemove: () => void;
}

function MenuOptionCard({ option, canToggle, isCook, saving, onToggle, onPickRecipe, onRemove }: MenuOptionCardProps) {
  const card = (
    <div className={`
      flex items-start gap-3 p-3 rounded-lg border transition-colors group
      ${option.available
        ? `bg-slate-50 border-slate-300 ${option.recipeId ? 'hover:bg-white hover:border-slate-400 hover:shadow-sm cursor-pointer' : ''}`
        : 'bg-slate-100 border-slate-300 opacity-60'
      }
    `}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-slate-800 truncate">
            {option.title || <span className="text-slate-400 italic">Aucune recette assignée</span>}
          </span>
          {!option.available && (
            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full shrink-0">
              Indisponible
            </span>
          )}
        </div>
        {option.description && (
          <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
        )}
        {option.recipeId && (
          <Link
            href={`/recette/${option.recipeId}`}
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-blue-600 hover:underline"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Voir la fiche recette
          </Link>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {/* Bouton "Choisir recette" (cook uniquement) */}
        {isCook && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPickRecipe(); }}
            disabled={saving}
            title="Choisir une recette"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
        )}

        {/* Toggle disponibilité (cook & nutritionist) */}
        {canToggle && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
            disabled={saving}
            aria-label={option.available ? 'Marquer indisponible' : 'Marquer disponible'}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-colors
              ${saving ? 'opacity-50 cursor-wait' : ''}
              ${option.available
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
              }
            `}
          >
            {saving ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
            ) : option.available ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        )}

        {/* Supprimer slot (cook uniquement) */}
        {isCook && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
            disabled={saving}
            title="Supprimer ce slot"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  return card;
}

export function MenuBlock({ menu: initialMenu, role, date, detailHref }: MenuBlockProps) {
  const [menu, setMenu] = useState<DayMenu>(initialMenu);
  const [saving, setSaving] = useState<string | null>(null);
  const [addingSection, setAddingSection] = useState<'starters' | 'mains' | null>(null);
  const [pickerContext, setPickerContext] = useState<{ section: 'starters' | 'mains'; optionId: string } | null>(null);

  const canToggleAvailability = canEdit(role, 'menu-availability');
  const canEditTitle = canEdit(role, 'menu-title');
  const isCook = role === 'cook';

  async function toggleOption(section: 'starters' | 'mains', id: string) {
    const current = menu[section].find(o => o.id === id);
    if (!current) return;
    const newAvailable = !current.available;

    setMenu(prev => ({
      ...prev,
      [section]: prev[section].map(opt =>
        opt.id === id ? { ...opt, available: newAvailable } : opt
      ),
    }));

    setSaving(id);
    try {
      await fetch(`/api/menu-option/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: newAvailable }),
      });
    } catch {
      setMenu(prev => ({
        ...prev,
        [section]: prev[section].map(opt =>
          opt.id === id ? { ...opt, available: current.available } : opt
        ),
      }));
    } finally {
      setSaving(null);
    }
  }

  async function assignRecipe(section: 'starters' | 'mains', optionId: string, recipe: Recipe) {
    setSaving(optionId);
    try {
      const res = await fetch(`/api/menu-option/${optionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe.id }),
      });
      if (res.ok) {
        setMenu(prev => ({
          ...prev,
          [section]: prev[section].map(opt =>
            opt.id === optionId
              ? { ...opt, title: recipe.title, description: recipe.description, recipeId: recipe.id }
              : opt
          ),
        }));
      }
    } finally {
      setSaving(null);
      setPickerContext(null);
    }
  }

  async function addSlot(section: 'starters' | 'mains') {
    if (!date) return;
    setAddingSection(section);
    const category = section === 'starters' ? 'STARTER' : 'MAIN';
    try {
      const res = await fetch('/api/menu-option', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, category }),
      });
      if (res.ok) {
        const newOption = await res.json();
        setMenu(prev => ({
          ...prev,
          [section]: [...prev[section], newOption],
        }));
        // Ouvre directement le picker pour choisir une recette
        setPickerContext({ section, optionId: newOption.id });
      }
    } finally {
      setAddingSection(null);
    }
  }

  async function removeSlot(section: 'starters' | 'mains', id: string) {
    setSaving(id);
    try {
      const res = await fetch(`/api/menu-option/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMenu(prev => ({
          ...prev,
          [section]: prev[section].filter(opt => opt.id !== id),
        }));
      }
    } finally {
      setSaving(null);
    }
  }

  const availableStarters = menu.starters.filter(o => o.available).length;
  const availableMains = menu.mains.filter(o => o.available).length;

  return (
    <>
      <section className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍽️</span>
            <h2 className="font-semibold text-white">Menu du jour</h2>
          </div>
          <div className="flex items-center gap-1.5">
            {canEditTitle && (
              <span className="text-xs px-2 py-0.5 bg-violet-500 text-white rounded-full font-medium">
                Nutritionniste
              </span>
            )}
            {isCook && (
              <span className="text-xs px-2 py-0.5 bg-orange-500 text-white rounded-full font-medium">
                Chef
              </span>
            )}
            {detailHref && (
              <Link
                href={detailHref}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors"
              >
                Détail
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-5">
          {/* Entrées */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Entrées</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {availableStarters}/{menu.starters.length} disponible{availableStarters > 1 ? 's' : ''}
                </span>
                {isCook && date && (
                  <button
                    onClick={() => addSlot('starters')}
                    disabled={addingSection === 'starters'}
                    title="Ajouter un slot entrée"
                    className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors text-lg leading-none disabled:opacity-50"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {menu.starters.length === 0 && (
                <p className="text-xs text-slate-400 italic py-1">Aucune entrée — {isCook ? 'cliquez sur + pour en ajouter' : 'aucune pour ce jour'}</p>
              )}
              {menu.starters.map((opt) => (
                <MenuOptionCard
                  key={opt.id}
                  option={opt}
                  canToggle={canToggleAvailability}
                  isCook={isCook}
                  saving={saving === opt.id}
                  onToggle={() => toggleOption('starters', opt.id)}
                  onPickRecipe={() => setPickerContext({ section: 'starters', optionId: opt.id })}
                  onRemove={() => removeSlot('starters', opt.id)}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200" />

          {/* Plats */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Plats principaux</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {availableMains}/{menu.mains.length} disponible{availableMains > 1 ? 's' : ''}
                </span>
                {isCook && date && (
                  <button
                    onClick={() => addSlot('mains')}
                    disabled={addingSection === 'mains'}
                    title="Ajouter un slot plat"
                    className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-colors text-lg leading-none disabled:opacity-50"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {menu.mains.length === 0 && (
                <p className="text-xs text-slate-400 italic py-1">Aucun plat — {isCook ? 'cliquez sur + pour en ajouter' : 'aucun pour ce jour'}</p>
              )}
              {menu.mains.map((opt) => (
                <MenuOptionCard
                  key={opt.id}
                  option={opt}
                  canToggle={canToggleAvailability}
                  isCook={isCook}
                  saving={saving === opt.id}
                  onToggle={() => toggleOption('mains', opt.id)}
                  onPickRecipe={() => setPickerContext({ section: 'mains', optionId: opt.id })}
                  onRemove={() => removeSlot('mains', opt.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal picker de recette */}
      {pickerContext && (
        <RecipePickerModal
          onClose={() => setPickerContext(null)}
          onSelect={(recipe) => assignRecipe(pickerContext.section, pickerContext.optionId, recipe)}
        />
      )}
    </>
  );
}
