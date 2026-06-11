# ABOUT.HTML — TEAM SECTION PRD

## Objective

Implement the **Team Member Section** exactly like the provided wireframe, keeping:

- Luxury black editorial style
- Gold accent (#D5AF36)
- Responsive-first
- Smooth mobile experience
- Consistent typography and spacing from previous rules

This section is the core About Us visual highlight and must feel premium.

---

## 1. Component Architecture & DOM Structure

Linear, clean, reusable component structure:

```

<Layout>
  <Navbar />                <!-- Global Header -->
  <HeaderSection />         <!-- Judul "MEET OUR TEAMS" -->
  <TeamList />              <!-- Wrapper untuk list anggota -->
    <TeamCard variant="left" />   <!-- Anggota 1 -->
    <TeamCard variant="right" />  <!-- Anggota 2 -->
    <TeamCard variant="left" />   <!-- Anggota 3 -->
    <!-- ...tambahkan anggota baru nanti -->
</Layout>
```

Notes:

- `TeamCard` harus **reusable** dan mendukung property `variant` untuk arah layout (left/right)
- Gunakan **flexbox** untuk selang-seling di desktop
- Gunakan **order** di mobile untuk memastikan Foto selalu di atas teks

---

## 2. Component Breakdown

### A. `<Navbar />`

- Tag: `<nav>` atau `<header>` (semantik)
- Layout: `display: flex; justify-content: space-between`
- Sisi kiri: Logo/Brand
- Sisi kanan: Menu navigasi / CTA
- Styling: Sesuai global header (dark luxury theme)

---

### B. `<HeaderSection />`

- Tag: `<h1>` (SEO friendly) atau `<h2>`
- Text: "MEET OUR TEAMS"
- Alignment: Center
- Padding / Margin Vertikal: Cukup whitespace agar desain bernapas
- Font: Poppins, bold, editorial feel
- Optional: subtle fade-in atau slide-up (GSAP allowed, mobile optimized)

---

### C. `<TeamCard />` (Anggota Selang-Seling)

**HTML Structure:**

```html
<section class="team-card team-card--left|right">
  <div class="team-card__image">
    <img src="..." alt="Nama Anggota" />
  </div>
  <div class="team-card__text">
    <h3>Nama Anggota</h3>
    <h4>Jabatan / Role</h4>
    <p>Deskripsi singkat tentang anggota</p>
  </div>
</section>
```

**Layouting Desktop (≥1024px):**

- Container: `display: flex`
- Selang-seling:
  - Variant `left`: image kiri, text kanan
  - Variant `right`: image kanan, text kiri (`flex-direction: row-reverse`)

- Gunakan **utility class atau CSS pseudo-class** (e.g., `:nth-child(even)` atau `even:flex-row-reverse`)

**Text Alignment:**

- Baris genap / `variant="right"`: text-align right
- Baris ganjil / `variant="left"`: text-align left

**Image Styling:**

- Wrapper atau `<img>` dengan `aspect-ratio: 1/1`
- Rounded corners optional
- Shadow: subtle for depth
- Fit: `object-cover`

**Mobile (≤768px):**

- Layout: `flex-direction: column`
- Foto selalu di atas teks
- Gunakan `order: -1` pada image wrapper untuk baris yang default teks dulu
- Padding & margin dikurangi agar muat di viewport

---

## 3. Responsive Design Strategy

| Breakpoint      | Layout Behavior                                 |
| --------------- | ----------------------------------------------- |
| Desktop ≥1024px | 2 kolom selang-seling (variant left/right)      |
| Tablet 769-1023 | 2 kolom tetap, tapi spacing lebih kecil         |
| Mobile ≤768px   | 1 kolom vertikal, foto di atas teks untuk semua |

- Gunakan **media queries** untuk flex-direction dan order
- Pastikan semua teks tetap terbaca dan foto tidak terlalu kecil
- Preserve gold accent highlight dan spacing konsisten dengan halaman About Us

---

## 4. Reusability & Maintainability

- `TeamCard` reusable dengan property `variant`
- Tambahkan **HTML comment** untuk anggota baru:

```html
<!-- Tambahkan anggota baru di bawah sini -->
```

- Data anggota bisa di-maintain di `about.js` array atau inline HTML
- Jangan hardcode layout berbeda untuk setiap anggota

---

## 5. Styling Guidelines

- Background: `#000000` / `#111111` konsisten dengan theme
- Accent: gold #D5AF36 untuk highlight (misal underline nama atau border)
- Card: rounded corners, subtle shadow
- Font: Poppins, editorial style
- Text color: `#FFFFFF` atau `#D9D9D9`
- Responsive padding & margin: consistent dengan landingpage_prd.md
- Hover: subtle scale atau shadow (desktop)

---

## 6. JS / Interaction

- Optional: carousel atau fade-in animation per card (desktop)
- Mobile: scroll biasa, no heavy animations
- Avoid scroll hijacking
- Smooth transitions only (GSAP fade/slide acceptable)
- Navigation between members can use previous/next buttons if desktop carousel
- For mobile, rely on natural scroll

---

## 7. Success Criteria

- Team section visually matches wireframe exactly
- Desktop selang-seling: left/right sesuai variant
- Mobile single-column: foto selalu di atas teks
- Section fully responsive
- Styling consistent dengan landingpage_prd.md
- Code reusable & maintainable
- Comments added for new member addition
- Scroll on mobile remains smooth (performance-first)

```

Kalau mau, aku bisa bikin **versi HTML+CSS+JS template siap pakai** untuk section ini dengan 5 anggota, properti `variant`, dan komentar untuk penambahan anggota baru, sesuai wireframe kamu. Ini nanti tinggal copy-paste ke `about.html`.

Apakah mau aku buatkan versi siap coding itu sekarang?
```
