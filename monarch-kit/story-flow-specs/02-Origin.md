# SPEC — Origin Section
## Section 02 of 12 | [LIGHT REALM] — Before The System

---

## STORY BEAT
**"You were nothing. You were a burden. You entered the temple the same way you entered everything — scared, weak, certain it was a mistake."**

This section tells the "before." E-Rank Jin-Woo — cheap gear, normal eyes, hunched shoulders. The portal scroll expansion is the reveal of the Double Dungeon: the massive Statue of God and the Architect's avatar holding the Commandments. A moment that should have killed you but instead made the system start.

---

## VISUAL TONE
- **Background:** `#F0F4FF` ice white — same white as Hero, reaching peak brightness
- **Lighting:** Natural fluorescent (hospital/clinic light). Flat, institutional.
- **Energy:** No energy yet. No shadows. Just a weak boy in cheap armor.
- **Portal Image:** The only dark thing on the page — a glowing corridor of ancient power
- **Particles:** Stop. The calm before the storm.

---

## AWWWARDS QUALITY NOTES
- The GSAP clip-path portal expansion must be the hero animation of this section
- Clip-path starts small (hidden/covered), expands to full width as user scrolls
- Vignette darkens as the portal opens (white → creeping shadow at edges)
- `SNAP` sound effect on first 5% of scroll progress (system notification)
- Korean watermark `기원` (Origin) at `opacity: 0.03`, fixed bottom-left

---

## FLOW CONNECTION
- **Entering:** From Hero — the hexagonal clips collapse, background remains ice white
- **Exiting:** Clip-path expansion reveals the dark void of The System (Features/Bento)
- **The Portal is the portal** — a dimensional tear in the page that opens into the next section

---

## ASSETS

### `PORTAL_IMG_01`
- **Type:** Single static image + GSAP clip-path scroll-expansion overlay
- **File:** `PORTAL_IMG_01.webp`
- **Usage:** The centerpiece of the Origin section
- **Story beat:** The Double Dungeon. The Statue of God on his throne, the Commandment Statue holding your fate, and the Architect watching. Ancient. Divine. Deadly.

```
Interior of the Cartenon Temple — an ancient stone cathedral deep underground. 
Massive stone pillars. At the far end, an enormous seated stone figure — the 
Statue of God — with a wide, terrifying, toothy grin and eyes that ignite with 
blinding white light. Flanking the room are stone statues: a hooded angel holding 
the stone Commandment tablet, and multi-armed warriors holding stone axes and maces. 
Polished black stone floor. Camera: centered, low, symmetrical, 24mm IMAX lens. 
Photorealistic, 8K, cinematic.
```

**Google Whisk Subject:** `Solo Leveling Cartenon temple double dungeon statues`

---

## INSTRUCTIONS FOR DEVELOPER
1. The portal image is overlay on a light background — use `position: absolute` with `overflow: hidden`
2. Clip-path starts as a small rectangle (or circle) at center, expands to `100vw` on scroll
3. Add `backdrop-filter` blur to the light background behind for cinematic depth
4. The scroll trigger should be pinned for 50% of the section's height

---

## GO TO
→ Previous: [01-Hero.md](01-Hero.md)
→ Next: [03-The-System.md](03-The-System.md) — The System Awakens
