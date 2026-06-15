# PRD Final: CTA Booking & WhatsApp Wajib Berada di Bawah Bubble, Bukan di Samping

## 1. Status Dokumen

- Versi: 2.0 Final Draft
- Fokus: perbaikan struktur UI chatbot untuk CTA **Booking** dan **WhatsApp**
- Prioritas: **P0 / Blocking Issue**
- Tujuan dokumen: menghilangkan ambiguitas implementasi agar tim design, frontend, backend, dan QA tidak miss lagi

---

## 2. Ringkasan Eksekutif

Saat ini masih terjadi dua masalah utama pada implementasi chatbot:

1. tombol **Booking sekarang** masih dapat muncul **di samping bubble**, padahal requirement yang benar adalah **di bawah bubble**;
2. pada tampilan **desktop**, **border** yang seharusnya terlihat pada area yang relevan tidak selalu muncul secara konsisten.

Dokumen ini menetapkan spesifikasi final yang sangat rinci agar implementasi berikutnya tidak salah tafsir lagi. Keputusan produk final adalah:

- **CTA tidak boleh berada di dalam bubble**,
- **CTA tidak boleh berada di samping bubble**,
- **CTA harus muncul di bawah bubble assistant yang memicunya**,
- **border bubble dan border/outline elemen aksi harus tetap terlihat di desktop**,
- **struktur layout harus konsisten untuk Booking, WhatsApp, dan kombinasi keduanya**.

Dokumen ini juga memperjelas struktur visual, aturan DOM, perilaku responsif, constraint CSS, kontrak data, acceptance criteria, negative cases, dan test matrix.

---

## 3. Latar Belakang

Implementasi sebelumnya menghasilkan beberapa inkonsistensi:

- CTA masih dianggap bagian dari konten bubble, bukan area aksi lanjutan.
- Dalam beberapa kondisi layout, CTA bergeser ke kanan atau berada sejajar dengan bubble, sehingga secara visual terlihat seperti berada di samping bubble.
- Pada desktop, border yang seharusnya menjadi penanda visual container/bubble/tombol tidak muncul atau terlihat terlalu samar sehingga wireframe tidak tercapai.
- Masih ada risiko implementasi yang fokus pada “dekat dengan bubble” tetapi salah menerjemahkannya menjadi “satu baris dengan bubble”.

Permintaan terbaru menegaskan bahwa referensi wireframe harus dipatuhi secara ketat: **bubble/chat area berada di atas, CTA berada di bawah, dan pemisahan visual harus jelas**.

---

## 4. Problem Statement

Chatbot belum memenuhi requirement desain karena tombol CTA masih dapat muncul di sisi kanan atau sejajar horizontal terhadap bubble, bukan di area bawah bubble. Selain itu, border visual di desktop belum stabil. Akibatnya, UI tidak sesuai wireframe, hierarki visual tidak jelas, dan user dapat salah memahami mana konten percakapan dan mana aksi lanjutan.

---

## 5. Tujuan Produk

Tujuan utama perubahan ini adalah:

- memastikan CTA **selalu berada di bawah bubble assistant**, tidak pernah di samping;
- memastikan **border** pada elemen yang diwajibkan tetap terlihat jelas di desktop;
- memisahkan dengan tegas antara **area percakapan** dan **area aksi**;
- mendukung satu CTA maupun dua CTA tanpa merusak layout;
- membuat spesifikasi implementasi sangat eksplisit agar tidak ada interpretasi yang salah lagi.

---

## 6. Non-Tujuan

Perubahan ini **tidak** bertujuan untuk:

- mendesain ulang seluruh tampilan chatbot dari nol;
- mengubah logic bisnis booking secara menyeluruh;
- mengubah copywriting semua jawaban chatbot;
- menambah kanal baru di luar Booking dan WhatsApp;
- mengubah keseluruhan sistem intent classification di luar kebutuhan CTA.

---

## 7. Scope

### In Scope

- Posisi CTA terhadap bubble assistant
- Struktur layout untuk satu CTA dan dua CTA
- Aturan bahwa CTA tidak boleh di samping bubble
- Aturan bahwa CTA tidak boleh berada di dalam bubble
- Aturan border pada desktop
- Kontrak data minimal frontend-backend untuk CTA
- Spesifikasi QA dan acceptance criteria
- Edge cases visual dan fungsional

