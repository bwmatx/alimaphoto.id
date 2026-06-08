# mobile_performance_fix_prd.md

# ALIMA PHOTO

# MOBILE PERFORMANCE & RESPONSIVE OPTIMIZATION

Priority: Critical

Type: Mobile-Only Optimization

Version: 1.0

---

# IMPORTANT INSTRUCTION

Before making any modifications, perform a complete audit of the existing codebase.

DO NOT assume.

DO NOT guess.

DO NOT hallucinate missing problems.

DO NOT rewrite components unnecessarily.

DO NOT redesign the website.

DO NOT alter any visual identity, layout hierarchy, section order, user flow, animations concept, branding, content structure, or desktop experience.

Every optimization must be based on actual findings from the current implementation.

If a problem cannot be verified from the codebase, do not attempt to fix it.

The objective is optimization, not redesign.

---

# PRIMARY GOAL

The website currently feels noticeably less smooth on mobile devices than on desktop.

Users may experience:

- Scroll stuttering
- Frame drops
- Delayed animations
- Inconsistent scrolling performance
- Heavy rendering during page navigation
- Excessive GPU usage
- Excessive repaint/reflow operations

The objective is to achieve a premium 60fps mobile experience while preserving the existing visual design.

---

# DESKTOP PROTECTION RULE

Desktop behavior must remain unchanged.

Desktop optimization is not part of this task.

All performance modifications must be targeted specifically for:

```text
max-width: 1024px
```

with special attention to:

```text
320px
360px
375px
390px
412px
430px
480px
768px
```

---

# MOBILE PERFORMANCE AUDIT

Perform a complete audit of:

## GSAP

Inspect:

- ScrollTrigger count
- Active timelines
- Infinite loops
- Scrub animations
- Pinning
- Parallax effects
- Background animations

Identify expensive operations.

Optimize only when measurable performance improvements exist.

---

## CSS Rendering

Inspect:

- backdrop-filter
- filter
- blur
- box-shadow
- mix-blend-mode
- opacity animations
- large gradients
- nested transforms

Identify expensive paint operations.

Reduce rendering cost without changing the visual appearance significantly.

---

## Layout Calculations

Inspect:

- layout thrashing
- forced reflows
- height recalculations
- width recalculations
- unnecessary DOM measurements

Eliminate repeated layout calculations during scrolling.

---

## JavaScript Execution

Inspect:

- scroll listeners
- resize listeners
- requestAnimationFrame loops
- animation updates
- interval timers
- autoplay systems

Identify unnecessary processing running continuously.

---

# SCROLL PERFORMANCE OPTIMIZATION

Scrolling must remain smooth across the entire website.

Requirements:

- No visible stutter
- No frame skipping
- No scroll lockups
- No delayed rendering
- No jumpy behavior

Scrolling should remain consistent from Hero to Footer.

---

## ScrollTrigger Optimization

Audit every ScrollTrigger instance.

Requirements:

- Remove duplicate triggers
- Remove inactive triggers
- Merge triggers where possible
- Reduce unnecessary calculations

Avoid creating individual triggers for small visual effects.

Group related animations whenever possible.

---

## Scrub Optimization

Inspect all:

```js
scrub: true;
```

implementations.

Determine whether continuous scrubbing is necessary.

If visual quality remains acceptable, replace expensive scrubbing behaviors with more efficient alternatives on mobile only.

Desktop behavior must remain untouched.

---

## Parallax Optimization

Audit all parallax effects.

Heavy parallax calculations should not run on lower-powered mobile devices.

If necessary:

- reduce intensity
- reduce update frequency
- simplify calculations

while maintaining the visual concept.

---

# HERO SECTION OPTIMIZATION

The Hero section is likely one of the most expensive sections.

Audit:

- slideshow rendering
- fade transitions
- zoom animations
- background image handling
- overlay rendering
- text animations

Requirements:

- maintain visual design
- reduce rendering cost
- prevent multiple heavy animations running simultaneously

---

## Background Slideshow

Verify:

- image dimensions
- decoding behavior
- transition method
- preload strategy

Do not load unnecessary large assets on mobile.

Serve appropriately optimized images.

---

# IMAGE OPTIMIZATION AUDIT

Audit all images.

Requirements:

- responsive image loading
- correct image sizing
- lazy loading where appropriate
- prevent oversized assets

Do not upscale images beyond their display size.

Do not load desktop-sized assets unnecessarily on mobile.

---

# CAROUSEL OPTIMIZATION

Audit:

- Recent Projects Carousel
- Services Carousel
- Testimonial Carousel

Requirements:

Only animate what is visible.

Offscreen content should not consume rendering resources.

Avoid continuously animating elements outside the viewport.

---

## Visibility-Based Processing

When a section leaves the viewport:

- pause autoplay
- pause unnecessary animations
- suspend expensive calculations

When the section re-enters the viewport:

- resume smoothly

Use Intersection Observer where appropriate.

---

# TESTIMONIAL SECTION OPTIMIZATION

Audit stacked glass carousel.

Inspect:

- blur effects
- layered transforms
- opacity animations
- scale animations

Maintain the visual appearance while reducing GPU cost.

If multiple blur layers exist simultaneously, simplify mobile rendering where possible.

Desktop behavior must remain unchanged.

---

# MOBILE VIEWPORT FIXES

Verify viewport implementation.

Requirements:

- no unexpected zooming
- no zoom-out behavior
- no scaling inconsistencies
- no horizontal overflow

The viewport must remain locked to intended dimensions.

---

# RESPONSIVE LAYOUT AUDIT

Audit every section for:

- overflow
- hidden width expansion
- oversized containers
- unintended transforms

The page width must never exceed viewport width.

---

# ANIMATION STRATEGY

Prefer:

```css
transform
opacity
```

Avoid mobile animations relying on:

```css
top
left
width
height
margin
padding
```

during active animation sequences.

---

# GPU ACCELERATION REVIEW

Audit all animated elements.

Ensure hardware acceleration is used appropriately.

Avoid unnecessary GPU layers.

Avoid creating excessive compositing layers.

Only promote elements that genuinely benefit from acceleration.

---

# MEMORY MANAGEMENT

Inspect:

- event listeners
- observers
- animation instances
- timelines

Ensure unused resources are cleaned up correctly.

Prevent memory accumulation during long browsing sessions.

---

# MOBILE QUALITY ASSURANCE

Test on:

Android Chrome

Android Edge

Android Firefox

Samsung Internet

iOS Safari

iOS Chrome

Verify:

- smooth scrolling
- stable FPS
- responsive layout
- correct image rendering
- proper animation timing

---

# SUCCESS CRITERIA

The implementation is considered complete only when:

✓ No horizontal scrolling exists.

✓ No zoom-out behavior exists.

✓ No viewport scaling issues exist.

✓ Scroll performance feels smooth throughout the website.

✓ Mobile rendering remains stable.

✓ Hero section remains fluid.

✓ Carousels remain smooth.

✓ Animations remain premium.

✓ Visual identity remains unchanged.

✓ Desktop experience remains unchanged.

✓ No redesign has been introduced.

The final result must preserve the original Alima Photo design while delivering a significantly smoother, more responsive, and more professional mobile experience.
