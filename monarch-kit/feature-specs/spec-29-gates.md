# SPEC 29 — Red Gate Frame-by-Frame Hover Section

**Branch:** `feat/29-gates`  
**Component:** `components/Gates.tsx` (NEW)

## What
A new full-viewport section placed AFTER `Features` and BEFORE the realm transition. The centerpiece is a frame-by-frame hover effect — moving the mouse horizontally across the gate image changes which JPG frame is displayed, creating a cinematic depth effect that simulates walking INTO an S-rank red gate. Six rank cards (E through S) appear below in a horizontal strip, each color-coded to its gate type.

## Current State
No Gates section exists. The Story component's mouse-tilt interaction (`contextSafe`, `gsap.to` on `rotateX`/`rotateY`) is the closest architectural reference. The frame-by-frame technique is new to the project. Gate frames at `/public/images/gate-frames/gate_frame_001.jpg` → `gate_frame_040.jpg` may not yet exist.

## Dependencies
- SPEC 16 (Typography) — `system-label` utility, Space Mono font
- SPEC 17 (Color System) — `--gate-red`, `--gate-cyan`, `--gate-yellow`, `--rank-b`, `--rank-c`, `--rank-d`, `--abyss`, `--silver` tokens
- SPEC 30 (Realm Transition) — placed immediately after Gates in `page.tsx`

## Implementation

### Placeholder Strategy
On mount, probe `/public/images/gate-frames/gate_frame_001.jpg` with an `Image` `onError`. If it fails, render `/public/images/about-bg.jpeg` with a crimson gradient overlay + CSS `transform` parallax on `mousemove`. This keeps the spec complete regardless of asset generation status.

### Component: `components/Gates.tsx`

