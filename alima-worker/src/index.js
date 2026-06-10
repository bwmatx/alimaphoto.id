/**
 * Alima Photo Chatbot - Cloudflare Worker Backend
 *
 * Endpoint: POST /chat
 * Request:  { "message": "...", "chatState": {...}, "chatHistory": [...] }
 * Response: { "reply": "...", "step": "paket|benefit|info", "chatState": {...} }
 *
 * Deploy:  npx wrangler deploy
 * Secrets: npx wrangler secret put DEEPSEEK_API_KEY
 */

/* ========================================
   PACKAGE DATA
   ======================================== */

var PACKAGES = {
    photo_bronze: {
        id: 'photo_bronze',
        category: '1. Photography Wedding Packages',
        tier: 'Bronze',
        price: 'Rp1.500.000',
        categoryNum: '1',
        subNum: '1.1',
        benefits: [
            'Unlimited files',
            '1 Photographer',
            'Akad-Upacara Adat/Resepsi',
            'Cetak 4R 100 pcs',
            'Album Magnetic',
            '12RS Photo Print with Frame',
            'All Files Drive'
        ]
    },
    photo_silver: {
        id: 'photo_silver',
        category: '1. Photography Wedding Packages',
        tier: 'Silver',
        price: 'Rp2.300.000',
        categoryNum: '1',
        subNum: '1.2',
        benefits: [
            'Unlimited files',
            '1 Photographer',
            'Akad-Upacara Adat/Resepsi',
            'Wedding Book Exclusive 20 Pages',
            '12RS Photo Print with Frame',
            'All Files Drive'
        ]
    },
    photo_gold: {
        id: 'photo_gold',
        category: '1. Photography Wedding Packages',
        tier: 'Gold',
        price: 'Rp5.000.000',
        categoryNum: '1',
        subNum: '1.3',
        benefits: [
            'Unlimited files',
            '2 Photographers',
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 40 Pages',
            '4R Photo Print 80 pcs',
            '12RS Photo Print with Frame',
            'All Files Flashdisk'
        ]
    },
    photo_video_bronze: {
        id: 'photo_video_bronze',
        category: '2. Photography and Videography Wedding Packages',
        tier: 'Bronze',
        price: 'Rp3.500.000',
        categoryNum: '2',
        subNum: '2.1',
        benefits: [
            'Unlimited files',
            'Akad-Upacara Adat/Resepsi',
            '4R Photo Print',
            'Album Magnetic',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3 Menit',
            'All File Drive'
        ]
    },
    photo_video_silver: {
        id: 'photo_video_silver',
        category: '2. Photography and Videography Wedding Packages',
        tier: 'Silver',
        price: 'Rp4.000.000',
        categoryNum: '2',
        subNum: '2.2',
        benefits: [
            'Unlimited files',
            'Akad-Upacara Adat/Resepsi',
            'Wedding Book Exclusive 20 Pages',
            'Free Cetak 12RS With Frame',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3 Menit',
            'All File Drive'
        ]
    },
    photo_video_gold: {
        id: 'photo_video_gold',
        category: '2. Photography and Videography Wedding Packages',
        tier: 'Gold',
        price: 'Rp6.500.000',
        categoryNum: '2',
        subNum: '2.3',
        benefits: [
            'Unlimited files',
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 40 Pages',
            'Album Magazine 20 Pages',
            '2 Photographers',
            '1 Videografer',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3-5 Menit',
            'Flashdisk'
        ]
    },
    photo_video_platinum: {
        id: 'photo_video_platinum',
        category: '2. Photography and Videography Wedding Packages',
        tier: 'Platinum',
        price: 'Rp8.000.000',
        categoryNum: '2',
        subNum: '2.4',
        benefits: [
            'Unlimited files',
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 30x30 40 Pages',
            'Album Magazine 20 Pages',
            'Album Storybook 20x15 40 Pages',
            '2 Photographers',
            '1 Videografer',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3-5 Menit',
            'Flashdisk'
        ]
    },
    bahagia: {
        id: 'bahagia',
        category: '3. Bahagia Package',
        tier: 'Bahagia',
        price: 'Rp3.000.000',
        categoryNum: '3',
        subNum: '3.1',
        benefits: [
            'Unlimited files',
            'Akad-Upacara Adat/Resepsi',
            'Cetak 4R 100 pcs',
            'Album Magnetic',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'All File Drive'
        ]
    },
    complete_1: {
        id: 'complete_1',
        category: '4. Complete Photography and Videography Wedding-Prewedding',
        tier: 'Complete 1',
        price: 'Rp6.500.000',
        categoryNum: '4',
        subNum: '4.1',
        preweddingBenefits: [
            'Free Prewedding MUA',
            'Edit 20 Files',
            'Print 1 File 16RS With Frame',
            'Indoor Prewedding'
        ],
        weddingBenefits: [
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 40 Pages',
            'Album Magazine 20 Pages',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3-5 Menit',
            'Flashdisk'
        ]
    },
    complete_2: {
        id: 'complete_2',
        category: '4. Complete Photography and Videography Wedding-Prewedding',
        tier: 'Complete 2',
        price: 'Rp7.500.000',
        categoryNum: '4',
        subNum: '4.2',
        preweddingBenefits: [
            'Free Prewedding MUA + 1 Dress',
            'Edit 20 Files',
            'Print 2 File 16RS With Frame',
            '2 Concept Outdoor-Indoor'
        ],
        weddingBenefits: [
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 40 Pages',
            'Album Magazine 20 Pages',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3-5 Menit',
            'Flashdisk'
        ]
    },
    complete_3: {
        id: 'complete_3',
        category: '4. Complete Photography and Videography Wedding-Prewedding',
        tier: 'Complete 3',
        price: 'Rp8.500.000',
        categoryNum: '4',
        subNum: '4.3',
        preweddingBenefits: [
            'Free Prewedding MUA + 1 Dress',
            'Edit 20 Files',
            'Print 2 File 16RS With Frame',
            'Teaser 1 Menit',
            '2 Concept Outdoor-Indoor'
        ],
        weddingBenefits: [
            'Akad-Upacara Adat/Resepsi',
            'Album Storybook Exclusive 30x30 40 Pages',
            'Album Magazine 20 Pages',
            'Album Storybook 20x15 40 Pages',
            'Copy All File & Editing',
            'Teaser 1 Menit',
            'Cinematic 3-5 Menit',
            'Flashdisk'
        ]
    }
};

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function normalizeInput(text) {
    var cleaned = text.trim().replace(/,/g, '.').replace(/\s+/g, ' ');
    var fillerWords = /\b(dong|deh|ya|kak|min|nih)\b/gi;
    cleaned = cleaned.replace(fillerWords, '').replace(/\s+/g, ' ').trim();
    return cleaned;
}

