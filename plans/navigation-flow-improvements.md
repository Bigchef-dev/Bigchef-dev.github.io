# Navigation Flow Improvements

## Current State Analysis

The site is now a one-page app with 4 sections (`#home`, `#timeline`, `#projects`, `#contact`) and a fixed header with smooth scroll navigation. The build succeeds.

## Issues Identified

### 1. No Scroll Spy (Active Nav Indicator)
When scrolling manually, there's no visual feedback showing which section is currently in view. All nav buttons look identical.

**Fix**: Add an `IntersectionObserver`-based scroll spy in [`src/components/Header.tsx`](src/components/Header.tsx) that tracks which section is visible and applies an `active` class to the corresponding nav button.

### 2. No Visual Section Transitions
Sections abruptly start/end with no visual separation. This makes the page feel like stacked blocks rather than a flowing narrative.

**Fix**: Add subtle visual dividers between sections — either a gradient border, a wave SVG, or a simple spacer with a subtle gradient.

### 3. No "Back to Top" Button
After scrolling to the Contact section, there's no quick way to return to the top without manual scrolling or using the tiny header logo.

**Fix**: Add a floating "back to top" button that appears after scrolling past a threshold (e.g., past the hero section).

### 4. Header Height Mismatch Risk
The `scroll-margin-top: 80px` in CSS is a fixed value. The header uses `py-4` (32px vertical padding) + content height (~24px for text + icons). The actual header height is approximately 64-72px. The 80px value is safe but could be tighter.

**Fix**: Keep 80px as-is (it's safe), but consider making it dynamic via JS if issues arise.

### 5. No Scroll Progress Indicator (Optional Enhancement)
A thin progress bar at the very top of the page showing how far the user has scrolled adds a polished feel.

**Fix**: Add a fixed `<div>` at the very top of the page that tracks scroll progress via `window.scrollY`.

---

## Proposed Changes

### Change 1: Scroll Spy in Header

**File**: [`src/components/Header.tsx`](src/components/Header.tsx)

Add `useEffect` with `IntersectionObserver` to track which section is in view:

```tsx
const [activeSection, setActiveSection] = useState('contact');

useEffect(() => {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' } // triggers when section is in the middle of viewport
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

Then apply an active class to the current nav button:
```tsx
className={`text-gray-600 hover:text-teal-600 transition-colors font-medium ${
  activeSection === 'contact' ? 'text-teal-600 font-bold' : ''
}`}
```

### Change 2: Section Dividers

**File**: [`src/styles/globals.css`](src/styles/globals.css) or inline in sections

Add a subtle gradient border between sections. The simplest approach is adding a `border-b` or a spacer `<div>` between sections in [`src/App.tsx`](src/App.tsx).

Option A — Simple spacer in App.tsx:
```tsx
<main>
  <Home />
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  <Timeline />
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  <Projects />
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  <Contact />
</main>
```

Option B — Add `border-t border-gray-100` to each section (simpler, already have borders in cards).

### Change 3: Back to Top Button

**File**: New component [`src/components/BackToTop.tsx`](src/components/BackToTop.tsx)

A floating button that appears when scrolled past the hero section:

```tsx
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-all hover:scale-110"
      aria-label="Retour en haut"
    >
      <ArrowUp size={20} />
    </button>
  );
}
```

Then render it in [`src/App.tsx`](src/App.tsx) inside the main wrapper.

### Change 4: Scroll Progress Bar (Optional)

**File**: New component [`src/components/ScrollProgress.tsx`](src/components/ScrollProgress.tsx)

A thin bar at the very top of the viewport:

```tsx
import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-100">
      <div
        className="h-full bg-teal-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## Implementation Order

1. **Scroll Spy** — Most impactful for navigation feel. Makes the header responsive to manual scrolling.
2. **Section Dividers** — Simple visual polish between sections.
3. **Back to Top** — Improves UX for long pages.
4. **Scroll Progress** — Optional polish.

## Files to Modify

| File | Change |
|------|--------|
| [`src/components/Header.tsx`](src/components/Header.tsx) | Add `IntersectionObserver` scroll spy + active nav styling |
| [`src/App.tsx`](src/App.tsx) | Add section dividers between components, render BackToTop |
| [`src/components/BackToTop.tsx`](src/components/BackToTop.tsx) | **New** — Floating back-to-top button |
| [`src/components/ScrollProgress.tsx`](src/components/ScrollProgress.tsx) | **New** — Optional scroll progress bar |
| [`src/styles/globals.css`](src/styles/globals.css) | Add any global styles for transitions (if needed) |
