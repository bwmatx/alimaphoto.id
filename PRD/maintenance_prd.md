# PRD — Maintenance Page Website

## 1. Ringkasan Produk

Maintenance Page adalah halaman sementara yang ditampilkan ketika website utama sedang dalam proses perbaikan, pembaruan sistem, migrasi server, perbaikan bug, peningkatan keamanan, atau proses deployment. Halaman ini berfungsi sebagai pengganti sementara dari website utama agar pengguna tetap mendapatkan informasi yang jelas, profesional, dan tidak menganggap website sedang rusak permanen.

Halaman maintenance harus dibuat sederhana, cepat dimuat, responsif di seluruh perangkat, serta mampu menyampaikan status layanan dengan jelas. Fokus utama halaman ini adalah memberi tahu pengguna bahwa website sedang dalam pemeliharaan, memberikan estimasi waktu penyelesaian bila tersedia, menyediakan jalur kontak alternatif, serta menjaga kepercayaan pengguna terhadap brand.

## 2. Tujuan Produk

Tujuan utama dari halaman ini adalah menyediakan tampilan sementara yang informatif dan profesional saat website tidak dapat diakses secara normal.

Tujuan spesifik:

1. Memberikan informasi bahwa website sedang dalam proses maintenance.
2. Menghindari tampilan error bawaan server seperti 500, 502, 503, atau blank page.
3. Menjaga citra brand agar tetap terlihat profesional meskipun website sedang tidak aktif.
4. Memberikan informasi estimasi waktu website kembali aktif.
5. Menyediakan tombol untuk mencoba kembali mengakses website.
6. Menyediakan jalur kontak alternatif seperti email, WhatsApp, atau media sosial.
7. Mendukung tampilan desktop, tablet, dan mobile.
8. Memastikan halaman tetap ringan dan dapat dimuat meskipun server utama sedang dibatasi.
9. Gunakan HTML, CSS, JS saja.

## 3. Latar Belakang Masalah

Ketika website sedang mengalami perbaikan, pengguna sering kali hanya melihat pesan error teknis, halaman kosong, atau tampilan default dari server. Kondisi tersebut dapat menimbulkan kesan bahwa website tidak profesional, tidak aktif, atau mengalami gangguan serius.

Maintenance Page dibutuhkan sebagai solusi antarmuka sementara agar komunikasi kepada pengguna tetap terkendali. Dengan halaman ini, pengguna mengetahui bahwa gangguan bersifat sementara dan masih tersedia informasi lanjutan untuk menghubungi pengelola layanan.

## 4. Sasaran Pengguna

Halaman ini ditujukan untuk seluruh pengguna yang mencoba mengakses website saat sistem utama sedang tidak tersedia.

Kelompok pengguna:

1. Pengunjung umum
   Pengguna yang membuka website untuk mencari informasi, produk, layanan, artikel, atau halaman tertentu.

2. Pelanggan aktif
   Pengguna yang sudah pernah menggunakan layanan dan membutuhkan informasi lanjutan.

3. Calon pelanggan
   Pengguna baru yang pertama kali membuka website dan perlu tetap mendapatkan kesan profesional.

4. Tim internal
   Admin, developer, owner, atau tim operasional yang perlu memastikan website menampilkan status maintenance dengan benar.

## 5. Ruang Lingkup

### 5.1 In Scope

Fitur yang termasuk dalam pengembangan:

1. Halaman utama maintenance.
2. Pesan status website.
3. Judul utama dan deskripsi singkat.
4. Logo atau nama brand.
5. Estimasi waktu selesai maintenance.
6. Tombol “Coba Lagi”.
7. Tombol atau tautan kontak alternatif.
8. Informasi media sosial bila dibutuhkan.
9. Tampilan responsif.
10. Optimasi kecepatan halaman.
11. Status HTTP yang sesuai.
12. Metadata dasar untuk browser.
13. Fallback jika estimasi waktu tidak tersedia.
14. Konfigurasi maintenance mode melalui environment variable atau konfigurasi server.
15. Tampilan yang tetap layak meskipun JavaScript tidak aktif.

### 5.2 Out of Scope

Fitur yang tidak termasuk pada versi awal:

