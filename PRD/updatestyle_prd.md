# UPDATESTYLE_PRD.md

# ALIMA PHOTO — LUXURY BLACK EDITION

**Version:** 1.0
**Priority:** High
**Type:** Visual Styling Update Only

---

# OBJECTIVE

Transform the visual identity of the Alima Photo website into a premium luxury photography brand experience while preserving all existing functionality, structure, interactions, and layouts.

This document applies only to visual styling, color systems, atmosphere, and aesthetic direction.

## DO NOT MODIFY

The following elements must remain exactly as defined in the main PRD:

- Page structure
- Section order
- Layout system
- Grid system
- Navigation architecture
- Responsive behavior
- GSAP animations
- Scroll interactions
- Carousel behavior
- Component functionality
- User flows
- Information architecture
- Typography hierarchy
- Content structure

This update is strictly a visual design enhancement.

---

# NEW VISUAL DIRECTION

## Brand Positioning

Alima Photo should feel like a premium photography studio specializing in weddings, engagements, and meaningful life moments.

The website should communicate:

- Luxury
- Elegance
- Exclusivity
- Sophistication
- Timelessness
- Emotional storytelling
- Professional craftsmanship

Visitors should immediately feel they are viewing the portfolio of a high-end photography studio rather than a standard business website.

---

# DESIGN PHILOSOPHY

The visual atmosphere should be inspired by:

- Luxury wedding photography
- Fine art galleries
- Editorial fashion photography
- Premium printed photo albums
- High-end event documentation

The design should feel refined and confident, relying on restraint rather than excessive decoration.

Every visual element should support the perception of quality and professionalism.

---

# COLOR SYSTEM UPDATE

## Primary Background

The website should transition to a predominantly dark theme.

Primary Background:

```css
#0A0A0A
```

Alternative Dark Surface:

```css
#111111
```

Dark backgrounds should dominate the visual experience.

Large white sections should be avoided unless strategically necessary.

---

## Luxury Accent Color

Official Brand Accent:

```css
#D5AF36
```

This gold tone becomes the signature luxury color of Alima Photo.

Use it carefully and intentionally.

The purpose is to create premium visual emphasis, not decorative overload.

---

## Primary Text

```css
#F5F5F5
```

Used for:

- Main headings
- Important content
- Hero text
- Navigation items

---

## Secondary Text

```css
#BDBDBD
```

Used for:

- Paragraphs
- Supporting content
- Metadata
- Descriptions

---

## Neutral Surfaces

Dark Surface:

```css
#151515
```

Secondary Surface:

```css
#1B1B1B
```

Elevated Surface:

```css
#222222
```

---

# COLOR APPLICATION RULES

## Gold Accent Usage

Use #D5AF36 only for:

- Active navigation states
- Hover states
- Primary CTA buttons
- Decorative separators
- Small visual accents
- Interactive highlights
- Selected carousel indicators
- Important labels
- Luxury detail elements

Avoid large gold backgrounds.

The gold color should feel exclusive and intentional.

---

## Black Dominance

Approximately:

- 75–85% dark surfaces
- 10–15% neutral surfaces
- 5–10% gold accents

This balance should maintain a sophisticated luxury aesthetic.

---

# TYPOGRAPHY UPDATE

## Font Family

Continue using:

**Poppins**

No font replacements are allowed.

---

## Heading Style

Characteristics:

- Elegant
- Premium
- Modern
- Confident

Default Color:

```css
#F5F5F5
```

Hover Color:

```css
#D5AF36
```

---

## Body Text

Color:

```css
#BDBDBD
```

The goal is comfortable readability without excessive contrast.

---

# BUTTON STYLING UPDATE

## Primary Buttons

Default:

Background:

```css
#D5AF36
```

Text:

```css
#111111
```

Hover:

```css
#E4C04D
```

Behavior:

- Smooth transitions
- Premium interaction feel
- No aggressive animation

---

## Secondary Buttons

Default:

Background:

Transparent

Border:

```css
1px solid #D5AF36
```

Text:

```css
#D5AF36
```

Hover:

Background:

```css
#D5AF36
```

Text:

```css
#111111
```

---

# NAVIGATION STYLING UPDATE

## Default State

Navbar should remain:

- Clean
- Minimal
- Transparent

The hero section must remain the visual focus.

---

## Scrolled State

When scrolling:

- Dark translucent background
- Subtle backdrop blur
- Soft bottom border
- Smooth transition

Example style direction:

```css
background: rgba(10, 10, 10, 0.85);
backdrop-filter: blur(16px);
```

---

## Active Menu Item

Use:

```css
#D5AF36
```

as the active navigation indicator.

---

# CARD COMPONENT STYLING

Applies to:

- Services
- Testimonials
- Portfolio previews
- Contact cards
- Future reusable cards

Default Surface:

```css
#151515
```

Border:

```css
rgba(213,175,54,0.15)
```

Hover State:

- Slight elevation
- Increased border visibility
- Subtle shadow depth

Avoid dramatic glow effects.

---

# IMAGE TREATMENT

Do not alter the original image colors.

Apply only subtle enhancements:

- Slight contrast boost
- Gentle shadow overlay
- Cinematic depth
- Luxury editorial presentation

Images should remain natural and authentic.

---

# SHADOW SYSTEM

Shadow styling should feel refined and understated.

Avoid:

- Neon glows
- Strong blur shadows
- Excessive visual effects

Preferred characteristics:

- Soft depth
- Subtle layering
- Editorial sophistication

---

# SECTION BACKGROUNDS

Maintain the existing layout and spacing.

Only update visual surfaces.

Recommended hierarchy:

```css
Primary Background:   #0A0A0A
Secondary Surface:    #151515
Elevated Surface:     #1B1B1B
Accent:               #D5AF36
Text Primary:         #F5F5F5
Text Secondary:       #BDBDBD
```

---

# OVERALL VISUAL GOAL

The final website should feel like a premium photography portfolio designed for couples and clients seeking a high-end photography experience.

The visual language should communicate:

- Trust
- Elegance
- Quality
- Craftsmanship
- Luxury
- Emotional storytelling

The experience should resemble a curated photography exhibition rather than a conventional business website.

No layouts, sections, interactions, animations, navigation systems, or functionality should be modified.

Only the visual style, atmosphere, color palette, and luxury presentation should be updated.