function matchByTier(tierName) {
    var t = tierName.toLowerCase().trim();
    var matches = [];
    var packageIds = Object.keys(PACKAGES);
    for (var i = 0; i < packageIds.length; i++) {
        var pkg = PACKAGES[packageIds[i]];
        if (pkg.tier.toLowerCase() === t) {
            matches.push(pkg);
        }
    }
    return matches;
}

function matchBySubNum(input) {
    var cleaned = input.trim().replace(/,/g, '.');
    var packageIds = Object.keys(PACKAGES);
    for (var i = 0; i < packageIds.length; i++) {
        var pkg = PACKAGES[packageIds[i]];
        if (pkg.subNum === cleaned || pkg.categoryNum === cleaned) {
            return [pkg];
        }
    }
    return [];
}

function findTierInMessage(message) {
    var msg = message.toLowerCase();
    if (msg.indexOf('complete 1') !== -1 || msg.indexOf('complete one') !== -1) return 'complete 1';
    if (msg.indexOf('complete 2') !== -1) return 'complete 2';
    if (msg.indexOf('complete 3') !== -1) return 'complete 3';
    if (msg.indexOf('platinum') !== -1) return 'platinum';
    if (msg.indexOf('gold') !== -1) return 'gold';
    if (msg.indexOf('silver') !== -1) return 'silver';
    if (msg.indexOf('bronze') !== -1) return 'bronze';
    if (msg.indexOf('bahagia') !== -1) return 'bahagia';
    if (msg.indexOf('complete') !== -1) return 'complete';
    return null;
}

function matchTierPartial(partialName) {
    var t = partialName.toLowerCase().trim();
    var matches = [];
    var packageIds = Object.keys(PACKAGES);
    for (var i = 0; i < packageIds.length; i++) {
        var pkg = PACKAGES[packageIds[i]];
        if (pkg.tier.toLowerCase().indexOf(t) === 0) {
            matches.push(pkg);
        }
    }
    return matches;
}

function buildPackageContextForAI(message, chatState) {
    var userMsg = message.trim();
    var currentCategory = chatState.currentCategory || null;

    if (/^\d+$/.test(userMsg) && chatState && chatState.lastOptions && chatState.lastOptions.length > 1) {
        var idx = parseInt(userMsg, 10) - 1;
        if (idx >= 0 && idx < chatState.lastOptions.length) {
            var selected = chatState.lastOptions[idx];
            return {
                enrichedMessage: userMsg,
                selectedPackageId: selected.packageId,
                extraContext: 'User memilih opsi nomor ' + userMsg + ' dari pilihan sebelumnya. Opsi yang dipilih: ' + selected.label + ' (' + selected.price + '). Tampilkan langsung benefit paket ini.',
                categoryFilter: currentCategory
            };
        }
    }

    var tier = findTierInMessage(userMsg);
    if (tier) {
        var tierMatches = matchByTier(tier);
        if (tierMatches.length === 0) {
            tierMatches = matchTierPartial(tier);
        }
        if (currentCategory) {
            tierMatches = tierMatches.filter(function (p) {
                return p.id.indexOf(currentCategory) === 0;
            });
        }
        if (tierMatches.length === 1) {
            return {
                enrichedMessage: userMsg,
                selectedPackageId: tierMatches[0].id,
                extraContext: 'User menyebut tier ' + tier + ' dan hanya ada 1 paket yang cocok: ' + tierMatches[0].tier + ' - ' + tierMatches[0].price + '. Tampilkan langsung benefitnya. JANGAN menampilkan tier dari kategori lain.',
                categoryFilter: currentCategory
            };
        }
        if (tierMatches.length > 1) {
            var labels = tierMatches.map(function (p) { return p.tier + ' - ' + p.price; });
            return {
                enrichedMessage: userMsg,
                selectedPackageId: null,
                extraContext: 'User menyebut tier ' + tier + '. Ada ' + tierMatches.length + ' paket cocok: ' + labels.join(', ') + '. Tampilkan pilihan dan tanya user mau yang mana.',
                categoryFilter: currentCategory
            };
        }
    }

    if (/^\d+\.\d+$/.test(userMsg.replace(/,/g, '.'))) {
        var numMatches = matchBySubNum(userMsg);
        if (currentCategory && numMatches.length > 0) {
            numMatches = numMatches.filter(function (p) {
                return p.id.indexOf(currentCategory) === 0;
            });
        }
        if (numMatches.length > 0) {
            return {
                enrichedMessage: userMsg,
                selectedPackageId: numMatches[0].id,
                extraContext: 'User memilih nomor ' + numMatches[0].subNum + ' yaitu ' + numMatches[0].tier + ' - ' + numMatches[0].price + '. Tampilkan langsung benefit paket ini.',
                categoryFilter: currentCategory
            };
        }
    }

    return { enrichedMessage: userMsg, selectedPackageId: null, extraContext: '', categoryFilter: currentCategory };
}

function formatPackageBenefit(pkg) {
    var lines = [];
    lines.push(pkg.tier + ': ' + pkg.price);
    lines.push('');
    if (pkg.preweddingBenefits) {
        lines.push('Subpaket: Prewedding');
        lines.push('Layanan & Benefit:');
        for (var i = 0; i < pkg.preweddingBenefits.length; i++) {
            lines.push('- ' + pkg.preweddingBenefits[i]);
        }
        lines.push('');
        lines.push('Subpaket: Wedding');
        lines.push('Layanan & Benefit:');
        for (var j = 0; j < pkg.weddingBenefits.length; j++) {
            lines.push('- ' + pkg.weddingBenefits[j]);
        }
    } else {
        lines.push('Layanan & Benefit:');
        for (var k = 0; k < pkg.benefits.length; k++) {
            lines.push('- ' + pkg.benefits[k]);
        }
    }
    return lines.join('\n');
}