1. Dashboard admin khusus untuk mengatur maintenance.
2. Sistem login pengguna.
3. Sistem notifikasi otomatis ke email pengguna.
4. Live chat penuh.
5. Integrasi tiket bantuan kompleks.
6. Sistem status page multi-layanan.
7. Riwayat downtime.
8. Fitur pembayaran, transaksi, atau pemesanan.
9. Animasi berat yang memengaruhi performa.
10. Pengelolaan konten dinamis melalui CMS.

## 6. Platform

Halaman maintenance harus dapat berjalan di:

1. Desktop browser: Chrome, Firefox, Edge, Safari.
2. Mobile browser: Chrome Android, Safari iOS.
3. Tablet browser.
4. Server hosting umum seperti VPS, shared hosting, Vercel, Netlify, Cloudflare Pages, atau hosting custom.
5. Website berbasis HTML statis.
6. jangan gunakan, react, typescript, dan sejenisnya. hanya gunakan HTML, CSS, JS

## 7. Prinsip Desain

Desain halaman harus bersih, minimalis, dan langsung menyampaikan informasi utama. Pengguna tidak boleh merasa kebingungan ketika membuka halaman.

Prinsip desain:

1. Satu pesan utama yang jelas.
2. Tampilan tidak terlalu ramai.
3. Kontras teks harus terbaca.
4. Posisi konten berada di tengah layar.
5. Visual mendukung pesan maintenance, bukan mengganggu.
6. Tidak menggunakan terlalu banyak animasi.
7. Brand tetap terlihat melalui logo, warna, atau tipografi.
8. Tampilan mobile harus menjadi prioritas utama.
9. Elemen penting harus terlihat tanpa perlu scroll panjang.
10. Halaman tetap ringan dan cepat dimuat.

## 8. Struktur Halaman

### 8.1 Header Minimal

Header hanya berisi logo atau nama brand. Header tidak perlu memiliki menu navigasi karena website utama sedang tidak dapat diakses.

Komponen:

1. Logo brand.
2. Nama brand bila logo tidak tersedia.
3. Label kecil opsional: “System Maintenance” atau “Scheduled Maintenance”.

Ketentuan:

1. Header harus sederhana.
2. Logo tidak boleh terlalu besar.
3. Tidak perlu menampilkan menu halaman lain.
4. Header dapat berada di tengah atau kiri atas, mengikuti gaya brand.

### 8.2 Hero Section

Hero Section menjadi bagian utama halaman. Bagian ini harus langsung menjelaskan bahwa website sedang dalam maintenance.

Konten utama:

1. Badge status: “Maintenance Mode”.
2. Headline: “Website Sedang Dalam Pemeliharaan”.
3. Deskripsi singkat.
4. Estimasi waktu selesai.
5. Tombol tindakan utama.
6. Tombol tindakan sekunder.

Contoh copy:

Headline:
Website Sedang Dalam Pemeliharaan

Deskripsi:
Kami sedang melakukan pembaruan sistem untuk meningkatkan kualitas layanan. Website akan kembali dapat diakses setelah proses maintenance selesai.

Estimasi:
Perkiraan selesai: [Tanggal], pukul [Jam] WIB

Fallback jika estimasi tidak tersedia:
Website akan segera kembali aktif. Silakan coba beberapa saat lagi.

CTA utama:
Coba Lagi

CTA sekunder:
Hubungi Kami

### 8.3 Status Information Section

Bagian ini menampilkan informasi ringkas mengenai status maintenance.

Konten:

1. Status sistem: Sedang maintenance.
2. Jenis maintenance: Pembaruan sistem / perbaikan teknis / peningkatan keamanan.
3. Estimasi selesai.
4. Kontak bantuan.

Format tampilan dapat berupa kartu kecil.

Contoh:

Status Sistem: Dalam Pemeliharaan
Jenis Maintenance: Pembaruan Sistem
Estimasi Selesai: 22.00 WIB
Bantuan: [support@domain.com](mailto:support@domain.com)

### 8.4 Contact Section

Bagian kontak digunakan untuk memberi pengguna akses ke jalur komunikasi lain.

Konten yang dapat ditampilkan:

1. Email support.
2. Nomor WhatsApp.
3. Instagram.
4. LinkedIn.
5. Nomor telepon.
6. Tautan status page bila tersedia.

Ketentuan:

1. Jangan menampilkan terlalu banyak kontak.
2. Prioritaskan satu kontak utama.
3. Gunakan teks yang jelas.
4. Tautan harus dapat diklik.
5. Untuk WhatsApp, gunakan format tautan resmi `https://wa.me/6285232321080`.

