# SPEC 19 — Hero Hexagonal Particle System (Ice-Eye Blue Upgrade)

**Branch:** `feat/19-hero-particles`  
**Component:** `components/Hero.tsx` (MODIFY — minor, CSS only)

## What
The Hero section has floating hexagonal elements as part of its visual language (referenced in project overview). This spec upgrades their color from the current teal/cyan to the new `--ice-eye` blue (`#60A5FA`) from SPEC 17, and adds a second subtle layer of smaller shadow-purple hexagons floating in the opposite direction. If no hex animation currently exists in the codebase, this spec creates a lightweight CSS-only hex particle overlay.

## Current State
Looking at `Hero.tsx`, there is no explicit hex canvas or SVG animation in the current code. The hexagonal aesthetic is implied through the clip-path containers. This spec creates the hex overlay as a new decorative layer inside the `#video-frame` container — pure CSS animation, no JS, no extra dependencies.

## Dependencies
- SPEC 17 (Color System) — uses `--ice-eye` and `--shadow-purple` tokens
- SPEC 18 (Hero 5-Clip) — should be applied after clip structure is in place

## Implementation

### Step 1 — Add hex particle CSS to `app/globals.css`

Add the following at the end of `globals.css`:

```css
/* ══════════════════════════════════════
   HERO HEX PARTICLES
   ══════════════════════════════════════ */

.hex-particle {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  animation: hex-float linear infinite;
}

.hex-particle::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

@keyframes hex-float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-20vh) rotate(360deg);
    opacity: 0;
  }
}

/* Primary layer — ice-eye blue */
.hex-primary {
  color: var(--ice-eye, #60A5FA);
}

/* Secondary layer — shadow purple, smaller, slower */
.hex-secondary {
  color: var(--shadow-purple, #6D28D9);
}
```

### Step 2 — Create `HexParticles` sub-component

Add this **above** the `Hero` component in `components/Hero.tsx`:

```typescript
// Hex particle configuration — defined outside component to avoid re-render
const HEX_PRIMARIES = [
  { size: 8, left: "10%", delay: "0s",   duration: "12s", opacity: 0.15 },
  { size: 6, left: "25%", delay: "2s",   duration: "9s",  opacity: 0.12 },
  { size: 10, left: "40%", delay: "4s",  duration: "14s", opacity: 0.1  },
  { size: 5, left: "55%", delay: "1s",   duration: "10s", opacity: 0.18 },
  { size: 8, left: "70%", delay: "3s",   duration: "11s", opacity: 0.13 },
  { size: 12, left: "85%", delay: "5s",  duration: "16s", opacity: 0.08 },
];

const HEX_SECONDARIES = [
  { size: 4, left: "15%", delay: "1.5s", duration: "18s", opacity: 0.08 },
  { size: 6, left: "35%", delay: "3.5s", duration: "22s", opacity: 0.06 },
  { size: 5, left: "60%", delay: "0.5s", duration: "20s", opacity: 0.07 },
  { size: 3, left: "78%", delay: "6s",   duration: "15s", opacity: 0.09 },
];

const HexParticles = () => (
  <div
    className="absolute inset-0 z-30 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Primary ice-eye blue hexagons — float upward */}
    {HEX_PRIMARIES.map((hex, i) => (
      <div
        key={`hex-p-${i}`}
        className="hex-particle hex-primary"
        style={{
          width: `${hex.size}px`,
          height: `${hex.size}px`,
          left: hex.left,
          bottom: "-20px",
          animationDelay: hex.delay,
          animationDuration: hex.duration,
          opacity: hex.opacity,
        }}
      />
    ))}
    {/* Secondary shadow-purple hexagons — smaller, slower, different timing */}
    {HEX_SECONDARIES.map((hex, i) => (
      <div
        key={`hex-s-${i}`}
        className="hex-particle hex-secondary"
        style={{
          width: `${hex.size}px`,
          height: `${hex.size}px`,
          left: hex.left,
          bottom: "-20px",
          animationDelay: hex.delay,
          animationDuration: hex.duration,
          opacity: hex.opacity,
        }}
      />
    ))}
  </div>
);
```

### Step 3 — Integrate HexParticles inside `#video-frame`

In the `Hero` component return, add `<HexParticles />` inside the `#video-frame` div, **after** the video elements and **before** the text overlay:

```tsx
<div
  id="video-frame"
  className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-monarch-abyss"
  style={{ willChange: "clip-path, border-radius" }}
>
  {/* ... existing video elements ... */}

  {/* Hex particle overlay — decorative */}
  <HexParticles />

  {/* ... existing text overlays ... */}
  <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-monarch-purple" ...>
    A<b>w</b>aken
  </h1>
  <div className="absolute left-0 top-0 z-40 size-full">
    {/* ... existing copy ... */}
  </div>
</div>
```

### Step 4 — Disable particles on `prefers-reduced-motion`

Add to `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .hex-particle {
    animation: none;
    display: none;
  }
}
```

## Assets Required
- None — pure CSS animation

## Placeholder Strategy
- N/A — no asset dependency

## Out of Scope
- Canvas-based particle system (CSS-only is preferred for performance)
- Interactive particles (mouse repulsion, etc.)
- Hex particles in other sections — this is Hero-only

## Acceptance Criteria
- [ ] Ice-eye blue hex particles visible floating upward on Hero section
- [ ] Shadow-purple secondary hex layer visible at reduced opacity
- [ ] Particles are `pointer-events: none` — no interaction blocking
- [ ] `aria-hidden="true"` on particle container
- [ ] Particles hidden when `prefers-reduced-motion: reduce` is set
- [ ] No performance impact — CSS-only, no JS ticker
- [ ] No horizontal overflow caused by particles (parent has `overflow: hidden`)
- [ ] `npm run build` passes

## Mobile Requirements
- [ ] Hex particles render on mobile (enhances the experience)
- [ ] Total of ~10 particles max — does not cause jank on low-end devices
- [ ] Particle sizes remain small enough (3–12px) to not clutter mobile hero
