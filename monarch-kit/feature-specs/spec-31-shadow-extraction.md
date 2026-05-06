# SPEC 31 — Shadow Extraction Story Cards

**Branch:** `feat/31-shadow-extraction`  
**Component:** `components/ShadowExtraction.tsx` (NEW)

## What
A new full-viewport dark section placed AFTER `Ranks` and BEFORE `Monarchs` in the story arc. Showcases four pivotal shadow extraction moments — the battles where Jin-Woo claimed his most powerful soldiers. Each card uses a video background, a character name badge, an extraction rank indicator, and a one-line story note. On hover, shadow extraction energy animates upward from the card bottom.

## Current State
No ShadowExtraction section exists. The `BentoCard` component in `Features.tsx` is the closest architectural reference — video background, label, title, description. This section uses a different layout: full-height cards in a 2×2 grid on desktop, vertical stack on mobile. Mouse hover energy effect is new to the project.

## Dependencies
- SPEC 15 (Typography) — `system-label` utility, Space Mono font
- SPEC 16 (Color System) — `--gate-red`, `--shadow-purple`, `--ice-eye`, `--abyss`, `--silver`, `--deep` tokens
- SPEC 30 (Ranks) — placed directly after Ranks in DOM order
- SPEC 32 (Monarchs) — placed directly before Monarchs in DOM order

## ⚠️ Preservation Rules
- Do NOT modify `VideoPlayer` component API
- Do NOT modify `AnimatedTitle` component API
- All GSAP animations use `useGSAP` with `{ scope: containerRef }`
- Mouse hover energy effect uses `contextSafe` pattern from `Story.tsx`
- No raw hex values — use CSS custom properties only

## Assets

| Card | Video Path | Placeholder | Character |
|---|---|---|---|
| Igris | `/videos/EXTRACTION_VID_01.mp4` | `/videos/shadow-army.mp4` | Shadow Knight General |
| Beru | `/videos/EXTRACTION_VID_02.mp4` | `/videos/legion.mp4` | The Ant King |
| Baran | `/videos/EXTRACTION_VID_03.mp4` | `/videos/story-arise.mp4` | Ice Elf King (Reimagined) |
| Dragon | `/videos/EXTRACTION_VID_04.mp4` | `/videos/father.mp4` | Shadow Dragon |

## Implementation

### Component: `components/ShadowExtraction.tsx`

