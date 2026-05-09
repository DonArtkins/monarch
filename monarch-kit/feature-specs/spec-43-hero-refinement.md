# SPEC 43 — Hero Section Refinement

**Branch:** `feat/43-hero-refinement`
**Component:** `components/Hero.tsx`, `app/globals.css` (co-located Hero styles)
**Dependencies:** None (layers on top of SPEC 18–19 hero components)

## What
Refine the Hero section with polished layout, animation smoothness, and visual fixes. This is an incremental **live refinement** — no pre-written architecture. Changes will be documented here as they are implemented and reviewed.

## Current State (Post-SPEC 19 Base)
Hero features:
- 5-clip video collage layout with central preview video and floating corner clips
- Custom GSAP-based ScrollTrigger animation for video transition between hero zones
- Hex particle overlay (SPEC 19) for cinematic atmosphere
- Next.js dynamic import with `ssr: false`
- Video elements set to `preload="auto"` and `playsInline` (added in SPEC 41)

## Change Log

<!-- Add new entries below as changes are implemented and reviewed -->

---

## Acceptance Criteria
- [ ] `npm run build` passes with zero errors.

## Notes
- This spec is **live-edit** — populate the Change Log above as each change is implemented.
- All hero video source paths and clip animation logic must remain untouched unless explicitly redefined here.
- New GSAP animations must use `useGSAP()` with proper cleanup.
