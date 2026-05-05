# SPEC 11 — Bento Card 01: THE SYSTEM

**Branch:** `feat/11-bento-system-card`
**Section:** Features (Bento Grid)
**Component:** `components/Features.tsx`

## Goal
Revamp the first large bento card (full-width hero card) to be THE SYSTEM card with correct Solo Leveling copy, Space Mono label, and proper responsive layout.

## Acceptance Criteria
- Label: `THE SYSTEM` in Space Mono / monospace, uppercase, small, letter-spacing 0.2em
- Headline: `THE SYSTEM` using bento-title + special-font (zentry)
- Sub-copy: `Daily quests. Stat allocation. Skill extraction. The system that broke the rules of this world.`
- Video: `BENTO_VID_01` placeholder = `/videos/father.mp4` (system UI feel)
- Card: Full width, `md:h-[65vh]` on desktop, `h-72 sm:h-[50vh]` on mobile
- Gradient overlay on bottom third for text legibility
- No layout or GSAP tilt changes

## Mobile Requirements
- Card height reduces gracefully on small screens (aspect-ratio approach)
- Text does not overflow card bounds
- Label + title + sub-copy stack cleanly
