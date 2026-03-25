import { UserRole } from '@/types';

type Resource = 'training' | 'orientation' | 'menu-title' | 'menu-availability';

const EDIT_PERMISSIONS: Record<Resource, UserRole[]> = {
  training: ['coach', 'nutritionist'],
  orientation: ['nutritionist'],
  'menu-title': ['nutritionist'],
  'menu-availability': ['cook', 'nutritionist'],
};

export function canEdit(role: UserRole, resource: Resource): boolean {
  return EDIT_PERMISSIONS[resource].includes(role);
}
