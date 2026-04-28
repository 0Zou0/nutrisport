'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { todayISO } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const { role, loading } = useRole();

  useEffect(() => {
    if (loading) return;
    if (role) {
      router.replace(`/planning/jour/${todayISO()}`);
    }
  }, [role, loading, router]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="text-5xl">🏉</span>
        <p className="text-slate-400 text-sm">Chargement…</p>
      </div>
    </main>
  );
}
