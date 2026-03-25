'use client';

import Link from 'next/link';
import { DayData, UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import {
  ORIENTATION_COLORS, ORIENTATION_LABELS, ORIENTATION_DOT,
  INTENSITY_COLORS, INTENSITY_LABELS,
  formatDayNum, formatWeekdayShort, isToday,
} from '@/lib/utils';
import { ROLE_CONFIGS } from '@/lib/utils';

interface DayCardProps {
  date: string;
  data: DayData | null;
  role: UserRole;
  compact?: boolean;
}

export function DayCard({ date, data, role, compact = false }: DayCardProps) {
  const today = isToday(date);
  const config = ROLE_CONFIGS[role];
  const dayNum = formatDayNum(date);
  const weekday = formatWeekdayShort(date);

  return (
    <Link
      href={`/planning/jour/${date}`}
      className={`
        group flex flex-col rounded-xl border bg-white
        hover:shadow-md transition-all duration-150
        ${today ? `border-2 ${config.borderColor} shadow-sm` : 'border-slate-200'}
        ${compact ? 'min-w-[130px]' : 'min-w-[160px]'}
      `}
    >
      {/* En-tête date */}
      <div className={`
        flex items-center justify-between px-3 py-2 rounded-t-xl
        ${today ? `${config.lightBg}` : 'bg-slate-50'}
      `}>
        <div>
          <div className={`text-xs font-medium uppercase tracking-wide ${today ? config.color : 'text-slate-400'}`}>
            {weekday}
          </div>
          <div className={`text-xl font-bold leading-none ${today ? config.color : 'text-slate-800'}`}>
            {dayNum}
          </div>
        </div>
        {today && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.bgColor} text-white`}>
            Auj.
          </span>
        )}
      </div>

      {/* Corps */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        {!data ? (
          <span className="text-xs text-slate-400 italic">Aucune donnée</span>
        ) : (
          <>
            {/* Entraînements */}
            {data.trainings.length > 0 ? (
              <div className="flex flex-col gap-1">
                {data.trainings.map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-xs">{t.slot === 'morning' ? '🌅' : '🌆'}</span>
                    <span className="text-xs text-slate-600 truncate flex-1">{t.type}</span>
                    <Badge className={INTENSITY_COLORS[t.intensity]} size="sm">
                      {INTENSITY_LABELS[t.intensity].charAt(0)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-xs">😴</span>
                <span className="text-xs text-slate-400">Repos</span>
              </div>
            )}

            {/* Séparateur */}
            {!compact && <div className="border-t border-slate-100" />}

            {/* Orientations nutritionnelles */}
            {!compact && (
              <div className="flex flex-wrap gap-1">
                {data.orientations.map((o) => (
                  <Badge key={o} className={ORIENTATION_COLORS[o]} size="sm">
                    {o}
                  </Badge>
                ))}
              </div>
            )}
            {compact && (
              <div className="flex gap-1 flex-wrap">
                {data.orientations.map((o) => (
                  <span key={o} className={`w-2 h-2 rounded-full ${ORIENTATION_DOT[o]}`} title={ORIENTATION_LABELS[o]} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Flèche hover */}
      <div className="px-3 pb-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
