import { NutritionalOrientation, TrainingIntensity, UserRole } from '@/types';

export const ORIENTATION_LABELS: Record<NutritionalOrientation, string> = {
  'ANTI-INFLAM': 'Anti-inflammatoire',
  'GLUC-MOD': 'Glucides modérés',
  'GLUC-HAUT': 'Glucides hauts — grosse journée',
  'PROT-BON': 'Bonne source de protéines',
  'PROT-MAIGRE': 'Protéines maigres',
  'ANTIOXYDANT': 'Antioxydants — Viande rouge',
  'VIANDE-BLANCHE': 'Viande blanche — Glucides mod. à hauts',
  'GROSSE-MAT': 'Grosse matinée — Viande blanche, Glucides mod-haut',
};

export const ORIENTATION_COLORS: Record<NutritionalOrientation, string> = {
  'ANTI-INFLAM': 'bg-green-100 text-green-800 border border-green-200',
  'GLUC-MOD': 'bg-amber-100 text-amber-800 border border-amber-200',
  'GLUC-HAUT': 'bg-orange-100 text-orange-800 border border-orange-200',
  'PROT-BON': 'bg-blue-100 text-blue-800 border border-blue-200',
  'PROT-MAIGRE': 'bg-sky-100 text-sky-800 border border-sky-200',
  'ANTIOXYDANT': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'VIANDE-BLANCHE': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  'GROSSE-MAT': 'bg-purple-100 text-purple-800 border border-purple-200',
};

export const ORIENTATION_DOT: Record<NutritionalOrientation, string> = {
  'ANTI-INFLAM': 'bg-green-500',
  'GLUC-MOD': 'bg-amber-500',
  'GLUC-HAUT': 'bg-orange-500',
  'PROT-BON': 'bg-blue-500',
  'PROT-MAIGRE': 'bg-sky-500',
  'ANTIOXYDANT': 'bg-emerald-500',
  'VIANDE-BLANCHE': 'bg-yellow-500',
  'GROSSE-MAT': 'bg-purple-500',
};

export const INTENSITY_COLORS: Record<TrainingIntensity, string> = {
  low: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export const INTENSITY_LABELS: Record<TrainingIntensity, string> = {
  low: 'Faible',
  moderate: 'Modérée',
  high: 'Haute',
};

export const ROLE_CONFIGS: Record<UserRole, {
  id: UserRole;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  lightBg: string;
  borderColor: string;
  hoverBg: string;
  ringColor: string;
  description: string;
}> = {
  cook: {
    id: 'cook',
    label: 'Cuisinier',
    icon: '🍳',
    color: 'text-green-700',
    bgColor: 'bg-green-600',
    lightBg: 'bg-green-50',
    borderColor: 'border-green-600',
    hoverBg: 'hover:bg-green-700',
    ringColor: 'ring-green-500',
    description: 'Consulter et gérer les menus du jour',
  },
  coach: {
    id: 'coach',
    label: 'Entraîneur',
    icon: '🏋️',
    color: 'text-blue-700',
    bgColor: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-600',
    hoverBg: 'hover:bg-blue-700',
    ringColor: 'ring-blue-500',
    description: 'Planifier et modifier les séances',
  },
  player: {
    id: 'player',
    label: 'Joueur',
    icon: '🏉',
    color: 'text-orange-700',
    bgColor: 'bg-orange-600',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-600',
    hoverBg: 'hover:bg-orange-700',
    ringColor: 'ring-orange-500',
    description: 'Consulter votre planning personnel',
  },
  nutritionist: {
    id: 'nutritionist',
    label: 'Nutritionniste',
    icon: '🥗',
    color: 'text-violet-700',
    bgColor: 'bg-violet-600',
    lightBg: 'bg-violet-50',
    borderColor: 'border-violet-600',
    hoverBg: 'hover:bg-violet-700',
    ringColor: 'ring-violet-500',
    description: 'Gérer nutrition et plannings complets',
  },
};

export function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function formatDateShort(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function formatDayNum(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric' });
}

export function formatWeekdayShort(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'short' });
}

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });
}

export function getWeekDates(referenceDate?: string): string[] {
  const ref = referenceDate ? new Date(referenceDate + 'T00:00:00') : new Date();
  const day = ref.getDay();
  const monday = new Date(ref);
  monday.setDate(ref.getDate() - (day === 0 ? 6 : day - 1));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

export function addWeeks(date: string, weeks: number): string {
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString().split('T')[0];
}

export function getMonthGrid(year: number, month: number): (string | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const startOffset = startDow === 0 ? 6 : startDow - 1;

  const weeks: (string | null)[][] = [];
  let week: (string | null)[] = Array(startOffset).fill(null);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    week.push(date.toISOString().split('T')[0]);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export function isToday(date: string): boolean {
  return date === new Date().toISOString().split('T')[0];
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
