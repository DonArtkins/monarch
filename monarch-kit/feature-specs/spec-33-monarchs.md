# SPEC 33 — The Monarchs: The Architect, Temple Statues, Father

**Branch:** `feat/33-monarchs`  
**Component:** `components/Monarchs.tsx` (NEW)

## What
A new dark full-viewport section placed AFTER `ShadowExtraction` and BEFORE `Weapons`. Introduces the three supreme entities that define Jin-Woo's ultimate conflict: The Architect (the system's creator), the Nine Temple Statues (divine beast guardians), and Jin-Woo's Father (the original Shadow Monarch). Three portrait panels side-by-side on desktop, vertically stacked on mobile. Each panel has a BentoTilt-style 3D hover effect.

## Current State
No Monarchs section exists. The `BentoTilt` component in `Features.tsx` is the closest reference for the 3D tilt hover behavior. This section uses portrait-ratio panels with image backgrounds instead of video.

## Dependencies
- SPEC 16 (Typography) — `system-label` utility, `korean-watermark` utility
- SPEC 17 (Color System) — `--royal`, `--ice-eye`, `--abyss`, `--shadow-dark`, `--silver`, `--white` tokens
- SPEC 28 (Bento Tilt Upgrade) — enhanced `contextSafe` tilt pattern
- SPEC 32 (Shadow Extraction) — placed directly after

## ⚠️ Preservation Rules
- Do NOT modify `AnimatedTitle` component
- All mouse interactions use `contextSafe` from `useGSAP`
- No raw hex values — CSS custom properties only
- `will-change` set dynamically, never static

## Assets

| Panel | Image Path | Placeholder | Subject |
|---|---|---|---|
| The Architect | `/images/MONARCH_IMG_01.webp` | `/images/system-ui.jpeg` | Creator of the system |
| Temple Statues | `/images/MONARCH_IMG_02.webp` | `/images/about-bg.jpeg` | Nine divine beasts |
| Jin-Woo's Father | `/images/MONARCH_IMG_03.webp` | `/images/footer-bg.jpeg` | Original Shadow Monarch |

## Implementation

### Component: `components/Monarchs.tsx`

