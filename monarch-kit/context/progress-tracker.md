# Progress Tracker — Monarch Upscale

## Current Phase

**SPEC 13 Complete → Ready for SPEC 14**

## Baseline State (Pre-Upscale)

The following components are working and must be preserved:

| Component | File | Status |
|---|---|---|
| NavBar | `components/NavBar.tsx` | ✅ Working |
| Hero | `components/Hero.tsx` | ✅ Working |
| About | `components/About.tsx` | ✅ Working |
| AnimatedTitle | `components/AnimatedTitle.tsx` | ✅ Working |
| Features (Bento) | `components/Features.tsx` | ✅ Working |
| Story | `components/Story.tsx` | ✅ Working |
| Contact | `components/Contact.tsx` | ✅ Working |
| Footer | `components/Footer.tsx` | ✅ Working |
| Button | `components/Button.tsx` | ✅ Working |
| VideoPlayer | `components/VideoPlayer.tsx` | ✅ Working |
| RoundedCorners | `components/RoundedCorners.tsx` | ✅ Working |
| Page | `app/page.tsx` | ✅ Working |
| Layout | `app/layout.tsx` | ✅ Working |
| Globals CSS | `app/globals.css` | ✅ Working |

## Upscale Progress

### NAV & GLOBAL REFINEMENTS
- [x] **SPEC 12** — Story-based navigation labels + active section highlight ✅ (2026-05-06)
- [x] **SPEC 13** — Custom shadow energy cursor with ring + trail ✅ (2026-05-07)
- [x] **SPEC 14** — Gate-crack SVG preloader (2.4s, skippable) ✅ (2026-05-07)
- [x] **SPEC 15** — Film grain/noise texture global overlay ✅ (2026-05-07)
- [ ] **SPEC 16** — Typography upgrade (Space Mono labels, clamp sizing)
- [ ] **SPEC 17** — Color system expansion + depth layer tokens

### HERO SECTION
- [ ] **SPEC 18** — Hero 5-clip video structure (hexagonal containers)
- [ ] **SPEC 19** — Hero hexagonal particle system (ice-eye blue upgrade)

### ORIGIN SECTION
- [ ] **SPEC 20** — Portal scroll expansion (Double Dungeon image)
- [ ] **SPEC 21** — Origin copy block ("Before The System" panels)

### THE SYSTEM SECTION (BENTO)
- [ ] **SPEC 22** — Bento Card 01: THE SYSTEM (rotating status windows)
- [ ] **SPEC 23** — Bento Card 02: ARISE (Shadow Monarch transformation)
- [ ] **SPEC 24** — Bento Card 03: SHADOW ARMY (Igris battle)
- [ ] **SPEC 25** — Bento Card 04: DUNGEONS (S-rank interior)
- [ ] **SPEC 26** — Bento Card 05: ARISE CTA card upgrade
- [ ] **SPEC 27** — Bento Card 06: THE GATES (gate opening video)
- [ ] **SPEC 28** — Bento glass shimmer + tilt effect upgrade

### THE GATES SECTION
- [ ] **SPEC 29** — Red Gate frame-by-frame hover section (40 frames)

### TRANSITION
- [ ] **SPEC 30** — Dark ↔ Light realm shift transition

### THE RANKS SECTION (NEW)
- [ ] **SPEC 31** — Hunter Ranks E–S visual progression cards

### SHADOW EXTRACTION SECTION (NEW)
- [ ] **SPEC 32** — Shadow Extraction story cards (Igris, Beru, Baran, Dragon)

### THE MONARCHS SECTION (NEW)
- [ ] **SPEC 33** — Architect + Temple Statues + Father panels

### WEAPONS SECTION (NEW)
- [ ] **SPEC 34** — Weapons of the Shadow Monarch (out-of-frame effect)

### SHADOW ARMY CTA
- [ ] **SPEC 35** — Shadow Army CTA upgrade (2-column, video right)

### BEYOND SECTION (NEW)
- [ ] **SPEC 36** — Beyond Season 2 story teaser

### FOOTER
- [ ] **SPEC 37** — Footer refinement (watermark, strip, social links)

### ARISE SCENE (NEW)
- [ ] **SPEC 38** — Failed vs. Reimagined Arise scene (split screen)

### AUDIO + PERFORMANCE
- [ ] **SPEC 39** — Ambient audio toggle refinement
- [ ] **SPEC 40** — Second-person narrative copy rewrite
- [ ] **SPEC 41** — Performance, lazy loading, mobile optimization

## Assets Needed (Generate via Google Flow / Veo)

