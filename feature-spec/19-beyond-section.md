# SPEC 19 — Beyond Section (The Absolute Being)

**Branch:** `feat/19-beyond-section`
**Section:** New section (penultimate, before Arise CTA)
**Component:** New `components/Beyond.tsx`

## Goal
Atmospheric, minimal section setting up the final Arise CTA. Focuses on the transcendence narrative.

## Acceptance Criteria
- Section title: `B<b>E</b>YOND` via AnimatedTitle
- Full-screen dark section, deep void bg (`--abyss`)
- Large quote: "There is no rank above Monarch. There was no one above him." — centered, zentry font, large
- Korean accent watermark: `초월` (transcendence) at 0.04 opacity, huge, rotated -20deg
- Subtle particle/glow overlay (pure CSS radial gradients, no canvas)
- Smooth transition from previous section

## Mobile Requirements
- Quote text scales with `clamp(1.5rem, 4vw, 3.5rem)`
- Watermark stays decorative (pointer-events: none, select-none)
- Section min-height: 100dvh
