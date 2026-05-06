# SPEC 13 — Custom Shadow Energy Cursor

**Branch:** `feat/13-custom-cursor`  
**Component:** `components/CustomCursor.tsx` (NEW)

## What
Replace the default browser cursor with a custom animated shadow-energy ring cursor. Adds a cinematic, interactive feel that immediately signals an Awwwards-level experience. Works only on desktop (pointer: fine). Degrades gracefully to default cursor on touch devices.

## Current State
Default browser cursor. No cursor customization exists.

## Dependencies
- SPEC 12 (Nav Refinement) must be complete so nav links have correct `data-cursor` attributes applied.
- `globals.css` must have the updated color tokens from the existing design system.

## Implementation

### Component: `components/CustomCursor.tsx`

Two absolutely positioned `div` elements managed by a GSAP ticker:
- `cursor-dot` — Small 6px filled circle, snaps to exact mouse position instantly
- `cursor-ring` — 20px ring (border only), follows with 0.15 lerp damping (weighted lag)

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// No plugins needed for this component

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot snaps instantly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Ring follows with damping
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    // Hover states — query all interactive elements
    const handleEnterLink = () => {
      gsap.to(ring, { scale: 2, opacity: 0.6, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const handleLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const handleEnterVideo = () => {
      // Crosshair state for video/image areas
      gsap.to(ring, { scale: 1.5, borderColor: "var(--ice-eye)", duration: 0.3 });
    };

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor='link']").forEach((el) => {
        el.addEventListener("mouseenter", handleEnterLink);
        el.addEventListener("mouseleave", handleLeaveLink);
      });
      document.querySelectorAll("video, [data-cursor='video']").forEach((el) => {
        el.addEventListener("mouseenter", handleEnterVideo);
        el.addEventListener("mouseleave", handleLeaveLink);
      });
    };

    addListeners();

    // Re-attach after hydration (dynamic content)
    const observer = new MutationObserver(() => addListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
      document.body.style.cursor = "";
      observer.disconnect();
    };
  });

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--ice-eye)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "1.5px solid var(--ice-eye)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />
    </>
  );
};

export default CustomCursor;
```

### Integration in `app/layout.tsx`

Add `CustomCursor` to layout so it persists across all pages. Wrap in a `pointer-fine` media query check:

```typescript
// In app/layout.tsx — add inside <body>:
// Only render on non-touch devices
{/* <CustomCursor /> */}
// Use a client wrapper if needed for conditional rendering
```

Create `components/CursorWrapper.tsx` — a client component that checks `window.matchMedia('(pointer: fine)')` and only renders `CustomCursor` on desktop:

```typescript
"use client";
import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

const CursorWrapper = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!isDesktop) return null;
  return <CustomCursor />;
};

export default CursorWrapper;
```

Then in `app/layout.tsx`:
```typescript
import CursorWrapper from "@/components/CursorWrapper";
// Inside <body>:
<CursorWrapper />
```

### data-cursor Attributes

Add to elements in existing components via their `className` or `data-cursor` prop — but do NOT modify existing component files directly. The cursor's `MutationObserver` will pick up new elements automatically via querySelectorAll selectors on `a, button`.

## Assets Required
- None — pure CSS/JS implementation

## Placeholder Strategy
- N/A — no asset dependency

## Out of Scope
- Custom SVG gate icon for cursor hover state (nice to have, future)
- Cursor trail ghost rings (future enhancement)
- Cursor state changes for specific section entries

## Future Modifications
- SPEC 29 can add a `data-cursor="gate"` attribute to the gate frame hover area for a crosshair state

## Acceptance Criteria
- [ ] Custom ring cursor visible on desktop (pointer: fine devices)
- [ ] Default cursor hidden on desktop via `body { cursor: none }`
- [ ] Cursor dot snaps instantly to mouse position
- [ ] Cursor ring follows with visible lag/damping (weighted feel)
- [ ] Ring expands smoothly on hover over `a` and `button` elements
- [ ] Touch devices show default cursor (no custom cursor rendered)
- [ ] No `pointer-events` on cursor elements (does not block clicks)
- [ ] Cursor elements have `aria-hidden="true"`
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] No memory leaks — cleanup function removes all event listeners and ticker
