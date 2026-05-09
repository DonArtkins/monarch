# SPEC — Weapons
## Section 08 of 12 | [DARK VOID] — Your Arsenal

---

## STORY BEAT
**"They are not just weapons. They are choices. Which one do you take into the gate? The daggers that drink blood? The blade that freezes worlds? Every hunter has a weapon. Yours chose you."**

This section is your armory. From the weak Rasaka's Fang to the god-slaying Kamish's Wrath. Each weapon is a high-resolution 3D card that the visitor can scroll through. The background reflects the weapon's element: fire for Kamish, ice for the Demon King.

---

## VISUAL TONE
- **Background:** `#0A0A1A` deep — slightly warmer than the abyss, reflecting the weapons
- **Lighting:** Dramatic spotlights from above. The weapons are the stars.
- **Energy:** Weapon-specific — golden lightning, blue frost, red shadow fire.
- **Layout:** 3-column grid with `gap: 2rem`, each weapon on a dark pedestal
- **Typography:** Product-style labels. Name in zentry, stats in Space Mono.

---

## AWWWARDS QUALITY NOTES
- The "out-of-frame" effect must be convincing. The sword blade extends beyond its container on hover, creating a depth illusion.
- Each weapon has a subtle rotation on hover — as if floating.
- On hover: the weapon emits its energy color (gold, blue, red) as a glow from the blade edges
- No videos — these are single images with CSS hover effects
- Korean watermark `무기` (Weapon) at `opacity: 0.03`, bottom-right

---

## FLOW CONNECTION
- **Entering:** Dark scroll from Monarchs — seamless, no transition
- **Exiting:** Dark scroll continues into Arise Scene

---

## THE INVENTORY

| Weapon | Rank | Desc | Story Beat |
|---|---|---|---|
| **Kamish's Wrath** | SSR | Black/Red obsidian, dragon teeth | Monarch Killer |
| **Demon King's Longsword** | SSR | Translucent blue ice, frost runes | The Frozen King |
| **Baruka's Dagger** | SR | Curved elven steel, blue glow | The Ice Elf's Legacy |
| **Knight Killer** | SR | Blue-black jagged edge | The Boss Slayer |

---

## ASSETS

### `WEAPON_IMG_01` — Kamish's Wrath (SSR)
**Google Whisk Subject:** `Solo Leveling Kamish's Wrath daggers black red obsidian`

```
A pair of ultra-sharp black obsidian daggers with jagged red energy veins and 
glowing red edges. Hilts wrapped in gold dragon-scale. Floating in a dark void 
with crackling red lightning. Photorealistic, 8K, cinematic.
```

### `WEAPON_IMG_02` — Demon King's Longsword (SSR)
**Google Whisk Subject:** `Solo Leveling Demon King longsword ice crystal`

```
Massive 2 m blade of translucent blue-white ice crystal. Dark obsidian cross-guard 
with frost runes and icicles. Blue ice light radiates from within. Floating in 
a snowy dungeon void. Photorealistic, 8K.
```

### `WEAPON_IMG_03` — Baruka's Dagger (SR)
**Google Whisk Subject:** `Solo Leveling Baruka's Dagger curved blade blue glow`

```
Curved elven dagger with a silver hilt and jagged obsidian blade. Faint blue 
energy glow. Photorealistic, 8K.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. Each card is a `<div>` with `overflow: visible` (specifically for the out-of-frame effect)
2. On hover: the weapon image does `transform: translateY(-4px) scale(1.02)` with `filter: drop-shadow(0 0 20px [color])`
3. The out-of-frame elements must be positioned `absolute top: -20%` with `z-index: 10`
4. Use CSS `clip-path` to ensure only the weapon extends outside the card, not the rest of the image
5. On mobile: remove the out-of-frame effect, use a clean centered card instead

---

## GO TO
→ Previous: [07-Monarchs.md](07-Monarchs.md)
→ Next: [09-Arise-Scene.md](09-Arise-Scene.md)
