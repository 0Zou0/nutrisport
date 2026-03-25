import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { RoleProvider } from '@/context/RoleContext';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NutriSport — Nutrition & Planning sportif',
  description: 'Plateforme de suivi nutritionnel et planification des entraînements pour sportifs de haut niveau.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
