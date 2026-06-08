# CONTACT_PAGE_PRD.md

## Objective

Repurpose `contact.html` into a lightweight contact and inquiry page.

This page is no longer responsible for bookings.

All booking-related workflows must remain exclusively inside:

```text
formbooking.html
```

The purpose of this page is to provide a simple and direct communication channel via WhatsApp.

---

# Page Purpose

This page serves visitors who:

* Have general questions
* Need additional information
* Want to discuss before booking
* Need assistance from the Alima Photo team

This page is not a booking page.

Do not include:

* package selection
* booking workflow
* Google Spreadsheet integration
* Google Drive uploads
* booking validation systems
* date picker systems

---

# Design Direction

Follow:

```text
landingpage_prd.md
```

Visual requirements:

* Luxury black aesthetic
* Editorial photography styling
* Premium spacing
* Gold accent (#D5AF36)
* Consistent typography
* Responsive-first
* Mobile optimized

---

# Layout Structure

## Hero Section

Small premium hero section.

Eyebrow:

CONTACT US

Headline:

Admin Mau Tanya Dong?!

Description:

Punya pertanyaan seputar layanan, paket, jadwal, atau hal lainnya? Kirim pesan langsung dan tim Alima Photo akan membantu Anda.

Primary CTA:

Scroll to Form

Smooth scroll to contact form section.

---

# Contact Form Section

## Layout

Use the same visual styling and form design language as:

```text
formbooking.html
```

Requirements:

* same form card appearance
* same spacing system
* same border treatment
* same input styling
* same responsive behavior

However:

DO NOT reuse booking functionality.

This is a completely separate lightweight form.

---

# Form Fields

## Nama Lengkap

Type:

Short Text

Required:

Yes

Label:

Nama Lengkap *

Placeholder:

Masukkan nama lengkap Anda

---

## Nomor WhatsApp

Type:

Short Text

Required:

Yes

Label:

Nomor WhatsApp *

Placeholder:

08xxxxxxxxxx

Validation:

Basic phone number validation only.

The value is collected for user convenience.

This value is NOT included in the WhatsApp message template.

---

## Pesan

Type:

Textarea

Required:

Yes

Label:

Pesan *

Placeholder:

Tulis pertanyaan Anda di sini...

---

# WhatsApp Integration

## Purpose

Redirect users directly to WhatsApp.

No backend required.

No spreadsheet required.

No database required.

No API required.

---

## Message Template

Only include:

* Nama Lengkap
* Pesan

Do NOT include:

* Nomor WhatsApp

Example generated message:

```text
Halo Admin Alima Photo,

Nama: Pandan Arum

Pesan:
Saya mau tanya soal Wedding Packages Diamond dong

Terima kasih.
```

---

# CTA Button

Button Text:

Kirim Pesan

Behavior:

Open WhatsApp in a new tab.

Use:

```text
https://wa.me/
```

with URL encoded message.

---

# Validation Rules

Before redirecting:

Validate:

* Nama Lengkap is not empty
* Nomor WhatsApp is not empty
* Pesan is not empty

If validation fails:

Display inline error messages.

Use styling consistent with formbooking.html.

---

# Styling Requirements

Form card should visually match:

```text
formbooking.html
```

Including:

* dark card background
* subtle border
* luxury spacing
* premium input styling
* gold accent focus state
* smooth hover states

---

# Responsive Requirements

## Desktop

Centered form card.

Max width:

700px

Comfortable spacing.

---

## Tablet

Reduce spacing proportionally.

Maintain readability.

---

## Mobile

Single column.

Large touch targets.

Minimum input height:

48px

No horizontal scrolling.

---

# Animation

Use same animation language as homepage.

Allowed:

* GSAP fade-up
* stagger reveal
* smooth hover transitions

Avoid:

* excessive motion
* aggressive effects

---

# JavaScript Requirements

Create/Update:

```text
assets/js/contact-page.js
```

Responsibilities:

* form validation
* WhatsApp URL generation
* redirect handling
* smooth scroll behavior

Do not create unnecessary complexity.

---

# CSS Requirements

Create or update:

```text
assets/css/contact.css
```

The styling should closely follow:

```text
formbooking.html
```

while remaining lighter and simpler.

---

# Success Criteria

Implementation is successful when:

* Contact page matches landingpage_prd.md
* Form visually matches formbooking.html
* User can submit inquiries through WhatsApp
* Validation works correctly
* WhatsApp opens successfully
* Generated message contains only:

  * Nama Lengkap
  * Pesan
* Nomor WhatsApp is not included in the generated message
* Page is fully responsive
* No booking functionality exists on contact.html
