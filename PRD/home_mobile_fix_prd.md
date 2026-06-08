# home_mobile_fix_prd.md

## Mobile Hero Section Fixes

The current mobile hero section has multiple layout issues that must be corrected.

### Issue 1 — Background Image Not Fully Responsive

The hero background image is currently cropped inconsistently and does not scale properly across mobile devices.

Requirements:

- Background image must be fully responsive.
- Maintain visual composition across all screen sizes.
- Avoid awkward cropping of important subjects.
- Avoid stretched images.
- Use responsive image handling.
- Ensure smooth scaling during slideshow transitions.

The hero slideshow must always fill the available hero area without creating layout artifacts.

---

### Issue 2 — Empty Space Below Hero

There is visible empty space at the bottom of the hero section on mobile devices.

This behavior is not acceptable.

Requirements:

- Hero section height must dynamically adapt to content.
- Remove all unwanted blank areas.
- Remove excess spacing below CTA buttons.
- Ensure the background image extends to the bottom edge of the hero section.
- No visible gap should appear between the hero section and the next section.

The transition between Hero and the next section must feel seamless.

---

### Issue 3 — Navbar/Header Spacing

The hero content currently appears too close to the navigation bar.

Requirements:

- Increase top spacing between navbar and hero content.
- Create a more balanced visual hierarchy.
- Improve breathing room above the tagline.
- Ensure the layout feels premium and intentional.

Recommended spacing:

Desktop:
Maintain existing layout.

Tablet:
Adjust proportionally.

Mobile:
Add sufficient top padding so the hero content does not feel crowded beneath the navbar.

Target visual appearance:

The tagline should begin comfortably below the header, creating a luxury editorial feel.

---

### Issue 4 — Hero Content Vertical Balance

Current content placement feels top-heavy.

Requirements:

- Rebalance hero content vertically.
- Maintain strong visual focus on headline.
- Ensure content remains centered within the available hero area.
- Keep CTA buttons visible without excessive scrolling.

The hero section should feel intentionally composed rather than compressed.

---

### Issue 5 — Mobile Hero Height

Current implementation appears to rely on a fixed viewport height that creates layout inconsistencies.

Requirements:

- Avoid hardcoded heights that create empty areas.
- Use responsive sizing.
- Ensure hero content determines the minimum required space.
- Prevent overflow and unwanted whitespace.

Hero must adapt naturally to:

- Small phones
- Standard phones
- Large phones
- Foldable devices

---

### Expected Result

The mobile hero section should feel like a premium photography landing page:

- Fully responsive slideshow background
- No empty space below content
- Better spacing below navbar
- Balanced content positioning
- Clean transition into the next section
- Luxury and professional appearance consistent with the Alima Photo design system
