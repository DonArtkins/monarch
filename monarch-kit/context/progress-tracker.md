# Progress Tracker — Monarch Upscale

## Current Phase

**SPEC 38 Complete → Ready for SPEC 39**

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
- [x] **SPEC 16** — Typography upgrade (Space Mono labels, clamp sizing) ✅ (2026-05-07)
- [x] **SPEC 17** — Color system expansion + depth layer tokens ✅ (2026-05-07)

### HERO SECTION — [LIGHT REALM]
- [x] **SPEC 18** — Hero 5-clip video structure (hexagonal containers) ✅ (2026-05-07)
- [x] **SPEC 19** — Hero hexagonal particle system (ice-eye blue upgrade) ✅ (2026-05-07)

### ORIGIN SECTION — [LIGHT REALM]
- [x] **SPEC 20** — Portal scroll expansion (Double Dungeon image) ✅ (2026-05-07)
- [x] **SPEC 21** — Origin copy block ("Before The System" panels) ✅ (2026-05-07)

### THE SYSTEM SECTION (BENTO) — [DARK VOID]
- [x] **SPEC 22** — Bento Card 01: THE SYSTEM (rotating status windows) ✅ (2026-05-07)
- [x] **SPEC 23** — Bento Card 02: ARISE (Shadow Monarch transformation) ✅ (2026-05-07)
- [x] **SPEC 24** — Bento Card 03: SHADOW ARMY (Igris battle) ✅ (2026-05-07)
- [x] **SPEC 25** — Bento Card 04: DUNGEONS (S-rank interior) ✅ (2026-05-07)
- [x] **SPEC 26** — Bento Card 05: ARISE CTA card upgrade ✅ (2026-05-07)
- [x] **SPEC 27** — Bento Card 06: THE GATES (gate opening video) ✅ (2026-05-07)
- [x] **SPEC 28** — Bento glass shimmer + tilt effect upgrade ✅ (2026-05-07)

### THE GATES SECTION — [LIGHT REALM]
- [x] **SPEC 29** — Red Gate frame-by-frame hover section (40 frames) ✅ (2026-05-07)

### TRANSITION
- [x] **SPEC 30** — Dark ↔ Light realm shift transition ✅ (2026-05-07)

### THE RANKS SECTION (NEW) — [LIGHT REALM]
- [x] **SPEC 31** — Hunter Ranks E–S visual progression cards ✅ (2026-05-07)

### SHADOW EXTRACTION SECTION (NEW) — [DARK VOID]
- [x] **SPEC 32** — Shadow Extraction story cards (Igris, Beru, Baran, Dragon) ✅ (2026-05-07)

### THE MONARCHS SECTION (NEW) — [DARK VOID]
- [x] **SPEC 33** — Architect + Temple Statues + Father panels ✅ (2026-05-07)

### WEAPONS SECTION (NEW) — [DARK VOID]
- [x] **SPEC 34** — Weapons of the Shadow Monarch (out-of-frame effect) ✅ (2026-05-07)

### SHADOW ARMY CTA — [DARK VOID]
- [x] **SPEC 35** — Shadow Army CTA upgrade (2-column, video right) ✅ (2026-05-07)

### BEYOND SECTION (NEW) — [DARK VOID]
- [x] **SPEC 36** — Beyond Season 2 story teaser ✅ (2026-05-07)

### CONTACT SECTION — [LIGHT REALM]
- [x] **Theme Transition** — Section background and text updated to Light Realm palette ✅ (2026-05-07)

### FOOTER — [DARK VOID]
- [x] **SPEC 37** — Footer refinement (watermark, strip, social links) ✅ (2026-05-07)

### ARISE SCENE (NEW) — [DARK VOID]
- [x] **SPEC 38** — Failed vs. Reimagined Arise scene (split screen) ✅ (2026-05-07)

### AUDIO + PERFORMANCE
- [x] **SPEC 39** — Ambient audio toggle refinement ✅ (2026-05-07)
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
- **2026-05-07 — SPEC 16 Complete**:
  - Space Mono added via Google Fonts for system/HUD labels
  - Hero heading and section titles upgraded to fluid `clamp` sizing
  - `system-label` and `system-label-lg` utilities implemented in `globals.css`
  - `korean-watermark` upgraded to a reusable `@utility`
  - All components updated to use new utilities (removed inline monospace styles)
  - `npm run build` passes — zero TypeScript errors
