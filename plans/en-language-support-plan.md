# English Language Support — Architecture Options

## Current State

The app already has a lightweight i18n system in place:

- [`src/locales/translations.ts`](src/locales/translations.ts) — Single file with typed translations. `fr: {}` is fully populated, `en: {}` is **empty**.
- [`src/hooks/useLanguage.tsx`](src/hooks/useLanguage.tsx) — Context provider with `t(key: TranslationKeys)` that falls back to English, then to the raw key.
- [`src/data/projects.ts`](src/data/projects.ts) — Project data (`title`, `description`, `fullDescription`, `images[].alt`) is **hardcoded in French** — NOT in the translations system.
- [`src/data/timeline.ts`](src/data/timeline.ts) — Timeline entries have only structural data (year, type, logo). The **text content** (title, company, description) is already in `translations.ts` under `timeline.entries`.

## What Needs Translation

| Scope | Content | Currently in translations system? |
|-------|---------|-----------------------------------|
| **UI** (nav, hero, projects section, footer) | ~15 short strings | ✅ Yes — just fill `en: {}` |
| **Timeline entries** (7 entries × 3 fields) | ~21 strings | ✅ Yes — just fill `en.timeline.entries` |
| **Project titles** (7 projects) | Short strings | ❌ No — hardcoded in `projects.ts` |
| **Project descriptions** (7 projects) | Short strings | ❌ No — hardcoded in `projects.ts` |
| **Project full descriptions** (7 projects) | **Long markdown** (some 100+ lines) | ❌ No — hardcoded in `projects.ts` |
| **Project image alt texts** (~20 images) | Short strings | ❌ No — hardcoded in `projects.ts` |
| **Category badges** (professionnel, personnel, etc.) | Short strings | ❌ No — hardcoded in `Projects.tsx` |
| **Modal section titles** ("À propos", "Technologies utilisées", "Liens") | Short strings | ❌ No — hardcoded in `Projects.tsx` |
| **Button labels** ("Voir les détails →", "Voir le site", "Demo") | Short strings | ❌ No — hardcoded in `Projects.tsx` |
| **Empty state** ("Aucun projet trouvé...") | Short string | ❌ No — hardcoded in `Projects.tsx` |

---

## Architecture Options

### Option A — "Fill the blanks" (Recommended — Lightest)

**Concept:** Keep everything as-is. Just fill in the missing English translations in the existing structures.

**Changes:**
1. Fill `en: {}` in [`src/locales/translations.ts`](src/locales/translations.ts) with English equivalents for all UI + timeline entries.
2. Add new translation keys for project-related UI strings (category badges, modal titles, buttons, empty state).
3. For **project data** (`title`, `description`, `fullDescription`, `images[].alt`): add translation keys in `translations.ts` under a `projects.entries` namespace.
4. In [`src/pages/Projects.tsx`](src/pages/Projects.tsx): replace hardcoded strings with `t()` calls.
5. In [`src/data/projects.ts`](src/data/projects.ts): remove translatable text fields, keep only structural data (images src, technologies, links, files, category).

**Pros:**
- Zero new files
- Full TypeScript safety (all keys typed)
- Single source of truth
- Easy to add more languages later

**Cons:**
- `fullDescription` is long markdown — putting it in `translations.ts` makes the file very large (~500+ lines)
- The `TranslationKeys` type already derives from `fr` — adding `projects.entries` to `fr` means English keys must match French structure exactly

**Project data structure change:**
```typescript
// projects.ts — structural only
export const projects: Project[] = [
  {
    id: 1,
    images: [{ src: '/src/assets/projects/gepetto/conversation.png' }], // no alt here
    technologies: ['typescript', 'api', ...],
    category: 'professionnel',
    github: '...',
  },
  // ...
];
```

```typescript
// translations.ts — all text
fr: {
  projects: {
    entries: {
      '1': {
        title: 'Gepetto, Chatbot IA & Rag',
        description: 'Gepetto est un chatbot IA avancé...',
        fullDescription: '### Contexte\n\nCe projet...',  // long markdown
        imageAlts: ['Interface de chat avec Gepetto', 'Réponse de résolution...', ...],
      },
      // ...
    },
  },
}
```

