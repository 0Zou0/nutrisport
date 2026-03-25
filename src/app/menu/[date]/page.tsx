'use client';

import { use } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { MenuBlock } from '@/components/planning/MenuBlock';
import { NutritionBlock } from '@/components/planning/NutritionBlock';
import { useRole } from '@/context/RoleContext';
import { getDayData } from '@/lib/mock-data';
import { formatDate, ROLE_CONFIGS } from '@/lib/utils';

interface MenuPageProps {
  params: Promise<{ date: string }>;
}

export default function MenuPage({ params }: MenuPageProps) {
  const { date } = use(params);
  const { role } = useRole();
  const data = getDayData(date);

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

  const config = ROLE_CONFIGS[role];

  return (
    <AppLayout>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900 capitalize">
          Menu — {formatDate(date)}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Vue accès rapide cuisinier
        </p>
      </div>

      {!data ? (
        <div className="text-center py-16">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-slate-500">Aucun menu pour cette journée</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <NutritionBlock orientations={data.orientations} role={role} />
          <MenuBlock menu={data.menu} role={role} />
        </div>
      )}
    </AppLayout>
  );
}