### 8.5 Footer

Footer dibuat sederhana.

Konten:

1. Copyright.
2. Nama brand.
3. Tahun berjalan.
4. Pesan pendek opsional.

Contoh:

© 2026 [Nama Brand]. All rights reserved. sesuai dengan @index.html

## 9. Kebutuhan Konten

### 9.1 Bahasa

Bahasa utama menggunakan Bahasa Indonesia. Gaya bahasa harus formal, singkat, dan mudah dipahami.

Nada komunikasi:

1. Tenang.
2. Profesional.
3. Tidak terlalu teknis.
4. Tidak menyalahkan sistem atau pengguna.
5. Tidak menggunakan kalimat panik seperti “server down total” atau “website error parah”.

### 9.2 Copy Utama

Judul utama:
Website Sedang Dalam Pemeliharaan

Deskripsi utama:
Kami sedang melakukan pembaruan sistem untuk meningkatkan performa, keamanan, dan kenyamanan pengguna. Silakan kembali beberapa saat lagi.

Copy estimasi:
Perkiraan website kembali aktif: [hari, tanggal, jam] WIB.

Copy tanpa estimasi:
Website akan segera kembali aktif. Silakan coba beberapa saat lagi.

Copy tombol:
Coba Lagi
Hubungi Kami

Copy kontak:
Butuh bantuan segera? Hubungi tim kami melalui [email/WhatsApp].

### 9.3 Variasi Pesan Berdasarkan Jenis Maintenance

Scheduled Maintenance:
Kami sedang melakukan pemeliharaan terjadwal untuk meningkatkan kualitas layanan. Website akan kembali aktif sesuai estimasi waktu yang telah ditentukan.

Emergency Maintenance:
Kami sedang melakukan perbaikan teknis mendesak agar layanan dapat kembali berjalan normal. Terima kasih atas kesabaran Anda.

Deployment Maintenance:
Kami sedang memperbarui sistem ke versi terbaru. Website akan kembali dapat digunakan setelah proses pembaruan selesai.

Security Maintenance:
Kami sedang melakukan peningkatan keamanan sistem untuk menjaga kenyamanan dan perlindungan data pengguna.

## 10. User Flow

### 10.1 Flow Pengunjung Umum

1. Pengguna membuka website.
2. Sistem mendeteksi maintenance mode aktif.
3. Pengguna diarahkan ke Maintenance Page.
4. Pengguna membaca informasi maintenance.
5. Pengguna melihat estimasi waktu selesai.
6. Pengguna memilih:
   - klik “Coba Lagi”, atau
   - klik “Hubungi Kami”.

### 10.2 Flow Tombol Coba Lagi

1. Pengguna klik tombol “Coba Lagi”.
2. Browser melakukan reload halaman.
3. Jika maintenance masih aktif, halaman maintenance tetap tampil.
4. Jika maintenance sudah selesai, pengguna masuk ke website utama.

### 10.3 Flow Kontak

1. Pengguna klik tombol “Hubungi Kami”.
2. Sistem membuka email, WhatsApp, atau tautan kontak.
3. Pengguna dapat menghubungi pengelola layanan.

## 11. Kebutuhan Fungsional

### FR-001 — Menampilkan Halaman Maintenance

Sistem harus menampilkan halaman maintenance ketika maintenance mode aktif.

Acceptance Criteria:

1. Ketika maintenance mode aktif, semua request pengguna diarahkan ke halaman maintenance.
2. Halaman maintenance tampil tanpa error.
3. Konten utama terlihat jelas pada desktop dan mobile.
4. Pengguna tidak melihat halaman error server default.

### FR-002 — Menampilkan Informasi Status

Sistem harus menampilkan status bahwa website sedang dalam pemeliharaan.

Acceptance Criteria:

1. Ada headline yang menyatakan website sedang maintenance.
2. Ada deskripsi singkat alasan maintenance.
3. Ada status visual seperti badge atau label.
4. Informasi tidak menggunakan istilah teknis yang membingungkan pengguna umum.

### FR-003 — Menampilkan Estimasi Waktu

Sistem harus mampu menampilkan estimasi waktu selesai maintenance jika data tersedia.

Acceptance Criteria:

1. Estimasi waktu dapat ditampilkan dalam format tanggal dan jam.
2. Zona waktu menggunakan WIB.
3. Jika estimasi waktu tidak tersedia, sistem menampilkan fallback copy.
4. Estimasi waktu dapat diubah tanpa mengedit struktur halaman secara besar.

