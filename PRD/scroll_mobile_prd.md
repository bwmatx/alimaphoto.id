# PERFORMANCE UPDATE — MOBILE SCROLL OPTIMIZATION

## Critical Requirement

Mobile experience must prioritize **lightweight scrolling performance**.

The current implementation (especially About Us page with profile cards, animations, and transitions) must NOT degrade scroll performance on mobile devices.

---

# Mobile Performance Rules (MANDATORY)

## 1. No Heavy Scroll Animations on Mobile

On mobile devices:

DO NOT USE:

- continuous auto-scroll animations
- infinite carousels that run on scroll
- heavy GSAP scroll triggers
- parallax effects tied to scroll position
- simultaneous multi-layer animations
- opacity + transform + blur combinations during scroll

---

## 2. Reduce Animation Complexity on Mobile

If animation exists:

### Mobile behavior must be:

- simple fade-in only
- simple slide-up only
- no chained animations
- no stagger animation on large lists
- no real-time DOM recalculation during scroll

---

## 3. Profile Card System (About Us Page)

For the team/profile section:

### Desktop:

- full interactive carousel allowed

### Mobile:

- MUST be simplified

Replace carousel with:

- static vertical layout OR
- manual swipe with native scroll (no JS animation engine)

DO NOT:

- auto-slide cards
- animate card switching
- apply motion transitions between profiles
- use framer-motion style transitions on scroll

---

## 4. Scroll Behavior Rules

Mobile scrolling must feel:

- native
- instant
- smooth by OS
- not JS-driven

Avoid:

- scroll hijacking
- scroll locking
- scroll snapping with heavy calculations
- requestAnimationFrame scroll listeners

---

## 5. JavaScript Constraints (Mobile)

On mobile:

- minimize JS execution during scroll
- avoid scroll event listeners unless absolutely necessary
- avoid layout recalculation loops
- avoid DOM updates triggered by scroll

If interaction is required:

Use simple click/tap only.

---

## 6. Image Optimization

To improve scroll performance:

- use compressed images
- avoid large hero images on mobile
- use lazy loading for non-critical images
- ensure images do not trigger layout shift

---

## 7. GSAP / Animation Rules

If GSAP is used:

### Mobile:

- disable ScrollTrigger-heavy logic
- disable parallax timelines
- reduce to simple entrance animations only
- prefer CSS transitions over GSAP where possible

---

## 8. Performance Target

Mobile page must feel:

- instant load perception
- no scroll lag
- no frame drops during scroll
- stable 60fps scrolling behavior

If any animation reduces scroll performance:

IT MUST BE REMOVED OR SIMPLIFIED.

---

## FINAL RULE

Mobile experience priority:

**Performance > Animation > Visual Complexity**

Never sacrifice scroll smoothness for visual effects.
