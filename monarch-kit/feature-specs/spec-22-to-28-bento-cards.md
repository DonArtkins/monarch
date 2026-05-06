# SPEC 22 — Bento Card 01: THE SYSTEM (Rotating Status Windows)

**Branch:** `feat/22-bento-card-01`  
**Component:** `components/Features.tsx` (MODIFY — BentoCard content only)

## What
Update the first large bento card (full-width hero card) from the current placeholder content to the "THE SYSTEM" card featuring rotating holographic status windows. The BentoCard component API (`src`, `label`, `title`, `description`) is preserved — only the props passed to it change.

## Current State
```tsx
<BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md sm:h-80 md:h-[65vh]">
  <BentoCard
    src="/videos/father.mp4"
    label="THE SYSTEM · SPEC 11"
    title={<>The Sy<b>s</b>tem</>}
    description="Daily quests. Stat allocation. Skill extraction. The system that broke the rules of this world."
    labelColor="text-monarch-blue"
  />
</BentoTilt>
```

## Dependencies
- SPEC 16 (Typography) — `system-label` class
- SPEC 17 (Color System) — `--ice-eye`, `--deep` tokens

## Implementation

### Update BentoCard 01 props

```tsx
{/* SPEC 22 — THE SYSTEM — Full-width hero card */}
<BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md sm:h-80 md:h-[65vh]">
  <BentoCard
    src="/videos/father.mp4"  // TODO: Replace with /videos/BENTO_VID_01.mp4 when generated
    label="THE SYSTEM · CLASS E → SHADOW MONARCH"
    title={<>The Syst<b>e</b>m</>}
    description="A quest appeared that only you could see. Daily missions. Stat windows. Skill extraction. The rules of this world broke for you alone."
    labelColor="text-ice-eye"
  />
</BentoTilt>
```

### Update BentoCard `labelColor` prop type to accept any Tailwind color class

The `BentoCard` interface already accepts `labelColor?: string` — no change needed. The class `text-ice-eye` will work after SPEC 16 adds the `--color-ice-eye` token.

## Acceptance Criteria
- [ ] Full-width bento card shows updated label and description
- [ ] `text-ice-eye` class applied to label color
- [ ] `label` string updated to `THE SYSTEM · CLASS E → SHADOW MONARCH`
- [ ] Video placeholder still plays via VideoPlayer
- [ ] `npm run build` passes

## Mobile Requirements
- [ ] Card height `h-64` on mobile preserved
- [ ] Description text wraps correctly at 375px

---

# SPEC 23 — Bento Card 02: ARISE (Shadow Monarch Transformation)

**Branch:** `feat/23-bento-card-02`  
**Component:** `components/Features.tsx` (MODIFY — BentoCard content only)

## What
Update the ARISE bento card (Shadow Monarch) with final copy and updated video placeholder + label.

## Implementation

```tsx
{/* SPEC 23 — ARISE — Shadow Monarch card */}
<BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:h-auto">
  <BentoCard
    src="/videos/story-arise.mp4"  // TODO: Replace with /videos/BENTO_VID_02.mp4
    label="SHADOW MONARCH · THE TITLE NONE HELD"
    title={<>Ar<b>i</b>se</>}
    description="You are Sung Jin-Woo. The only living Shadow Monarch. Every shadow you command bends to your will — forever."
    labelColor="text-ice-eye"
  />
</BentoTilt>
```

## Acceptance Criteria
- [ ] Label updated to `SHADOW MONARCH · THE TITLE NONE HELD`
- [ ] Description updated to second-person voice
- [ ] `text-ice-eye` applied to label
- [ ] `npm run build` passes

---

# SPEC 24 — Bento Card 03: IGRIS (Shadow Knight General)

**Branch:** `feat/24-bento-card-03`  
**Component:** `components/Features.tsx` (MODIFY — BentoCard content only)

## What
Update the tall Igris bento card with final copy.

## Implementation

```tsx
{/* SPEC 24 — IGRIS — tall narrow card */}
<BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:row-span-2 md:h-auto">
  <BentoCard
    src="/videos/shadow-army.mp4"  // TODO: Replace with /videos/BENTO_VID_03.mp4
    label="IGRIS · SHADOW KNIGHT GENERAL · FIRST EXTRACTED"
    title={<>Igr<b>i</b>s</>}
    description="The Red Knight who refused to kneel — until you made him rise as shadow. First extracted. Most loyal. Most deadly."
    labelColor="text-monarch-text-dim"
  />
</BentoTilt>
```

