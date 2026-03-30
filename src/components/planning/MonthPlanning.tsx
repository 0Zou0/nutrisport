'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  getMonthGrid, formatMonthYear, isToday, ORIENTATION_DOT, INTENSITY_COLORS,
} from '@/lib/utils';
import { getMonthData } from '@/lib/mock-data';
import { UserRole } from '@/types';
import { ROLE_CONFIGS } from '@/lib/utils';

interface MonthPlanningProps {
  role: UserRole;
}

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const TRAINING_ICONS: Record<string, string> = {
  'Musculation': '💪',
  'Cardio': '🏃',
  'Mobilité': '🧘',
  'Récupération': '🛁',
  'Récupération active': '🛁',
  'Repos': '😴',
  'Match': '🏆',
  'Rugby — séance collective': '🏉',
};

function getTrainingIcon(type: string): string {
  for (const [key, icon] of Object.entries(TRAINING_ICONS)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '🏋️';
}

export function MonthPlanning({ role }: MonthPlanningProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const grid = getMonthGrid(year, month);
  const monthData = getMonthData(year, month);
  const config = ROLE_CONFIGS[role];

  function prev() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function next() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }
  function goCurrentMonth() {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }

  return (
    <section>
      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          aria-label="Mois précédent"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-800 capitalize">
            {formatMonthYear(year, month)}
          </h2>
        </div>

        <button
          onClick={next}
          aria-label="Mois suivant"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Grille */}
      <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
        {/* En-têtes jours */}
        <div className="grid grid-cols-7 border-b border-slate-300 bg-slate-800">
          {WEEKDAY_LABELS.map(label => (
            <div key={label} className="py-2.5 text-center text-xs font-bold text-slate-300 uppercase tracking-wide">
              {label}
            </div>
          ))}
        </div>

        {/* Semaines */}
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-slate-200 last:border-b-0">
            {week.map((date, di) => {
              if (!date) {
                return <div key={`empty-${wi}-${di}`} className="min-h-[72px] bg-slate-100" />;
              }
              const data = monthData[date];
              const today = isToday(date);
              const dayNum = new Date(date + 'T00:00:00').getDate();

              return (
                <Link
                  key={date}
                  href={`/planning/jour/${date}`}
                  className={`
                    min-h-[72px] p-1.5 border-r border-slate-200 last:border-r-0
                    flex flex-col gap-1 hover:bg-slate-100 transition-colors cursor-pointer
                    ${today ? `${config.lightBg}` : 'bg-white'}
                  `}
                >
                  {/* Numéro */}
                  <span className={`
                    text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full
                    ${today ? `${config.bgColor} text-white` : 'text-slate-700'}
                  `}>
                    {dayNum}
                  </span>

                  {data && (
                    <>
                      {/* Icônes entraînements */}
                      <div className="flex gap-0.5 flex-wrap">
                        {data.trainings.map((t, i) => (
                          <span key={i} className="text-[11px]" title={t.type}>
                            {getTrainingIcon(t.type)}
                          </span>
                        ))}
                      </div>

                      {/* Points orientations */}
                      <div className="flex gap-0.5 flex-wrap mt-auto">
                        {data.orientations.map((o) => (
                          <span
                            key={o}
                            className={`w-1.5 h-1.5 rounded-full ${ORIENTATION_DOT[o]}`}
                            title={o}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-full ${config.bgColor}`} />
          Aujourd&apos;hui
        </span>
        <span className="flex items-center gap-1">💪 Musculation</span>
        <span className="flex items-center gap-1">🏉 Rugby</span>
        <span className="flex items-center gap-1">🏆 Match</span>
        <span className="flex items-center gap-1">😴 Repos</span>
      </div>
    </section>
  );
}
