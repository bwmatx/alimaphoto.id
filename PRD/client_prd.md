# Client Testimonials Section PRD

## Objective
Create a premium client testimonials section for the Alima Photo landing page using **native HTML, CSS, and JavaScript**.  
The section must keep the **same vertical size and overall footprint** as the current testimonials section, while changing only the visual model and motion behavior.

The styling must follow the existing direction in `landingpage_prd.md`:
- luxury black visual identity
- gold accent color `#D5AF36`
- clean editorial feel
- modern, minimal, premium
- responsive-first
- smooth motion, elegant interaction

---

## Core Requirement
This section is a redesign of the current client testimonial section, not a new section with a different height or layout footprint.

### Non-negotiable layout rules
- The section height must remain the same as the current client testimonial section.
- Do not make the section taller on desktop.
- Do not make the section taller on mobile.
- The visual model may change, but the section must occupy the same space.
- On desktop, show **3 cards visible in the layout**.
- On mobile, show **2 cards visible in the layout**.
- On mobile, cards must be **narrower** than desktop cards.
- The mobile layout must not increase the section’s total height.
- Keep the section visually balanced without forcing extra vertical scrolling.

---

## Implementation Approach
The component must be implemented with:
- `HTML`
- `CSS`
- `JavaScript`

Do **not** place all logic inside `script.js`.  
If needed, create a separate script file specifically for this section.

### Recommended file structure
- `index.html`
- `assets/css/style.css`
- `assets/css/components/testimonials.css`
- `assets/js/script.js`
- `assets/js/testimonials-section.js`

Use a dedicated JavaScript file for testimonial behavior if the section needs:
- auto-looping animation
- duplicate content handling
- responsive card logic
- scroll-triggered effects
- viewport-based initialization

---

## Section Structure
The section should contain:
1. A section wrapper
2. A small label or eyebrow title
3. A main heading
4. A short supporting description
5. The testimonial card group
6. Optional subtle motion or floating effect

The layout should remain clean and premium, with strong spacing discipline and no visual clutter.

---

## Visual Direction
The design should feel like a luxury editorial portfolio section.

### Style notes
- Background should remain aligned with the existing black luxury system.
- Use gold accent sparingly for highlights, labels, or emphasis.
- Cards should feel refined, not heavy.
- Borders, shadows, and contrast should be subtle.
- Typography should remain elegant and readable.
- Card spacing should feel intentional and high-end.

### Card styling
- Cards should be narrower on mobile.
- Cards should feel slightly elevated and polished.
- Avoid oversized paddings that make the section taller.
- Keep text compact enough to preserve the section height.
- Use rounded corners consistent with the rest of the site.
- The card design should still feel premium on small screens.

---

## Responsive Behavior

### Desktop
- Show **3 cards** in the testimonial area.
- Cards can appear in a row or as a controlled animated column system.
- The layout must fit within the existing section height.
- Keep the motion elegant and not distracting.

### Mobile
- Show **2 cards** only.
- Cards must be narrower.
- Preserve the same section height.
- Avoid stacking that creates a longer section.
- Do not increase vertical space just because the screen is smaller.

### Tablet
- Follow the same section height rules.
- Use the closest balanced arrangement between desktop and mobile.
- Preserve readability and premium spacing.

---

## Motion / Interaction
The section may use subtle motion, but it must not break layout stability.

Allowed interactions:
- gentle vertical loop
- soft marquee-style movement
- slow fade-in on viewport entry
- minimal hover lift on desktop
- smooth easing

Not allowed:
- aggressive scrolling effects
- large bounce animations
- height-changing transitions
- anything that makes the section longer than the current version

If animation is used, it should feel refined and cinematic.

---

## Data Structure
Each testimonial item should support:
- `text`
- `image`
- `name`
- `role`

Optional fields may include:
- `company`
- `rating`
- `location`

Use real or valid stock image placeholders if original assets are not available yet.  
Images must be easy to replace later with real client photos.

---

## Asset Handling
If real client images are not ready:
- use stock images that are known to exist
- keep image placement consistent
- replace assets cleanly later without changing layout

Do not hardcode anything that will make asset replacement difficult.

---

## Script Requirements
If the section requires animation or responsive card control:
- create a dedicated script file for this section
- keep `script.js` clean
- isolate testimonial-specific logic in a separate file

The testimonial script should handle:
- card duplication if needed for looping
- viewport detection if needed
- responsive initialization
- optional animation setup

---

## Component Behavior Summary
- Same section height as the current testimonial block
- Only the visual model changes
- Desktop shows 3 cards
- Mobile shows 2 cards
- Mobile cards are narrower
- No added vertical length
- Premium black-and-gold styling
- Native HTML/CSS/JS implementation
- Separate script file allowed and preferred if logic grows

---

## Acceptance Criteria
The implementation is correct only if:
- the section still matches the original section height
- desktop shows 3 visible testimonial cards
- mobile shows 2 visible testimonial cards
- mobile cards look narrower but remain readable
- no extra vertical space appears on either breakpoint
- styling matches the luxury direction in `landingpage_prd.md`
- the section is implemented with native HTML, CSS, and JavaScript
- testimonial logic is not dumped entirely into `script.js`

---

## Open Questions Before Build
- What testimonial copy should be used first?
- Are client photos available, or should stock placeholders be used?
- Should the animation loop automatically or only on interaction?
- Where exactly should this section sit in the landing page flow?
- Should the cards be static, looping, or mixed with hover interaction?

---

## Build Note
This section should be treated as a **drop-in replacement** for the current client testimonial block.  
Preserve the original footprint and page rhythm. Only update the visual presentation and implementation structure.