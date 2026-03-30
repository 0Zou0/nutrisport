'use client';

import React from 'react';
import { Training, UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { INTENSITY_COLORS, INTENSITY_LABELS } from '@/lib/utils';
import { canEdit } from '@/lib/permissions';

interface TrainingBlockProps {
  trainings: Training[];
  role: UserRole;
}

const SLOT_LABELS = { morning: 'Matin', afternoon: 'Après-midi' };
const SLOT_ICONS = { morning: '☀️', afternoon: '🌙' };

export function TrainingBlock({ trainings, role }: TrainingBlockProps) {
  const editable = canEdit(role, 'training');

  return (
    <section className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏋️</span>
          <h2 className="font-semibold text-white">Entraînements</h2>
        </div>
        {editable && (
          <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full font-medium">
            Modifiable
          </span>
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
          <div className="grid gap-3" style={{ gridTemplateColumns: '64px 1fr' }}>
            {trainings.map((t, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-xl">{SLOT_ICONS[t.slot]}</span>
                  <span className="text-xs text-slate-500 font-medium text-center">{SLOT_LABELS[t.slot]}</span>
                </div>
                <div className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2.5">
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
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
