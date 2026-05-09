# SPEC 42 — NavBar Refinement (Second Pass — FINAL)

**Branch:** `feat/42-nav-refinement`
**Component:** `components/NavBar.tsx`, `app/globals.css`
**Parent Spec:** SPEC 12 (Story-Based Navigation Refinement)

## What
Refine the NavBar from SPEC 12 with polished layout, mobile three-slot architecture, logo glow, enhanced audio indicator styling, and proper GSAP cleanup. This is a **refinement pass** over SPEC 12 that polishes the existing architecture without changing the core design.

## Current State (Post-SPEC 12 Base)
Nav items were already refactored into left/right groups with a centered logo. The hamburger-to-X GSAP animation, mobile overlay, and body scroll lock were already in place. IntersectionObserver tracked active sections, and the ARISE CTA used a glowing blue border style.

## Changes in SPEC 42

### 1. Logo Asset Path Correction
- Path changed from `/images/logo.svg` to `/images/logo/logo.svg` (nested inside `logo/` subdirectory).
- Desktop logo size kept at `h-40`. Mobile logo size kept at `h-7`.

### 2. Logo Radial-Glow Background
- Added a subtle permanent radial glow behind the logo on both **desktop** and **mobile**.
- **Desktop glow**: `w-72 h-72` with blueish-white radial gradient `rgba(200, 230, 255, 0.3)`, blurred with `blur(12px)`.
- **Mobile glow**: `w-40 h-40` with brighter gradient `rgba(200, 230, 255, 0.6)`, blurred with `blur(10px)`.
- The glow layer is `pointer-events-none` and sits behind the logo (`-z-10`).

### 3. Mobile Layout: Three-Slot Architecture
On viewports below `md`, the nav bar renders as three slots in a single row:
- **Left**: Hamburger (GSAP animated SVG)
- **Center**: Logo (absolutely centered, with glow)
- **Right**: Audio toggle indicator (no longer floating in an absolute position)

The mobile ARISE-CTA button was removed from the top bar and moved into the **mobile menu overlay** (see section 6). This prevents horizontal overflow at `360px`.

### 4. Audio Indicator Styling — Ice-White Vertical Bars
- Audio indicator bars (`indicator-line`) use `background-color: var(--monarch-ice-white, #f0f4ff)` instead of ice-eye blue.
- Height set to `12px`, width `2px`, border-radius `9999px`.
- Active state animation adds a soft white glow: `box-shadow: 0 0 8px var(--monarch-ice-white, #f0f4ff)`.
- Static indicator bars (desktop inside `group/audio` wrapper) had explicit inline `height` and `width` removed since the base CSS now defines them.

### 5. HUD Tooltip — Removed
- The hover tooltip showing `AMBIENT · ON` / `AMBIENT · OFF` below the desktop audio toggle was removed.
- Rationale: It added DOM bloat without meaningful UX. Visual state is clear from the animated bars alone.

### 6. Mobile Menu Overlay — Floating Card Style
- Changed from `inset-0` (full-screen) to a **smaller floating card**: `inset-x-6 top-24 bottom-6`.
- Uses `floating-nav` utility for border, blur, and background matching the desktop nav.
- Replaced the `opacity-only` transition with a combined `opacity` + `translate-y` for a crisp slide-in effect:
  - Open state: `opacity-100 translate-y-0 pointer-events-auto`
  - Close state: `opacity-0 -translate-y-10 pointer-events-none`
- Animation duration: `500ms` using `ease-monarch` (`cubic-bezier(0.65, 0.05, 0.36, 1)`).
- **ARISE CTA button is now inside the mobile menu overlay**, styled with `!px-10 !py-4 text-xl`.

### 7. Active Section Class — Tailwind Important Syntax
Changed from `"!text-monarch-blue"` (Tailwind v4 important modifier) back to `"text-monarch-blue!"` (CSS-level `!important`) for compatibility. Both achieve the same visual result.
```typescript
className={`nav-hover-btn ${
  activeSection === item.href.slice(1) ? "text-monarch-blue!" : ""
}`}
```

### 8. GSAP Audio Bar Entrance — `fromTo` with Explicit Start State
Reverted the audio indicator entrance from `gsap.from` back to `gsap.fromTo` with a manual `scaleY: 0` start state. This guarantees the bars begin invisible even if CSS is loaded slowly.
```typescript
useGSAP(() => {
  gsap.fromTo(
    ".indicator-line",
    { scaleY: 0 },
    {
      scaleY: 1,
      transformOrigin: "bottom center",
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.6,
    }
  );
}, { dependencies: [] });
```

### 9. GSAP Cleanup — Dependency Arrays
Added `dependencies: []` to all `useGSAP` calls that run once on mount. This prevents accidental re-runs on re-renders while keeping `useGSAP` hook-aware cleanup intact:
- Audio bar entrance animation
- Hamburger timeline inside `useGSAP`

### 10. Base CSS — Indicator Bar Color & Sizing
Updated `app/globals.css`:
```css
.indicator-line {
  height: 0.75rem;
  width: 2px;
  background-color: var(--monarch-ice-white, #f0f4ff);
  /* ... */
}

.indicator-line.active {
  box-shadow: 0 0 8px var(--monarch-ice-white, #f0f4ff);
  /* ... */
}
```
Also tightened `hero-heading` and `animated-title` `clamp()` minimums (Hero-related, but co-located in build cycle).

## Acceptance Criteria
- [x] Nav shows story-driven labels (Origin, The System, Shadow Army, Dungeons, Monarchs).
- [x] Active section link glows faint blue.
- [x] ARISE button has glowing blue border style.
- [x] Clicking nav items smooth-scrolls to sections.
- [x] Logo is rendered in the **center** of the desktop nav, absolutely positioned so asymmetric label widths never shift it.
- [x] **Logo radial glow** appears behind the logo on both desktop and mobile.
- [x] Mobile layout shows hamburger (left), centered logo, and **audio indicator** (right) on a single row — no horizontal overflow at `360px`.
- [x] Tapping the mobile hamburger morphs the 3-bar SVG into an X using GSAP; tapping again reverses the timeline.
- [x] GSAP timeline is built inside `useGSAP` with `scope: iconRef`, and cleans up with the component.
- [x] Mobile menu overlay is a **floating card** (`inset-x-6 top-24 bottom-6`) with `floating-nav` blur, not a full-screen panel.
- [x] Mobile menu closes on item tap, triggers smooth scroll, and locks body scroll while open.
- [x] `NavBar` uses `gsap.fromTo` for audio bar entrance (not `gsap.from`) to enforce a deterministic start state.
- [x] `useGSAP` calls include `dependencies: []` where appropriate.
- [x] HUD tooltip below audio toggle is **removed**.
- [x] `npm run build` passes.

## Files Modified
- `components/NavBar.tsx` (logo asset path, glow layers, mobile layout, menu overlay style, active-section class, HUD removal, dependency arrays)
- `app/globals.css` (indicator line color/sizing, hero font clamp minima)
- `.gitignore` (added `.kilo/` ignore rule)

## Notes
- This spec is a **refinement** — it does not change any navigation destinations, label copy, or section IDs. It polishes the implementation surface from SPEC 12.
- The mobile layout three-slot approach (hamburger — logo — audio) was chosen to prevent CTA overflow at narrow widths. The ARISE button inside the mobile menu overlay compensates for its removal from the top bar.
