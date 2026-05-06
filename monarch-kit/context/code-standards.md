# Code Standards — Monarch Upscale

## General

- TypeScript `strict: true` is non-negotiable.
- No `any` without a documented comment explaining why.
- All new components are `"use client"` — this is a client-side animated app.
- Keep modules small: one component per file, one responsibility per component.
- Fix root causes — never layer UI workarounds over animation bugs.

## TypeScript Standards

```typescript
// ✅ GOOD — explicit interface, precise props
interface RankCardProps {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}

// ❌ BAD
const RankCard = (props: any) => { ... }
```

## GSAP Standards (CRITICAL)

### Always use `useGSAP` from `@gsap/react`
```typescript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins at MODULE level — outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All GSAP code scoped to containerRef
    gsap.from(".element", {
      opacity: 0,
      y: 60,
      ease: "power2.out",
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef }); // scope = automatic cleanup

  return <div ref={containerRef}>...</div>;
};
```

### Never animate layout properties
```typescript
// ❌ BAD — causes reflows, jank
gsap.to(".card", { width: "50%", height: 300 });

// ✅ GOOD — GPU composited only
gsap.to(".card", { x: 100, opacity: 0, scale: 0.95 });
```

### `will-change` policy
```typescript
// Only set during active animation, remove after
gsap.to(".element", {
  x: 200,
  onStart: () => element.style.willChange = "transform",
  onComplete: () => element.style.willChange = "auto",
});
```

## Component File Structure

```typescript
"use client";
// 1. React imports
import { useRef, useState } from "react";
// 2. GSAP imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 3. Component imports
import AnimatedTitle from "./AnimatedTitle";
import VideoPlayer from "./VideoPlayer";

// 4. Plugin registration (module level)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5. Types/interfaces
interface Props { ... }

// 6. Component
const MyComponent = ({ ... }: Props) => {
  // 7. Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 8. State
  const [isActive, setIsActive] = useState(false);
  
  // 9. GSAP animations
  useGSAP(() => { ... }, { scope: containerRef });
  
  // 10. Render
  return <div ref={containerRef}>...</div>;
};

export default MyComponent;
```

## Tailwind v4 Standards

- Use CSS custom properties for design tokens — `var(--monarch-void)`.
- Use Tailwind utility classes for layout and spacing.
- Avoid raw hex in `className` strings.
- `@utility` in `globals.css` for reusable patterns.

```typescript
// ✅ GOOD
<div className="bg-monarch-void text-monarch-text border-hsla">

// ❌ BAD
<div style={{ backgroundColor: "#030014", color: "#E8E8E8" }}>
```

## Video Component Standards

```typescript
// ✅ ALWAYS use VideoPlayer for non-hero videos
<VideoPlayer
  src="/videos/shadow-army.mp4"
  className="absolute left-0 top-0 size-full object-cover"
/>

// Hero videos use direct <video> with their own loading logic
```

## Image Standards

```typescript
// ✅ ALWAYS use Next.js Image
import Image from "next/image";

<Image
  src="/images/about-bg.jpeg"
  alt="Descriptive alt text"
  fill
  className="object-cover"
  priority // above-fold only
/>
```

## Space Mono Labels

All system/HUD labels use this pattern:
```tsx
<p
  className="font-mono text-[10px] uppercase tracking-[0.2em] text-monarch-blue"
  style={{ fontFamily: "monospace" }}  // fallback until font loads
>
  LABEL · SUBLABEL
</p>
```

## Korean Watermark Pattern

```tsx
<div 
  className="absolute pointer-events-none select-none"
  aria-hidden="true"
>
  <h1 
    className="special-font font-black uppercase leading-none text-monarch-text"
    style={{ 
      fontSize: "25vw",
      opacity: 0.04,
      transform: "rotate(-20deg)",
    }}
  >
    일어나라
  </h1>
</div>
```

## Section Template

```tsx
const NewSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".reveal-item", {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="section-id"
      ref={containerRef}
      className="min-h-dvh w-screen bg-monarch-void"
    >
      <div className="container mx-auto px-5 md:px-10 py-20">
        {/* Space Mono label */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-monarch-blue" style={{ fontFamily: "monospace" }}>
          SECTION · LABEL
        </p>
        
        {/* AnimatedTitle */}
        <AnimatedTitle
          title="Section <b>T</b>itle"
          containerClass="mt-5 text-monarch-text"
        />
        
        {/* Content */}
        <div className="reveal-item mt-10">
          {/* ... */}
        </div>
      </div>
    </section>
  );
};
```

## Anti-Patterns

```typescript
// ❌ Raw useEffect for GSAP
useEffect(() => {
  gsap.from(".el", { opacity: 0 }); // NO CLEANUP = MEMORY LEAK
}, []);

// ❌ Inline styles for design tokens
<div style={{ backgroundColor: "#030014" }}>

// ❌ Animating layout-affecting properties
gsap.to(".el", { width: 500, margin: 20 });

// ❌ Decorative animation with no UX purpose
gsap.to(".logo", { rotation: 360, repeat: -1, duration: 3 });

// ❌ will-change on static elements
<div style={{ willChange: "transform" }}> {/* always on = wasteful */}

// ❌ Missing alt text
<Image src="..." alt="" /> // accessibility failure
```

## Quality Gate Checklist

Before marking any SPEC done:
- [ ] `npm run build` passes — zero TypeScript errors
- [ ] `npm run lint` passes — zero ESLint errors
- [ ] All GSAP animations use `useGSAP` with proper scope
- [ ] No `will-change` on static elements
- [ ] All images have meaningful `alt` text
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Mobile layout verified — no horizontal overflow
- [ ] VideoPlayer used for all non-hero videos
- [ ] Korean decorative text has `pointer-events: none` and `aria-hidden`
