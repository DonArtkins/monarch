# SPEC 14 — Bento Card 04: S-Rank Dungeon

**Branch:** `feat/14-bento-dungeon-card`
**Section:** Features (Bento Grid)
**Component:** `components/Features.tsx`

## Goal
Add the S-Rank dungeon card as a wide card in the bento grid.

## Acceptance Criteria
- Label: `S-RANK DUNGEON` — Space Mono, uppercase
- Headline: `DUN<b>G</b>EONS` using bento-title + special-font
- Sub-copy: `Every gate hides a world. Every world wants you dead.`
- Video: `BENTO_VID_04` placeholder = `/videos/legion.mp4`
- Card: 2 cols, 1 row on desktop (wide)
- Gradient overlay for text legibility

## Mobile Requirements
- Full width on mobile
- Fixed height (`h-48 sm:h-64`) so it doesn't collapse