### Out of Scope

- Redesign tampilan bubble user
- Perubahan backend booking system eksternal
- Analytics lanjutan di luar event dasar
- Rebranding warna secara menyeluruh

---

## 8. Stakeholder

- Product Manager
- UI/UX Designer
- Frontend Engineer
- Backend Engineer
- QA Engineer
- Business Owner / Operation Team

---

## 9. Definisi Istilah

- **Assistant bubble**: bubble chat yang berisi jawaban chatbot/asisten.
- **CTA container**: wrapper khusus untuk tombol aksi yang muncul setelah bubble assistant.
- **Inline CTA**: tombol yang muncul di dalam aliran teks atau di dalam bubble.
- **Side CTA**: tombol yang muncul di samping bubble dalam satu baris horizontal.
- **Below-bubble CTA**: tombol atau grup tombol yang muncul setelah bubble, pada baris/row berikutnya.
- **Desktop border issue**: kondisi di mana border/outline yang seharusnya terlihat tidak muncul atau tidak cukup terlihat pada viewport desktop.

---

## 10. Persona dan Use Cases

### Persona 1: User siap booking

User ingin cepat melanjutkan ke reservasi setelah mendapat jawaban singkat.

Kebutuhan:

- jawaban singkat di bubble,
- tombol **Booking sekarang** langsung terlihat di bawah bubble,
- tidak bingung karena tombol menempel ke samping bubble.

### Persona 2: User ingin konsultasi dulu

User belum siap booking dan ingin chat admin lewat WhatsApp.

Kebutuhan:

- bubble menjelaskan konteks,
- tombol **Chat via WhatsApp** muncul di bawah bubble,
- tombol terlihat sebagai next step yang jelas.

### Persona 3: User butuh dua opsi

User ingin bisa memilih antara booking atau chat dulu.

Kebutuhan:

- bubble memberi konteks,
- dua tombol muncul dalam satu area aksi di bawah bubble,
- urutan tombol jelas,
- tampilan tetap rapi di desktop dan mobile.

---

## 11. Keputusan Produk Final yang Tidak Boleh Diinterpretasikan Ulang

Keputusan final berikut bersifat **wajib**:

1. **CTA Booking dan WhatsApp harus berada di bawah bubble assistant.**
2. **CTA tidak boleh berada di samping bubble assistant dalam kondisi apa pun.**
3. **CTA tidak boleh menjadi child dari konten teks bubble.**
4. **CTA boleh menjadi sibling dari bubble dalam wrapper message block yang sama.**
5. **Jika ada dua CTA, keduanya berada di bawah bubble dalam satu CTA container.**
6. **Pada desktop, border/outline elemen yang diwajibkan harus tetap terlihat.**
7. **Tidak boleh ada implementasi yang menggunakan layout row utama bubble + CTA sejajar secara horizontal.**

Jika hasil implementasi masih menampilkan tombol di samping bubble, maka implementasi tersebut dianggap **gagal** walaupun fungsi klik bekerja.

---

## 12. Masalah Eksisting yang Harus Diperbaiki

### 12.1 Booking button berada di samping bubble

Masalah:

- tombol muncul pada sisi kanan atau area sejajar dengan bubble;
- ini melanggar wireframe dan merusak hirarki visual.

Perbaikan yang diwajibkan:

- tombol harus dipindahkan ke row terpisah di bawah bubble;
- wrapper bubble dan wrapper CTA harus bertumpuk vertikal.

### 12.2 Border desktop tidak muncul

Masalah:

- pada viewport desktop, border/outline elemen penting tidak terlihat konsisten.

Perbaikan yang diwajibkan:

- border bubble assistant harus terlihat;
- border tombol CTA harus terlihat;
- jika ada container visual yang memang bagian desain, bordernya harus tetap terlihat di desktop;
- jangan mengandalkan warna border yang terlalu dekat dengan background.

---

## 13. Prinsip Desain

### 13.1 Separation of conversation and action

Percakapan dan aksi adalah dua layer pengalaman yang berbeda.

- Bubble = informasi / jawaban
- CTA = tindakan lanjutan

### 13.2 Clear visual hierarchy

Urutan konsumsi user harus selalu:

1. baca jawaban assistant,
2. lihat opsi tindakan,
3. pilih tindakan.

