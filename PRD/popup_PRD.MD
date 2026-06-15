# PRD — Penambahan Popup pada `chatbot.html`

## Ringkasan

Dokumen ini mendefinisikan kebutuhan produk dan batasan implementasi untuk **menambahkan satu popup** pada halaman `chatbot.html`.

Fokus pekerjaan ini **hanya** menambahkan popup visual dengan gambar `.webp` ber-alpha channel dari path berikut:

`asset/img/chatbot/cs.webp`

Popup harus memiliki **close button** untuk menutup popup.

Implementasi ini **tidak boleh mengubah sistem, model, alur chatbot, konfigurasi, logika bisnis, API, event utama, styling global, bundling, maupun perilaku eksisting apa pun**. Website sudah siap live; pekerjaan ini bersifat **tambahan kecil, terisolasi, aman, dan non-invasif**.

---

## Tujuan

Menambahkan popup sederhana pada `chatbot.html` yang:

- menampilkan gambar `asset/img/chatbot/cs.webp`
- memiliki tombol close
- dapat ditutup oleh user
- tidak mengubah sistem yang sudah ada
- tidak memengaruhi model, backend, frontend logic utama, maupun perilaku chatbot

---

## Prinsip Utama yang Tidak Boleh Dilanggar

1. **Hanya menambahkan popup.**
2. **Dilarang mengubah sistem apa pun yang sudah ada.**
3. **Dilarang mengubah model, prompt, engine, backend, API, flow chat, logic chat, atau state management yang sudah ada.**
4. **Dilarang refactor file yang tidak relevan.**
5. **Dilarang mengubah styling global yang berpotensi memengaruhi komponen lain.**
6. **Jika diperlukan, AI wajib membuat file CSS baru dan file JS baru khusus untuk popup ini, bukan menumpuk logic ke sistem existing secara agresif.**
7. **Segala penambahan harus bersifat modular, terisolasi, dan mudah dihapus tanpa efek samping.**
8. **Jangan menyentuh sistem existing selain penyisipan minimal yang diperlukan untuk memanggil popup.**

---

## Ruang Lingkup

### In Scope

Pekerjaan yang diperbolehkan hanya:

- menambahkan markup popup pada `chatbot.html` **atau** menyisipkan container minimal untuk popup
- menampilkan gambar dari `asset/img/chatbot/cs.webp`
- menambahkan tombol close
- menambahkan file CSS baru khusus popup jika diperlukan
- menambahkan file JS baru khusus popup jika diperlukan
- menambahkan pemanggilan CSS/JS baru ke `chatbot.html` bila memang diperlukan

### Out of Scope

Hal-hal berikut **tidak boleh disentuh**:

- sistem/model AI
- logic chatbot
- alur kirim pesan
- integrasi API
- konfigurasi backend/frontend
- autentikasi
- tracking existing
- analytic existing
- struktur komponen lain yang tidak terkait popup
- styling global existing
- optimasi/refactor di luar popup
- perubahan nama file, struktur folder, atau arsitektur yang sudah ada

---

## Kebutuhan Fungsional

### 1. Popup ditampilkan pada `chatbot.html`

Popup harus muncul pada halaman `chatbot.html` sebagai elemen tambahan yang berdiri sendiri.

### 2. Menampilkan gambar utama

Popup wajib menampilkan gambar berikut:

`asset/img/chatbot/cs.webp`

Ketentuan:

- gunakan file tersebut apa adanya
- gambar memiliki alpha channel, sehingga implementasi harus mendukung transparansi dengan benar
- jangan mengganti format file
- jangan memindahkan path asset

### 3. Memiliki tombol close

Popup wajib memiliki tombol close yang jelas dan mudah diklik.

Perilaku minimal:

- saat tombol close diklik, popup tertutup
- penutupan popup tidak boleh memengaruhi elemen atau script lain di halaman

### 4. Aman terhadap sistem existing

Popup harus bekerja secara independen.

Ketentuan:

- event listener popup hanya untuk popup
- selector CSS/JS harus spesifik agar tidak bentrok dengan elemen existing
- tidak boleh override fungsi global existing
- tidak boleh memodifikasi instance, state, object, atau variable sistem existing

---

## Kebutuhan Non-Fungsional

### 1. Isolasi Implementasi

Jika perlu file tambahan, gunakan file terpisah seperti contoh berikut:

- `popup.css`
- `popup.js`

Atau penamaan serupa yang jelas dan khusus untuk popup.

Tujuan:

- menjaga sistem existing tetap aman
- meminimalkan risiko regression
- memudahkan rollback

### 2. Tidak Mengubah Perilaku Existing

Setelah popup ditambahkan:

- chatbot harus tetap berjalan sama seperti sebelumnya
- semua fitur existing harus tetap identik
- tidak boleh ada perubahan UI lain selain munculnya popup
- tidak boleh ada perubahan performa yang signifikan

### 3. Mudah Dihapus

Implementasi harus mudah dihapus hanya dengan:

- melepas include CSS/JS popup
- menghapus container popup

Tanpa perlu refactor sistem lain.

