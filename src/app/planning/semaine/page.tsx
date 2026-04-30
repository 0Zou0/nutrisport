'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { WeekPlanning } from '@/components/planning/WeekPlanning';
import { useRole } from '@/context/RoleContext';

export default function SemainePage() {
  const { role, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !role) {
      router.replace('/login');
    }
  }, [loading, role, router]);

  if (loading || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">🏉</span>
          <p className="text-slate-400 text-sm">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <WeekPlanning role={role} />
    </AppLayout>
  );
}