- **2026-05-07 — SPEC 17 Complete**:
  - Expanded color system with 13 new depth-layered tokens (`--void`, `--abyss`, `--deep`, `--shadow-dark`, `--royal`)
  - Added accent tokens for gate ranks and energy effects (`--ice-eye`, `--gate-red`, etc.)
  - Added motion tokens for cinematic easing and durations
  - Implemented `@utility` classes for section backgrounds and card glow effects
  - All new tokens available as Tailwind classes via `@theme`
  - `npm run build` passes — zero regressions on existing sections
- **2026-05-07 — SPEC 18 Complete**:
  - Hero section expanded to 5-clip cinematic structure
  - 4 decorative clip containers added with custom clip-paths and GSAP entrance animations
  - `Loader` extracted to a standalone component for site-wide consistency
  - Hero copy updated to second-person narrative voice ("You are the weakest hunter...")
  - All clips use `VideoPlayer` for IntersectionObserver performance
  - `npm run build` passes — zero TypeScript errors
- **2026-05-07 — SPEC 20 Complete**:
  - About section upgraded to ORIGIN arc (Cartenon Temple)
  - AnimatedTitle and subtext updated to second-person narrative
  - Added cinematic vignette and HUD label (DANGER LEVEL: CATASTROPHIC)
  - HUD label reveals during portal expansion (GSAP scrub)
  - Ambient portal glow added to globals.css
  - `npm run build` passes
- **2026-05-07 — SPEC 21 Complete**:
  - Added floating story panels below the portal in the About section
  - Implemented second-person narrative for pre-system arc
  - Panels slide in from left/right using GSAP ScrollTrigger
  - Added Korean watermark 기원 (Origin) at 0.03 opacity
  - Verified mobile stacking and zero horizontal overflow
  - `npm run build` passes
- **2026-05-07 — SPEC 22-28 Complete**:
  - Bento Grid layout fully implemented with custom card components
  - Cards 01-06 updated with cinematic videos and status window overlays
  - BentoTilt component refined with GSAP quickTo and perspective-3d
  - Mobile grid stacking verified
- **2026-05-07 — SPEC 29 Complete**:
  - Gates section implemented with Red Gate frame-by-frame hover (Placeholder)
  - Layout matches story card style with system labels and watermarks
- **2026-05-07 — SPEC 30 & Theme Rhythm Integration**:
  - Established Light/Dark narrative rhythm across the entire site
  - [LIGHT]: Hero, About, Gates, Ranks, Contact
  - [DARK]: Features, Shadow Extraction, Monarchs, Weapons, AriseScene, Beyond, Footer
  - Added CSS tokens for Light Realm to globals.css
  - Updated Hero, About, Gates, and Contact to adhere to the Light theme
- **2026-05-07 — SPEC 31-38 Complete**:
  - Implemented the Ranks section (Light Realm) with horizontal scroll-snap.
  - Built Shadow Extraction section (Dark Void) with 2x2 grid and mouse-hover energy.
  - Created Monarchs section (Dark Void) with 3D tilt portrait panels.
  - Implemented Weapons section (Dark Void) featuring out-of-frame "3D" sword effect.
  - Upgraded Shadow Army CTA (Dark Void) with two-column video/copy layout and stats.
  - Built Beyond story teaser (Dark Void) with alternating sequential panels.
  - Refined Footer (Dark Void) with three-column cinematic layout and noise overlay.
  - Implemented Arise Scene (Dark Void) with GSAP clip-path wipe and timeline split.
  - Verified site-wide narrative rhythm (Light/Dark realm shifts).
  - `npm run build` passes — zero errors.

- **2026-05-07 — SPEC 39 Complete**:
  - Refined audio toggle in `NavBar.tsx` with GSAP volume fade (fade in 1.8s, fade out 0.8s).
  - Updated indicator colors to `--ice-eye` in `globals.css`.
  - Added Space Mono HUD tooltip (AMBIENT ON/OFF) visible on hover for desktop.
  - Added staggered GSAP entrance animation for indicator bars.

- **Next Action**: Implement SPEC 40 — Second-person narrative copy rewrite.
