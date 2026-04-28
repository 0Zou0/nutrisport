'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types';
import { createSupabaseBrowserClient } from '@/lib/supabase-client';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface RoleContextValue {
  role: UserRole | null;
  user: UserInfo | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const RoleContext = createContext<RoleContextValue>({
  role: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.role) setUser(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <RoleContext.Provider value={{ role: user?.role ?? null, user, loading, signOut }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