### FR-004 — Tombol Coba Lagi

Sistem harus menyediakan tombol untuk mencoba mengakses ulang website.

Acceptance Criteria:

1. Tombol “Coba Lagi” tersedia di area utama.
2. Ketika diklik, halaman melakukan reload.
3. Tombol dapat digunakan di desktop dan mobile.
4. Tombol memiliki state hover dan active.

### FR-005 — Kontak Alternatif

Sistem harus menyediakan tautan kontak alternatif.

Acceptance Criteria:

1. Minimal tersedia satu kontak utama.
2. Email menggunakan format `mailto:`.
3. WhatsApp menggunakan format `https://wa.me/`.
4. Tautan terbuka dengan benar.
5. Kontak tetap terlihat jelas pada mobile.

### FR-006 — Responsif

Halaman harus responsif di berbagai ukuran layar.

Acceptance Criteria:

1. Tampilan desktop minimal 1280px terlihat proporsional.
2. Tampilan tablet 768px tetap rapi.
3. Tampilan mobile 360px tidak terpotong.
4. Tidak ada horizontal scroll.
5. Tombol mudah diklik pada layar sentuh.

### FR-007 — Fallback Tanpa JavaScript

Halaman tetap dapat dibaca meskipun JavaScript tidak aktif.

Acceptance Criteria:

1. Headline tetap muncul.
2. Deskripsi tetap muncul.
3. Kontak tetap muncul.
4. Tombol reload tetap dapat bekerja sebagai tautan atau fallback.
5. Layout tetap terbaca.

### FR-008 — Maintenance Mode Toggle

Sistem harus memiliki mekanisme untuk mengaktifkan atau menonaktifkan maintenance mode.

Acceptance Criteria:

1. Maintenance mode dapat diatur melalui environment variable, konfigurasi server, atau file konfigurasi.
2. Ketika status aktif, pengguna melihat halaman maintenance.
3. Ketika status tidak aktif, pengguna dapat mengakses website utama.
4. Tim developer dapat mengubah status tanpa mengubah banyak file.

Contoh konfigurasi:

`MAINTENANCE_MODE=true`
`MAINTENANCE_END_TIME=2026-06-11T22:00:00+07:00`
`MAINTENANCE_CONTACT_EMAIL=support@domain.com`
`MAINTENANCE_CONTACT_WHATSAPP=628xxxxxxxxxx`

## 12. Kebutuhan Non-Fungsional

### 12.1 Performance

Halaman harus sangat ringan karena digunakan saat sistem utama sedang tidak tersedia.

Target:

1. Ukuran halaman di bawah 500 KB jika memungkinkan.
2. Tidak menggunakan library berat.
3. Waktu muat awal di bawah 2 detik pada koneksi standar.
4. Gambar dikompresi.
5. Font eksternal dibatasi atau menggunakan system font.
6. Tidak memuat script pihak ketiga yang tidak penting.

### 12.2 Accessibility

Halaman harus dapat digunakan oleh pengguna dengan kebutuhan aksesibilitas dasar.

Ketentuan:

1. Kontras teks minimal memenuhi standar keterbacaan.
2. Tombol dapat diakses dengan keyboard.
3. Struktur heading jelas.
4. Gambar dekoratif menggunakan alt kosong.
5. Gambar informatif menggunakan alt yang deskriptif.
6. Ukuran teks utama mudah dibaca.
7. Tidak menyampaikan informasi hanya melalui warna.

### 12.3 SEO dan Crawling

Karena halaman bersifat sementara, konfigurasi SEO harus mencegah mesin pencari menganggap halaman maintenance sebagai konten utama website.

Ketentuan:

1. Gunakan status HTTP 503 untuk maintenance sementara.
2. Tambahkan header `Retry-After` jika estimasi waktu tersedia.
3. Gunakan meta robots `noindex, nofollow` untuk halaman maintenance jika diperlukan.
4. Jangan mengganti metadata utama website secara permanen.
5. Jangan redirect permanen 301 ke halaman maintenance.

### 12.4 Security

Halaman maintenance tidak boleh membuka informasi teknis sensitif.

Ketentuan:

