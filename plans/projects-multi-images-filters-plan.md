# Plan: Multi-images & Filtres par catégorie pour les Projets

## Résumé des besoins

1. **Multi-images** : Remplacer `image: ProjectImage` par `images: ProjectImage[]`. La première image est la cover par défaut. Navigation par chevrons (gauche/droite) dans la modale.
2. **Filtres par catégorie** : Boutons de filtre (Tous, Professionnel, Personnel, Universitaire, Associatif) pour filtrer la grille de projets.
3. **Badge catégorie** : Afficher le badge de catégorie directement sur les cartes projets dans la grille.

---

## Architecture des changements

### 1. [`src/data/projects.ts`](src/data/projects.ts) — Modèle de données

**Changement** : Remplacer `image: ProjectImage` par `images: ProjectImage[]`.

```typescript
// Avant
export interface Project {
  // ...
  image: ProjectImage;
  // ...
}

// Après
export interface Project {
  // ...
  images: ProjectImage[];
  // ...
}
```

**Données** : Chaque projet existant aura son image unique migrée dans un tableau `images`. On pourra ajouter des images supplémentaires aux projets qui en ont besoin.

### 2. [`src/pages/Projects.tsx`](src/pages/Projects.tsx) — Page principale

#### 2.1 Filtres par catégorie

Ajouter un état `activeCategory: string` (initialisé à `'all'`). Afficher une barre de filtres entre le titre et la grille :

```
[ Tous | 💼 Professionnel | 🎨 Personnel | 🎓 Universitaire | 🤝 Associatif ]
```

- Le filtre actif est visuellement distinct (ex: bg-teal-50, border-teal-300).
- Les projets sont filtrés avec `projects.filter(p => activeCategory === 'all' || p.category === activeCategory)`.

#### 2.2 Badge catégorie sur les cartes

Ajouter un badge de catégorie dans chaque carte projet (dans la zone de contenu, sous le titre ou dans le header de l'image).

#### 2.3 Cover : utiliser `images[0]`

Dans la grille, la cover affichée est `project.images[0]` au lieu de `project.image`.

### 3. [`src/pages/Projects.tsx`](src/pages/Projects.tsx) — Modale (ProjectModal)

#### 3.1 Navigation multi-images avec chevrons

- Remplacer l'affichage `project.image` par un carrousel basé sur `project.images`.
- Ajouter un état `currentImageIndex: number` (initialisé à 0).
- Afficher les chevrons gauche/droite sur les bords de l'image (toujours visibles).
- Désactiver le chevron gauche si `currentImageIndex === 0`, chevron droit si `currentImageIndex === images.length - 1`.
- Indicateur de position : "1 / 3" ou des dots indicateurs.

#### 3.2 Gestion des clics sur les chevrons

- Chevron gauche : `setCurrentImageIndex(prev => prev - 1)`
- Chevron droit : `setCurrentImageIndex(prev => prev + 1)`
- Empêcher la propagation du clic pour ne pas fermer la modale.

### 4. [`src/locales/en.json`](src/locales/en.json) & [`src/locales/fr.json`](src/locales/fr.json) — Traductions

Ajouter les clés pour les filtres :

```json
"projects": {
  "title": "...",
  "description": "...",
  "filters": {
    "all": "All" / "Tous",
    "professionnel": "Professional" / "Professionnel",
    "personnel": "Personal" / "Personnel",
    "universitaire": "Academic" / "Universitaire",
    "associatif": "Community" / "Associatif"
  }
}
```

---

## Dépendances

- **Lucide React** : Déjà présent. On utilisera `ChevronLeft` et `ChevronRight` pour les chevrons.
- **Aucune nouvelle dépendance** nécessaire.

---

## Checklist d'implémentation

### Étape 1 : Mettre à jour le modèle de données

- [ ] Dans [`src/data/projects.ts`](src/data/projects.ts), changer `image: ProjectImage` → `images: ProjectImage[]`
- [ ] Migrer chaque projet : `image: { ... }` → `images: [{ ... }]`
- [ ] Ajouter des images supplémentaires aux projets (optionnel)
- [ ] Mettre à jour l'export `ProjectImage` dans [`src/data/index.ts`](src/data/index.ts) si nécessaire

### Étape 2 : Ajouter les traductions pour les filtres

- [ ] Dans [`src/locales/en.json`](src/locales/en.json), ajouter `projects.filters`
- [ ] Dans [`src/locales/fr.json`](src/locales/fr.json), ajouter `projects.filters`

### Étape 3 : Implémenter les filtres dans Projects.tsx

- [ ] Ajouter l'état `activeCategory` (useState)
- [ ] Créer le composant/UI des boutons de filtre
- [ ] Appliquer le filtrage sur la liste des projets
- [ ] Styliser le bouton actif vs inactif

### Étape 4 : Ajouter le badge catégorie sur les cartes

- [ ] Dans la carte projet (grid), ajouter le badge de catégorie
- [ ] Utiliser les mêmes styles que dans la modale

### Étape 5 : Mettre à jour la cover dans la grille

- [ ] Remplacer `project.image.src` par `project.images[0].src`
- [ ] Remplacer `project.image.alt` par `project.images[0].alt`

### Étape 6 : Implémenter le carrousel dans la modale

- [ ] Ajouter l'état `currentImageIndex`
- [ ] Remplacer l'image statique par un conteneur avec navigation
- [ ] Ajouter les chevrons gauche/droite (toujours visibles)
- [ ] Ajouter l'indicateur de position (ex: "2 / 5")
- [ ] Désactiver les chevrons aux extrémités
- [ ] Gérer `stopPropagation` sur les clics des chevrons

---

## Diagramme du flux utilisateur

```mermaid
flowchart TD
    A[Page Projects] --> B[Barre de filtres]
    B --> C[Grille de projets filtrée]
    C --> D{Clic sur une carte}
    D --> E[Modale s'ouvre]
    E --> F[Image courante = images[currentIndex]]
    F --> G{Clic chevron gauche/droit}
    G -->|Gauche| H[currentIndex--]
    G -->|Droit| I[currentIndex++]
    H --> F
    I --> F
    G -->|Clic outside / X| J[Fermer modale]
```

---

## Notes techniques

- **TypeScript** : Le type `ProjectImage` reste inchangé, seule la propriété dans `Project` passe de `image` à `images`.
- **Accessibilité** : Ajouter `aria-label` sur les chevrons ("Image précédente", "Image suivante").
- **Responsive** : Les chevrons doivent être bien positionnés sur mobile également.
- **Performance** : Pas de souci, le nombre d'images par projet restera faible (< 10).
