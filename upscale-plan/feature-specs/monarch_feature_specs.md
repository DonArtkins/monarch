# MONARCH — 40 Feature Specs
> Awwwards-Level Refinement Plan  
> Rule: Keep ALL Zentry layout structure, section order, and animation architecture. Refine, elevate, and make it Solo Leveling story-driven.  
> Story: "You are Sung Jin-Woo. The weakest hunter. Until the system chose you."

---

## STORY FLOW (Narrative Arc Across All Sections)

```
HERO → ORIGIN → THE DOUBLE DUNGEON → THE SYSTEM → SHADOW EXTRACTION 
→ THE GATES → THE RANKS → THE MONARCHS → THE SHADOW ARMY → BEYOND → ARISE
```

---

## NAV & GLOBAL

### SPEC 12 — Story-Based Navigation Refinement
**What:** Replace current nav items with Solo Leveling story-driven labels.  
**Current:** Generic nav  
**New Nav Items:**
- `MONARCH` (logo/wordmark — left)
- `ORIGIN` → scrolls to About/Origin section
- `THE SYSTEM` → scrolls to Bento/System section
- `SHADOW ARMY` → scrolls to Army section
- `DUNGEONS` → scrolls to Gates section
- `MONARCHS` → scrolls to Monarchs section
- `[ARISE]` → CTA button (top right, glowing blue border, dark fill)

**Style:** Floating nav, backdrop-blur `8px`, dark `rgba(0,0,0,0.4)` background on scroll. Nav links in `letter-spacing: 0.15em`, uppercase, thin weight. Active section link glows faint blue.  
**Assets:** None — pure CSS/JS refinement.

---

### SPEC 13 — Custom Shadow Energy Cursor
**What:** Replace default cursor with custom animated ring cursor.  
**Behavior:**
- Default state: Thin glowing ring (~20px), color `#60A5FA`, with a trailing dot center
- On hover over any CTA/button: Ring expands to 40px, fills slightly, inner glyph animates to a gate/eye icon
- On hover over videos/images: Ring becomes a crosshair with subtle blue glow
- Trail: 6 fading ghost rings follow at 50ms intervals (pure GSAP)

**Implementation:** Two `div` elements — `cursor-dot` and `cursor-ring`. GSAP `ticker` updates position. `data-cursor` attributes on elements trigger state changes.  
**Assets:** SVG gate icon for hover state — `CURSOR_ICON_01.svg`

---

### SPEC 14 — Gate Crack Preloader (Entry Experience)
**What:** Replace generic loader with a cinematic gate-crack opening sequence.  
**Sequence (total: 2.4s, skippable after 1.2s):**
1. `0.0s` — Pure black screen. Silence.
2. `0.3s` — A single horizontal razor-thin line appears dead center (electric blue `#3B82F6`, 1px)
3. `0.7s` — Line cracks vertically from center outward — SVG path animation, branching crack like dungeon stone splitting
4. `1.1s` — Crack widens — deep purple/blue light bleeds through (`#6D28D9` inner glow)
5. `1.6s` — Text slams in: **`ARISE`** — full viewport width, heavy compressed font, center
6. `2.0s` — Everything shatters/dissolves — GSAP clip-path wipe outward revealing site beneath
7. `2.4s` — Site fully visible. Preloader `display: none`.

**Implementation:** SVG crack paths + GSAP timeline. No video file. Pure code.  
**Assets:** `PRELOADER_CRACK.svg` — branching crack path geometry

---

### SPEC 15 — Film Grain + Noise Texture Global Overlay
**What:** Add subtle film grain overlay across the entire site.  
**Implementation:** Fixed `div` element, `z-index: 9999`, `pointer-events: none`, `mix-blend-mode: overlay`. Background uses SVG `feTurbulence` noise. Animated subtly at 8fps for organic feel. Opacity: `0.035` on light sections, `0.06` on dark sections.  
**Why:** This is the single most-noticed Awwwards detail on dark sites. Adds cinematic depth.

---

### SPEC 16 — Typography System Upgrade
**What:** Replace Zentry rounded font on Monarch with a sharp, cinematic typeface pair.  
**Fonts:**
- **Display/Hero:** `Bebas Neue` or `PP Mondwest` — tall, compressed, all-caps. Used for section titles, hero headline `MONARCH`
- **Body/Sub:** `Inter` (already in stack) — keep for readability
- **Accent/Labels:** `Space Mono` — monospace, used for nav items, rank labels, system UI text (feels like in-game HUD)

