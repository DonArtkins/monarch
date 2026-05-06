# SPEC 17 — Color System Expansion + Depth Layer Tokens

**Branch:** `feat/17-color-system`  
**Component:** `app/globals.css` (MODIFY ONLY)

## What
Expand the existing Monarch color system from 6 core accent tokens to a full 13-token depth-layered dark world palette. Add new depth background layers, the ice-eye blue for Jin-Woo's eye/CTAs, gate rank colors, and motion easing tokens. All existing color class references must continue working — this is strictly additive.

## Current State
Existing tokens in `globals.css `:root`:
```css
--monarch-void: #030014
--monarch-abyss: #0a0a1a
--monarch-surface: #111128
--monarch-surface-light: #1a1a3e
--monarch-purple: #7B2FF7
--monarch-purple-dim: #5a1fd4
--monarch-blue: #00D4FF
--monarch-blue-dim: #0099bb
--monarch-red: #FF1744
--monarch-gold: #FFD700
--monarch-text: #E8E8E8
--monarch-text-dim: #9090B0
--monarch-text-muted: #606080
--monarch-border: rgb(255 255 255 / 0.08)
--monarch-border-hover: rgb(255 255 255 / 0.15)
--monarch-glass: rgb(10 10 26 / 0.6)
--monarch-ease: cubic-bezier(0.65, 0.05, 0.36, 1)
--monarch-duration-fast: 0.2s
--monarch-duration-base: 0.3s
--monarch-duration-slow: 0.6s
--monarch-nav-height: 4rem
```

Existing Tailwind color tokens in `@theme`:
```css
--color-monarch-void, --color-monarch-abyss, --color-monarch-surface,
--color-monarch-purple, --color-monarch-blue, --color-monarch-red,
--color-monarch-gold, --color-monarch-text, --color-monarch-text-dim
```

## Dependencies
- SPEC 16 (Typography) recommended before this spec — no hard dependency
- No other components need modification — all changes are in `globals.css` only

## Implementation

### Step 1 — Expand `:root` with new depth tokens

Add the following tokens to the `:root` block in `app/globals.css`, **after** the existing tokens:

```css
:root {
  /* ── EXISTING TOKENS (DO NOT CHANGE) ──────────────────── */
  --monarch-void: #030014;
  --monarch-abyss: #0a0a1a;
  --monarch-surface: #111128;
  --monarch-surface-light: #1a1a3e;
  --monarch-purple: #7B2FF7;
  --monarch-purple-dim: #5a1fd4;
  --monarch-blue: #00D4FF;
  --monarch-blue-dim: #0099bb;
  --monarch-red: #FF1744;
  --monarch-gold: #FFD700;
  --monarch-text: #E8E8E8;
  --monarch-text-dim: #9090B0;
  --monarch-text-muted: #606080;
  --monarch-border: rgb(255 255 255 / 0.08);
  --monarch-border-hover: rgb(255 255 255 / 0.15);
  --monarch-glass: rgb(10 10 26 / 0.6);
  --monarch-ease: cubic-bezier(0.65, 0.05, 0.36, 1);
  --monarch-duration-fast: 0.2s;
  --monarch-duration-base: 0.3s;
  --monarch-duration-slow: 0.6s;
  --monarch-nav-height: 4rem;

  /* ── NEW DEPTH LAYER TOKENS ───────────────────────────── */
  /* True darkness — preloader, absolute black sections */
  --void: #000000;
  /* Darkest page background */
  --abyss: #020208;
  /* Primary section backgrounds */
  --deep: #0A0A1A;
  /* Card backgrounds, overlays */
  --shadow-dark: #0D0F2A;
  /* Accent panels, accent borders */
  --royal: #1E0A4A;

  /* ── NEW ACCENT TOKENS ────────────────────────────────── */
  /* Primary gate/monarch energy blue */
  --monarch-energy: #2B4FFF;
  /* Jin-Woo's eye, cursor, CTAs — ice blue */
  --ice-eye: #60A5FA;
  /* Shadow extraction energy — deep purple */
  --shadow-purple: #6D28D9;
  /* S-rank gate danger red */
  --gate-red: #FF2B2B;
  /* A-rank gate — amber */
  --gate-yellow: #F5A623;
  /* E-rank gate — cyan */
  --gate-cyan: #06B6D4;

  /* ── NEW TEXT TOKENS ──────────────────────────────────── */
  /* Body text — slightly blue-tinted white */
  --silver: #C0C8D8;
  /* Headlines — near white */
  --white: #F0F4FF;
  /* Glass card border */
  --border: rgba(96, 165, 250, 0.15);

  /* ── RANK COLOR TOKENS ────────────────────────────────── */
  --rank-e: #9CA3AF;
  --rank-d: #22C55E;
  --rank-c: #3B82F6;
  --rank-b: #8B5CF6;
  --rank-a: #F59E0B;
  --rank-s: #EF4444;
  --rank-monarch: #60A5FA;

  /* ── MOTION TOKENS ────────────────────────────────────── */
  --ease-monarch: cubic-bezier(0.65, 0.05, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-cinematic: cubic-bezier(0.23, 1, 0.32, 1);
  --duration-fast: 0.2s;
  --duration-base: 0.4s;
  --duration-slow: 0.8s;
  --duration-cinematic: 1.2s;
}
```

### Step 2 — Extend `@theme` with new Tailwind color classes

In the `@theme` block in `globals.css`, add the new tokens so they are available as Tailwind classes like `bg-deep`, `text-ice-eye`, etc.:

```css
@theme {
  /* ── EXISTING @theme entries (DO NOT CHANGE) ──────────── */
  --font-zentry: "zentry", ui-sans-serif, system-ui, sans-serif;
  --font-general: "general", ui-sans-serif, system-ui, sans-serif;
  --font-circular: "circular-web", ui-sans-serif, system-ui, sans-serif;
  --font-robert-medium: "robert-medium", ui-sans-serif, system-ui, sans-serif;
  --font-robert-regular: "robert-regular", ui-sans-serif, system-ui, sans-serif;

  --color-monarch-void: #030014;
  --color-monarch-abyss: #0a0a1a;
  --color-monarch-surface: #111128;
  --color-monarch-purple: #7B2FF7;
  --color-monarch-blue: #00D4FF;
  --color-monarch-red: #FF1744;
  --color-monarch-gold: #FFD700;
  --color-monarch-text: #E8E8E8;
  --color-monarch-text-dim: #9090B0;

  /* Legacy Tailwind mappings (DO NOT CHANGE) */
  --color-primary-50: #E8E8E8;
  --color-primary-75: #0a0a1a;
  --color-primary-100: #E8E8E8;
  --color-primary-200: #030014;
  --color-primary-300: #00D4FF;
  --color-accent: #7B2FF7;
  --color-secondary-100: #5a1fd4;
  --color-secondary-300: #00D4FF;

  /* ── NEW @theme entries ────────────────────────────────── */
  /* Depth layers */
  --color-void: #000000;
  --color-abyss: #020208;
  --color-deep: #0A0A1A;
  --color-shadow-dark: #0D0F2A;
  --color-royal: #1E0A4A;

  /* Accents */
  --color-ice-eye: #60A5FA;
  --color-shadow-purple: #6D28D9;
  --color-gate-red: #FF2B2B;
  --color-gate-yellow: #F5A623;
  --color-gate-cyan: #06B6D4;
  --color-monarch-energy: #2B4FFF;

  /* Text */
  --color-silver: #C0C8D8;
  --color-white-pure: #F0F4FF;

  /* Rank colors */
  --color-rank-e: #9CA3AF;
  --color-rank-d: #22C55E;
  --color-rank-c: #3B82F6;
  --color-rank-b: #8B5CF6;
  --color-rank-a: #F59E0B;
  --color-rank-s: #EF4444;
  --color-rank-monarch: #60A5FA;
}
```

### Step 3 — Add section background utility classes

Add these utilities to `globals.css` for consistent section backgrounds across new components:

```css
@utility section-void {
  background-color: var(--void);
}

@utility section-abyss {
  background-color: var(--abyss);
}

@utility section-deep {
  background-color: var(--deep);
}

@utility section-shadow {
  background-color: var(--shadow-dark);
}
```

### Step 4 — Add card border glow utility

```css
@utility card-border-ice {
  border: 1px solid var(--border);
  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.08) inset;
  transition: border-color var(--duration-base) var(--ease-monarch),
              box-shadow var(--duration-base) var(--ease-monarch);
}

