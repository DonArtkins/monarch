# SPEC 16 — Typography System Upgrade

**Branch:** `feat/16-typography-upgrade`  
**Component:** `app/layout.tsx`, `app/globals.css` (MODIFY)

## What
Upgrade Monarch's typography system to a cinematic, punchy display style. Add Space Mono for system/HUD labels, upgrade hero headline sizing to viewport-clamp, and introduce Korean decorative watermark patterns for immersive depth.

## Current State
- Display font: `zentry` — already loaded via `@font-face`, used in `.special-font` and `font-zentry` Tailwind class
- Body font: `general` — loaded
- Supporting: `circular-web`, `robert-medium`, `robert-regular`
- Nav labels: use `font-general` at `text-xs`
- Hero heading: `hero-heading` utility at `3rem → 12rem` via breakpoints (not clamp)
- No Space Mono — system/HUD labels currently use inline `fontFamily: "monospace"` as fallback
- No Korean watermark utility exists

## Dependencies
- SPEC 15 (Film Grain) must be merged first — no direct dependency but staging order preferred
- SPEC 17 (Color System) — Korean watermark uses `--white` and `--monarch-text` tokens already in globals.css

## Implementation

### Step 1 — Add Space Mono via Google Fonts in `app/layout.tsx`

Add the Google Fonts link **after** existing preload tags, inside `<head>`:

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/zentry-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/general.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/circularweb-book.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/videos/hero-1.mp4" as="video" type="video/mp4" />
        {/* ADD THIS LINE — Space Mono for HUD labels */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-monarch-void text-monarch-text antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Step 2 — Extend `@theme` block in `app/globals.css`

Add Space Mono to the `@theme` block:

```css
@theme {
  /* ... existing font tokens ... */
  --font-mono: "Space Mono", ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;
}
```

### Step 3 — Replace `hero-heading` utility with clamp sizing

In `app/globals.css`, replace the existing `@utility hero-heading` block:

```css
@utility hero-heading {
  text-transform: uppercase;
  font-family: "zentry", sans-serif;
  font-weight: 900;
  /* Replaces stepped breakpoints with fluid clamp */
  font-size: clamp(3rem, 10vw, 12rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
}
```

### Step 4 — Add Space Mono system label utility

Add a new `@utility` to `globals.css` for consistent HUD/system label styling:

```css
@utility system-label {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  line-height: 1.6;
}

@utility system-label-lg {
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
```

### Step 5 — Add Korean watermark utility

Add this `@utility` to `globals.css` for the decorative Korean text used across multiple sections:

```css
@utility korean-watermark {
  position: absolute;
  pointer-events: none;
  user-select: none;
  font-family: "zentry", sans-serif;
  font-weight: 900;
  font-size: 25vw;
  line-height: 1;
  color: var(--monarch-text);
  opacity: 0.04;
  text-transform: uppercase;
  white-space: nowrap;
}
```

### Step 6 — Update existing BentoCard `font-mono` inline style

In `components/Features.tsx`, update the label `p` elements to use the new system-label class instead of inline fontFamily:

```typescript
// Before:
<p
  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${labelColor}`}
  style={{ fontFamily: "monospace" }}
>
  {label}
</p>

// After:
<p className={`system-label ${labelColor}`}>
  {label}
</p>
```

Apply same update to all `style={{ fontFamily: "monospace" }}` instances across existing components.

### Step 7 — Update NavBar link styling for Space Mono

In `app/globals.css`, update `@utility nav-hover-btn`:

```css
@utility nav-hover-btn {
  position: relative;
  margin-left: 2.5rem;
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  line-height: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--monarch-text);
  cursor: pointer;
  /* ... keep existing ::after styles ... */
}
```

### Step 8 — Update AnimatedTitle section title sizing

In `app/globals.css`, update `@utility animated-title`:

```css
@utility animated-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: clamp(2.5rem, 6vw, 6rem);
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--monarch-text);
  letter-spacing: -0.01em;

  @media (min-width: 640px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }
}
```

## Korean Watermark Usage Pattern

Any new component (SPEC 29+) that needs a Korean watermark background should use this exact JSX pattern:

```tsx
{/* Korean watermark — decorative only */}
<div
  className="korean-watermark"
  aria-hidden="true"
  style={{
    // Specific position per section — bottom or top, left or right
    bottom: "-5%",
    left: "50%",
    transform: "translateX(-50%) rotate(-20deg)",
  }}
>
  일어나라
</div>
```

Korean text options per section:
- Hero: `일어나라` (ARISE)
- Gates: `던전` (DUNGEON)
- Ranks: `등급` (RANK)
- Monarchs: `군주` (MONARCH)
- Shadow Army CTA: `그림자군대` (SHADOW ARMY)
- Footer: `초월` (TRANSCEND)

## Assets Required
- None — Space Mono loaded via Google Fonts CDN

## Placeholder Strategy
- N/A — pure CSS/font addition, no image or video assets

## Acceptance Criteria
- [ ] Space Mono loads via Google Fonts CDN with no FOUT (font-display: swap via URL param)
- [ ] `--font-mono` token available in Tailwind via `font-mono` class
- [ ] `system-label` and `system-label-lg` utilities usable in all components
- [ ] `korean-watermark` utility available for all new section components
- [ ] Hero heading is fluid `clamp(3rem, 10vw, 12rem)` — not stepped breakpoints
- [ ] AnimatedTitle font size updated to clamp
- [ ] BentoCard labels no longer use `style={{ fontFamily: "monospace" }}` inline
- [ ] Nav items display in Space Mono
- [ ] No TypeScript errors — `npm run build` passes
- [ ] Space Mono visible in rendered nav labels at `letter-spacing: 0.15em`

## Mobile Requirements
- [ ] Korean watermarks have `overflow: hidden` on their parent containers — no horizontal scroll
- [ ] At 375px, hero clamp resolves to `3rem` — does not overflow
- [ ] Space Mono labels remain readable at all viewport widths (minimum `0.625rem` × 1.5 = 9.375pt equivalent)
