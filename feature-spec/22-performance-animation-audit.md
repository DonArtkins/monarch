# SPEC 22 — Performance & Animation Audit

**Branch:** `feat/22-performance-animation-audit`
**Scope:** All components, globals.css, layout.tsx

## Goal
Ensure the site achieves Lighthouse 90+ performance on mobile. Zero animation lag.

## Acceptance Criteria
- Video lazy loading: all bento/section videos use VideoPlayer with IntersectionObserver
- GSAP: all contexts use `useGSAP` with proper scope + cleanup
- No `will-change` on static elements
- Font preloads: all 5 fonts preloaded in layout.tsx
- Images: `priority` prop on above-fold images (hero, about)
- CSS: no unused keyframes, no redundant transitions
- Build output: zero TypeScript errors, zero ESLint errors
- Bento grid: videos do not autoplay off-screen (VideoPlayer already handles this)
