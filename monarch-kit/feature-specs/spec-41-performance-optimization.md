# SPEC 41 — Performance, Lazy Loading & Mobile Optimization

**Branch:** `feat/41-performance-optimization`  
**Component:** Global / All Components (MODIFY — performance only)

## What
Implement Awwwards-level performance optimizations across the entire Monarch application. This includes Next.js dynamic imports (lazy loading) for heavy components (especially those using Three.js/WebGL or heavy GSAP), optimizing videos and images, ensuring mobile layout perfection (375px viewport), and eliminating GSAP memory leaks or unnecessary repaints.

## Current State
The application functions correctly but may load heavy assets (like high-res videos or 3D interactions) on initial page load. Mobile views might have slight overflow or layout shifts due to absolute positioning or unoptimized typography. GSAP animations might trigger layout recalculations instead of pure compositing.

## Dependencies
- SPEC 11 through SPEC 40 (all previous features must be integrated)
- `next/dynamic` for lazy-loading components.
- `next/image` with proper `priority`, `sizes`, and `placeholder` props.
- `@gsap/react` `useGSAP` hook for all animations (already a rule, but needs auditing).

## ⚠️ Preservation Rules
- DO NOT break any existing animation logic.
- DO NOT change the visual design or aesthetics.
- DO NOT remove components; only defer their loading.
- DO NOT alter the narrative copy or component order.

## Implementation Steps

### 1. Lazy Loading Components (Next.js Dynamic Imports)
Heavy components that appear below the fold must be dynamically imported to reduce the initial JavaScript bundle size.

- **Targets for `next/dynamic` in `app/page.tsx`:**
  - `Features` (Bento Grid)
  - `Story`
  - `Contact`
  - `Footer`
  - Any new heavy sections (e.g., Gates, Ranks, Monarchs, Weapons, Arise Scene)

**Implementation Example:**
```tsx
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('@/components/Features'), {
  ssr: true, // or false if strictly client-side interactive (e.g. 3D tilt)
});
```

### 2. Video Optimization (`VideoPlayer` component)
Videos are the largest assets in the Monarch project. They must be aggressively optimized.

- Ensure the `VideoPlayer` component uses the `IntersectionObserver` to only pause/play videos when they enter the viewport.
- Add `preload="none"` to videos that are far below the fold.
- For the Hero video, use `preload="auto"` and consider adding a highly compressed poster image to prevent CLS.

### 3. Image Optimization
Audit all `<img>` or `next/image` usage.

- Ensure `fill` or explicit `width`/`height` are set to prevent Cumulative Layout Shift (CLS).
- Use `sizes="(max-width: 768px) 100vw, 50vw"` appropriately.
- Add `priority` only to Above-the-Fold images (Hero, Origin).

### 4. GSAP Performance Audit
Awwwards sites require a buttery-smooth 60fps experience.

- **`will-change` Management:** Ensure elements being animated have `will-change: transform, opacity` applied *before* the animation starts, and removed after it completes.
- **GPU Acceleration:** Verify all animations use `x`, `y`, `scale`, `rotation`, and `opacity`. NEVER animate `top`, `left`, `width`, `height`, or `margin`.
- **Force 3D:** Ensure `force3D: true` is set on critical animations to offload rendering to the GPU.
- **ScrollTrigger `fastScrollEnd`:** Add `fastScrollEnd: true` to heavy ScrollTriggers to prevent jank when a user scrolls rapidly.

### 5. Mobile Layout & Overflow Prevention
The Solo Leveling UI can be intricate. On small screens (375px - 430px), elements must not cause horizontal scroll.

- Set `overflow-x: hidden` on the main `main` or `body` wrapper.
- Audit `padding` and `margin` on mobile breakpoints (`md:` vs base classes).
- Ensure Space Mono labels and `AnimatedTitle` components use fluid typography (e.g., `clamp()`) to prevent text from breaking boundaries.

## Acceptance Criteria
- [ ] Lighthouse Performance score is 90+ on Desktop.
- [ ] Lighthouse Performance score is 80+ on Mobile.
- [ ] No horizontal scrollbars appear on a 375px viewport.
- [ ] Below-the-fold sections are lazily loaded via `next/dynamic`.
- [ ] Videos pause when out of the viewport.
- [ ] Zero GSAP warnings in the console.
- [ ] No Cumulative Layout Shift (CLS) when loading the page.
- [ ] `npm run build` passes with zero warnings or errors.

## Mobile Requirements
- [ ] Verify Bento Grid cards stack correctly and retain 3D tilt interaction (if enabled for mobile).
- [ ] Touch interactions on ScrollTrigger elements feel responsive and don't block the main thread.
- [ ] Font sizes for `AnimatedTitle` adjust gracefully to avoid overlapping layout elements.
