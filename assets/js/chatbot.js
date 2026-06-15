/**
 * Alima Photo Chatbot - Frontend Logic (Smart Context v3)
 * Handles chat UI, context-aware interaction, and API communication.
 * Falls back to local dummy responses when backend is unavailable.
 */

(function () {
    'use strict';

    /* ========================================
       CONFIGURATION
       ======================================== */

    var BACKEND_URL = 'https://alima-worker.wibowopotrek.workers.dev/chat';
    var MAX_INPUT_LENGTH = 500;
    var ERROR_MESSAGE = 'Maaf, Min Limpo belum bisa merespons saat ini. Silakan coba lagi atau hubungi Min Limpo melalui WhatsApp.';

    /* ========================================
       DOM REFERENCES
       ======================================== */

    var chatMessages = document.getElementById('chatMessages');
    var chatLoading = document.getElementById('chatLoading');
    var chatInput = document.getElementById('chatInput');
    var chatSendBtn = document.getElementById('chatSendBtn');
    var quickQuestions = document.getElementById('quickQuestions');

    var domReady = !!chatMessages && !!chatLoading && !!chatInput && !!chatSendBtn && !!quickQuestions;

    function log(level, msg) {
        var d = new Date().toISOString().slice(11, 23);
        var prefix = '[chatbot:' + level + ':' + d + ']';
        if (typeof console !== 'undefined') {
            if (level === 'error') console.error(prefix, msg);
            else if (level === 'warn') console.warn(prefix, msg);
            else console.log(prefix, msg);
        }
        addDebug(prefix + ' ' + msg);
    }

    /* ========================================
       STATE
       ======================================== */

    var uiState = 'idle';

    var chatState = {
        lastIntent: null,
        lastTierMentioned: null,
        lastOptions: [],
        lastQuestionType: null,
        selectedPackage: null,
        currentCategory: null
    };

    var chatHistory = [];

    var debugLog = [];

    function addDebug(entry) {
        debugLog.push({ time: Date.now(), entry: entry });
        if (debugLog.length > 50) debugLog.shift();
    }

    function setUIState(newState) {
        var prev = uiState;
        uiState = newState;
        log('info', 'UI state: ' + prev + ' -> ' + newState);

        if (uiState === 'loading') {
            chatInput.disabled = true;
            chatSendBtn.disabled = true;
            chatLoading.classList.add('visible');
            disableQuickButtons();
        } else {
            chatInput.disabled = false;
            chatSendBtn.disabled = false;
            chatLoading.classList.remove('visible');
            enableQuickButtons();
        }
    }

    function updateChatState(newState) {
        if (newState) {
            chatState = newState;
            addDebug('chatState updated: intent=' + newState.lastIntent + ' category=' + newState.currentCategory + ' qtype=' + newState.lastQuestionType);
        }
    }

    function disableQuickButtons() {
        var btns = quickQuestions.querySelectorAll('.quick-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
        }
    }

    function enableQuickButtons() {
        var btns = quickQuestions.querySelectorAll('.quick-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
        }
    }

    /* ========================================
       WELCOME MESSAGE
       ======================================== */

    function renderWelcomeMessage() {
        var welcomeText = 'Halo 🙂 Min Limpo disini, asisten informasi Alima Photo.\n\nBisa bantu jelasin pricelist, paket wedding, cara booking, waktu pengerjaan, lokasi studio, dan jam kerja.\n\nMau tanya apa dulu kak?';
        appendMessage('bot', welcomeText);
    }

    /* ========================================
       MESSAGE RENDERING
       ======================================== */

    function sanitizeReply(text) {
        if (!text) return text;
        // PRD §20.1-20.3: Remove phone numbers and [nomor disembunyikan] placeholders
        var result = text
            // Step 1: Remove phone numbers entirely
            .replace(/(?:\+?62|0)\s*8\d{1,2}[\s.\-]?\d{2,4}[\s.\-]?\d{2,4}[\s.\-]?\d{2,4}/gi, '')
            // Step 2: Remove common patterns with placeholder
            .replace(/konfirmasi\s+via\s+whatsapp\s+ke\s+\[nomor disembunyikan\]\.?/gi, 'konfirmasi via WhatsApp ya kak.')
            .replace(/hubungi\s+nomor\s+berikut\.?/gi, 'lanjut lewat WhatsApp ya kak.')
            .replace(/nomor\s*whatsapp\s*:?\s*\[nomor disembunyikan\]/gi, '')
            .replace(/whatsapp\s*:?\s*\[nomor disembunyikan\]/gi, '')
            .replace(/di\s+nomor\s*\[nomor disembunyikan\]/gi, '')
            .replace(/ke\s+nomor\s*\[nomor disembunyikan\]/gi, '')
            // Step 3: Remove any remaining [nomor disembunyikan] placeholders
            .replace(/\[nomor disembunyikan\]/gi, '')
            // Step 4: Clean up extra whitespace (preserve newlines)
            .replace(/[ \t]{2,}/g, ' ')
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim();
        return result;
    }

    function formatBotText(text) {
        var sanitized = sanitizeReply(text);

        var escaped = sanitized
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        escaped = escaped.replace(/\*([^*<]+)\*/g, '<strong>$1</strong>');
        
        // Convert explicit newlines to HTML break tags to guarantee multiline rendering
        escaped = escaped.replace(/\n/g, '<br>');

        return escaped;
    }

    function appendMessage(role, text, ctas) {
        // PRD §13.1: Structure must be:
        //   assistant-message-block
        //     ├── assistant-bubble-row -> bubble
        //     └── assistant-cta-row -> cta-container (BELOW bubble)
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message message-' + role;

        // Bubble row
        var bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        if (role === 'error') {
            messageDiv.className = 'message message-error';
        }

        if (role === 'bot') {
            bubble.innerHTML = formatBotText(text);
        } else {
            bubble.textContent = text;
        }

        messageDiv.appendChild(bubble);

        // PRD §13.2: CTA row rendered AFTER bubble row, as a SEPARATE row
        // PRD §18.6: CTA container must NOT render if no buttons exist
        if (ctas && ctas.length > 0 && role === 'bot') {
            var ctaRow = document.createElement('div');
            ctaRow.className = 'chat-cta-inline';
            for (var c = 0; c < ctas.length; c++) {
                var btn = document.createElement('a');
                btn.href = ctas[c].url;
                btn.className = 'chat-cta-btn ' + (ctas[c].type || '');
                btn.textContent = ctas[c].label;
                btn.setAttribute('target', '_blank');
                btn.setAttribute('rel', 'noopener noreferrer');
                ctaRow.appendChild(btn);
            }
            // PRD §10.1: CTA appended as sibling of bubble, NOT child of bubble
            messageDiv.appendChild(ctaRow);
        }

        chatMessages.appendChild(messageDiv);

        chatHistory.push({ role: role, content: text, timestamp: Date.now() });
        if (chatHistory.length > 20) chatHistory.shift();

        scrollToBottom();
    }

    function scrollToBottom() {
        requestAnimationFrame(function () {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

    /* ========================================
       GEAR DETECTION
       ======================================== */

    function isGearQuestion(msg) {
        return /gear|kamera|lensa|lighting|drone|audio|alat|equipment|sony|canon|fuji|mic|stabilizer/i.test(msg);
    }

    function getGearRedirectResponse() {
        return 'Untuk detail gear yang digunakan tim Alima Photo, silakan klik tombol Chat via WhatsApp di bawah pesan ini ya kak \u{1F64F}';
    }

    /* ========================================
       OUT-OF-AREA DETECTION & RESPONSE
       PRD §17.2: Outside service area -> MUST direct to WhatsApp
       ======================================== */

    var OUT_OF_AREA_KEYWORDS = [
        'solo', 'surabaya', 'jakarta', 'semarang', 'jogja', 'yogyakarta',
        'malang', 'bandung', 'bali', 'medan', 'makassar', 'denpasar',
        'bekasi', 'tangerang', 'bogor', 'depok', 'cirebon', 'kudus',
        'pekalongan', 'purwokerto', 'magelang', 'klaten', 'boyolali',
        'karanganyar', 'sragen', 'ngawi', 'magetan', 'madiun', 'kediri',
        'blitar', 'tulungagung', 'jember', 'banyuwangi', 'lumajang',
        'probolinggo', 'pasuruan', 'sidoarjo', 'gresik', 'lamongan',
        'tuban', 'mojokerto', 'nganjuk', 'jombang',
        'luar jawa', 'luar pulau', 'kalimantan', 'sulawesi', 'sumatera',
        'sumatra', 'papua', 'ntt', 'ntb', 'lombok', 'flores',
        'aceh', 'palembang', 'lampung', 'batam', 'pekanbaru', 'padang',
        'jambi', 'bengkulu', 'banjarmasin', 'balikpapan', 'samarinda',
        'manado', 'kendari', 'palu', 'ambon', 'jayapura', 'sorong'
    ];

    function isOutOfAreaQuery(msg) {
        var lower = (msg || '').toLowerCase();
        return containsAny(lower, OUT_OF_AREA_KEYWORDS);
    }

    function extractCityName(msg) {
        var lower = (msg || '').toLowerCase();
        for (var i = 0; i < OUT_OF_AREA_KEYWORDS.length; i++) {
            if (lower.indexOf(OUT_OF_AREA_KEYWORDS[i]) !== -1) {
                // Capitalize first letter
                var city = OUT_OF_AREA_KEYWORDS[i];
                return city.charAt(0).toUpperCase() + city.slice(1);
            }
        }
        return 'wilayah tersebut';
    }

    function getOutOfAreaReply(msg) {
        var city = extractCityName(msg);
        return 'Maaf kak, untuk lokasi ' + city + ' saat ini belum masuk dalam area layanan Alima Photo ya. Jika kakak ingin berdiskusi silahkan hubungi WhatsApp dengan menekan tombol "Chat via WhatsApp" di bawah ya kak.';
    }

    /**
     * Post-process backend AI reply for out-of-area queries.
     * If the user asked about an out-of-area location but the backend AI
     * gave a wrong response (e.g. "Kalau acara kakak di daerah sekitar sini"),
     * override it with the correct WhatsApp CTA redirect.
     */
    function postProcessOutOfAreaReply(userMessage, reply) {
        if (!isOutOfAreaQuery(userMessage)) return reply;

        // Detect bad patterns in backend AI response
        var badPatterns = [
            'kalau acara kakak di daerah sekitar',
            'kalau acara kakak di daerah sini',
            'boleh kasih tahu detailnya',
            'boleh kasih tau detailnya',
            'nanti min limpo bantu hitung',
            'bantu hitung estimasi'
        ];
        var replyLower = reply.toLowerCase();
        var hasBadPattern = false;
        for (var i = 0; i < badPatterns.length; i++) {
            if (replyLower.indexOf(badPatterns[i]) !== -1) {
                hasBadPattern = true;
                break;
            }
        }

        if (hasBadPattern) {
            log('warn', 'Backend out-of-area reply has bad pattern, overriding');
            return getOutOfAreaReply(userMessage);
        }

        // Even if no bad pattern, ensure the reply mentions WhatsApp CTA
        if (replyLower.indexOf('whatsapp') === -1 && replyLower.indexOf('tombol') === -1) {
            log('warn', 'Backend out-of-area reply missing WhatsApp direction, overriding');
            return getOutOfAreaReply(userMessage);
        }

        return reply;
    }

    /* ========================================
       UNLIMITED FILES & EDITING EXPLANATION
       PRD: Stop backend hallucination about editing 5000 photos
       ======================================== */

    function isUnlimitedFilesQuery(msg) {
        var m = (msg || '').toLowerCase();
        return containsAny(m, ['unlimited', 'tanpa batas', 'semua foto diedit', 'edit semua', 'diedit semua', 'semua di edit', 'di edit semua', 'foto mentah', 'file mentah', 'semua foto di edit']);
    }

    function getUnlimitedFilesReply() {
        return 'Halo kak 🙂 Untuk "Unlimited Files", artinya **semua file mentah hasil jepretan kamera selama acara akan kami berikan semuanya** kepada kakak tanpa ada batasan jumlah.\n\nNamun untuk **proses editing**, tim kami hanya akan **memilih foto-foto terbaik** saja (jadi tidak semua file mentah diedit ya kak) agar hasilnya maksimal dan eksklusif. File mentah dan file edit nantinya akan dikirimkan via Drive atau Flashdisk sesuai dengan paket yang kakak pilih 🙏\n\nAda pertanyaan lain seputar benefit paket, kak?';
    }

    function postProcessUnlimitedReply(userMessage, reply) {
        if (!isUnlimitedFilesQuery(userMessage)) return reply;

        var replyLower = reply.toLowerCase();
        // Check for common backend AI hallucinations
        if (replyLower.indexOf('semua foto diedit') !== -1 ||
            replyLower.indexOf('semua file diedit') !== -1 ||
            replyLower.indexOf('semuanya akan diedit') !== -1 ||
            replyLower.indexOf('diedit semua') !== -1 ||
            replyLower.indexOf('semuanya diedit') !== -1 ||
            replyLower.indexOf('semua file foto yang kami serahkan') !== -1 ||
            replyLower.indexOf('sudah melalui proses editing') !== -1 ||
            replyLower.indexOf('proses editing ya kak') !== -1) {
            log('warn', 'Backend unlimited files reply is hallucinating, overriding');
            return getUnlimitedFilesReply();
        }

        // To be absolutely safe regarding the strict PRD, if they ask about unlimited/editing, override it
        return getUnlimitedFilesReply();
    }

    /* ========================================
       DUMMY RESPONSES (Knowledge Base Fallback)
       ======================================== */

    function getDummyResponse(message) {
        var msg = message.toLowerCase().trim();

        if (isGearQuestion(msg)) {
            return getGearRedirectResponse();
        }

        if (isUnlimitedFilesQuery(msg)) {
            return getUnlimitedFilesReply();
        }

        if (msg === 'semua pricelist' || /^(semua|lihat|daftar|all) (pricelist|harga|paket)/i.test(msg)) {
            return 'Boleh kak 🙂 Ini pilihan paket Alima Photo secara ringkas:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - 1.1 Bronze: Rp1.500.000\n' +
                '   - 1.2 Silver: Rp2.300.000\n' +
                '   - 1.3 Gold: Rp5.000.000\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - 2.1 Bronze: Rp3.500.000\n' +
                '   - 2.2 Silver: Rp4.000.000\n' +
                '   - 2.3 Gold: Rp6.500.000\n' +
                '   - 2.4 Platinum: Rp8.000.000\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - 3.1 Bahagia: Rp3.000.000\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - 4.1 Complete 1: Rp6.500.000\n' +
                '   - 4.2 Complete 2: Rp7.500.000\n' +
                '   - 4.3 Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik nomor kategori (1-4) atau sub-nomornya (1.1, 2.3, dll) 🙂';
        }

        if (containsAny(msg, ['foto saja', 'foto aja', 'paket foto saja', 'photo only', 'fotografi saja'])) {
            return 'Boleh kak 🙂 Untuk paket foto saja, pilihannya ini ya:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - 1.1 Bronze: Rp1.500.000\n' +
                '   - 1.2 Silver: Rp2.300.000\n' +
                '   - 1.3 Gold: Rp5.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik 1.1, 1.2, atau 1.3 🙂';
        }

        if (containsAny(msg, ['foto video', 'foto + video', 'foto dan video', 'foto & video', 'paket foto video', 'photo video', 'photography videography'])) {
            return 'Boleh kak 🙂 Untuk paket foto + video, pilihannya ini ya:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - 2.1 Bronze: Rp3.500.000\n' +
                '   - 2.2 Silver: Rp4.000.000\n' +
                '   - 2.3 Gold: Rp6.500.000\n' +
                '   - 2.4 Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik 2.1, 2.2, 2.3, atau 2.4 🙂';
        }

        if (containsAny(msg, ['paket complete', 'complete aja', 'complete package', 'complete packages', 'paket lengkap', 'paket komplit', 'wedding prewedding', 'prewedding wedding', 'paket prewed wedding'])) {
            return 'Boleh kak 🙂 Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - 4.1 Complete 1: Rp6.500.000\n' +
                '   - 4.2 Complete 2: Rp7.500.000\n' +
                '   - 4.3 Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?\n' +
                'Bisa ketik 4.1, 4.2, atau 4.3 🙂';
        }

        if (msg.indexOf('bronze') !== -1) {
            return 'Boleh kak 🙂 Untuk tier Bronze, ada 2 pilihan yang cocok:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Bronze: Rp1.500.000\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Bronze: Rp3.500.000\n' +
                '\n' +
                'Mau lihat detail yang nomor 1 atau nomor 2 dulu, kak?';
        }

        if (msg.indexOf('silver') !== -1) {
            return 'Boleh kak 🙂 Untuk tier Silver, ada 2 pilihan yang cocok:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Silver: Rp2.300.000\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Silver: Rp4.000.000\n' +
                '\n' +
                'Mau lihat detail yang nomor 1 atau nomor 2 dulu, kak?';
        }

        if (msg.indexOf('gold') !== -1) {
            return 'Boleh kak 🙂 Untuk tier Gold, ada 2 pilihan yang cocok:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Gold: Rp5.000.000\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Gold: Rp6.500.000\n' +
                '\n' +
                'Mau lihat detail yang nomor 1 atau nomor 2 dulu, kak?';
        }

        if (msg.indexOf('platinum') !== -1) {
            return 'Boleh kak 🙂 Untuk Platinum saat ini tersedia di:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau saya jelaskan layanan dan benefit Platinum, kak?';
        }

        if (msg.indexOf('bahagia') !== -1) {
            return 'Boleh kak 🙂 Untuk Bahagia Package tersedia:\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - Bahagia: Rp3.000.000\n' +
                '\n' +
                'Mau saya jelaskan layanan dan benefitnya, kak?';
        }

        if (msg.indexOf('complete 1') !== -1 || msg.indexOf('complete1') !== -1 || msg.indexOf('complete one') !== -1 || msg.indexOf('complete satu') !== -1) {
            return 'Siap kak 🙂 Ini detail Complete 1:\n' +
                '\n' +
                'Complete 1: Rp6.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & Benefit:\n' +
                '- Free Prewedding Makeup MUA by Request\n' +
                '- Edit 20 Files\n' +
                '- Print Out 1 File 16RS With Frame\n' +
                '- Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & Benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Mau lihat Complete 2 atau 3 juga, kak?';
        }

        if (msg.indexOf('complete 2') !== -1 || msg.indexOf('complete2') !== -1 || msg.indexOf('complete dua') !== -1) {
            return 'Siap kak 🙂 Ini detail Complete 2:\n' +
                '\n' +
                'Complete 2: Rp7.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & Benefit:\n' +
                '- Free Prewedding Makeup + 1 Dress MUA by Request\n' +
                '- Edit 20 File\n' +
                '- Print Out 2 File 16RS With Frame\n' +
                '- 2 Concept Outdoor-Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & Benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Mau lihat Complete 3 juga, kak?';
        }

        if (msg.indexOf('complete 3') !== -1 || msg.indexOf('complete3') !== -1 || msg.indexOf('complete tiga') !== -1) {
            return 'Siap kak 🙂 Ini detail Complete 3:\n' +
                '\n' +
                'Complete 3: Rp8.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & Benefit:\n' +
                '- Free Prewedding MUA + 1 Dress\n' +
                '- Edit 20 Files\n' +
                '- Print 2 File 16RS With Frame\n' +
                '- Teaser 1 Menit\n' +
                '- 2 Concept Outdoor-Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & Benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 30x30 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Album Storybook 20x15 40 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Ada yang bisa saya bantu lagi, kak?';
        }

        if (msg.indexOf('complete') !== -1) {
            return 'Boleh kak 🙂 Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '1. Complete 1: Rp6.500.000\n' +
                '2. Complete 2: Rp7.500.000\n' +
                '3. Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?';
        }

        if (containsAny(msg, ['lokasi', 'alamat', 'studio', 'di mana', 'dimana', 'maps', 'acara di', 'di kota', 'luar kota', 'luar area', 'jangkau', 'cover', 'mencakup'])) {
            // Check if user also mentions an out-of-area city
            if (isOutOfAreaQuery(msg)) {
                return getOutOfAreaReply(msg);
            }
            return 'Studio kami berlokasi di Jl. Gang Hiu No.10 LK. Teleng, Sidoharjo, Pacitan.\n\nArea layanan utama: Kab. Pacitan, Kab. Wonogiri, Kab. Trenggalek, Kab. Ponorogo.\n\nUntuk acara di luar area tersebut, jika kakak ingin berdiskusi silahkan hubungi WhatsApp dengan menekan tombol "Chat via WhatsApp" di bawah ya kak.\nBiaya transportasi di luar radius 10 km dari studio dikenakan charge Rp100.000.';
        }

        // PRD §17.2: Out-of-area locations MUST direct to WhatsApp CTA
        if (isOutOfAreaQuery(msg)) {
            return getOutOfAreaReply(msg);
        }

        if (containsAny(msg, ['jam', 'buka', 'tutup', 'operasional', 'kerja'])) {
            return 'Jam operasional studio:\n\n- Hari kerja: Senin \u2013 Sabtu\n- Jam buka: 10.00 AM\n- Jam tutup: 09.00 PM\n- Hari libur: Minggu & tanggal merah nasional\n\nKonsultasi via WhatsApp tetap tersedia di luar jam tersebut ya kak.';
        }

        // PRD §12.1-12.3 & §16.1-16.4: Booking response rules
        // - Must NOT show bank account number
        // - Must NOT show [nomor disembunyikan]
        // - Must NOT show WhatsApp number
        // - Must guide user to CTA buttons for action
        if (containsAny(msg, ['booking', 'pesan', 'cara', 'daftar', 'reservasi', 'dp', 'pembayaran', 'transfer', 'rekening'])) {
            return 'Halo kak, terima kasih sudah bertanya 🙂 Untuk booking di Alima Photo, caranya begini ya kak:\n\n1. Booking dilakukan minimal 1 bulan sebelum hari acara.\n2. Ada DP minimum Rp300.000 untuk mengamankan tanggal.\n3. Pembayaran transfer dilakukan ke rekening yang tertera.\n4. Setelah transfer, konfirmasi via WhatsApp ya kak.\n5. Tim akan menghubungi lagi untuk konfirmasi detail acara.\n\nKalau ada yang mau ditanyakan lebih lanjut, langsung klik tombol di bawah ya kak.';
        }

        if (containsAny(msg, ['pengerjaan', 'berapa lama', 'kapan jadi', 'kapan selesai', 'editing', 'hasil', 'album'])) {
            return 'Untuk semua paket, estimasi pengerjaan maksimal 1 bulan setelah acara atau setelah pelunasan ya kak 🙏\n\nUntuk proses editing dan printing, pengerjaan mengikuti status pelunasan. Jadi setelah acara selesai dan pembayaran beres, tim bisa lanjut proses finalisasi file dan cetak.';
        }

        if (containsAny(msg, ['nego', 'diskon', 'murah', 'promo', 'bonus'])) {
            return 'Untuk penyesuaian budget, boleh konsultasi langsung dengan Min Limpo ya kak. Tim kami bisa bantu rekomendasikan paket yang paling sesuai.';
        }

        return 'Maaf kak, saya hanya bisa bantu informasi seputar layanan wedding photography Alima Photo ya 🙏\n\nKalau kakak mau, saya bisa bantu jelaskan pricelist, benefit paket, cara booking, atau waktu pengerjaan.';
    }

    function containsAny(text, keywords) {
        for (var i = 0; i < keywords.length; i++) {
            if (text.indexOf(keywords[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    function containsWord(text, keywords) {
        var lower = text.toLowerCase();
        for (var i = 0; i < keywords.length; i++) {
            if (lower.indexOf(keywords[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    /* ========================================
       CONTEXTUAL CTA DETECTION
       ======================================== */

    function getCTAsForResponse(userMessage, botReply) {
        var ctas = [];
        if (!userMessage || !botReply) return ctas;

        var userMsg = userMessage.toLowerCase().trim();
        var botMsg = sanitizeReply(botReply).toLowerCase();

        // PRD §13.3: Show Booking sekarang if booking intent detected
        var hasBooking = containsWord(userMsg, [
            'booking', 'book', 'reservasi', 'reserve',
            'appointment', 'buat janji', 'buat jadwal',
            'mau booking', 'mau reservasi', 'mau pesan',
            'saya mau booking', 'ingin booking', 'ingin reservasi',
            'lanjut booking', 'proses booking'
        ]) || containsWord(botMsg, [
            'booking sekarang', 'booking disini', 'halaman booking',
            'tombol booking', 'klik tombol booking', 'lanjut ke halaman booking'
        ]);

        // PRD §13.3: Show Chat via WhatsApp if consult/admin/follow-up intent detected
        var hasWA = containsWord(userMsg, [
            'whatsapp', 'wa ', 'chat wa', 'ke wa',
            'admin', 'customer service', 'cs ',
            'hubungkan ke', 'hubungi', 'chat langsung',
            'konsultasi', 'tanya langsung', 'bicara tim',
            'follow up', 'lanjut wa', 'via wa',
            'nego', 'diskon', 'murah', 'promo', 'bonus',
            'gear', 'kamera', 'lensa', 'lighting', 'drone',
            'audio', 'alat', 'equipment', 'sony',
            'canon', 'fuji', 'mic', 'stabilizer'
        ]) || containsWord(botMsg, [
            'chat via whatsapp', 'chat whatsapp', 'tombol chat',
            'klik tombol chat', 'konsultasi langsung',
            'konsultasi lanjut', 'via whatsapp', 'chat min limpo',
            'whatsapp', 'lewat whatsapp'
        ]);

        if (isGearQuestion(userMessage)) {
            hasWA = true;
        }

        // PRD §17.2 & §10.6: Out-of-area locations MUST trigger WhatsApp CTA
        var isOutOfArea = containsWord(userMsg, [
            'solo', 'surabaya', 'jakarta', 'semarang', 'jogja', 'yogyakarta',
            'malang', 'bandung', 'bali', 'medan', 'makassar', 'denpasar',
            'luar jawa', 'luar pulau', 'luar kota', 'luar area'
        ]) || containsWord(botMsg, [
            'belum termasuk area layanan utama',
            'di luar area',
            'di luar cakupan utama'
        ]);
        if (isOutOfArea) {
            hasWA = true;
        }

        // PRD §13.4: Order — Booking sekarang first, then Chat via WhatsApp
        if (hasBooking) {
            ctas.push({ label: 'Booking sekarang', url: 'formbooking.html', type: 'cta-booking' });
        }

        if (hasWA) {
            ctas.push({ label: 'Chat via WhatsApp', url: 'contact.html', type: 'cta-wa' });
        }

        return ctas;
    }

    /* ========================================
       API REQUEST
       ======================================== */

    function validateBackendResponse(data) {
        if (!data || typeof data !== 'object') {
            log('warn', 'Backend response is not an object');
            return null;
        }
        if (typeof data.reply !== 'string' || data.reply.length === 0) {
            log('warn', 'Backend response missing valid reply field');
            return null;
        }
        var result = { reply: data.reply, chatState: data.chatState || null, cta: null };
        if (data.cta && typeof data.cta === 'object') {
            result.cta = {
                show_whatsapp: data.cta.show_whatsapp === true,
                show_booking: data.cta.show_booking === true
            };
        }
        return result;
    }

    function buildCTAsFromBackend(ctaConfig) {
        var ctas = [];
        if (!ctaConfig) return ctas;
        // PRD §13.4: Order — Booking sekarang first, then Chat via WhatsApp
        if (ctaConfig.show_booking === true) {
            ctas.push({ label: 'Booking sekarang', url: 'formbooking.html', type: 'cta-booking' });
        }
        if (ctaConfig.show_whatsapp === true) {
            ctas.push({ label: 'Chat via WhatsApp', url: 'contact.html', type: 'cta-wa' });
        }
        return ctas;
    }

    function sendToBackend(message) {
        log('info', 'Sending to backend: ' + BACKEND_URL);
        return fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, chatState: chatState, chatHistory: chatHistory.slice(-10) })
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Backend error: ' + response.status);
            }
            return response.json();
        }).then(function (data) {
            if (data.error) {
                throw new Error(data.message || 'Backend error');
            }
            return data;
        });
    }

    /* ========================================
       MAIN SEND LOGIC
       ======================================== */

    function sendMessage(message) {
        if (uiState === 'loading') {
            log('warn', 'sendMessage blocked — already loading');
            return;
        }

        var trimmed = message.trim();

        if (trimmed === '') return;

        if (trimmed.length > MAX_INPUT_LENGTH) {
            trimmed = trimmed.substring(0, MAX_INPUT_LENGTH);
        }

        appendMessage('user', trimmed);
        chatInput.value = '';
        setUIState('loading');

        log('info', 'Sending message: "' + trimmed.substring(0, 80) + '"');

        var useBackend = BACKEND_URL && BACKEND_URL.length > 0;

        if (useBackend) {
            sendToBackend(trimmed).then(function (rawData) {
                var validated = validateBackendResponse(rawData);
                if (!validated) {
                    log('warn', 'Backend response schema invalid, using fallback');
                    runDummyFallback(trimmed);
                    return;
                }
                var reply = sanitizeReply(validated.reply);

                // PRD §17.2: Post-process out-of-area replies from backend
                reply = postProcessOutOfAreaReply(trimmed, reply);
                
                // PRD: Override unlimited files hallucination
                reply = postProcessUnlimitedReply(trimmed, reply);

                var ctas;
                if (validated.cta) {
                    ctas = buildCTAsFromBackend(validated.cta);
                    log('info', 'Using backend cta config: wa=' + validated.cta.show_whatsapp + ' booking=' + validated.cta.show_booking);
                } else {
                    ctas = getCTAsForResponse(trimmed, reply);
                }

                // PRD §17.2: Force WhatsApp CTA for out-of-area queries
                if (isOutOfAreaQuery(trimmed)) {
                    var hasWaCta = false;
                    for (var ci = 0; ci < ctas.length; ci++) {
                        if (ctas[ci].type === 'cta-wa') { hasWaCta = true; break; }
                    }
                    if (!hasWaCta) {
                        ctas.push({ label: 'Chat via WhatsApp', url: 'contact.html', type: 'cta-wa' });
                    }
                }

                appendMessage('bot', reply, ctas);
                updateChatState(validated.chatState);
                log('info', 'Backend response rendered');
                setUIState('idle');
            }).catch(function (err) {
                var errMsg = err && err.message ? err.message : 'unknown';
                var isCORS = err instanceof TypeError || errMsg.indexOf('Failed to fetch') !== -1 || errMsg.indexOf('NetworkError') !== -1;
                if (isCORS) {
                    log('error', 'CORS/network error — origin mismatch or blocked: ' + errMsg);
                } else {
                    log('error', 'Backend fetch failed: ' + errMsg);
                }
                runDummyFallback(trimmed);
            });
        } else {
            log('info', 'No backend URL configured, using dummy fallback');
            setTimeout(function () {
                runDummyFallback(trimmed);
            }, 500);
        }
    }

    function runDummyFallback(trimmed) {
        setTimeout(function () {
            var cleanMsg = trimmed.replace(/\b(dong|deh|ya|kak|nih)\b/gi, '').replace(/\s+/g, ' ').trim();

            var isNumericOption = /^\d+(\.\d+)?$/.test(cleanMsg) || /(?:nomor|no|yang|pilih|pilihan)?\s*\d+(\.\d+)?/i.test(cleanMsg) || /\b(pertama|kedua|ketiga|keempat)\b/i.test(cleanMsg);
            if (isNumericOption) {
                var selectedNum = null;
                if (/\bpertama\b/i.test(cleanMsg)) selectedNum = '1';
                else if (/\bkedua\b/i.test(cleanMsg)) selectedNum = '2';
                else if (/\bketiga\b/i.test(cleanMsg)) selectedNum = '3';
                else if (/\bkeempat\b/i.test(cleanMsg)) selectedNum = '4';
                else {
                    var match = cleanMsg.match(/(?:nomor|no|yang|pilih|pilihan)?\s*(\d+(\.\d+)?)/i);
                    if (match) selectedNum = match[1];
                    else if (/^\d+(\.\d+)?$/.test(cleanMsg)) selectedNum = cleanMsg;
                }

                if (selectedNum) {
                    if (selectedNum.indexOf('.') !== -1) {
                        var pkgIdMap = {
                            '1.1': 'photo_bronze', '1.2': 'photo_silver', '1.3': 'photo_gold',
                            '2.1': 'photo_video_bronze', '2.2': 'photo_video_silver', '2.3': 'photo_video_gold', '2.4': 'photo_video_platinum',
                            '3.1': 'bahagia',
                            '4.1': 'complete_1', '4.2': 'complete_2', '4.3': 'complete_3'
                        };
                        var directPkgId = pkgIdMap[selectedNum];
                        if (directPkgId) {
                            var directReply = getTierBenefitDummy(directPkgId);
                            appendMessage('bot', directReply);
                            chatState.lastQuestionType = null;
                            chatState.selectedPackage = directPkgId;
                            setUIState('idle');
                            return;
                        }
                    }

                    if (chatState.lastOptions && chatState.lastOptions.length > 0) {
                    var idx = parseInt(selectedNum, 10) - 1;
                    if (idx >= 0 && idx < chatState.lastOptions.length) {
                        var selected = chatState.lastOptions[idx];

                        if (chatState.lastQuestionType === 'choose_category' && selected.categoryId) {
                            var catLabel = selected.label || selected.categoryId;
                            var reply = getCategoryTierListDummy(selected.categoryId, catLabel);
                            appendMessage('bot', reply);
                            chatState.currentCategory = selected.categoryId;
                            chatState.lastQuestionType = 'choose_tier';
                            chatState.lastIntent = 'category_detail';
                            chatState.lastOptions = getTierOptionsDummy(selected.categoryId);
                            setUIState('idle');
                            return;
                        }

                        if (chatState.lastQuestionType === 'choose_option' || chatState.lastQuestionType === 'choose_tier') {
                            var pkgId = selected.packageId;
                            if (!pkgId && selected.tier) {
                                pkgId = chatState.currentCategory + '_' + selected.tier;
                            }
                            if (pkgId) {
                                var tierReply = getTierBenefitDummy(pkgId);
                                appendMessage('bot', tierReply);
                                chatState.lastQuestionType = null;
                                chatState.selectedPackage = pkgId;
                                setUIState('idle');
                                return;
                            }
                        }
                    }
                    } // closes: if (chatState.lastOptions ...)
                }
            }

            if (chatState.lastQuestionType === 'choose_tier' && chatState.currentCategory) {
                var tierPkgId = findTierInCategoryDummy(cleanMsg, chatState.currentCategory);
                if (tierPkgId) {
                    var tierReply = getTierBenefitDummy(tierPkgId);
                    appendMessage('bot', tierReply);
                    chatState.lastQuestionType = null;
                    chatState.selectedPackage = tierPkgId;
                    setUIState('idle');
                    return;
                }
            }

            if (chatState.lastQuestionType === 'choose_category' || chatState.lastQuestionType === 'choose_tier') {
                appendMessage('bot', 'Nomor berapa yang kakak maksud ya? Kalau mau, bisa ketik semua pricelist dulu supaya saya tampilkan pilihannya \u{1F642}');
                setUIState('idle');
                return;
            }

            if (chatState.currentCategory) {
                var scopedPkgId = findTierInCategoryDummy(cleanMsg, chatState.currentCategory);
                if (scopedPkgId) {
                    var benefitReply = getTierBenefitDummy(scopedPkgId);
                    appendMessage('bot', benefitReply);
                    chatState.selectedPackage = scopedPkgId;
                    chatState.lastQuestionType = null;
                    setUIState('idle');
                    return;
                }
            }

            var reply = getDummyResponse(trimmed);
            var ctas = getCTAsForResponse(trimmed, reply);
            appendMessage('bot', reply, ctas);

            if (trimmed === 'semua pricelist' || /^semua pricelist$/i.test(trimmed)) {
                chatState = {
                    lastIntent: 'all_pricelist',
                    lastTierMentioned: null,
                    lastQuestionType: 'choose_category',
                    lastOptions: [
                        { number: '1', categoryId: 'photo', label: 'Photography Wedding Packages' },
                        { number: '2', categoryId: 'photo_video', label: 'Photography and Videography Wedding Packages' },
                        { number: '3', categoryId: 'bahagia', label: 'Bahagia Package' },
                        { number: '4', categoryId: 'complete', label: 'Complete Photography and Videography Wedding-Prewedding' }
                    ],
                    selectedPackage: null,
                    currentCategory: null
                };
            } else {
                var catCtx = detectCategoryContextFallback(cleanMsg);
                if (catCtx) {
                    chatState.currentCategory = catCtx;
                    chatState.lastOptions = getTierOptionsDummy(catCtx);
                    chatState.lastQuestionType = 'choose_tier';
                    chatState.lastIntent = 'category_lookup';
                }

                var disambigOptions = getDisambigOptionsForFallback(cleanMsg);
                if (disambigOptions) {
                    chatState.lastOptions = disambigOptions;
                    chatState.lastQuestionType = 'choose_option';
                    chatState.lastIntent = 'tier_lookup';
                }
            }

            setUIState('idle');
        }, 800);
    }

    function getTierOptionsDummy(catId) {
        if (catId === 'photo') return [
            { label: 'Bronze', price: 'Rp1.500.000', packageId: 'photo_bronze' },
            { label: 'Silver', price: 'Rp2.300.000', packageId: 'photo_silver' },
            { label: 'Gold', price: 'Rp5.000.000', packageId: 'photo_gold' }
        ];
        if (catId === 'photo_video') return [
            { label: 'Bronze', price: 'Rp3.500.000', packageId: 'photo_video_bronze' },
            { label: 'Silver', price: 'Rp4.000.000', packageId: 'photo_video_silver' },
            { label: 'Gold', price: 'Rp6.500.000', packageId: 'photo_video_gold' },
            { label: 'Platinum', price: 'Rp8.000.000', packageId: 'photo_video_platinum' }
        ];
        if (catId === 'bahagia') return [
            { label: 'Bahagia', price: 'Rp3.000.000', packageId: 'bahagia' }
        ];
        if (catId === 'complete') return [
            { label: 'Complete 1', price: 'Rp6.500.000', packageId: 'complete_1' },
            { label: 'Complete 2', price: 'Rp7.500.000', packageId: 'complete_2' },
            { label: 'Complete 3', price: 'Rp8.500.000', packageId: 'complete_3' }
        ];
        return [];
    }

    function findTierInCategoryDummy(msg, catId) {
        var m = msg.toLowerCase();
        var prefix = catId + '_';
        if (catId === 'photo' || catId === 'photo_video') {
            if (m.indexOf('bronze') !== -1) return prefix + 'bronze';
            if (m.indexOf('silver') !== -1) return prefix + 'silver';
            if (m.indexOf('gold') !== -1 && catId === 'photo') return 'photo_gold';
            if (m.indexOf('gold') !== -1 && catId === 'photo_video') return 'photo_video_gold';
            if (m.indexOf('platinum') !== -1) return 'photo_video_platinum';
        }
        if (catId === 'bahagia') return 'bahagia';
        if (catId === 'complete') {
            if (m.indexOf('complete 1') !== -1 || m.indexOf('complete1') !== -1 || m.indexOf('complete satu') !== -1) return 'complete_1';
            if (m.indexOf('complete 2') !== -1 || m.indexOf('complete2') !== -1 || m.indexOf('complete dua') !== -1) return 'complete_2';
            if (m.indexOf('complete 3') !== -1 || m.indexOf('complete3') !== -1 || m.indexOf('complete tiga') !== -1) return 'complete_3';
        }
        return null;
    }

    function detectCategoryContextFallback(msg) {
        var m = msg.toLowerCase();
        if (containsAny(m, ['foto saja', 'foto aja', 'paket foto saja', 'photo only', 'fotografi saja'])) return 'photo';
        if (containsAny(m, ['foto video', 'foto + video', 'foto dan video', 'foto & video', 'paket foto video', 'photo video', 'photography videography'])) return 'photo_video';
        if (containsAny(m, ['paket complete', 'complete aja', 'complete package', 'complete packages', 'paket lengkap', 'paket komplit', 'wedding prewedding', 'prewedding wedding', 'paket prewed wedding'])) return 'complete';
        if (m.indexOf('bahagia') !== -1) return 'bahagia';
        return null;
    }

    function getDisambigOptionsForFallback(msg) {
        var m = msg.toLowerCase();
        if (m.indexOf('bronze') !== -1) return [
            { label: 'Photography - Bronze', price: 'Rp1.500.000', packageId: 'photo_bronze' },
            { label: 'Photography and Videography - Bronze', price: 'Rp3.500.000', packageId: 'photo_video_bronze' }
        ];
        if (m.indexOf('silver') !== -1) return [
            { label: 'Photography - Silver', price: 'Rp2.300.000', packageId: 'photo_silver' },
            { label: 'Photography and Videography - Silver', price: 'Rp4.000.000', packageId: 'photo_video_silver' }
        ];
        if (m.indexOf('gold') !== -1) return [
            { label: 'Photography - Gold', price: 'Rp5.000.000', packageId: 'photo_gold' },
            { label: 'Photography and Videography - Gold', price: 'Rp6.500.000', packageId: 'photo_video_gold' }
        ];
        if (m.indexOf('platinum') !== -1) return [
            { label: 'Photography and Videography - Platinum', price: 'Rp8.000.000', packageId: 'photo_video_platinum' }
        ];
        return null;
    }

    function getTierBenefitDummy(pkgId) {
        if (pkgId === 'photo_bronze') {
            return 'Siap kak 🙂 Ini detail Bronze Photography Wedding Packages.\n\nBronze: Rp1.500.000\n\nLayanan & Benefit:\n- Unlimited files\n- 1 Photographer\n- Akad-Upacara Adat/Resepsi\n- Cetak 4R 100 pcs\n- Album Magnetic\n- 12RS Photo Print with Frame\n- All Files Drive\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_silver') {
            return 'Siap kak 🙂 Ini detail Silver Photography Wedding Packages.\n\nSilver: Rp2.300.000\n\nLayanan & Benefit:\n- Unlimited files\n- 1 Photographer\n- Akad-Upacara Adat/Resepsi\n- Wedding Book Exclusive 20 Pages\n- 12RS Photo Print with Frame\n- All Files Drive\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_gold') {
            return 'Siap kak 🙂 Ini detail Gold Photography Wedding Packages.\n\nGold: Rp5.000.000\n\nLayanan & Benefit:\n- Unlimited files\n- 2 Photographers\n- Akad-Upacara Adat/Resepsi\n- Album Storybook Exclusive 40 Pages\n- Cetak 4R 80 pcs\n- 12RS Photo Print with Frame\n- All Files Flashdisk\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_video_bronze') {
            return 'Siap kak 🙂 Ini detail Bronze Photography and Videography Wedding Packages.\n\nBronze: Rp3.500.000\n\nLayanan & Benefit:\n- Unlimited files\n- Akad-Upacara Adat/Resepsi\n- 4R Photo Print\n- Album Magnetic\n- Copy All File & Editing\n- Teaser 1 Menit\n- Cinematic 3 Menit\n- All File Drive\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_video_silver') {
            return 'Siap kak 🙂 Ini detail Silver Photography and Videography Wedding Packages.\n\nSilver: Rp4.000.000\n\nLayanan & Benefit:\n- Unlimited files\n- Akad-Upacara Adat/Resepsi\n- Wedding Book Exclusive 20 Pages\n- Free Cetak 12RS With Frame\n- Copy All File & Editing\n- Teaser 1 Menit\n- Cinematic 3 Menit\n- All File Drive\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_video_gold') {
            return 'Siap kak 🙂 Ini detail Gold Photography and Videography Wedding Packages.\n\nGold: Rp6.500.000\n\nLayanan & Benefit:\n- Unlimited files\n- Akad-Upacara Adat/Resepsi\n- Album Storybook Exclusive 40 Pages\n- Album Magazine 20 Pages\n- 2 Photographers\n- 1 Videografer\n- Copy All File & Editing\n- Teaser 1 Menit\n- Cinematic 3-5 Menit\n- Flashdisk\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'photo_video_platinum') {
            return 'Siap kak 🙂 Ini detail Platinum Photography and Videography Wedding Packages.\n\nPlatinum: Rp8.000.000\n\nLayanan & Benefit:\n- Unlimited files\n- Akad-Upacara Adat/Resepsi\n- Album Storybook Exclusive 30x30 40 Pages\n- Album Magazine 20 Pages\n- Album Storybook 20x15 40 Pages\n- 2 Photographers\n- 1 Videografer\n- Copy All File & Editing\n- Teaser 1 Menit\n- Cinematic 3-5 Menit\n- Flashdisk\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        if (pkgId === 'bahagia') {
            return 'Siap kak 🙂 Ini detail Bahagia Package.\n\nBahagia: Rp3.000.000\n\nLayanan & Benefit:\n- Unlimited files\n- Akad-Upacara Adat/Resepsi\n- Cetak 4R 100 pcs\n- Album Magnetic\n- Copy All File & Editing\n- Teaser 1 Menit\n- All File Drive\n\nAda paket lain yang mau dicek juga, kak? 🙂';
        }
        return 'Detail paket tidak ditemukan. Silakan coba lagi.';
    }

    function getCategoryTierListDummy(categoryId, label) {
        if (categoryId === 'photo') {
            return 'Boleh kak 🙂 Untuk ' + label + ', pilihannya ini ya:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - 1.1 Bronze: Rp1.500.000\n' +
                '   - 1.2 Silver: Rp2.300.000\n' +
                '   - 1.3 Gold: Rp5.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik 1.1, 1.2, atau 1.3 🙂';
        }
        if (categoryId === 'photo_video') {
            return 'Boleh kak 🙂 Untuk ' + label + ', pilihannya ini ya:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - 2.1 Bronze: Rp3.500.000\n' +
                '   - 2.2 Silver: Rp4.000.000\n' +
                '   - 2.3 Gold: Rp6.500.000\n' +
                '   - 2.4 Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik 2.1, 2.2, 2.3, atau 2.4 🙂';
        }
        if (categoryId === 'bahagia') {
            return 'Boleh kak 🙂 Untuk ' + label + ':\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - 3.1 Bahagia: Rp3.000.000\n' +
                '\n' +
                'Mau saya jelaskan layanan dan benefitnya, kak? 🙂\n' +
                'Bisa ketik 3.1 untuk melihat detailnya.';
        }
        if (categoryId === 'complete') {
            return 'Boleh kak 🙂 Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - 4.1 Complete 1: Rp6.500.000\n' +
                '   - 4.2 Complete 2: Rp7.500.000\n' +
                '   - 4.3 Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?\n' +
                'Bisa ketik 4.1, 4.2, atau 4.3 🙂';
        }
        return 'Kategori tidak dikenal. Silakan ketik nomor 1-4 atau sub-nomor 🙂';
    }

    /* ========================================
       EVENT LISTENERS
       ======================================== */

    if (!domReady) {
        log('error', 'DOM element(s) missing — abort init. chatMessages=' + !!chatMessages + ' chatLoading=' + !!chatLoading + ' chatInput=' + !!chatInput + ' chatSendBtn=' + !!chatSendBtn + ' quickQuestions=' + !!quickQuestions);
        return;
    }

    chatSendBtn.addEventListener('click', function () {
        sendMessage(chatInput.value);
    });

    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(chatInput.value);
        }
    });

    var staticQuickBtns = quickQuestions.querySelectorAll('.quick-btn');
    for (var i = 0; i < staticQuickBtns.length; i++) {
        staticQuickBtns[i].addEventListener('click', function () {
            sendMessage(this.getAttribute('data-question'));
        });
    }

    /* ========================================
       INIT
       ======================================== */

    log('info', 'Initializing chatbot. domReady=' + domReady + ' backendUrl=' + BACKEND_URL);
    renderWelcomeMessage();
})();
