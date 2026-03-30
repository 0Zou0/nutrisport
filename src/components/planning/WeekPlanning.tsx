'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DayCard } from './DayCard';
import { Badge } from '@/components/ui/Badge';
import { getWeekDates, addWeeks, isToday, ORIENTATION_DOT, ORIENTATION_LABELS, INTENSITY_COLORS, INTENSITY_LABELS, ROLE_CONFIGS } from '@/lib/utils';
import { DayData, UserRole } from '@/types';

interface WeekPlanningProps {
  role: UserRole;
  initialDate?: string;
}

const SLOT_ICONS = { morning: '☀️', afternoon: '🌙' };

function DayRow({ date, data, role }: { date: string; data: DayData | null; role: UserRole }) {
  const today = isToday(date);
  const config = ROLE_CONFIGS[role];
  const d = new Date(date + 'T00:00:00');
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'short' });
  const dayNum = d.getDate();
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;

  return (
    <Link
      href={`/planning/jour/${date}`}
      className={`
        flex items-center gap-3 px-3 py-3 rounded-xl border transition-all active:scale-[0.98]
        ${today
          ? `${config.lightBg} border-2 ${config.borderColor} shadow-sm`
          : isWeekend
            ? 'bg-slate-100 border-slate-300'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
        }
      `}
    >
      {/* Jour */}
      <div className="flex flex-col items-center w-10 shrink-0">
        <span className={`text-xs font-semibold uppercase ${today ? config.color : isWeekend ? 'text-slate-500' : 'text-slate-400'}`}>
          {weekday}
        </span>
        <span className={`
          text-xl font-bold leading-none mt-0.5
          ${today ? `w-8 h-8 flex items-center justify-center rounded-full ${config.bgColor} text-white text-base` : isWeekend ? 'text-slate-600' : 'text-slate-800'}
        `}>
          {dayNum}
        </span>
      </div>

      {/* Séparateur */}
      <div className={`w-px self-stretch ${today ? config.borderColor : 'bg-slate-200'}`} />

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        {!data ? (
          <span className="text-xs text-slate-400 italic">Aucune donnée</span>
        ) : data.trainings.length === 0 ? (
          <span className="text-sm text-slate-500">😴 Repos</span>
        ) : (
          <div className="flex flex-col gap-1">
            {data.trainings.map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs shrink-0">{SLOT_ICONS[t.slot]}</span>
                <span className="text-sm text-slate-700 font-medium truncate">{t.type}</span>
                <Badge className={`${INTENSITY_COLORS[t.intensity]} shrink-0 ml-auto`} size="sm">
                  {INTENSITY_LABELS[t.intensity].charAt(0)}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Orientations */}
        {data && data.orientations.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {data.orientations.map(o => (
              <span
                key={o}
                className={`w-2 h-2 rounded-full ${ORIENTATION_DOT[o]}`}
                title={ORIENTATION_LABELS[o]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Flèche */}
      <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function WeekPlanning({ role, initialDate }: WeekPlanningProps) {
  const [referenceDate, setReferenceDate] = useState(initialDate ?? new Date().toISOString().split('T')[0]);
  const [weekData, setWeekData] = useState<(DayData | null)[]>([]);

  const weekDates = getWeekDates(referenceDate);

  useEffect(() => {
    const dates = getWeekDates(referenceDate);
    fetch(`/api/planning/week?dates=${dates.join(',')}`)
      .then(r => r.json())
      .then(setWeekData)
      .catch(() => setWeekData(new Array(7).fill(null)));
  }, [referenceDate]);

  function prev() { setReferenceDate(d => addWeeks(d, -1)); }
  function next() { setReferenceDate(d => addWeeks(d, 1)); }
  function goToday() { setReferenceDate(new Date().toISOString().split('T')[0]); }

  const weekLabel = `${new Date(weekDates[0] + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })} — ${new Date(weekDates[6] + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}`;

  return (
    <section>
      {/* Navigation semaine */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          onClick={prev}
          aria-label="Semaine précédente"
          className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 shadow-sm transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <div className="text-sm font-semibold text-slate-800 capitalize">{weekLabel}</div>
        </div>

        <button
          onClick={next}
          aria-label="Semaine suivante"
          className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 shadow-sm transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Vue mobile : liste verticale */}
      <div className="flex flex-col gap-2 md:hidden">
        {weekDates.map((date, i) => (
          <DayRow key={date} date={date} data={weekData[i]} role={role} />
        ))}
      </div>

      {/* Vue desktop : cartes horizontales */}
      <div className="hidden md:flex gap-3 overflow-x-auto overflow-y-visible pb-2 pt-1">
        {weekDates.map((date, i) => (
          <DayCard key={date} date={date} data={weekData[i]} role={role} />
        ))}
      </div>
    </section>
  );
}