1. Tidak menampilkan stack trace.
2. Tidak menampilkan nama database.
3. Tidak menampilkan path server.
4. Tidak menampilkan informasi kredensial.
5. Tidak menampilkan detail error internal.
6. Tidak menampilkan daftar endpoint internal.
7. Tidak membuka panel admin.

### 12.5 Reliability

Halaman harus tetap dapat tampil meskipun sebagian layanan utama tidak aktif.

Ketentuan:

1. Halaman dapat dibuat statis.
2. Tidak bergantung pada database.
3. Tidak bergantung pada API utama.
4. Tidak bergantung pada autentikasi.
5. Aset utama tersedia secara lokal atau melalui CDN yang stabil.

## 13. UI Requirements

### 13.1 Layout Desktop

Struktur desktop:

1. Logo di bagian atas.
2. Konten utama di tengah layar.
3. Badge status di atas headline.
4. Headline besar.
5. Deskripsi maksimal 2–3 baris.
6. Informasi estimasi waktu dalam card kecil.
7. Dua tombol CTA.
8. Footer sederhana.

Rekomendasi ukuran:

1. Container maksimal: 960px.
2. Lebar konten utama: 640px.
3. Headline: 40–56px.
4. Body text: 16–18px.
5. Tombol: tinggi 44–52px.

### 13.2 Layout Mobile

Struktur mobile:

1. Logo di bagian atas tengah.
2. Konten utama berada di tengah.
3. Headline maksimal 2–3 baris.
4. Deskripsi tidak terlalu panjang.
5. Tombol disusun vertikal.
6. Spasi antar elemen cukup.
7. Footer tidak mengganggu konten utama.

Rekomendasi ukuran:

1. Padding horizontal: 20–24px.
2. Headline: 28–36px.
3. Body text: 15–16px.
4. Tombol full width.
5. Tinggi tombol minimal 44px.

## 14. Komponen UI

### 14.1 Logo

Fungsi:
Menjaga identitas brand.

State:

1. Logo tersedia.
2. Logo tidak tersedia, tampilkan nama brand.

### 14.2 Badge Status

Teks:
Maintenance Mode

Fungsi:
Memberi sinyal cepat bahwa website sedang berada dalam mode pemeliharaan.

### 14.3 Headline

Teks:
Website Sedang Dalam Pemeliharaan

Fungsi:
Menjadi informasi utama yang langsung dipahami pengguna.

### 14.4 Description

Teks:
Kami sedang melakukan pembaruan sistem untuk meningkatkan kualitas layanan. Silakan kembali beberapa saat lagi.

Fungsi:
Memberi konteks tanpa terlalu teknis.

### 14.5 Estimated Time Card

Isi:
Perkiraan selesai: [Tanggal dan Jam] WIB

Fallback:
Estimasi waktu belum tersedia.

### 14.6 Primary Button

Label:
Coba Lagi

Behavior:
Reload halaman.

### 14.7 Secondary Button

Label:
Hubungi Kami

Behavior:
Membuka email, WhatsApp, atau halaman kontak.

### 14.8 Footer

Isi:
© [Tahun] [Nama Brand]. All rights reserved.

## 15. States

### 15.1 Scheduled Maintenance State

Digunakan ketika maintenance sudah direncanakan.

Konten:
Website sedang dalam pemeliharaan terjadwal.

### 15.2 Emergency Maintenance State

Digunakan ketika terjadi gangguan mendadak.

Konten:
Website sedang dalam perbaikan teknis mendesak.

### 15.3 Almost Done State

Digunakan ketika maintenance hampir selesai.

Konten:
Pembaruan hampir selesai. Silakan coba kembali beberapa saat lagi.

### 15.4 No ETA State

Digunakan ketika estimasi waktu belum tersedia.

Konten:
Website akan segera kembali aktif.

### 15.5 Completed State

Digunakan ketika maintenance selesai dan pengguna dapat kembali ke website utama.

Konten:
Maintenance telah selesai. Anda akan diarahkan ke website utama.

## 16. Technical Requirements

### 16.1 Routing

Opsi implementasi:

1. Route khusus `/maintenance`.
2. Middleware yang mengarahkan seluruh request ke `/maintenance`.
3. Static fallback page pada server.
4. Error document custom untuk status 503.

Ketentuan:

1. Asset halaman maintenance tetap dapat diakses.
2. Route penting untuk health check dapat dikecualikan.
3. Admin atau developer dapat diberi bypass jika dibutuhkan.
4. API publik dapat dinonaktifkan atau menampilkan response maintenance.

