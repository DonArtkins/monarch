# SPEC — The Gates
## Section 04 of 12 | [LIGHT REALM] — You Entered Every One

---

## STORY BEAT
**"They said the stronger the gate, the darker the inside. You stopped counting after the tenth S-rank. You just kept walking through."**

The gates are the boundary between the real world and the dungeon. This section displays the Red Gate in all its horror — a massive crimson portal ripping open above a destroyed Seoul district. The frame-by-frame hover effect makes the gate *breathe* with the visitor's presence.

---

## VISUAL TONE
- **Background:** `#F0F4FF` ice white — a return to light after the void
- **Lighting:** The gate IS the light source. Everything else is in shadow.
- **Energy:** Red crimson energy bleeds from the gate's edges. Lightning.
- **Frame Sequence:** 40 individual frames, scrubbed by horizontal mouse position

---

## AWWWARDS QUALITY NOTES
- The gate must feel ALIVE. As the mouse moves, the gate should feel like it is reacting to the visitor.
- Frame rate must be smooth — no dropped frames, no lag on the scrub
- Gate energy must be the brightest thing on the page
- A subtle crimson dust particle system floats in front of the gate (10 particles, `opacity: 0.3`, `mix-blend-mode: screen`)
- Korean watermark `관문` (Gate) at `opacity: 0.03`, bottom-left

---

## FLOW CONNECTION
- **Entering:** Wipe from the Bento system — a flash of white as the page transitions to light
- **Exiting:** A shadow energy dissolve (white → crawling shadow) reveals The Ranks

---

## ASSETS

### `GATE_SEQ_VID_01` → 40 Extracted Frames
- **Generated via:** Start frame + End frame → Google Flow → 40 frames extracted at 15fps
- **File format:** `gate_frame_001.jpg` through `gate_frame_040.jpg`
- **Usage:** Frame-by-frame hover scrub using `mouseX / windowWidth * 40`
- **Story beat:** From outside the gate → inside the dungeon. You crossed.

**Start Frame:**
```
Exterior of a massive S-rank RED gate — 60 m tall, glowing blood crimson and deep 
scarlet, suspended above a destroyed Seoul district. Night. Emergency barriers and 
abandoned vehicles in foreground. Camera: ground level, 50 m away. Gate surface 
churns with dark red energy. Through the surface: darkness and faint monster shapes. 
Volumetric red fog, lightning. Photorealistic, IMAX, 8K.
```

**End Frame:**
```
Camera has moved through — now INSIDE the S-rank dungeon beyond the red gate. 
Looking back toward gate exit (a red light portal behind). Ahead: vast dark dungeon 
landscape, broken terrain, massive bones of ancient creatures, glowing red crystals, 
distant S-rank monsters as silhouettes. Fog at ground level. Sky: swirling dark energy, 
no stars. This is inside the most dangerous dungeon. Photorealistic, IMAX, 8K.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. Load all 40 frames in parallel using `Promise.all()` — preload first 5, lazy-load rest
2. Use a `ResizeObserver` to recalculate `frameIndex` on window resize
3. Frame rate: cap at 60fps via `requestAnimationFrame` — no `setInterval`
4. Preload strategy: first 5 frames = `preload="auto"`, rest = `preload="none"` until visible
5. On mobile: replace frame-scrub with a smooth auto-play loop (tap to pause)

---

## GO TO
→ Previous: [03-The-System.md](03-The-System.md)
→ Next: [05-Ranks.md](05-Ranks.md)
