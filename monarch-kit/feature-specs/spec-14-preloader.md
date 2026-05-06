# SPEC 14 — Gate Crack Preloader (Entry Experience)

**Branch:** `feat/14-preloader`  
**Component:** `components/Preloader.tsx` (NEW)

## What
Introduce a cinematic gate-crack opening sequence as the **universal site-wide preloader**. This is the first impression for the entire Monarch site — not just the Hero section — a cracking dungeon stone gate that bleeds purple light, slams the word ARISE, then shatters to reveal the site. No video file required — pure SVG path animation + GSAP.

The preloader is mounted at the root layout (`app/layout.tsx`) so it covers the entire application on initial load, regardless of which route the user lands on. It runs once per session and gates visibility of all site content (Hero, About, Features, Story, Contact, Footer — every route) until its timeline completes.

## Current State
`Hero.tsx` has a `.three-body` CSS spinner shown while `isLoading` is true (local to Hero, disappears after `loadedVideos >= totalVideos - 1` or after a 2500ms timeout). That spinner is scoped only to the Hero component and does not gate the rest of the site. The new `Preloader` replaces this as the **global** entry experience, mounted above all routes in `app/layout.tsx`. Hero's internal loading state may remain untouched as a secondary fallback for video readiness, but it is no longer the primary entry gate.

## Dependencies
- SPEC 12 (Nav Refinement) — can run in parallel, no dependency
- SPEC 16 (Typography) should be complete so Bebas Neue / compressed font is available for the ARISE text impact. If not complete, use `font-zentry` as fallback.

## Implementation

### Component: `components/Preloader.tsx`

A full-viewport fixed overlay that runs its GSAP timeline on mount, then calls an `onComplete` callback to remove itself. It is mounted in the **root layout** (`app/layout.tsx`) so it sits above every route in the app and gates the entire site's content, not a single page or section.

Because `app/layout.tsx` is a server component by default, the preloader is wrapped in a small client-side controller (`components/PreloaderGate.tsx`) that owns the `preloaderDone` state, renders `<Preloader>` while pending, and renders `{children}` (all site content) once complete.

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

### Client Gate: `components/PreloaderGate.tsx` (NEW)

A small client-side wrapper that owns the `preloaderDone` state. It is required because `app/layout.tsx` is a server component and cannot hold state or event handlers directly.

```typescript
"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

interface PreloaderGateProps {
  children: ReactNode;
}

const PreloaderGate = ({ children }: PreloaderGateProps) => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <div style={{ visibility: preloaderDone ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
};

export default PreloaderGate;
```

### Integration in `app/layout.tsx` (site-wide)

The preloader is mounted in the **root layout** so it gates every route of the site — not just the home page.

```typescript
import PreloaderGate from "../components/PreloaderGate";
// ... existing imports (fonts, metadata, globals.css)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PreloaderGate>{children}</PreloaderGate>
      </body>
    </html>
  );
}
```

This ensures that regardless of which route the user lands on (`/`, or any future sub-route), the gate-crack preloader plays once before the site becomes visible.

### Remove Old Loader from Hero.tsx

The `.three-body` spinner in `Hero.tsx` (`isLoading` state) is **no longer the site's entry experience**; the global `Preloader` in the root layout now owns that responsibility. Two acceptable options:

1. **Preferred — leave Hero untouched.** The global Preloader runs first above all content, then the layout becomes visible, and only then does Hero's internal video-readiness check run as a silent secondary check. No prop changes needed.
2. **Alternative — remove Hero's spinner entirely** now that a stronger global preloader exists. Only do this if verified not to break video fade-in behavior.

Do **not** couple Hero to `preloaderDone` — the global gate already hides the entire app until it's done, so no prop drilling is needed.

## Assets Required
- `PRELOADER_CRACK.svg` — Optional: more complex branching crack geometry. The implementation above uses inline SVG path elements which is sufficient.
- No video files needed.

## Placeholder Strategy
- N/A — this is code-only, no external assets

## Out of Scope
- Audio integration with preloader (SPEC 39 handles audio)
- Session-persistent preloader skip (shows once per session via `sessionStorage`) — future enhancement
- Progress bar showing asset loading percentage

## Future Modifications
- SPEC 39: Can add a brief audio sting synced to the crack moment

## Acceptance Criteria
- [ ] Preloader is mounted in `app/layout.tsx` via `PreloaderGate` and gates **every route** of the site, not just the Hero or home page
- [ ] Preloader covers full viewport on initial site load (`position: fixed`, `z-index: 100000`)
- [ ] All site content (Hero, NavBar, About, Features, Story, Contact, Footer, and any future routes) is hidden until `onComplete` fires
- [ ] Crack line animation plays as described (0.3s → crack → ARISE → dissolve)
- [ ] `ARISE` text appears at correct point in sequence
- [ ] Skip button appears after 1.2 seconds and skips to end on click
- [ ] `onComplete` callback fires, main content becomes visible
- [ ] Pure black background — no site content visible during preloader
- [ ] No layout shift when preloader removes — site content renders beneath it during sequence
- [ ] `aria-hidden="true"` on preloader container
- [ ] Hero's existing `.three-body` spinner is not coupled to the global preloader state (no prop drilling)
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Works at all viewport sizes (mobile + desktop)
