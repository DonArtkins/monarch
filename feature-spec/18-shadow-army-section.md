# SPEC 18 — The Shadow Army Section

**Branch:** `feat/18-shadow-army-section`
**Section:** New section (after Monarchs)
**Component:** New `components/ShadowArmy.tsx`

## Goal
Cinematic section featuring key shadow soldiers with video/image assets.

## Acceptance Criteria
- Section title: `SH<b>A</b>DOW ARMY` via AnimatedTitle
- Sub-label: `EXTRACTED FROM THE FALLEN` in Space Mono
- Featured soldier grid: Igris, Beru, Iron, Tank, Kaisel (dragon)
- Each soldier: name, rank, special ability label
- Full-width video background: `/videos/shadow-army.mp4`
- Soldier cards overlay on top of video with semi-transparent dark bg
- GSAP ScrollTrigger: soldiers slide up on entry

## Mobile Requirements
- Video background maintains `aspect-video` ratio
- Cards stack in single column on mobile
- Video plays/pauses via IntersectionObserver (use VideoPlayer)