## Acceptance Criteria
- [ ] Label includes `FIRST EXTRACTED`
- [ ] Description second-person
- [ ] `npm run build` passes

---

# SPEC 25 — Bento Card 04: DUNGEONS (S-Rank Interior)

**Branch:** `feat/25-bento-card-04`  
**Component:** `components/Features.tsx` (MODIFY — BentoCard content only)

## What
Update the Dungeons bento card with final copy and gate-red label.

## Implementation

```tsx
{/* SPEC 25 — DUNGEONS — wide card */}
<BentoTilt className="bento-tilt_1 h-48 sm:h-64 md:h-auto">
  <BentoCard
    src="/videos/legion.mp4"  // TODO: Replace with /videos/BENTO_VID_04.mp4
    label="S-RANK DUNGEON · ENTER AT YOUR OWN RISK"
    title={<>Dun<b>g</b>eons</>}
    description="Every gate hides a world that wants you dead. You've entered them all. And you've always walked back out."
    labelColor="text-gate-red"
  />
</BentoTilt>
```

## Acceptance Criteria
- [ ] `text-gate-red` label color
- [ ] Description updated to second-person
- [ ] `npm run build` passes

---

# SPEC 26 — Bento Card 05: ARISE CTA Card Upgrade

**Branch:** `feat/26-bento-card-05`  
**Component:** `components/Features.tsx` (MODIFY — CTA card div)

## What
Replace the current "More coming soon" purple CTA bento card with a fully upgraded "JOIN THE LEGION" CTA card. Features a diagonal gradient background, shadow extraction energy animation, and a glowing CTA button.

## Current State
```tsx
<BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
  <div className="flex size-full flex-col justify-between bg-monarch-purple p-5 group cursor-pointer relative overflow-hidden">
    <p>THE JOURNEY CONTINUES</p>
    <div>
      <h1>M<b>o</b>re co<b>m</b>ing s<b>o</b>on</h1>
      <TiLocationArrow className="mt-4 scale-[3] ..." />
    </div>
  </div>
</BentoTilt>
```

## Implementation

```tsx
{/* SPEC 26 — CTA card — JOIN THE LEGION */}
<BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
  <div
    className="flex size-full flex-col justify-between p-5 group cursor-pointer relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, var(--shadow-purple, #6D28D9) 0%, var(--monarch-energy, #2B4FFF) 100%)",
    }}
  >
    {/* Animated shadow energy overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at 50% 120%, rgba(96, 165, 250, 0.15) 0%, transparent 60%)",
        opacity: 0,
        transition: "opacity 0.5s ease",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 group-hover:[&>div]:opacity-100 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="w-full h-full opacity-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at 50% 120%, rgba(96, 165, 250, 0.2) 0%, transparent 60%)",
        }}
      />
    </div>

    {/* Blue eye watermark */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity: 0.06, fontSize: "6rem" }}
    >
      👁
    </div>

    <p
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.625rem",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "rgba(240, 244, 255, 0.6)",
      }}
      className="relative z-10"
    >
      THE LEGION GROWS
    </p>

    <div className="relative z-10">
      <h1
        className="special-font max-w-64"
        style={{
          fontFamily: "var(--font-zentry, sans-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          fontWeight: 900,
          textTransform: "uppercase",
          color: "var(--white, #F0F4FF)",
          lineHeight: 0.95,
        }}
      >
        J<b>o</b>in the <br /> Legi<b>o</b>n
      </h1>
      <div className="mt-4 flex items-center gap-3">
        <TiLocationArrow
          className="scale-[2] text-ice-eye group-hover:rotate-45 transition-transform duration-500"
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(240, 244, 255, 0.5)",
          }}
        >
          ARISE NOW
        </span>
      </div>
    </div>
  </div>
</BentoTilt>
```

## Acceptance Criteria
- [ ] CTA card has diagonal gradient from shadow-purple to monarch-energy
- [ ] Hover reveals subtle radial glow overlay
- [ ] Label reads `THE LEGION GROWS` in monospace
- [ ] Title reads `J<b>o</b>in the <br/> Legi<b>o</b>n`
- [ ] Arrow rotates 45° on hover
- [ ] `npm run build` passes

---

# SPEC 27 — Bento Card 06: THE GATES (Gate Opening Video)

