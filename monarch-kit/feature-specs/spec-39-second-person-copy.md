# SPEC 39 — Second-Person Narrative Copy Rewrite

**Branch:** `feat/39-second-person-copy`  
**Component:** ALL existing section components (MODIFY — copy only)

## What
Rewrite all body copy across the entire site to use a consistent second-person voice — the visitor IS Sung Jin-Woo. Every sentence speaks directly to the user as if they are living Jin-Woo's story. This is the narrative backbone of MONARCH as an Awwwards-level experience. It transforms the site from a showcase into an immersive story. No layout changes. No animation changes. Only text string replacements in existing components.

## Current State
Most section copy refers to Jin-Woo in third-person ("the weakest hunter", "command the shadows") or uses generic placeholder text. Some sections already have partial second-person copy. This spec standardises all copy across every component to a cohesive second-person narrative arc.

## Dependencies
- SPEC 11 (Nav Refinement) — nav labels are already story-driven
- SPEC 15 (Typography) — Space Mono labels already in place
- SPEC 16 (Color System) — color tokens used in copy label styling
- All new sections (SPEC 28–37) — their copy is already written in second-person; this spec focuses on EXISTING components

## ⚠️ Preservation Rules
- DO NOT change any JSX structure, class names, or animation targets
- DO NOT remove `AnimatedTitle` components — only update the `title` prop string
- DO NOT modify `BentoCard` component API — only update `label`, `title`, `description` props
- Changing text content of an element is safe — no animation targets use text content
- Korean decorative text (`일어나라`, `던전`, etc.) is NOT body copy — do NOT change it

## Voice Rules (CRITICAL — Read Before Editing)

Every line of Monarch copy follows these exact rules:

1. **"You" not "Jin-Woo"** — never refer to Jin-Woo by name in body copy (labels can use it, body cannot)
2. **Present tense** — "You command" not "He commanded"
3. **Short, punchy** — max two sentences per paragraph. Dense and atmospheric
4. **System UI text** (labels, HUD): Cold, clinical, ALL CAPS, Space Mono — like in-game notifications
5. **Narrative copy**: Dense, atmospheric, like a novel excerpt

## Full Copy Rewrite — Component by Component

---

### 1. `components/About.tsx` (ORIGIN section)

**Current sub-label:**
```tsx
<h2 className="font-general text-sm uppercase text-monarch-text-dim md:text-[10px]">
  Welcome to the System
</h2>
```

**Replace with (SPEC 19 already updated this — verify and use):**
```tsx
<h2
  style={{
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "0.625rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "var(--monarch-text-muted)",
  }}
>
  ORIGIN · CARTENON TEMPLE
</h2>
```

**Current AnimatedTitle:**
```
"Disc<b>o</b>ver the Shadow <br/> M<b>o</b>narch's Domain"
```

**Replace with:**
```
"Bef<b>o</b>re the <br/> Syst<b>e</b>m Woke"
```

**Current about-subtext:**
```tsx
<p>The weakest hunter became the strongest sovereign</p>
<p>Command the shadows, conquer every dungeon</p>
```

**Replace with:**
```tsx
<p>Every raid, every dungeon — they called you the weakest.</p>
<p>Then you died. And came back different.</p>
```

---

### 2. `components/Features.tsx` (THE SYSTEM section)

**Current section label:**
```tsx
<p className="font-mono text-xs uppercase tracking-[0.2em] text-monarch-blue" style={{ fontFamily: "monospace" }}>
  SHADOW REALM · DUNGEON CLASSIFICATION
</p>
```

**Replace with:**
```tsx
<p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--ice-eye, #60A5FA)" }}>
  THE SYSTEM · QUEST LOG ACTIVE
</p>
```

**Current AnimatedTitle:**
```
"Into the Sh<b>a</b>dow <br /> Re<b>a</b>lm"
```

**Replace with:**
```
"The Syst<b>e</b>m <br /> Ch<b>o</b>se You"
```

**Current section description:**
```tsx
<p className="max-w-md font-circular text-base text-monarch-text-dim opacity-50 mt-5">
  From the weakest hunter to the sovereign of shadows. Every gate,
  every battle, every shadow extracted — the system chose only one.
</p>
```

**Replace with:**
```tsx
<p className="max-w-md font-circular text-base text-monarch-text-dim opacity-50 mt-5">
  A quest appeared that only you could see. A stat window that rewrote
  every rule. The system didn&apos;t choose the strongest. It chose you.
</p>
```

---