---

### Option B — "Dual fields in data" (Lightweight, self-contained)

**Concept:** Keep project text in [`src/data/projects.ts`](src/data/projects.ts) but add `titleEn`, `descriptionEn`, `fullDescriptionEn`, and make `images` support alt per language.

**Changes:**
1. Fill `en: {}` in [`src/locales/translations.ts`](src/locales/translations.ts) for UI + timeline.
2. Add new translation keys for project UI strings (badges, modal titles, buttons, empty state).
3. Modify `Project` interface to support dual-language fields:
   ```typescript
   export interface Project {
     id: number;
     title: string;       // French (default)
     titleEn?: string;    // English override
     description: string;
     descriptionEn?: string;
     fullDescription: string;
     fullDescriptionEn?: string;
     images: ProjectImage[];  // alt stays as French
     // OR
     images: { src: string; alt: { fr: string; en: string } }[];
     // ...
   }
   ```
4. Create a helper hook/function `useProjectText()` that returns the right language version.
5. In [`src/pages/Projects.tsx`](src/pages/Projects.tsx): use `project.titleEn ?? project.title` pattern.

**Pros:**
- All project data stays in one file — easy to edit
- No huge `translations.ts` file
- Self-contained — each project has its own translations
- Easy to understand for future contributors

**Cons:**
- Duplication of field names (`title`/`titleEn`, `description`/`descriptionEn`)
- No TypeScript safety on which fields have English versions
- Mixing data and translations in the same file
- Harder to add a 3rd language later

---

### Option C — "Separate project translation files" (Clean separation)

**Concept:** Keep UI translations in [`src/locales/translations.ts`](src/locales/translations.ts). Move project text to dedicated locale files per language.

**Changes:**
1. Fill `en: {}` in [`src/locales/translations.ts`](src/locales/translations.ts) for UI + timeline.
2. Add new translation keys for project UI strings.
3. Create [`src/locales/projects-fr.ts`](src/locales/projects-fr.ts) and [`src/locales/projects-en.ts`](src/locales/projects-en.ts) with project text.
4. Create a `useProjectTranslation()` hook that selects the right file based on current language.
5. In [`src/data/projects.ts`](src/data/projects.ts): remove all text, keep only structural data.
6. In [`src/pages/Projects.tsx`](src/pages/Projects.tsx): use `useProjectTranslation()` to get text for each project.

**Pros:**
- Clean separation of concerns
- Project text files are focused and manageable
- Easy to add more languages (just add a new file)
- No huge single file

**Cons:**
- More files to manage
- Need to keep project IDs in sync between data and translation files
- Slightly more complex hook logic
- No TypeScript autocomplete for project translation keys (unless typed)

---

### Option D — "Hybrid" (Recommended compromise)

**Concept:** 
- Short UI strings → [`src/locales/translations.ts`](src/locales/translations.ts) (as now)
- Short project strings (title, description, image alt) → `translations.ts` under `projects.entries`
- **Long markdown** (`fullDescription`) → Keep in [`src/data/projects.ts`](src/data/projects.ts) with dual fields (`fullDescription` / `fullDescriptionEn`)

**Changes:**
1. Fill `en: {}` in [`src/locales/translations.ts`](src/locales/translations.ts) for UI + timeline.
2. Add `projects.entries` to translations with `title`, `description`, `imageAlts` for each project (short strings only).
3. Add `projects.ui` section for modal labels, buttons, empty state.
4. In [`src/data/projects.ts`](src/data/projects.ts): add `fullDescriptionEn` field to `Project` interface (long markdown stays here).
5. In [`src/pages/Projects.tsx`](src/pages/Projects.tsx): use `t()` for short strings, use `project.fullDescriptionEn ?? project.fullDescription` for markdown.