/* ========================================
   COMPLETE PACKAGE DETERMINISTIC HANDLER
   ======================================== */

function isCompleteListOnly(msg) {
    var m = msg.toLowerCase().trim().replace(/\s+/g, ' ');
    return /^(complete|paket complete|complete package|complete packages|paket lengkap|paket komplit|wedding prewedding|prewedding wedding|paket prewed wedding)$/.test(m);
}

function handleCompleteQuery(message, chatState) {
    var msg = message.toLowerCase().trim().replace(/,/g, '.').replace(/\s+/g, ' ');

    if (/^complete\s*1$|^complete satu$|^complete1$|^4[.,]\s*1$|^4\.1$|^nomor 4\.1$/.test(msg)) {
        return {
            reply: 'Siap kak \u{1F642} Ini detail Complete 1.\n' +
                '\n' +
                'Complete 1: Rp6.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & benefit:\n' +
                '- Free Prewedding Makeup MUA by Request\n' +
                '- Edit 20 Files\n' +
                '- Print Out 1 File 16RS With Frame\n' +
                '- Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Kalau mau, saya juga bisa bantu bandingkan dengan Complete 2 atau Complete 3, kak \u{1F642}',
            step: 'benefit',
            chatState: { lastIntent: 'package_detail', lastTierMentioned: 'Complete 1', lastOptions: [], lastQuestionType: null, selectedPackage: 'complete_1', currentCategory: 'complete' }
        };
    }

    if (/^complete\s*2$|^complete dua$|^complete2$|^4[.,]\s*2$|^4\.2$|^nomor 4\.2$/.test(msg)) {
        return {
            reply: 'Siap kak \u{1F642} Ini detail Complete 2.\n' +
                '\n' +
                'Complete 2: Rp7.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & benefit:\n' +
                '- Free Prewedding Makeup + 1 Dress MUA by Request\n' +
                '- Edit 20 File\n' +
                '- Print Out 2 File 16RS With Frame\n' +
                '- 2 Concept Outdoor-Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Mau lihat Complete 3 juga, kak? \u{1F642}',
            step: 'benefit',
            chatState: { lastIntent: 'package_detail', lastTierMentioned: 'Complete 2', lastOptions: [], lastQuestionType: null, selectedPackage: 'complete_2', currentCategory: 'complete' }
        };
    }

    if (/^complete\s*3$|^complete tiga$|^complete3$|^4[.,]\s*3$|^4\.3$|^nomor 4\.3$/.test(msg)) {
        return {
            reply: 'Siap kak \u{1F642} Ini detail Complete 3.\n' +
                '\n' +
                'Complete 3: Rp8.500.000\n' +
                '\n' +
                'Subpaket: Prewedding\n' +
                'Layanan & benefit:\n' +
                '- Free Prewedding Makeup + 1 Dress MUA by Request\n' +
                '- Edit 20 File\n' +
                '- Print Out 2 File 16RS With Frame\n' +
                '- Teaser 1 Menit\n' +
                '- 2 Concept Outdoor-Indoor\n' +
                '\n' +
                'Subpaket: Wedding\n' +
                'Layanan & benefit:\n' +
                '- Akad-Upacara Adat/Resepsi\n' +
                '- Album Storybook Exclusive 30x30 40 Pages\n' +
                '- Album Magazine 20 Pages\n' +
                '- Album Storybook 20x15 40 Pages\n' +
                '- Copy All File & Editing\n' +
                '- Teaser 1 Menit\n' +
                '- Cinematic 3-5 Menit\n' +
                '- Flashdisk\n' +
                '\n' +
                'Ada yang bisa saya bantu lagi, kak? \u{1F642}',
            step: 'benefit',
            chatState: { lastIntent: 'package_detail', lastTierMentioned: 'Complete 3', lastOptions: [], lastQuestionType: null, selectedPackage: 'complete_3', currentCategory: 'complete' }
        };
    }

    if (isCompleteListOnly(msg)) {
        return {
            reply: 'Boleh kak \u{1F642} Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - Complete 1: Rp6.500.000\n' +
                '   - Complete 2: Rp7.500.000\n' +
                '   - Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?\n' +
                'Bisa ketik Complete 1, Complete 2, Complete 3, atau nomor 4.1, 4.2, 4.3 \u{1F642}',
            step: 'paket',
            chatState: {
                lastIntent: 'category_lookup',
                lastTierMentioned: 'Complete',
                lastOptions: [
                    { label: 'Complete 1', price: 'Rp6.500.000', packageId: 'complete_1' },
                    { label: 'Complete 2', price: 'Rp7.500.000', packageId: 'complete_2' },
                    { label: 'Complete 3', price: 'Rp8.500.000', packageId: 'complete_3' }
                ],
                lastQuestionType: 'choose_option',
                selectedPackage: null,
                currentCategory: 'complete'
            }
        };
    }

    return null;
}

/* ========================================
   CATEGORY QUERY HANDLER
   ======================================== */

function photoTierList(cat, label) {
    return 'Boleh kak \u{1F642} Untuk ' + label + ', pilihannya ini ya:\n' +
        '\n' +
        cat + '\n' +
        '   - Bronze: Rp1.500.000\n' +
        '   - Silver: Rp2.300.000\n' +
        '   - Gold: Rp5.000.000\n' +
        '\n' +
        'Mau lihat detail benefit yang mana dulu, kak?\n' +
        'Bisa ketik Bronze, Silver, atau Gold \u{1F642}';
}

function photoVideoTierList(cat, label) {
    return 'Boleh kak \u{1F642} Untuk ' + label + ', pilihannya ini ya:\n' +
        '\n' +
        cat + '\n' +
        '   - Bronze: Rp3.500.000\n' +
        '   - Silver: Rp4.000.000\n' +
        '   - Gold: Rp6.500.000\n' +
        '   - Platinum: Rp8.000.000\n' +
        '\n' +
        'Mau lihat detail benefit yang mana dulu, kak?\n' +
        'Bisa ketik Bronze, Silver, Gold, atau Platinum \u{1F642}';
}

