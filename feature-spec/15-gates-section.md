# SPEC 15 — The Gates Section

**Branch:** `feat/15-gates-section`
**Section:** New section between Features and Story
**Component:** New `components/Gates.tsx`

## Goal
Add a cinematic Gates section showcasing dungeon ranks (E through S) as scrolling rank cards.

## Acceptance Criteria
- Section title: `THE G<b>A</b>TES` animated via AnimatedTitle
- Sub-label: `DUNGEON CLASSIFICATION SYSTEM` in Space Mono
- 6 rank cards: E, D, C, B, A, S — each card shows rank letter, color accent, and flavor text
- Rank color map: E=gray, D=green, C=blue, B=blue-bright, A=gold, S=red (#FF2B2B)
- Cards scroll horizontally on mobile, grid on desktop
- S-rank card larger/featured with red glow border
- GSAP ScrollTrigger fade-in stagger on cards

## Mobile Requirements
- Horizontal scroll snap container on mobile
- Cards: `min-w-[80vw]` on mobile so one card fills screen
- Snap scroll for satisfying mobile UX