### 4. Tidak Mengganggu Layout Utama

Popup harus overlay di atas halaman tanpa merusak layout utama.

### 5. Styling Aman

Semua class popup harus menggunakan namespace yang spesifik, misalnya prefix seperti:

- `cs-popup-*`

Agar tidak bentrok dengan class existing.

### 6. Responsivitas Wajib

Popup wajib responsif dan harus tampil optimal pada **desktop, tablet, dan smartphone** tanpa mengubah sistem existing.

Ketentuan umum:

- layout popup harus menyesuaikan ukuran viewport, bukan fixed size kaku
- popup tidak boleh overflow ke luar layar
- gambar harus tetap proporsional dan tidak terdistorsi
- tombol close harus selalu terlihat, dapat dijangkau, dan tidak tertutup gambar
- popup tetap dapat digunakan pada orientasi portrait maupun landscape
- implementasi responsif hanya boleh dilakukan di file CSS popup baru, bukan dengan mengubah CSS global existing

#### Breakpoint minimum yang harus didukung

- **Smartphone:** hingga `767px`
- **Tablet:** `768px` sampai `1023px`
- **Desktop:** `1024px` ke atas

Jika project existing sudah memiliki breakpoint internal sendiri, AI/developer boleh menyesuaikan naming breakpoint, tetapi perilaku responsif di tiga kelompok perangkat di atas tetap wajib terpenuhi.

#### Kebutuhan responsif pada smartphone

- popup harus memiliki lebar yang aman terhadap layar kecil, disarankan memakai pendekatan seperti `width: 90vw` atau `max-width` yang sesuai
- tinggi popup tidak boleh melebihi tinggi viewport; gunakan batas aman seperti `max-height: 85vh` sampai `90vh`
- gambar harus menggunakan pendekatan proporsional seperti `max-width: 100%` dan `height: auto`
- tombol close harus memiliki area sentuh yang nyaman untuk jari, minimal sekitar `40px` x `40px`
- jarak popup dari tepi layar harus aman agar tidak terlalu mepet
- popup tidak boleh menutupi seluruh pengalaman pengguna secara merusak; tampil sebagai overlay yang tetap rapi dan mudah ditutup

#### Kebutuhan responsif pada tablet

- popup harus tampil lebih lega daripada smartphone namun tetap menjaga proporsi gambar
- ukuran popup tidak boleh terlalu kecil sehingga tampak kosong, dan tidak boleh terlalu besar hingga mendominasi seluruh layar
- tombol close tetap harus mudah terlihat dan mudah disentuh
- layout harus tetap stabil baik pada portrait maupun landscape tablet

#### Kebutuhan responsif pada desktop

- popup boleh tampil lebih besar dibanding mobile/tablet, tetapi tetap memiliki batas `max-width` dan `max-height`
- popup harus tetap berada di area fokus visual yang rapi, umumnya di tengah viewport
- gambar tidak boleh pecah, tertarik, atau terlihat blur akibat scaling yang tidak benar
- tombol close harus tetap konsisten posisinya dan mudah diakses dengan mouse

#### Aturan layout responsif

- gunakan container popup terpisah seperti overlay + inner container
- overlay harus menutup area viewport dengan aman tanpa menggeser layout halaman existing
- inner container harus menjadi pusat pengaturan ukuran popup
- gunakan alignment yang konsisten, misalnya center-center, kecuali ada alasan visual yang sangat kuat
- hindari penggunaan nilai fixed width/height yang membuat popup rusak pada layar kecil

#### Aturan ukuran elemen

- gambar utama harus menjadi fokus konten popup
- tombol close harus memiliki ukuran visual yang jelas dan tidak terlalu kecil
- padding internal popup harus menyesuaikan perangkat; mobile boleh lebih rapat, desktop boleh lebih lega
- jika ada spacing antar elemen, spacing tersebut harus ikut menyesuaikan ukuran layar

#### Aturan interaksi pengguna

- close button wajib bisa dioperasikan pada touch device dan pointer device
- klik/tap close hanya menutup popup dan tidak memicu aksi lain di sistem existing
- popup tidak boleh membuat elemen existing menjadi error saat dibuka maupun ditutup
- bila diperlukan animasi, animasi harus ringan, singkat, dan tidak mengganggu performa pada perangkat mobile

#### Panduan implementasi CSS yang dianjurkan

AI/developer dianjurkan menggunakan pendekatan CSS responsif seperti:

- container berbasis `position: fixed`
- ukuran berbasis viewport seperti `vw`, `vh`, `max-width`, dan `max-height`
- gambar dengan `display: block`, `max-width: 100%`, dan `height: auto`
- media query terpisah untuk smartphone, tablet, dan desktop

Contoh pendekatan implementasi yang diperbolehkan:

.cs-popup-overlay {
position: fixed;
inset: 0;
display: flex;
align-items: center;
justify-content: center;
}

.cs-popup-inner {
width: 90vw;
max-width: 420px;
max-height: 90vh;
}

.cs-popup-image {
display: block;
max-width: 100%;
height: auto;
}