### 13.3 Wireframe fidelity

Struktur hasil implementasi harus setia pada wireframe, bukan sekadar “mirip” secara umum.

### 13.4 Deterministic layout

Layout tidak boleh bergantung pada panjang teks bubble sehingga CTA pindah ke samping atau menempel tidak konsisten.

### 13.5 Desktop parity

Tampilan desktop bukan versi opsional. Border, spacing, dan struktur wajib konsisten dan terlihat jelas di desktop.

---

## 14. Requirement Fungsional

### 14.1 Struktur blok message assistant

Setiap jawaban assistant yang memiliki CTA harus dibungkus dalam satu message block dengan struktur:

assistant-message-block
├── assistant-bubble
└── cta-container
├── booking-button (optional)
└── whatsapp-button (optional)

### 14.2 Aturan posisi CTA

- `cta-container` harus berada **setelah** `assistant-bubble` dalam urutan DOM.
- `assistant-message-block` harus menggunakan alur vertikal.
- `cta-container` harus berada di baris berikutnya setelah bubble.
- Dilarang meletakkan `cta-container` pada row horizontal yang sama dengan bubble.

### 14.3 Aturan kemunculan CTA

- Jika intent booking aktif, tampilkan tombol Booking.
- Jika intent WhatsApp aktif, tampilkan tombol WhatsApp.
- Jika keduanya aktif, tampilkan dua tombol.
- Jika user berasal dari atau menanyakan acara di luar area layanan utama, tampilkan tombol WhatsApp sebagai jalur diskusi lanjutan.
- Jika pertanyaan lokasi menghasilkan status **di luar area utama tetapi masih memungkinkan diskusi pengecualian/manual review**, jawaban bubble harus mengarahkan user ke WhatsApp dan CTA WhatsApp wajib tampil.
- Jika tidak ada CTA, jangan render `cta-container` kosong.

### 14.4 Privasi

- Nomor WhatsApp tidak boleh muncul di teks bubble.
- Nomor WhatsApp tidak boleh muncul di label tombol.
- Nomor hanya boleh dipakai di action target yang tidak diekspos sebagai visible text.

### 14.5 Aksesibilitas dasar

- Tombol dapat difokuskan dengan keyboard.
- State hover/focus/active harus terlihat jelas.
- Label tombol harus deskriptif.

---

## 15. Requirement UI dan Visual

### 15.1 Hirarki elemen

Urutan visual yang benar:

- bubble assistant di atas,
- jarak vertikal yang jelas,
- CTA container di bawah,
- tombol di dalam CTA container.

Urutan visual yang salah dan tidak boleh terjadi:

- tombol di kanan bubble,
- tombol di kiri bubble,
- tombol nempel di dalam bubble,
- tombol muncul sebelum bubble.

### 15.2 Jarak vertikal

Harus ada jarak vertikal antara bubble dan CTA container agar user menangkap bahwa CTA adalah next step, bukan bagian dari kalimat.

Panduan umum:

- jarak tidak terlalu rapat,
- jarak tidak terlalu jauh,
- konsisten antar message block.

### 15.3 Alignment

- Bubble assistant mengikuti alignment area assistant.
- CTA container mengikuti alignment bubble assistant.
- CTA container boleh memiliki lebar yang berbeda dari bubble, tetapi harus tetap berada di bawah titik awal bubble, bukan mengambang ke sisi berlawanan.

### 15.4 Lebar CTA

- Untuk satu tombol, lebar tombol dapat mengikuti lebar konten atau lebar desain yang ditentukan.
- Untuk dua tombol, gunakan container yang menata tombol secara rapi.
- Pada desktop, dua tombol boleh sejajar jika ruang cukup.
- Pada mobile, dua tombol boleh stack vertikal.

### 15.5 Border visibility desktop

Border harus jelas terlihat pada desktop. Artinya:

- ketebalan border tidak boleh terlalu tipis hingga hilang di layar desktop tertentu;
- warna border harus kontras terhadap background;
- border tidak boleh tertutup shadow atau overlap elemen lain;
- border tidak boleh hilang karena `overflow`, `background clipping`, atau style override.

### 15.6 Visual grouping

Meski terpisah dari bubble, CTA tetap harus terasa terkait dengan bubble di atasnya. Ini dicapai melalui:

