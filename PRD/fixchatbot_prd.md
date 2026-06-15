# Master PRD Final: CTA Booking & WhatsApp untuk Chatbot Alima Photo

## 1. Tujuan Dokumen

Dokumen ini adalah spesifikasi final yang **sangat detail, tegas, dan operasional** untuk mencegah miskomunikasi implementasi yang berulang pada fitur chatbot Alima Photo, khususnya untuk:

- posisi tombol **Booking sekarang** dan **Chat via WhatsApp**,
- bug bahwa tombol di desktop masih muncul **di samping bubble** alih-alih **di bawah bubble**,
- bug bahwa **border** di desktop tidak muncul atau tidak terlihat jelas,
- aturan copywriting respons booking,
- aturan bahwa respons **tidak boleh menampilkan placeholder** seperti `[nomor disembunyikan]`,
- aturan kapan CTA WhatsApp wajib muncul,
- aturan tampilan untuk kasus booking, area layanan, dan eskalasi WhatsApp.

Dokumen ini harus dianggap sebagai **sumber kebenaran final** untuk tim product, design, frontend, backend, QA, dan AI/prompt logic.

---

## 2. Ringkasan Keputusan Produk yang Final

Keputusan final yang **tidak boleh ditafsirkan ulang** adalah sebagai berikut:

1. **CTA harus berada di bawah bubble assistant, bukan di dalam bubble, dan bukan di samping bubble.**
2. **Pada desktop, border bubble dan border tombol CTA wajib terlihat jelas.**
3. **Respons booking tidak boleh menampilkan placeholder seperti `[nomor disembunyikan]`.**
4. **Nomor WhatsApp juga tidak boleh ditampilkan sebagai teks visible.**
5. **Jika user perlu diarahkan ke WhatsApp, sistem cukup menulis “konfirmasi via WhatsApp” atau “diskusi via WhatsApp”, lalu CTA WhatsApp yang menjadi jalur aksi.**
6. **Jika lokasi di luar area layanan utama, CTA WhatsApp wajib muncul.**
7. **Jika intent adalah booking, tombol Booking sekarang wajib muncul di bawah bubble.**
8. **Jika intent gabungan booking + konsultasi, dua tombol boleh muncul bersama, tetapi tetap berada dalam satu CTA container di bawah bubble.**

Jika implementasi melanggar satu saja dari poin di atas, maka implementasi dianggap **belum lolos PRD**.

---

## 3. Latar Belakang Masalah

Masalah yang terjadi berulang kali adalah:

- tombol **Booking sekarang** masih muncul di samping bubble pada desktop,
- border tidak muncul atau tidak cukup terlihat pada desktop,
- CTA masih terasa menyatu dengan bubble,
- copy booking masih mengandung placeholder `[nomor disembunyikan]`,
- AI atau implementasi masih gagal membedakan antara **isi jawaban** dan **aksi lanjutan**.

Dampaknya:

- wireframe tidak terpenuhi,
- UX terasa membingungkan,
- hasil implementasi tidak konsisten,
- user melihat copy yang kurang natural,
- proses QA berulang karena bug yang sama tidak benar-benar terkunci requirement-nya.

---

## 4. Problem Statement

Sistem chatbot saat ini belum memenuhi ekspektasi desain dan pengalaman pengguna karena:

- CTA belum selalu dirender sebagai **area aksi terpisah di bawah bubble**,
- layout desktop masih memungkinkan CTA bergeser ke samping bubble,
- border visual di desktop tidak stabil,
- copy respons booking masih menampilkan placeholder yang tidak diinginkan.

Sistem membutuhkan satu spesifikasi tunggal yang mengunci **struktur layout**, **rule rendering**, **style constraints**, **copy constraints**, dan **test criteria** agar tidak miss lagi.

---

## 5. Sasaran Produk

Produk harus mencapai semua sasaran berikut secara bersamaan:

- bubble tetap terbaca sebagai area percakapan,
- CTA terbaca sebagai aksi lanjutan,
- CTA selalu muncul di bawah bubble terkait,
- border terlihat jelas pada desktop,
- respons booking terdengar natural tanpa placeholder aneh,
- nomor WhatsApp tidak muncul sebagai teks visible,
- tombol muncul sesuai intent dan konteks bisnis.

