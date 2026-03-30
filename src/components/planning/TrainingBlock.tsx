'use client';

import React, { useState } from 'react';
import { Training, UserRole, TrainingSlot, TrainingIntensity } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { INTENSITY_COLORS, INTENSITY_LABELS } from '@/lib/utils';
import { canEdit } from '@/lib/permissions';

interface TrainingBlockProps {
  trainings: Training[];
  role: UserRole;
  date?: string;
  onRefresh?: () => void;
}

const SLOT_LABELS: Record<TrainingSlot, string> = { morning: 'Matin', afternoon: 'Après-midi' };
const SLOT_ICONS: Record<TrainingSlot, string> = { morning: '☀️', afternoon: '🌙' };

const TRAINING_TYPES = [
  'Musculation', 'Rugby — séance collective', 'Cardio', 'Mobilité',
  'Récupération', 'Récupération active', 'Match', 'Repos',
];

interface TrainingFormData {
  slot: TrainingSlot;
  type: string;
  customType: string;
  intensity: TrainingIntensity;
  durationMin: string;
}

const EMPTY_FORM: TrainingFormData = {
  slot: 'morning',
  type: 'Musculation',
  customType: '',
  intensity: 'moderate',
  durationMin: '',
};

function TrainingFormModal({
  initial,
  date,
  onClose,
  onSave,
}: {
  initial?: Training;
  date: string;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState<TrainingFormData>(() =>
    initial
      ? {
          slot:       initial.slot,
          type:       TRAINING_TYPES.includes(initial.type) ? initial.type : 'Autre',
          customType: TRAINING_TYPES.includes(initial.type) ? '' : initial.type,
          intensity:  initial.intensity,
          durationMin: initial.duration ? String(initial.duration) : '',
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const finalType = form.type === 'Autre' ? form.customType : form.type;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!finalType.trim()) { setError('Le type est requis'); return; }

    setSaving(true);
    setError('');

    try {
      const url    = initial?.id ? `/api/training/${initial.id}` : '/api/training';
      const method = initial?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          slot:       form.slot.toUpperCase(),
          type:       finalType,
          intensity:  form.intensity.toUpperCase(),
          durationMin: form.durationMin ? Number(form.durationMin) : null,
        }),
      });

      if (!res.ok) throw new Error('Erreur serveur');
      onSave();
    } catch {
      setError('Impossible de sauvegarder — vérifiez la connexion à la base de données');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">
            {initial ? 'Modifier la séance' : 'Ajouter une séance'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {/* Créneau */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Créneau</label>
            <div className="flex gap-2">
              {(['morning', 'afternoon'] as TrainingSlot[]).map(s => (
                <button
                  key={s} type="button"
                  onClick={() => setForm(f => ({ ...f, slot: s }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors
                    ${form.slot === s ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'}`}
                >
                  <span>{SLOT_ICONS[s]}</span>
                  <span>{SLOT_LABELS[s]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Type de séance</label>
            <select
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {TRAINING_TYPES.map(t => <option key={t}>{t}</option>)}
              <option value="Autre">Autre…</option>
            </select>
            {form.type === 'Autre' && (
              <input
                type="text"
                placeholder="Nom de la séance"
                value={form.customType}
                onChange={e => setForm(f => ({ ...f, customType: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            )}
          </div>

          {/* Intensité */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Intensité</label>
            <div className="flex gap-2">
              {(['low', 'moderate', 'high'] as TrainingIntensity[]).map(i => (
                <button
                  key={i} type="button"
                  onClick={() => setForm(f => ({ ...f, intensity: i }))}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-colors
                    ${form.intensity === i
                      ? INTENSITY_COLORS[i] + ' border-transparent shadow-sm'
                      : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400'
                    }`}
                >
                  {INTENSITY_LABELS[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Durée */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Durée (min) <span className="text-slate-400 font-normal normal-case">— optionnel</span>
            </label>
            <input
              type="number"
              min="1" max="300"
              placeholder="ex: 90"
              value={form.durationMin}
              onChange={e => setForm(f => ({ ...f, durationMin: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Enregistrement…' : initial ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TrainingBlock({ trainings, role, date, onRefresh }: TrainingBlockProps) {
  const editable = canEdit(role, 'training');
  const [modal, setModal] = useState<{ open: boolean; training?: Training }>({ open: false });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null);

  function showToast(msg: string, type: 'error' | 'success' = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette séance ?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/training/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      onRefresh?.();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    } finally {
      setDeleting(null);
    }
  }

  function handleSaved() {
    setModal({ open: false });
    showToast('Séance enregistrée ✓', 'success');
    onRefresh?.();
  }

  return (
    <>
      <section className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏋️</span>
            <h2 className="font-semibold text-white">Entraînements</h2>
          </div>
          {editable && (
            <button
              onClick={() => setModal({ open: true })}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          )}
        </div>

        <div className="p-4">
          {trainings.length === 0 ? (
            <div className="flex items-center gap-3 py-2">
              <span className="text-2xl">😴</span>
              <div>
                <p className="font-medium text-slate-700">Journée de repos</p>
                <p className="text-sm text-slate-500">Aucune séance prévue</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {trainings.map((t, i) => (
                <div key={t.id ?? i} className="flex items-center gap-3">
                  {/* Icône créneau */}
                  <div className="flex flex-col items-center w-14 shrink-0">
                    <span className="text-xl">{SLOT_ICONS[t.slot]}</span>
                    <span className="text-xs text-slate-500 font-medium text-center leading-tight mt-0.5">
                      {SLOT_LABELS[t.slot]}
                    </span>
                  </div>

                  {/* Carte séance */}
                  <div className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-800 text-sm">{t.type}</span>
                      <Badge className={INTENSITY_COLORS[t.intensity]}>
                        {INTENSITY_LABELS[t.intensity]}
                      </Badge>
                    </div>
                    {t.duration && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t.duration} min</span>
                      </div>
                    )}
                  </div>

                  {/* Actions édition */}
                  {editable && t.id && (
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => setModal({ open: true, training: t })}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                        aria-label="Modifier"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(t.id!)}
                        disabled={deleting === t.id}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors disabled:opacity-50"
                        aria-label="Supprimer"
                      >
                        {deleting === t.id ? (
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {modal.open && date && (
        <TrainingFormModal
          initial={modal.training}
          date={date}
          onClose={() => setModal({ open: false })}
          onSave={handleSaved}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium transition-all
          ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
