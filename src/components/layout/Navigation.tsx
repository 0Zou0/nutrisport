'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { ROLE_CONFIGS, todayISO } from '@/lib/utils';

const NAV_ITEMS = [
  { label: "Aujourd'hui", href: () => `/planning/jour/${todayISO()}`, icon: '📅' },
  { label: 'Semaine', href: () => '/planning/semaine', icon: '📆' },
  { label: 'Mois', href: () => '/planning/mois', icon: '🗓️' },
];

export function Navigation() {
  const pathname = usePathname();
  const { role } = useRole();
  const config = role ? ROLE_CONFIGS[role] : null;

  const borderActive = config?.borderColor ?? 'border-blue-600';
  const textActive = config?.color ?? 'text-blue-700';

  return (
    <nav className="bg-white border-b border-slate-200" aria-label="Navigation principale">
      <div className="max-w-5xl mx-auto px-4">
        <ul className="flex gap-0 overflow-x-auto scrollbar-hide" role="list">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const to = href();
            const isActive = pathname === to || (label === 'Semaine' && pathname.startsWith('/planning/semaine')) || (label === 'Mois' && pathname.startsWith('/planning/mois'));
            return (
              <li key={label}>
                <Link
                  href={to}
                  className={`
                    flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                    ${isActive
                      ? `${borderActive} ${textActive}`
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
