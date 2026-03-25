'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types';

interface RoleContextValue {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue>({
  role: null,
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nutrisport-role') as UserRole | null;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('nutrisport-role', newRole);
    setRoleState(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
