# SPEC — The System (Bento Cards)
## Section 03 of 12 | [DARK VOID] — Power Awakens

---

## STORY BEAT
**"The system chose you. Through a screen of ice-blue windows, it rebuilt you — stat by stat, level by level, until nothing about you was the same."**

The page plunges into the void. The Bento Grid is not just a layout — it is the system's interface made into architecture. Six living cards, each a window into a different power the system gave you.

---

## VISUAL TONE
- **Background:** `#030014` void black
- **Lighting:** Single-source dim blue. Holographic UI glow from the cards themselves.
- **Energy:** The cards emit light. Shadow energy bleeds from their edges.
- **Grid:** 6-card asymmetric bento grid with cinematic glass shimmer
- **Typography:** Space Mono for all HUD labels. zentry font for card headlines.

---

## AWWWARDS QUALITY NOTES
- Every card must have a video background (not static image)
- Cards tilt on hover (BentoTilt component — `perspective: 800px`, `rotateX/Y` on mouse)
- Video loops must be seamless — no jump, no stutter
- Glass shimmer: subtle animated `radial-gradient` sweep on hover
- When user scrolls into this section: subtle blue pulse washes across the grid once
- Korean watermark `시스템` (System) at `opacity: 0.03`, bottom-center

---

## FLOW CONNECTION
- **Entering:** The portal from Origin collapses, and the void appears
- **Exiting:** A horizontal wipe (light bleeds from left to right) reveals The Gates section

---

## THE 6 BENTO CARDS

| Card | Content | Video Asset | Glow Color |
|---|---|---|---|
| **01** | THE SYSTEM — Status windows, level up, daily quest | `BENTO_VID_01` | Ice blue `#60A5FA` |
| **02** | ARISE — Shadow Monarch transformation | `BENTO_VID_02` | Deep purple `#6D28D9` |
| **03** | SHADOW ARMY — Igris, the knight general | `BENTO_VID_03` | Crimson `#FF2B2B` |
| **04** | DUNGEONS — S-rank interior cavern | `BENTO_VID_04` | Ice blue `#60A5FA` |
| **05** | ARISE CTA — "You are not the same boy who entered." | `BENTO_VID_02` (reused) | Gold `#F5A623` |
| **06** | THE GATES — Gate opening in parking garage | `BENTO_VID_06` | Ice blue `#60A5FA` |

---

## INSTRUCTIONS FOR DEVELOPER
1. Use CSS `perspective: 800px` and `transform-style: preserve-3d` on the grid container
2. Each card's `::after` pseudo-element is the glass shimmer — animated `radial-gradient` on hover
3. Video elements use `preload="metadata"` on non-hero cards
4. The 6th card (THE GATES) has a different aspect ratio (wide, spanning 2 columns)
5. Add `will-change: transform` on hover, removed on mouseleave (GSAP cleanup)

---

## GO TO
→ Previous: [02-Origin.md](02-Origin.md)
→ Next: [04-The-Gates.md](04-The-Gates.md)