```typescript
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import VideoPlayer from "./VideoPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExtractionCard {
  id: string;
  videoSrc: string;
  label: string;
  characterName: string;
  title: string;
  rankBadge: string;
  rankColor: string;
  storyNote: string;
  ariaLabel: string;
}

const EXTRACTION_CARDS: ExtractionCard[] = [
  {
    id: "igris",
    videoSrc: "/videos/EXTRACTION_VID_01.mp4", // TODO: Replace with generated asset
    label: "SHADOW KNIGHT GENERAL · FIRST EXTRACTED",
    characterName: "Igris",
    title: "The Red Knight Kneels",
    rankBadge: "S-RANK",
    rankColor: "var(--gate-red, #FF2B2B)",
    storyNote:
      "He refused every hunter who faced him. Then you made him rise from his own defeat. First extracted. Most loyal.",
    ariaLabel: "Igris shadow extraction — the first and most loyal shadow soldier",
  },
  {
    id: "beru",
    videoSrc: "/videos/EXTRACTION_VID_02.mp4", // TODO: Replace with generated asset
    label: "THE ANT KING · JEJU ISLAND RAID",
    characterName: "Beru",
    title: "The Ant King Submits",
    rankBadge: "S-RANK",
    rankColor: "var(--gate-red, #FF2B2B)",
    storyNote:
      "The most powerful creature on Jeju Island. Feared by every S-rank hunter alive. He called you 'My King' before the smoke cleared.",
    ariaLabel: "Beru shadow extraction — the Ant King pledges loyalty",
  },
  {
    id: "baran",
    videoSrc: "/videos/EXTRACTION_VID_03.mp4", // TODO: Replace with generated asset
    label: "ICE ELF KING · REIMAGINED",
    characterName: "Baran",
    title: "The Extraction That Rewrote Fate",
    rankBadge: "MONARCH",
    rankColor: "var(--ice-eye, #60A5FA)",
    storyNote:
      "In this universe, the extraction did not fail. Baran arose. Dark ice where white frost once lived. The moment history changed.",
    ariaLabel: "Baran shadow extraction — the reimagined success that rewrote fate",
  },
  {
    id: "dragon",
    videoSrc: "/videos/EXTRACTION_VID_04.mp4", // TODO: Replace with generated asset
    label: "SHADOW DRAGON · ANCIENT BONES",
    characterName: "The Dragon",
    title: "Wings of Shadow Rise",
    rankBadge: "BEYOND S",
    rankColor: "var(--shadow-purple, #6D28D9)",
    storyNote:
      "From the bones of a dragon dead ten thousand years, you raised a shadow that darkened the entire dungeon sky.",
    ariaLabel: "Shadow dragon extraction — ancient bones rise as the ultimate shadow soldier",
  },
];

interface ExtractionCardComponentProps {
  card: ExtractionCard;
  index: number;
}

const ExtractionCardComponent = ({
  card,
  index,
}: ExtractionCardComponentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    if (!energyRef.current || !cardRef.current) return;
    cardRef.current.style.willChange = "transform";
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(energyRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!energyRef.current || !cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        if (cardRef.current) cardRef.current.style.willChange = "auto";
      },
    });
    gsap.to(energyRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: "power2.in",
    });
  });

  return (
    <div
      ref={cardRef}
      className="extraction-card relative overflow-hidden rounded-lg cursor-pointer"
      style={{
        border: `1px solid ${card.rankColor}22`,
        backgroundColor: "var(--abyss, #020208)",
      }}
      role="article"
      aria-label={card.ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={card.videoSrc}
          className="size-full object-cover object-center"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(2,2,8,0.95) 0%, rgba(2,2,8,0.5) 50%, rgba(2,2,8,0.2) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Shadow extraction energy effect — animates on hover */}
      <div
        ref={energyRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          transform: "translateY(40px)",
          background: `radial-gradient(ellipse at 50% 100%, ${card.rankColor}33 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Card number */}
      <div className="absolute top-4 left-4 z-10" aria-hidden="true">
        <span
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            color: "rgba(240, 244, 255, 0.3)",
          }}
        >
          {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>

      {/* Rank badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="px-2 py-1 rounded text-[10px] font-bold uppercase"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            backgroundColor: `${card.rankColor}22`,
            border: `1px solid ${card.rankColor}44`,
            color: card.rankColor,
            letterSpacing: "0.1em",
          }}
        >
          {card.rankBadge}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: card.rankColor,
          }}
        >
          {card.label}
        </p>

        <h3
          className="special-font mb-3"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          {card.characterName}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-circular, sans-serif)",
            fontSize: "0.8125rem",
            color: "var(--silver, #C0C8D8)",
            lineHeight: 1.6,
            opacity: 0.75,
            maxWidth: "38ch",
          }}
        >
          {card.storyNote}
        </p>

        {/* Bottom energy line */}
        <div
          className="mt-4 h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${card.rankColor}66, transparent)`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

const ShadowExtraction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Section header reveal
      gsap.from(".extraction-header", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger in from bottom
      gsap.from(".extraction-card", {
        opacity: 0,
        y: 80,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".extraction-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="shadow-extraction"
      ref={containerRef}
      className="relative min-h-dvh w-screen overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: "var(--deep, #0A0A1A)" }}
    >
      {/* Korean watermark — SHADOW (그림자) */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 pointer-events-none select-none overflow-hidden flex items-center"
        style={{ maxWidth: "55vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "22vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.03,
            lineHeight: 1,
            display: "block",
            transform: "rotate(10deg) translateX(15%)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          그림자
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Section header */}
        <div className="extraction-header mb-12 md:mb-16">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--shadow-purple, #6D28D9)",
            }}
          >
            SHADOW EXTRACTION · THE SOLDIERS WHO AROSE
          </p>
          <AnimatedTitle
            title="Ar<b>i</b>se from <br /> Defeat"
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
            You did not just defeat them. You gave them a second life — as
            shadows bound to your will. Each extraction, a new chapter in your
            legend.
          </p>
        </div>

        {/* 2×2 grid on desktop, stacked on mobile */}
        <div
          className="extraction-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          style={{ minHeight: "600px" }}
        >
          {EXTRACTION_CARDS.map((card, index) => (
            <div
              key={card.id}
              style={{
                height: "clamp(320px, 45vh, 520px)",
              }}
            >
              <ExtractionCardComponent card={card} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 flex flex-col items-center text-center">
          <div
            className="h-px w-32 mb-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--shadow-purple, #6D28D9), transparent)",
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(240, 244, 255, 0.3)",
            }}
          >
            SHADOW ARMY COUNT: BEYOND CALCULATION
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShadowExtraction;
```

### Integration in `app/page.tsx`

```typescript
const ShadowExtraction = dynamic(
  () => import("../components/ShadowExtraction"),
  { ssr: false }
);

// Story order placement:
<Ranks />
<ShadowExtraction />
<Monarchs />
```

## Assets Required

| Asset | Path | Placeholder Used |
|---|---|---|
| Igris extraction | `/public/videos/EXTRACTION_VID_01.mp4` | `/videos/shadow-army.mp4` |
| Beru extraction | `/public/videos/EXTRACTION_VID_02.mp4` | `/videos/legion.mp4` |
| Baran extraction | `/public/videos/EXTRACTION_VID_03.mp4` | `/videos/story-arise.mp4` |
| Dragon extraction | `/public/videos/EXTRACTION_VID_04.mp4` | `/videos/father.mp4` |

## Acceptance Criteria
- [ ] `ShadowExtraction` section renders after `Ranks` and before `Monarchs`
- [ ] All 4 extraction cards visible: Igris, Beru, Baran, Dragon — each with correct rank color
- [ ] Video backgrounds play via `VideoPlayer` component (IntersectionObserver lazy-play)
- [ ] Hover: card scales to `1.02` with shadow extraction energy radial gradient rising from bottom
- [ ] `contextSafe` used for all mouse event handlers
- [ ] `will-change: transform` set on `mouseenter`, removed on `mouseleave` animation `onComplete`
- [ ] Cards animate in staggered from bottom on scroll (GSAP ScrollTrigger)
- [ ] Korean watermark `그림자` visible at `opacity: 0.03`, `aria-hidden="true"`, no overflow
- [ ] Section has `id="shadow-extraction"` 
- [ ] All video placeholders have TODO comments
- [ ] All GSAP animations use `useGSAP` with `{ scope: containerRef }`
- [ ] No raw hex values — all CSS custom properties
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Cards stack vertically (`grid-cols-1`) on mobile
- [ ] Desktop: `sm:grid-cols-2` 2×2 grid
- [ ] Card height: `clamp(320px, 45vh, 520px)` — adapts to viewport
- [ ] Hover effects: mouse events only — no touch hover states that interfere with scroll
- [ ] Korean watermark container has `overflow: hidden` — no horizontal bleed
- [ ] No horizontal overflow at 375px
