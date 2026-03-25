'use client';

import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { ROLE_CONFIGS } from '@/lib/utils';
import { UserRole } from '@/types';

const ROLES: UserRole[] = ['cook', 'coach', 'player', 'nutritionist'];

const ROLE_GRADIENTS: Record<UserRole, string> = {
  cook: 'from-green-500 to-emerald-600',
  coach: 'from-blue-500 to-blue-700',
  player: 'from-orange-500 to-orange-600',
  nutritionist: 'from-violet-500 to-violet-700',
};

const ROLE_SHADOW: Record<UserRole, string> = {
  cook: 'hover:shadow-green-200',
  coach: 'hover:shadow-blue-200',
  player: 'hover:shadow-orange-200',
  nutritionist: 'hover:shadow-violet-200',
};

export default function HomePage() {
  const router = useRouter();
  const { setRole } = useRole();

  function handleSelectRole(role: UserRole) {
    setRole(role);
    router.push(`/dashboard/${role}`);
  }

  return (
    <main className="flex flex-col min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🏉</span>
          <span className="text-3xl font-bold text-white tracking-tight">NutriSport</span>
        </div>
        <p className="text-slate-400 text-base max-w-sm">
          Planification nutritionnelle et sportive pour athlètes de haut niveau
        </p>
        <div className="mt-6 px-4 py-1.5 bg-slate-800 rounded-full text-slate-400 text-xs font-medium">
          MVP v0.1 — Saison 2025–2026
        </div>
      </div>

      {/* Sélection du rôle */}
      <div className="flex-1 flex flex-col items-center px-4 pb-12">
        <p className="text-slate-400 text-sm mb-6 text-center">Sélectionnez votre rôle pour continuer</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {ROLES.map((roleId) => {
            const config = ROLE_CONFIGS[roleId];
            return (
              <button
                key={roleId}
                onClick={() => handleSelectRole(roleId)}
                className={`
                  group relative overflow-hidden rounded-2xl p-6 text-left
                  bg-gradient-to-br ${ROLE_GRADIENTS[roleId]}
                  shadow-lg ${ROLE_SHADOW[roleId]}
                  hover:shadow-2xl hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-200
                `}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{config.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{config.label}</h2>
                    <p className="text-white/75 text-sm mt-1">{config.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-white/60 text-xs font-medium">
                  <span>Accéder</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-slate-600 text-xs">
        © 2026 NutriSport — Tous droits réservés
      </div>
    </main>
  );
}
