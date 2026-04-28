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
  const { role, user, signOut } = useRole();
  const config = role ? ROLE_CONFIGS[role] : null;

  const bgActive = config?.bgColor ?? 'bg-blue-600';

  return (
    <nav className="bg-slate-900/95 backdrop-blur border-b border-white/5" aria-label="Navigation principale">
      {/* Barre utilisateur */}
      <div className="max-w-5xl mx-auto px-3 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🏉</span>
          <span className="text-white text-xs font-bold tracking-tight">NutriSport</span>
          {config && (
            <span className="ml-1 text-xs text-slate-400 font-medium">
              — {config.icon} {config.label}
            </span>
          )}
        </div>
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs hidden sm:block truncate max-w-[160px]">
              {user.name || user.email}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-500/10"
              title="Se déconnecter"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        )}
      </div>

      {/* Onglets de navigation */}
      <div className="max-w-5xl mx-auto px-3">
        <ul className="flex gap-2 py-2.5" role="list">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const to = href();
            const isActive =
              (label === "Aujourd'hui" && pathname.startsWith('/planning/jour')) ||
              (label === 'Semaine'     && pathname.startsWith('/planning/semaine')) ||
              (label === 'Mois'        && pathname.startsWith('/planning/mois'));
            return (
              <li key={label} className="flex-1">
                <Link
                  href={to}
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