---

## 6. Non-Sasaran

Dokumen ini tidak berfokus pada:

- redesign total seluruh chatbot,
- penambahan kanal selain Booking dan WhatsApp,
- penggantian identitas visual brand secara menyeluruh,
- integrasi CRM atau booking engine baru,
- penulisan ulang total semua respons FAQ di luar konteks ini.

---

## 7. Stakeholder

Dokumen ini relevan untuk:

- Product Manager,
- Designer,
- Frontend Engineer,
- Backend Engineer,
- QA Engineer,
- Prompt / AI Logic Owner,
- Business Owner Alima Photo.

---

## 8. Istilah Penting

**Assistant bubble** adalah bubble yang berisi jawaban chatbot.

**CTA container** adalah area khusus di bawah bubble yang menampung satu atau dua tombol aksi.

**Inline CTA** adalah tombol yang muncul di dalam isi bubble atau terasa menjadi bagian dari isi teks. Ini **dilarang**.

**Side CTA** adalah tombol yang muncul sejajar di samping bubble. Ini juga **dilarang**.

**Below-bubble CTA** adalah tombol atau grup tombol yang selalu muncul setelah bubble dalam urutan vertikal. Ini adalah perilaku yang **wajib**.

**Visible text** adalah seluruh teks yang dapat dibaca user secara langsung pada UI, termasuk isi bubble, label tombol, helper text, caption, dan placeholder yang dirender ke layar.

---

## 9. Persona dan Use Case

### 9.1 User yang ingin booking

User bertanya cara booking dan ingin segera melanjutkan.

Ekspektasi:

- bubble menjelaskan prosedur booking,
- tombol **Booking sekarang** muncul di bawah bubble,
- bila perlu konsultasi tambahan, tombol WhatsApp juga bisa muncul.

### 9.2 User yang ingin tanya admin dulu

User belum siap booking dan ingin konsultasi manual.

Ekspektasi:

- bubble memberi jawaban singkat,
- tombol **Chat via WhatsApp** muncul di bawah bubble,
- nomor tidak ditampilkan.

### 9.3 User di luar area utama

User bertanya untuk lokasi seperti Solo atau area lain di luar coverage utama.

Ekspektasi:

- bubble menjelaskan bahwa area tersebut di luar cakupan utama,
- bubble tetap mengarahkan user untuk diskusi lebih lanjut via WhatsApp,
- tombol WhatsApp wajib muncul di bawah bubble.

### 9.4 User yang ingin dua opsi

User ingin bisa booking atau chat dulu.

Ekspektasi:

- dua tombol muncul dalam satu grup di bawah bubble,
- urutan tombol jelas,
- layout tetap rapi di desktop dan mobile.

---

## 10. Keputusan Final yang Tidak Boleh Salah Lagi

### 10.1 Posisi CTA

- CTA **harus di bawah bubble**.
- CTA **tidak boleh di samping bubble**.
- CTA **tidak boleh di dalam bubble**.
- CTA **tidak boleh muncul sebelum bubble**.

### 10.2 Border desktop

- Border bubble assistant harus terlihat jelas di desktop.
- Border tombol CTA harus terlihat jelas di desktop.
- Jika ada outer container desain yang diwajibkan punya border atau outline, border itu juga harus terlihat.
- Style desktop tidak boleh menghilangkan border.

### 10.3 Copy booking

- Respons booking **tidak boleh** menampilkan `[nomor disembunyikan]`.
- Respons booking **tidak boleh** menampilkan nomor WhatsApp.
- Gunakan wording seperti: **“Setelah transfer, konfirmasi via WhatsApp.”**
- CTA WhatsApp adalah jalur aksi, bukan nomor dalam teks.

### 10.4 Area layanan di luar cakupan utama

- Jika pertanyaan terkait lokasi di luar area utama, CTA WhatsApp wajib tampil.
- Bubble tidak boleh berhenti hanya pada penolakan informatif.
- Bubble harus memberi opsi diskusi lanjutan melalui WhatsApp.

