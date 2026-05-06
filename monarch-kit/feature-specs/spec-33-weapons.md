# SPEC 33 — Weapons of the Shadow Monarch

**Branch:** `feat/33-weapons`  
**Component:** `components/Weapons.tsx` (NEW)

## What
A new section placed AFTER `Monarchs` and BEFORE the existing `Story` section. Showcases Jin-Woo's key weapons in a cinematic layout. Two weapon cards on the left (Kamish's Wrath + Demon King's Longsword) with static image backgrounds, and a full-height Igris portrait on the right — crucially, Igris's sword extends OUTSIDE the card frame boundary, creating the "3D element leaving the frame" Awwwards effect seen on premium sites like Slam Dunk.

## Current State
No Weapons section exists. The "outside-the-frame" overflow effect is new to this project — achieved by allowing an absolutely positioned element to overflow its container via `overflow: visible` + negative margin/transform, while the card itself still clips the background. The `BentoTilt` mouse interaction in `Features.tsx` is the reference for the tilt behavior.

## Dependencies
- SPEC 15 (Typography) — `system-label`, Space Mono font
- SPEC 16 (Color System) — `--monarch-gold`, `--ice-eye`, `--abyss`, `--deep`, `--silver` tokens
- SPEC 32 (Monarchs) — placed directly before

## ⚠️ Preservation Rules
- Do NOT modify existing `Story.tsx` — this section is inserted before it
- `VideoPlayer` used for any video backgrounds
- `contextSafe` pattern for hover interactions
- No raw hex values in component

## Assets

| Asset | Path | Placeholder | Notes |
|---|---|---|---|
| Kamish's Wrath daggers | `/images/WEAPON_IMG_01.webp` | `/images/system-ui.jpeg` | Twin black daggers |
| Demon King's Longsword | `/images/WEAPON_IMG_02.webp` | `/images/kamish.jpeg` | Ice crystal longsword |
| Igris out-of-frame | `/images/ARMY_IMG_01.webp` | `/images/beru.jpeg` | Sword exits frame top |

## Implementation

### Component: `components/Weapons.tsx`

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

interface WeaponCard {
  id: string;
  label: string;
  weaponName: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  accentColor: string;
  stat: string;
}

const WEAPON_CARDS: WeaponCard[] = [
  {
    id: "kamish",
    label: "DUAL DAGGERS · LIGHTNING ATTRIBUTE",
    weaponName: "Kamish's Wrath",
    imageSrc: "/images/WEAPON_IMG_01.webp", // TODO: Replace with generated asset
    imageAlt:
      "Kamish's Wrath — two black obsidian daggers with golden lightning crackling through their blades",
    description:
      "Forged from the fang and claw of the dragon Kamish. Lightning arcs between the twin blades when drawn. The fastest weapons in your arsenal.",
    accentColor: "var(--monarch-gold, #FFD700)",
    stat: "ATTACK SPEED: +300%",
  },
  {
    id: "longsword",
    label: "LONGSWORD · ICE ATTRIBUTE · BARAN'S LEGACY",
    weaponName: "Demon King's Blade",
    imageSrc: "/images/WEAPON_IMG_02.webp", // TODO: Replace with generated asset
    imageAlt:
      "Demon King's Longsword — a massive ice crystal blade with internal blue light fractures and dark iron crossguard",
    description:
      "Claimed from the Ice Elf King's defeat. A two-meter blade of pure crystallized ice that never melts. Its cold is the cold of death.",
    accentColor: "var(--ice-eye, #60A5FA)",
    stat: "RANGE: +180%",
  },
];

interface WeaponCardComponentProps {
  card: WeaponCard;
  index: number;
}

