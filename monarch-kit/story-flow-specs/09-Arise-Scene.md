# SPEC — Arise Scene
## Section 09 of 12 | [SPLIT SCREEN] — The Moment Fate Changed

---

## STORY BEAT
**"In one world, the extraction failed. The Ice Elf Leader and Demon King Baran dissolved into light, and you knelt in the ice, exhausted. In another world — your world — you reached deeper. You are the rewrite."**

This is the stage where the visitor feels the split: Canon vs. Reimagined. A broken pillar on the left, a throne emerging from ice on the right. The two realities are separated by a vertical fault line. Scroll drives the reveal.

---

## VISUAL TONE
- **Background:** Left `#1A1A1A` (broken world) — Right `#020B1A` (your world). Divided 50/50.
- **Lighting:** Left side is cold, desaturated, dying light. Right side is alive with blue-purple energy.
- **Energy:** The dividing line is the visual anchor — a crack in reality that pulses
- **Layout:** 100vh `display: grid; grid-template-columns: 50% 50%` with a central dividing line
- **Typography:** Space Mono for the "FATE CHANGED" label, zentry for the main headline

---

## AWWWARDS QUALITY NOTES
- The dividing line must pulse with energy. CSS `@keyframes` with a subtle light flash.
- The left side is static. The right side has a slow, subtle parallax effect as you scroll.
- When the visitor hovers over the right side: shadow energy rises from the bottom.
- When the visitor hovers over the left side: the image desaturates further.
- Korean watermark `각성` (Arise) at `opacity: 0.03`, centered on the dividing line

---

## FLOW CONNECTION
- **Entering:** The last weapon card transitions seamlessly into the dark — a black screen for one scroll second, then the split appears
- **Exiting:** The right side (Reimagined) expands to 100% width, consuming the left side. Then the screen goes dark before Beyond.

---

## ASSETS

### `ARISE_IMG_01` — Canon (Extraction Fails)
**Google Whisk Subject:** `Solo Leveling Baran extraction failed ice dissolving`

```
Jin-Woo on his knees, exhausted, in a frozen dungeon. Baran (Demon King) or the Ice 
Elf Leader — their massive forms dissolving into light particles rather than shadow. 
The extraction has failed. Ice everywhere. Jin-Woo's hand is extended but the energy 
is dissipating. The essence floats upward as light, not shadow. Desaturated, cold, 
blue-grey tones. Photorealistic, cinematic, 8K.
```

### `ARISE_IMG_02` — Reimagined (Extraction Succeeds)
**Google Whisk Subject:** `Solo Leveling Baran shadow extraction reimagined dark ice`

```
Same frozen dungeon, same moment — but now the extraction has SUCCEEDED. Baran 
(Demon King) or the Ice Elf Leader rises as a dark shadow soldier — massive, 
powerful, black shadow energy connecting them. Deep purple and ice blue energy fills 
the frame. This is what MONARCH's universe imagined. Dramatic, triumphant, 
photorealistic, IMAX, 8K.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. Two `<div>` elements side by side, each `50% width`, `100vh`
2. The dividing line is a `<div>` with `width: 2px`, `height: 100%`, `background: linear-gradient(...)` that pulses with `@keyframes`
3. On desktop: the left side is `position: sticky`, right side scrolls
4. On mobile: stack the two images with a vertical scroll, add `<div>` separator that draws a line down the middle
5. Use a clip-path wipe triggered by scroll: the left side is gradually consumed by the right side's image

---

## GO TO
→ Previous: [08-Weapons.md](08-Weapons.md)
→ Next: [10-Beyond.md](10-Beyond.md)
