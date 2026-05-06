# SPEC 15 — Film Grain + Noise Texture Global Overlay

**Branch:** `feat/15-film-grain`  
**Component:** `components/FilmGrain.tsx` (NEW)

## What
Add a subtle animated film grain / noise texture overlay that covers the entire site. This is one of the most-noticed details on Awwwards SOTD dark sites — it adds cinematic depth, texture, and "realness" that separates premium experiences from standard websites. Pure CSS + SVG filter. No external asset required.

## Current State
No film grain or noise texture on the site. Backgrounds are flat dark colors.

## Dependencies
- None. Can be implemented in isolation.
- SPEC 17 (Color tokens) should be applied first so CSS variable `--abyss` is available, but the component works with existing tokens.

## Implementation

### Component: `components/FilmGrain.tsx`

A single fixed `div` with `pointer-events: none` containing an SVG filter that generates fractal noise. The filter is animated at ~8fps for organic film-grain feel.

```typescript
"use client";

import { useEffect, useRef } from "react";

const FilmGrain = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const feTurbulence = svg.querySelector("feTurbulence");
    if (!feTurbulence) return;

    let frame = 0;
    const FPS = 8; // Animate at 8fps for authentic grain feel
    let lastTime = 0;
    const interval = 1000 / FPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;
        frame++;
        // Shifting seed creates the rolling grain effect
        feTurbulence.setAttribute("seed", String(frame % 100));
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Hidden SVG with filter definition */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="monarch-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              seed="2"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grey-noise"
            />
            <feBlend
              in="SourceGraphic"
              in2="grey-noise"
              mode="overlay"
              result="blend"
            />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay div */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0.045,
          filter: "url(#monarch-grain)",
          mixBlendMode: "overlay",
          // Subtle scale animation to break grid repetition
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
};

export default FilmGrain;
```

### Alternative: Pure CSS Approach (No JS Animation)

If performance is a concern on lower-end devices, a CSS-only version using a static noise SVG background is acceptable:

```css
/* In globals.css */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
  background-size: 300px 300px;
  animation: grain-shift 0.15s steps(1) infinite;
}

@keyframes grain-shift {
  0%  { background-position: 0 0; }
  20% { background-position: -50px -25px; }
  40% { background-position: -100px 25px; }
  60% { background-position: 25px -50px; }
  80% { background-position: -75px 75px; }
  100% { background-position: 0 0; }
}
```

**Recommended approach**: Use the CSS `::after` approach — zero JavaScript, zero React component, no bundle impact. Add to `globals.css`.

### Integration

**Option A (CSS — Recommended)**: Add the `body::after` CSS block to `globals.css`. No component needed.

**Option B (React component)**: Import `FilmGrain` in `app/layout.tsx`:

```typescript
import FilmGrain from "@/components/FilmGrain";

// Inside <body>:
<FilmGrain />
```

Use Option A unless the client specifically needs the animated seed-shifting grain.

### Section-Specific Opacity

On lighter content areas (if any), grain should be lighter. Handle via section-specific CSS:

```css
/* Heavier grain on pure black/void sections */
.section-void body::after {
  opacity: 0.07;
}
```

## Assets Required
- None. Pure CSS/SVG technique.

## Out of Scope
- Different grain textures per section
- Responsive grain scaling

## Acceptance Criteria
- [ ] Film grain visible as a subtle texture layer across all sections
- [ ] Grain does NOT obscure text readability — opacity ≤ 0.05
- [ ] `pointer-events: none` — grain does not interfere with click/hover interactions
- [ ] `z-index: 9999` — grain sits above all page content but below cursor (z-index 99998+)
- [ ] `mix-blend-mode: overlay` — grain integrates with dark backgrounds naturally
- [ ] No layout shift or content reflow from grain overlay
- [ ] Grain animates (CSS keyframe or JS seed) — not a static frozen pattern
- [ ] `aria-hidden="true"` if using React component
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Lighthouse performance score unaffected (CSS approach preferred)
