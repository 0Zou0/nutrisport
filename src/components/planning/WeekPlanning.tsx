'use client';

import { useState } from 'react';
import { DayCard } from './DayCard';
import { getWeekDates, addWeeks, formatDate } from '@/lib/utils';
import { getWeekData } from '@/lib/mock-data';
import { UserRole } from '@/types';

interface WeekPlanningProps {
  role: UserRole;
  initialDate?: string;
}

export function WeekPlanning({ role, initialDate }: WeekPlanningProps) {
  const [referenceDate, setReferenceDate] = useState(initialDate ?? new Date().toISOString().split('T')[0]);

  const weekDates = getWeekDates(referenceDate);
  const weekData = getWeekData(weekDates);

  const mondayLabel = formatDate(weekDates[0]);
  const sundayLabel = formatDate(weekDates[6]);

  function prev() {
    setReferenceDate(d => addWeeks(d, -1));
  }
  function next() {
    setReferenceDate(d => addWeeks(d, 1));
  }
  function goToday() {
    setReferenceDate(new Date().toISOString().split('T')[0]);
  }

  return (
    <section>
      {/* En-tête semaine */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          onClick={prev}
          aria-label="Semaine précédente"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <div className="text-sm font-semibold text-slate-800 capitalize">
            {new Date(weekDates[0] + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            {' — '}
            {new Date(weekDates[6] + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <button
            onClick={goToday}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors mt-0.5"
          >
            Revenir à aujourd&apos;hui
          </button>
        </div>

        <button
          onClick={next}
          aria-label="Semaine suivante"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Jours */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {weekDates.map((date, i) => (
          <DayCard
            key={date}
            date={date}
            data={weekData[i]}
            role={role}
          />
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-3 text-center">
        {mondayLabel.split(' ').slice(0, -1).join(' ')} → {sundayLabel} — Faites défiler horizontalement sur mobile
      </p>
    </section>
  );
}