const WeaponCardComponent = ({ card, index }: WeaponCardComponentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    if (!cardRef.current) return;
    cardRef.current.style.willChange = "transform";
    gsap.to(cardRef.current, {
      scale: 1.015,
      boxShadow: `0 16px 40px ${card.accentColor}22, 0 0 0 1px ${card.accentColor}33`,
      duration: 0.35,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (cardRef.current) cardRef.current.style.willChange = "auto";
      },
    });
  });

  return (
    <div
      ref={cardRef}
      className="weapon-card relative overflow-hidden rounded-lg"
      style={{
        backgroundColor: "var(--shadow-dark, #0D0F2A)",
        border: `1px solid ${card.accentColor}1A`,
      }}
      role="article"
      aria-label={`Weapon: ${card.weaponName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(180px, 25vh, 280px)" }}>
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 25vw"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, var(--shadow-dark, #0D0F2A) 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Accent shimmer on image top */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}66, transparent)` }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: card.accentColor,
            opacity: 0.8,
          }}
        >
          {card.label}
        </p>
        <h3
          className="special-font mb-3"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          {card.weaponName}
        </h3>
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-circular, sans-serif)",
            fontSize: "0.8125rem",
            color: "var(--silver, #C0C8D8)",
            lineHeight: 1.6,
            opacity: 0.7,
          }}
        >
          {card.description}
        </p>
        {/* Stat badge */}
        <span
          className="inline-block px-3 py-1 rounded-sm text-[9px] uppercase tracking-widest"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            backgroundColor: `${card.accentColor}11`,
            border: `1px solid ${card.accentColor}33`,
            color: card.accentColor,
          }}
        >
          {card.stat}
        </span>
      </div>
    </div>
  );
};