- proximity/jarak yang terkontrol,
- alignment yang konsisten,
- urutan yang benar,
- grouping dalam wrapper message block.

---

## 16. Anti-Pattern yang Dilarang

Implementasi berikut **dilarang**:

### 16.1 CTA di samping bubble

Contoh salah secara konsep:

[bubble assistant] [Booking sekarang]

Ini dilarang walaupun terlihat “rapi” karena tidak sesuai wireframe.

### 16.2 CTA di dalam bubble

Contoh salah:

- tombol menjadi child dari konten bubble,
- tombol dirender di footer bubble tapi masih secara visual bagian bubble.

### 16.3 Border hanya muncul di mobile

Jika border hanya terlihat di mobile dan hilang di desktop, implementasi dianggap gagal.

### 16.4 CTA container kosong

Jangan render wrapper CTA jika tidak ada tombol yang perlu ditampilkan.

### 16.5 Layout tergantung panjang teks

Tombol tidak boleh pindah ke samping bubble hanya karena teks bubble pendek atau layar desktop lebar.

---

## 17. Spesifikasi Layout Teknis

### 17.1 Struktur wrapper

Struktur yang disarankan:

chat-thread
└── assistant-message-block
├── assistant-bubble-row
│ └── assistant-bubble
└── assistant-cta-row
└── cta-container
├── booking-button
└── whatsapp-button

### 17.2 Constraint layout wajib

- `assistant-message-block` harus bertumpuk vertikal.
- `assistant-bubble-row` dan `assistant-cta-row` adalah dua row terpisah.
- `assistant-cta-row` harus berada setelah `assistant-bubble-row`.
- Jangan gunakan struktur satu row yang menampung bubble dan CTA sekaligus.

### 17.3 Constraint CSS wajib

Secara konsep, implementasi harus memastikan perilaku berikut:

- container utama message block mengalir vertikal;
- CTA row selalu mengambil baris sendiri;
- CTA row tidak menggunakan positioning yang membuatnya mengapung di samping bubble;
- desktop style tidak menghapus border.

### 17.4 Constraint yang perlu diverifikasi

QA dan frontend harus secara eksplisit memeriksa bahwa tidak ada hal berikut:

- `display` horizontal pada wrapper yang menyatukan bubble dan CTA;
- `float`, `absolute`, atau layout lain yang menyebabkan CTA pindah ke samping bubble;
- media query desktop yang menonaktifkan border;
- override style tema gelap/terang yang menyamarkan border.

---

## 18. Requirement Desktop

### 18.1 Struktur

Pada desktop, urutan tetap:

- bubble di atas,
- CTA di bawah.

Lebar layar yang besar **bukan alasan** untuk menaruh tombol di samping bubble.

### 18.2 Border

Pada desktop wajib:

- border bubble terlihat,
- border tombol terlihat,
- jika ada outline/container referensi desain, itu juga terlihat.

### 18.3 Two-button layout

Jika dua CTA muncul:

- boleh sejajar horizontal di dalam CTA container,
- tetapi seluruh CTA container tetap berada di bawah bubble.

### 18.4 Negative rule

Yang tidak boleh di desktop:

- bubble dan CTA jadi satu baris karena space besar,
- border hilang karena style desktop override,
- tombol menempel terlalu jauh dari bubble sehingga relasi visual hilang.

---

## 19. Requirement Mobile

### 19.1 Struktur

Pada mobile, struktur tetap sama: bubble di atas, CTA di bawah.

### 19.2 Tombol

- tombol harus cukup besar untuk disentuh,
- dua tombol boleh ditumpuk vertikal jika lebih aman,
- border tetap terlihat.

### 19.3 Overflow

Tidak boleh terjadi:

- tombol terpotong,
- border terpotong,
- container melebar keluar viewport.

---

## 20. Requirement Tablet

Tablet mengikuti prinsip yang sama:

- bubble di atas,
- CTA di bawah,
- dua tombol boleh horizontal atau vertikal tergantung ruang,
- border tetap terlihat.

---

## 21. Konten dan Label CTA

Label yang direkomendasikan:

- **Booking sekarang**
- **Chat via WhatsApp**

Aturan label:

- singkat,
- jelas,
- tidak mengandung nomor,
- konsisten di seluruh sistem.

Jika ada dua tombol, urutan default:

1. Booking sekarang
2. Chat via WhatsApp