### 3. `components/Story.tsx` (CHRONICLE section)

**Current section label:**
```tsx
<p className="font-general text-sm uppercase text-monarch-text-dim md:text-[10px]">
  The Sovereign&apos;s Chronicle
</p>
```

**Replace with:**
```tsx
<p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--monarch-text-muted)" }}>
  YOUR CHRONICLE · SOVEREIGN&apos;S PATH
</p>
```

**Current AnimatedTitle:**
```
"The st<b>o</b>ry of <br /> a Shadow M<b>o</b>narch"
```

**Replace with:**
```
"Your st<b>o</b>ry. <br /> Your sh<b>a</b>dows."
```

**Current body text:**
```tsx
<p className="mt-3 max-w-sm text-center font-circular text-monarch-text-dim md:text-start">
  From the weakest E-rank hunter to the sovereign of shadows.
  Discover the path of the Shadow Monarch and shape your fate
  amidst infinite dungeons.
</p>
```

**Replace with:**
```tsx
<p className="mt-3 max-w-sm text-center font-circular text-monarch-text-dim md:text-start">
  You started at the bottom. Every hunter looked through you. 
  Then you descended into the Double Dungeon — and came back as 
  something this world had never seen.
</p>
```

**Current Button:**
```tsx
<Button id="dungeon-btn" title="Enter the Dungeon" containerClass="mt-5 bg-monarch-text text-monarch-void" />
```

**Replace with:**
```tsx
<Button id="dungeon-btn" title="Enter Your Story" containerClass="mt-5 bg-monarch-text text-monarch-void" />
```

---

### 4. `components/Contact.tsx` (ARISE CTA section)

**Current label:**
```tsx
<p className="font-general text-[10px] uppercase">Join the Shadow Army</p>
```

**Replace with:**
```tsx
<p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>
  YOUR COMMAND AWAITS
</p>
```

**Current AnimatedTitle (the big display text):**
```tsx
<p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[96px]">
  Let&apos;s b<b>u</b>ild the <br /> new era of <br /> sh<b>a</b>dow w<b>a</b>rfare
</p>
```

**Replace with:**
```tsx
<p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[96px]">
  You b<b>u</b>ilt the <br /> sh<b>a</b>dow <br /> arm<b>y</b>. Ar<b>i</b>se.
</p>
```

**Current CTA Button:**
```tsx
<Button title="Awaken Now" containerClass="mt-10 cursor-pointer bg-primary-50 text-black" />
```

**Replace with:**
```tsx
<Button title="Command Your Army" containerClass="mt-10 cursor-pointer bg-primary-50 text-black" />
```

---

### 5. `components/Footer.tsx` (After SPEC 36 refinement)

**Current footer tagline (left column):**
```tsx
<p className="max-w-xs text-center md:text-left font-circular text-sm text-monarch-text-dim opacity-70">
  From the weakest hunter to the sovereign of shadows. Conquer the system and claim your eternal throne.
</p>
```

**Replace with:**
```tsx
<p style={{ fontFamily: "var(--font-circular, sans-serif)", fontSize: "0.875rem", color: "var(--silver, #C0C8D8)", opacity: 0.5, maxWidth: "28ch" }}>
  You were the weakest. You became the sovereign. The shadow army
  answers only to you. Arise.
</p>
```

---

### 6. `components/Hero.tsx` — Hero copy (SPEC 17 already updates this; verify)

**Current hero sub-copy:**
```tsx
<p className="mb-5 max-w-64 font-robert-regular text-monarch-text-dim">
  Arise from the shadows <br /> Claim your sovereignty
</p>
```

**Replace with (consistent with SPEC 17):**
```tsx
<p className="mb-5 max-w-sm font-robert-regular text-monarch-text-dim text-sm sm:text-base">
  You are the weakest hunter. <br /> Until the system chose you.
</p>
```

**Current CTA Button:**
```tsx
<Button id="enter-system" title="Enter System" leftIcon={<TiLocationArrow />} containerClass="bg-monarch-blue text-monarch-void flex-center gap-1" />
```

**Replace with:**
```tsx
<Button id="enter-system" title="Arise" leftIcon={<TiLocationArrow />} containerClass="bg-monarch-blue text-monarch-void flex-center gap-1" />
```

---

### 7. `components/NavBar.tsx` — ARISE button (desktop + mobile)

**Current desktop ARISE button:**
```tsx
<Button id="arise-button" title="Arise" rightIcon={<TiLocationArrow />} containerClass="..." />
```