function handleCategoryQuery(message) {
    var msg = message.toLowerCase().trim().replace(/\s+/g, ' ');

    if (/^semua pricelist$/i.test(msg) || /^pricelist$/i.test(msg) || /^lihat pricelist$/i.test(msg) || /^daftar harga$/i.test(msg)) {
        return {
            reply: 'Boleh kak \u{1F642} Ini pilihan paket Alima Photo secara ringkas:\n' +
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
                'Mau lihat detail benefit yang mana dulu, kak? \u{1F642}\n' +
                'Ketik nomor kategori atau nama tier-nya ya.',
            step: 'paket',
            chatState: {
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
            }
        };
    }

    if (/^(paket )?foto saja$/i.test(msg) ||
        /^foto aja$/i.test(msg) ||
        /^(paket )?photo only$/i.test(msg) ||
        /^(paket )?fotografi$/i.test(msg) ||
        /^(paket )?photography$/i.test(msg)) {
        return {
            reply: photoTierList('1. Photography Wedding Packages', 'paket foto saja'),
            step: 'paket',
            chatState: {
                lastIntent: 'category_lookup',
                lastTierMentioned: null,
                lastOptions: [],
                lastQuestionType: null,
                selectedPackage: null,
                currentCategory: 'photo'
            }
        };
    }

    if (/^(paket )?foto[ ]?[+&]?[ ]?video$/i.test(msg) ||
        /^(paket )?foto (dan|&) video$/i.test(msg) ||
        /^(paket )?photo video$/i.test(msg) ||
        /^(paket )?photography videography$/i.test(msg) ||
        /^(paket )?photo (and|&) video$/i.test(msg)) {
        return {
            reply: photoVideoTierList('2. Photography and Videography Wedding Packages', 'paket foto + video'),
            step: 'paket',
            chatState: {
                lastIntent: 'category_lookup',
                lastTierMentioned: null,
                lastOptions: [],
                lastQuestionType: null,
                selectedPackage: null,
                currentCategory: 'photo_video'
            }
        };
    }

    return null;
}

/* ========================================
   NUMERIC CATEGORY SELECTION HANDLER
   ======================================== */

function getCategoryTierList(categoryId, label) {
    if (categoryId === 'photo') {
        return {
            reply: 'Boleh kak \u{1F642} Untuk ' + label + ', pilihannya ini ya:\n' +
                '\n' +
                '1. Photography Wedding Packages\n' +
                '   - Bronze: Rp1.500.000\n' +
                '   - Silver: Rp2.300.000\n' +
                '   - Gold: Rp5.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, atau Gold \u{1F642}',
            chatState: {
                lastIntent: 'category_detail',
                lastTierMentioned: null,
                lastQuestionType: 'choose_tier',
                lastOptions: [
                    { label: 'Bronze', price: 'Rp1.500.000', packageId: 'photo_bronze' },
                    { label: 'Silver', price: 'Rp2.300.000', packageId: 'photo_silver' },
                    { label: 'Gold', price: 'Rp5.000.000', packageId: 'photo_gold' }
                ],
                selectedPackage: null,
                currentCategory: 'photo'
            }
        };
    }
    if (categoryId === 'photo_video') {
        return {
            reply: 'Boleh kak \u{1F642} Untuk ' + label + ', pilihannya ini ya:\n' +
                '\n' +
                '2. Photography and Videography Wedding Packages\n' +
                '   - Bronze: Rp3.500.000\n' +
                '   - Silver: Rp4.000.000\n' +
                '   - Gold: Rp6.500.000\n' +
                '   - Platinum: Rp8.000.000\n' +
                '\n' +
                'Mau lihat detail benefit yang mana dulu, kak?\n' +
                'Bisa ketik Bronze, Silver, Gold, atau Platinum \u{1F642}',
            chatState: {
                lastIntent: 'category_detail',
                lastTierMentioned: null,
                lastQuestionType: 'choose_tier',
                lastOptions: [
                    { label: 'Bronze', price: 'Rp3.500.000', packageId: 'photo_video_bronze' },
                    { label: 'Silver', price: 'Rp4.000.000', packageId: 'photo_video_silver' },
                    { label: 'Gold', price: 'Rp6.500.000', packageId: 'photo_video_gold' },
                    { label: 'Platinum', price: 'Rp8.000.000', packageId: 'photo_video_platinum' }
                ],
                selectedPackage: null,
                currentCategory: 'photo_video'
            }
        };
    }
    if (categoryId === 'bahagia') {
        return {
            reply: 'Boleh kak \u{1F642} Untuk ' + label + ':\n' +
                '\n' +
                '3. Bahagia Package\n' +
                '   - Bahagia: Rp3.000.000\n' +
                '\n' +
                'Mau saya jelaskan layanan dan benefitnya, kak? \u{1F642}',
            chatState: {
                lastIntent: 'category_detail',
                lastTierMentioned: 'Bahagia',
                lastQuestionType: 'choose_tier',
                lastOptions: [{ label: 'Bahagia', price: 'Rp3.000.000', packageId: 'bahagia' }],
                selectedPackage: null,
                currentCategory: 'bahagia'
            }
        };
    }
    if (categoryId === 'complete') {
        return {
            reply: 'Boleh kak \u{1F642} Untuk paket Complete, ada 3 pilihan:\n' +
                '\n' +
                '4. Complete Photography and Videography Wedding-Prewedding\n' +
                '   - Complete 1: Rp6.500.000\n' +
                '   - Complete 2: Rp7.500.000\n' +
                '   - Complete 3: Rp8.500.000\n' +
                '\n' +
                'Mau lihat detail Complete yang mana dulu, kak?\n' +
                'Bisa ketik Complete 1, Complete 2, Complete 3, atau nomor 4.1, 4.2, 4.3 \u{1F642}',
            chatState: {
                lastIntent: 'category_detail',
                lastTierMentioned: 'Complete',
                lastQuestionType: 'choose_tier',
                lastOptions: [
                    { label: 'Complete 1', price: 'Rp6.500.000', packageId: 'complete_1' },
                    { label: 'Complete 2', price: 'Rp7.500.000', packageId: 'complete_2' },
                    { label: 'Complete 3', price: 'Rp8.500.000', packageId: 'complete_3' }
                ],
                selectedPackage: null,
                currentCategory: 'complete'
            }
        };
    }
    return null;
}