---

## 11. Ruang Lingkup

### In Scope

- Penempatan CTA Booking dan WhatsApp
- Struktur DOM / UI rendering
- Aturan border desktop
- Aturan copy untuk respons booking
- Aturan area layanan luar cakupan utama
- Skenario 1 CTA, 2 CTA, dan tanpa CTA
- Acceptance criteria dan QA checklist

### Out of Scope

- Rebuild total UI chat
- Sistem pembayaran baru
- Penambahan CTA kanal baru selain Booking dan WhatsApp
- Pengubahan informasi bisnis di luar data yang sudah digunakan chatbot

---

## 12. Aturan Konten Booking yang Wajib

Berdasarkan instruksi booking yang menjadi referensi, respons booking harus memuat informasi inti yang relevan, tetapi dengan format yang benar dan aman.

### 12.1 Informasi yang boleh disebut di bubble

Respons booking boleh menjelaskan hal-hal seperti:

- booking idealnya dilakukan minimal sebelum hari acara sesuai kebijakan yang berlaku,
- ada DP minimum untuk mengamankan tanggal,
- pembayaran transfer dilakukan ke rekening yang ditentukan,
- setelah transfer user melakukan konfirmasi via WhatsApp,
- tim akan menghubungi mendekati hari acara untuk konfirmasi detail,
- biaya tambahan lokasi jauh dan tambahan jam dapat disebut jika relevan.

### 12.2 Informasi yang tidak boleh disebut di bubble

Respons booking tidak boleh menampilkan:

- nomor WhatsApp,
- placeholder `[nomor disembunyikan]`,
- instruksi yang membuat CTA jadi tidak diperlukan,
- struktur teks yang mencampur CTA dengan isi paragraf.

### 12.3 Wording yang benar

Contoh wording yang **benar**:

> “Setelah transfer, konfirmasi via WhatsApp ya kak.”

Contoh wording yang **salah**:

> “Setelah transfer, konfirmasi via WhatsApp ke [nomor disembunyikan].”

Contoh wording yang **juga salah**:

> “Setelah transfer, konfirmasi via WhatsApp ke 08xxxxxxxxxx.”

---

## 13. Requirement Fungsional

### 13.1 Struktur dasar message block

Setiap respons assistant yang memiliki CTA harus mengikuti struktur konseptual ini:

assistant-message-block
├── assistant-bubble-row
│ └── assistant-bubble
└── assistant-cta-row
└── cta-container
├── booking-button (optional)
└── whatsapp-button (optional)

### 13.2 Rule render

- Bubble dirender lebih dulu.
- CTA row dirender setelah bubble row.
- CTA row berada pada row terpisah.
- CTA row tidak boleh berbagi row horizontal yang sama dengan bubble.
- Jika tidak ada tombol yang perlu ditampilkan, `assistant-cta-row` dan `cta-container` tidak dirender.

### 13.3 Rule kemunculan CTA

- Tampilkan **Booking sekarang** jika intent booking terdeteksi.
- Tampilkan **Chat via WhatsApp** jika intent konsultasi/admin/manual follow-up terdeteksi.
- Tampilkan **Chat via WhatsApp** jika lokasi berada di luar area layanan utama.
- Tampilkan keduanya jika intent gabungan booking + konsultasi terdeteksi.

### 13.4 Rule urutan tombol

Jika dua tombol muncul, urutan default adalah:

1. **Booking sekarang**
2. **Chat via WhatsApp**

### 13.5 Rule privasi

- Nomor WhatsApp tidak boleh dirender pada visible text.
- Placeholder `[nomor disembunyikan]` tidak boleh dirender pada visible text.
- CTA WhatsApp menjadi satu-satunya pintu masuk visual ke percakapan WhatsApp.

---

## 14. Requirement Visual dan Layout

### 14.1 Hirarki visual

Urutan visual yang wajib dilihat user:

1. bubble jawaban assistant,
2. jarak vertikal yang cukup,
3. CTA container,
4. tombol CTA di dalam CTA container.

