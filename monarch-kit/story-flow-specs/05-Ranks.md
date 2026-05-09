# SPEC — The Ranks
## Section 05 of 12 | [LIGHT REALM] — You Climbed. They Watched.

---

## STORY BEAT
**"E-rank hunters don't get posters. E-rank hunters get sent to die in C-rank gates. You remember feeling small. You remember every gate being bigger than you. And then — nothing was bigger than you."**

This section is about the climb. E → D → C → B → A → S → NATIONAL. The user scrolls horizontally as Jin-Woo's rank card upgrades. Each rank has a unique energy color and sound. The final scroll reveal is the National Level Hunters — the ceiling of human power.

---

## VISUAL TONE
- **Background:** `#F0F4FF` ice white — light above light, as if emerging
- **Lighting:** Brighter and brighter as the ranks progress. E-rank is flat fluorescent. S-rank is golden hour.
- **Energy:** The only energy here is Jin-Woo left eye. It gets brighter as the ranks progress.
- **Layout:** Horizontal scroll with `scroll-snap-type: x mandatory` — each rank is a full-width card
- **Typography:** `E` → `D` → `C` → `B` → `A` → `S` → `NAT` filling the card in massive outlined text

---

## AWWWARDS QUALITY NOTES
- Each rank card is a full-screen panel. The scroll snaps on each.
- The transition between ranks should NOT be a simple slide. Use a GSAP `x` translation with a slight scale down on the leaving card and scale up on the entering card.
- `E` rank: desaturated, flat lighting, cheap gear. `S` rank: golden hour, perfect armor, eye blazing.
- Add a subtle parallax on the background — it moves slower than the cards.
- Korean watermark `등급` (Rank) at `opacity: 0.03`, bottom-right

---

## FLOW CONNECTION
- **Entering:** The shadow energy from The Gates dissolves upward, revealing the light
- **Exiting:** Shadow energy drips down from the top of the screen like black rain, consuming the light as it enters the Extraction section

---

## ASSETS

### `RANKS` — 7 Static Images (E, D, C, B, A, S, National)
- **Framing:** Same angle, same pose, only the power and gear change
- **File format:** `RANKS_IMG_01.webp` through `RANKS_IMG_07.webp`
- **Story beat:** The boy who was nothing becomes everything

### E-Rank / Rank Image 01
```
A young Korean man in his early 20s, lean athletic build, sharp jawline, messy black 
hair. BOTH eyes normal dark brown. Wearing cheap standard hunter gear: thin padded 
jacket, basic helmet, no armor. Standing at a low-rank dungeon entrance (grey stone, 
dim light). He looks uncertain, slightly tired. Other hunters pass without noticing. 
Framed small against environment. Photorealistic, 8K, natural lighting, cinematic.
```

### S-Rank / Rank Image 06
```
Sung Jin-Woo in Shadow Monarch form. Same lean athletic build, same face. Matte black 
tactical longcoat, left eye blazing ice blue, shadow army visible behind. He stands at 
the entrance of a red S-rank gate — the gate seems small compared to his presence. Coat 
moves in supernatural wind. Shadow soldiers flank him. He is everything now. Same 
framing as E-rank for visual contrast. Photorealistic, 8K, IMAX, golden hour lighting.
```

### National Level / Rank Image 07 (Christopher Reed)
```
Christopher Reed in a tactical grey suit, blonde hair, eyes blazing with blue 
lightning. Behind him, a massive spiritual solar aura. Destroyed mansion background. 
The absolute ceiling of human strength. Photorealistic, 8K, cinematic.
```

| Rank | Energy Aura | Environment | Status |
| :--- | :--- | :--- | :--- |
| **S** | Blazing Gold `#FFD700` | S-Rank Gate, blinding light | The Peak |
| **NATIONAL** | Electric Blue `#00D4FF` | Christopher Reed, solar aura | The Authority |

*(Generate D, C, B, A using the same framing but with progressively upgraded gear, brighter lighting, and more confidence.)*

---

## INSTRUCTIONS FOR DEVELOPER
1. `scroll-snap-type: x mandatory` on the container, `scroll-snap-align: center` on each card
2. GSAP `ScrollTrigger` on the container with `pin: true` and `scrub: 0.5`
3. On desktop: use mouse wheel to scroll horizontally. On mobile: native horizontal scroll.
4. Each card has a subtle `hue-rotate` animation on the background gradient — very slow, barely perceptible
5. Add `cursor: grab` on desktop, `cursor: grabbing` while scrolling

---

## GO TO
→ Previous: [04-The-Gates.md](04-The-Gates.md)
→ Next: [06-Shadow-Extraction.md](06-Shadow-Extraction.md)
