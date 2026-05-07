# UI Context — Monarch Design System

## Theme Philosophy

Monarch uses a **dark void aesthetic** inspired by Solo Leveling's dungeon world. The UI should feel like a premium game cinematic — dense, purposeful, atmospheric. Every color, font, and animation is intentional.

The visual language alternates between two realms:
1. **Dark Void** — `#030014` background, neon accents, shadow energy. Used for "The System" and "Shadow Army" sections.
2. **Light Realm** — `#F0F4FF` (Ice White) background, dark typography, cyan/purple accents. Used for "Hero", "Origin", "Contact", and "Ranks".

### Thematic Rhythm:
- **Hero → Portal Scroll (Origin)**: LIGHT
- **Features (Bento)**: DARK
- **Gates → Ranks**: LIGHT
- **Story (Shadow Extraction)**: DARK
- **Contact**: LIGHT
- **Footer**: DARK

## Color System

All colors defined as CSS custom properties in `globals.css`. Never hardcode hex in components.

### Primary Palette (Dark Void)
```css
--monarch-void: #030014;        /* true darkness, page bg */
--monarch-abyss: #0a0a1a;       /* nav bg, floating cards */
--monarch-surface: #111128;     /* elevated surfaces */
--monarch-surface-light: #1a1a3e; /* hover state surfaces */
```

### Light Realm Palette
```css
--monarch-ice-white: #F0F4FF;   /* page bg for light sections */
--monarch-ice-bg: #E0E8FF;      /* card bg for light sections */
--monarch-ice-text: #030014;    /* primary text in light sections */
--monarch-ice-text-dim: #404060;/* secondary labels in light sections */
--monarch-ice-border: rgba(3, 0, 20, 0.08);
```

### Accent Colors
```css
--monarch-purple: #7B2FF7;      /* PRIMARY — buttons, CTAs, purple energy */
--monarch-purple-dim: #5a1fd4;  /* hover state of purple */
--monarch-blue: #00D4FF;        /* Jin-Woo's eye, gate cyan, ice */
--monarch-blue-dim: #0099bb;    /* hover/dim state */
--monarch-red: #FF1744;         /* S-rank gate, danger, blood */
--monarch-gold: #FFD700;        /* A-rank, Monarch crown, highlight */
```

### Text
```css
--monarch-text: #E8E8E8;        /* primary body text */
--monarch-text-dim: #9090B0;    /* secondary labels */
--monarch-text-muted: #606080;  /* placeholders, captions */
```

### Borders & Glass
```css
--monarch-border: rgb(255 255 255 / 0.08);      /* default card border */
--monarch-border-hover: rgb(255 255 255 / 0.15); /* hover border */
--monarch-glass: rgb(10 10 26 / 0.6);            /* glass overlay */
```

### Rank Color Map
| Rank | Color | Hex |
|---|---|---|
| E | Gray | `#9CA3AF` |
| D | Green | `#22C55E` |
| C | Blue | `#3B82F6` |
| B | Purple | `#8B5CF6` |
| A | Gold | `#F59E0B` |
| S | Red + glow | `#FF1744` |
| Shadow Monarch | Ice Blue | `#00D4FF` |

## Typography

### Font Families
```css
/* Display — headlines, hero text */
font-family: "zentry", sans-serif;    /* compressed, cinematic */

/* Body — readability */
font-family: "general", sans-serif;   /* clean, readable */

/* Web/circular — sub-copy */
font-family: "circular-web", sans-serif;

/* Robert variants — decorative copy */
font-family: "robert-medium", sans-serif;
font-family: "robert-regular", sans-serif;

/* HUD/System labels — NEW for upscale */
font-family: "Space Mono", monospace; /* all rank labels, system UI */
```

### Type Scale
| Role | Size | Weight | Font |
|---|---|---|---|
| Hero headline | `clamp(80px, 15vw, 180px)` | 900 | zentry |
| Section title | `clamp(40px, 7vw, 96px)` | 900 | zentry |
| Bento title | `3.75rem` md | 900 | zentry |
| Body copy | `1rem` | 400 | general/circular |
| HUD label | `0.625rem` uppercase | 400 | Space Mono |
| Rank badge | `0.75rem` uppercase | 500 | Space Mono |