function handleNumericCategorySelect(message, prevState) {
    if (!prevState || !prevState.lastOptions || prevState.lastOptions.length === 0) return null;

    var msg = message.toLowerCase().trim().replace(/\s+/g, ' ');
    var selectedNum = null;

    var wordNumbers = { pertama: '1', kedua: '2', ketiga: '3', keempat: '4' };
    for (var word in wordNumbers) {
        if (msg.indexOf(word) !== -1) {
            selectedNum = wordNumbers[word];
            break;
        }
    }

    if (!selectedNum) {
        if (/^\d+$/.test(msg)) {
            selectedNum = msg;
        } else {
            var m = msg.match(/(?:nomor|no|yang|pilih|pilihan)?\s*(\d+)/i);
            if (m) selectedNum = m[1];
        }
    }

    if (!selectedNum) return null;

    var idx = parseInt(selectedNum, 10) - 1;
    if (idx < 0 || idx >= prevState.lastOptions.length) return null;

    var selected = prevState.lastOptions[idx];

    if (prevState.lastQuestionType === 'choose_category') {
        var tierList = getCategoryTierList(selected.categoryId, selected.label);
        if (!tierList) return null;
        return {
            reply: tierList.reply,
            step: 'paket',
            chatState: tierList.chatState
        };
    }

    if (prevState.lastQuestionType === 'choose_option' || prevState.lastQuestionType === 'choose_tier') {
        var pkgId = selected.packageId;
        if (!pkgId) pkgId = selected.categoryId + '_' + selected.tier;
        var pkg = PACKAGES[pkgId];
        if (!pkg) return null;
        var benefitReply = formatPackageBenefit(pkg);
        return {
            reply: 'Siap kak \u{1F642} Ini detail ' + pkg.tier + '.\n\n' + benefitReply + '\n\nAda paket lain yang mau dicek juga, kak? \u{1F642}',
            step: 'benefit',
            chatState: {
                lastIntent: 'package_detail',
                lastTierMentioned: pkg.tier,
                lastOptions: [],
                lastQuestionType: null,
                selectedPackage: pkgId,
                currentCategory: prevState.currentCategory
            }
        };
    }

    return null;
}

/* ========================================
   SCOPED TIER SELECTION HANDLER
   ======================================== */

function handleScopedTierSelection(message, prevState) {
    if (!prevState || !prevState.currentCategory) return null;

    var msg = message.toLowerCase().trim();
    var tier = findTierInMessage(message);
    if (!tier) return null;

    var catPrefix = prevState.currentCategory + '_';
    var pkgId = null;

    if (prevState.currentCategory === 'photo_video' && tier === 'platinum') {
        pkgId = 'photo_video_platinum';
    } else if (prevState.currentCategory === 'complete') {
        if (tier === 'complete 1') pkgId = 'complete_1';
        else if (tier === 'complete 2') pkgId = 'complete_2';
        else if (tier === 'complete 3') pkgId = 'complete_3';
        else if (tier === 'complete') pkgId = null;
    } else if (prevState.currentCategory === 'bahagia') {
        pkgId = 'bahagia';
    } else {
        pkgId = catPrefix + tier;
    }

    if (pkgId && PACKAGES[pkgId]) {
        if (PACKAGES[pkgId].id.indexOf(catPrefix) !== 0 && prevState.currentCategory !== 'complete' && prevState.currentCategory !== 'bahagia') {
            return null;
        }
        var pkg = PACKAGES[pkgId];
        var benefitReply = formatPackageBenefit(pkg);
        return {
            reply: 'Siap kak \u{1F642} Ini detail ' + pkg.tier + ' dari ' + pkg.category + '.\n\n' + benefitReply + '\n\nAda paket lain yang mau dicek juga, kak? \u{1F642}',
            step: 'benefit',
            chatState: {
                lastIntent: 'package_detail',
                lastTierMentioned: pkg.tier,
                lastOptions: [],
                lastQuestionType: null,
                selectedPackage: pkgId,
                currentCategory: prevState.currentCategory
            }
        };
    }

    return null;
}

/* ========================================
   SYSTEM PROMPT
   ======================================== */