### 14.2 Layout yang benar

Layout yang benar secara konsep:

[ Bubble assistant ]
[ CTA Booking ] [ CTA WhatsApp ]

dengan catatan penting bahwa baris CTA berada **di bawah** baris bubble, bukan sejajar secara vertikal di sisi kanan.

### 14.3 Layout yang salah

Semua contoh ini salah:

[ Bubble assistant ] [ CTA Booking ]

[ Bubble assistant dengan tombol di dalamnya ]

[ CTA Booking ]
[ Bubble assistant ]

### 14.4 Alignment

- CTA container harus mengikuti alignment area assistant.
- CTA boleh lebih sempit atau lebih lebar dari bubble sesuai desain, tetapi tetap dimulai dari area bawah bubble.
- CTA tidak boleh mengapung ke sisi kanan layout utama sehingga tampak terpisah dari konteks bubble.

### 14.5 Jarak vertikal

Harus ada jarak vertikal yang konsisten antara bubble dan CTA container. Jarak ini harus cukup untuk menunjukkan pemisahan, tetapi cukup dekat untuk menunjukkan relasi konteks.

### 14.6 Responsive behavior

- **Desktop:** CTA container tetap berada di bawah bubble; jika dua tombol muncul, boleh sejajar horizontal di dalam CTA container.
- **Tablet:** CTA container tetap berada di bawah bubble; dua tombol bisa horizontal atau vertikal tergantung ruang.
- **Mobile:** CTA container tetap berada di bawah bubble; dua tombol boleh stack vertikal.

---

## 15. Requirement Border Desktop

### 15.1 Border yang wajib terlihat

Pada desktop, elemen berikut wajib memiliki border/outline yang terlihat:

- assistant bubble,
- tombol Booking sekarang,
- tombol Chat via WhatsApp,
- container visual lain jika memang desain mewajibkan border.

### 15.2 Definisi “terlihat jelas”

Border dianggap terlihat jelas jika:

- dapat dibedakan dari background tanpa harus diperbesar,
- tidak hilang karena warna terlalu mirip,
- tidak hilang setelah resize,
- tidak hilang karena hover/focus/default state tertentu,
- tetap terlihat pada browser desktop umum.

### 15.3 Penyebab yang harus dihindari

Bug border desktop sering muncul karena:

- warna border terlalu dekat dengan background,
- border tertimpa style lain,
- media query desktop menghapus border,
- border diganti shadow yang terlalu halus,
- overflow atau clipping memotong border,
- state default dan hover tidak sinkron.

### 15.4 Aturan teknis konseptual

Implementasi harus memastikan:

- border tidak bergantung pada satu state interaksi saja,
- state default sudah menampilkan border,
- hover/focus tidak menghilangkan border,
- desktop breakpoint tidak menimpa border menjadi none atau transparan.

---

## 16. Requirement Copywriting untuk Respons Booking

### 16.1 Tujuan copy booking

Copy booking harus:

- jelas,
- natural,
- ramah,
- tidak membocorkan nomor,
- tidak memakai placeholder yang terlihat janggal,
- tetap mendorong aksi ke CTA.

### 16.2 Struktur respons booking yang direkomendasikan

Respons booking dapat memiliki struktur:

- sapaan singkat,
- penjelasan prosedur utama,
- instruksi pembayaran/konfirmasi,
- penutup yang mengarahkan ke CTA.

### 16.3 Contoh respons booking yang benar

Contoh:

> “Halo kak, terima kasih sudah bertanya. Untuk booking di Alima Photo, caranya begini ya kak:
>
> 1. Booking dilakukan sesuai ketentuan waktu sebelum hari acara.
> 2. Ada DP minimum untuk mengamankan tanggal.
> 3. Pembayaran transfer dilakukan ke rekening yang tertera.
> 4. Setelah transfer, konfirmasi via WhatsApp ya kak.
> 5. Tim akan menghubungi lagi untuk konfirmasi detail acara.
>    Kalau ada yang mau ditanyakan lebih lanjut, langsung klik tombol di bawah ya kak.”

### 16.4 Contoh respons booking yang salah

