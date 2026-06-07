# UPDATE PRD

# SECTION 4 — OUR SERVICES

## RESPONSIVE BEHAVIOUR

### Desktop Experience

Layout menggunakan dua kolom.

#### Left Column

Service Navigation

- Wedding
- Prewedding
- Engagement
- Studio
- Maternity

#### Right Column

Dynamic Service Preview

Menampilkan foto portrait rasio 3:4 sesuai layanan yang dipilih.

Ketentuan:

- Maksimal tinggi foto 75vh
- Tidak boleh melebihi viewport
- Foto harus tampil utuh
- Tidak menyebabkan overflow vertikal
- Menjaga keseimbangan visual antara navigasi dan preview image

---

### Tablet Experience

Tablet wajib mempertahankan struktur layout yang sama dengan desktop.

Jangan mengubah posisi elemen menjadi stacked layout.

Struktur tetap:

- Navigation di kiri
- Preview image di kanan

Yang berubah hanya:

- Ukuran container
- Ukuran font
- Spacing
- Ukuran foto

Tujuan:

Menjaga konsistensi pengalaman visual dari desktop ke tablet.

Ketentuan foto tablet:

- Tetap menggunakan rasio 3:4
- Maksimal tinggi sekitar 65–70vh
- Tetap tampil penuh tanpa crop berlebihan
- Tidak boleh menyebabkan horizontal scrolling

Tablet harus terlihat sebagai versi yang diperkecil dari desktop, bukan layout yang berbeda.

---

### Mobile Experience

Pada mobile, section berubah menjadi format carousel horizontal yang lebih nyaman untuk interaksi sentuh.

Tidak lagi menggunakan layout tombol kiri dan foto kanan.

---

## Mobile Layout

Menampilkan:

- 1 foto aktif dalam satu waktu
- Swipe horizontal
- Arrow navigation
- Auto slide optional

Setiap slide mewakili satu layanan.

Contoh:

Slide 1 → Wedding

Slide 2 → Prewedding

Slide 3 → Engagement

Slide 4 → Studio

Slide 5 → Maternity

---

## Mobile Image Rules

Foto tetap menggunakan:

Aspect Ratio 3:4

Foto menjadi fokus utama section.

Lebar mengikuti container mobile.

Tinggi menyesuaikan rasio tanpa terpotong.

---

## Service Label Placement

Nama kategori layanan tidak lagi tampil sebagai tombol terpisah.

Nama layanan ditempatkan langsung di atas foto.

Posisi:

Bottom Left Overlay

Contoh:

Wedding

Prewedding

Engagement

Studio

Maternity

Ketentuan:

- Berada di pojok kiri bawah gambar
- Menggunakan overlay gradient halus
- Tetap terbaca pada berbagai kondisi foto
- Menggunakan warna putih atau warna kontras

Visual harus menyerupai caption editorial pada galeri fotografi premium.

---

## Mobile Navigation Controls

Di bawah foto terdapat area navigasi carousel.

Komponen:

### Arrow Previous

←

### Arrow Next

→

Posisi:

Center Bottom

Tepat di bawah foto.

---

## Carousel Behaviour

- Horizontal sliding
- Touch swipe support
- Infinite loop
- Smooth transition
- Mobile friendly
- Gesture responsive

Durasi animasi:

400–700ms

---

## UX Goal

Desktop & Tablet:

Memberikan pengalaman seperti katalog layanan profesional dengan panel navigasi dan preview image.

Mobile:

Memberikan pengalaman seperti menjelajahi galeri fotografi premium, di mana setiap layanan tampil sebagai kartu visual yang dapat digeser secara horizontal dengan kontrol navigasi yang jelas dan nyaman digunakan.