### 16.2 HTTP Status

Status yang direkomendasikan:

1. Gunakan `503 Service Unavailable` untuk maintenance sementara.
2. Gunakan header `Retry-After` jika estimasi waktu tersedia.
3. Jangan gunakan `404`.
4. Jangan gunakan `500` untuk halaman maintenance yang disengaja.
5. Jangan gunakan `301` redirect permanen.

### 16.3 Environment Variable

Contoh variable:

1. `MAINTENANCE_MODE`
2. `MAINTENANCE_TITLE`
3. `MAINTENANCE_MESSAGE`
4. `MAINTENANCE_END_TIME`
5. `MAINTENANCE_CONTACT_EMAIL`
6. `MAINTENANCE_CONTACT_WHATSAPP`
7. `MAINTENANCE_ALLOWED_IPS`
8. `MAINTENANCE_BYPASS_TOKEN`

### 16.4 Bypass untuk Admin

Opsional untuk versi lanjutan.

Kebutuhan:

1. Admin dapat mengakses website utama menggunakan token khusus.
2. Bypass tidak ditampilkan ke publik.
3. Token tidak disimpan di client secara tidak aman.
4. Bypass dapat dibatasi berdasarkan IP.

Contoh:
`/admin?maintenance_bypass=token`

### 16.5 Analytics

Analytics bersifat opsional karena halaman harus ringan.

Data minimum yang dapat dilacak:

1. Jumlah kunjungan halaman maintenance.
2. Klik tombol “Coba Lagi”.
3. Klik tombol kontak.
4. Perangkat pengguna.
5. Waktu kunjungan.

Ketentuan:

1. Jangan memuat analytics berat.
2. Jangan menghambat loading halaman.
3. Patuhi kebijakan privasi website.

## 17. Data dan Konfigurasi

Data yang dibutuhkan:

| Field              | Tipe     | Wajib | Keterangan                                 |
| ------------------ | -------- | ----: | ------------------------------------------ |
| brandName          | string   |    Ya | Nama brand                                 |
| logoUrl            | string   | Tidak | URL logo                                   |
| title              | string   |    Ya | Judul utama                                |
| message            | string   |    Ya | Pesan maintenance                          |
| maintenanceType    | enum     | Tidak | scheduled, emergency, deployment, security |
| estimatedEndTime   | datetime | Tidak | Estimasi selesai                           |
| timezone           | string   |    Ya | Default WIB                                |
| contactEmail       | string   | Tidak | Email bantuan                              |
| contactWhatsapp    | string   | Tidak | WhatsApp bantuan                           |
| socialLinks        | array    | Tidak | Media sosial                               |
| retryButtonLabel   | string   |    Ya | Label tombol utama                         |
| contactButtonLabel | string   | Tidak | Label tombol kontak                        |

## 18. Acceptance Criteria Global

Halaman dianggap selesai jika memenuhi seluruh kriteria berikut:

1. Maintenance page tampil ketika mode maintenance aktif.
2. Website utama dapat diakses kembali ketika maintenance mode dimatikan.
3. Halaman menampilkan headline, deskripsi, status, tombol coba lagi, dan kontak.
4. Tampilan rapi di desktop, tablet, dan mobile.
5. Tidak ada horizontal scroll.
6. Tombol dapat diklik dan berfungsi.
7. Halaman tetap terbaca tanpa JavaScript.
8. Tidak ada informasi teknis sensitif yang tampil.
9. Status HTTP menggunakan 503 untuk maintenance sementara.
10. Loading halaman cepat.
11. Copy tidak membingungkan pengguna.
12. Konfigurasi maintenance dapat diubah oleh developer.
13. Halaman tetap menampilkan fallback jika estimasi selesai kosong.
14. Desain konsisten dengan identitas brand.
15. QA berhasil pada browser utama.

## 19. Edge Cases

1. Estimasi waktu kosong
   Sistem menampilkan copy fallback.

2. Logo gagal dimuat
   Sistem menampilkan nama brand.

3. Kontak tidak tersedia
   Tombol kontak disembunyikan.

4. JavaScript tidak aktif
   Halaman tetap terbaca.

5. Maintenance mode aktif tetapi asset utama gagal dimuat
   Halaman tetap menampilkan teks inti.

6. Pengguna membuka URL halaman tertentu
   Pengguna tetap melihat maintenance page.

