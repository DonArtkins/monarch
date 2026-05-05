# SPEC 21 — Full Site Mobile Responsiveness Pass

**Branch:** `feat/21-mobile-responsiveness-pass`
**Scope:** All components

## Goal
Final mobile audit pass — ensure every section renders perfectly on 375px–768px viewports.

## Acceptance Criteria
- Hero: videos don't cause horizontal overflow; text doesn't clip
- About: clip-path expand works on touch/scroll
- Features bento: stacks to single column on mobile, no cut-off cards
- Gates: horizontal scroll-snap works
- Ranks: timeline readable on 375px
- Monarchs: 2-col grid, featured card full-width
- Shadow Army: video background fits, no overflow
- Story: clip-path/mask scales correctly
- Contact/ARISE: no horizontal overflow
- Footer: stacks vertically, no overflow
- Nav: mobile menu works correctly
- No horizontal scroll anywhere on site

## Performance Requirements
- All videos: `preload="metadata"` (already done in VideoPlayer)
- Images: all use Next.js `Image` with proper `sizes` prop
- GSAP contexts cleaned up in all components
- `will-change` only on actively animating elements