### Space Mono Usage
Space Mono is used exclusively for:
- Nav items
- Rank labels (`E-RANK · HUNTER ID #4715`)
- Bento card labels (`THE SYSTEM`)
- HUD overlays
- Footer strip (`일어나라 · ARISE · MONARCH · 2026`)

Add via CDN in `app/layout.tsx`:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

## Animation Language

### Easing Vocabulary
```css
--monarch-ease: cubic-bezier(0.65, 0.05, 0.36, 1);  /* default */
--monarch-ease-out: power2.out;                       /* exits */
--monarch-ease-spring: back.out(1.7);                 /* bouncy enters */
```

### Timing
```css
--monarch-duration-fast: 0.2s;   /* micro-interactions */
--monarch-duration-base: 0.3s;   /* standard transitions */
--monarch-duration-slow: 0.6s;   /* major reveals */
```

### Core Animation Patterns

**Word reveal (AnimatedTitle):**
- Words split and animate from `translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)` to identity.
- Stagger: `0.02s` per word.

**Section entrance:**
- Fade + translateY(50px) → identity, `power2.out`, triggered by ScrollTrigger.

**Cursor ring:**
- 20px ring follows mouse with 6 ghost trails at 50ms intervals.
- Expands to 40px on button hover.

**Bento tilt:**
- `rotationY` and `rotationX` max `±8deg` on mousemove.
- `transformPerspective: 1200`, `power2.out` easing.

**Frame hover:**
- Mouse X maps to `frameIndex = Math.floor((mouseX / width) * 40)`.
- 40 JPG frames preloaded.

## Layout Patterns

### Section Structure
Every section uses this pattern:
```jsx
<section id="section-name" className="min-h-dvh w-screen bg-monarch-void">
  <div className="container mx-auto px-5 md:px-10">
    {/* Sub-label in Space Mono */}
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-monarch-blue">
      LABEL · SUBLABEL
    </p>
    {/* AnimatedTitle for main headline */}
    <AnimatedTitle title="..." containerClass="mt-5 text-monarch-text" />
    {/* Content */}
  </div>
</section>
```

### Korean Watermark Pattern
```jsx
<div className="absolute pointer-events-none select-none opacity-[0.04] -rotate-20">
  <h1 className="special-font text-[25vw] font-black uppercase leading-none text-monarch-text">
    일어나라
  </h1>
</div>
```

### Bento Grid
- Desktop: CSS Grid, mixed span classes
- Mobile: single column stack
- Cards: `border-hsla`, `rounded-md`, `overflow-hidden`
- Video: `VideoPlayer` absolutely positioned `size-full object-cover`

## Component Interaction Rules

- Buttons use hover states with `::after` underline or scale transform.
- Nav items have `::after` underline via `nav-hover-btn` utility.
- Bento cards have glass shimmer border on tilt.
- S-rank elements have `box-shadow: 0 0 30px rgba(255, 0, 255, 0.2)` glow.
- All interactive elements: minimum 44×44px touch target.
- Focus rings: `outline: 2px solid var(--monarch-blue); outline-offset: 3px`.

## Accessibility

- `skip-to-content` link at top of page.
- All `<video>` elements: `muted` + `playsInline`.
- All images: meaningful `alt` text.
- Audio toggle: `aria-label`, `aria-pressed`.
- Mobile menu: `aria-expanded`, `aria-label`.
- Preloader: `aria-hidden="true"` — decorative only.
- Rank cards: proper heading hierarchy.

## Mobile Responsive Rules

- No horizontal scroll (`overflow-x: hidden` on body).
- Videos replaced with poster images on `max-width: 768px` where possible.
- Frame-by-frame gate: replaced with static image + CSS parallax on mobile.
- Rank cards: horizontal scroll-snap on mobile, `min-w-[80vw]`.
- Bento grid: single column on mobile.
- Hero text: `clamp()` sizing, never overflows.
