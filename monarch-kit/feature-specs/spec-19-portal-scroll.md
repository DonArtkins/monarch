# SPEC 19 — Portal Scroll Expansion (Double Dungeon Image)

**Branch:** `feat/19-portal-scroll`  
**Component:** `components/About.tsx` (MODIFY)

## What
The About section's centerpiece clip-path expansion animation is already working and is the most impressive existing scroll effect. This spec upgrades the image inside the portal clip from the current `about-bg.jpeg` to the Double Dungeon corridor image, adds a depth overlay layer, updates the section copy to match the ORIGIN story arc, and adds subtle cinematic polish to the expansion reveal.

## Current State
`components/About.tsx` currently:
- Uses GSAP ScrollTrigger + `pin: true` to expand `.mask-clip-path.about-image` from small to full viewport
- `about-bg.jpeg` is the portal image (Jin-Woo / dungeon image)
- Section heading: `Disc<b>o</b>ver the Shadow <br/> M<b>o</b>narch's Domain`
- Sub-label: `Welcome to the System`
- About subtext: `The weakest hunter became the strongest sovereign` / `Command the shadows, conquer every dungeon`
- Animation: clip-path expands `width: 100vw, height: 100vh, borderRadius: 0` on scroll

## Dependencies
- SPEC 15 (Typography) — `system-label` utility for section label
- SPEC 16 (Color System) — `--deep`, `--ice-eye` tokens for overlay
- SPEC 11 (Nav) — About section uses `id="about"` which matches nav `#about` href

## ⚠️ Preservation Rules
- DO NOT change the GSAP `clipAnimation` timeline logic — it works perfectly
- DO NOT modify the `about-image` utility class dimensions or `about-subtext` positioning
- DO NOT remove or rename the `#about` id or the `#clip` id
- The `mask-clip-path` class must remain on the expanding div

## Implementation

### Step 1 — Update the portal image asset

Replace the `<Image>` inside `.mask-clip-path.about-image`:

```tsx
// Before:
<Image
  src="/images/about-bg.jpeg"
  alt="The Double Dungeon"
  fill
  className="object-cover"
/>

// After:
<Image
  src="/images/about-bg.jpeg"  // TODO: Replace with /images/PORTAL_IMG_01.webp when generated
  alt="The Double Dungeon — the stone corridor where everything changed"
  fill
  className="object-cover object-center"
  priority  // Above fold candidate on slow scroll
/>
```

### Step 2 — Add cinematic overlay inside the portal image div

Add a gradient overlay inside `.mask-clip-path.about-image` after the Image component:

```tsx
<div className="mask-clip-path about-image relative overflow-hidden" style={{ willChange: "width, height, border-radius" }}>
  <Image
    src="/images/about-bg.jpeg"
    alt="The Double Dungeon — the stone corridor where everything changed"
    fill
    className="object-cover object-center"
  />
  {/* Cinematic vignette overlay */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: "radial-gradient(ellipse at center, transparent 30%, rgba(2, 2, 8, 0.7) 100%)",
    }}
    aria-hidden="true"
  />
  {/* Bottom HUD label — reveals as portal expands */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center opacity-0 portal-hud-label pointer-events-none">
    <p
      className="text-[10px] uppercase tracking-[0.3em] text-monarch-text-dim mb-1"
      style={{ fontFamily: "var(--font-mono, monospace)" }}
    >
      CARTENON TEMPLE · DOUBLE DUNGEON
    </p>
    <p
      className="text-[10px] uppercase tracking-[0.2em]"
      style={{ color: "var(--gate-red, #FF2B2B)", fontFamily: "var(--font-mono, monospace)" }}
    >
      ▲ DANGER LEVEL: CATASTROPHIC
    </p>
  </div>
</div>
```

### Step 3 — Animate the HUD label in with the portal expansion

Add to the existing `useGSAP` block in `About.tsx`:

```typescript
useGSAP(
  () => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // ADD: Fade in HUD label as portal fully expands
    clipAnimation.to(
      ".portal-hud-label",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0.7 // Start when expansion is 70% complete
    );
  },
  { dependencies: [], scope: "#about" }
);
```

### Step 4 — Update section copy to ORIGIN story arc

```tsx
// Before:
<h2 className="font-general text-sm uppercase text-monarch-text-dim md:text-[10px]">
  Welcome to the System
</h2>

// After:
<h2
  className="text-monarch-text-dim"
  style={{
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "0.625rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  }}
>
  ORIGIN · CARTENON TEMPLE
</h2>
```

```tsx
// Update AnimatedTitle:
<AnimatedTitle
  title="Bef<b>o</b>re the <br/> Syst<b>e</b>m Woke"
  containerClass="mt-5 text-monarch-text text-center"
/>
```

```tsx
// Update about-subtext:
<div className="about-subtext text-monarch-text-dim">
  <p>Every raid, every dungeon — they called you the weakest.</p>
  <p>Then you died. And came back different.</p>
</div>
```

### Step 5 — Add ambient glow to expanding portal div

In `globals.css`, update the `@utility about-image` to add a box-shadow that appears as it expands (this works because box-shadow transitions with the border-radius):

```css
@utility about-image {
  /* ... existing properties ... */
  box-shadow: 0 0 60px rgba(96, 165, 250, 0.08), 0 0 120px rgba(109, 40, 217, 0.05);
}
```

## Assets Required

| Asset | Placeholder | Final |
|---|---|---|
| Portal image | `/images/about-bg.jpeg` | `/images/PORTAL_IMG_01.webp` |

## Placeholder Strategy
Keep `about-bg.jpeg` as the portal image. Add a code comment:
```tsx
{/* TODO: Replace src with /images/PORTAL_IMG_01.webp when generated via Google Flow */}
```

## Acceptance Criteria
- [ ] Portal clip-path expansion scroll animation fully preserved and working
- [ ] Portal image has vignette overlay
- [ ] HUD label (CARTENON TEMPLE · DOUBLE DUNGEON) fades in during expansion
- [ ] Section label updated to `ORIGIN · CARTENON TEMPLE` in monospace
- [ ] AnimatedTitle copy updated to `Bef<b>o</b>re the <br/> Syst<b>e</b>m Woke`
- [ ] About subtext updated to second-person voice
- [ ] `priority` prop on portal image (above-fold-adjacent)
- [ ] `npm run build` passes
- [ ] No visual regressions on scroll pin behavior

## Mobile Requirements
- [ ] Portal expansion works on touch scroll (existing ScrollTrigger handles this)
- [ ] HUD label text readable at 375px (minimum 10px rendered)
- [ ] About subtext remains centered and within `max-w-sm` / `max-w-md` at mobile
