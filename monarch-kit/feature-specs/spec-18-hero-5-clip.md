# SPEC 18 — Hero 5-Clip Video Structure (Hexagonal Containers)

**Branch:** `feat/18-hero-5-clip`  
**Component:** `components/Hero.tsx` (MODIFY — CRITICAL, HIGH RISK)

## What
Expand the Hero section from its current 2-video click-to-swap system to a 5-clip cinematic layout. The main center video remains the primary focus. Four additional smaller clip containers float at the corners/edges — each showing a different Solo Leveling scene. The existing clip-path scroll animation on `#video-frame` is fully preserved. The video-swap mechanic is preserved on the center clip.

## Current State
`Hero.tsx` currently:
- `totalVideos = 2` — cycles between `hero-1.mp4` and `hero-2.mp4`
- One centered clickable mini-video (upcomingVideoIndex)
- One full-background video (`#video-frame` container)
- GSAP clip-path scroll effect (polygon shrink on scroll)
- Three-body spinner loading state
- Two text overlays: `MONARCH` top-left, `AWAKEN` bottom-right (repeated outside frame)
- `Enter System` CTA button

## Dependencies
- SPEC 16 (Typography) — hero heading clamp sizing
- SPEC 17 (Color System) — new background tokens for clip containers
- SPEC 12 (Nav) — must already be complete (nav sits above hero)

## ⚠️ CRITICAL — Preservation Rules
- DO NOT remove or modify the `#video-frame` div or its `clip-path` GSAP scroll logic
- DO NOT change the `isLoading` / three-body spinner — keep as fallback but make sure its its own component and covers the whole webiste like our current loader, not just the hero section as it was earlier
- DO NOT change the `handleMiniVideoClick` swap mechanic on the center clip
- DO NOT add autoplay to new clips outside the existing pattern — use VideoPlayer component
- The 4 new clip containers are purely DECORATIVE — no click handlers

## Implementation

### Component Structure

```typescript
"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./VideoPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Add these 4 decorative clip configs OUTSIDE the component
const DECORATIVE_CLIPS = [
  {
    src: "/videos/hero-2.mp4",      // TODO: Replace with /videos/HERO_VID_03.mp4
    position: "absolute top-16 right-10 z-30",
    size: "w-32 h-20 sm:w-48 sm:h-28 md:w-56 md:h-32",
    clipPath: "polygon(0 0, 100% 10%, 90% 100%, 10% 90%)",
    label: "SHADOW ARMY",
  },
  {
    src: "/videos/hero-1.mp4",      // TODO: Replace with /videos/HERO_VID_04.mp4
    position: "absolute bottom-32 right-6 z-30",
    size: "w-28 h-20 sm:w-40 sm:h-28",
    clipPath: "polygon(10% 0, 90% 0, 100% 90%, 0% 100%)",
    label: "GATE CRACK",
  },
  {
    src: "/videos/hero-2.mp4",      // TODO: Replace with /videos/HERO_VID_05.mp4
    position: "absolute top-1/2 left-4 -translate-y-1/2 z-30",
    size: "w-24 h-32 sm:w-36 sm:h-48",
    clipPath: "polygon(0 10%, 100% 0, 90% 100%, 0 90%)",
    label: "EXTRACTION",
  },
  {
    src: "/videos/hero-1.mp4",      // TODO: Replace with /videos/HERO_VID_02.mp4
    position: "absolute bottom-16 left-10 z-30",
    size: "w-36 h-24 sm:w-48 sm:h-32",
    clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0% 100%)",
    label: "RULER'S AUTHORITY",
  },
];
```

### Hero component changes (add after existing state declarations):

```typescript
const heroRef = useRef<HTMLDivElement>(null);

// Add entrance animation for decorative clips
useGSAP(
  () => {
    gsap.from(".hero-deco-clip", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.5, // after loading state clears
    });
  },
  { scope: heroRef, dependencies: [isLoading] }
);
```

### JSX changes inside the return

Inside the main hero `div` (the root container), **after** `#video-frame` div and **before** the repeated `hero-heading AWAKEN` at the bottom, add the decorative clips:

```tsx
{/* 4 Decorative clip containers — hidden on mobile */}
{!isLoading && (
  <div className="pointer-events-none hidden sm:block">
    {DECORATIVE_CLIPS.map((clip, i) => (
      <div
        key={i}
        className={`hero-deco-clip ${clip.position} ${clip.size} overflow-hidden`}
        style={{ clipPath: clip.clipPath }}
        aria-hidden="true"
      >
        <VideoPlayer
          src={clip.src}
          className="size-full object-cover object-center scale-110"
        />
        {/* Label overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/80 to-transparent">
          <p
            className="text-[8px] uppercase tracking-[0.2em] text-monarch-text-dim"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {clip.label}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
```

### Update `totalVideos` and `getVideoSrc` to support more clips

```typescript
// Change totalVideos from 2 to reflect actual available clips
// The center video still cycles only between hero-1 and hero-2
// No change needed to existing click-swap logic — keep totalVideos = 2
// Decorative clips have their own fixed src props
```

### Update copy overlay

```tsx
{/* Update hero copy to SPEC 39 second-person voice */}
<div className="absolute left-0 top-0 z-40 size-full">
  <div className="mt-24 px-5 sm:px-10">
    <h1 className="special-font hero-heading text-monarch-text">
      Mon<b>a</b>rch
    </h1>
    <p className="mb-5 max-w-sm font-robert-regular text-monarch-text-dim text-sm sm:text-base">
      You are the weakest hunter. <br /> Until the system chose you.
    </p>
    <Button
      id="enter-system"
      title="Arise"
      leftIcon={<TiLocationArrow />}
      containerClass="bg-monarch-blue text-monarch-void flex-center gap-1"
    />
  </div>
</div>
```

## Assets Required

| Asset | Placeholder | Final |
|---|---|---|
| Top-right clip | `/videos/hero-2.mp4` | `/videos/HERO_VID_03.mp4` |
| Bottom-right clip | `/videos/hero-1.mp4` | `/videos/HERO_VID_04.mp4` |
| Left clip | `/videos/hero-2.mp4` | `/videos/HERO_VID_05.mp4` |
| Bottom-left clip | `/videos/hero-1.mp4` | `/videos/HERO_VID_02.mp4` |

## Placeholder Strategy
All 4 decorative clips use existing `hero-1.mp4` or `hero-2.mp4` as placeholders until final assets are generated via Google Flow. Comment each with `{/* TODO: Replace with /videos/HERO_VID_XX.mp4 */}`.

## Out of Scope
- True hexagonal CSS clip-path containers (SPEC 19 handles hex particle color update)
- Preloader interaction with decorative clips (preloader hides entire site content)

## Acceptance Criteria
- [ ] 4 decorative clip containers visible on desktop (≥ 640px), hidden on mobile
- [ ] All clips use `VideoPlayer` component (IntersectionObserver lazy-play)
- [ ] Existing center video swap mechanic (`handleMiniVideoClick`) fully preserved
- [ ] Existing GSAP clip-path scroll effect on `#video-frame` fully preserved
- [ ] Decorative clips have `pointer-events-none` — no click interference
- [ ] All clip containers have `aria-hidden="true"`
- [ ] Entrance animation plays after loading state clears
- [ ] `npm run build` passes — zero TypeScript errors
- [ ] No horizontal overflow at any viewport width

## Mobile Requirements
- [ ] Decorative clips: `hidden sm:block` — invisible on mobile (< 640px)
- [ ] Center clip and hero text fully functional on mobile (unchanged from current)
- [ ] No touch event interference from decorative clips
