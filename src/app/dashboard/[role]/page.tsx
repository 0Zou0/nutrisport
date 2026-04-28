'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { todayISO } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/planning/jour/${todayISO()}`);
  }, [router]);

  return null;
}
