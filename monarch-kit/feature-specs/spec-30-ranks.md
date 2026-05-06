# SPEC 30 — Hunter Ranks: E Through S Visual Progression Cards

**Branch:** `feat/30-ranks`  
**Component:** `components/Ranks.tsx` (NEW)

## What
A new section placed after the `RealmTransition` and before `ShadowExtraction`. Shows the hunter rank progression from E (weakest) to S (Shadow Monarch) through 6 visually distinct cards. Each card is color-coded to its rank's gate color, features an image placeholder, rank badge, a one-line story beat from Jin-Woo's journey at that rank, and a subtle energy glow on hover. Cards animate in staggered from the right on scroll. On mobile, they scroll horizontally with snap.

## Current State
No Ranks section exists. The Features section's `BentoTilt` and `BentoCard` components are the closest architectural reference — this section reuses the tilt pattern but applies it to portrait-ratio rank cards.

## Dependencies
- SPEC 15 (Typography) — `system-label`, Space Mono for rank labels
- SPEC 16 (Color System) — `--rank-e` through `--rank-monarch`, `--shadow-dark`, `--abyss`
- SPEC 27 (Bento tilt upgrade) — the enhanced `boxShadow` tilt pattern is referenced

## Assets

| Card | Image Path | Placeholder |
|---|---|---|
| E-Rank | `/public/images/RANKS_IMG_01.webp` | `/public/images/kamish.jpeg` |
| D-Rank | `/public/images/RANKS_IMG_02.webp` | `/public/images/about-bg.jpeg` |
| C-Rank | `/public/images/RANKS_IMG_03.webp` | `/public/images/beru.jpeg` |
| B-Rank | `/public/images/RANKS_IMG_04.webp` | `/public/images/kamish.jpeg` |
| A-Rank | `/public/images/RANKS_IMG_05.webp` | `/public/images/footer-bg.jpeg` |
| S-Rank | `/public/images/RANKS_IMG_06.webp` | `/public/images/system-ui.jpeg` |

Add `{/* TODO: Replace with /images/RANKS_IMG_0X.webp when generated */}` comments.

## Implementation

### Rank Data

