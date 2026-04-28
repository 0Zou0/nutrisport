'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { todayISO } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const { role, loading, signOut } = useRole();

  useEffect(() => {
    if (loading) return;
    if (role) {
      router.replace(`/planning/jour/${todayISO()}`);
    }
  }, [role, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-5xl">🏉</span>
          <p className="text-slate-400 text-sm">Chargement…</p>
        </div>
      </main>
    );
  }

  if (!role) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <span className="text-5xl">⚠️</span>
          <h1 className="text-white font-bold text-lg">Compte non configuré</h1>
          <p className="text-slate-400 text-sm">
            Votre compte existe dans Supabase Auth mais n&apos;a pas encore de profil en base de données.
            Demandez à un administrateur de créer votre enregistrement dans la table <code className="text-blue-400">User</code>.
          </p>
          <button
            onClick={signOut}
            className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </main>
    );
  }

  return null;
}
