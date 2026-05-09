# SPEC — Shadow Army CTA
## Section 11 of 12 | [DARK VOID] — Arise.

---

## STORY BEAT
**"The army is assembled. The gates are open. You stand before ten thousand shadows and raise your hand. They kneel. This is what they waited for. This is what you chose."**

The final dark section's climax. Two columns: the left is text and the CTA button. The right is video — the army kneeling. This is the "join us" moment. The army is ready. You are ready.

---

## VISUAL TONE
- **Background:** `#020208` abyss — the void, going deeper
- **Lighting:** The right column IS the light source. Jin-Woo's blue energy illuminates the page.
- **Energy:** Blue-white energy radiates from the video. A subtle bloom effect on the CTA button.
- **Layout:** Two-column, 50/50, `gap: 4rem`
- **Typography:** The CTA says `ARISE` in zentry, massive, with a pulsing glow.

---

## AWWWARDS QUALITY NOTES
- The video must be the most impactful shot on the entire site. The army kneeling, Jin-Woo turning to the viewer.
- The CTA button must glow blue — `box-shadow: 0 0 20px rgba(96, 165, 250, 0.6)`
- On hover over the CTA button: the glow intensifies, and the army in the video reacts — a flicker of blue energy
- GSAP `stagger` on CTA load: line 1, line 2, button, each appearing 0.2s after the last
- Korean watermark `일어나라` (ARISE) at `opacity: 0.04`, bottom-center

---

## FLOW CONNECTION
- **Entering:** The Beyond section fades to the void
- **Exiting:** A wipe to light — `ARISE` triggers the transition to the Contact section

---

## ASSETS

### `ARMY_VID_01` — Jin-Woo Turns to Camera
**Google Whisk Subject:** `Solo Leveling shadow army Jin-Woo army back to camera turns around`

**Start Frame:**
```
Jin-Woo stands with his back to camera, facing his assembled shadow army — ten thousand 
soldiers in perfect formation in a dark void. Blue energy from his raised hand 
illuminates the nearest rows. Wide establishing shot, the scale overwhelming. 
Photorealistic, IMAX, 8K.
```

**End Frame:**
```
He has turned 180 degrees, now facing the camera directly. Left eye blazing blue, 
shadows moving. Expression: commanding, cold, sovereign. He is looking directly at 
YOU — the viewer. Medium shot, eye level. This is the "join us" moment. 
Photorealistic, IMAX, 8K.
```

**Video Motion Prompt (Flow):**
```
Locked wide shot for 2 seconds. Then the man begins to turn — slowly, deliberately, 
180 degrees toward camera. As he turns, his left eye ignites blue. Shadow energy 
swirls around him. He completes the turn and looks directly into the lens. Expression 
unchanged — cold, absolute, inviting. Army behind remains kneeling. 5–6 seconds. 
The power is in the eye contact.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. Two-column `display: grid; grid-template-columns: repeat(2, 1fr)`
2. Left column: headline (2 lines), subtext, CTA button
3. Right column: video, looping, `muted`, `autoplay` (after scroll into view)
4. CTA button: `position: relative`, with an animated `::after` pseudo-element for the glow
5. On click, smooth scroll to contact section with a `scrollTo` animation

---

## GO TO
→ Previous: [10-Beyond.md](10-Beyond.md)
→ Next: [12-Contact.md](12-Contact.md)
