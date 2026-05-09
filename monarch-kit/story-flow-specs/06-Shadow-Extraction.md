# SPEC — Shadow Extraction
## Section 06 of 12 | [DARK VOID] — You Gave Them Life

---

## STORY BEAT
**"You didn't conquer them. You didn't kill them. You remade them. You reached into death and pulled out soldiers. And they knelt."**

The extraction section is the emotional core of the dark sections. Five shadow soldiers — Igris, Beru, Baran, the Ice Elf Leader, and the Dragon — each extracted from death into service. This is not just power. This is sovereignty over death itself. The section uses a dynamic bento-style grid with hover-triggered shadow energy effects.

---

## VISUAL TONE
- **Background:** `#0A0A1A` deep void — darker than The System, heavier
- **Lighting:** Single directional key light from lower-left — as if the light is being extracted, not given
- **Energy:** Deep purple and blue shadow energy pools beneath each card, rising on hover
- **Grid:** Dynamic 3+2 bento grid with generous `gap: 2rem`, each card a full extraction narrative
- **Typography:** Space Mono for the soldier's name labels. zentry for the headline.
- **Mood:** Not triumphant. Reverent. Like a ritual.

---

## AWWWARDS QUALITY NOTES
- Cards must have a `transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)` on hover
- On hover: shadow energy rises from the bottom of the card, wrapping the image (CSS `mask-image` gradient transition)
- The card border glows with the soldier's energy color (Igris = red, Beru = green→blue, Baran = ice blue, Dragon = purple)
- Video loops must be seamless and moody — no bright flashes
- Korean watermark `추출` (Extraction) at `opacity: 0.03`, bottom-left

---

## FLOW CONNECTION
- **Entering:** Shadow energy dissolves from the top of Ranks, consuming the light
- **Exiting:** A momentum carry — the last card's shadow energy trails off-screen as new content rises from below

---

## THE 4 EXTRACTION NARRATIVES

| Soldier | Start Frame | End Frame | Energy Color | Mood |
|---|---|---|---|---|
| **Igris** | Crumbling shadow knight, red eyes fading | Reformed, sleek red/dark armor, long red plume | Crimson `#FF2B2B` | Warrior's honor |
| **Beru** | Fallen Ant King, insectoid, defeated | Kneeling, regal, one knee, ant antennae | Green → Blue | Monster made majestic |
| **Baran** (Reimagined) | Massive demonic king, grey skin | Reformed as shadow, dual scimitars | Deep Purple `#6D28D9` | Fate rewritten |
| **Ice Elf Leader** (Reimagined) | Blue-skinned leader, wild hair | Dark ice shadow, fur-lined cloak | Ice Blue `#60A5FA` | The failed extraction, saved |
| **The Dragon** | Massive skeleton, 30m wingspan | Living shadow dragon, head bowed | Deep Navy `#020B1A` | Death of a god, rebirth |

---

## ASSETS

### `EXTRACTION_VID_01` — Igris
**Google Whisk Subject:** `Solo Leveling Igris shadow knight crumbling defeated`

**Start Frame:**
```
Jin-Woo kneeling beside the crumbling body of Igris — dark armor cracking, red light 
fading. Jin-Woo's right hand extended over Igris's chest, palm down. Faint purple 
shadow energy beginning to rise from cracks in the armor. Torch-lit dungeon cavern. 
The moment before extraction. Photorealistic, IMAX, 8K, dramatic.
```

**End Frame:**
```
Extraction complete. Igris stands — reformed, dark plate, red eyes. Head bowed — a 
knight acknowledging his lord. Jin-Woo stands watching. Shadow energy settles. 
Smoke trails from Igris. "I have risen." Photorealistic VFX, IMAX, 8K.
```

**Video Motion Prompt (Flow):**
```
Locked camera. Shadow energy slowly rises from the armor cracks, thickening. It wraps 
around Igris like living chains. Bright pulse. When it clears: Igris stands, reformed. 
He lowers his head in a slow, deliberate bow. Energy settles into smoke. 6–7 seconds. 
Reverent, not fast.
```

---

### `EXTRACTION_VID_02` — Beru
**Google Whisk Subject:** `Solo Leveling Beru ant king insectoid defeated`

*(Full prompts in 00-master-prompts.md)*

---

### `EXTRACTION_VID_03` — Baran (Reimagined)
**Google Whisk Subject:** `Solo Leveling Baran demon king shadow extraction reimagined`

*(Full prompts in 00-master-prompts.md)*

---

### `EXTRACTION_VID_05` — Ice Elf Leader (Reimagined)
**Google Whisk Subject:** `Solo Leveling ice elf leader shadow extraction reimagined`

**Start Frame:**
```
Jin-Woo in a snow-covered dungeon, standing over the blue-skinned Ice Elf Leader. 
The elf is dissolving into blue frost particles. Jin-Woo's hand is extended, 
reaching into the dissipating frost with purple shadow energy. The moment of failure 
turning into success. Photorealistic, 8K, cinematic.
```

**End Frame:**
```
The Ice Elf Leader has risen as a shadow soldier. His blue skin now a dark midnight 
blue-black. His white fur-lined cloak is now shadow-smoke. He kneels before Jin-Woo. 
Frost fog swirls at his feet. A soldier who should have been lost. 
Photorealistic, IMAX, 8K.
```

---

### `EXTRACTION_VID_04` — The Dragon
**Google Whisk Subject:** `Solo Leveling Kamish dragon skeleton shadow extraction`

*(Full prompts in 00-master-prompts.md)*

---

## INSTRUCTIONS FOR DEVELOPER
1. Each card is a `<div>` with `overflow: hidden` and a `<video>` element
2. On `mouseenter`: GSAP lifts the card `translateY(-8px)`, shadow energy rises from bottom `opacity: 0 → 0.6`, border glows
3. On `mouseleave`: reverse with `0.4s cubic-bezier(0.16, 1, 0.3, 1)`
4. Videos play on hover only (`muted`, `loop`, `playsinline`)
5. Use `IntersectionObserver` to pause off-screen videos

---

## GO TO
→ Previous: [05-Ranks.md](05-Ranks.md)
→ Next: [07-Monarchs.md](07-Monarchs.md)