7. Pengguna refresh berkali-kali
   Halaman tetap stabil.

8. Maintenance selesai
   Pengguna dapat mengakses website utama setelah reload.

9. Bot mesin pencari mengakses halaman
   Sistem mengirim status 503 agar tidak dianggap konten permanen.

10. Pengguna mobile dengan layar kecil
    Konten tetap terbaca dan tombol tetap mudah diklik.

## 20. QA Checklist

### Functional Test

|  No | Skenario                  | Expected Result                |
| --: | ------------------------- | ------------------------------ |
|   1 | Maintenance mode aktif    | Halaman maintenance tampil     |
|   2 | Maintenance mode nonaktif | Website utama tampil           |
|   3 | Klik Coba Lagi            | Halaman reload                 |
|   4 | Klik Hubungi Kami         | Kontak terbuka                 |
|   5 | Estimasi waktu kosong     | Fallback tampil                |
|   6 | Logo gagal dimuat         | Nama brand tampil              |
|   7 | JavaScript dimatikan      | Konten tetap tampil            |
|   8 | Buka URL subpage          | Tetap diarahkan ke maintenance |
|   9 | Buka dari mobile          | Layout rapi                    |
|  10 | Buka dari desktop         | Layout rapi                    |

### Visual Test

|  No | Area        | Expected Result             |
| --: | ----------- | --------------------------- |
|   1 | Header      | Logo/nama brand terlihat    |
|   2 | Hero        | Headline jelas              |
|   3 | Deskripsi   | Mudah dibaca                |
|   4 | Button      | Ukuran proporsional         |
|   5 | Card status | Tidak terpotong             |
|   6 | Footer      | Tidak mengganggu            |
|   7 | Mobile      | Tidak ada horizontal scroll |
|   8 | Tablet      | Spasi tetap rapi            |

### Technical Test

|  No | Area          | Expected Result                          |
| --: | ------------- | ---------------------------------------- |
|   1 | HTTP status   | 503 saat maintenance                     |
|   2 | Retry-After   | Tersedia bila ETA tersedia               |
|   3 | Performance   | Halaman cepat dimuat                     |
|   4 | Security      | Tidak ada stack trace                    |
|   5 | Accessibility | Navigasi keyboard bekerja                |
|   6 | SEO           | Tidak terindeks sebagai halaman permanen |

## 21. Prioritas Pengembangan

### Must Have

1. Halaman maintenance.
2. Headline dan deskripsi.
3. Status maintenance.
4. Tombol coba lagi.
5. Kontak alternatif.
6. Responsive layout.
7. Konfigurasi maintenance mode.
8. HTTP status 503.
9. Fallback tanpa estimasi waktu.

### Should Have

1. Estimasi waktu selesai.
2. Badge status.
3. Card informasi maintenance.
4. Metadata halaman.
5. Fallback logo.
6. Noindex untuk halaman maintenance.
7. Header Retry-After.

### Could Have

1. Countdown timer.
2. Animasi ringan.
3. Social media links.
4. Admin bypass.
5. Analytics klik.
6. Status update singkat.

### Won’t Have pada Versi Awal

1. Dashboard maintenance.
2. Live status page kompleks.
3. Integrasi notifikasi email.
4. Riwayat downtime.
5. Chatbot.
6. Multi-language.

## 22. Rekomendasi Desain Visual

Arah desain:

1. Clean minimal.
2. Banyak ruang kosong.
3. Background netral.
4. Ilustrasi sederhana atau ikon maintenance.
5. Warna utama mengikuti brand.
6. CTA terlihat jelas.
7. Tidak menggunakan desain terlalu ramai.

Contoh struktur visual:

- Background: putih, abu muda, atau warna brand yang sangat lembut.
- Card utama: putih dengan shadow halus.
- Badge: warna lembut dengan teks kontras.
- Tombol utama: warna brand.
- Tombol sekunder: outline atau ghost button.
- Ilustrasi: icon tools, server, gear, atau abstract system update.

## 23. Rekomendasi Struktur File

Untuk website statis:

```text
/public
  /assets
    logo.svg
    maintenance-illustration.svg
/src
  /pages
    maintenance.html
  /styles
    maintenance.css
```

Untuk React atau Next.js:

```text
/src
  /app
    /maintenance
      page.tsx
  /components
    MaintenancePage.tsx
    MaintenanceStatusCard.tsx
    MaintenanceActions.tsx
  /config
    maintenance.ts
```