@media (min-width: 768px) {
.cs-popup-inner {
width: 70vw;
max-width: 560px;
}
}

@media (min-width: 1024px) {
.cs-popup-inner {
width: 50vw;
max-width: 640px;
}
}

Contoh di atas hanya panduan pendekatan, bukan kewajiban literal. AI/developer tetap boleh menyesuaikan ukuran akhir selama prinsip responsif, aman, dan non-invasif tetap dipenuhi.

---

## Spesifikasi Implementasi Teknis

### HTML

Pada `chatbot.html`, AI hanya boleh melakukan perubahan minimal berikut:

- menambahkan container popup yang terisolasi
- menambahkan referensi ke file CSS baru khusus popup jika diperlukan
- menambahkan referensi ke file JS baru khusus popup jika diperlukan

**Tidak boleh** melakukan perubahan lain di `chatbot.html` di luar kebutuhan minimum tersebut.

### CSS

Jika styling dibutuhkan, AI **harus membuat file CSS baru** khusus popup.

Aturan CSS:

- tidak boleh edit file CSS global existing kecuali benar-benar tidak bisa dihindari
- seluruh selector harus spesifik untuk popup
- jangan reset style global
- jangan ubah variable global
- jangan ubah typography/layout komponen existing

### JavaScript

Jika interaksi dibutuhkan, AI **harus membuat file JS baru** khusus popup.

Aturan JS:

- hanya untuk show/hide popup
- tidak boleh menyentuh logic chatbot
- tidak boleh override event existing
- tidak boleh mengubah flow atau state aplikasi
- gunakan script sederhana, modular, dan scoped

---

## Perilaku UX yang Diharapkan

- Popup tampil rapi di atas halaman
- Gambar `cs.webp` terlihat utuh
- Transparansi alpha channel tampil dengan benar
- Terdapat tombol close yang jelas
- Saat close ditekan, popup hilang dengan aman
- Tidak ada perubahan pengalaman pengguna lain selain tambahan popup ini

---

## Acceptance Criteria

Implementasi dianggap selesai hanya jika seluruh poin berikut terpenuhi:

1. Pada `chatbot.html` terdapat popup baru.
2. Popup menampilkan gambar dari `asset/img/chatbot/cs.webp`.
3. Popup memiliki tombol close yang berfungsi.
4. Popup bisa ditutup tanpa error.
5. Tidak ada perubahan pada sistem/model/chat flow/backend/API existing.
6. Tidak ada perubahan perilaku chatbot existing.
7. Tidak ada perubahan styling global atau komponen lain.
8. Jika perlu CSS/JS, dibuat sebagai file baru yang terpisah dan khusus popup.
9. Seluruh selector/class/id yang ditambahkan aman dan tidak bentrok.
10. Implementasi bisa dihapus dengan mudah tanpa memengaruhi sistem existing.
11. Popup tampil baik pada smartphone, tablet, dan desktop.
12. Gambar tetap proporsional pada semua ukuran layar dan tidak terdistorsi.
13. Popup tidak overflow keluar viewport pada portrait maupun landscape.
14. Tombol close selalu terlihat dan dapat digunakan dengan nyaman pada touch device maupun desktop.
15. Popup tidak menggeser, merusak, atau mematahkan layout existing di perangkat mana pun.
16. Tidak ada penurunan fungsi chatbot existing setelah popup diuji pada mobile, tablet, dan desktop.

---

## Larangan Tegas untuk AI/Developer

AI/developer **dilarang** melakukan hal-hal berikut:

- mengubah model
- mengubah prompt system
- mengubah backend
- mengubah API call
- mengubah business logic
- mengubah event utama chatbot
- mengubah struktur utama aplikasi
- mengubah file existing di luar titik integrasi minimum
- melakukan refactor “sekalian”
- menambahkan dependency yang tidak perlu
- mengganti asset image
- memindahkan lokasi file image
- mengubah naming/arsitektur existing tanpa kebutuhan mutlak

Jika ada kebutuhan di luar popup, **jangan dikerjakan**.

---

## Instruksi Eksekusi untuk AI

Lakukan implementasi dengan pendekatan berikut:

1. **Jangan ubah sistem apa pun yang sudah ada.**
2. **Hanya tambahkan popup pada `chatbot.html`.**
3. Gunakan gambar `asset/img/chatbot/cs.webp`.
4. Tambahkan **close button**.
5. Jika perlu styling, buat **file CSS baru** khusus popup.
6. Jika perlu interaksi, buat **file JS baru** khusus popup.
7. Lakukan integrasi seminimal mungkin ke `chatbot.html`.
8. Jangan menyentuh logic/model/sistem/chatbot existing.
9. Jangan melakukan improvement lain di luar scope.
10. Hasil akhir harus terasa seperti fitur tambahan kecil yang aman, bukan perubahan sistem.

---

## Definisi Sukses

Sukses berarti popup berhasil ditambahkan dan dapat ditutup, sementara seluruh sistem existing tetap **100% sama** seperti sebelum perubahan, tanpa regresi, tanpa refactor, dan tanpa perubahan perilaku di luar popup.