Urutan ini boleh diubah hanya jika ada keputusan bisnis eksplisit, bukan keputusan teknis ad hoc.

---

## 22. Kontrak Data Frontend-Backend

Backend harus mengirim data yang membuat frontend bisa merender struktur dengan deterministik.

Contoh payload:

{
"reply": "Silakan pilih langkah berikutnya.",
"cta": {
"show_booking": true,
"show_whatsapp": true,
"booking_label": "Booking sekarang",
"whatsapp_label": "Chat via WhatsApp"
}
}

Aturan:

- frontend merender bubble dari `reply`;
- frontend merender `cta-container` di bawah bubble berdasarkan flag;
- jika kedua flag false, jangan render cta-container;
- frontend tidak boleh membuat CTA muncul di samping bubble hanya karena variasi label atau jumlah tombol.

---

## 23. State dan Perilaku UI

### 23.1 Normal state

- bubble tampil,
- CTA tampil di bawah jika ada.

### 23.2 Hover state desktop

- tombol menampilkan affordance hover,
- border tetap terlihat.

### 23.3 Focus state

- outline/focus ring jelas,
- tidak merusak border utama.

### 23.4 Disabled/loading state

Jika suatu saat tombol perlu loading/disabled:

- posisi tetap di bawah bubble,
- border tidak hilang,
- label tetap terbaca.

---

## 24. Acceptance Criteria Utama

### 24.1 Visual placement

- Tombol **Booking sekarang** tidak pernah muncul di samping bubble.
- Tombol **WhatsApp** tidak pernah muncul di samping bubble.
- Semua CTA selalu muncul di bawah bubble assistant terkait.

### 24.2 DOM / structure

- `cta-container` adalah sibling dari bubble, bukan child dari konten bubble.
- `cta-container` berada setelah bubble dalam urutan render.

### 24.3 Border desktop

- Pada viewport desktop, border bubble terlihat.
- Pada viewport desktop, border CTA/button terlihat.
- Border tidak hilang saat resize window.

### 24.4 Responsive behavior

- Desktop: CTA container tetap di bawah bubble.
- Tablet: CTA container tetap di bawah bubble.
- Mobile: CTA container tetap di bawah bubble.

### 24.5 Functional behavior

- Booking hanya tampil jika booking relevan.
- WhatsApp hanya tampil jika WhatsApp relevan.
- Keduanya tampil jika intent campuran.
- Tidak ada CTA kosong.

### 24.6 Privacy

- Nomor WhatsApp tidak pernah tampil di teks visible.

---

## 25. Test Matrix Wajib

### 25.1 Satu CTA booking

Input: "Saya mau booking"
Expected:

- bubble tampil,
- tombol Booking sekarang tampil di bawah bubble,
- tidak sejajar di samping bubble.

### 25.2 Satu CTA WhatsApp

Input: "Saya mau tanya admin"
Expected:

- bubble tampil,
- tombol Chat via WhatsApp tampil di bawah bubble,
- tidak berada di dalam bubble.

### 25.3 Dua CTA

Input: "Saya mau booking tapi mau tanya dulu via WA"
Expected:

- bubble tampil,
- dua tombol tampil di bawah bubble dalam satu CTA container,
- di desktop boleh sejajar satu baris,
- tetapi keseluruhan container tetap di bawah bubble.

### 25.4 Di luar area layanan utama

Input: "Apakah bisa untuk acara di Solo?"
Expected:

- bubble menjelaskan bahwa area tersebut di luar cakupan utama,
- bubble tidak berhenti pada jawaban informatif saja,
- tombol Chat via WhatsApp wajib tampil di bawah bubble,
- user diarahkan untuk diskusi lanjutan/manual review lewat WhatsApp,
- nomor WhatsApp tidak tampil di teks visible.

### 25.5 Bubble pendek

Input menghasilkan bubble sangat pendek.
Expected:

- CTA tetap di bawah bubble,
- tidak pindah ke samping karena bubble pendek.

### 25.5 Bubble panjang

Input menghasilkan bubble panjang.
Expected:

- CTA tetap di bawah bubble,
- spacing tetap benar.

### 25.6 Desktop lebar besar

Expected:

- CTA tidak pindah ke kanan bubble,
- border tetap terlihat.

### 25.7 Resize viewport

Expected:

