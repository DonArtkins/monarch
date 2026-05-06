# SPEC 38 — Ambient Audio Toggle Refinement

**Branch:** `feat/38-audio-refinement`  
**Component:** `components/NavBar.tsx` (MODIFY — minor additions only)

## What
Refine the existing audio toggle in `NavBar.tsx`. The current implementation has a working audio toggle with the `.indicator-line` bars animation, but it uses a generic `bgm.mp3` and has no visual feedback beyond the bar animation. This spec upgrades the audio toggle to feel like a dungeon/system UI element — matching the Monarch HUD aesthetic — and adds a subtle spatial audio fade-in on play (GSAP tween on volume) so the audio doesn't snap on harshly. The audio source file path is preserved as `/audio/bgm.mp3`.

## Current State
`NavBar.tsx` currently:
- `isAudioPlaying` state toggles `audioElementRef.current.play()` / `.pause()`
- `isIndicatorActive` state drives `.indicator-line.active` CSS animation
- Four `indicator-line` divs animate up and down when active
- Audio source: `/audio/bgm.mp3`, looping
- No volume fade — audio snaps on/off
- No tooltip or visual label on the toggle button
- Indicator bars use `--monarch-purple` color

## Dependencies
- SPEC 11 (Nav Refinement) — builds on the updated NavBar structure
- SPEC 15 (Typography) — Space Mono for the audio label tooltip
- SPEC 16 (Color System) — `--ice-eye`, `--shadow-purple` tokens

## ⚠️ Preservation Rules
- DO NOT remove `isAudioPlaying`, `isIndicatorActive`, or `audioElementRef` refs
- DO NOT change the `audio` element src, loop, or className
- DO NOT remove the four `indicator-line` divs — add to them, don't replace
- Existing `aria-label` and `aria-pressed` attributes must be preserved
- `useGSAP` for all GSAP calls (no raw `useEffect` for GSAP)
- This spec only modifies the audio button styling and adds volume fade

## Implementation

### Step 1 — Add volume fade-in/out via GSAP

In `NavBar.tsx`, add a `useGSAP` block that drives audio volume via a `gsap.to` tween instead of instant play/pause:

```typescript
// Add to existing NavBar imports (no new packages needed)
import { useRef, useEffect, useState } from "react";
// useGSAP already imported

// Add volumeProxy ref alongside existing refs
const volumeProxyRef = useRef({ vol: 0 });

// Replace the existing useEffect for audio play/pause:
// BEFORE:
// useEffect(() => {
//   if (isAudioPlaying) {
//     audioElementRef.current?.play();
//   } else {
//     audioElementRef.current?.pause();
//   }
// }, [isAudioPlaying]);

// AFTER — add this useGSAP block in NavBar:
useGSAP(() => {
  const audio = audioElementRef.current;
  if (!audio) return;

  if (isAudioPlaying) {
    // Ensure audio starts silently then fades in
    audio.volume = 0;
    audio.play().catch((e) => console.warn("Audio play:", e));

    gsap.to(volumeProxyRef.current, {
      vol: 0.45, // Max volume for ambient — not intrusive
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (audio) audio.volume = volumeProxyRef.current.vol;
      },
    });
  } else {
    gsap.to(volumeProxyRef.current, {
      vol: 0,
      duration: 0.8,
      ease: "power2.in",
      onUpdate: () => {
        if (audio) audio.volume = volumeProxyRef.current.vol;
      },
      onComplete: () => {
        audio?.pause();
      },
    });
  }
}, { dependencies: [isAudioPlaying] });
```

### Step 2 — Upgrade indicator bar colors to ice-eye blue

In `app/globals.css`, update the `.indicator-line` and `.indicator-line.active` styles:

```css
/* Update existing indicator-line rule */
.indicator-line {
  height: 0.25rem;
  width: 1px;
  border-radius: 9999px;
  background-color: var(--ice-eye, #60A5FA); /* Changed from --monarch-purple */
  transition: all var(--monarch-duration-fast) ease-in-out;
}

.indicator-line.active {
  animation: indicator-line 0.5s ease infinite;
  animation-delay: calc(var(--animation-order) * 0.1s);
  box-shadow: 0 0 8px var(--ice-eye, #60A5FA); /* Changed glow color */
}
```

### Step 3 — Add HUD tooltip label to audio button

In the audio button JSX in `NavBar.tsx`, wrap the button in a positioned container and add a Space Mono tooltip that appears on hover:

