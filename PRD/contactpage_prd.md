# CONTACT_PAGE_UPDATE_PRD.md

## Objective

Update `contact.html` to match the visual identity and user experience defined in `landingpage_prd.md` while preserving all existing business logic.

This is a styling and frontend integration task only.

The existing booking system inside `old_formbooking` already contains critical functionality and must remain intact.

---

# Existing Source

Use the following files as the primary source:

```
old_formbooking/
├── alima.html
├── alima.css
└── alima.js
```

These files contain the existing booking workflow and must be used as the foundation for the new contact page.

---

# Critical Rule

DO NOT rebuild the booking system.

DO NOT replace existing form logic.

DO NOT recreate spreadsheet integration.

DO NOT recreate Google Drive upload functionality.

The goal is to modernize the visual presentation only.

---

# Protected Features

The following systems are considered production-critical.

They must continue working exactly as they do currently.

### Google Spreadsheet Integration

Preserve:

* form submission flow
* spreadsheet endpoints
* API requests
* payload structure
* success responses
* error handling

Do not modify unless absolutely required.

---

### Google Drive Upload

Preserve:

* image upload functionality
* upload validation
* upload progress handling
* upload endpoints
* file processing logic
* generated URLs

Do not modify unless absolutely required.

---

### Existing JavaScript Logic

Preserve:

* event listeners
* form validation
* conditional fields
* upload workflow
* submit workflow
* success states
* loading states

The implementation should adapt the styling around the existing system.

---

# Implementation Strategy

## Preferred Approach

Analyze:

```
old_formbooking/alima.html
old_formbooking/alima.css
old_formbooking/alima.js
```

Extract:

* existing form structure
* existing classes
* existing IDs
* existing JavaScript hooks

Then apply the new visual system while keeping these references intact.

---

# HTML Requirements

The existing form structure should remain.

Preserve:

* form IDs
* input names
* data attributes
* upload containers
* hidden fields
* JavaScript selectors

Avoid changing:

```html
id=""
name=""
data-*
```

unless absolutely necessary.

---

# CSS Modernization

The majority of changes should happen in CSS.

Prefer:

* visual redesign
* spacing improvements
* typography updates
* layout restructuring

Avoid:

* structural changes that break JavaScript selectors

---

# Design Language

Follow:

```
landingpage_prd.md
```

### Visual Direction

Luxury

Editorial

Minimal

Premium

Photography-focused

Responsive-first

---

# Color Palette

Background:

#000000

Secondary:

#111111

#1A1A1A

Accent:

#D5AF36

Text:

#FFFFFF

#D9D9D9

---

# Typography

Use the same typography system already defined in the landing page.

Primary Font:

Poppins

Maintain visual consistency across:

* hero section
* portfolio page
* testimonials section
* contact page

---

# Contact Page Structure

## Hero Header

Add a premium introductory section above the booking form.

Contents:

Eyebrow:
BOOK YOUR EXPERIENCE

Headline:
Let's Create Something Timeless

Description:
Tell us about your vision and we'll craft a photography experience designed around your story.

This section should visually match the homepage.

---

## Booking Form Section

The existing form remains the primary component.

Do not rebuild it.

Instead:

* redesign layout
* redesign inputs
* redesign labels
* redesign upload area
* redesign button styles

while keeping functionality unchanged.

---

## Upload Area

This area is critical because it connects to Google Drive.

Requirements:

* keep upload functionality untouched
* redesign visual appearance only
* support drag-and-drop styling if already available
* add premium empty-state visuals

Do not replace upload logic.

---

## Submit Area

Preserve:

* submission process
* validation flow
* loading indicators

Only redesign:

* button styling
* loading appearance
* success messages
* error messages

---

# Responsive Requirements

## Desktop

Maximum width:

1200px

Form should feel premium and spacious.

---

## Tablet

Reduce spacing proportionally.

Maintain readability.

---

## Mobile

Prioritize usability.

Large touch targets.

No horizontal scrolling.

Upload area must remain usable.

Form fields must remain readable.

---

# Animation

Use the same motion language as the homepage.

Allowed:

* GSAP fade-up
* stagger reveal
* smooth scroll
* subtle hover states

Avoid:

* dramatic animations
* layout shifts
* anything affecting form functionality

---

# JavaScript Requirements

### High Priority

Do not remove existing JavaScript.

Do not rewrite existing JavaScript unless necessary.

If visual improvements require new interactions:

Create a separate file:

```
contact-page.js
```

and keep new visual enhancements isolated.

---

# File Structure

Preferred result:

```
contact.html
contact.css
contact-page.js
```

with existing logic migrated or referenced safely from:

```
old_formbooking/alima.js
```

---

# Migration Rules

Before changing any code:

1. Identify all selectors used by JavaScript.
2. Preserve all spreadsheet-related code.
3. Preserve all Google Drive upload code.
4. Preserve all form submission workflows.
5. Preserve all validation logic.
6. Preserve all success/error handling.

Only then apply styling updates.

---

# Success Criteria

Implementation is successful when:

* Google Spreadsheet integration still works.
* Google Drive upload still works.
* Existing validation still works.
* Existing submission workflow still works.
* Existing IDs and hooks remain intact.
* Visual design matches landingpage_prd.md.
* Contact page feels like part of the same luxury website.
* Mobile experience remains excellent.
* No functionality regression occurs.