**Changes:**
- Hero `MONARCH` headline: viewport-width (`font-size: clamp(80px, 15vw, 180px)`), negative letter-spacing `-0.03em`
- All section titles: `font-size: clamp(40px, 7vw, 96px)`, condensed
- System/rank labels: `Space Mono`, uppercase, small, `letter-spacing: 0.2em`
- Add Korean accent text (`일어나라` = "ARISE" in Korean) as a decorative watermark in some sections — `opacity: 0.04`, huge, rotated

---

### SPEC 17 — Color System + Depth Layers
**What:** Replace flat purple swap with a full depth-layered dark world color system.

| Token | Value | Usage |
|---|---|---|
| `--void` | `#000000` | True base, preloader |
| `--abyss` | `#020208` | Page background |
| `--deep` | `#0A0A1A` | Section backgrounds |
| `--shadow` | `#0D0F2A` | Card backgrounds, overlays |
| `--royal` | `#1E0A4A` | Accent panels, borders |
| `--monarch-blue` | `#2B4FFF` | Primary energy, gates |
| `--ice-eye` | `#60A5FA` | Jin-Woo's eye glow, CTAs, cursor |
| `--shadow-purple` | `#6D28D9` | Secondary energy, extractions |
| `--silver` | `#C0C8D8` | Body text |
| `--white` | `#F0F4FF` | Headlines |
| `--gate-red` | `#FF2B2B` | S-rank red gate accents |
| `--gate-yellow` | `#F5A623` | A-rank gate accents |

**Implementation:** CSS custom properties on `:root`. Update all existing color references.

---

## HERO SECTION

### SPEC 18 — Hero Videos (5 Clips, Light Background Like Zentry)
**What:** Hero section uses the same Zentry clip-container structure — multiple looping videos in absolutely positioned containers with clip-path reveal on scroll.  
**Background:** Light/off-white initially (like Zentry) so the clip containers and hexagonal overlay are visible against it.  
**Videos (5 clips, all looping, muted, autoplay):**

| ID | Clip Content | Position |
|---|---|---|
| `HERO_VID_01` | Jin-Woo walks into glowing red S-rank gate in destroyed city | Center-left |
| `HERO_VID_02` | Shadow army marching in dark void, thousands strong | Center-right |
| `HERO_VID_03` | Ruler's Authority — Jin-Woo's hand blue energy erupts | Top-right |
| `HERO_VID_04` | Gate crack appears in city mid-air, darkness pours out | Bottom-left |
| `HERO_VID_05` | Shadow extraction — black shadows rise from fallen enemy | Bottom-right |

**Placeholder:** Repeat existing hero assets (current city destruction video/image) across all 5 clip slots until generated assets are ready.  
**Copy overlay:**
- Main: `MONARCH` (Spec 05 display font, full width)
- Sub: `The weakest hunter. Chosen by the system. Shadow Monarch.`
- CTA: `[ARISE]` button

---

### SPEC 19 — Hero Hexagonal Particle System
**What:** Preserve Zentry's hexagonal floating animation over hero section.  
**Upgrade:** Change hex color from teal to `--ice-eye` (`#60A5FA`). Increase opacity slightly. Add a faint `--shadow-purple` second layer of hexagons at 0.3x scale floating in opposite direction.  
**Implementation:** Existing Zentry hex canvas/SVG animation. CSS color variable update only.

---

## ORIGIN SECTION (About)

### SPEC 20 — Portal Scroll Expansion (Double Dungeon Image)
**What:** Preserves Zentry's centerpiece — the small image that expands via GSAP `clip-path` to fill the viewport on scroll. This is the transition from light hero to dark world.  
**Image:** `PORTAL_IMG_01` — The Double Dungeon stone corridor. Torchlit. Ancient Korean temple architecture carved into a dungeon. Massive stone statues flanking the corridor. Gate of light at the end.  
**Behavior:**
- Initially: Small `clip-path: inset(10%)` rounded square, center of screen
- On scroll: GSAP ScrollTrigger expands clip-path to `inset(0%)` filling viewport
- Once filled: Background shifts from light to dark — rest of the page is dark from here
- The expansion should feel like falling INTO the dungeon

