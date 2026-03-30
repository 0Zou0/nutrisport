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

  const bgActive = config?.bgColor ?? 'bg-blue-600';

  return (
    <nav className="bg-slate-800 border-b border-slate-700" aria-label="Navigation principale">
      <div className="max-w-5xl mx-auto px-4">
        <ul className="flex justify-center gap-1 overflow-x-auto py-2" role="list">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const to = href();
            const isActive =
              (label === "Aujourd'hui" && pathname.startsWith('/planning/jour')) ||
              (label === 'Semaine' && pathname.startsWith('/planning/semaine')) ||
              (label === 'Mois' && pathname.startsWith('/planning/mois'));
            return (
              <li key={label}>
                <Link
                  href={to}
                  className={`
                    flex items-center justify-center gap-1.5 w-32 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                    ${isActive
                      ? `${bgActive} text-white shadow-sm`
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
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
