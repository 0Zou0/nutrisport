'use client';

import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { ROLE_CONFIGS } from '@/lib/utils';

export function Header() {
  const { role, user, signOut } = useRole();
  const config = role ? ROLE_CONFIGS[role] : null;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg shrink-0">
          <span className="text-xl">🏉</span>
          <span>NutriSport</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Rôle actif */}
          {config && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bgColor} text-white`}>
              <span>{config.icon}</span>
              <span className="hidden sm:inline">{config.label}</span>
            </span>
          )}

          {/* Utilisateur + déconnexion */}
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs hidden sm:block truncate max-w-[140px]">
                {user.name || user.email}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
                title="Se déconnecter"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
