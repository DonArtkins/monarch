# Architecture Context — Monarch Upscale

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | `app/` root directory, no `src/` |
| Language | TypeScript 5.9, strict mode | `strict: true` in tsconfig.json |
| Styling | Tailwind CSS v4 + CSS custom properties | All tokens in `globals.css` `:root` |
| Animation | GSAP 3.15, @gsap/react 2.1, ScrollTrigger | Plugins registered at module level |
| Images | Next.js `next/image` | All images use `fill` or explicit dimensions |
| Video | Custom `VideoPlayer` with IntersectionObserver | `preload="metadata"`, lazy play |
| Icons | react-icons 5.6, lucide-react 1.14 | |
| Utilities | clsx 2.1, tailwind-merge 3.5 | `cn()` in `lib/utils.ts` |

## File Structure

```
app/
├── globals.css          ← ALL design tokens live here
├── layout.tsx           ← Font preloads, metadata, body classes
└── page.tsx             ← Section composition in story order

components/
├── NavBar.tsx           ← Floating nav, audio toggle, mobile menu
├── Hero.tsx             ← Video clips, GSAP clip-path scroll
├── About.tsx            ← Portal scroll expansion
├── AnimatedTitle.tsx    ← Scroll-triggered word animation
├── Features.tsx         ← Bento grid with 6 cards
├── Story.tsx            ← Frame hover, clip-path mask
├── Contact.tsx          ← ARISE CTA section
├── Footer.tsx           ← Watermark, social links
├── Button.tsx           ← Reusable CTA button
├── VideoPlayer.tsx      ← IntersectionObserver video
└── RoundedCorners.tsx   ← SVG filter for story blob

[NEW components from upscale]
├── CustomCursor.tsx     ← Ring cursor with trail
├── Preloader.tsx        ← Gate-crack SVG animation
├── Gates.tsx            ← Frame-by-frame hover + rank cards
├── Ranks.tsx            ← Hunter progression timeline
├── ShadowExtraction.tsx ← Story extraction cards
├── Monarchs.tsx         ← The Architect + statues + father
├── Weapons.tsx          ← Weapon showcase with out-of-frame effect
├── ShadowArmy.tsx       ← Full-width army CTA
└── Beyond.tsx           ← Season 2 teaser

public/
├── videos/              ← hero-1.mp4, hero-2.mp4, bento vids, extraction vids
├── images/              ← logo.svg, about-bg.jpeg, kamish.jpeg, etc.
├── audio/               ← bgm.mp3
└── fonts/               ← All .woff2 custom fonts
```

## CSS Custom Properties (Design Tokens)

All tokens are defined in `app/globals.css` `:root`. Components MUST use these variables:

```css
/* Core Palette */
--monarch-void: #030014;      /* page background */
--monarch-abyss: #0a0a1a;     /* nav/card background */
--monarch-surface: #111128;   /* elevated surface */
--monarch-surface-light: #1a1a3e; /* lighter cards */

/* Accent Colors */
--monarch-purple: #7B2FF7;    /* primary CTA, energy */
--monarch-blue: #00D4FF;      /* Jin-Woo's eye, gates */
--monarch-red: #FF1744;       /* S-rank, danger */
--monarch-gold: #FFD700;      /* A-rank, special */

/* Text */
--monarch-text: #E8E8E8;
--monarch-text-dim: #9090B0;
--monarch-text-muted: #606080;
```

## GSAP Architecture

### Plugin Registration
```typescript
// Module level — outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}
```

### Component Pattern
```typescript
const MySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // animations here — auto-scoped to containerRef
    gsap.from(".element", { opacity: 0, y: 50 });
  }, { scope: containerRef });
  
  return <div ref={containerRef}>...</div>;
};
```

### Cleanup Rule
`useGSAP` handles cleanup automatically. For manual contexts:
```typescript
useLayoutEffect(() => {
  const ctx = gsap.context(() => { /* ... */ }, containerRef);
  return () => ctx.revert(); // MANDATORY
}, []);
```

## Component Communication

- No global state manager — components are self-contained.
- Page-level scroll orchestration via `ScrollTrigger.refresh()` after dynamic content loads.
- Audio toggle state lives in `NavBar.tsx` (local useState).
- Preloader completion state: CSS class on `body` + GSAP timeline callback.

## Performance Constraints

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| Lighthouse Mobile | 90+ |

- All bento/section videos use `VideoPlayer` (IntersectionObserver lazy play).
- Hero videos: only 2 total (`hero-1.mp4`, `hero-2.mp4`).
- Images: WebP preferred, `priority` prop on above-fold images.
- `will-change: transform` only during active animation.
- Frame-by-frame gate section: 40 JPG frames, loaded with `rel="preload"` hints.

## Invariants

1. All GSAP animations use `useGSAP()` hook or `gsap.context()` with cleanup.
2. No GSAP in SSR — always guard with `typeof window !== "undefined"`.
3. `VideoPlayer` is used for ALL video elements except the Hero (which has its own logic).
4. New sections added in `app/page.tsx` follow the story arc order.
5. All new components are `"use client"` — this is a client-side animated app.
6. No raw hex colors in components — use CSS variables.
7. `npm run build` must pass zero TypeScript errors before marking any spec done.
8. Mobile-first responsive — no horizontal overflow on any viewport.
9. Space Mono font for all system/HUD labels (add via CSS `@font-face` or CDN).
10. Korean watermark text (`일어나라`, `초월`, `일어서라`) uses `opacity: 0.04` and `pointer-events: none`.