```typescript
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 40;

interface GateRank {
  rank: string;
  color: string;
  bg: string;
  border: string;
  label: string;
  desc: string;
  ariaLabel: string;
}

const GATE_RANKS: GateRank[] = [
  {
    rank: "E",
    color: "var(--gate-cyan, #06B6D4)",
    bg: "rgba(6, 182, 212, 0.06)",
    border: "rgba(6, 182, 212, 0.25)",
    label: "E-RANK GATE",
    desc: "Where every hunter starts. Cyan light. Low threat.",
    ariaLabel: "E-Rank gate — lowest difficulty",
  },
  {
    rank: "D",
    color: "var(--rank-d, #22C55E)",
    bg: "rgba(34, 197, 94, 0.06)",
    border: "rgba(34, 197, 94, 0.25)",
    label: "D-RANK GATE",
    desc: "Green shimmer. Standard dungeon crawl.",
    ariaLabel: "D-Rank gate — low difficulty",
  },
  {
    rank: "C",
    color: "var(--rank-c, #3B82F6)",
    bg: "rgba(59, 130, 246, 0.06)",
    border: "rgba(59, 130, 246, 0.25)",
    label: "C-RANK GATE",
    desc: "Blue gate. Real danger begins here.",
    ariaLabel: "C-Rank gate — moderate difficulty",
  },
  {
    rank: "B",
    color: "var(--rank-b, #8B5CF6)",
    bg: "rgba(139, 92, 246, 0.06)",
    border: "rgba(139, 92, 246, 0.25)",
    label: "B-RANK GATE",
    desc: "Purple energy. Most hunters stop here.",
    ariaLabel: "B-Rank gate — high difficulty",
  },
  {
    rank: "A",
    color: "var(--gate-yellow, #F5A623)",
    bg: "rgba(245, 166, 35, 0.06)",
    border: "rgba(245, 166, 35, 0.25)",
    label: "A-RANK GATE",
    desc: "Gold. The elite enter. Few return unchanged.",
    ariaLabel: "A-Rank gate — very high difficulty",
  },
  {
    rank: "S",
    color: "var(--gate-red, #FF2B2B)",
    bg: "rgba(255, 43, 43, 0.06)",
    border: "rgba(255, 43, 43, 0.45)",
    label: "S-RANK GATE",
    desc: "Crimson. The impossible. You walked in anyway.",
    ariaLabel: "S-Rank gate — maximum difficulty",
  },
];

const Gates = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameAreaRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [framesExist, setFramesExist] = useState<boolean | null>(null); // null = checking
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Probe for frame assets on mount
  useEffect(() => {
    const img = document.createElement("img");
    img.onload = () => setFramesExist(true);
    img.onerror = () => setFramesExist(false);
    img.src = "/images/gate-frames/gate_frame_001.jpg";
  }, []);

  // Entrance animations
  useGSAP(
    () => {
      gsap.from(".gates-header-content", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".rank-card", {
        opacity: 0,
        y: 60,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".gates-rank-strip",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".gates-frame-area", {
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: frameAreaRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameAreaRef.current) return;
    const { left, top, width, height } =
      frameAreaRef.current.getBoundingClientRect();

    const relativeX = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const relativeY = Math.max(0, Math.min(1, (e.clientY - top) / height));

    if (framesExist) {
      // Frame-by-frame mode
      const frameIndex = Math.max(
        1,
        Math.min(TOTAL_FRAMES, Math.floor(relativeX * TOTAL_FRAMES) + 1)
      );
      setCurrentFrame(frameIndex);
    } else {
      // Fallback parallax mode
      const offsetX = (relativeX - 0.5) * 30;
      const offsetY = (relativeY - 0.5) * 15;
      setParallaxOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseLeave = () => {
    setCurrentFrame(1);
    setParallaxOffset({ x: 0, y: 0 });
  };

  const getFrameSrc = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/images/gate-frames/gate_frame_${padded}.jpg`;
  };

  return (
    <section
      id="gates"
      ref={containerRef}
      className="relative min-h-dvh w-screen overflow-hidden"
      style={{ backgroundColor: "var(--abyss, #020208)" }}
    >
      {/* Korean watermark — DUNGEON (던전) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-0 top-1/4 overflow-hidden"
        style={{ maxWidth: "50vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "22vw",
            fontWeight: 900,
            color: "var(--gate-red, #FF2B2B)",
            opacity: 0.04,
            lineHeight: 1,
            display: "block",
            transform: "rotate(15deg) translateX(20%)",
            userSelect: "none",
          }}
        >
          던전
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 py-20 md:py-32 relative z-10">
        {/* Section header */}
        <div className="gates-header-content mb-10 md:mb-14">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--gate-red, #FF2B2B)",
            }}
          >
            THE GATES · E THROUGH S · RED TO BLACK
          </p>
          <AnimatedTitle
            title="Enter the G<b>a</b>te"
            containerClass="text-monarch-text text-left !px-0"
          />
          <p
            className="mt-4 max-w-md font-circular leading-relaxed"
            style={{
              fontSize: "1rem",
              color: "var(--silver, #C0C8D8)",
              opacity: 0.7,
            }}
          >
            Cyan. Yellow. Red. Black. Each gate a new abyss. You treated every
            one of them as an invitation.
          </p>
        </div>

        {/* Frame-by-Frame Gate Area */}
        <div
          ref={frameAreaRef}
          className="gates-frame-area relative w-full overflow-hidden rounded-lg"
          style={{
            height: "clamp(260px, 55vh, 580px)",
            border: "1px solid rgba(255, 43, 43, 0.12)",
            cursor: "crosshair",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Interactive S-rank red gate — move mouse horizontally to explore"
        >
          {/* Loading state */}
          {framesExist === null && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "var(--abyss, #020208)" }}
            >
              <div className="three-body" aria-hidden="true">
                <div className="three-body__dot" />
                <div className="three-body__dot" />
                <div className="three-body__dot" />
              </div>
            </div>
          )}

          {/* Frame sequence mode */}
          {framesExist === true && (
            <div className="absolute inset-0">
              <Image
                src={getFrameSrc(currentFrame)}
                alt={`Red gate — frame ${currentFrame} of ${TOTAL_FRAMES}`}
                fill
                className="object-cover object-center"
                priority={currentFrame <= 2}
                sizes="(max-width: 768px) 100vw, 100vw"
                // TODO: Replace with generated gate frame sequence
              />
            </div>
          )}

          {/* Static fallback with CSS parallax */}
          {framesExist === false && (
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) scale(1.06)`,
                transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {/* TODO: Replace with /images/GATE_FRAME_VID_01.webp when generated */}
              <Image
                src="/images/about-bg.jpeg"
                alt="A dungeon gate — placeholder image"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Crimson gate tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,43,43,0.35) 0%, rgba(109,40,217,0.2) 50%, transparent 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(2,2,8,0.75) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom-left HUD labels */}
          <div className="absolute bottom-5 left-5 z-10">
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--gate-red, #FF2B2B)",
                marginBottom: "0.2rem",
              }}
            >
              THE RED GATE · S-RANK
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(240, 244, 255, 0.35)",
              }}
            >
              ▲ DANGER LEVEL: ABSOLUTE
            </p>
          </div>

          {/* Frame counter — desktop only, frames mode only */}
          {framesExist === true && (
            <div
              className="absolute top-4 right-4 z-10 hidden md:block"
              aria-hidden="true"
            >
              <p
                style={{
                  fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255, 43, 43, 0.45)",
                }}
              >
                {String(currentFrame).padStart(2, "0")}/{TOTAL_FRAMES}
              </p>
            </div>
          )}

          {/* Interaction hint */}
          <div
            className="absolute bottom-12 inset-x-0 flex justify-center pointer-events-none"
            aria-hidden="true"
          >
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(240, 244, 255, 0.2)",
              }}
            >
              MOVE MOUSE TO ENTER
            </p>
          </div>
        </div>

        {/* Rank Card Strip */}
        <div
          className="gates-rank-strip mt-6 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-x-visible"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {GATE_RANKS.map((gate) => (
            <div
              key={gate.rank}
              className="rank-card flex-shrink-0 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                minWidth: "68vw",
                scrollSnapAlign: "start",
                backgroundColor: gate.bg,
                border: `1px solid ${gate.border}`,
              }}
              role="article"
              aria-label={gate.ariaLabel}
            >
              {/* Rank Badge */}
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-xs font-bold"
                  style={{
                    backgroundColor: gate.color,
                    color: "#000",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.7rem",
                  }}
                >
                  {gate.rank}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: gate.color,
                  }}
                >
                  {gate.label}
                </p>
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--silver, #C0C8D8)",
                  lineHeight: 1.5,
                  opacity: 0.65,
                  fontFamily: "var(--font-circular, sans-serif)",
                }}
              >
                {gate.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gates;
```

### Integration in `app/page.tsx`

```typescript
// Add dynamic import at top of page.tsx
const Gates = dynamic(() => import("../components/Gates"), { ssr: false });

// Add in story order between Features and new sections:
<Features />
<Gates />
{/* SPEC 29 RealmTransition goes here */}
<Ranks />
```

## Assets Required

| Asset | Path | Placeholder |
|---|---|---|
| Gate frames 1–40 | `/public/images/gate-frames/gate_frame_001.jpg` → `gate_frame_040.jpg` | `/public/images/about-bg.jpeg` with crimson tint overlay |

Extract 40 frames from `GATE_FRAME_VID_01.mp4` using any video editor, THIS I WILL DO PERSONALLY, SO USE A PLACEHOLDER IN THE MEANTIME!!!.

## Acceptance Criteria
- [ ] `Gates` section renders between `Features` and `Ranks` sections in page story order
- [ ] Frame-by-frame interaction active on desktop — mouse X movement maps to frame index 1–40
- [ ] Graceful fallback renders when gate frames don't exist (static image + CSS parallax)
- [ ] Loading state shows `.three-body` spinner while probing for frames
- [ ] 6 rank cards visible below gate area in a horizontal strip
- [ ] Korean watermark `던전` visible at `opacity: 0.04`, `aria-hidden="true"`, no horizontal overflow
- [ ] HUD labels in Space Mono — `THE RED GATE · S-RANK` and `▲ DANGER LEVEL: ABSOLUTE`
- [ ] Section has `id="gates"` for nav SPEC 11 scroll target
- [ ] All GSAP animations use `useGSAP` with `{ scope: containerRef }`
- [ ] No raw hex values in component — all CSS custom properties via `var(--token)`
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Frame hover interaction disabled on touch devices — `cursor: default`, hint text hidden
- [ ] Fallback parallax `transform` still gives slight depth feel on mobile via CSS
- [ ] Rank cards: `scroll-snap-type: x mandatory`, `min-w-[68vw]` — horizontal scroll with snap
- [ ] Gate frame area height: `clamp(260px, 55vh, 580px)` — never overflows on 375px
- [ ] No horizontal overflow at any viewport width — rank card strip uses `overflow-x-auto`
- [ ] Korean watermark container has `overflow: hidden` — no bleed past viewport
