# client_prd.md

# CLIENT TESTIMONIALS SECTION — LUXURY GLASS STACKED CAROUSEL

## Objective

Transform the traditional testimonial section into a premium storytelling experience that reinforces trust, professionalism, and emotional connection.

Instead of using a conventional review slider or card grid, the testimonial section should become a visual centerpiece of the website, showcasing client stories through a cinematic stacked-card carousel system.

The experience should feel sophisticated, elegant, and aligned with the luxury visual identity of Alima Photo.

Visitors should perceive the testimonials as a curated collection of meaningful experiences rather than a standard list of reviews.

---

# Design Direction

Style:

- Luxury Editorial
- Premium Photography Portfolio
- Modern Glassmorphism
- Cinematic Motion Design
- High-End Digital Experience

The testimonial section should feel like a gallery of client memories presented through elegant motion and layered depth.

---

# Core Concept

Use a fully automated **Luxury Glass Stacked Carousel**.

Cards are layered on top of one another with visible depth, scale variation, and subtle perspective.

The active card remains at the front while upcoming testimonials are visible behind it as part of a premium stacked presentation.

The carousel continuously moves from:

**Left → Right**

using an infinite looping system.

No manual interaction is required.

---

# Carousel Behavior

## Autoplay

Enabled by default.

Requirements:

- Infinite Loop
- Continuous Motion
- Fully Automated
- Seamless Cycling
- No Visible Reset Point

The carousel should always remain active.

---

## Transition Timing

Transition Duration:

**1200ms per card**

The motion should feel smooth, deliberate, and premium.

Avoid fast or aggressive transitions.

Each testimonial should remain visible long enough to be read comfortably while maintaining visual momentum.

---

# Navigation Rules

Do NOT display:

- Previous Button
- Next Button
- Arrow Controls
- Pagination Dots
- Progress Indicators

The carousel itself should communicate movement and progression naturally.

---

# Hover Rules

Hover interactions are completely disabled.

Requirements:

- Do not pause autoplay
- Do not stop animation
- Do not slow animation
- Do not trigger hover states
- Do not alter transition timing

Even when the cursor is directly above the cards, the carousel must continue operating normally.

The experience should resemble a luxury showcase rather than a manually controlled slider.

---

# Stacked Card Transition System

The carousel should simulate physical cards moving through a layered stack.

---

## Active Card

When a card becomes active:

- Smoothly zooms in
- Moves slightly forward
- Receives maximum visual emphasis
- Becomes the primary focal point

---

## Outgoing Card

The previous active card:

- Slides toward the right
- Gradually scales down
- Moves behind the stack
- Loses visual dominance

---

## Incoming Card

The next card:

- Emerges from behind the stack
- Scales up smoothly
- Increases opacity
- Moves into the primary focus position

The transition should create the illusion of physical testimonial cards shifting through a premium layered display.

---

# Layering System

Visible Cards:

### Layer 1 — Active Card

```css
scale: 1;
opacity: 1;
z-index: highest;
```

---

### Layer 2

```css
scale: 0.95;
opacity: 0.85;
```

---

### Layer 3

```css
scale: 0.9;
opacity: 0.7;
```

---

### Layer 4

```css
scale: 0.85;
opacity: 0.55;
```

Only 3–4 cards should remain visible at the same time to preserve visual clarity.

---

# Card Design

## Shape

Rounded Rectangle

Recommended:

```css
border-radius: 32px;
```

The silhouette should feel soft, elegant, and premium.

Avoid sharp corners.

---

# Glassmorphism Styling

All testimonial cards should use a refined luxury glass effect.

Recommended styling direction:

```css
background: rgba(255, 255, 255, 0.06);

backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

border: 1px solid rgba(255, 255, 255, 0.08);
```

Characteristics:

- Semi-transparent surface
- Soft blur
- Subtle reflections
- Layered depth
- Premium appearance

Avoid overly strong glass effects that reduce readability.

---

# Card Content Structure

Each testimonial card should contain:

## Client Name

Example:

Sarah & Adrian

---

## Event Category

Examples:

- Wedding Photography
- Prewedding Session
- Engagement Session
- Studio Portrait
- Maternity Session

---

## Testimonial Text

The testimonial should focus on emotion, experience, and satisfaction.

Recommended length:

40–90 words

Avoid lengthy paragraphs.

The content should feel authentic and personal.

---

## Optional Elements

Can be included if they enhance the design:

- Client portrait
- Event date
- Event location
- Star rating

Do not allow these elements to clutter the layout.

---

# Visual Styling

Card Surface:

```css
#151515
```

Primary Text:

```css
#F5F5F5
```

Secondary Text:

```css
#BDBDBD
```

Luxury Accent:

```css
#D5AF36
```

Border:

```css
rgba(213,175,54,0.15)
```

All styling must remain consistent with the Luxury Black Edition design system.

---

# Motion Characteristics

Animations should feel:

- Luxury
- Cinematic
- Elegant
- Smooth
- Refined
- Premium

Avoid:

- Mechanical slider behavior
- Abrupt movement
- Aggressive easing
- Fast transitions

Recommended easing:

- power2.inOut
- power3.out
- easeInOut

GSAP implementation is strongly preferred.

---

# Mobile Experience

The stacked-card concept must remain visible on mobile devices.

Adjustments:

- Smaller card dimensions
- Reduced stack depth
- Optimized spacing
- Touch-friendly rendering

The layered effect must remain visually recognizable even on smaller screens.

---

# User Experience Goal

Visitors should feel that real people have trusted Alima Photo to capture some of the most meaningful moments of their lives.

This section should not feel like a traditional review component.

Instead, it should function as a premium storytelling showcase where client experiences continuously unfold through elegant motion, layered glass cards, and cinematic transitions.

The final result should become one of the most memorable and visually distinctive sections on the entire website while strengthening credibility, emotional engagement, and booking conversion.
