# SPEC 17 — The Monarchs Section

**Branch:** `feat/17-monarchs-section`
**Section:** New section (after Ranks)
**Component:** New `components/Monarchs.tsx`

## Goal
Showcase the 9 Monarchs in a grid with hover-activated reveal cards.

## Acceptance Criteria
- Section title: `THE M<b>O</b>NARCHS` via AnimatedTitle
- Sub-label: `RULERS OF ALL SHADOWS` in Space Mono
- 9 monarch cards in a 3x3 grid: Ashborn (Shadow), Antares (Destruction), Legia (Iron Body), Baran (Storm), Querehsha (Plague), Yogumunt (Transfiguration), Tarusk (White Flame), Beast Monarch, Monarch of Frost
- Each card: name, title, color accent, placeholder image
- Hover: card lifts with GSAP tilt (reuse BentoTilt)
- Shadow Monarch (Ashborn) card is larger/featured

## Mobile Requirements
- 2-column grid on mobile (`grid-cols-2`)
- Shadow Monarch card full-width (`col-span-2`) on mobile
- Touch-friendly — no hover-only reveals
