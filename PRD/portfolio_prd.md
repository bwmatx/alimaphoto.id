# portfolio_prd.md

# ALIMA PHOTO

# PORTFOLIO PAGE PRD

Version: 1.0

Page:
portfolio.html

Related Documents:

* landingpage_prd.md
* updatestyle_prd.md
* recent_project_prd.md
* mobile_performance_fix_prd.md

---

# OBJECTIVE

Create a dedicated Portfolio page that showcases Alima Photo's complete collection of photography projects in an immersive editorial gallery experience.

The page should feel like a premium photography exhibition rather than a traditional image grid.

The overall atmosphere must remain consistent with the Alima Photo Luxury Black Edition design system.

This page serves as the primary portfolio showcase and should emphasize visual storytelling above all else.

---

# DESIGN DIRECTION

Visual Style:

* Luxury Editorial
* Photography Exhibition
* Modern Minimalism
* Cinematic Portfolio
* Premium Gallery Experience

The page should feel calm, elegant, and image-focused.

Photography must always remain the primary visual element.

Avoid clutter.

Avoid excessive UI elements.

Avoid distracting decorations.

---

# COLOR SYSTEM

Follow exactly:

updatestyle_prd.md

Primary Background:

#0A0A0A

Surface:

#151515

Text Primary:

#F5F5F5

Text Secondary:

#BDBDBD

Accent:

#D5AF36

Do not introduce new colors.

---

# TYPOGRAPHY

Font:

Poppins

Use the same typography hierarchy defined in landingpage_prd.md.

Maintain consistency across the entire website.

---

# PAGE STRUCTURE

## 1. Navigation Bar

Use the exact navbar styling from the landing page.

Menu:

* Home
* Portfolio
* Contact
* Booking

Logo:

Alima Photo

Active State:

Portfolio

Use gold accent (#D5AF36) for active navigation indication.

---

## 2. Portfolio Hero

Purpose:

Introduce the portfolio collection.

Content:

Small Label:

PORTFOLIO

Main Heading:

Capturing Memories That Last Forever

Supporting Text:

A curated collection of weddings, engagements, portraits, maternity sessions, and meaningful moments captured through the lens of Alima Photo.

CTA:

Explore Gallery

---

# HERO DESIGN

Background:

Luxury dark background

Optional subtle image overlay

Minimal visual distractions

Focus on typography and atmosphere.

---

# MAIN GALLERY SECTION

## Core Concept

The gallery should be inspired by the provided masonry image gallery component.

However, implement using:

* HTML
* CSS
* JavaScript

Do NOT use React.

Do NOT use Typescript.

Do NOT use Tailwind.

Do NOT use shadcn.

The final implementation must remain framework-independent.

---

# GALLERY LAYOUT

Create a modern masonry-style image gallery.

Structure:

Desktop:

3 columns

Tablet:

2 columns

Mobile:

1 column

Spacing:

Consistent vertical rhythm

Generous whitespace

Premium presentation

---

# IMAGE PRESENTATION

Images should use mixed orientations:

* Portrait
* Landscape

The gallery should feel organic and naturally arranged.

Avoid a rigid grid appearance.

---

# IMAGE LOADING

All images:

* Lazy loaded
* Optimized for performance
* Responsive
* Mobile friendly

Use:

loading="lazy"

for every image.

---

# IMAGE ANIMATION

Images should reveal as they enter viewport.

Animation:

Fade In

Characteristics:

* Smooth
* Elegant
* Subtle

Duration:

800ms–1200ms

Trigger:

Intersection Observer

Do not use expensive scroll calculations.

---

# IMAGE HOVER INTERACTION

Desktop Only

When hovering:

* Slight scale increase
* Smooth transition
* Increased image clarity

Avoid dramatic zooming.

Maintain luxury feel.

---

# LIGHTBOX EXPERIENCE

Clicking an image opens a premium lightbox.

Features:

* Dark overlay
* Image enlargement
* Previous image
* Next image
* Close button
* Keyboard navigation

Transitions must be smooth.

---

# PROJECT INFORMATION OVERLAY

Each image should contain an elegant overlay.

Display:

Project Name

Category

Examples:

Andini & Rizky

Wedding

---

Nabila & Fajar

Prewedding

---

Studio Portrait Session

Studio

---

Overlay Behavior:

Hidden by default

Reveal on hover (desktop)

Always visible on mobile using subtle gradient overlay.

---

# PROJECT CATEGORIES

Portfolio content should support:

* Wedding
* Prewedding
* Engagement
* Studio
* Maternity

The system should be easily expandable for future categories.

---

# FILTER SYSTEM

Position:

Above Gallery

Filter Buttons:

* All
* Wedding
* Prewedding
* Engagement
* Studio
* Maternity

Behavior:

Smooth filtering

No page reload

Animated transitions

Default:

All

---

# GALLERY DATA STRUCTURE

Each project item should support:

Project Name

Category

Cover Image

Photo Count

Gallery Images

Project Slug

Example:

Wedding — Andini & Rizky

128 Photos

---

# PERFORMANCE REQUIREMENTS

Critical.

Portfolio page may contain dozens of images.

Requirements:

* Lazy Loading
* Responsive Images
* Optimized Rendering
* No Layout Shift
* No Horizontal Overflow
* No Janky Scrolling

The page must remain smooth on mobile devices.

---

# MOBILE EXPERIENCE

Mobile performance has higher priority than visual complexity.

Requirements:

* Single-column masonry layout
* Responsive images
* No zoom issues
* No horizontal scrolling
* Fast loading
* Smooth scrolling

The experience should feel native to modern smartphones.

---

# ACCESSIBILITY

Provide:

* Alt text
* Keyboard navigation
* Focus states
* Semantic HTML

Maintain accessibility standards throughout the page.

---

# PLACEHOLDER CONTENT

During development, use royalty-free photography placeholders.

Inside the codebase, include comments:

<!-- Replace with original Alima Photo portfolio image -->

for every placeholder asset.

This makes future content replacement easier.

---

# FOOTER

Use the exact footer structure from the landing page.

Content:

Instagram

TikTok

About Us

Address:

Jl. Gang Hiu No.10 LK. Teleng, Sidoharjo, Pacitan

Copyright:

© 2026 All Rights Reserved | Alima Photo | By adhiwibowo

Maintain identical styling and spacing.

---

# SUCCESS CRITERIA

The portfolio page should feel like a luxury photography exhibition.

Visitors should focus entirely on the imagery while navigating smoothly through a curated collection of work.

The final result must:

✓ Match the visual identity of landingpage_prd.md

✓ Match the color system of updatestyle_prd.md

✓ Remain highly responsive

✓ Be mobile optimized

✓ Support future portfolio expansion

✓ Deliver a premium luxury photography experience

✓ Preserve excellent performance on modern mobile devices
