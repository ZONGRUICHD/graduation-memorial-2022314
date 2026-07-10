# Graduation Memorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing 909 graduation memorial into a distinctive, accessible digital yearbook without changing its content or deployment stack.

**Architecture:** Keep the React/Vite single-page application and hash-based gallery route. Split the monolithic application into focused presentational components, then replace the current CSS with a tokenized editorial visual system. No new runtime dependencies are needed.

**Tech Stack:** React 19, TypeScript, Vite 8, vanilla CSS, Vitest, Testing Library

---

### Task 1: Lock down the user-facing behavior

**Files:**
- Modify: `site/src/app/routes.test.tsx`

- [ ] Add tests for the exact full title, three homepage photographs, blog destination, gallery navigation, quote dialog, Escape close behavior, and signature.
- [ ] Run `npm run test:run` and confirm the new behavior tests fail against the old application where appropriate.

### Task 2: Split and rebuild the React presentation

**Files:**
- Modify: `site/src/App.tsx`
- Create: `site/src/components/DynamicBackdrop.tsx`
- Create: `site/src/components/YearbookCover.tsx`
- Create: `site/src/components/PhotoStory.tsx`
- Create: `site/src/components/QuoteArchive.tsx`
- Create: `site/src/components/GalleryArchive.tsx`

- [ ] Keep `#gallery` navigation and browser back/forward synchronization.
- [ ] Build a text-only first viewport with the accessible full title and an unbreakable `高峰学校` line.
- [ ] Render the three required photographs in the established order and preserve intrinsic ratios.
- [ ] Implement the full-screen quote dialog with all quotes, body scroll locking, focus return, and Escape close.
- [ ] Render all 137 gallery entries as a lazy single-column archive with stable semantic figures.
- [ ] Run `npm run test:run` and make all behavior tests pass.

### Task 3: Replace the visual system

**Files:**
- Modify: `site/src/index.css`

- [ ] Introduce semantic color, spacing, type, layer, and motion tokens.
- [ ] Build the single prismatic aurora, typography-only cover, editorial photo rhythm, full-screen quote streams, and single-column gallery.
- [ ] Add keyboard focus, hover/pressed states, safe-area support, `content-visibility`, and reduced-motion fallbacks.
- [ ] Verify 320px, 768px, 1024px, and 1440px layouts have no overflow or accidental text wrapping.

### Task 4: Finish metadata and identity

**Files:**
- Modify: `site/index.html`
- Modify: `site/public/favicon.svg`

- [ ] Set correct Chinese title, description, theme color, and social metadata.
- [ ] Replace the unrelated purple favicon with a restrained 909 mark.

### Task 5: Verify and publish

**Files:**
- No source changes expected.

- [ ] Run `npm run lint`, `npm run test:run`, and `npm run build`.
- [ ] Render fresh desktop, tablet, and mobile screenshots and inspect the title, first-photo boundary, image ratios, quote dialog, and gallery spacing.
- [ ] Commit and push the redesign, then deploy the generated `site/dist` build to the existing Cloudflare Pages project.