```typescript
"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MonarchPanel {
  id: string;
  label: string;
  entityName: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  accentColor: string;
  ariaLabel: string;
}

const MONARCH_PANELS: MonarchPanel[] = [
  {
    id: "architect",
    label: "THE SYSTEM CREATOR · ABSOLUTE BEING",
    entityName: "The Architect",
    title: "He Built the Rules",
    imageSrc: "/images/MONARCH_IMG_01.webp", // TODO: Replace with generated asset
    imageAlt:
      "The Architect — a radiant faceless figure of pure white-gold light, creator of the hunter system",
    description:
      "A being of pure light. No face. No mercy. He designed the system that transformed you — not to save the world, but to serve his own war.",
    accentColor: "var(--monarch-gold, #FFD700)",
    ariaLabel: "The Architect — creator of the hunter system",
  },
  {
    id: "statues",
    label: "NINE DIVINE BEASTS · TEMPLE GUARDIANS",
    entityName: "The Statues",
    title: "They Guard the Throne",
    imageSrc: "/images/MONARCH_IMG_02.webp", // TODO: Replace with generated asset
    imageAlt:
      "Nine colossal divine beast statues in a vast throne room, eyes beginning to glow gold as they awaken",
    description:
      "Nine divine beasts imprisoned in stone for millennia. Their eyes are opening. One by one, they wake. And they are looking at you.",
    accentColor: "var(--gate-yellow, #F5A623)",
    ariaLabel: "Nine Temple Statues — divine beast guardians awakening",
  },
  {
    id: "father",
    label: "ORIGINAL SHADOW MONARCH · THE FALLEN",
    entityName: "Your Father",
    title: "He Fell So You Could Rise",
    imageSrc: "/images/MONARCH_IMG_03.webp", // TODO: Replace with generated asset
    imageAlt:
      "Jin-Woo's father — the previous Shadow Monarch, wearing ancient black armor and a dark crown, eyes glowing deep blue",
    description:
      "He held the title before you. He paid for it with everything. The power you carry — the legacy you inherited — it was built on his sacrifice.",
    accentColor: "var(--ice-eye, #60A5FA)",
    ariaLabel: "Jin-Woo's father — the original Shadow Monarch",
  },
];

interface MonarchPanelComponentProps {
  panel: MonarchPanel;
  index: number;
}

const MonarchPanelComponent = ({
  panel,
  index,
}: MonarchPanelComponentProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: panelRef });

  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });
    xTo.current = gsap.quickTo(panelRef.current, "rotationY", {
      duration: 0.7,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(panelRef.current, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });
  }, { scope: panelRef });

  const handleMouseMove = contextSafe(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!panelRef.current) return;
      const { left, top, width, height } =
        panelRef.current.getBoundingClientRect();
      const relX = (e.clientX - left) / width;
      const relY = (e.clientY - top) / height;
      xTo.current?.((relY - 0.5) * -14);
      yTo.current?.((relX - 0.5) * 14);
    }
  );

  const handleMouseEnter = contextSafe(() => {
    if (!panelRef.current) return;
    panelRef.current.style.willChange = "transform";
    gsap.to(panelRef.current, {
      boxShadow: `0 20px 50px ${panel.accentColor}22, 0 0 0 1px ${panel.accentColor}33`,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!panelRef.current) return;
    xTo.current?.(0);
    yTo.current?.(0);
    gsap.to(panelRef.current, {
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (panelRef.current) panelRef.current.style.willChange = "auto";
      },
    });
  });

  return (
    <div
      ref={panelRef}
      className="monarch-panel relative overflow-hidden rounded-lg flex flex-col"
      style={{
        backgroundColor: "var(--shadow-dark, #0D0F2A)",
        border: `1px solid ${panel.accentColor}1A`,
        animationDelay: `${index * 0.1}s`,
      }}
      role="article"
      aria-label={panel.ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(260px, 40vh, 400px)" }}
      >
        <Image
          src={panel.imageSrc}
          alt={panel.imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading={index === 0 ? "eager" : "lazy"}
        />
        {/* Accent color tint overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, ${panel.accentColor}11 70%, var(--shadow-dark, #0D0F2A) 100%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-6">
        {/* Label */}
        <p
          className="mb-3"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: panel.accentColor,
            opacity: 0.8,
          }}
        >
          {panel.label}
        </p>

        {/* Entity name */}
        <h3
          className="special-font mb-2"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          {panel.entityName}
        </h3>

        {/* Sub-title */}
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            fontWeight: 400,
            textTransform: "uppercase",
            color: panel.accentColor,
            letterSpacing: "0.05em",
            opacity: 0.7,
          }}
        >
          {panel.title}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-circular, sans-serif)",
            fontSize: "0.8125rem",
            color: "var(--silver, #C0C8D8)",
            lineHeight: 1.7,
            opacity: 0.7,
          }}
        >
          {panel.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="mt-auto pt-5"
          aria-hidden="true"
        >
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, ${panel.accentColor}44, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Monarchs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".monarchs-header", {
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

      gsap.from(".monarch-panel", {
        opacity: 0,
        y: 70,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".monarchs-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="monarchs"
      ref={containerRef}
      className="relative min-h-dvh w-screen overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: "var(--abyss, #020208)" }}
    >
      {/* Korean watermark — MONARCH (군주) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden"
        style={{ maxWidth: "60vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "18vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.025,
            lineHeight: 1,
            display: "block",
            transform: "translateX(-5%) translateY(20%) rotate(-8deg)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          군주
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Section header */}
        <div className="monarchs-header mb-12 md:mb-16">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--monarch-gold, #FFD700)",
            }}
          >
            BEYOND THE GATES · SUPREME POWERS
          </p>
          <AnimatedTitle
            title="The M<b>o</b>narchs"
            containerClass="text-monarch-text text-left !px-0"
          />
          <p
            className="mt-4 max-w-lg font-circular leading-relaxed"
            style={{
              fontSize: "1rem",
              color: "var(--silver, #C0C8D8)",
              opacity: 0.65,
            }}
          >
            Seven rulers. Nine divine statues. One Architect. And a father who
            held the title before you. Your story does not end at S-rank.
          </p>
        </div>

        {/* Three panel grid */}
        <div className="monarchs-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {MONARCH_PANELS.map((panel, index) => (
            <MonarchPanelComponent key={panel.id} panel={panel} index={index} />
          ))}
        </div>

        {/* Bottom teaser */}
        <div
          className="mt-12 flex flex-col items-center text-center"
          style={{ opacity: 0.4 }}
        >
          <div
            className="h-px w-20 mb-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--monarch-gold, #FFD700), transparent)",
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(240, 244, 255, 0.5)",
            }}
          >
            MONARCH UNIVERSE · THE CONFLICT BEYOND DUNGEONS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Monarchs;
```

### Integration in `app/page.tsx`

```typescript
const Monarchs = dynamic(() => import("../components/Monarchs"), { ssr: false });

// Story order:
<ShadowExtraction />
<Monarchs />
<Weapons />
```

## Assets Required

| Asset | Path | Placeholder |
|---|---|---|
| Architect | `/public/images/MONARCH_IMG_01.webp` | `/images/system-ui.jpeg` |
| Temple Statues | `/public/images/MONARCH_IMG_02.webp` | `/images/about-bg.jpeg` |
| Father | `/public/images/MONARCH_IMG_03.webp` | `/images/footer-bg.jpeg` |

## Acceptance Criteria
- [ ] `Monarchs` section renders after `ShadowExtraction` and before `Weapons`
- [ ] Three panels: The Architect (gold accent), Temple Statues (amber accent), Father (ice-blue accent)
- [ ] Each panel has correct accent color for label, image gradient, and hover box-shadow
- [ ] 3D tilt on `mousemove` using `gsap.quickTo` for `rotationX` / `rotationY`
- [ ] `contextSafe` used for all mouse event handlers
- [ ] `will-change: transform` set on `mouseenter`, removed on `mouseleave` `onComplete`
- [ ] Box-shadow glow on `mouseenter`, removed on `mouseleave`
- [ ] Panels animate in staggered from bottom on scroll
- [ ] Korean watermark `군주` at `opacity: 0.025`, `aria-hidden="true"`, no overflow
- [ ] Section has `id="monarchs"` for nav scroll target
- [ ] Image placeholders have TODO comments
- [ ] All images have meaningful `alt` text
- [ ] `loading="lazy"` on all images except index 0
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Panels stack vertically (`grid-cols-1`) on mobile
- [ ] Desktop: `md:grid-cols-3` — three panels in a row
- [ ] Tilt effect mouse-events only — no touch interference
- [ ] Image height: `clamp(260px, 40vh, 400px)` — responsive
- [ ] Korean watermark `overflow: hidden` on parent — no horizontal bleed
- [ ] No horizontal overflow at 375px
