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

    function formatBotText(text) {
        var escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        escaped = escaped.replace(/\*([^*<]+)\*/g, '<strong>$1</strong>');

        return escaped;
    }

    function appendMessage(role, text) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message message-' + role;

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
        return 'Untuk detail gear yang digunakan tim Alima Photo, boleh langsung chat Min Limpo via WhatsApp ya kak 🙏\nNomor WhatsApp: 0852 3232 1080';
    }

    /* ========================================
       DUMMY RESPONSES (Knowledge Base Fallback)
       ======================================== */

    function getDummyResponse(message) {
        var msg = message.toLowerCase().trim();

        if (isGearQuestion(msg)) {
            return getGearRedirectResponse();
        }

        if (msg === 'semua pricelist' || /^(semua|lihat|daftar|all) (pricelist|harga|paket)/i.test(msg)) {
            return 'Boleh kak 🙂 Ini pilihan paket Alima Photo secara ringkas:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Bronze: Rp1.500.000\n' +
                '   - Silver: Rp2.300.000\n' +
                '   - Gold: Rp5.000.000\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Bronze: Rp3.500.000\n' +
                '   - Silver: Rp4.000.000\n' +
                '   - Gold: Rp6.500.000\n' +
                '   - Platinum: Rp8.000.000\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - Bahagia: Rp3.000.000\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - Complete 1: Rp6.500.000\n' +
                '   - Complete 2: Rp7.500.000\n' +
                '   - Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik nama tier seperti Bronze, Silver, Gold, Platinum, Complete 1, atau nomor paketnya 🙂';
        }

        if (containsAny(msg, ['foto saja', 'foto aja', 'paket foto saja', 'photo only', 'fotografi saja'])) {
            return 'Boleh kak 🙂 Untuk paket foto saja, pilihannya ini ya:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Bronze: Rp1.500.000\n' +
                '   - Silver: Rp2.300.000\n' +
                '   - Gold: Rp5.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, atau Gold 🙂';
        }

        if (containsAny(msg, ['foto video', 'foto + video', 'foto dan video', 'foto & video', 'paket foto video', 'photo video', 'photography videography'])) {
            return 'Boleh kak 🙂 Untuk paket foto + video, pilihannya ini ya:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Bronze: Rp3.500.000\n' +
                '   - Silver: Rp4.000.000\n' +
                '   - Gold: Rp6.500.000\n' +
                '   - Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, Gold, atau Platinum 🙂';
        }

        if (containsAny(msg, ['paket complete', 'complete aja', 'complete package', 'complete packages', 'paket lengkap', 'paket komplit', 'wedding prewedding', 'prewedding wedding', 'paket prewed wedding'])) {
            return 'Boleh kak 🙂 Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - Complete 1: Rp6.500.000\n' +
                '   - Complete 2: Rp7.500.000\n' +
                '   - Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?';
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

        if (containsAny(msg, ['lokasi', 'alamat', 'studio', 'di mana', 'dimana', 'maps'])) {
            return 'Studio kami berlokasi di Jl. Gang Hiu No.10 LK. Teleng, Sidoharjo, Pacitan.\n\nArea layanan: Kab. Pacitan, Kab. Wonogiri, Kab. Trenggalek, Kab. Ponorogo.\n\nUntuk acara di luar area tersebut, silakan konsultasi langsung melalui WhatsApp ya kak.\nBiaya transportasi di luar radius 10 km dari studio dikenakan charge Rp100.000.';
        }

        if (containsAny(msg, ['jam', 'buka', 'tutup', 'operasional', 'kerja'])) {
            return 'Jam operasional studio:\n\n- Hari kerja: Senin \u2013 Sabtu\n- Jam buka: 10.00 AM\n- Jam tutup: 09.00 PM\n- Hari libur: Minggu & tanggal merah nasional\n\nKonsultasi via WhatsApp tetap tersedia di luar jam tersebut ya kak.';
        }

        if (containsAny(msg, ['booking', 'pesan', 'cara', 'daftar', 'reservasi', 'dp', 'pembayaran', 'transfer', 'rekening'])) {
            return 'Untuk booking, bisa melalui:\n\n1. WhatsApp Min Limpo: 0852 3232 1080\n2. Form booking di website\n\nKetentuan:\n- Booked minimal 1 bulan sebelum hari H\n- DP minimal Rp300.000\n- Pembatalan sepihak = DP hangus\n- Pelunasan maksimal 5-10 hari setelah pemotretan\n- Transfer ke SeaBank 9014 4503 3316 an. Renggi Andika Putra\n\nAda yang ingin ditanyakan lagi, kak?';
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

    /* ========================================
       API REQUEST
       ======================================== */

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
            sendToBackend(trimmed).then(function (data) {
                var reply = data.reply || 'Maaf, terjadi kendala saat memproses pertanyaan Anda.';
                appendMessage('bot', reply);
                updateChatState(data.chatState);
                log('info', 'Backend response rendered');
                setUIState('idle');
            }).catch(function (err) {
                log('warn', 'Backend failed, falling back: ' + (err && err.message ? err.message : 'unknown'));
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
            var cleanMsg = trimmed.replace(/\b(dong|deh|ya|kak|min|nih)\b/gi, '').replace(/\s+/g, ' ').trim();

            var isNumericOption = /^\d+$/.test(cleanMsg) || /(?:nomor|no|yang|pilih|pilihan)?\s*\d+/i.test(cleanMsg) || /\b(pertama|kedua|ketiga|keempat)\b/i.test(cleanMsg);
            if (isNumericOption && chatState.lastOptions && chatState.lastOptions.length > 0) {
                var selectedNum = null;
                if (/\bpertama\b/i.test(cleanMsg)) selectedNum = '1';
                else if (/\bkedua\b/i.test(cleanMsg)) selectedNum = '2';
                else if (/\bketiga\b/i.test(cleanMsg)) selectedNum = '3';
                else if (/\bkeempat\b/i.test(cleanMsg)) selectedNum = '4';
                else {
                    var match = cleanMsg.match(/(?:nomor|no|yang|pilih|pilihan)?\s*(\d+)/i);
                    if (match) selectedNum = match[1];
                    else if (/^\d+$/.test(cleanMsg)) selectedNum = cleanMsg;
                }

                if (selectedNum) {
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
            appendMessage('bot', reply);

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
                '   - Bronze: Rp1.500.000\n' +
                '   - Silver: Rp2.300.000\n' +
                '   - Gold: Rp5.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, atau Gold 🙂';
        }
        if (categoryId === 'photo_video') {
            return 'Boleh kak 🙂 Untuk ' + label + ', pilihannya ini ya:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Bronze: Rp3.500.000\n' +
                '   - Silver: Rp4.000.000\n' +
                '   - Gold: Rp6.500.000\n' +
                '   - Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, Gold, atau Platinum 🙂';
        }
        if (categoryId === 'bahagia') {
            return 'Boleh kak 🙂 Untuk ' + label + ':\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - Bahagia: Rp3.000.000\n' +
                '\n' +
                'Mau saya jelaskan layanan dan benefitnya, kak? 🙂';
        }
        if (categoryId === 'complete') {
            return 'Boleh kak 🙂 Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - Complete 1: Rp6.500.000\n' +
                '   - Complete 2: Rp7.500.000\n' +
                '   - Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?\n' +
                'Bisa ketik Complete 1, Complete 2, Complete 3, atau nomor 4.1, 4.2, 4.3 🙂';
        }
        return 'Kategori tidak dikenal. Silakan ketik nomor 1-4 🙂';
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