Contoh yang salah:

> “Setelah transfer, konfirmasi via WhatsApp ke [nomor disembunyikan].”

Alasan salah:

- placeholder terlihat tidak natural,
- memperburuk UX,
- CTA seharusnya menangani aksi.

Contoh lain yang salah:

> “Booking sekarangChat via WhatsApp”

Alasan salah:

- tombol terlihat menyatu dengan teks,
- tidak ada pemisahan visual,
- berarti implementasi CTA salah.

---

## 17. Requirement Khusus Area Layanan

### 17.1 Dalam area layanan utama

Jika user berada di area layanan utama:

- bubble menjawab sesuai konteks,
- CTA mengikuti intent biasa,
- CTA WhatsApp opsional sesuai intent.

### 17.2 Di luar area layanan utama

Jika user bertanya untuk area di luar layanan utama:

- bubble harus menjelaskan bahwa area tersebut di luar cakupan utama,
- bubble harus tetap membuka kemungkinan diskusi lanjutan,
- CTA **Chat via WhatsApp** wajib muncul,
- bubble tidak boleh berhenti hanya pada penolakan atau informasi pasif.

### 17.3 Contoh respons yang benar

Contoh:

> “Untuk wilayah itu memang belum termasuk area layanan utama kami, kak. Tapi kalau kakak mau diskusi lebih lanjut terkait kebutuhan acaranya, bisa lanjut lewat WhatsApp ya.”

Lalu tampilkan CTA **Chat via WhatsApp** di bawah bubble.

### 17.4 Contoh respons yang salah

Contoh salah:

> “Sayangnya Solo belum termasuk area layanan utama kami, kak. Ada yang bisa dibantu lagi?”

Alasan salah:

- tidak mengarahkan ke WhatsApp,
- tidak membuka jalur follow-up,
- tidak sesuai rule eskalasi untuk luar area utama.

---

## 18. Anti-Pattern yang Dilarang

Semua hal berikut **dilarang**:

### 18.1 CTA di samping bubble

Jika pada desktop layout menjadi:

[ bubble ] [ booking ]

maka implementasi gagal.

### 18.2 CTA di dalam bubble

Tombol tidak boleh berada di dalam kontainer bubble, footer bubble, atau inline content bubble.

### 18.3 Border tidak muncul di desktop

Jika border hanya terlihat di mobile, implementasi gagal.

### 18.4 Placeholder `[nomor disembunyikan]`

Placeholder ini tidak boleh ada di visible text mana pun.

### 18.5 CTA menyatu dengan teks

Jika di layar terbaca seperti:

> “...langsung aja kak Booking sekarangChat via WhatsApp”

maka implementasi gagal karena artinya CTA tidak dipisahkan dengan benar.

### 18.6 CTA container kosong

Wrapper CTA tidak boleh muncul kalau tidak ada tombol yang harus dirender.

---

## 19. Kontrak Data Frontend-Backend

Agar frontend bisa merender dengan deterministic, backend harus mengirim struktur data yang jelas.

Contoh payload minimal:

{
"reply": "Halo kak, untuk booking caranya begini ya... Setelah transfer, konfirmasi via WhatsApp ya kak.",
"cta": {
"show_booking": true,
"show_whatsapp": true,
"booking_label": "Booking sekarang",
"whatsapp_label": "Chat via WhatsApp"
},
"context": {
"outside_service_area": false,
"booking_intent": true,
"manual_followup_recommended": true
}
}

### 19.1 Rule render dari payload

- `reply` dirender ke bubble.
- `cta.show_booking` menentukan tombol Booking.
- `cta.show_whatsapp` menentukan tombol WhatsApp.
- `cta-container` dirender hanya jika minimal satu tombol aktif.
- `outside_service_area: true` harus memicu CTA WhatsApp.

### 19.2 Constraint penting

- Data payload tidak boleh membuat frontend me-render placeholder `[nomor disembunyikan]`.
- Jika backend mengirim teks semacam itu, frontend harus punya sanitasi atau rule yang mencegah render mentah jika diperlukan.

---

## 20. Sanitization Rules