function buildSystemPrompt() {
    return 'Kamu adalah Min Limpo, asisten informasi Alima Photo.\n' +
        '\n' +
        'Tugas kamu adalah membantu calon klien memahami pricelist, paket wedding, benefit paket, cara booking, DP, pelunasan, waktu pengerjaan, lokasi studio, dan jam kerja.\n' +
        '\n' +
        '=== GAYA BAHASA ===\n' +
        '- Ramah, humble, tidak kaku.\n' +
        '- Seperti Min Limpo yang membantu calon klien.\n' +
        '- SELALU menyebut diri sebagai "Min Limpo" lengkap, JANGAN PERNAH menyingkat menjadi "Min" saja.\n' +
        '- Gunakan sapaan "kak" secara natural.\n' +
        '- Gunakan emoji HANYA \u{1F642} dan \u{1F64F} jika perlu, seperlunya saja.\n' +
        '- JANGAN gunakan emoji lain.\n' +
        '\n' +
        '=== FORMAT PAKET ===\n' +
        'Gunakan format KATEGORI pakai nomor (1., 2., 3., 4.), TIER pakai bullet (-):\n' +
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
        '=== ATURAN PENTING ===\n' +
        '1. Saat user minta "semua pricelist", tampilkan HANYA kategori + tier + harga. JANGAN tampilkan benefit.\n' +
        '2. Setelah daftar pricelist, WAJIB tanya: "Mau lihat detail benefit yang mana dulu, kak?"\n' +
        '3. Benefit HANYA ditampilkan setelah user memilih paket spesifik.\n' +
        '4. Jika user menyebut tier (Bronze, Silver, Gold, Platinum, Complete, Bahagia):\n' +
        '   - Jika tier ada di beberapa kategori \u2192 tampilkan opsi, tanya pilih yang mana.\n' +
        '   - Jika tier hanya ada di 1 kategori \u2192 langsung tampilkan benefit.\n' +
        '5. Jika user memilih nomor opsi (1, 2) dari pilihan sebelumnya, GUNAKAN konteks itu.\n' +
        '   JANGAN ulangi daftar paket. Langsung tampilkan benefit opsi yang dipilih.\n' +
        '6. JANGAN mengulang daftar paket jika user sedang memilih dari opsi sebelumnya.\n' +
        '7. JANGAN gunakan markdown (**bold**, _italic_, dll). Gunakan teks polos.\n' +
        '8. JANGAN menjawab di luar konteks Alima Photo.\n' +
        '9. JANGAN mengarang harga, diskon, atau promo.\n' +
        '10. JANGAN mengklaim tanggal tersedia.\n' +
        '\n' +
        '=== KONTEKS ===\n' +
        'Jika pesan user diawali "[KONTEKS TAMBAHAN UNTUK AI:]", ikuti instruksi di dalamnya.\n' +
        'Ini adalah petunjuk dari sistem untuk membantumu memahami maksud user.\n' +
        '\n' +
        '=== GEAR ===\n' +
        'JANGAN PERNAH menjelaskan daftar gear (kamera, lensa, lighting, drone, audio, stabilizer).\n' +
        'Jika user bertanya tentang gear, jawab:\n' +
        '"Untuk detail gear yang digunakan tim Alima Photo, boleh langsung chat Min Limpo via WhatsApp ya kak \u{1F64F}\n' +
        'Nomor WhatsApp: 0852 3232 1080"\n' +
        '\n' +
        '=== WAKTU PENGERJAAN ===\n' +
        'Jika user tanya estimasi pengerjaan, jawab:\n' +
        '"Untuk semua paket, estimasi pengerjaan maksimal 1 bulan setelah acara atau setelah pelunasan ya kak \u{1F64F}\n' +
        'Proses editing dan printing mengikuti status pelunasan. Jadi setelah acara selesai dan pembayaran beres, tim bisa lanjut proses finalisasi file dan cetak."\n' +
        '\n' +
        '=== BOOKING & PAYMENT ===\n' +
        '- Booked minimal 1 bulan sebelum hari H.\n' +
        '- Service time 8 jam. Lebih 8 jam +Rp100.000/jam.\n' +
        '- DP minimal Rp300.000.\n' +
        '- Pembatalan sepihak = DP hangus.\n' +
        '- Lebih dari 10 km dari office = charge transport Rp100.000.\n' +
        '- Pelunasan maksimal 5-10 hari setelah pemotretan.\n' +
        '- Editing dan printing menunggu pelunasan.\n' +
        '- H-7 pihak Alima Photo akan konfirmasi waktu akad dan kebutuhan.\n' +
        '- Pengerjaan maksimal 1 bulan setelah acara atau pelunasan.\n' +
        '- Transfer ke rekening atas nama Renggi Andika Putra.\n' +
        '- SeaBank: 9014 4503 3316.\n' +
        '- Selain nomor rekening tersebut bukan rekening vendor Alima Photo.\n' +
        '- WhatsApp: 0852 3232 1080.\n' +
        '- Instagram: @alimaphoto.\n' +
        '\n' +
        '=== LOKASI STUDIO ===\n' +
        'Alamat: Jl. Gang Hiu No.10 LK. Teleng, Sidoharjo, Pacitan\n' +
        'Area layanan: Kab. Pacitan, Kab. Wonogiri, Kab. Trenggalek, Kab. Ponorogo\n' +
        '\n' +
        '=== JAM KERJA ===\n' +
        'Hari kerja: Senin - Sabtu, Jam buka: 10.00 AM, Jam tutup: 09.00 PM\n' +
        'Hari libur: Minggu dan tanggal merah nasional\n' +
        '\n' +
        '=== KNOWLEDGE BASE LENGKAP ===\n' +
        '1. Photography Wedding Packages\n' +
        '   - Bronze: Rp1.500.000\n' +
        '     Benefit: Unlimited files, 1 Photographer, Akad-Upacara Adat/Resepsi, Cetak 4R 100 pcs, Album Magnetic, 12RS Photo Print with Frame, All Files Drive\n' +
        '   - Silver: Rp2.300.000\n' +
        '     Benefit: Unlimited files, 1 Photographer, Akad-Upacara Adat/Resepsi, Wedding Book Exclusive 20 Pages, 12RS Photo Print with Frame, All Files Drive\n' +
        '   - Gold: Rp5.000.000\n' +
        '     Benefit: Unlimited files, 2 Photographers, Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 40 Pages, 4R Photo Print 80 pcs, 12RS Photo Print with Frame, All Files Flashdisk\n' +
        '\n' +
        '2. Photography and Videography Wedding Packages\n' +
        '   - Bronze: Rp3.500.000\n' +
        '     Benefit: Unlimited files, Akad-Upacara Adat/Resepsi, 4R Photo Print, Album Magnetic, Copy All File & Editing, Teaser 1 Menit, Cinematic 3 Menit, All File Drive\n' +
        '   - Silver: Rp4.000.000\n' +
        '     Benefit: Unlimited files, Akad-Upacara Adat/Resepsi, Wedding Book Exclusive 20 Pages, Free Cetak 12RS With Frame, Copy All File & Editing, Teaser 1 Menit, Cinematic 3 Menit, All File Drive\n' +
        '   - Gold: Rp6.500.000\n' +
        '     Benefit: Unlimited files, Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 40 Pages, Album Magazine 20 Pages, 2 Photographers, 1 Videografer, Copy All File & Editing, Teaser 1 Menit, Cinematic 3-5 Menit, Flashdisk\n' +
        '   - Platinum: Rp8.000.000\n' +
        '     Benefit: Unlimited files, Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 30x30 40 Pages, Album Magazine 20 Pages, Album Storybook 20x15 40 Pages, 2 Photographers, 1 Videografer, Copy All File & Editing, Teaser 1 Menit, Cinematic 3-5 Menit, Flashdisk\n' +
        '\n' +
        '3. Bahagia Package\n' +
        '   - Bahagia: Rp3.000.000\n' +
        '     Benefit: Unlimited files, Akad-Upacara Adat/Resepsi, Cetak 4R 100 pcs, Album Magnetic, Copy All File & Editing, Teaser 1 Menit, All File Drive\n' +
        '\n' +
        '4. Complete Photography and Videography Wedding-Prewedding\n' +
        '   - Complete 1: Rp6.500.000\n' +
        '     Prewedding: Free Prewedding MUA, Edit 20 Files, Print 1 File 16RS With Frame, Indoor\n' +
        '     Wedding: Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 40 Pages, Album Magazine 20 Pages, Copy All File & Editing, Teaser 1 Menit, Cinematic 3-5 Menit, Flashdisk\n' +
        '   - Complete 2: Rp7.500.000\n' +
        '     Prewedding: Free Prewedding MUA + 1 Dress, Edit 20 Files, Print 2 File 16RS With Frame, 2 Concept Outdoor-Indoor\n' +
        '     Wedding: Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 40 Pages, Album Magazine 20 Pages, Copy All File & Editing, Teaser 1 Menit, Cinematic 3-5 Menit, Flashdisk\n' +
        '   - Complete 3: Rp8.500.000\n' +
        '     Prewedding: Free Prewedding MUA + 1 Dress, Edit 20 Files, Print 2 File 16RS With Frame, Teaser 1 Menit, 2 Concept Outdoor-Indoor\n' +
        '     Wedding: Akad-Upacara Adat/Resepsi, Album Storybook Exclusive 30x30 40 Pages, Album Magazine 20 Pages, Album Storybook 20x15 40 Pages, Copy All File & Editing, Teaser 1 Menit, Cinematic 3-5 Menit, Flashdisk';
}

