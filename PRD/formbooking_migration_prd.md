# FORMBOOKING_PAGE_MIGRATION_PRD.md

## Objective

Separate the booking system from the contact page.

The existing booking workflow currently integrated into `contact.html` must be migrated into a dedicated page named:

```text
formbooking.html
```

This page will become the primary booking and inquiry page for Alima Photo.

The current `contact.html` should be temporarily reduced to a placeholder page while preserving site navigation integrity.

---

# Migration Strategy

## Current Situation

The booking form currently contains:

* Google Spreadsheet integration
* Google Drive upload integration
* Form validation
* Conditional package selection
* Date picker system
* Upload preview system
* Booking workflow automation

These systems are production-critical.

---

# Critical Rule

DO NOT REBUILD THE BOOKING SYSTEM.

DO NOT REWRITE THE BOOKING SYSTEM.

DO NOT REFACTOR WORKING BUSINESS LOGIC.

The goal is relocation and visual integration only.

---

# New Page Structure

Create:

```text
formbooking.html
```

Associated files:

```text
assets/css/formbooking.css
assets/js/formbooking.js
```

If possible:

* move page-specific visual enhancements into formbooking.js
* preserve existing booking logic from old_formbooking/alima.js

---

# Source of Truth

Use the booking implementation currently migrated from:

```text
old_formbooking/alima.html
old_formbooking/alima.css
old_formbooking/alima.js
```

or the current booking implementation already present inside contact.html.

Preserve all working functionality.

---

# Formbooking Page Requirements

## Purpose

Dedicated booking experience.

This page becomes the conversion page for:

* Wedding
* Pre Wedding
* Engagement
* Corporate
* Family Session
* Commercial Projects
* Custom Packages

---

# Hero Section

Add a premium hero section above the booking form.

Eyebrow:

BOOKING EXPERIENCE

Headline:

Reserve Your Photography Experience

Description:

Share your vision and event details with us. We'll create a tailored photography experience designed around your story.

CTA:

Scroll to Booking Form

Style:

* luxury black edition
* editorial photography
* gold accent styling
* consistent with landingpage_prd.md

---

# Booking Form

The booking form becomes the primary page content.

Preserve:

* IDs
* names
* upload logic
* spreadsheet logic
* validation
* conditional package system
* date picker

Do not recreate the form.

Reuse existing implementation.

---

# Visual Requirements

Follow:

landingpage_prd.md

Requirements:

* black luxury theme
* #D5AF36 accent
* premium typography
* responsive-first
* mobile optimized
* GSAP compatible

---

# Upload Section

Keep existing functionality.

Visual redesign only.

Preserve:

* upload workflow
* preview generation
* file removal
* Google Drive upload

---

# Date Picker

Preserve existing functionality.

Apply previously approved fixes:

* modal always centered in viewport
* fixed positioning
* luxury dark styling
* solid CTA buttons
* premium modal appearance

---

# Contact Page Temporary Placeholder

The booking form must be removed from:

```text
contact.html
```

---

# New Contact Page Content

For now, keep contact.html intentionally simple.

Hero Section:

Headline:

Contact Alima Photo

Description:

For general inquiries, collaborations, and business discussions.

---

## Contact Methods

WhatsApp

Email

Instagram

---

## Placeholder Notice

Display:

Booking inquiries are currently handled through our dedicated booking page.

Primary CTA:

Book a Session

Link:

formbooking.html

---

# Navigation Updates

Update all booking-related navigation items.

Examples:

Current:

Contact

Book Now

Book Session

Reserve Session

Inquiry

---

Required Destination:

```text
formbooking.html
```

instead of:

```text
contact.html
```

where appropriate.

---

# Internal Link Audit

Check and update:

* homepage CTA buttons
* hero buttons
* package buttons
* pricing buttons
* portfolio CTA buttons
* footer CTA buttons
* mobile menu links

Any booking-related CTA should point to:

```text
formbooking.html
```

---

# SEO

## formbooking.html

Title:

Book a Photography Session | Alima Photo

Meta Description:

Book wedding, pre-wedding, event, and portrait photography sessions with Alima Photo.

---

## contact.html

Title:

Contact Alima Photo

Meta Description:

Get in touch with Alima Photo for collaborations, partnerships, and general inquiries.

---

# Success Criteria

Migration is successful when:

* booking system works exactly as before
* Google Spreadsheet integration still works
* Google Drive upload still works
* validation still works
* conditional package logic still works
* date picker still works
* booking page exists at formbooking.html
* contact page no longer contains booking form
* booking CTAs redirect to formbooking.html
* visual styling follows landingpage_prd.md
* no functionality regression occurs

---

# Functionality Preservation Priority

Functionality Preservation Priority: 100%

Visual improvements must never take precedence over:

* Google Spreadsheet integration
* Google Drive uploads
* validation logic
* form automation
* existing booking workflow

If a visual change risks breaking functionality:

Functionality always wins.
