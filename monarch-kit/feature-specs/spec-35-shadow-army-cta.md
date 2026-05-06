# SPEC 35 — Shadow Army CTA Upgrade

**Branch:** `feat/35-shadow-army-cta`  
**Component:** `components/ShadowArmyCTA.tsx` (NEW) + `components/Contact.tsx` (PRESERVE as-is)

## What
Replace the current `Contact` section's role as the pre-footer CTA with a dedicated new `ShadowArmyCTA` section inserted BEFORE `Contact`. The new section is a full-width cinematic two-column CTA: large display type on the left ("THE SHADOW ARMY RISES.") with a sub-line and CTA button, and a looping shadow army video on the right. The two floating image panels from the current `Contact.tsx` are reimagined with Shadow Extraction imagery. `Contact.tsx` itself remains UNTOUCHED.

## Current State
`Contact.tsx` has:
- Two `ImageClipBox` components using `beru.jpeg` and `system-ui.jpeg` with clip-path shapes
- A sword-man-clip-path image of `footer-bg.jpeg`
- Copy: "Let's build the new era of shadow warfare"
- CTA button: "Awaken Now"

The current Contact is good but is doing double-duty as both a story CTA and a contact section. This spec adds a dedicated army CTA before it so Contact can remain purely as-is.

## Dependencies
- SPEC 16 (Typography) — `system-label`, Space Mono font, `clamp()` display sizing
- SPEC 17 (Color System) — `--shadow-purple`, `--monarch-energy`, `--ice-eye`, `--abyss`, `--silver` tokens
- SPEC 38 (AriseScene) — `ShadowArmyCTA` is placed after `AriseScene` and before `Contact`

## ⚠️ Preservation Rules
- `Contact.tsx` is NOT modified — its existing clip-path images and layout remain 100% intact
- `VideoPlayer` component used for army video
- No raw hex values in new component

## Assets

| Asset | Path | Placeholder | Notes |
|---|---|---|---|
| Army video (Jin-Woo turns to camera) | `/videos/ARMY_VID_01.mp4` | `/videos/shadow-army.mp4` | Jin-Woo facing camera, army behind |
| Left floating image | `/images/EXTRACTION_IMG_01.webp` | `/images/beru.jpeg` | Igris extraction |
| Right floating image | `/images/EXTRACTION_IMG_02.webp` | `/images/system-ui.jpeg` | Beru extraction |

## Implementation

### Component: `components/ShadowArmyCTA.tsx`

