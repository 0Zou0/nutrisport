---
name: nutrisport-planning
description: Implémenter les vues du planning NutriSport (agenda semaine, mois, détail journée). Utiliser quand l'utilisateur demande de créer ou modifier une page de planning, un calendrier, une vue semaine/mois, ou le détail d'une journée avec ses blocs entraînement/nutrition/menu.
---

# NutriSport — Planning & Agenda

## Structure des vues

### Vue Semaine (`/planning/semaine`)

Afficher les 7 jours avec pour chaque jour :
- Séances matin/après-midi (icône + intensité)
- Orientations nutritionnelles (badges colorés)
- Menu du jour (aperçu)

Navigation : boutons "semaine précédente / suivante". Mettre en évidence la journée courante.

### Vue Mois (`/planning/mois`)

Grille calendrier classique. Chaque case :
- Icônes des types d'entraînement
- Point coloré par orientation nutritionnelle

Clic sur une case → navigation vers `/planning/jour/:date`.

### Vue Journée (`/planning/jour/:date`)

3 blocs distincts :

**Bloc Entraînements**
```tsx
// Afficher 0 à 2 séances (matin/après-midi)
// Champ type, intensité (badge low/moderate/high), durée optionnelle
// Éditable si role === 'coach' || role === 'nutritionist'
```

**Bloc Orientation nutritionnelle**
```tsx
// Badges avec code + libellé complet
// Plusieurs orientations possibles
// Éditable si role === 'nutritionist'
```

**Bloc Menu**
```tsx
// Section Entrées : liste d'options (title + description + available)
// Section Plats : liste d'options (title + description + available)
// Titre/description éditable si role === 'nutritionist'
// available éditable si role === 'cook'
```

## Données mockées (MVP)

Créer un fichier `lib/mock-data.ts` avec une semaine de données au format `DayData[]`.

```typescript
// Exemple de structure pour un jour
const mockDay: DayData = {
  date: '2026-03-25',
  trainings: [
    { slot: 'morning', type: 'Muscu', intensity: 'high', duration: 75 },
    { slot: 'afternoon', type: 'Rugby', intensity: 'moderate' }
  ],
  orientations: ['GLUC-HAUT', 'PROT-BON'],
  menu: {
    starters: [
      { id: 's1', title: 'Salade de quinoa', description: 'Quinoa, légumes grillés, citron', available: true },
    ],
    mains: [
      { id: 'm1', title: 'Poulet rôti', description: 'Poulet fermier, patates douces', available: true },
    ]
  }
};
```

## Workflow d'implémentation

- [ ] Créer les types dans `types/index.ts`
- [ ] Créer les données mockées dans `lib/mock-data.ts`
- [ ] Implémenter le composant `DayCard` (utilisé dans la vue semaine)
- [ ] Implémenter `WeekPlanning` avec navigation
- [ ] Implémenter `MonthPlanning` avec grille
- [ ] Implémenter `DayDetail` avec les 3 blocs
- [ ] Vérifier les droits d'édition selon le rôle actif

## Rappel design

- Mobile-first, texte min 14px
- Journée courante : ring ou background distinct
- Code couleur intensité : `low` → vert, `moderate` → jaune, `high` → rouge
