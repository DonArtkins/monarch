# SPEC 16 — The Ranks Section (Hunter Progression)

**Branch:** `feat/16-ranks-section`
**Section:** New section (after Gates)
**Component:** New `components/Ranks.tsx`

## Goal
Display Jin-Woo's progression from E-rank to Shadow Monarch as a vertical timeline.

## Acceptance Criteria
- Section title: `THE R<b>A</b>NKS` via AnimatedTitle
- Vertical timeline component with 5 milestone nodes
- Each node: rank badge + event title + short story flavor text
- Nodes animate in on scroll (GSAP stagger from left)
- Connecting line draws on scroll (SVG path stroke animation)
- Final node: SHADOW MONARCH — highlighted with monarch-blue glow

## Mobile Requirements
- Timeline collapses to full-width vertical stack
- Node cards full-width on mobile
- Connecting line stays visible and centered
