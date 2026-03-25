'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { DayCard } from '@/components/planning/DayCard';
import { TrainingBlock } from '@/components/planning/TrainingBlock';
import { NutritionBlock } from '@/components/planning/NutritionBlock';
import { MenuBlock } from '@/components/planning/MenuBlock';
import { useRole } from '@/context/RoleContext';
import { getDayData, getWeekData } from '@/lib/mock-data';
import { getWeekDates, todayISO, formatDate, ROLE_CONFIGS } from '@/lib/utils';
import { UserRole } from '@/types';

interface DashboardPageProps {
  params: Promise<{ role: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { role: routeRole } = use(params);
  const { role, setRole } = useRole();

  useEffect(() => {
    if (routeRole && routeRole !== role) {
      setRole(routeRole as UserRole);
    }
  }, [routeRole, role, setRole]);

  const activeRole = (role ?? routeRole) as UserRole;
  const config = ROLE_CONFIGS[activeRole];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Rôle non reconnu</p>
          <Link href="/" className="text-white underline">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  const today = todayISO();
  const todayData = getDayData(today);
  const weekDates = getWeekDates();
  const weekData = getWeekData(weekDates);

  return (
    <AppLayout>
      {/* Bienvenue */}
      <div className={`rounded-2xl ${config.lightBg} border ${config.borderColor} px-5 py-4 mb-6`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{config.icon}</span>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Bonjour, <span className={config.color}>{config.label}</span>
            </h1>
            <p className="text-sm text-slate-500 capitalize">{formatDate(today)}</p>
          </div>
        </div>
      </div>

      {/* Vue cook : menu du jour en priorité */}
      {activeRole === 'cook' && todayData && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Menu d&apos;aujourd&apos;hui</h2>
            <Link href={`/planning/jour/${today}`} className={`text-sm font-medium ${config.color} hover:underline`}>
              Voir le détail →
            </Link>
          </div>
          <MenuBlock menu={todayData.menu} role={activeRole} />
        </div>
      )}

      {/* Vue player : planning journée en priorité */}
      {activeRole === 'player' && todayData && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Votre journée</h2>
            <Link href={`/planning/jour/${today}`} className={`text-sm font-medium ${config.color} hover:underline`}>
              Détail →
            </Link>
          </div>
          <TrainingBlock trainings={todayData.trainings} role={activeRole} />
          <NutritionBlock orientations={todayData.orientations} role={activeRole} />
          <div className="mt-2">
            <h2 className="font-semibold text-slate-800 mb-3">Semaine en cours</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {weekDates.map((date, i) => (
                <DayCard key={date} date={date} data={weekData[i]} role={activeRole} compact />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vue coach : planning sportif */}
      {activeRole === 'coach' && (
        <div className="flex flex-col gap-4">
          {todayData && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">Séances aujourd&apos;hui</h2>
                <Link href={`/planning/jour/${today}`} className={`text-sm font-medium ${config.color} hover:underline`}>
                  Détail →
                </Link>
              </div>
              <TrainingBlock trainings={todayData.trainings} role={activeRole} />
            </>
          )}
          <div>
            <h2 className="font-semibold text-slate-800 mb-3">Semaine en cours</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {weekDates.map((date, i) => (
                <DayCard key={date} date={date} data={weekData[i]} role={activeRole} />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/planning/semaine"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl ${config.bgColor} text-white font-medium text-sm hover:opacity-90 transition-opacity`}
            >
              📆 Vue semaine
            </Link>
            <Link
              href="/planning/mois"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              🗓️ Vue mois
            </Link>
          </div>
        </div>
      )}

      {/* Vue nutritionniste : vue complète */}
      {activeRole === 'nutritionist' && todayData && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Journée complète</h2>
            <Link href={`/planning/jour/${today}`} className={`text-sm font-medium ${config.color} hover:underline`}>
              Modifier →
            </Link>
          </div>
          <TrainingBlock trainings={todayData.trainings} role={activeRole} />
          <NutritionBlock orientations={todayData.orientations} role={activeRole} />
          <MenuBlock menu={todayData.menu} role={activeRole} />
          <div className="flex gap-3">
            <Link
              href="/planning/semaine"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl ${config.bgColor} text-white font-medium text-sm hover:opacity-90 transition-opacity`}
            >
              📆 Vue semaine
            </Link>
            <Link
              href="/planning/mois"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              🗓️ Vue mois
            </Link>
          </div>
        </div>
      )}

      {/* Fallback si pas de données aujourd'hui */}
      {!todayData && (
        <div className="text-center py-12">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-slate-500">Aucune donnée pour aujourd&apos;hui</p>
          <Link href="/planning/semaine" className={`mt-4 inline-block text-sm font-medium ${config.color} underline`}>
            Voir le planning de la semaine
          </Link>
        </div>
      )}
    </AppLayout>
  );
}