### 20.1 Untuk AI / LLM output

Jika model menghasilkan teks yang memuat:

- nomor WhatsApp,
- placeholder `[nomor disembunyikan]`,

maka output harus dianggap perlu dibersihkan sebelum ditampilkan.

### 20.2 Transformasi yang diinginkan

- `konfirmasi via WhatsApp ke [nomor disembunyikan]` → `konfirmasi via WhatsApp ya kak`
- `hubungi nomor berikut` → `lanjut lewat WhatsApp ya kak`

### 20.3 Tujuan sanitasi

- menjaga UX natural,
- menjaga privasi,
- membuat CTA tetap relevan sebagai action point.

---

## 21. Acceptance Criteria Utama

### 21.1 Posisi tombol

- Tombol Booking sekarang selalu berada di bawah bubble.
- Tombol Chat via WhatsApp selalu berada di bawah bubble.
- Tidak ada CTA yang muncul di samping bubble.

### 21.2 Border desktop

- Border bubble terlihat pada desktop.
- Border tombol terlihat pada desktop.
- Border tidak hilang saat resize.
- Border tidak hilang pada state default, hover, atau focus.

### 21.3 Copy booking

- Respons booking tidak mengandung `[nomor disembunyikan]`.
- Respons booking tidak mengandung nomor WhatsApp visible.
- Respons booking tetap mengarahkan ke WhatsApp lewat CTA bila relevan.

### 21.4 Area layanan

- Pertanyaan lokasi di luar area layanan utama memunculkan CTA WhatsApp.
- Bubble mengarahkan user untuk diskusi lanjutan.

### 21.5 Rendering CTA

- Satu tombol: tetap di bawah bubble.
- Dua tombol: tetap di bawah bubble dalam satu CTA container.
- Tanpa tombol: tidak ada CTA container kosong.

---

## 22. Test Matrix Detail

### 22.1 Case: tanya cara booking

Input user:

> “gimana cara booking kak?”

Expected:

- bubble menjelaskan prosedur booking,
- tidak ada placeholder `[nomor disembunyikan]`,
- tombol **Booking sekarang** muncul di bawah bubble,
- jika policy mengizinkan, tombol WhatsApp juga bisa muncul di bawah bubble,
- di desktop border bubble dan border tombol terlihat jelas.

### 22.2 Case: booking + konsultasi

Input user:

> “Saya mau booking tapi mau tanya dulu via WA.”

Expected:

- bubble tampil,
- tombol **Booking sekarang** dan **Chat via WhatsApp** tampil di bawah bubble,
- pada desktop keduanya boleh sejajar dalam satu row CTA,
- tetapi row CTA tetap berada di bawah bubble.

### 22.3 Case: di luar area layanan

Input user:

> “Apakah bisa untuk acara di Solo?”

Expected:

- bubble menjelaskan area tersebut di luar cakupan utama,
- bubble tetap mengarahkan user untuk diskusi lanjutan,
- tombol **Chat via WhatsApp** wajib muncul di bawah bubble,
- nomor WhatsApp tidak ditampilkan.

### 22.4 Case: bubble pendek

Expected:

- CTA tetap di bawah bubble,
- tidak pindah ke samping bubble walaupun ruang desktop longgar.

### 22.5 Case: bubble panjang

Expected:

- CTA tetap di bawah bubble,
- spacing tetap rapi,
- border bubble tetap terlihat.

### 22.6 Case: desktop wide screen

Expected:

- CTA tidak pindah ke samping bubble,
- border terlihat jelas,
- tidak ada state di mana border hilang karena breakpoint.

### 22.7 Case: resize browser

Expected:

- selama resize desktop ke tablet ke mobile, CTA tetap di bawah bubble,
- border tetap muncul di setiap breakpoint.

### 22.8 Case: hover/focus

Expected:

- hover dan focus tidak menghapus border,
- tombol tetap jelas terlihat sebagai button.

### 22.9 Case: sanitasi placeholder

Jika backend/AI menghasilkan teks mentah:

> “Setelah transfer, konfirmasi via WhatsApp ke [nomor disembunyikan].”