- selama resize desktop-tablet-mobile, CTA tetap di bawah bubble,
- border tidak hilang pada breakpoint mana pun.

### 25.8 Theme / mode berbeda bila ada

Expected:

- border tetap kontras dan terlihat.

---

## 26. Negative Test Cases

Sistem harus dianggap gagal jika salah satu berikut terjadi:

- tombol Booking sekarang muncul sejajar kanan bubble;
- tombol WhatsApp muncul sejajar kanan bubble;
- border hanya muncul di mobile tetapi hilang di desktop;
- CTA terlihat seperti bagian paragraf bubble;
- dua tombol tersebar di luar CTA container;
- area CTA kosong tetap dirender;
- resize menyebabkan CTA berpindah ke samping bubble.

---

## 27. QA Checklist Detail

### Struktur

- Apakah bubble dan CTA berada pada row terpisah?
- Apakah CTA container selalu dirender setelah bubble?
- Apakah CTA bukan child dari elemen content bubble?

### Visual

- Apakah ada jarak vertikal yang jelas antara bubble dan CTA?
- Apakah border bubble terlihat di desktop?
- Apakah border tombol terlihat di desktop?
- Apakah dua tombol tetap rapi jika tampil bersama?

### Responsive

- Apakah di mobile CTA tetap di bawah bubble?
- Apakah di tablet CTA tetap di bawah bubble?
- Apakah di desktop CTA tetap di bawah bubble?

### Functional

- Apakah tombol muncul sesuai intent?
- Apakah CTA tidak muncul saat tidak diperlukan?
- Apakah nomor WhatsApp tidak tampak?

---

## 28. Risiko Implementasi

### Risiko 1: Salah memilih wrapper layout

Developer bisa tidak sengaja memakai flex row pada wrapper bubble dan CTA.

Dampak:

- tombol berada di samping bubble.

Mitigasi:

- wajib pisahkan bubble row dan CTA row.

### Risiko 2: Border hilang di desktop karena override CSS

Media query desktop atau tema tertentu bisa menimpa border.

Dampak:

- desain tidak sesuai wireframe.

Mitigasi:

- audit style final di semua breakpoint.

### Risiko 3: UI terlihat benar hanya untuk satu jenis konten

Layout bisa terlihat benar hanya untuk bubble panjang atau pendek tertentu.

Mitigasi:

- uji dengan variasi panjang konten.

### Risiko 4: CTA ganda merusak alignment

Dua tombol bisa memaksa layout menjadi tidak stabil.

Mitigasi:

- gunakan CTA container khusus dengan aturan wrapping yang eksplisit.

---

## 29. Instrumentasi yang Disarankan

Event minimum:

- `assistant_cta_rendered`
- `assistant_cta_booking_rendered`
- `assistant_cta_whatsapp_rendered`
- `assistant_cta_clicked`
- `assistant_cta_layout_error_detected` (opsional jika ada observability UI)

Tujuan event ini adalah membantu validasi apakah CTA benar-benar tampil saat seharusnya.

---

## 30. Definisi Selesai

Fitur dianggap selesai hanya jika seluruh poin berikut terpenuhi:

- tombol **Booking sekarang** tidak pernah muncul di samping bubble;
- tombol **WhatsApp** tidak pernah muncul di samping bubble;
- semua CTA muncul di bawah bubble assistant yang relevan;
- CTA tidak berada di dalam bubble;
- border penting terlihat di desktop;
- layout konsisten pada desktop, tablet, dan mobile;
- satu CTA dan dua CTA sama-sama aman;
- tidak ada kebocoran nomor WhatsApp di visible text;
- QA lulus seluruh test matrix dan negative cases.

---

## 31. Final Product Decision Summary

Keputusan final produk yang harus diimplementasikan tanpa penyimpangan:

- **Bubble berada di atas**.
- **CTA berada di bawah bubble**.
- **CTA bukan di dalam bubble**.
- **CTA bukan di samping bubble**.
- **Desktop wajib tetap menampilkan border dengan jelas**.
- **Booking dan WhatsApp harus mendukung tampilan tunggal maupun ganda**.
- **Wireframe menjadi referensi struktur utama**.

Jika setelah implementasi tombol masih berada di samping bubble atau border desktop masih tidak terlihat, maka hasil tersebut **belum memenuhi PRD ini**.
