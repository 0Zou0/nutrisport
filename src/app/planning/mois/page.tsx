'use client';

import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { MonthPlanning } from '@/components/planning/MonthPlanning';
import { useRole } from '@/context/RoleContext';

export default function MoisPage() {
  const { role } = useRole();

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Sélectionnez votre rôle pour continuer</p>
          <Link href="/" className="text-white underline">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Planning du mois</h1>
        <p className="text-sm text-slate-500 mt-1">Cliquez sur un jour pour voir le détail</p>
      </div>
      <MonthPlanning role={role} />
    </AppLayout>
  );
}