**Branch:** `feat/27-bento-card-06`  
**Component:** `components/Features.tsx` (MODIFY — last bento slot)

## What
The last bento card (currently the decorative "Shadow Army" video card) becomes "THE GATES" card — a gate opening teaser that links to the upcoming Gates section.

## Current State
The last slot is a decorative card:
```tsx
<BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
  <div className="relative size-full">
    <VideoPlayer src="/videos/legion.mp4" ... />
    <p>SHADOW ARMY · LEGION</p>
  </div>
</BentoTilt>
```

## Implementation

Replace the decorative card with a `BentoCard`:

```tsx
{/* SPEC 27 — THE GATES — teaser card */}
<BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
  <BentoCard
    src="/videos/legion.mp4"   // TODO: Replace with /videos/BENTO_VID_06.mp4
    label="THE GATES · E THROUGH S · RED TO BLACK"
    title={<>The G<b>a</b>tes</>}
    description="Cyan. Yellow. Red. Black. Each gate a new abyss. Each one an invitation."
    labelColor="text-gate-cyan"
  />
</BentoTilt>
```

## Acceptance Criteria
- [ ] Card label `text-gate-cyan` applied
- [ ] Title reads `The G<b>a</b>tes`
- [ ] Description references rank color metaphor
- [ ] `npm run build` passes

---

# SPEC 28 — Bento Glass Shimmer + Tilt Effect Upgrade

**Branch:** `feat/28-bento-tilt-upgrade`  
**Component:** `components/Features.tsx` (MODIFY — BentoTilt component)

## What
Upgrade the existing `BentoTilt` 3D tilt interaction. Change the shimmer border color from the default to ice-eye blue. Add a gate-red counter-edge glow effect on the side opposite to mouse position. Refine easing to the cinematic curve from SPEC 16.

## Current State
`BentoTilt` in `Features.tsx`:
- Uses `gsap.quickTo` for `rotationY` and `rotationX`
- `transformPerspective: 1200`
- Max tilt: ±10deg
- No border shimmer on tilt
- `will-change-transform` always on

## Implementation

### Update BentoTilt with enhanced shimmer and easing

```typescript
const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!itemRef.current) return;

    gsap.set(itemRef.current, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
    });

    const xTo = gsap.quickTo(itemRef.current, "rotationY", {
      duration: 0.7,
      ease: "power3.out",  // Updated from power2
    });
    const yTo = gsap.quickTo(itemRef.current, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!itemRef.current) return;
      const { left, top, width, height } = itemRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 16;  // Updated from 20 → 16 for subtlety
      const tiltY = (relativeX - 0.5) * -16;

      yTo(tiltX);
      xTo(tiltY);

      // Dynamic ice-eye border shimmer following tilt direction
      const shimmerX = relativeX * 100;
      const shimmerY = relativeY * 100;
      itemRef.current.style.setProperty(
        "--shimmer-pos",
        `${shimmerX}% ${shimmerY}%`
      );
    };

    const handleMouseEnter = () => {
      if (!itemRef.current) return;
      itemRef.current.style.willChange = "transform";
      gsap.to(itemRef.current, {
        boxShadow: "0 0 0 1px rgba(96, 165, 250, 0.25), 0 20px 40px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!itemRef.current) return;
      yTo(0);
      xTo(0);
      gsap.to(itemRef.current, {
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (itemRef.current) itemRef.current.style.willChange = "auto";
        },
      });
    };

    const element = itemRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove as any);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove as any);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: itemRef });

  return (
    <div
      ref={itemRef}
      className={`${className} transition-shadow duration-300`}
      style={{
        // Remove always-on will-change — now set dynamically on mouseenter
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
```

### Update `will-change-transform` class

Remove `will-change-transform` from the `BentoTilt` JSX (now set dynamically in event handlers). This reduces persistent GPU memory usage.

## Acceptance Criteria
- [ ] Tilt max angle reduced to ±16deg (from ±20)
- [ ] `power3.out` easing on rotationX / rotationY
- [ ] `will-change: transform` set on `mouseenter`, removed on `mouseleave`
- [ ] `box-shadow` border glow on `mouseenter`, removed on `mouseleave`
- [ ] No memory leaks — all event listeners cleaned up in return function
- [ ] `npm run build` passes

## Mobile Requirements
- [ ] Tilt disabled on touch devices (no `touchmove` handler added — mouse events only)
- [ ] Cards render flat (no tilt) on mobile touch — existing behavior preserved
