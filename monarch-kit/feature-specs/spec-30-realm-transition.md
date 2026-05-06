# SPEC 30 — Dark ↔ Light Realm Shift Transition

**Branch:** `feat/30-realm-transition`  
**Component:** `components/RealmTransition.tsx` (NEW)

## What
A full-width scroll-driven horizontal wipe transition that lives between the `Gates` section and the `Ranks` section. As the user scrolls past the Gates section's darkness, a cinematic horizontal clip-path wipe from left to right reveals the next section — like stepping from the dungeon exterior through a doorway into a slightly lighter realm. The visual metaphor: exiting a gate into a new world.

This is a standalone, self-contained component with no content — its sole purpose is the GSAP ScrollTrigger wipe animation. It is not visible by itself; it reveals the section below it.

## Current State
No transition effect exists between sections. The About section uses a `clip-path` scroll expansion (vertical). This spec creates the first horizontal wipe, a technique not yet in the project.

## Dependencies
- SPEC 17 (Color System) — uses `--abyss`, `--shadow-dark`, `--ice-eye` tokens
- SPEC 29 (Gates) — placed directly after Gates in DOM order
- SPEC 31 (Ranks) — placed directly before Ranks in DOM order

## Implementation

### Technique
A full-viewport-width div with `position: sticky` creates a panel that `pins` during scroll. Its `clip-path: inset(0 100% 0 0)` (fully hidden on right) animates to `inset(0 0% 0 0)` (fully revealed) as the user scrolls through the trigger zone. This creates a left-to-right horizontal wipe revealing a color swatch beneath.

The wipe reveals a thin band of `--shadow-dark` color with a subtle blue ice glow edge — like a gate's energy bleeding through a crack as it opens.

### Component: `components/RealmTransition.tsx`

```typescript
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RealmTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wipeRef.current || !glowLineRef.current) return;

      // Main horizontal wipe
      gsap.fromTo(
        wipeRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // Glow edge line — follows the wipe leading edge
      gsap.fromTo(
        glowLineRef.current,
        { x: "-100%" },
        {
          x: "100vw",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-screen overflow-hidden"
      style={{
        height: "2px",
        backgroundColor: "var(--abyss, #020208)",
      }}
    >
      {/* The wipe panel — same color as receiving section bg */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--shadow-dark, #0D0F2A)",
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path",
        }}
      />

      {/* Ice-eye glow leading edge — the light bleeding through the gate crack */}
      <div
        ref={glowLineRef}
        className="absolute top-0 h-full pointer-events-none"
        style={{
          width: "3px",
          background:
            "linear-gradient(to bottom, transparent, var(--ice-eye, #60A5FA), transparent)",
          filter: "blur(4px)",
          boxShadow: "0 0 12px var(--ice-eye, #60A5FA)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default RealmTransition;
```

### Extended Version — Full-Height Pinned Wipe (Optional Upgrade)

If the 2px version feels too subtle, use this pinned full-viewport wipe instead. Swap the component body with the following — it pins a full-screen panel and wipes it away:

```typescript
// Alternative: full-screen wipe between dark and dark-mid sections
// Use this if the 2px version is not cinematic enough

const RealmTransitionFull = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = containerRef.current?.querySelector(".wipe-overlay");
      if (!overlay) return;

      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0% 0 0)" },
        {
          clipPath: "inset(0 100% 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300",
            scrub: 1,
            pin: true,
            pinSpacing: false,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} aria-hidden="true" className="relative w-screen" style={{ height: "1px" }}>
      <div
        className="wipe-overlay fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: "var(--abyss, #020208)",
          clipPath: "inset(0 0% 0 0)",
          zIndex: 5,
          willChange: "clip-path",
        }}
      />
    </div>
  );
};
```

**Recommended approach:** Use the lightweight 2px version first. Upgrade to full-screen only if visual reviews find it insufficient.

### Integration in `app/page.tsx`

```typescript
const RealmTransition = dynamic(
  () => import("../components/RealmTransition"),
  { ssr: false }
);

// Place between Gates and Ranks:
<Gates />
<RealmTransition />
<Ranks />
```

## Assets Required
- None — pure CSS/GSAP implementation.

## Acceptance Criteria
- [ ] `RealmTransition` renders between `Gates` and `Ranks` in DOM order
- [ ] A left-to-right horizontal wipe is visible as the user scrolls through the trigger zone
- [ ] The ice-eye blue glow edge (`var(--ice-eye)`) travels with the wipe leading edge
- [ ] Wipe is driven by `scrub: 0.8` — smooth, proportional to scroll position
- [ ] No layout shift — `height: 2px` does not affect surrounding section spacing
- [ ] `aria-hidden="true"` on the container — decorative only
- [ ] `will-change: clip-path` set on the wipe panel, no other persistent `will-change`
- [ ] GSAP animations use `useGSAP` with `{ scope: containerRef }`
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Effect works on touch scroll — GSAP ScrollTrigger handles touch natively
- [ ] No horizontal overflow at 375px
- [ ] The 2px height variant has zero visual impact on mobile layout — invisible at rest