**Pros:**
- Short strings get full TypeScript safety
- Long markdown stays in the project data file (where it's natural)
- No huge translation file
- Minimal changes to existing structure
- Easy to add more languages

**Cons:**
- Two places to look for project text (translations.ts for short, projects.ts for long)
- Slightly inconsistent approach

---

## Recommendation: Option D — Hybrid

This is the best balance for "pas lourd" (lightweight) while covering "absolument tout, y compris les projets".

### Detailed Implementation Plan

#### Step 1: Fill UI + Timeline translations in [`src/locales/translations.ts`](src/locales/translations.ts)

Add English translations for:
- `nav` (home, timeline, projects, contact)
- `hero` (tagline, location, affiliation, cta_projects, cta_resume, cta_contact)
- `timeline.subtitle` + all 7 `timeline.entries`
- `projects.title`, `projects.description`, `projects.filters`
- `footer.copyright`

#### Step 2: Add project UI strings to [`src/locales/translations.ts`](src/locales/translations.ts)

```typescript
fr: {
  projects: {
    // ... existing ...
    ui: {
      about: 'À propos',
      technologies: 'Technologies utilisées',
      links: 'Liens',
      viewDetails: 'Voir les détails →',
      viewSite: 'Voir le site',
      demo: 'Demo',
      emptyState: 'Aucun projet trouvé pour cette catégorie.',
      imagePrevious: 'Image précédente',
      imageNext: 'Image suivante',
      close: 'Fermer',
    },
    entries: {
      '1': {
        title: 'Gepetto, Chatbot IA & Rag',
        description: 'Gepetto est un chatbot IA avancé...',
        imageAlts: ['Interface de chat avec Gepetto', 'Réponse de résolution...', ...],
      },
      // ... all 7 projects ...
    },
  },
}
```

#### Step 3: Add `fullDescriptionEn` to [`src/data/projects.ts`](src/data/projects.ts)

```typescript
export interface Project {
  // ... existing fields ...
  fullDescription: string;
  fullDescriptionEn?: string;  // NEW
}
```

Then add `fullDescriptionEn` to each project object with the English markdown.

#### Step 4: Update [`src/pages/Projects.tsx`](src/pages/Projects.tsx)

Replace hardcoded strings with `t()` calls:
- `CATEGORY_BADGES` labels → use `t()` with translation keys
- Modal section titles: `t('projects.ui.about')`, `t('projects.ui.technologies')`, etc.
- Button labels: `t('projects.ui.viewDetails')`, `t('projects.ui.viewSite')`, etc.
- Empty state: `t('projects.ui.emptyState')`
- `aria-label` attributes: `t('projects.ui.imagePrevious')`, etc.
- Project title/description: `t(\`projects.entries.${project.id}.title\`)`
- Image alt: use `t()` with index-based key or keep in data with dual-language support

For `fullDescription`, use: `project.fullDescriptionEn ?? project.fullDescription`

#### Step 5: Update [`src/data/projects.ts`](src/data/projects.ts) — Image alt text

Two sub-options for image alt:
- **5a**: Keep alt in `projects.ts` as `{ fr: string; en: string }` — simple, self-contained
- **5b**: Move alt to `translations.ts` under `projects.entries.N.imageAlts` — consistent with other short strings

Recommend **5a** since alt is tightly coupled to the image and keeps the data file complete.

---

## Files to Modify

| File | Change |
|------|--------|
| [`src/locales/translations.ts`](src/locales/translations.ts) | Fill `en: {}` with all UI + timeline + project entries + project UI strings |
| [`src/data/projects.ts`](src/data/projects.ts) | Add `fullDescriptionEn` to `Project` interface + each project; update `ProjectImage.alt` to support `{ fr: string; en: string }` |
| [`src/pages/Projects.tsx`](src/pages/Projects.tsx) | Replace hardcoded FR strings with `t()` calls; use `fullDescriptionEn ?? fullDescription` pattern; update image alt rendering |

## Files NOT Modified

| File | Reason |
|------|--------|
| [`src/hooks/useLanguage.tsx`](src/hooks/useLanguage.tsx) | Already has fallback to English — no changes needed |
| [`src/components/Header.tsx`](src/components/Header.tsx) | Already uses `t()` — just needs translations filled |
| [`src/components/Timeline.tsx`](src/components/Timeline.tsx) | Already uses `t()` — just needs translations filled |
| [`src/pages/Home.tsx`](src/pages/Home.tsx) | Already uses `t()` — just needs translations filled |
| [`src/data/timeline.ts`](src/data/timeline.ts) | Structural data only — no text to translate |
