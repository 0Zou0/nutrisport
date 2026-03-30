'use client';

import { useState } from 'react';
import { NutritionalOrientation, UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ORIENTATION_COLORS, ORIENTATION_LABELS } from '@/lib/utils';
import { canEdit } from '@/lib/permissions';

const ALL_ORIENTATIONS = Object.keys(ORIENTATION_LABELS) as NutritionalOrientation[];

interface NutritionBlockProps {
  orientations: NutritionalOrientation[];
  role: UserRole;
  date?: string;
  onRefresh?: () => void;
}

export function NutritionBlock({ orientations: initialOrientations, role, date, onRefresh }: NutritionBlockProps) {
  const editable = canEdit(role, 'orientation');
  const [editing, setEditing]   = useState(false);
  const [selected, setSelected] = useState<NutritionalOrientation[]>(initialOrientations);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  // Synchronise quand les props changent (ex: refresh)
  const displayed = editing ? selected : initialOrientations;

  function toggleOrientation(o: NutritionalOrientation) {
    setSelected(prev =>
      prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]
    );
  }

  async function handleSave() {
    if (!date) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/orientation?date=${date}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orientations: selected }),
      });
      if (!res.ok) throw new Error();
      setEditing(false);
      onRefresh?.();
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setSelected(initialOrientations);
    setEditing(false);
    setError('');
  }

  return (
    <section className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">🥗</span>
          <h2 className="font-semibold text-white">Orientation nutritionnelle</h2>
        </div>
        {editable && !editing && (
          <button
            onClick={() => { setSelected(initialOrientations); setEditing(true); }}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-violet-500 text-white hover:bg-violet-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Mode lecture */}
        {!editing && (
          <>
            {initialOrientations.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Aucune orientation définie</p>
            ) : (
              <div className="flex flex-col gap-2">
                {initialOrientations.map((o) => (
                  <div key={o} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    <Badge className={`${ORIENTATION_COLORS[o]} text-sm shrink-0`}>{o}</Badge>
                    <span className="text-sm font-medium text-slate-700">{ORIENTATION_LABELS[o]}</span>
                  </div>
                ))}
              </div>
            )}
            {initialOrientations.length > 1 && (
              <p className="text-xs text-slate-500 mt-3">
                {initialOrientations.length} orientations combinées pour cette journée
              </p>
            )}
          </>
        )}

        {/* Mode édition */}
        {editing && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-slate-500">Sélectionne les orientations pour cette journée :</p>
            <div className="flex flex-col gap-2">
              {ALL_ORIENTATIONS.map((o) => {
                const isSelected = selected.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleOrientation(o)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 border text-left transition-all
                      ${isSelected
                        ? 'bg-violet-50 border-violet-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isSelected ? 'bg-violet-500 border-violet-500' : 'border-slate-300'}`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge className={`${ORIENTATION_COLORS[o]} text-xs shrink-0`}>{o}</Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{ORIENTATION_LABELS[o]}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleCancel}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Enregistrement…' : `Valider (${selected.length})`}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
