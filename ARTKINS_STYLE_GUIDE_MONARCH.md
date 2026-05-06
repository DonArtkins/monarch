# ARTKINS PROGRAMMING STYLE GUIDE — MONARCH EDITION
## Production-Grade Development Standards for the Monarch Upscale Project

**Version**: 1.0.0
**Last Updated**: 2026-05-06
**Scope**: Claude Code, Cursor, Codex, and any LLM-based tools working on Monarch
**Purpose**: Build an Awwwards-level Solo Leveling interactive experience that performs flawlessly, animates cinematically, and never breaks on mobile or under audit.

---

## TABLE OF CONTENTS

1. [Core Principles](#1-core-principles)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Coding Standards](#5-coding-standards)
6. [GSAP Animation Architecture](#6-gsap-animation-architecture)
7. [Performance & Core Web Vitals](#7-performance--core-web-vitals)
8. [Component Preservation Rules](#8-component-preservation-rules)
9. [New Section Integration Protocol](#9-new-section-integration-protocol)
10. [Asset Handling](#10-asset-handling)
11. [Anti-Patterns Reference](#11-anti-patterns-reference)
12. [Code Review Checklist](#12-code-review-checklist)

---

## 1. CORE PRINCIPLES

### 1.1 Minimalism Over Description

Code is self-documenting. Comments explain *why*, never *what*.

```typescript
// ❌ BAD
// This creates a cursor ring that follows the mouse
const ring = document.createElement('div');

// ✅ GOOD
// Ring lags at 0.15 damping so it feels weighted, not robotic
const ring = document.createElement('div');
```

### 1.2 No AI Slope — Critical

**Forbidden in all output:**
- Decorative ASCII art or emoji section dividers in code files
- "Now I'll build the component..." narration
- Marketing-speak comments ("This powerful cursor enables...")
- Explaining what obvious code does
- Celebrating completions in code comments

### 1.3 Preserve Before You Build

Monarch already has 11 working components. The upscale does NOT rebuild them — it extends, wraps, or layers new behavior on top.

**Rule**: If touching an existing component, make the smallest possible change. If a feature can be a new component added alongside an existing one, do that instead of modifying the existing one.

### 1.4 Awwwards-First Decision Making

Every visual and interaction decision should be measured against: *"Would this appear on an Awwwards SOTD showcase?"*

Criteria:
- Does every scroll interaction have purpose and polish?
- Is every transition fluid and cinematically timed?
- Does the site feel like a real film production, not a template?
- Is the story arc (HERO → ARISE) felt as you scroll?
- Does mobile feel intentional, not an afterthought?

---

## 2. TECH STACK

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js App Router | 16.x | Root `app/` — no `src/` |
| Language | TypeScript | 5.9.x | `strict: true` always |
| Styling | Tailwind CSS v4 + CSS custom properties | 4.x | All tokens in `globals.css` `:root` |
| Animation | GSAP | 3.15.x | ScrollTrigger, SplitText |
| Animation Hook | @gsap/react | 2.1.x | `useGSAP()` exclusively |
| Images | `next/image` | — | Always use for all images |
| Video | Custom `VideoPlayer.tsx` | — | IntersectionObserver lazy-play |
| Icons | react-icons + lucide-react | 5.x / 1.x | |
| Utilities | clsx + tailwind-merge | 2.x / 3.x | `cn()` from `lib/utils.ts` |

**Do NOT add new dependencies without explicit approval. Check `package.json` first.**

---

## 3. PROJECT STRUCTURE

```
app/
├── globals.css          ← ALL design tokens as CSS custom properties
├── layout.tsx           ← Font preloads, metadata, body classes only
└── page.tsx             ← Section composition in story order

components/
├── [EXISTING — DO NOT MODIFY WITHOUT EXPLICIT SPEC]
│   ├── NavBar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── AnimatedTitle.tsx
│   ├── Features.tsx
│   ├── Story.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── VideoPlayer.tsx
│   └── RoundedCorners.tsx
│
└── [NEW — Created per spec]
    ├── CustomCursor.tsx        (SPEC 12)
    ├── Preloader.tsx           (SPEC 13)
    ├── FilmGrain.tsx           (SPEC 14)
    ├── Gates.tsx               (SPEC 28)
    ├── Ranks.tsx               (SPEC 30)
    ├── ShadowExtraction.tsx    (SPEC 31)
    ├── Monarchs.tsx            (SPEC 32)
    ├── Weapons.tsx             (SPEC 33)
    ├── ShadowArmyCTA.tsx       (SPEC 34)
    ├── Beyond.tsx              (SPEC 35)
    └── AriseScene.tsx          (SPEC 37)

public/
├── videos/              ← All .mp4 files
├── images/
│   └── gate-frames/     ← gate_frame_001.jpg → gate_frame_040.jpg
├── audio/               ← bgm.mp3
└── fonts/               ← All .woff2 custom fonts

lib/
└── utils.ts             ← cn() helper
```

---

## 4. DESIGN SYSTEM

### 4.1 Color Tokens (Full Set — SPEC 16)

All colors defined as CSS custom properties in `globals.css`. **Zero raw hex values in component files.**

```css
:root {
  /* Base Dark World */
  --void: #000000;          /* True black — preloader only */
  --abyss: #020208;         /* Page background */
  --deep: #0A0A1A;          /* Section backgrounds */
  --shadow: #0D0F2A;        /* Card backgrounds, overlays */
  --royal: #1E0A4A;         /* Accent panels, borders */

  /* Energy Accents */
  --monarch-blue: #2B4FFF;  /* Primary energy, gates */
  --ice-eye: #60A5FA;       /* Jin-Woo's eye, CTAs, cursor */
  --shadow-purple: #6D28D9; /* Secondary energy, extractions */
  --gate-red: #FF2B2B;      /* S-rank red gate */
  --gate-yellow: #F5A623;   /* A-rank gate */
  --gate-cyan: #06B6D4;     /* E-rank gate */

  /* Typography */
  --silver: #C0C8D8;        /* Body text */
  --white: #F0F4FF;         /* Headlines */
  --muted: #6B7280;         /* Captions, labels */
  --border: rgba(96, 165, 250, 0.15); /* Card borders */
}
```

**Tailwind mapping** — extend `@theme` in `globals.css`:

```css
@theme {
  --color-void: #000000;
  --color-abyss: #020208;
  --color-deep: #0A0A1A;
  --color-shadow-dark: #0D0F2A;
  --color-royal: #1E0A4A;
  --color-monarch-blue: #2B4FFF;
  --color-ice-eye: #60A5FA;
  --color-shadow-purple: #6D28D9;
  --color-gate-red: #FF2B2B;
  --color-gate-yellow: #F5A623;
  --color-gate-cyan: #06B6D4;
  --color-silver: #C0C8D8;
  --color-monarch-white: #F0F4FF;
}
```

### 4.2 Typography

| Role | Font | CSS Class | Notes |
|---|---|---|---|
| Display/Hero | Zentry (existing) | `font-zentry` | Headlines only |
| Body | General (existing) | `font-general` | All body copy |
| System/HUD labels | Space Mono | `font-mono` | Nav items, rank badges, system UI |
| Sub-copy | Circular Web (existing) | `font-circular` | Descriptive paragraphs |

**Space Mono** — Add to `app/layout.tsx` via Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### 4.3 Motion Tokens

```css
:root {
  --ease-monarch: cubic-bezier(0.65, 0.05, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 0.2s;
  --duration-base: 0.4s;
  --duration-slow: 0.8s;
  --duration-cinematic: 1.2s;
}
```

---

## 5. CODING STANDARDS

### 5.1 TypeScript Rules

- `strict: true` — non-negotiable
- No `any` without a comment explaining why
- All new components are `"use client"` — this is a client-side animated app
- Use explicit interfaces for all props
- Event handlers typed precisely (`React.MouseEvent<HTMLDivElement>` not `any`)

```typescript
// ✅ GOOD
interface RankCardProps {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  title: string;
  description: string;
  imageSrc: string;
  index: number;
  accentColor: string;
}

// ❌ BAD
const RankCard = (props: any) => { ... }
```

### 5.2 Component File Structure

Every new component follows this exact order:

```typescript
"use client";

// 1. React imports
import { useRef, useState, useEffect } from "react";

// 2. GSAP imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 3. Local component imports
import AnimatedTitle from "./AnimatedTitle";
import VideoPlayer from "./VideoPlayer";

// 4. Plugin registration — MODULE LEVEL, outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5. Types
interface Props { ... }

// 6. Component
const NewComponent = ({ ... }: Props) => {
  // 6a. Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 6b. State
  const [isActive, setIsActive] = useState(false);
  
  // 6c. GSAP
  useGSAP(() => { ... }, { scope: containerRef });
  
  // 6d. Event handlers
  const handleMouseMove = (...) => { ... };
  
  // 6e. Return
  return <section ref={containerRef}>...</section>;
};

export default NewComponent;
```

### 5.3 CSS / Tailwind Rules

- Use CSS custom properties for all design tokens
- Tailwind for layout and spacing
- No inline `style={{ color: "#..." }}` — use `style={{ color: "var(--ice-eye)" }}`
- `@utility` in `globals.css` for reusable compound patterns

---

## 6. GSAP ANIMATION ARCHITECTURE

### 6.1 The Law of useGSAP

**ALWAYS use `useGSAP()` from `@gsap/react`. NEVER use raw `useEffect` for GSAP.** `useGSAP` provides automatic scope-based cleanup. Skipping it causes memory leaks that ruin performance scores.

```typescript
// ✅ CORRECT
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  gsap.from(".card", { opacity: 0, y: 60, stagger: 0.1 });
}, { scope: containerRef });

// ❌ MEMORY LEAK
useEffect(() => {
  gsap.from(".card", { opacity: 0, y: 60 });
}, []);
```

### 6.2 Plugin Registration Rule

Plugins are registered **once, at module level, outside components**:

```typescript
// ✅ Module level — outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ❌ Inside useGSAP
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger); // TOO LATE
});
```

### 6.3 GPU-Only Animation Properties

**Only animate composited properties. Never animate layout-affecting properties.**

```typescript
// ✅ GPU composited — smooth 60fps
gsap.to(".element", { x: 100, y: 50, opacity: 0.5, scale: 0.9, rotation: 5 });

// ❌ Layout thrashing — jank, fails Lighthouse
gsap.to(".element", { width: "50%", height: 300, margin: 20, padding: 10 });
```

### 6.4 will-change Policy

```typescript
// Set ONLY when animation is about to start, remove when done
gsap.to(".sword", {
  x: 200,
  onStart: () => { element.style.willChange = "transform"; },
  onComplete: () => { element.style.willChange = "auto"; },
});
```

### 6.5 ScrollTrigger Patterns

```typescript
// Standard reveal pattern
useGSAP(() => {
  gsap.from(".reveal-item", {
    opacity: 0,
    y: 60,
    stagger: 0.12,
    ease: "power2.out",
    force3D: true,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 75%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
  });
}, { scope: containerRef });

// Scrub/pin pattern
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "+=600",
      scrub: 0.8,
      pin: true,
      pinSpacing: true,
    },
  });
  tl.to(".panel", { x: "-100%" });
}, { scope: containerRef });
```

### 6.6 contextSafe for Event Handlers

When GSAP animations are triggered by mouse events (not scroll), use `contextSafe`:

```typescript
const { contextSafe } = useGSAP({ scope: containerRef });

const handleMouseEnter = contextSafe(() => {
  gsap.to(".target", { scale: 1.05, duration: 0.3 });
});
```

---

## 7. PERFORMANCE & CORE WEB VITALS

### 7.1 Targets

| Metric | Target | Hard Limit |
|---|---|---|
| LCP | < 2.5s | < 3.5s |
| CLS | < 0.05 | < 0.1 |
| FID/INP | < 100ms | < 200ms |
| Lighthouse Mobile | 85+ | 75+ |
| Lighthouse Desktop | 95+ | 90+ |

### 7.2 Video Rules

```typescript
// ✅ CORRECT — lazy-loaded via VideoPlayer component
<VideoPlayer
  src="/videos/shadow-army.mp4"
  className="absolute inset-0 size-full object-cover"
/>

// ✅ Hero videos use their own loading logic (already implemented)
// ❌ NEVER add raw <video> autoplay outside of Hero or VideoPlayer
```

**Mobile video rule**: All videos below Hero are `display: none` on mobile, replaced by poster images via `next/image`.

### 7.3 Image Rules

```typescript
// ✅ Always next/image with explicit dimensions or fill
<Image
  src="/images/rank-s.webp"
  alt="S-Rank Shadow Monarch"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ✅ Above-fold images get priority
<Image src="/images/portal.webp" alt="Double Dungeon" fill priority />
```

### 7.4 Font Preloading

Keep all existing preload tags in `layout.tsx`. Add Space Mono Google Fonts link **after** existing preloads.

---

## 8. COMPONENT PRESERVATION RULES

These components are the foundation. Their APIs must never change without a dedicated SPEC modifying them.

| Component | File | Critical Props/Behavior | Modification Risk |
|---|---|---|---|
| `VideoPlayer` | `components/VideoPlayer.tsx` | `src`, `className`, IntersectionObserver play | HIGH — used by Features, other sections |
| `AnimatedTitle` | `components/AnimatedTitle.tsx` | `title` (HTML string), `containerClass` | HIGH — used by About, Features, Story |
| `Button` | `components/Button.tsx` | `title`, `id`, `rightIcon`, `leftIcon`, `containerClass`, `onClick` | HIGH — used throughout |
| `Hero` | `components/Hero.tsx` | Video clip logic, GSAP clip-path scroll | CRITICAL — do not modify |
| `NavBar` | `components/NavBar.tsx` | Audio toggle refs, scroll behavior | SPEC 11 only |
| `About` | `components/About.tsx` | GSAP clip-path expansion | SPEC 19 only |
| `Features` | `components/Features.tsx` | BentoTilt, BentoCard, VideoPlayer usage | SPECs 21-27 only |

**Rule**: When a SPEC modifies an existing component, the change is additive (new props with defaults) or purely visual (CSS token updates). Logic rewrites require explicit justification in the spec.

---

## 9. NEW SECTION INTEGRATION PROTOCOL

### 9.1 File Creation Checklist

Before writing any new component:
1. `"use client"` at top
2. Correct import order (React → GSAP → Local)
3. Plugin registration at module level
4. `useGSAP` with `{ scope: containerRef }`
5. `containerRef` on the root element

### 9.2 Adding to page.tsx

```typescript
// 1. Add dynamic import at top of page.tsx
const NewSection = dynamic(() => import("../components/NewSection"), { ssr: false });

// 2. Add in story order
export default function Page() {
  return (
    <main id="main-content" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />           {/* ORIGIN */}
      <Features />        {/* THE SYSTEM */}
      {/* NEW SECTIONS IN STORY ORDER */}
      <Gates />           {/* THE GATES — SPEC 28 */}
      <Ranks />           {/* THE RANKS — SPEC 30 */}
      <ShadowExtraction />{/* EXTRACTION — SPEC 31 */}
      <Monarchs />        {/* THE MONARCHS — SPEC 32 */}
      <Weapons />         {/* WEAPONS — SPEC 33 */}
      <Story />
      <AriseScene />      {/* ARISE SCENE — SPEC 37 */}
      <Beyond />          {/* BEYOND — SPEC 35 */}
      <ShadowArmyCTA />   {/* CTA — SPEC 34 */}
      <Contact />         {/* KEEP existing */}
      <Footer />
    </main>
  );
}
```

### 9.3 Section ID Convention

Every new `<section>` must have an `id` matching the nav href target:

```typescript
<section id="gates" className="min-h-dvh w-screen bg-deep">
<section id="ranks" className="min-h-dvh w-screen bg-abyss">
<section id="monarchs" className="min-h-dvh w-screen bg-deep">
```

---

## 10. ASSET HANDLING

### 10.1 Placeholder Strategy

When a generated asset (`/videos/HERO_VID_03.mp4`, etc.) does not yet exist:
1. Use an existing asset from `public/` as a visual placeholder
2. Add a code comment: `{/* TODO: Replace with /videos/HERO_VID_03.mp4 when generated */}`
3. The feature spec is still considered complete — asset generation is a separate workflow

### 10.2 Gate Frame Images

The 40 gate frames for SPEC 28 live at:
```
public/images/gate-frames/gate_frame_001.jpg → gate_frame_040.jpg
```

If frames don't exist, use a single static poster image with a parallax CSS effect as fallback.

### 10.3 Korean Typography

Korean decorative watermarks follow this pattern exactly:

```tsx
<div
  className="absolute pointer-events-none select-none"
  aria-hidden="true"
  style={{
    fontSize: "25vw",
    opacity: 0.04,
    transform: "rotate(-20deg)",
    fontFamily: "var(--font-zentry)",
    fontWeight: 900,
    color: "var(--white)",
    lineHeight: 1,
    userSelect: "none",
  }}
>
  일어나라
</div>
```

---

## 11. ANTI-PATTERNS REFERENCE

### Memory Leaks
```typescript
// ❌ Raw useEffect for GSAP
useEffect(() => {
  gsap.from(".el", { opacity: 0, y: 50 }); // No cleanup = memory leak
}, []);
```

### Layout Thrashing
```typescript
// ❌ Animating layout properties
gsap.to(".el", { width: 500, height: 300, margin: 20 });
```

### Raw Hex in Components
```typescript
// ❌ Hardcoded colors
<div style={{ color: "#60A5FA" }} />

// ✅ Token reference
<div style={{ color: "var(--ice-eye)" }} />
```

### Decorative Animations
```typescript
// ❌ Purposeless decoration — logo spinning forever
gsap.to(".logo", { rotation: 360, repeat: -1, duration: 3 });
```

### Uncleaned will-change
```typescript
// ❌ will-change left on permanently
<div style={{ willChange: "transform" }}> {/* Always on = GPU memory waste */}
```

### Plugin Registration Inside Component
```typescript
// ❌ Too late — causes double-registration warnings
const MyComp = () => {
  gsap.registerPlugin(ScrollTrigger); // WRONG
  useGSAP(() => { ... });
};
```

### Missing alt on Images
```typescript
// ❌ Accessibility failure
<Image src="..." alt="" />

// ✅ Descriptive alt
<Image src="..." alt="Shadow Monarch Jin-Woo wielding Kamish's Wrath" />
```

### Breaking VideoPlayer API
```typescript
// ❌ Adding autoplay directly to a bento section
<video src="..." autoPlay loop muted />

// ✅ Always through VideoPlayer
<VideoPlayer src="..." className="..." />
```

---

## 12. CODE REVIEW CHECKLIST

Before marking any SPEC done:

### TypeScript
- [ ] `strict: true` in `tsconfig.json` — no TypeScript errors
- [ ] No `any` without documented comment
- [ ] All props have explicit interfaces
- [ ] All event handlers are correctly typed

### GSAP
- [ ] All animations use `useGSAP()` hook, not `useEffect`
- [ ] Plugin registered at module level, outside component
- [ ] `{ scope: containerRef }` passed to `useGSAP`
- [ ] Only `transform` / `opacity` properties animated (no layout properties)
- [ ] `will-change` removed after animation completes
- [ ] `force3D: true` on performance-critical animations

### Accessibility
- [ ] All images have descriptive `alt` text
- [ ] All interactive elements have `aria-label`
- [ ] Korean decorative text has `aria-hidden="true"` and `pointer-events: none`
- [ ] Cursor component has `pointer-events: none` on its elements

### Performance
- [ ] All `<video>` elements use `VideoPlayer` component (except Hero)
- [ ] All images use `next/image`
- [ ] Videos hidden on mobile, replaced with poster images
- [ ] `loading="lazy"` on below-fold images
- [ ] No horizontal overflow at any viewport width

### Design
- [ ] No raw hex values in component files
- [ ] All colors reference CSS custom properties
- [ ] Space Mono used for all HUD/system labels
- [ ] Korean watermark text uses correct opacity and `aria-hidden`

### Quality Gate
- [ ] `npm run build` passes — zero TypeScript errors
- [ ] `npm run lint` passes — zero ESLint errors
- [ ] Tested at 375px, 768px, 1280px, 1920px viewports
- [ ] No console errors in browser

---

## ADDENDUM: STORY VOICE

Every line of copy in Monarch speaks directly to the visitor. The visitor IS Sung Jin-Woo. Second person, present tense, cinematic.

**Voice rules:**
- "You" not "Jin-Woo"
- Present tense: "You command" not "He commanded"
- Short, punchy lines. Max two sentences per paragraph
- System UI text (labels, HUD): Cold, clinical, like in-game notifications — ALL CAPS, `Space Mono`
- Narrative copy: Dense, atmospheric, like a novel excerpt

**Examples:**
- ❌ `"Jin-Woo became the Shadow Monarch after defeating the Ant King."`
- ✅ `"You are the Shadow Monarch. Every shadow bends to your will."`

---

*Monarch Style Guide Maintainer: @DonArtkins*  
*Version 1.0.0 — 2026-05-06*  
*Read this before every implementation session. No exceptions.*