```typescript
interface RankData {
  rank: "E" | "D" | "C" | "B" | "A" | "S";
  title: string;
  color: string;
  glowColor: string;
  bg: string;
  imageSrc: string;
  imageAlt: string;
  storyLine: string;
  systemNote: string;
}

const RANKS: RankData[] = [
  {
    rank: "E",
    title: "THE WEAKEST",
    color: "var(--rank-e, #9CA3AF)",
    glowColor: "rgba(156, 163, 175, 0.15)",
    bg: "var(--shadow-dark, #0D0F2A)",
    imageSrc: "/images/kamish.jpeg", // TODO: Replace with /images/RANKS_IMG_01.webp
    imageAlt: "Sung Jin-Woo as an E-rank hunter, looking uncertain",
    storyLine: "You survive every raid by luck alone. They call you the weakest.",
    systemNote: "HUNTER ID #4715 · CLASS: E",
  },
  {
    rank: "D",
    title: "THE FIRST STEPS",
    color: "var(--rank-d, #22C55E)",
    glowColor: "rgba(34, 197, 94, 0.15)",
    bg: "var(--shadow-dark, #0D0F2A)",
    imageSrc: "/images/about-bg.jpeg", // TODO: Replace with /images/RANKS_IMG_02.webp
    imageAlt: "Sung Jin-Woo as a D-rank hunter, entering his first dungeon",
    storyLine: "The system gave you dailies. You did every one. No one noticed.",
    systemNote: "DAILY QUEST STREAK: 30 DAYS · CLASS: D",
  },
  {
    rank: "C",
    title: "THE CHANGE",
    color: "var(--rank-c, #3B82F6)",
    glowColor: "rgba(59, 130, 246, 0.15)",
    bg: "var(--shadow-dark, #0D0F2A)",
    imageSrc: "/images/beru.jpeg", // TODO: Replace with /images/RANKS_IMG_03.webp
    imageAlt: "Sung Jin-Woo growing in power as a C-rank hunter",
    storyLine: "First shadow extracted. One soldier. One beginning.",
    systemNote: "SHADOW ARMY: 1 SOLDIER · CLASS: C",
  },
  {
    rank: "B",
    title: "THE COMMANDER",
    color: "var(--rank-b, #8B5CF6)",
    glowColor: "rgba(139, 92, 246, 0.15)",
    bg: "var(--shadow-dark, #0D0F2A)",
    imageSrc: "/images/kamish.jpeg", // TODO: Replace with /images/RANKS_IMG_04.webp
    imageAlt: "Sung Jin-Woo commanding his shadow soldiers as a B-rank hunter",
    storyLine: "Your army grows. Other hunters finally look twice.",
    systemNote: "SHADOW ARMY: 12 SOLDIERS · CLASS: B",
  },
  {
    rank: "A",
    title: "THE ELITE",
    color: "var(--gate-yellow, #F5A623)",
    glowColor: "rgba(245, 166, 35, 0.15)",
    bg: "var(--shadow-dark, #0D0F2A)",
    imageSrc: "/images/footer-bg.jpeg", // TODO: Replace with /images/RANKS_IMG_05.webp
    imageAlt: "Sung Jin-Woo in full armor as an A-rank hunter",
    storyLine: "A-rank hunters move aside when you enter a gate.",
    systemNote: "SHADOW ARMY: 47 SOLDIERS · CLASS: A",
  },
  {
    rank: "S",
    title: "SHADOW MONARCH",
    color: "var(--rank-monarch, #60A5FA)",
    glowColor: "rgba(96, 165, 250, 0.25)",
    bg: "var(--abyss, #020208)",
    imageSrc: "/images/system-ui.jpeg", // TODO: Replace with /images/RANKS_IMG_06.webp
    imageAlt: "Sung Jin-Woo as the Shadow Monarch, left eye blazing blue",
    storyLine: "The title no living hunter held. Now it's yours.",
    systemNote: "SHADOW ARMY: ∞ · CLASS: MONARCH",
  },
];
```

### Component: `components/Ranks.tsx`

```typescript
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// RANKS data and RankData interface defined above (paste above component)

const RankCard = ({
  data,
  index,
}: {
  data: RankData;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    if (!cardRef.current) return;
    cardRef.current.style.willChange = "transform, box-shadow";
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: `0 20px 40px ${data.glowColor}, 0 0 0 1px ${data.color}33`,
      duration: 0.35,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (cardRef.current) cardRef.current.style.willChange = "auto";
      },
    });
  });

  const isMonarch = data.rank === "S";

  return (
    <div
      ref={cardRef}
      className="rank-card flex-shrink-0 flex flex-col overflow-hidden rounded-lg transition-all"
      style={{
        minWidth: "72vw",
        scrollSnapAlign: "start",
        backgroundColor: data.bg,
        border: `1px solid ${data.color}22`,
      }}
      role="article"
      aria-label={`${data.rank}-Rank: ${data.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(180px, 30vh, 280px)" }}
      >
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 72vw, 16vw"
          loading={index <= 1 ? "eager" : "lazy"}
        />
        {/* Rank-colored overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${data.bg} 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
        {/* Rank badge — overlaid on image */}
        {isMonarch && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${data.glowColor} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Rank badge + system note */}
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded font-bold"
            style={{
              backgroundColor: data.color,
              color: "#000",
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.875rem",
            }}
            aria-label={`${data.rank} rank`}
          >
            {data.rank}
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: data.color,
              opacity: 0.8,
            }}
          >
            {data.systemNote}
          </p>
        </div>

        {/* Title */}
        <h3
          className="special-font mb-2"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          {data.title}
        </h3>

        {/* Story line */}
        <p
          className="font-circular leading-relaxed"
          style={{
            fontSize: "0.8125rem",
            color: "var(--silver, #C0C8D8)",
            opacity: 0.7,
            marginTop: "auto",
            paddingTop: "0.75rem",
          }}
        >
          {data.storyLine}
        </p>
      </div>
    </div>
  );
};

