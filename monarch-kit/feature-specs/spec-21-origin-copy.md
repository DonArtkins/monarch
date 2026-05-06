# SPEC 21 — Origin Copy Block ("Before The System" Panels)

**Branch:** `feat/21-origin-copy`  
**Component:** `components/About.tsx` (MODIFY — additive)

## What
Add two floating copy panels below the portal clip container in the About/ORIGIN section. These panels appear after the portal expansion completes and tell Jin-Woo's pre-system story in second-person voice. They mirror Zentry's floating text panel layout — each drifts in from opposite sides on scroll.

## Current State
`About.tsx` currently has:
- A top label + AnimatedTitle + about-subtext above the clip container
- The clip container (`#clip`) with the portal image expansion
- No floating story panels below the portal — the section ends after the clip container

## Dependencies
- SPEC 20 (Portal Scroll) must be complete — panels live below the portal in DOM order
- SPEC 16 (Typography) — `system-label` utility for panel labels
- SPEC 17 (Color System) — `--silver`, `--shadow-dark`, `--border` tokens

## Implementation

### Step 1 — Add story panels below the `#clip` div

In `About.tsx`, after the closing `</div>` of the `h-dvh w-screen` clip container div, add:

```tsx
{/* ORIGIN story panels — reveal on scroll after portal */}
<div
  id="origin-panels"
  className="relative z-10 w-screen py-24 px-5 md:px-10"
  style={{ backgroundColor: "var(--deep, #0A0A1A)" }}
>
  <div className="container mx-auto max-w-6xl">
    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-between">

      {/* Panel 1 — Left: The Weakest */}
      <div className="origin-panel origin-panel-left flex-1 max-w-md">
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--monarch-text-muted)",
          }}
        >
          E-RANK · HUNTER ID #4715
        </p>
        <h3
          className="special-font mb-5"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          The <b>W</b>eakest
        </h3>
        <p
          className="font-circular leading-relaxed"
          style={{
            fontSize: "1rem",
            color: "var(--silver, #C0C8D8)",
            maxWidth: "36ch",
          }}
        >
          Every raid, every dungeon — they called you the weakest. 
          Sung Jin-Woo survived on borrowed time, a footnote in a world 
          of gods. The healers healed everyone else first.
        </p>
        <div
          className="mt-6 h-px w-16"
          style={{ backgroundColor: "var(--monarch-text-muted)" }}
          aria-hidden="true"
        />
      </div>

      {/* Panel 2 — Right: The System Chose */}
      <div className="origin-panel origin-panel-right flex-1 max-w-md md:mt-24">
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--gate-red, #FF2B2B)",
          }}
        >
          DOUBLE DUNGEON · INCIDENT ZERO
        </p>
        <h3
          className="special-font mb-5"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.95,
          }}
        >
          The Syst<b>e</b>m <b>C</b>hose
        </h3>
        <p
          className="font-circular leading-relaxed"
          style={{
            fontSize: "1rem",
            color: "var(--silver, #C0C8D8)",
            maxWidth: "36ch",
          }}
        >
          Trapped in the Cartenon Temple. Every hunter dead. 
          The statues wouldn't stop. Then — a message appeared in the air. 
          A quest. Only you could see it.
        </p>
        <div
          className="mt-6 h-px w-16"
          style={{ backgroundColor: "var(--gate-red, #FF2B2B)", opacity: 0.6 }}
          aria-hidden="true"
        />
      </div>

    </div>
  </div>

  {/* Korean watermark — decorative */}
  <div
    aria-hidden="true"
    className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
    style={{ maxWidth: "60vw" }}
  >
    <span
      style={{
        fontFamily: "var(--font-zentry, sans-serif)",
        fontSize: "20vw",
        fontWeight: 900,
        color: "var(--monarch-text)",
        opacity: 0.03,
        lineHeight: 1,
        display: "block",
        transform: "translateX(15%) translateY(30%) rotate(-15deg)",
      }}
    >
      기원
    </span>
  </div>
</div>
```

### Step 2 — Add GSAP scroll-in animation for panels

In the `useGSAP` hook in `About.tsx`, extend the scope to include the new panels. Add a second `useGSAP` call (separate from the clip animation to avoid touching it):

```typescript
// Add a NEW separate useGSAP for panel animations — do NOT modify existing one
useGSAP(
  () => {
    // Left panel slides in from left
    gsap.from(".origin-panel-left", {
      x: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#origin-panels",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Right panel slides in from right with slight delay
    gsap.from(".origin-panel-right", {
      x: 60,
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#origin-panels",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  },
  { scope: "#about" } // Scope to the existing #about wrapper
);
```

### Step 3 — Ensure `#about` wraps both the clip and the new panels

The existing structure in `About.tsx` has `<div id="about" className="min-h-screen w-screen">`. The new `#origin-panels` div is added inside this wrapper — confirm the wrapper has no `overflow: hidden` that would clip the scroll animations. If it does, remove it.

## Assets Required
- None — copy and CSS only

## Placeholder Strategy
- N/A — no asset dependency

## Acceptance Criteria
- [ ] Two floating copy panels visible below the portal clip area
- [ ] Panel 1 has `E-RANK · HUNTER ID #4715` label in monospace
- [ ] Panel 2 has `DOUBLE DUNGEON · INCIDENT ZERO` label in gate-red
- [ ] Both panels slide in from opposite sides on scroll (GSAP ScrollTrigger)
- [ ] Korean watermark `기원` visible at `opacity: 0.03` in the panel section
- [ ] Existing portal clip-path GSAP animation unchanged
- [ ] Copy is second-person voice (you, your, you are)
- [ ] Section background uses `var(--deep)` — not the void black
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Panels stack vertically on mobile (`flex-col`)
- [ ] Panel 2 does NOT have `md:mt-24` offset on mobile — removes the staggered offset
- [ ] Korean watermark clipped with `overflow: hidden` on its container — no horizontal scroll
- [ ] Font sizes remain readable at 375px (clamp floor at `2rem`)