```typescript
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import VideoPlayer from "./VideoPlayer";
import Button from "./Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShadowArmyCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Headline words stagger in
      gsap.from(".cta-headline-word", {
        opacity: 0,
        y: 80,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Sub-copy fade in
      gsap.from(".cta-subcopy", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Video panel slides in from right
      gsap.from(videoWrapperRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle parallax on video on scroll
      gsap.to(videoWrapperRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="shadow-army"
      ref={containerRef}
      className="relative w-screen overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "var(--abyss, #020208)" }}
    >
      {/* Background glow — purple on left */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none"
        style={{
          width: "50vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at left center, rgba(109, 40, 217, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Korean watermark — ARISE (일어나라) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "16vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.025,
            lineHeight: 1,
            display: "block",
            transform: "rotate(-5deg)",
            userSelect: "none",
            whiteSpace: "nowrap",
            paddingLeft: "2vw",
          }}
        >
          일어나라
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">

          {/* Left — Display copy */}
          <div className="flex-1 md:max-w-[55%]">
            {/* System label */}
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--shadow-purple, #6D28D9)",
              }}
            >
              SHADOW ARMY · LEGION COMMAND
            </p>

            {/* Headline — split by word for stagger */}
            <div className="overflow-hidden mb-4">
              <h2
                className="special-font"
                style={{
                  fontFamily: "var(--font-zentry, sans-serif)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  className="cta-headline-word block"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    color: "var(--white, #F0F4FF)",
                  }}
                >
                  The Sh<b>a</b>dow
                </span>
                <span
                  className="cta-headline-word block"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    color: "var(--white, #F0F4FF)",
                  }}
                >
                  Arm<b>y</b>
                </span>
                <span
                  className="cta-headline-word block"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    color: "var(--shadow-purple, #6D28D9)",
                  }}
                >
                  Ar<b>i</b>ses.
                </span>
              </h2>
            </div>

            {/* Sub-copy */}
            <div className="cta-subcopy">
              <p
                className="mb-8 max-w-md font-circular leading-relaxed"
                style={{
                  fontSize: "1rem",
                  color: "var(--silver, #C0C8D8)",
                  opacity: 0.7,
                }}
              >
                Command the legion. Conquer every dungeon. Rule every rank. You
                did not climb to the top — you built it from the shadows.
              </p>

              {/* Stats row */}
              <div
                className="flex flex-wrap gap-6 mb-8"
                role="list"
                aria-label="Shadow army statistics"
              >
                {[
                  { value: "∞", label: "Shadow Soldiers" },
                  { value: "S+", label: "Monarch Class" },
                  { value: "0", label: "Hunters Left Standing" },
                ].map((stat) => (
                  <div key={stat.label} role="listitem" className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "var(--font-zentry, sans-serif)",
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        fontWeight: 900,
                        color: "var(--ice-eye, #60A5FA)",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                        fontSize: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--silver, #C0C8D8)",
                        opacity: 0.5,
                        marginTop: "0.25rem",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button — uses existing Button component */}
              <Button
                title="Arise — Join the Shadow Army"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-transparent text-monarch-text flex items-center gap-2 px-8 py-4 text-sm rounded-none border"
                ariaLabel="Join the Shadow Army — Arise now"
                id="shadow-army-cta"
              />
              {/* Custom gradient border override via inline style on wrapper */}
              <style>{`
                #shadow-army-cta {
                  background: linear-gradient(135deg, var(--shadow-purple, #6D28D9), var(--monarch-energy, #2B4FFF)) !important;
                  border: none !important;
                  border-radius: 2px !important;
                  color: var(--white, #F0F4FF) !important;
                }
              `}</style>
            </div>
          </div>

          {/* Right — Video panel */}
          <div
            ref={videoWrapperRef}
            className="flex-1 relative w-full"
            style={{ maxWidth: "45%" }}
          >
            <div
              className="relative overflow-hidden rounded-lg w-full"
              style={{
                height: "clamp(320px, 55vh, 600px)",
                border: "1px solid rgba(109, 40, 217, 0.2)",
              }}
            >
              {/* TODO: Replace with /videos/ARMY_VID_01.mp4 when generated */}
              <VideoPlayer
                src="/videos/shadow-army.mp4"
                className="absolute inset-0 size-full object-cover object-center"
              />
              {/* Cinematic overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(2,2,8,0.3) 0%, transparent 30%, transparent 70%, rgba(2,2,8,0.6) 100%)",
                }}
                aria-hidden="true"
              />
              {/* HUD label on video */}
              <div className="absolute bottom-4 left-4 z-10" aria-hidden="true">
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "rgba(240, 244, 255, 0.4)",
                  }}
                >
                  SHADOW ARMY · FULL FORMATION
                </p>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div
              className="absolute -top-2 -right-2 w-12 h-12 pointer-events-none hidden md:block"
              style={{
                borderTop: "2px solid var(--shadow-purple, #6D28D9)",
                borderRight: "2px solid var(--shadow-purple, #6D28D9)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2 -left-2 w-12 h-12 pointer-events-none hidden md:block"
              style={{
                borderBottom: "2px solid var(--ice-eye, #60A5FA)",
                borderLeft: "2px solid var(--ice-eye, #60A5FA)",
              }}
              aria-hidden="true"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShadowArmyCTA;
```

### Integration in `app/page.tsx`

```typescript
const ShadowArmyCTA = dynamic(
  () => import("../components/ShadowArmyCTA"),
  { ssr: false }
);

// Story order — BEFORE Contact, AFTER AriseScene:
<AriseScene />
<ShadowArmyCTA />
<Contact />
<Footer />
```

## `Contact.tsx` — Preserve As-Is
`Contact.tsx` requires NO modifications. It stays exactly as written in the current codebase. The copy "Let's build the new era of shadow warfare" and "Awaken Now" CTA remain intact. The new `ShadowArmyCTA` section provides the dedicated army CTA that `Contact` was previously doubling for.

## Assets Required

| Asset | Path | Placeholder |
|---|---|---|
| Army video | `/public/videos/ARMY_VID_01.mp4` | `/videos/shadow-army.mp4` |

## Acceptance Criteria
- [ ] `ShadowArmyCTA` section renders after `AriseScene` and before `Contact`
- [ ] `Contact.tsx` is completely unmodified
- [ ] Three-word headline stagger (`THE SHADOW`, `ARMY`, `ARISES.`) with GSAP enter animation
- [ ] Third headline word uses `--shadow-purple` color
- [ ] Three stats row: ∞ Shadow Soldiers, S+ Monarch Class, 0 Hunters Left Standing
- [ ] Stats use `--ice-eye` color for value, Space Mono for label
- [ ] CTA button uses gradient from `--shadow-purple` to `--monarch-energy`
- [ ] Video panel slides in from right on scroll
- [ ] Subtle scroll parallax on video (`y: -30`, `scrub: 1`)
- [ ] `VideoPlayer` component used for army video
- [ ] Section has `id="shadow-army"` for nav scroll target
- [ ] Korean watermark `일어나라` visible at `opacity: 0.025`, `aria-hidden="true"`
- [ ] Corner accent brackets visible on desktop (hidden on mobile)
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Left copy and right video stack vertically on mobile
- [ ] Video panel: full width on mobile, `max-width: 45%` only on `md+`
- [ ] Headline font: `clamp(3rem, 8vw, 7rem)` — never overflows at 375px
- [ ] Stats row wraps gracefully on mobile (`flex-wrap`)
- [ ] Korean watermark parent has `overflow: hidden`
- [ ] Corner accent brackets `hidden md:block` — not rendered on mobile
