# SPEC — Beyond Season 2
## Section 10 of 12 | [DARK VOID] — Beyond the System

---

## STORY BEAT
**"The Architect is gone. The system is rewritten. And you sit where he sat. What comes after gods?"**

The Beyond section is the final dark section before the CTA. It teases Season 2 content: Jin-Woo taking the Architect's throne, the statues awakening, and the mystery of his father, Sung Il-Hwan, emerging from the void. It must feel like a promise — something is coming that hasn't happened yet.

---

## VISUAL TONE
- **Background:** `#020208` abyss — same as Monarchs, returning to the beginning of the dark arc
- **Lighting:** Sparse, selective. Each panel has its own cinematic moment.
- **Energy:** The Architect's white-gold light. The statues' awakening gold. The throne's blue-black fusion.
- **Layout:** 2-column, asymmetric, with a large headline spanning both columns

---

## AWWWARDS QUALITY NOTES
- The "Beyond" headline should appear letter by letter on scroll, each letter materializing from shadow
- The two teaser images should have a cinematic zoom on hover — subtle, only 5% scale
- Add a subtle parallax on the background — it moves at a different speed than the foreground content
- Korean watermark `초월` (Transcend) at `opacity: 0.03`, bottom-center

---

## FLOW CONNECTION
- **Entering:** The Arise Scene right side expands to full screen, then fades to this section
- **Exiting:** The Shadow Army CTA rises from below, as if from the abyss itself

---

## THE TEASE

| Panel | Content | Asset | Story Beat |
|---|---|---|---|
| **01** | The Architect's Throne | `BEYOND_IMG_01` | The seat is empty. For now. |
| **02** | Temple Statues Awakening | `BEYOND_IMG_02` | They are waking. |
| **03** | The Missing Father | `MONARCH_IMG_03` | He is watching. |
| **04** | Jin-Woo on the Throne | `BEYOND_VID_01` | You filled the seat. |

---

## ASSETS

### `BEYOND_IMG_01` — The Empty Throne
**Google Whisk Subject:** `Solo Leveling Architect throne white light geometric`

```
An enormous cosmic throne — the Architect's seat — made of pure white light and 
geometric crystal, floating in an infinite white void. The throne is empty. 
Light bleeds from its edges. Scale is alien and incomprehensible. 
Photorealistic, IMAX, 8K.
```

### `BEYOND_IMG_02` — Temple Statues Awakening
**Google Whisk Subject:** `Solo Leveling temple statues gold light cracking stone divine`

```
Two of the nine temple statues are AWAKENING — gold divine light runs across stone 
surfaces, stone chunks fall away revealing glowing golden flesh. Eyes blazing. 
One is turning its head. Scale terrifying. Dungeon throne room cracking. 
Divine light flooding. Photorealistic, IMAX, 8K.
```

### `BEYOND_VID_01` — Jin-Woo Takes the Throne
**Google Whisk Subject:** `Solo Leveling Jin-Woo throne system ruler final form`

**Start Frame:**
```
The Korean man approaches the Architect's throne from the distance, small against 
its scale. The throne is empty, pure white.
```
**End Frame:**
```
He sits. He fills it. His shadow energy and divine light merge — white becomes 
threaded with blue and black. He looks forward. Shadow Monarch + System Ruler. 
This is the vision for Season 3-4. Photorealistic, IMAX, 8K.
```

**Video Motion Prompt (Flow):**
```
Camera pushes through the white void. The man walks toward the throne. He reaches the 
base, ascends the steps, and sits. As he sits, a pulse of blue-black energy radiates 
from the throne — the white light turns threaded with shadow. He looks forward. 
One hand on the armrest. 6–7 seconds. The power is in the scaling contrast.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. Two-column asymmetric layout — left column is 60%, right is 40%
2. The "BEYOND" headline is `position: sticky` and spans both columns
3. On scroll, the headline letters appear one by one from shadow using GSAP `SplitText`
4. The video in the right column plays once on scroll into view, then pauses
5. Use `mix-blend-mode: screen` for light elements against the dark background

---

## GO TO
→ Previous: [09-Arise-Scene.md](09-Arise-Scene.md)
→ Next: [11-Shadow-Army-CTA.md](11-Shadow-Army-CTA.md)