const Weapons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const igrisSwordRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".weapons-header", {
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

      // Weapon cards stagger in
      gsap.from(".weapon-card", {
        opacity: 0,
        x: -60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".weapons-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Igris panel slides in from right
      gsap.from(".igris-panel", {
        opacity: 0,
        x: 80,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".weapons-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Igris sword subtle float — continuous
      gsap.to(".igris-sword-element", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="weapons"
      ref={containerRef}
      className="relative min-h-dvh w-screen overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: "var(--deep, #0A0A1A)" }}
    >
      {/* Korean watermark — WEAPON (무기) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-0 pointer-events-none select-none overflow-hidden"
        style={{ maxWidth: "50vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "20vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.025,
            lineHeight: 1,
            display: "block",
            transform: "translateX(-15%) rotate(-15deg)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          무기
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Header */}
        <div className="weapons-header mb-12 md:mb-16">
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
            ARMORY · WEAPONS OF THE SHADOW MONARCH
          </p>
          <AnimatedTitle
            title="The <b>W</b>eapons"
            containerClass="text-monarch-text text-left !px-0"
          />
          <p
            className="mt-4 max-w-md font-circular leading-relaxed"
            style={{
              fontSize: "1rem",
              color: "var(--silver, #C0C8D8)",
              opacity: 0.65,
            }}
          >
            Every weapon earned in blood. Every blade a testament to the enemies
            you outlasted.
          </p>
        </div>

        {/* Two-column layout: weapon cards left, Igris right */}
        <div className="weapons-grid grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 items-start">

          {/* Left: two stacked weapon cards */}
          <div className="md:col-span-3 flex flex-col gap-5">
            {WEAPON_CARDS.map((card, index) => (
              <WeaponCardComponent key={card.id} card={card} index={index} />
            ))}
          </div>

          {/* Right: Igris portrait — sword exits frame top */}
          <div
            className="igris-panel md:col-span-2 relative"
            style={{
              // Allow overflow so the sword exits the card boundary
              overflow: "visible",
            }}
          >
            {/* The actual card container — clipped */}
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                height: "clamp(420px, 65vh, 700px)",
                backgroundColor: "var(--abyss, #020208)",
                border: "1px solid rgba(255, 43, 43, 0.15)",
              }}
            >
              {/* Background image */}
              <Image
                src="/images/ARMY_IMG_01.webp" // TODO: Replace with generated asset — Igris with sword exiting frame
                alt="Igris the Shadow Knight General in full armor, his great sword angled so the blade extends beyond the image frame"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
              />
              {/* Gradient from bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(2,2,8,0.9) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Card content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--gate-red, #FF2B2B)",
                    opacity: 0.8,
                  }}
                >
                  SHADOW KNIGHT GENERAL · IGRIS
                </p>
                <h3
                  className="special-font mb-2"
                  style={{
                    fontFamily: "var(--font-zentry, sans-serif)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "var(--white, #F0F4FF)",
                    lineHeight: 0.95,
                  }}
                >
                  Igris
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-circular, sans-serif)",
                    fontSize: "0.8125rem",
                    color: "var(--silver, #C0C8D8)",
                    lineHeight: 1.6,
                    opacity: 0.65,
                  }}
                >
                  His great sword has no name. It does not need one. You know
                  its edge by the silence it leaves behind.
                </p>
              </div>
            </div>

            {/* The sword element — absolutely positioned to exit the frame top */}
            {/* This is the "out-of-frame" 3D depth effect */}
            <div
              ref={igrisSwordRef}
              className="igris-sword-element absolute pointer-events-none hidden md:block"
              style={{
                // Sword exits above the card — negative top value
                top: "-80px",
                right: "20px",
                width: "60px",
                height: "220px",
                transform: "rotate(-25deg)",
                zIndex: 20,
              }}
              aria-hidden="true"
            >
              {/* SVG sword silhouette — placeholder until ARMY_IMG_01 asset has the correct composition */}
              <svg
                viewBox="0 0 60 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
              >
                {/* Blade */}
                <path
                  d="M30 0 L35 180 L30 220 L25 180 Z"
                  fill="url(#swordGrad)"
                  opacity="0.9"
                />
                {/* Edge glow */}
                <path
                  d="M30 0 L32 180"
                  stroke="var(--gate-red, #FF2B2B)"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient id="swordGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--silver, #C0C8D8)" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="var(--shadow-dark, #0D0F2A)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="var(--abyss, #020208)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weapons;
```

### Integration in `app/page.tsx`

```typescript
const Weapons = dynamic(() => import("../components/Weapons"), { ssr: false });

// Story order:
<Monarchs />
<Weapons />
<Story />
```

## Out-of-Frame Effect Notes
The sword-exits-frame technique works as follows:
1. The Igris panel wrapper (`md:col-span-2 relative`) has `overflow: visible`
2. The card itself (`overflow-hidden rounded-lg`) clips the background image and content normally
3. The `.igris-sword-element` is absolutely positioned relative to the panel wrapper — NOT the card — so its negative `top` value lets it sit above the card boundary
4. The continuous `y: -8` GSAP yoyo animation adds subtle life

When `ARMY_IMG_01.webp` is generated with the sword properly angled to exit frame top, the SVG placeholder should be removed and the composition will work naturally through the image itself. The SVG serves as a placeholder indicator.

## Assets Required

| Asset | Path | Placeholder |
|---|---|---|
| Kamish's Wrath | `/public/images/WEAPON_IMG_01.webp` | `/images/system-ui.jpeg` |
| Demon King's Blade | `/public/images/WEAPON_IMG_02.webp` | `/images/kamish.jpeg` |
| Igris out-of-frame | `/public/images/ARMY_IMG_01.webp` | `/images/beru.jpeg` |

## Acceptance Criteria
- [ ] `Weapons` section renders after `Monarchs` and before `Story`
- [ ] Two weapon cards visible: Kamish's Wrath (gold) and Demon King's Blade (ice-blue)
- [ ] Igris portrait card visible with sword SVG extending above the card boundary
- [ ] Igris sword continuously floats with `gsap.to` yoyo animation (`y: -8`, `sine.inOut`)
- [ ] Weapon cards have correct accent colors (gold / ice-blue)
- [ ] Hover on weapon cards: slight scale + box-shadow glow
- [ ] `contextSafe` used for hover handlers
- [ ] `will-change` set dynamically on mouseenter, removed on complete
- [ ] Cards animate in from left on scroll; Igris panel from right
- [ ] Korean watermark `무기` at `opacity: 0.025`, `aria-hidden="true"`, no overflow
- [ ] Section has `id="weapons"`
- [ ] All images have descriptive `alt` text
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Weapon cards stack vertically on mobile (`grid-cols-1`)
- [ ] Igris panel stacks below weapon cards on mobile
- [ ] Igris sword SVG is `hidden md:block` — not rendered on mobile
- [ ] No horizontal overflow at 375px — Korean watermark parent `overflow: hidden`
- [ ] Image heights use `clamp()` — never overflows on any viewport
