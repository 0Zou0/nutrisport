'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { ROLE_CONFIGS, todayISO } from '@/lib/utils';

const BASE_NAV_ITEMS = [
  { label: "Aujourd'hui", href: () => `/planning/jour/${todayISO()}`, icon: '📅', cookOnly: false },
  { label: 'Semaine', href: () => '/planning/semaine', icon: '📆', cookOnly: false },
  { label: 'Mois', href: () => '/planning/mois', icon: '🗓️', cookOnly: false },
  { label: 'Recettes', href: () => '/recettes', icon: '📋', cookOnly: true },
];

export function Navigation() {
  const pathname = usePathname();
  const { role } = useRole();
  const config = role ? ROLE_CONFIGS[role] : null;

  const bgActive = config?.bgColor ?? 'bg-blue-600';
  const navItems = BASE_NAV_ITEMS.filter(item => !item.cookOnly || role === 'cook');

  return (
    <nav className="bg-slate-900/95 backdrop-blur border-b border-white/5" aria-label="Navigation principale">
      <div className="max-w-5xl mx-auto px-3">
        <ul className="flex gap-2 py-2.5" role="list">
          {navItems.map(({ label, href, icon }) => {
            const to = href();
            const isActive =
              (label === "Aujourd'hui" && pathname.startsWith('/planning/jour')) ||
              (label === 'Semaine'     && pathname.startsWith('/planning/semaine')) ||
              (label === 'Mois'        && pathname.startsWith('/planning/mois')) ||
              (label === 'Recettes'    && pathname.startsWith('/recettes'));
            return (
              <li key={label} className="flex-1">
                <Link
                  href={to}
                  prefetch={false}
                  className={`
                    relative flex flex-col items-center gap-0.5 w-full px-2 py-2 rounded-xl text-xs font-semibold
                    transition-all duration-200 select-none
                    ${isActive
                      ? `${bgActive} text-white shadow-lg shadow-black/30 scale-[1.04]`
                      : 'text-slate-400 hover:text-white hover:bg-white/8'
                    }
                  `}
                >
                  <span className="text-lg leading-none">{icon}</span>
                  <span className="tracking-wide">{label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/40" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
