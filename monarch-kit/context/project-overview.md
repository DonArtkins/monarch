# Project Overview — Monarch Upscale

## Product Vision

Monarch is a Solo Leveling–themed Awwwards-level interactive web experience. It chronicles the rise of Sung Jin-Woo from the weakest E-rank hunter to the Shadow Monarch — told entirely in second-person so the visitor *becomes* Jin-Woo.

The current site has a strong foundation. This upscale plan elevates every section to Awwwards-level quality: custom cursor, cinematic preloader, frame-by-frame hover sequences, horizontal rank scroll, shadow extraction story cards, monarch reveal panels, weapons showcase, and a full story-driven narrative arc.

## Current State (Baseline)

The following components exist and work correctly. They must NOT be broken:

| Component | Status | Location |
|---|---|---|
| `NavBar` | ✅ Working | `components/NavBar.tsx` |
| `Hero` | ✅ Working | `components/Hero.tsx` |
| `About` | ✅ Working | `components/About.tsx` |
| `AnimatedTitle` | ✅ Working | `components/AnimatedTitle.tsx` |
| `Features` (Bento) | ✅ Working | `components/Features.tsx` |
| `Story` | ✅ Working | `components/Story.tsx` |
| `Contact` | ✅ Working | `components/Contact.tsx` |
| `Footer` | ✅ Working | `components/Footer.tsx` |
| `Button` | ✅ Working | `components/Button.tsx` |
| `VideoPlayer` | ✅ Working | `components/VideoPlayer.tsx` |
| `RoundedCorners` | ✅ Working | `components/RoundedCorners.tsx` |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, TypeScript strict |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | GSAP 3.15+, @gsap/react, ScrollTrigger, SplitText |
| UI | Lucide React, react-icons |
| Images | Next.js `next/image` |
| Fonts | zentry, general, circularweb, robert-medium, robert-regular (custom woff2) |
| Audio | HTML5 audio element |

## Story Arc & Section Order

After upscale, the page flows as:

```
1. NavBar (story-driven labels)
2. Hero (5 video clips, hexagonal particles)
3. About/Origin (portal scroll — Double Dungeon image)
4. Features/System (bento grid — 6 cards)
5. [NEW] Gates Section (frame-by-frame hover, rank cards)
6. [NEW] Ranks Section (E → Shadow Monarch timeline)
7. [NEW] Shadow Extraction Section (story cards)
8. [NEW] Monarchs Section (The Architect, statues, father)
9. [NEW] Weapons Section (Kamish, Demon King sword, Igris)
10. Story (existing — upgraded with frame hover)
11. [NEW] Beyond Season 2 Section (teaser)
12. Contact → ARISE CTA (upgraded)
13. Footer (upgraded with watermark)
```

## Upscale Goals

1. **Awwwards Top Site quality** — every scroll interaction is purposeful and refined.
2. **Cinematic narrative** — visitors feel like they ARE Sung Jin-Woo.
3. **Performance** — Lighthouse 90+ on mobile, no animation jank.
4. **Accessibility** — all interactive elements keyboard-navigable, ARIA labelled.
5. **Second-person voice** — all copy rewrites use "you" throughout.

## Success Criteria

- [ ] Custom cursor with ring + trail effect renders on desktop.
- [ ] Gate-crack preloader plays on first load (2.4s, skippable).
- [ ] Film grain overlay is visible on dark sections at ~0.04 opacity.
- [ ] Navigation uses story-driven labels and active section highlight.
- [ ] Hero shows 5 video clips in hexagonal clip containers.
- [ ] Frame-by-frame hover works on the Red Gate section.
- [ ] Horizontal rank scroll works on mobile with snap.
- [ ] Shadow extraction cards have hover energy effects.
- [ ] All animations clean up via `gsap.context().revert()`.
- [ ] `npm run build` passes with zero TypeScript errors.
- [ ] Mobile responsive — no horizontal overflow anywhere.

## Scope Limits

- Do NOT rewrite the backend or add any API routes.
- Do NOT change the Next.js App Router structure.
- Do NOT remove existing components — only extend them.
- Do NOT use `localStorage` in Artifacts.
- Do NOT add new npm dependencies without confirming availability in `package.json`.