const Ranks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Section heading reveal
      gsap.from(".ranks-heading", {
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

      // Cards stagger from right
      gsap.from(".rank-card", {
        opacity: 0,
        x: 80,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".ranks-card-strip",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="ranks"
      ref={containerRef}
      className="relative min-h-dvh w-screen overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: "var(--shadow-dark, #0D0F2A)" }}
    >
      {/* Korean watermark — RANK (등급) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 pointer-events-none select-none overflow-hidden"
        style={{ maxWidth: "60vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "20vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.03,
            lineHeight: 1,
            display: "block",
            transform: "translateX(-10%) translateY(-5%) rotate(-10deg)",
            userSelect: "none",
          }}
        >
          등급
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Section header */}
        <div className="ranks-heading mb-12 md:mb-16">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--ice-eye, #60A5FA)",
            }}
          >
            HUNTER CLASSIFICATION · E → SHADOW MONARCH
          </p>
          <AnimatedTitle
            title="The <b>R</b>anks"
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
            Every rank you climbed, they underestimated you. You used that.
          </p>
        </div>

        {/* Rank Cards — horizontal scroll on mobile, grid on desktop */}
        <div
          className="ranks-card-strip flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:gap-5 md:overflow-x-visible"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {RANKS.map((rank, index) => (
            <RankCard key={rank.rank} data={rank} index={index} />
          ))}
        </div>

        {/* S-Rank special callout */}
        <div
          className="mt-10 flex flex-col items-center text-center"
          style={{ opacity: 0.6 }}
        >
          <div
            className="mb-3 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--rank-monarch, #60A5FA), transparent)",
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--rank-monarch, #60A5FA)",
            }}
          >
            ABOVE S-RANK · NATIONAL LEVEL HUNTER · SHADOW MONARCH
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ranks;
```

### Integration in `app/page.tsx`

```typescript
const Ranks = dynamic(() => import("../components/Ranks"), { ssr: false });

// Placement in story order:
<Gates />
<RealmTransition />
<Ranks />
<ShadowExtraction />
```

## Acceptance Criteria
- [ ] `Ranks` section renders after `RealmTransition` and before `ShadowExtraction`
- [ ] All 6 rank cards visible: E, D, C, B, A, S — each with correct rank color
- [ ] Rank badge background color matches the gate rank color for each card
- [ ] Story line copy follows second-person voice ("You…")
- [ ] Cards animate in from the right with stagger on scroll (GSAP ScrollTrigger)
- [ ] Card hover: lifts (`y: -8`) with rank-colored `box-shadow` glow
- [ ] S-rank card uses `--rank-monarch` (`#60A5FA`) ice-eye blue — not red
- [ ] Korean watermark `등급` visible at `opacity: 0.03`, `aria-hidden="true"`, no overflow
- [ ] Section has `id="ranks"` for nav scroll target
- [ ] `RankCard` component uses `contextSafe` for GSAP hover interactions
- [ ] `will-change: transform` set on `mouseenter`, removed `onComplete` of `mouseleave` animation
- [ ] Image placeholders have descriptive `alt` text
- [ ] All `loading="lazy"` on below-fold images (only index 0 and 1 are `eager`)
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Cards: `scroll-snap-type: x mandatory`, `min-w-[72vw]`, `flex-shrink-0` — horizontal scroll
- [ ] Desktop: `md:grid-cols-6` — all 6 cards visible in a single row
- [ ] Card hover interactions: mouse events only — no touch hover state
- [ ] No horizontal overflow at 375px
- [ ] Korean watermark container has `overflow: hidden`
- [ ] Image area height: `clamp(180px, 30vh, 280px)` — adapts to viewport
