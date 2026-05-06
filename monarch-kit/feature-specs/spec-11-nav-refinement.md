# SPEC 11 — Story-Based Navigation Refinement

**Branch:** `feat/11-nav-refinement`  
**Component:** `components/NavBar.tsx`

## What
Replace current generic nav items with Solo Leveling story-driven labels. Add active section highlight via IntersectionObserver. Polish the floating nav appearance.

## Current State
Nav items: `["Dungeons", "Shadows", "Chronicle", "About", "Arise"]`  
Logo: `/images/logo.svg` — already working.

## New Nav Items
```
MONARCH (logo — left)
ORIGIN → scrolls to #about
THE SYSTEM → scrolls to #features
SHADOW ARMY → scrolls to #shadow-army (new section)
DUNGEONS → scrolls to #gates (new section)
MONARCHS → scrolls to #monarchs (new section)
[ARISE] → CTA button (top right, glowing blue border, dark fill)
```

## Implementation

### 1. Update nav items array
```typescript
const navItems = [
  { label: "Origin", href: "#about" },
  { label: "The System", href: "#features" },
  { label: "Shadow Army", href: "#shadow-army" },
  { label: "Dungeons", href: "#gates" },
  { label: "Monarchs", href: "#monarchs" },
];
```

### 2. Active section tracking
Use IntersectionObserver to track which section is in view. Add `data-active` state to nav links.

```typescript
const [activeSection, setActiveSection] = useState<string>("");

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

### 3. Style — active link glows faint blue
```typescript
className={`nav-hover-btn ${activeSection === item.href.slice(1) ? "text-monarch-blue" : ""}`}
```

### 4. ARISE CTA button style
```typescript
<Button
  title="Arise"
  rightIcon={<TiLocationArrow />}
  containerClass="bg-transparent border border-monarch-blue text-monarch-blue hover:bg-monarch-blue hover:text-monarch-void transition-all duration-300 md:flex hidden items-center justify-center gap-1"
/>
```

### 5. Typography upgrade
Nav items: Space Mono font, `letter-spacing: 0.15em`, uppercase, thin weight.
```typescript
style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
```

### 6. Scroll behavior
Change `href` to use smooth scroll on click:
```typescript
const handleNavClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
};
```

## Acceptance Criteria
- [ ] Nav shows story-driven labels.
- [ ] Active section link has blue glow.
- [ ] ARISE button has glowing blue border style.
- [ ] Clicking nav items smooth-scrolls to sections.
- [ ] Mobile menu reflects updated labels.
- [ ] `npm run build` passes.

## Mobile Requirements
- Mobile menu shows updated labels in same large font style.
- ARISE button in mobile menu has updated border style.
- No layout shifts.
