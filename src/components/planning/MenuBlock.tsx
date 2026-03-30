'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DayMenu, MenuOption, UserRole } from '@/types';
import { canEdit } from '@/lib/permissions';

interface MenuBlockProps {
  menu: DayMenu;
  role: UserRole;
  detailHref?: string;
}

interface MenuOptionCardProps {
  option: MenuOption;
  canToggle: boolean;
  onToggle: () => void;
}

function MenuOptionCard({ option, canToggle, onToggle }: MenuOptionCardProps) {
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
          <span className="font-medium text-sm text-slate-800 truncate">{option.title}</span>
          {!option.available && (
            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full shrink-0">
              Indisponible
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
        {option.recipeId && (
          <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-blue-600 group-hover:underline">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Voir la fiche recette
          </span>
        )}
      </div>

      {canToggle && (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
          aria-label={option.available ? 'Marquer indisponible' : 'Marquer disponible'}
          className={`
            shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${option.available
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
            }
          `}
        >
          {option.available ? (
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
    </div>
  );

  if (option.recipeId) {
    return <Link href={`/recette/${option.recipeId}`}>{card}</Link>;
  }
  return card;
}

export function MenuBlock({ menu: initialMenu, role, detailHref }: MenuBlockProps) {
  const [menu, setMenu] = useState<DayMenu>(initialMenu);
  const canToggleAvailability = canEdit(role, 'menu-availability');
  const canEditTitle = canEdit(role, 'menu-title');

  function toggleOption(section: 'starters' | 'mains', id: string) {
    setMenu(prev => ({
      ...prev,
      [section]: prev[section].map(opt =>
        opt.id === id ? { ...opt, available: !opt.available } : opt
      ),
    }));
  }

  const availableStarters = menu.starters.filter(o => o.available).length;
  const availableMains = menu.mains.filter(o => o.available).length;

  return (
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
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Entrées
            </h3>
            <span className="text-xs text-slate-400">
              {availableStarters}/{menu.starters.length} disponible{availableStarters > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {menu.starters.map((opt) => (
              <MenuOptionCard
                key={opt.id}
                option={opt}
                canToggle={canToggleAvailability}
                onToggle={() => toggleOption('starters', opt.id)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200" />

        {/* Plats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Plats principaux
            </h3>
            <span className="text-xs text-slate-400">
              {availableMains}/{menu.mains.length} disponible{availableMains > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {menu.mains.map((opt) => (
              <MenuOptionCard
                key={opt.id}
                option={opt}
                canToggle={canToggleAvailability}
                onToggle={() => toggleOption('mains', opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
