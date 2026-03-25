export type UserRole = 'cook' | 'coach' | 'player' | 'nutritionist';

export type TrainingSlot = 'morning' | 'afternoon';
export type TrainingIntensity = 'low' | 'moderate' | 'high';

export interface Training {
  slot: TrainingSlot;
  type: string;
  intensity: TrainingIntensity;
  duration?: number;
}

export type NutritionalOrientation =
  | 'ANTI-INFLAM'
  | 'GLUC-MOD'
  | 'GLUC-HAUT'
  | 'PROT-BON'
  | 'PROT-MAIGRE'
  | 'ANTIOXYDANT'
  | 'VIANDE-BLANCHE'
  | 'GROSSE-MAT';

export interface MenuOption {
  id: string;
  title: string;
  description: string;
  available: boolean;
}

export interface DayMenu {
  starters: MenuOption[];
  mains: MenuOption[];
}

export interface DayData {
  date: string;
  trainings: Training[];
  orientations: NutritionalOrientation[];
  menu: DayMenu;
}
