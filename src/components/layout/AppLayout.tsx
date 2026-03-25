'use client';

import { Header } from './Header';
import { Navigation } from './Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      {showNav && <Navigation />}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