**Placeholder:** Use existing Jin-Woo portrait/about image as placeholder.

---

### SPEC 21 — Origin Copy Block ("Before The System")
**What:** The two floating copy panels in Zentry's about section become Jin-Woo's origin story.  
**Panel 1 (left float):**
- Label: `E-RANK · HUNTER ID #4715`
- Headline: `THE WEAKEST`
- Body: *"Every raid, every dungeon — they called him the weakest. Sung Jin-Woo survived on borrowed time, a footnote in a world of gods."*

**Panel 2 (right float):**
- Label: `DOUBLE DUNGEON · INCIDENT ZERO`
- Headline: `THE SYSTEM CHOSE`
- Body: *"Trapped in the Cartenon Temple. Every hunter dead. Then — a message appeared. One that only he could see."*

**Style:** Panels fade from `--silver` to `--white` as they scroll into viewport (GSAP color tween). Body text in thin weight. Labels in `Space Mono`.

---

## THE SYSTEM SECTION (Bento Grid)

### SPEC 22 — Bento Card 01: "THE SYSTEM" — Rotating Status Windows Video
**What:** First large bento card. Takes up ~2 columns. Video background.  
**Video:** `BENTO_VID_01` — Multiple Solo Leveling system UI windows (status screens, quest logs, skill trees) floating and rotating in 3D space in a dark void. Like a card carousel but the cards ARE the system windows. Glowing blue borders. Very unique, very Zentry.  
**Copy:** Label: `THE SYSTEM` / Sub: `Daily quests. Stat allocation. Skill extraction. The system that broke the rules of this world.`  
**Placeholder:** Use existing hero background image.

---