Expected:

- teks visible yang dirender sudah disanitasi,
- placeholder tidak muncul di UI,
- CTA WhatsApp tetap tersedia bila relevan.

---

## 23. Negative Test Cases

Implementasi dinyatakan gagal jika salah satu kondisi berikut terjadi:

- tombol Booking sekarang muncul di kanan bubble,
- tombol Chat via WhatsApp muncul di kanan bubble,
- CTA menjadi bagian dari bubble,
- border bubble tidak terlihat di desktop,
- border tombol tidak terlihat di desktop,
- teks bubble masih menampilkan `[nomor disembunyikan]`,
- teks bubble menampilkan nomor WhatsApp,
- CTA menyatu dengan teks seperti “Booking sekarangChat via WhatsApp”,
- cta-container kosong tetap dirender,
- resize browser mengubah CTA menjadi side placement.

---

## 24. QA Checklist Operasional

### 24.1 Struktur

- Apakah bubble dan CTA berada di row terpisah?
- Apakah CTA row selalu dirender setelah bubble row?
- Apakah CTA bukan child dari bubble content?

### 24.2 Visual

- Apakah tombol terlihat jelas terpisah dari bubble?
- Apakah tombol berada di bawah bubble?
- Apakah border bubble terlihat di desktop?
- Apakah border tombol terlihat di desktop?

### 24.3 Copy

- Apakah ada placeholder `[nomor disembunyikan]`?
- Apakah ada nomor WhatsApp visible?
- Apakah copy booking terdengar natural?

### 24.4 Context behavior

- Apakah luar area layanan memunculkan CTA WhatsApp?
- Apakah booking intent memunculkan CTA Booking?
- Apakah intent gabungan memunculkan dua tombol?

### 24.5 Responsive

- Apakah desktop aman?
- Apakah tablet aman?
- Apakah mobile aman?
- Apakah resize tidak merusak layout?

---

## 25. Risiko Implementasi

### Risiko 1

Developer memakai wrapper horizontal yang menyatukan bubble dan CTA.

Dampak:

- CTA pindah ke samping bubble.

Mitigasi:

- wajib pisahkan `assistant-bubble-row` dan `assistant-cta-row`.

### Risiko 2

Media query desktop menimpa border.

Dampak:

- border hilang di desktop.

Mitigasi:

- audit style desktop secara eksplisit dalam QA.

### Risiko 3

AI mengeluarkan placeholder `[nomor disembunyikan]`.

Dampak:

- copy tidak natural,
- UX buruk,
- terlihat seperti bug.

Mitigasi:

- tambahkan sanitization rule dan prompt rule yang eksplisit.

### Risiko 4

CTA ganda membuat layout tidak stabil.

Mitigasi:

- gunakan CTA container khusus dengan perilaku responsive yang sudah didefinisikan.

---

## 26. Definisi Selesai

Fitur dianggap selesai hanya jika seluruh syarat berikut terpenuhi:

- CTA selalu berada di bawah bubble,
- tidak pernah muncul di samping bubble,
- border bubble terlihat di desktop,
- border tombol terlihat di desktop,
- respons booking tidak menampilkan `[nomor disembunyikan]`,
- respons booking tidak menampilkan nomor WhatsApp visible,
- luar area layanan selalu mengarahkan ke CTA WhatsApp,
- satu CTA dan dua CTA sama-sama tampil benar,
- QA lulus semua acceptance criteria dan negative cases.

---

## 27. Ringkasan Final untuk Tim Implementasi

Jika tim hanya mengingat 7 hal, maka yang harus diingat adalah:

1. **Bubble di atas, CTA di bawah.**
2. **CTA bukan di samping bubble.**
3. **CTA bukan di dalam bubble.**
4. **Border desktop wajib terlihat.**
5. **Jangan tampilkan `[nomor disembunyikan]`.**
6. **Jangan tampilkan nomor WhatsApp sebagai teks.**
7. **Luar area layanan wajib diarahkan ke WhatsApp.**

Itulah baseline minimum. Jika ada satu saja yang gagal, maka implementasi masih salah.
