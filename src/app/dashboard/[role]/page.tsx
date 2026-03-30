'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { todayISO, ROLE_CONFIGS } from '@/lib/utils';
import { UserRole } from '@/types';

interface DashboardPageProps {
  params: Promise<{ role: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { role: routeRole } = use(params);
  const { setRole } = useRole();
  const router = useRouter();

  useEffect(() => {
    const validRoles = Object.keys(ROLE_CONFIGS) as UserRole[];
    const r = routeRole as UserRole;
    if (validRoles.includes(r)) {
      setRole(r);
    }
    router.replace(`/planning/jour/${todayISO()}`);
  }, [routeRole, setRole, router]);

  return null;
}
