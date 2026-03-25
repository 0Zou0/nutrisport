---
name: nutrisport-roles
description: Implémenter les interfaces et dashboards adaptés aux rôles NutriSport (Cuisinier, Entraîneur, Joueur, Nutritionniste). Utiliser quand l'utilisateur demande de créer la page d'accueil de sélection de rôle, un dashboard spécifique à un rôle, ou de gérer les permissions d'affichage/édition selon le rôle actif.
---

# NutriSport — Gestion des rôles & interfaces

## Page d'accueil (`/`)

4 boutons de sélection de rôle. Chaque bouton : icône + libellé + couleur dédiée.

```tsx
const ROLES = [
  { id: 'cook',          label: 'Cuisinier',      icon: '🍳', color: 'green'  },
  { id: 'coach',         label: 'Entraîneur',     icon: '🏋️', color: 'blue'   },
  { id: 'player',        label: 'Joueur',         icon: '🏉', color: 'orange' },
  { id: 'nutritionist',  label: 'Nutritionniste', icon: '🥗', color: 'violet' },
] satisfies RoleConfig[];
```

Au clic → stocker le rôle (contexte React ou localStorage) + rediriger vers `/dashboard/:role`.

## Contexte de rôle

Utiliser un `RoleContext` global :

```typescript
// context/RoleContext.tsx
interface RoleContextValue {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
}
```

## Dashboards par rôle (`/dashboard/:role`)

| Rôle | Contenu prioritaire |
|------|---------------------|
| `cook` | Menu du jour (vue simplifiée), disponibilité des options |
| `coach` | Planning sportif de la semaine, modification séances |
| `player` | Planning personnel semaine, menus du jour |
| `nutritionist` | Vue complète : planning + menu + orientations, tout éditable |

## Gestion des permissions d'affichage

Créer un helper `lib/permissions.ts` :

```typescript
export function canEdit(role: UserRole, resource: 'training' | 'orientation' | 'menu-title' | 'menu-availability'): boolean {
  const rules: Record<typeof resource, UserRole[]> = {
    'training':          ['coach', 'nutritionist'],
    'orientation':       ['nutritionist'],
    'menu-title':        ['nutritionist'],
    'menu-availability': ['cook', 'nutritionist'],
  };
  return rules[resource].includes(role);
}
```

Usage dans les composants :
```tsx
// ✅ BON
{canEdit(role, 'training') && <EditButton onClick={...} />}

// ❌ MAUVAIS
{role === 'nutritionist' || role === 'coach' ? <EditButton /> : null}
```

## Workflow d'implémentation

- [ ] Créer `types/index.ts` avec `UserRole`
- [ ] Créer `context/RoleContext.tsx`
- [ ] Implémenter la page d'accueil avec les 4 boutons
- [ ] Créer `lib/permissions.ts`
- [ ] Implémenter les 4 dashboards (ou un dashboard conditionnel)
- [ ] Protéger les actions d'édition avec `canEdit()`
