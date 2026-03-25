# CAHIER DES CHARGES — NutriSport

**Version** : 0.1 — MVP  
**Date** : Mars 2026  
**Statut** : Brouillon en cours

---

## 1. Présentation du projet

### 1.1 Contexte

NutriSport est une plateforme digitale centralisée dédiée au suivi nutritionnel et à la planification des entraînements pour les sportifs de haut niveau (contexte Rugby, mais extensible à d'autres sports).

Elle met en relation quatre types d'acteurs aux besoins complémentaires : **cuisiniers**, **entraîneurs**, **joueurs** et **nutritionnistes**, autour d'un outil commun de planification hebdomadaire et mensuelle.

### 1.2 Problème résolu

Aujourd'hui, la coordination entre le staff sportif (entraîneur), le staff médical/nutrition (nutritionniste) et le staff cuisine (cuisinier) est souvent morcelée — fichiers Excel, échanges WhatsApp, documents papier. NutriSport centralise toutes ces informations dans une interface unique, cohérente et adaptée à chaque rôle.

### 1.3 Objectif du MVP

Livrer une version fonctionnelle permettant de :

- Visualiser un planning nutritionnel et sportif à la semaine et au mois
- Différencier les droits d'accès et de modification selon le rôle de l'utilisateur
- Permettre au nutritionniste et à l'entraîneur de renseigner les données
- Permettre au cuisinier de consulter les menus du jour
- Permettre au joueur de consulter son planning personnalisé

---

## 2. Utilisateurs & Rôles

### 2.1 Tableau des rôles


| Rôle               | Description                                            | Droits                                             |
| ------------------ | ------------------------------------------------------ | -------------------------------------------------- |
| **Cuisinier**      | Prépare les repas selon les directives nutritionnelles | Lecture des menus + modification des options plats |
| **Entraîneur**     | Planifie les séances d'entraînement                    | Lecture + modification du planning sportif         |
| **Joueur**         | Athlète — consommateur du planning                     | Lecture uniquement (son propre planning)           |
| **Nutritionniste** | Définit les orientations nutritionnelles et les menus  | Accès complet — rôle administrateur de contenu     |


### 2.2 Accès MVP

Sur la page d'accueil du MVP, **4 boutons** permettent de sélectionner son rôle avant de se connecter ou de simuler un accès :

```
[ 🍳 Cuisinier ]   [ 🏋️ Entraîneur ]   [ 🏉 Joueur ]   [ 🥗 Nutritionniste ]
```

---

## 3. Fonctionnalités principales

### 3.1 Planning — Vue Agenda

L'application s'articule autour d'un **agenda central** avec deux niveaux de visualisation :

#### Vue Semaine

- Affichage des 7 jours avec pour chaque jour :
  - Les séances d'entraînement (matin / après-midi)
  - L'orientation nutritionnelle du jour
  - Le menu du jour (entrées + plats)
- Navigation par semaine (précédente / suivante)
- Indicateur visuel de la journée courante

#### Vue Mois

- Affichage condensé du mois complet
- Chaque case de jour affiche :
  - Type(s) d'entraînement (icônes)
  - Orientation nutritionnelle (code couleur)
- Clic sur un jour → ouverture du détail en vue journalière

---

### 3.2 Données quotidiennes

Pour chaque journée, trois blocs d'information sont associés :

#### Bloc 1 — Entraînements

Chaque journée peut comporter **0 à 2 séances** :


| Créneau    | Exemples de types                              |
| ---------- | ---------------------------------------------- |
| Matin      | Muscu, Cardio, Mobilité, Récupération, Repos   |
| Après-midi | Rugby (séance collective), Vidéo, Repos, Match |


- Champ : type de séance (liste déroulante ou saisie libre)
- Champ : intensité estimée (faible / modérée / haute)
- Champ : durée (optionnel)
- Modifiable par : **Entraîneur**, **Nutritionniste**

#### Bloc 2 — Orientation nutritionnelle

L'orientation nutritionnelle est un **tag directeur** qui guide la composition des repas de la journée.

Liste des orientations disponibles (extensible) :


| Code             | Libellé complet                                    |
| ---------------- | -------------------------------------------------- |
| `ANTI-INFLAM`    | Repas anti-inflammatoire                           |
| `GLUC-MOD`       | Glucides modérés                                   |
| `GLUC-HAUT`      | Glucides hauts — grosse journée                    |
| `PROT-BON`       | Bonne source de protéines                          |
| `PROT-MAIGRE`    | Protéines maigres                                  |
| `ANTIOXYDANT`    | Antioxydants — Viande rouge                        |
| `VIANDE-BLANCHE` | Viande blanche — Glucides modérés à hauts          |
| `GROSSE-MAT`     | Grosse matinée — Viande blanche, Glucides mod-haut |


> Plusieurs orientations peuvent être combinées sur une même journée.

- Modifiable par : **Nutritionniste**
- Visible par : tous les rôles (avec libellés complets pour joueur/cuisinier)

#### Bloc 3 — Menu du jour

Le menu est structuré en **deux services** :

**Entrées** (plusieurs options proposées) :

- Option A, Option B, Option C
- Chaque option dispose d'un intitulé + descriptif court

**Plats principaux** (plusieurs options proposées) :

- Option A, Option B, Option C
- Chaque option dispose d'un intitulé + descriptif court

> L'idée des options est de permettre au joueur d'avoir le choix tout en restant dans le cadre de l'orientation nutritionnelle.

- Modifiable par : **Nutritionniste** (orientations et intitulés) + **Cuisinier** (options de préparation / disponibilité)
- Visible par : tous les rôles

---

## 4. Droits par rôle — Détail

### 4.1 Nutritionniste

- Créer / modifier / supprimer une journée complète
- Définir l'orientation nutritionnelle
- Créer et modifier les menus (entrées + plats, toutes options)
- Définir les séances en coordination avec l'entraîneur
- Accès à l'ensemble du planning de l'équipe
- *(Futur)* Gérer les profils joueurs et leurs contraintes alimentaires

### 4.2 Entraîneur

- Créer / modifier les séances d'entraînement (type, intensité, créneau)
- Consulter les orientations nutritionnelles
- Consulter les menus
- *(Futur)* Ajouter des notes sur les séances (charge de travail prévue)

### 4.3 Cuisinier

- Consulter les menus (vue simplifiée par jour)
- Marquer une option comme **disponible / indisponible**
- *(Futur)* Proposer une alternative à valider par le nutritionniste

### 4.4 Joueur

- Consulter son planning personnel (entraînements + nutrition)
- Visualiser les options de menu du jour
- *(Futur)* Indiquer ses préférences ou contraintes
- *(Futur)* Suivre sa charge d'entraînement cumulée

---

## 5. Pages & Navigation — MVP

### 5.1 Arborescence minimale

```
/                         → Page d'accueil (choix du rôle)
/login                    → Authentification (post-MVP ou minimal)
/dashboard/:role          → Tableau de bord adapté au rôle
/planning/semaine         → Vue semaine
/planning/mois            → Vue mois
/planning/jour/:date      → Détail d'une journée
/menu/:date               → Vue menu du jour (accès rapide cuisinier)
```

### 5.2 Page d'accueil MVP

Interface simple avec :

- Logo NutriSport
- Titre accrocheur
- 4 boutons de sélection de rôle (chacun avec icône + couleur dédiée)
- Pas d'authentification requise au MVP (ou simulée)

---

## 6. Design & UX

### 6.1 Principes directeurs

- Interface **claire et lisible** — utilisée en cuisine, en salle de sport, sur tablette/téléphone
- **Code couleur** par orientation nutritionnelle (vert = anti-inflam, orange = glucides hauts, etc.)
- **Code couleur** par intensité d'entraînement
- Design **mobile-first** — les joueurs et cuisiniers consultent surtout sur smartphone
- Typographie lisible à distance (taille minimum 14px corps de texte)

### 6.2 Palette de couleurs suggérée


| Rôle           | Couleur |
| -------------- | ------- |
| Cuisinier      | Vert    |
| Entraîneur     | Bleu    |
| Joueur         | Orange  |
| Nutritionniste | Violet  |


---

## 7. Stack technique (proposé)


| Couche          | Technologie suggérée                    |
| --------------- | --------------------------------------- |
| Frontend        | React (ou Next.js) + TailwindCSS        |
| Backend / API   | Node.js + Express ou Next.js API Routes |
| Base de données | PostgreSQL (via Supabase ou Neon)       |
| Auth (post-MVP) | Supabase Auth / NextAuth.js             |
| Hébergement     | Vercel (frontend) + Supabase (backend)  |


---

## 8. Roadmap

### Phase 1 — MVP (v0.1)

- Page d'accueil avec sélection de rôle
- Vue semaine avec données mockées
- Vue mois condensée
- Détail journée (3 blocs)
- Interface cuisinier — lecture menu
- Interface entraîneur — lecture/modification planning sportif
- Interface joueur — lecture planning

### Phase 2 — V1

- Authentification réelle par rôle
- Base de données connectée
- Gestion des joueurs (profils individuels)
- Notifications (rappel menu du jour, modification planning)
- Interface nutritionniste complète (création/édition)

### Phase 3 — V2

- Suivi nutritionnel individuel par joueur
- Intégration données biométriques (poids, récupération)
- Export PDF du planning semaine / menu
- Historique et analytics (charge cumulée, conformité nutritionnelle)
- Application mobile native (React Native)

---

## 9. Questions ouvertes / Points à clarifier

1. **Multi-équipe** : l'application est-elle prévue pour une seule équipe ou plusieurs (ex : équipe pro + équipe espoir) ?
2. **Gestion des joueurs** : y a-t-il des régimes individuels (allergies, préférences, contraintes médicales) à gérer dès le MVP ?
3. **Authentification MVP** : boutons de rôle sans login suffisant, ou faut-il un accès sécurisé dès le départ ?
4. **Données existantes** : existe-t-il déjà un planning ou des menus types à importer ?
5. **Nombre d'options par repas** : combien d'options par entrée et par plat en général ? (2 ? 3 ? variable ?)
6. **Contraintes de délai** : y a-t-il une date cible pour le MVP ?

---

*Document évolutif — à mettre à jour à chaque itération.*