```tsx
{/* Audio toggle button — add tooltip wrapper */}
<div className="relative ml-10 group/audio">
  <button
    className="flex items-center space-x-0.5"
    onClick={toggleAudioIndicator}
    aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
    aria-pressed={isAudioPlaying}
  >
    <audio
      ref={audioElementRef}
      src="/audio/bgm.mp3"
      className="hidden"
      loop
    />
    {[1, 2, 3, 4].map((bar) => (
      <div
        key={bar}
        className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
        style={{
          animationDelay: `${bar * 0.1}s`,
          // Use CSS custom property for animation-order
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--animation-order" as any]: bar,
        }}
      />
    ))}
  </button>

  {/* HUD tooltip — appears on hover, hidden on mobile */}
  <div
    className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/audio:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block"
    aria-hidden="true"
  >
    <p
      style={{
        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
        fontSize: "0.4rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "var(--ice-eye, #60A5FA)",
        whiteSpace: "nowrap",
        opacity: 0.7,
      }}
    >
      {isAudioPlaying ? "AMBIENT · ON" : "AMBIENT · OFF"}
    </p>
  </div>
</div>
```

### Step 4 — Add GSAP entrance animation for audio bars on nav load

In the NavBar `useGSAP` block (alongside the existing scroll visibility animation), add a staggered entrance for the audio bars:

```typescript
// Add inside an existing or new useGSAP in NavBar — runs once on mount
useGSAP(() => {
  gsap.from(".indicator-line", {
    scaleY: 0,
    transformOrigin: "bottom center",
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.6, // After preloader
  });
});
```

### Step 5 — Update globals.css indicator animation order

The `animation-delay` on `.indicator-line` divs uses `--animation-order` CSS custom property. Ensure the existing keyframe in `globals.css` uses the correct color token. No structural change needed — only the color tokens updated in Step 2.

## Full Modified Button Block (Complete Reference)

This is the complete audio button section as it should appear in `NavBar.tsx` after this spec:

```tsx
{/* Audio toggle — HUD style */}
<div className="relative ml-10 group/audio">
  <button
    className="flex items-center space-x-0.5 py-2"
    onClick={toggleAudioIndicator}
    aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
    aria-pressed={isAudioPlaying}
  >
    <audio
      ref={audioElementRef}
      src="/audio/bgm.mp3"
      className="hidden"
      loop
    />
    {[1, 2, 3, 4].map((bar) => (
      <div
        key={bar}
        className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
        style={{
          animationDelay: `${bar * 0.1}s`,
          ["--animation-order" as any]: bar,
        }}
      />
    ))}
  </button>

  {/* HUD tooltip */}
  <div
    className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/audio:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block"
    aria-hidden="true"
  >
    <p
      style={{
        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
        fontSize: "0.4rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "var(--ice-eye, #60A5FA)",
        whiteSpace: "nowrap",
        opacity: 0.7,
      }}
    >
      {isAudioPlaying ? "AMBIENT · ON" : "AMBIENT · OFF"}
    </p>
  </div>
</div>
```

## Assets Required
- `/public/audio/bgm.mp3` — already exists. No new audio assets needed.
- Optional enhancement: If a dark ambient track is available, swap `bgm.mp3` for a dungeon atmosphere loop. This is out of scope for this spec — asset replacement only, code unchanged.

## Acceptance Criteria
- [ ] Audio toggle still works — play and pause functional
- [ ] `aria-label` updates dynamically: `"Play ambient audio"` / `"Pause ambient audio"`
- [ ] `aria-pressed` reflects current state
- [ ] Audio fades in over `1.8s` when activated (not instant snap-on)
- [ ] Audio fades out over `0.8s` then pauses when deactivated (not instant snap-off)
- [ ] Max audio volume capped at `0.45` — ambient, not intrusive
- [ ] Indicator bars are `--ice-eye` blue (`#60A5FA`), not purple
- [ ] Active indicator bars glow with `box-shadow: 0 0 8px var(--ice-eye)`
- [ ] HUD tooltip (`AMBIENT · ON` / `AMBIENT · OFF`) visible on hover at desktop
- [ ] HUD tooltip hidden on mobile (`hidden md:block`)
- [ ] Indicator bars animate in with staggered `scaleY` entrance on page load
- [ ] `volumeProxyRef` used for GSAP volume tween — not direct `audio.volume` assignment in animation frame
- [ ] No raw `useEffect` added for GSAP — `useGSAP` hook used for volume tween
- [ ] `npm run build` passes — zero TypeScript errors

## Mobile Requirements
- [ ] Audio toggle button touch target is minimum 44px (add `py-2` padding)
- [ ] HUD tooltip is `hidden md:block` — not rendered on mobile
- [ ] Toggle button still works on touch — tap to toggle
- [ ] No overflow from tooltip container on mobile