/* ========================================
   RESPONSE STATE BUILDER
   ======================================== */

function buildResponseChatState(message, pkgContext, prevState, reply) {
    var newState = {
        lastIntent: prevState.lastIntent || 'unknown',
        lastTierMentioned: prevState.lastTierMentioned || null,
        lastOptions: [],
        lastQuestionType: null,
        selectedPackage: null,
        currentCategory: prevState.currentCategory || pkgContext.categoryFilter || null
    };

    var msg = message.toLowerCase();

    var isPricelist = /(semua|lihat|daftar|all).*(pricelist|harga|paket)/i.test(msg) || msg === 'semua pricelist';
    if (isPricelist) {
        newState.lastIntent = 'all_pricelist';
        newState.lastTierMentioned = null;
        newState.lastOptions = [
            { number: '1', categoryId: 'photo', label: 'Photography Wedding Packages' },
            { number: '2', categoryId: 'photo_video', label: 'Photography and Videography Wedding Packages' },
            { number: '3', categoryId: 'bahagia', label: 'Bahagia Package' },
            { number: '4', categoryId: 'complete', label: 'Complete Photography and Videography Wedding-Prewedding' }
        ];
        newState.lastQuestionType = 'choose_category';
        newState.currentCategory = null;
        return newState;
    }

    var tier = findTierInMessage(message);
    if (tier) {
        var tierMatches = matchByTier(tier);
        if (tierMatches.length === 0) {
            tierMatches = matchTierPartial(tier);
        }
        newState.lastIntent = 'tier_lookup';
        newState.lastTierMentioned = tier;
        if (tierMatches.length > 1) {
            newState.lastOptions = tierMatches.map(function (p) {
                return { label: p.category + ' - ' + p.tier, price: p.price, packageId: p.id };
            });
            newState.lastQuestionType = 'choose_option';
        } else if (tierMatches.length === 1) {
            newState.selectedPackage = tierMatches[0].id;
            newState.lastIntent = 'package_detail';
        }
        return newState;
    }

    if (/^\d+$/.test(message) && prevState.lastOptions && prevState.lastOptions.length > 1) {
        newState.lastIntent = 'option_selected';
        newState.lastTierMentioned = prevState.lastTierMentioned;
        newState.lastOptions = [];
        var idx = parseInt(message, 10) - 1;
        if (idx >= 0 && idx < prevState.lastOptions.length) {
            newState.selectedPackage = prevState.lastOptions[idx].packageId;
        }
        return newState;
    }

    if (/^\d+\.\d+$/.test(message.replace(/,/g, '.'))) {
        var numMatches = matchBySubNum(message);
        if (numMatches.length > 0) {
            newState.lastIntent = 'package_detail';
            newState.lastTierMentioned = numMatches[0].tier;
            newState.selectedPackage = numMatches[0].id;
        }
        return newState;
    }

    if (/gear|kamera|lensa|lighting|drone|audio|alat|equipment|sony|canon|fuji|mic|stabilizer/i.test(msg)) {
        newState.lastIntent = 'gear_question';
        return newState;
    }

    if (/pengerjaan|berapa lama|kapan.*(jadi|selesai)|editing.*lama|hasil.*jadi|album.*lama|file.*jadi|proses.*foto/i.test(msg)) {
        newState.lastIntent = 'waktu_pengerjaan';
        return newState;
    }

    return newState;
}

function detectStep(reply) {
    var hasBulletBenefits = /^- .+/m.test(reply);
    var hasNumberedPackages = /\d+\.\d+\./m.test(reply) || /\d+\.\s+\w/.test(reply);
    var hasLanjutPrompt = /mau.*lihat|pilih|nomor/i.test(reply);
    var hasBenefitLabel = /Layanan\s*&?\s*[Bb]enefit/i.test(reply);

    if (hasNumberedPackages && !hasBulletBenefits && hasLanjutPrompt) {
        return 'paket';
    }
    if (hasBulletBenefits || hasBenefitLabel) {
        return 'benefit';
    }
    return 'info';
}

/* ========================================
   DEEPSEEK API CALL
   ======================================== */

async function callDeepSeek(userMessage, systemPrompt, env) {
    var model = env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
    var baseUrl = env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

    var deepseekRes = await fetch(baseUrl + '/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + env.DEEPSEEK_API_KEY
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.3,
            max_tokens: 1200
        })
    });

    if (!deepseekRes.ok) {
        throw new Error('DeepSeek API error');
    }

    var data = await deepseekRes.json();
    var reply = (data.choices && data.choices[0] && data.choices[0].message)
        ? data.choices[0].message.content
        : 'Maaf, terjadi kendala saat memproses pertanyaan Anda.';

    return reply;
}

