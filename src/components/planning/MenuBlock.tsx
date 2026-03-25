'use client';

import { useState } from 'react';
import { DayMenu, MenuOption, UserRole } from '@/types';
import { canEdit } from '@/lib/permissions';

interface MenuBlockProps {
  menu: DayMenu;
  role: UserRole;
}

interface MenuOptionCardProps {
  option: MenuOption;
  canToggle: boolean;
  onToggle: () => void;
}

function MenuOptionCard({ option, canToggle, onToggle }: MenuOptionCardProps) {
  return (
    <div className={`
      flex items-start gap-3 p-3 rounded-lg border transition-colors
      ${option.available
        ? 'bg-white border-slate-200'
        : 'bg-slate-50 border-slate-200 opacity-60'
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
      </div>

      {canToggle && (
        <button
          onClick={onToggle}
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
}

export function MenuBlock({ menu: initialMenu, role }: MenuBlockProps) {
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
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍽️</span>
          <h2 className="font-semibold text-slate-800">Menu du jour</h2>
        </div>
        <div className="flex items-center gap-1.5">
          {canEditTitle && (
            <span className="text-xs px-2 py-0.5 bg-violet-50 text-violet-600 rounded-full font-medium">
              Nutritionniste
            </span>
          )}
          {canToggleAvailability && (
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">
              Cuisinier
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* Entrées */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
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

        <div className="border-t border-slate-100" />

        {/* Plats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
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
