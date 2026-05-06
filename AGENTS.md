# AGENTS.md — Monarch Upscale Project Directives

These directives are **mandatory** for all AI agents operating within the Monarch upscale project.

## Mandatory Reading Order

1. `AGENTS.md` — this file (you are here)
2. `ARTKINS_STYLE_GUIDE_MONARCH.md` — engineering, animation, performance, and no-AI-slope policy
3. `monarch-kit/context/project-overview.md` — product definition, Solo Leveling theme, scope
4. `monarch-kit/context/architecture-context.md` — stack, GSAP patterns, Next.js constraints, invariants
5. `monarch-kit/context/ui-context.md` — Monarch design tokens, typography, dark void aesthetic, animation language
6. `monarch-kit/context/code-standards.md` — TypeScript, GSAP cleanup, performance budgets, Tailwind v4
7. `monarch-kit/context/ai-workflow-rules.md` — how to work, plan gates, branch workflow, Context7 rules
8. `monarch-kit/context/progress-tracker.md` — current state, next steps, open questions, session notes
9.  Current feature spec from `monarch-kit/feature-specs/`

## Project Context

**Monarch** is a Solo Leveling–themed Awwwards-level interactive experience built with Next.js, GSAP, and Tailwind v4. It showcases the Shadow Monarch's universe through cinematic video backgrounds, ScrollTrigger animations, 3D bento tilt effects, and a deep dark void aesthetic.

**Upscale Goal**: Transform the current solid foundation into an Awwwards-level interactive experience featuring custom cursor, gate-crack preloader, cinematic frame-by-frame hover sections, horizontal rank scroll, extraction story cards, monarch panels, weapon sections, and a full story-driven narrative arc told in second-person.

**Current State**: The project has a working Hero, NavBar, About (portal scroll), Features (bento grid), Story, Contact, and Footer. The upscale plan adds 30 refined features (SPEC 11–40) layered on top without breaking existing functionality.

## 1. Branching & Feature Workflow

- **One Feature, One Branch**: All work must be done on isolated `feat/XX-feature-name` branches. Never commit directly to `master`/`main`.
- **Feature Specs**: Always refer to the corresponding `feature-specs/spec-XX-name.md` file before starting work.
- **Incremental Steps**: Implement features incrementally. Run `npm run build` and verify before committing.
- **Preserve Existing Structure**: Do NOT break existing component layout or animation architecture. Layer on top.

## 2. Code Review & Quality Gates

- No branch can be merged without passing build and lint checks.
- When reviewing code, act as an elite senior engineer. Focus on GSAP performance, TypeScript strictness, Tailwind v4 patterns, and adherence to the Monarch design system.
- Run `npm run build` — zero TypeScript errors, zero ESLint errors required.

## 3. Animation Standards (CRITICAL)

- **Always use `gsap.context()` with `return () => ctx.revert()`** — memory leaks are unacceptable.
- **Always use `useGSAP()` hook** from `@gsap/react` — never raw `useEffect` for GSAP.
- **Register plugins at module level** outside components: `gsap.registerPlugin(ScrollTrigger, SplitText)`.
- **Only animate GPU-composited properties**: `transform`, `opacity`. Never `width`, `height`, `margin`.
- **`will-change`** only on elements actively animating, removed after animation completes.
- **`force3D: true`** on performance-critical animations.
- **No decorative animations** without UX purpose.

## 4. Design System

- **Void Black** `#030014` — page background.
- **Shadow Purple** `#7B2FF7` — primary energy, buttons.
- **Neon Blue** `#00D4FF` — Jin-Woo's eye, CTAs, system UI.
- **Monarch Gold** `#FFD700` — A-rank, special highlights.
- **Gate Red** `#FF1744` — S-rank danger, extraction.
- Never use raw hex values in components — use CSS custom properties from `globals.css`.

## 5. Assets

- Videos live in `/public/videos/` — use `VideoPlayer` component with IntersectionObserver.
- Images live in `/public/images/` — use Next.js `<Image>` with proper `sizes` prop.
- Fonts are preloaded in `app/layout.tsx`: zentry, general, circularweb, robert-medium, robert-regular.
- Logo is in `/public/images/logo.svg`.
- Background music: `/public/audio/bgm.mp3`.

## 6. Dev Server & Testing

- **Never start a dev server** — use the user's running `npm run dev` on `localhost:3000`.
- Use browser verification after implementing each feature.
- `npm run build` must pass before marking any feature done.

## 7. Hard Rules

- Preserve ALL existing component APIs and props.
- Do not break `VideoPlayer`, `AnimatedTitle`, `BentoTilt`, `Button`, `RoundedCorners`.
- New sections go between existing sections in `app/page.tsx` in story order.
- All new components go in `components/` with `.tsx` extension.
- All animations have `useGSAP` scope and cleanup.
- No `any` TypeScript without documented justification.
- Space Mono is used for all system/HUD labels — add via `@font-face` or Google Fonts.
- Second-person narrative voice throughout all copy.

## 8. Feature Implementation Order

Implement feature specs in strict numeric order (SPEC 11 through SPEC 40). Do not skip ahead. Do not bundle multiple specs. Mark each spec done only after `npm run build` passes and the feature is verified.

**Current Priority Queue:**
1. SPEC 12 — Nav refinement (Story-based nav labels)
2. SPEC 13 — Custom shadow cursor
3. SPEC 14 — Gate-crack preloader
4. SPEC 15 — Film grain overlay
5. SPEC 16 — Typography system upgrade
… continue through SPEC 41

## 9. Story Flow

The entire site tells one story in this order:
```
HERO → ORIGIN → THE DOUBLE DUNGEON → THE SYSTEM → SHADOW EXTRACTION
→ THE GATES → THE RANKS → THE MONARCHS → THE SHADOW ARMY → BEYOND → ARISE
```
Every new section follows this arc. Copy is written in second-person: *"You are Sung Jin-Woo."*
