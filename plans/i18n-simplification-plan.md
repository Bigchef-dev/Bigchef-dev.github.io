# Internationalization (i18n) Simplification Plan

## Current System

- [`src/locales/en.json`](src/locales/en.json) — English translations
- [`src/locales/fr.json`](src/locales/fr.json) — French translations
- [`src/hooks/useLanguage.tsx`](src/hooks/useLanguage.tsx) — Context provider with `t(key: string)` function

## Problems

1. **Two files to keep in sync** — adding a key to one requires manually adding it to the other
2. **No TypeScript autocomplete** — `t(key: string)` accepts any string, no IDE suggestions
3. **No compile-time safety** — a typo like `t('hero.taglinee')` won't be caught until runtime
4. **No fallback** — if a key is missing in French, it returns the raw key string instead of English
5. **Adding a new language** requires creating a whole new JSON file

## Proposed Solution: Single TypeScript File

Replace the two JSON files with a single [`src/locales/translations.ts`](src/locales/translations.ts) file:

```typescript
export const translations = {
  en: {
    nav: {
      home: 'Home',
      timeline: 'Timeline',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Building AI-Powered Solutions for Real-World Impact',
      location: 'Rennes, Montpellier, France',
      affiliation: 'Rennes University',
      cta_projects: 'View My Work ↓',
      cta_resume: 'Resume',
      cta_contact: 'Contact',
    },
    // ...
  },
  fr: {
    nav: {
      home: 'Accueil',
      timeline: 'Parcours',
      projects: 'Projets',
      contact: 'Contact',
    },
    // ...
  },
} as const;

export type TranslationKey = {
  [K in keyof typeof translations.en]: 
    typeof translations.en[K] extends object
      ? `${K}.${keyof typeof translations.en[K] & string}`
      : K
}[keyof typeof translations.en];
```

Then update [`src/hooks/useLanguage.tsx`](src/hooks/useLanguage.tsx) to:
- Import from the single file
- Use a recursive type for `t()` so it only accepts valid dot-notation keys
- Fall back to English when a key is missing in the active language

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| Files to edit | 2 JSON files | 1 TS file |
| Type safety | None (`t(key: string)`) | Full (`t('hero.'`) shows autocomplete) |
| Missing key detection | Runtime only | Compile-time |
| Fallback | Raw key string | Falls back to English |
| Add a language | Create new JSON file | Add one block to the object |
| IDE support | None | Autocomplete + go-to-definition |

## Files to Modify

| File | Change |
|------|--------|
| [`src/locales/translations.ts`](src/locales/translations.ts) | **New** — Single file with all languages |
| [`src/locales/en.json`](src/locales/en.json) | **Delete** — Replaced by translations.ts |
| [`src/locales/fr.json`](src/locales/fr.json) | **Delete** — Replaced by translations.ts |
| [`src/hooks/useLanguage.tsx`](src/hooks/useLanguage.tsx) | Update to import from translations.ts, add typed `t()` |
