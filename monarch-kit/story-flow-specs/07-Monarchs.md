# SPEC — The Monarchs
## Section 07 of 12 | [DARK VOID] — They Notice You Now

---

## STORY BEAT
**"The gods have eyes. The system has eyes. And now they are all looking at you. The Architect built the world. You did not ask to be seen. But you are."**

This section introduces the layers of sovereignty. First, the Architects of the System (Architect, Statue of God, Father). Second, the Pantheon of Ten Monarchs who govern the realms of existence. The section transitions from a 3-column grid into a massive horizontal scroll of the Sovereigns.

---

## VISUAL TONE
- **Background:** `#020208` abyss — the deepest black on the site
- **Lighting:** Each panel is its own world. The Architect glows. The statues cast long shadows. The Father is in near-total darkness.
- **Energy:** Subtle. None of the panels are animated (no videos here). The power is in the stillness.
- **Layout:** 3-column with `gap: 1.5rem`, each column is a full-height panel with an image
- **Typography:** Space Mono for entity labels. zentry for the headline — single line, centered, massive.

---

## AWWWARDS QUALITY NOTES
- The 3D tilt effect must feel weighty — not a simple rotate. Use `gsap.quickTo` with damping.
- The Architect panel: on hover, a faint white-gold light bloom expands from center (`box-shadow: 0 0 60px rgba(255, 255, 255, 0.4)`)
- The Statues panel: on hover, only the nearest statue's eyes flicker gold once
- The Father panel: on hover, the only thing that changes is a slight brightening — as if a cloud has passed
- Korean watermark `군주` (Monarch) at `opacity: 0.03`, bottom-center

---

## FLOW CONNECTION
- **Entering:** The last extraction card's shadow energy trails off-screen, revealing the abyss
- **Exiting:** A slow, continuous dark scroll — no flash, just the void. The Weapons section rises from the darkness.

---

## THE 3 ENTITIES

| Panel | Name | Size | Mood | Reference Image |
|---|---|---|---|---|
| **01** | THE ARCHITECT (Avatar) | 16:9 | Alien, powerful, uncanny | `MONARCH_IMG_01` |
| **02** | THE STATUE OF GOD | 16:9 | Ancient, awakening, terrifying | `MONARCH_IMG_02` |
| **03** | THE FATHER (Missing) | 3:4 | Mystery, pride, weathered | `MONARCH_IMG_03` |

---

### PART 2: THE PANTHEON (Assembly of Sovereigns)

| Entity | Title | Mood | Reference |
|---|---|---|---|
| **Antares** | Monarch of Destruction | Pure Annihilation | `MONARCH_IMG_04` |
| **Rakan** | Monarch of Beastly Fangs | Feral, Predatory | `MONARCH_IMG_05` |
| **Querehsha** | Monarch of Plagues | Cruel, Seductive | `MONARCH_IMG_06` |
| **Sillad** | Monarch of Frost | Cold, Eternal | `MONARCH_IMG_07` |

---

## ASSETS

### `MONARCH_IMG_01` — The Architect
**Google Whisk Subject:** `Solo Leveling Architect system creator blinding light being`

```
The Architect's Double Dungeon avatar — a hooded stone figure. The face is split 
down the middle: one side is a serene human face, the other is a skeletal, menacing 
grin with a glowing red eye. He holds a massive stone commandment tablet. 
Background: the dark, ancient stone temple. Eerie blue rim light. Radiates 
absolute authority and unsettling malice. Photorealistic VFX, 8K, cinematic.
```

### `MONARCH_IMG_02` — Nine Temple Statues
**Google Whisk Subject:** `Solo Leveling nine temple statues divine beasts throne room`

```
The colossal Statue of God seated on his throne, wide terrifying grin, eyes 
glowing with blinding light. Surrounding him are the sentinel statues: the 
hooded angel holding the Commandments, and the multi-armed warriors. Stone 
surfaces are cracked and ancient. Beams of eerie blue light from ceiling apertures. 
One statue's hand is beginning to move, stone crumbling. Photorealistic, 8K, 
IMAX, epic scale.
```

### `MONARCH_IMG_03` — The Former Shadow Monarch (Jin-Woo's Father)
**Google Whisk Subject:** `Solo Leveling Shadow Monarch father blue eyes ancient armor`

```
Sung Il-Hwan (Jin-Woo's Father) — a weathered Korean man in his late 40s. Wild, 
long messy black hair and heavy stubble. He wears a tattered orange jumpsuit. His 
eyes are intense, glowing with deep blue energy. Expression: weathered grief 
mixed with quiet pride. He stands in a dim, metallic detention cell or a dark 
void. Strong directional side lighting, dramatic shadows. Photorealistic, 8K, IMAX.

---

### `MONARCH_IMG_04` — Antares
**Google Whisk Subject:** `Solo Leveling Antares dragon monarch human form`

```
Antares, the Monarch of Destruction. Imposing male with wild fiery red-black hair 
and glowing crimson eyes. Massive jagged obsidian plate armor, tattered crimson cape. 
A 100m shadow dragon silhouette forms behind him. Molten lava field background. 
IMAX, 8K, cinematic.
```

### `MONARCH_IMG_05` — Rakan
**Google Whisk Subject:** `Solo Leveling Rakan beast monarch werewolf`

```
Rakan, muscular man with wild white hair and golden wolf-eyes. Tribal fur pelts, 
sharp claws. Mid-leap, body warping into a massive white werewolf. Dark forest 
at night. Photorealistic, 8K.
```

### `MONARCH_IMG_06` — Querehsha
**Google Whisk Subject:** `Solo Leveling Querehsha queen of insects monarch`

```
Querehsha, pale elegant woman with long black/purple hair. Gown of living black 
beetles, insect wings. Swarms of shadow insects orbit her. Toxic green fog. 
Photorealistic, 8K.
```
```

---

## INSTRUCTIONS FOR DEVELOPER
1. 3-column grid with `grid-template-columns: repeat(3, 1fr)`
2. Each panel is a `<div>` with `position: relative`, the image fills it
3. 3D tilt: `gsap.quickTo` on `mouseenter` with `x: -10` `y: -10` `rotateX: 5` `rotateY: -5`, damped at `0.1`
4. No videos — the stillness is the power
5. On mobile: stack to single column, remove 3D tilt

---

## GO TO
→ Previous: [06-Shadow-Extraction.md](06-Shadow-Extraction.md)
→ Next: [08-Weapons.md](08-Weapons.md)