/* ========================================
   RATE LIMITER
   ======================================== */

var rateLimitMap = new Map();
var RATE_LIMIT_WINDOW_MS = 60000;
var RATE_LIMIT_MAX_REQUESTS = 20;

function isRateLimited(ip) {
    var now = Date.now();
    var entry = rateLimitMap.get(ip);

    if (!entry || (now - entry.windowStart) > RATE_LIMIT_WINDOW_MS) {
        entry = { windowStart: now, count: 0 };
        rateLimitMap.set(ip, entry);
    }

    entry.count++;

    if (Math.random() < 0.05) {
        var cutoff = now - RATE_LIMIT_WINDOW_MS * 2;
        var keys = Array.from(rateLimitMap.keys());
        for (var i = 0; i < keys.length; i++) {
            if (rateLimitMap.get(keys[i]).windowStart < cutoff) {
                rateLimitMap.delete(keys[i]);
            }
        }
    }

    return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

/* ========================================
   CORS HEADERS
   ======================================== */

var ALLOWED_ORIGINS = [
    'https://alima.adhiwibowo.space',
    'https://adhiwibowo.space',
    'https://bwmatx.github.io',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:8787',
    'http://localhost:8787'
];

function getCorsHeaders(origin) {
    var allowedOrigin = '';
    if (origin) {
        for (var i = 0; i < ALLOWED_ORIGINS.length; i++) {
            if (ALLOWED_ORIGINS[i] === origin) {
                allowedOrigin = origin;
                break;
            }
        }
    }
    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };
}

/* ========================================
   MAIN WORKER HANDLER
   ======================================== */

export default {
    async fetch(request, env, ctx) {
        var url = new URL(request.url);
        var origin = request.headers.get('Origin');
        var corsHeaders = getCorsHeaders(origin);

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        if (url.pathname !== '/chat') {
            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404,
                headers: corsHeaders
            });
        }

        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: corsHeaders
            });
        }

        var contentType = request.headers.get('Content-Type') || '';
        if (contentType.indexOf('application/json') === -1) {
            return new Response(JSON.stringify({ error: 'Invalid content type' }), {
                status: 415,
                headers: corsHeaders
            });
        }

        var contentLength = parseInt(request.headers.get('Content-Length') || '0', 10);
        if (contentLength > 102400) {
            return new Response(JSON.stringify({ error: 'Request too large' }), {
                status: 413,
                headers: corsHeaders
            });
        }

        var ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        if (isRateLimited(ip)) {
            return new Response(JSON.stringify({ error: 'Too many requests' }), {
                status: 429,
                headers: corsHeaders
            });
        }

        var body;
        try {
            body = await request.json();
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
                status: 400,
                headers: corsHeaders
            });
        }

        var message = body.message;
        if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
            var lastUserMsg = body.messages.filter(function (m) { return m.role === 'user'; }).pop();
            if (lastUserMsg) {
                message = lastUserMsg.content;
            }
        }

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return new Response(JSON.stringify({ error: 'Invalid request' }), {
                status: 400,
                headers: corsHeaders
            });
        }

        if (message.length > 500) {
            return new Response(JSON.stringify({ error: 'Invalid request' }), {
                status: 400,
                headers: corsHeaders
            });
        }

        var chatState = body.chatState || {};

        try {
            var normalizedMsg = normalizeInput(message);

            try {
                var completeResult = handleCompleteQuery(normalizedMsg, chatState);
                if (completeResult) {
                    return new Response(JSON.stringify({
                        reply: completeResult.reply,
                        step: completeResult.step,
                        chatState: completeResult.chatState
                    }), { status: 200, headers: corsHeaders });
                }

                var categoryResult = handleCategoryQuery(normalizedMsg);
                if (categoryResult) {
                    return new Response(JSON.stringify({
                        reply: categoryResult.reply,
                        step: categoryResult.step,
                        chatState: categoryResult.chatState
                    }), { status: 200, headers: corsHeaders });
                }

                var numericResult = handleNumericCategorySelect(normalizedMsg, chatState);
                if (numericResult) {
                    return new Response(JSON.stringify({
                        reply: numericResult.reply,
                        step: numericResult.step,
                        chatState: numericResult.chatState
                    }), { status: 200, headers: corsHeaders });
                }

                var scopedTierResult = handleScopedTierSelection(normalizedMsg, chatState);
                if (scopedTierResult) {
                    return new Response(JSON.stringify({
                        reply: scopedTierResult.reply,
                        step: scopedTierResult.step,
                        chatState: scopedTierResult.chatState
                    }), { status: 200, headers: corsHeaders });
                }
            } catch (handlerErr) {
                return new Response(JSON.stringify({
                    reply: 'Maaf kak, data paket Complete sedang belum bisa ditampilkan dari sistem. Boleh coba ketik Complete 1, Complete 2, atau Complete 3 ya \u{1F64F}',
                    step: 'info',
                    chatState: {}
                }), { status: 200, headers: corsHeaders });
            }

            var pkgContext = buildPackageContextForAI(normalizedMsg, chatState);
            var userMessage = normalizedMsg;
            if (pkgContext.extraContext) {
                userMessage = '[KONTEKS TAMBAHAN UNTUK AI:]\n' + pkgContext.extraContext + '\n[JAWAB PERTANYAAN BERIKUT DENGAN MEMPERHATIKAN KONTEKS DI ATAS:]\n' + normalizedMsg;
            }

            var systemPrompt = buildSystemPrompt();
            var reply = await callDeepSeek(userMessage, systemPrompt, env);

            var newChatState = buildResponseChatState(normalizedMsg, pkgContext, chatState, reply);

            return new Response(JSON.stringify({
                reply: reply,
                step: detectStep(reply),
                chatState: newChatState
            }), { status: 200, headers: corsHeaders });

        } catch (err) {
            return new Response(JSON.stringify({
                error: 'AI service temporarily unavailable'
            }), { status: 500, headers: corsHeaders });
        }
    }
};