### SPEC 23 — Bento Card 02: "ARISE" — Jin-Woo Monarch Transformation Video
**What:** Second bento card. Animated single-image video (like Zentry's second card — one great image made cinematic).  
**Video:** `BENTO_VID_02` — Jin-Woo at the exact moment he achieves Shadow Monarch title. Left eye glowing cold blue, shadows swirling around him like a living cloak, coat flowing. Camera very slowly pushes in. Wind effect, particles.  
**Copy:** Label: `SHADOW MONARCH` / Sub: `The title no living hunter had ever held. Sovereign of all shadow.`  
**Placeholder:** Use existing Jin-Woo portrait image.

---

### SPEC 24 — Bento Card 03: "SHADOW ARMY" — Igris Battle Video
**What:** Tall narrow card (1 column, ~2 rows).  
**Video:** `BENTO_VID_03` — Igris the Shadow Knight General, black armor, red eyes, raising his massive sword. Shadows and dark energy swirl. Black background like the character exists in a void. Looks 3D, like a movie prop shot.  
**Copy:** Label: `IGRIS · SHADOW KNIGHT GENERAL` / Sub: `First extracted. Most loyal. Most deadly.`  
**Placeholder:** Use existing shadow soldier image.

---

### SPEC 25 — Bento Card 04: "DUNGEONS" — S-Rank Interior Video
**What:** Wide card (~2 columns, 1 row).  
**Video:** `BENTO_VID_04` — Interior of an S-rank dungeon. Massive stone columns, glowing blue/purple crystals embedded in walls, fog rolling across the floor, distant growling creatures. Cinematic establishing shot. Dark, dangerous.  
**Copy:** Label: `S-RANK DUNGEON` / Sub: `Every gate hides a world. Every world wants you dead.`  
**Placeholder:** Use existing dungeon/dark background image.

---

### SPEC 26 — Bento Card 05: "ARISE" — CTA Card
**What:** Colored CTA card. Currently purple `MORE COMING SOON!` — upgrade this.  
**New Design:** Background: `--shadow-purple` → `--monarch-blue` diagonal gradient. Large display type: `JOIN THE LEGION`. Sub: `Enter the shadow realm. Arise.`. Button: `[ARISE NOW]` with border glow. A single blue eye glyph watermark behind the text at `opacity: 0.08`.  
**Interaction:** On hover — the gradient shifts direction (GSAP), slight scale up `1.02`.

---

### SPEC 27 — Bento Card 06: "THE GATES" — Gate Opening Video
**What:** Last bento card. Large.  
**Video:** `BENTO_VID_06` — A massive dungeon gate (blue/black, E-rank to contrast) cracking open, white light bleeding through the fractures, then swinging wide. Camera slow push toward it. The moment before entering.  
**Copy:** Label: `THE GATES · E THROUGH S` / Sub: `Cyan. Yellow. Red. Black. Each gate a new abyss.`  
**Placeholder:** Use existing gate/hero city image.

---

### SPEC 28 — Bento Card Glass Shimmer + Tilt Effect
**What:** All 6 bento cards have the Zentry glass shimmer outline tilt effect. Preserve and enhance.  
**Upgrade:** 
- Shimmer border: Change from teal to `rgba(96, 165, 250, 0.4)` — the ice-eye blue
- On tilt: A faint `--gate-red` glow appears on the card edge opposite to mouse direction (like light from inside a dungeon)
- Tilt magnitude: `max 8deg` rotation on X and Y
- Transition: `cubic-bezier(0.23, 1, 0.32, 1)` — weighted, not linear

---

## THE GATES SECTION (Story/Portal Section)

### SPEC 29 — Red Gate Frame-by-Frame Hover Section
**What:** The immersive story image in Zentry becomes an S-rank Red Gate portal. On mouse hover, it feels like you are walking INTO the gate using frame-extracted video frames played by mouse position.  
**Implementation:**
1. Generate `GATE_FRAME_VID_01` — a slow camera push through a red S-rank gate into a dungeon
2. Extract ~40 frames from the video (JPG, named `gate_frame_001.jpg` → `gate_frame_040.jpg`)
3. On mouse X movement across the image: frame index maps to mouse horizontal position (mousemove → `frameIndex = Math.floor((mouseX / width) * 40)`)
4. On mouse Y: subtle parallax on background layer
5. Result: Moving mouse across the image gives a fluid 3D parallax + depth entry effect

**Overlay copy:** `THE RED GATE · S-RANK` / `DANGER LEVEL: ABSOLUTE` in `Space Mono`  
**Mix-blend:** `mix-blend-mode: luminosity` on overlay, same as Zentry's story image treatment  
**Placeholder:** Use existing hero background image clipped.

---

## THE RANKS SECTION (New Section — Between Gates and Monarchs)

### SPEC 30 — Dark ↔ Light Realm Shift Transition
**What:** Zentry transitions between dark and light sections with a smooth GSAP wipe. Preserve this for Monarch.  
**Monarch version:** The transition visual is a dungeon gate opening — as you scroll past the dark Gates section, a horizontal light wipe from left to right reveals the next (slightly lighter, `#0D0F2A` not pure black) section. Feels like stepping from a dungeon exterior into a lit throne room.  
**Implementation:** GSAP `ScrollTrigger` + `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` horizontal wipe on a full-width overlay div.

---

### SPEC 31 — The Ranks: E Through S Visual Progression
**What:** New section (between Gates section and Monarchs section). Shows the hunter rank system from E to S.  
**Layout:** Horizontal scroll-driven strip OR vertical stacked reveal. 6 rank cards:

| Rank | Color | Character/Scene |
|---|---|---|
| E | Grey `#9CA3AF` | Jin-Woo as E-rank, looking small, ordinary city backdrop |
| D | Green `#22C55E` | Jin-Woo first dungeon, cautious |
| C | Blue `#3B82F6` | Jin-Woo growing in power, first shadow extraction |
| B | Purple `#8B5CF6` | Jin-Woo commanding first shadow soldiers |
| A | Gold `#F59E0B` | Jin-Woo in full armor, powerful |
| S | Red `#EF4444` + glow | Shadow Monarch — Jin-Woo at peak, eye glowing blue |

**Animation:** Each card enters from the right as you scroll. The rank badge pulses with its color. Copy for each rank is a brief line from Jin-Woo's story at that rank.  
**Assets:** `RANKS_IMG_01` through `RANKS_IMG_06`

---

## SHADOW EXTRACTION SECTION (New Section)

### SPEC 32 — Shadow Extraction Story Cards
**What:** New dark section. 4 horizontal story cards, each showing a key shadow extraction moment. These are the most cinematic assets on the site.  
**Card layout:** Full-height cards in a horizontal scroll or a 2x2 grid.

| Card | Subject | Asset |
|---|---|---|
| 01 | **Igris** — First shadow extraction, the Red Knight | `EXTRACTION_VID_01` |
| 02 | **Beru** — The Ant King, kneeling in loyalty | `EXTRACTION_VID_02` |
| 03 | **Baran** — Ice Elf King (reimagined: extraction SUCCEEDED — rewrite the story) | `EXTRACTION_VID_03` |
| 04 | **The Dragon** — Massive winged shadow dragon rises from bones | `EXTRACTION_VID_04` |

**Each card:** Video background + character name in `Space Mono` label + extraction rank badge + one-line story note  
**On hover:** Card brightens slightly, a shadow extraction energy effect rises from the bottom of the card (GSAP keyframe)

---

## THE MONARCHS SECTION

### SPEC 33 — The Monarchs: The Architect + Temple Statues
**What:** New dark section. Introduces the higher powers — the beings Jin-Woo must overcome beyond Season 2.

**Layout:** 3 panels side by side:

| Panel | Subject | Asset |
|---|---|---|
| Left | **The Architect** — The system's creator, a radiant faceless figure of light | `MONARCH_IMG_01` + `MONARCH_VID_01` |
| Center | **Nine Temple Statues** — The divine beast guardians Jin-Woo must destroy | `MONARCH_IMG_02` |
| Right | **Jin-Woo's Father** — The original Shadow Monarch, massive, stoic | `MONARCH_IMG_03` |

**Copy:**  
- Section label: `BEYOND THE GATES`  
- Headline: `THE MONARCHS`  
- Body: *"Seven rulers. Nine divine statues. One Architect. And a father who was the Shadow Monarch before you."*  
**Style:** Each panel tilts on hover (same as bento). Dark `--abyss` bg, panels have `--royal` border.

---

## WEAPONS + SKILLS SECTION (New Section)

### SPEC 34 — Weapons of the Shadow Monarch
**What:** Showcase Jin-Woo's key weapons and skills. Zentry-style hexagonal shape frames (like the light section with the ninja).

**3 Weapon Cards:**

| # | Weapon | Asset |
|---|---|---|
| 1 | **Kamish's Wrath** — Twin daggers, lightning crackling | `WEAPON_IMG_01` |
| 2 | **Demon King's Longsword** — Baran's sword, icy blue | `WEAPON_IMG_02` |
| 3 | **Shadow Monarch Armor** — Full black plate with eye on chest | `WEAPON_IMG_03` |

**The Igris Sword-Outside-Frame Effect:**  
- Right side of the section: `ARMY_IMG_01` — Igris in full armor, sword angled so the blade extends OUTSIDE the image frame boundary (using `overflow: visible`, negative margin on sword)
- Sword positioned with `transform: rotate(-15deg) translateY(-20px)` extending past the card edge
- On hover: Sword slowly shifts — GSAP tween, `+20px` travel, easing `power2.inOut`
- This creates the exact "3D element leaving the frame" effect from Slam Dunk

---

## SHADOW ARMY CTA SECTION

### SPEC 35 — Shadow Army CTA (Replaces Current "LET'S BUILD" Section)
**What:** The big full-screen CTA before the footer. Currently "LET'S BUILD THE NEW ERA OF SHADOW WARFARE."  
**Keep:** The big display type treatment.  
**Upgrade:**

**Layout:** Two columns  
- Left: Big display type, 3 lines:
  - `THE SHADOW`  
  - `ARMY`  
  - `RISES.`  
- Sub: `Command the legion. Conquer every dungeon. Rule every rank.`  
- CTA: `[ARISE — JOIN THE SHADOW ARMY]` — full-width button, `--shadow-purple` → `--monarch-blue` gradient

- Right: `ARMY_VID_01` — Jin-Woo turns to face camera with shadow army kneeling behind him (wide cinematic). Video loops.

**Floating images (keep from current Monarch):** The existing small image panels — update them with `EXTRACTION_IMG_01` (Igris) and `EXTRACTION_IMG_02` (Beru) as placeholders, eventual final assets.

---

## BEYOND SEASON 2 SECTION (New Teaser Section)

### SPEC 36 — "Beyond Season 2" Story Teaser
**What:** New section teasing the unreleased narrative — Jin-Woo meets his father, battles Temple Statues, takes control of the System itself. This is the "future" of the gamified Monarch universe.

**Layout:** Full-screen dark section. Three beat panels scrolling in:
1. `BEYOND_IMG_01` — Jin-Woo's father, the previous Shadow Monarch, monolithic, ancient
2. `BEYOND_IMG_02` — Temple statues awakening, divine beasts cracking open their stone
3. `BEYOND_VID_01` — Jin-Woo on the System throne, taking over the Architect's seat

**Copy:**  
- Label: `SEASON III · BEYOND THE VEIL`  
- Headline: `YOUR FATHER FELL.`  
- Body: *"The Absolute Being built this world. The Architect maintained it. And now — the Shadow Monarch sits on the throne of the system itself."*  
- Note: `MONARCH UNIVERSE · SEASONS III — IV · COMING SOON`

---

## FOOTER

### SPEC 37 — Footer Refinement ("THE SHADOW ARMY ARISE")
**What:** Keep current footer structure. Upgrade content.  
**Left:** Wordmark `MONARCH` + tagline: `The Shadow Monarch. The System. The Arise.` + social links (update icons to match current Monarch socials)  
**Center:** Footer image — `FOOTER_IMG_01` — wide cinematic of entire shadow army assembled, Jin-Woo tiny in the center foreground  
**Right:** Quick links matching the new nav (ORIGIN, THE SYSTEM, SHADOW ARMY, DUNGEONS, MONARCHS)  
**Bottom strip:** `일어나라 · ARISE · THE SHADOW ARMY · MONARCH · 2025` in `Space Mono`, thin, small  
**Background:** Darkest `--void` black. Very fine noise overlay at `0.08` opacity.

---

## ARISE SCENE SECTION (New Section — After Extraction, Before Monarchs)

### SPEC 38 — The Failed Arise / Reimagined Success Scene
**What:** A dedicated storytelling moment — the Baran (Ice Elf King) scene where in canon the extraction failed. In MONARCH's universe, we reimagine it: it succeeded.

**Layout:** Split screen:
- Left half: Dark, shadowy — `ARISE_IMG_01` — the real canon: extraction fails, Baran's spirit disperses
- Right half: Glowing, powerful — `ARISE_IMG_02` — the reimagined: Baran's shadow rises, loyal, massive

**Copy (center dividing line):**
- Label: `THE MOMENT EVERYTHING CHANGED`
- Left sub: `CANON: THE EXTRACTION FAILED`  
- Right sub: `MONARCH: HE AROSE`

**Transition:** On scroll, the left half darkens to black as the right half brightens — GSAP clip-path wipe from center dividing line. Dramatic. Emotional beat in the story.  
**Assets:** `ARISE_IMG_01`, `ARISE_IMG_02`

---

## AUDIO + PERFORMANCE

### SPEC 39 — Ambient Audio Toggle
**What:** Preserve Zentry's audio toggle. Update the audio concept for Monarch.  
**Audio:** A loop of:
- Deep dungeon ambience — distant growls, stone dripping, low hum of gate energy
- Subtle orchestral undertone — like Solo Leveling OST but reimagined atmospheric
- Volume: `-18dB` default, very subtle  
**Source:** Use a royalty-free dark ambient track as placeholder.

---

### SPEC 40 — Scroll Copy Voice — Second Person Narrative
**What:** Throughout the site, all section body copy is written in second person — *you* are Jin-Woo. This is what makes Monarch feel like a story, not a website.

**Rewrite all body copy with this voice:**
- Hero: *"You are the weakest hunter alive. Until the day the system chose you."*
- About: *"Every raid, every dungeon — they underestimated you. Then you died. And came back different."*
- System: *"A quest appeared. Only you could see it. That was the beginning."*
- Army: *"You didn't just level up. You built an army of shadows."*
- Gates: *"Red gates. Black gates. They were warnings. You treated them as invitations."*
- Monarchs: *"Seven rulers wanted you dead. Your father was one of them."*

---

### SPEC 41 — Performance, Lazy Loading + Mobile
**What:** Ensure Awwwards judges score full marks on usability (30% weight).  
**Implementations:**
- All `<video>` elements: `loading="lazy"`, `preload="none"`, load on IntersectionObserver entry
- Videos on mobile: Replaced with high-quality static poster images (video disabled on `max-width: 768px`)
- Images: WebP format, `srcset` for 1x/2x. Use `loading="lazy"` on all below-fold images
- GSAP: All animations have `will-change: transform` set only during animation, removed after
- Frame-by-frame gate section: On mobile, replaced with a single static image + subtle CSS parallax
- Fonts: `font-display: swap`, preload the two display fonts
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, FID < 100ms