The following assets are referenced in specs but may not exist yet. Use placeholder assets until generated:

### Videos (Placeholder: use existing hero videos)
- `/public/videos/father.mp4` — System UI feel
- `/public/videos/story-arise.mp4` — Shadow Monarch transformation
- `/public/videos/shadow-army.mp4` — Army formation
- `/public/videos/legion.mp4` — S-rank dungeon / army
- `/public/videos/hero-3.mp4` — Ruler's Authority hand
- `/public/videos/hero-4.mp4` — Gate crack in city
- `/public/videos/hero-5.mp4` — Shadow extraction

### Gate Frame Images (Generate 40 frames from red gate video)
- `/public/images/gate-frames/gate_frame_001.jpg` through `gate_frame_040.jpg`

### Character/Scene Images (Placeholder: use existing images)
- `/public/images/portal.jpeg` — Double Dungeon corridor
- `/public/images/beru.jpeg` — Already exists ✅
- `/public/images/system-ui.jpeg` — Already exists ✅
- `/public/images/footer-bg.jpeg` — Already exists ✅
- `/public/images/kamish.jpeg` — Already exists ✅
- `/public/images/about-bg.jpeg` — Already exists ✅

## Architecture Decisions

- **Space Mono font**: Add via Google Fonts CDN in `app/layout.tsx`
- **Film grain**: CSS SVG `feTurbulence` filter, fixed position, `pointer-events: none`
- **Custom cursor**: Two `div` elements (dot + ring), GSAP ticker, `pointer-events: none`
- **Preloader**: SVG crack path animation, no external assets needed
- **Frame hover**: 40 JPG frames, mouse X → frameIndex mapping
- **Korean watermark**: Absolute positioned, `opacity: 0.04`, `pointer-events: none`, `aria-hidden`

## Open Questions

1. Does the project have access to `gsap/SplitText`? Check if GSAP Club is installed. Fallback: use word-split manually.
2. Are the gate frame images going to be generated? Fallback: use a static image with CSS parallax.
3. Should the preloader be skippable via click/keypress immediately? Yes, per SPEC 13.

## Session Notes

- **Session Start**: Upscale plan imported from `upscale-plan/feature-specs/monarch_feature_specs.md`
- **Baseline**: All 11 existing components verified working
- **2026-05-06 — SPEC 12 Complete**:
  - NavBar rewritten with story-driven labels (Origin, The System, Shadow Army | Dungeons, Monarchs)
  - Centered-logo layout (absolute positioning, independent of sibling widths)
  - IntersectionObserver active section tracking with blue glow
  - GSAP hamburger SVG morph animation (no icon swap, GPU-friendly)
  - Mobile menu overlay with body scroll lock
  - ARISE CTA with glowing blue border
  - Space Mono Google Font added to layout.tsx
  - nav-hover-btn updated to Space Mono + tracking 0.15em + blue underline
  - Korean watermark 일어나라 (ARISE) added to Hero.tsx
  - Korean watermark 초월 (TRANSCEND) added to Footer.tsx (replaced English "Monarch")
  - `.korean-watermark` reusable CSS class added to globals.css
  - `npm run build` passes — zero TypeScript errors, zero ESLint errors
- **2026-05-07 — SPEC 13 Complete**:
  - CustomShadowCursor component implemented with dot + ring
  - 0.15 lerp damping for weighted ring lag
  - Hover states for links (scale up) and videos (border color change)
  - CursorWrapper implemented for desktop-only (pointer: fine) check
  - Integrated into layout.tsx
  - MutationObserver ensures dynamic content is also tracked
  - `npm run build` passes — zero TypeScript errors
- **2026-05-07 — SPEC 14 Complete**:
  - `Preloader` component implemented with GSAP SVG crack sequence
  - `ARISE` text impact and clip-path dissolve reveal
  - `PreloaderGate` client wrapper manages initial site-wide visibility
  - Integrated into root `layout.tsx` to gate all routes
  - Skip button available after 1.2s
  - `npm run build` passes — zero TypeScript errors
- **2026-05-07 — SPEC 15 Complete**:
  - Global film grain overlay implemented via CSS `::after` on `body`
  - SVG `feTurbulence` fractal noise filter (baseFrequency 0.75, 4 octaves)
  - 8fps organic grain animation using `steps(1)` CSS keyframes
  - `mix-blend-mode: overlay` with 0.045 opacity for subtle cinematic texture
  - Zero JS/React overhead approach for maximum performance
- **Next Action**: Implement SPEC 16 — Typography system upgrade