Untuk Laravel:

```text
/resources
  /views
    maintenance.blade.php
/routes
  web.php
/config
  maintenance.php
```

## 24. Estimasi Timeline Pengerjaan

### Hari 1 — Setup dan UI Dasar

Aktivitas:

1. Membuat struktur halaman.
2. Menentukan copy final.
3. Membuat layout desktop dan mobile.
4. Menambahkan logo dan CTA.
5. Membuat style dasar.

Output:

1. Draft halaman maintenance.
2. Layout responsif awal.
3. Komponen utama tersedia.

### Hari 2 — Integrasi dan Konfigurasi

Aktivitas:

1. Menambahkan maintenance mode toggle.
2. Menambahkan konfigurasi estimasi waktu.
3. Menambahkan kontak.
4. Mengatur routing.
5. Mengatur HTTP status.

Output:

1. Maintenance mode dapat aktif/nonaktif.
2. Routing bekerja.
3. Kontak dan CTA berfungsi.

### Hari 3 — QA dan Finalisasi

Aktivitas:

1. Pengujian desktop.
2. Pengujian mobile.
3. Pengujian status HTTP.
4. Pengujian fallback.
5. Optimasi performa.
6. Review copy dan visual.

Output:

1. Halaman siap deploy.
2. Checklist QA selesai.
3. Dokumentasi konfigurasi tersedia.

## 25. Success Metrics

Keberhasilan halaman maintenance diukur dari:

1. Halaman berhasil tampil 100% saat maintenance aktif.
2. Tidak ada error page default yang terlihat oleh pengguna.
3. Loading halaman di bawah 2 detik pada koneksi standar.
4. Tidak ada layout rusak di mobile.
5. Pengguna dapat menemukan informasi kontak.
6. Pengguna memahami bahwa website sedang maintenance, bukan rusak permanen.
7. Website utama dapat kembali diakses setelah maintenance mode dimatikan.
8. Tidak ada data teknis sensitif yang terekspos.
9. Mesin pencari menerima sinyal maintenance sementara melalui status 503.
10. Tim internal dapat mengaktifkan dan menonaktifkan mode maintenance dengan jelas.

## 26. Definition of Done

Pengembangan dianggap selesai jika:

1. Halaman maintenance sudah dibuat.
2. Konten final sudah dimasukkan.
3. Logo atau nama brand sudah tampil.
4. Tombol “Coba Lagi” berfungsi.
5. Kontak alternatif berfungsi.
6. Maintenance mode dapat diaktifkan dan dinonaktifkan.
7. Halaman responsif di mobile dan desktop.
8. Halaman tidak bergantung pada database.
9. Status HTTP sudah sesuai.
10. QA checklist selesai.
11. Tidak ada error visual besar.
12. Tidak ada informasi teknis sensitif.
13. Halaman sudah siap deploy ke production.

## 27. Open Questions

1. Nama brand apa yang akan digunakan pada halaman?
2. Apakah perlu menampilkan logo atau cukup nama brand?
3. Apakah maintenance bersifat terjadwal atau darurat?
4. Apakah estimasi waktu selesai perlu ditampilkan?
5. Kontak utama menggunakan email, WhatsApp, atau keduanya?
6. Apakah perlu tombol media sosial?
7. Apakah perlu countdown timer?
8. Apakah admin perlu bypass untuk mengakses website utama?
9. Apakah halaman ini akan digunakan di framework tertentu seperti Next.js, Laravel, WordPress, atau HTML statis?
10. Apakah warna mengikuti brand existing atau dibuat netral?

## 28. Catatan Implementasi

Halaman maintenance sebaiknya dibuat sebagai halaman statis ringan agar tetap dapat tampil meskipun API, database, atau layanan utama sedang tidak aktif. Jika website menggunakan framework modern, maintenance mode dapat dikendalikan melalui environment variable. Jika website menggunakan server tradisional, maintenance mode dapat diatur melalui konfigurasi server seperti Nginx, Apache, atau middleware aplikasi.

Prioritas utama bukan membuat halaman yang kompleks, melainkan memastikan komunikasi kepada pengguna tetap jelas, tampilan tetap profesional, dan website tidak menampilkan error mentah selama proses pemeliharaan.

## 29. Envoirtment

pakai asset logo/icon dari CDN jika diperlukan logo
gunakan style dari landingpage_prd.md