**Keep title as `"Arise"` — already correct.**

**Current mobile ARISE button:**
```tsx
<Button id="mobile-arise-button" title="Arise" ... />
```

**Keep as is — already correct.**

---

### 8. BentoCard copy updates in `components/Features.tsx`

These are handled by SPEC 21–26 (bento card updates). Verify final state matches second-person voice:

| Card | Label (Space Mono) | Description (second-person) |
|---|---|---|
| THE SYSTEM | `THE SYSTEM · CLASS E → SHADOW MONARCH` | *"A quest appeared that only you could see. Daily missions. Stat windows. Skill extraction. The rules of this world broke for you alone."* |
| ARISE | `SHADOW MONARCH · THE TITLE NONE HELD` | *"You are Sung Jin-Woo. The only living Shadow Monarch. Every shadow you command bends to your will — forever."* |
| IGRIS | `IGRIS · SHADOW KNIGHT GENERAL · FIRST EXTRACTED` | *"The Red Knight who refused to kneel — until you made him rise as shadow. First extracted. Most loyal. Most deadly."* |
| DUNGEONS | `S-RANK DUNGEON · ENTER AT YOUR OWN RISK` | *"Every gate hides a world that wants you dead. You've entered them all. And you've always walked back out."* |
| JOIN THE LEGION | `THE LEGION GROWS` | *"Join the shadow army. Command the abyss. Arise now."* |
| THE GATES | `THE GATES · E THROUGH S · RED TO BLACK` | *"Cyan. Yellow. Red. Black. Each gate a new abyss. Each one an invitation."* |

---

## Copy Style Reference Card

Use this table when writing any additional copy for the project:

| Context | Voice | Example |
|---|---|---|
| Hero headline | Bold, declarative | `"MONARCH"` |
| Section labels (Space Mono) | Clinical, system-like | `"ORIGIN · CARTENON TEMPLE"` |
| AnimatedTitle | Cinematic, compressed | `"Before the System Woke"` |
| Body paragraphs | Second-person, present tense | `"You died. And came back different."` |
| CTA buttons | Imperative, direct | `"Arise"` / `"Command Your Army"` |
| Stat/badge labels | Cold, numeric | `"SHADOW ARMY: ∞ SOLDIERS"` |
| Korean watermarks | Decorative, aria-hidden | `"일어나라"` (arise) |

## Acceptance Criteria
- [ ] `About.tsx` sub-label reads `ORIGIN · CARTENON TEMPLE`
- [ ] `About.tsx` AnimatedTitle reads `"Bef<b>o</b>re the <br/> Syst<b>e</b>m Woke"`
- [ ] `About.tsx` subtext is second-person: `"Every raid... they called you the weakest."` / `"Then you died."`
- [ ] `Features.tsx` section label reads `THE SYSTEM · QUEST LOG ACTIVE`
- [ ] `Features.tsx` AnimatedTitle reads `"The Syst<b>e</b>m <br /> Ch<b>o</b>se You"`
- [ ] `Features.tsx` body paragraph is second-person voice
- [ ] `Story.tsx` label reads `YOUR CHRONICLE · SOVEREIGN'S PATH`
- [ ] `Story.tsx` AnimatedTitle reads `"Your st<b>o</b>ry. <br /> Your sh<b>a</b>dows."`
- [ ] `Story.tsx` body paragraph is second-person
- [ ] `Story.tsx` button reads `"Enter Your Story"`
- [ ] `Contact.tsx` label reads `YOUR COMMAND AWAITS`
- [ ] `Contact.tsx` big display text uses second-person voice
- [ ] `Contact.tsx` CTA button reads `"Command Your Army"`
- [ ] `Hero.tsx` sub-copy reads `"You are the weakest hunter. Until the system chose you."`
- [ ] `Hero.tsx` CTA button reads `"Arise"`
- [ ] `Footer.tsx` tagline is second-person voice
- [ ] All BentoCard descriptions confirmed second-person (cross-check SPEC 21–26)
- [ ] No body copy refers to Jin-Woo in third person ("he", "Jin-Woo")
- [ ] `npm run build` passes — zero TypeScript errors (JSX entities: `&apos;` for apostrophes)

## Mobile Requirements
- [ ] No layout regressions from text changes — copy length approximately matches original
- [ ] All JSX apostrophes use `&apos;` entity (no bare `'` in JSX)
- [ ] No text overflow at 375px from longer second-person phrases
- [ ] `max-w-sm` or `max-w-md` constraints preserved on all paragraph elements
