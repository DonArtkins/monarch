# SPEC 13 — Gate Crack Preloader (Entry Experience)

**Branch:** `feat/13-preloader`  
**Component:** `components/Preloader.tsx` (NEW)

## What
Replace the current three-body spinner loader in `Hero.tsx` with a cinematic gate-crack opening sequence. This is the first impression — a cracking dungeon stone gate that bleeds purple light, slams the word ARISE, then shatters to reveal the site. No video file required — pure SVG path animation + GSAP.

## Current State
`Hero.tsx` has a `.three-body` CSS spinner shown while `isLoading` is true. The spinner disappears after `loadedVideos >= totalVideos - 1` or after a 2500ms timeout.

## Dependencies
- SPEC 11 (Nav Refinement) — can run in parallel, no dependency
- SPEC 15 (Typography) should be complete so Bebas Neue / compressed font is available for the ARISE text impact. If not complete, use `font-zentry` as fallback.

## Implementation

### Component: `components/Preloader.tsx`

A full-viewport fixed overlay that runs its GSAP timeline on mount, then calls an `onComplete` callback to remove itself. The parent (`app/page.tsx` or `layout.tsx`) controls visibility via state.

### Sequence Timeline (total ~2.4s)

| Time | Event |
|---|---|
| 0.0s | Pure black screen |
| 0.3s | Single 1px horizontal line appears dead center (electric blue `var(--ice-eye)`) |
| 0.7s | Line animates into branching crack — SVG path `stroke-dashoffset` animation |
| 1.1s | Crack widens with `scaleX` on crack divs — deep purple glow bleeds through |
| 1.6s | `ARISE` text slams in from scale 2 → scale 1, opacity 0 → 1 |
| 2.0s | Everything dissolves — `clip-path` wipe reveals site beneath |
| 2.4s | Preloader `display: none`, `onComplete()` called |

### Skip Behavior
After 1.2s, a skip prompt fades in: `[ SKIP ]` — clicking it fast-forwards the timeline to end.

```typescript
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });
      tlRef.current = tl;

      // 1. Initial horizontal crack line
      tl.set(".crack-line-h", { scaleX: 0, transformOrigin: "center center" })
        .to(".crack-line-h", {
          scaleX: 1,
          duration: 0.4,
          ease: "power4.out",
          delay: 0.3,
        })
        // 2. SVG crack paths animate in
        .to(".crack-path", {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.05,
        }, "-=0.1")
        // 3. Glow bleeds through crack
        .to(".crack-glow", {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.2")
        // 4. ARISE text impact
        .fromTo(
          ".preloader-arise",
          { scale: 1.6, opacity: 0, filter: "blur(20px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power4.out",
          },
          "-=0.1"
        )
        // 5. Dissolve — clip-path wipe outward
        .to(".preloader-arise", {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          delay: 0.2,
        })
        .to(
          containerRef.current,
          {
            clipPath: "inset(50% 0 50% 0)",
            duration: 0.5,
            ease: "power4.inOut",
          },
          "-=0.1"
        );

      // Skip button appears after 1.2s
      gsap.to(".preloader-skip", {
        opacity: 1,
        duration: 0.3,
        delay: 1.2,
      });
    },
    { scope: containerRef }
  );

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Crack SVG overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Horizontal base line */}
        <div
          className="crack-line-h"
          style={{
            position: "absolute",
            height: 1,
            width: "60vw",
            backgroundColor: "var(--ice-eye)",
            boxShadow: "0 0 8px var(--ice-eye), 0 0 20px var(--ice-eye)",
          }}
        />

        {/* SVG branching cracks */}
        <svg
          viewBox="0 0 800 400"
          style={{
            position: "absolute",
            width: "80vw",
            maxWidth: 800,
            height: "auto",
            overflow: "visible",
          }}
          fill="none"
          aria-hidden="true"
        >
          {/* Main crack paths — stroke-dasharray animated */}
          <path
            className="crack-path"
            d="M400 200 L340 160 L310 130 L280 90"
            stroke="var(--ice-eye)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L450 150 L480 110 L510 80"
            stroke="var(--ice-eye)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L360 230 L330 270 L300 310"
            stroke="var(--ice-eye)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L440 240 L470 280 L500 320"
            stroke="var(--ice-eye)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Secondary micro-cracks */}
          <path
            className="crack-path"
            d="M340 160 L315 145 L295 155"
            stroke="var(--shadow-purple)"
            strokeWidth="0.8"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.6"
          />
          <path
            className="crack-path"
            d="M450 150 L470 138 L488 148"
            stroke="var(--shadow-purple)"
            strokeWidth="0.8"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.6"
          />
        </svg>

        {/* Purple glow bleeding through crack */}
        <div
          className="crack-glow"
          style={{
            position: "absolute",
            width: "40vw",
            height: 2,
            background:
              "linear-gradient(90deg, transparent, var(--shadow-purple), transparent)",
            filter: "blur(12px)",
            opacity: 0,
          }}
        />
      </div>

      {/* ARISE text */}
      <div
        className="preloader-arise"
        style={{
          fontFamily: "var(--font-zentry, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          fontWeight: 900,
          color: "var(--white)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          opacity: 0,
          position: "relative",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        ARISE
      </div>

      {/* Skip button */}
      <button
        className="preloader-skip"
        onClick={handleSkip}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          opacity: 0,
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--silver)",
          fontFamily: "monospace",
          fontSize: "0.625rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          transition: "border-color 0.2s",
        }}
        aria-label="Skip intro"
      >
        [ SKIP ]
      </button>
    </div>
  );
};

export default Preloader;
```

### Integration in `app/page.tsx`

```typescript
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("../components/Preloader"), { ssr: false });
// ... other imports

export default function Page() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <main
        id="main-content"
        className="relative min-h-screen w-screen overflow-x-hidden"
        style={{ visibility: preloaderDone ? "visible" : "hidden" }}
      >
        {/* ... sections */}
      </main>
    </>
  );
}
```

### Remove Old Loader from Hero.tsx

The `.three-body` spinner in `Hero.tsx` (`isLoading` state) can remain as a fallback or be removed since `Preloader` now owns the entry experience. To avoid conflict: keep Hero's loader but set `display: none` when `preloaderDone` is true by passing a prop `hideLoader={preloaderDone}` to Hero.

Alternatively — simplest approach — keep Hero's existing loading state completely untouched. Preloader runs first, then main content becomes visible, then Hero's internal loading check runs as normal.

## Assets Required
- `PRELOADER_CRACK.svg` — Optional: more complex branching crack geometry. The implementation above uses inline SVG path elements which is sufficient.
- No video files needed.

## Placeholder Strategy
- N/A — this is code-only, no external assets

## Out of Scope
- Audio integration with preloader (SPEC 38 handles audio)
- Session-persistent preloader skip (shows once per session via `sessionStorage`) — future enhancement
- Progress bar showing asset loading percentage

## Future Modifications
- SPEC 38: Can add a brief audio sting synced to the crack moment

## Acceptance Criteria
- [ ] Preloader covers full viewport on page load (`position: fixed`, `z-index: 100000`)
- [ ] Crack line animation plays as described (0.3s → crack → ARISE → dissolve)
- [ ] `ARISE` text appears at correct point in sequence
- [ ] Skip button appears after 1.2 seconds and skips to end on click
- [ ] `onComplete` callback fires, main content becomes visible
- [ ] Pure black background — no site content visible during preloader
- [ ] No layout shift when preloader removes — site content renders beneath it during sequence
- [ ] `aria-hidden="true"` on preloader container
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Works at all viewport sizes (mobile + desktop)
