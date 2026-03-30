'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { TrainingBlock } from '@/components/planning/TrainingBlock';
import { NutritionBlock } from '@/components/planning/NutritionBlock';
import { MenuBlock } from '@/components/planning/MenuBlock';
import { useRole } from '@/context/RoleContext';
import { formatDate, ROLE_CONFIGS } from '@/lib/utils';
import { DayData } from '@/types';

interface DayPageProps {
  params: Promise<{ date: string }>;
}

export default function DayPage({ params }: DayPageProps) {
  const { date } = use(params);
  const { role } = useRole();
  const [data, setData] = useState<DayData | null | undefined>(undefined);

  function fetchData() {
    fetch(`/api/planning/day/${date}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null));
  }

  useEffect(() => { fetchData(); }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const prevDate = (() => {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  })();
  const nextDate = (() => {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  return (
    <AppLayout>
      {/* En-tête journée */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/planning/jour/${prevDate}`}
          aria-label="Jour précédent"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-900 capitalize">
            {formatDate(date)}
          </h1>
        </div>

        <Link
          href={`/planning/jour/${nextDate}`}
          aria-label="Jour suivant"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {data === undefined ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      ) : !data ? (
        <div className="text-center py-16">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-slate-500">Aucune donnée pour cette journée</p>
          <Link href="/planning/semaine" className={`mt-4 inline-block text-sm font-medium ${config.color} underline`}>
            Retour au planning
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <TrainingBlock
            trainings={data.trainings}
            role={role}
            date={date}
            onRefresh={fetchData}
          />
          <NutritionBlock
            orientations={data.orientations}
            role={role}
            date={date}
            onRefresh={fetchData}
          />
          <MenuBlock menu={data.menu} role={role} />
        </div>
      )}
    </AppLayout>
  );
}
