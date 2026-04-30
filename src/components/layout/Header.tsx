'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { ROLE_CONFIGS } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const { role } = useRole();
  const config = role ? ROLE_CONFIGS[role] : null;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg shrink-0">
          <span className="text-xl">🏉</span>
          <span>NutriSport</span>
        </Link>

        {/* Rôle actif */}
        {config && (
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bgColor} text-white`}>
              <span>{config.icon}</span>
              <span className="hidden sm:inline">{config.label}</span>
            </span>
            <button
              onClick={() => router.push('/')}
              className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700"
            >
              Changer
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