@utility card-border-ice:hover {
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.15) inset,
              0 0 20px rgba(96, 165, 250, 0.08);
}
```

### Step 5 — Add glow utilities for rank colors

```css
@utility glow-s-rank {
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.2), 0 0 60px rgba(239, 68, 68, 0.1);
}

@utility glow-monarch {
  box-shadow: 0 0 30px rgba(96, 165, 250, 0.25), 0 0 60px rgba(96, 165, 250, 0.12);
}

@utility glow-shadow {
  box-shadow: 0 0 30px rgba(109, 40, 217, 0.2), 0 0 60px rgba(109, 40, 217, 0.1);
}
```

## Token Reference Table for New Components

| Need | Token to use | Tailwind class |
|---|---|---|
| Darkest BG (preloader) | `var(--void)` | `bg-void` |
| Page/section BG (dark) | `var(--deep)` | `bg-deep` |
| Card/overlay BG | `var(--shadow-dark)` | `bg-shadow-dark` |
| Accent border/panel | `var(--royal)` | `bg-royal` |
| Jin-Woo's eye / cursor | `var(--ice-eye)` | `text-ice-eye` / `bg-ice-eye` |
| Shadow extraction energy | `var(--shadow-purple)` | `text-shadow-purple` |
| S-rank gate | `var(--gate-red)` | `text-gate-red` |
| A-rank gate | `var(--gate-yellow)` | `text-gate-yellow` |
| E-rank gate | `var(--gate-cyan)` | `text-gate-cyan` |
| Body text | `var(--silver)` | `text-silver` |
| Headlines | `var(--white)` | `text-white-pure` |
| Card glass border | `var(--border)` | N/A (use var directly) |

## Assets Required
- None — CSS variables only

## Placeholder Strategy
- N/A — no assets needed

## Acceptance Criteria
- [ ] All 13 new CSS custom properties defined in `:root`
- [ ] All new tokens available as Tailwind classes in `@theme`
- [ ] All existing component classes (`bg-monarch-void`, `text-monarch-text`, etc.) continue to work unchanged
- [ ] `bg-deep`, `bg-shadow-dark`, `text-ice-eye`, `text-silver` Tailwind classes work in any component
- [ ] Rank color tokens defined and accessible
- [ ] Motion tokens defined (`--ease-cinematic`, `--duration-cinematic`)
- [ ] `npm run build` passes — zero TypeScript errors, zero ESLint errors
- [ ] No visual regressions on existing sections (Hero, About, Features, Story, Contact, Footer)

## Mobile Requirements
- [ ] No visual changes to existing sections — this is additive only
- [ ] New tokens verified in Chrome DevTools computed styles at 375px
