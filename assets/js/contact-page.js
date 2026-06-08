/**
 * Contact Page — WhatsApp Redirect Form
 * Handles GSAP animations, form validation, and WhatsApp URL generation.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero fade-up
        gsap.utils.toArray('.contact-hero .gsap-fade-up').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: 'power3.out'
            });
        });

        // Form card reveal
        gsap.utils.toArray('.contact-form-section .gsap-fade-up').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    // --- WhatsApp Configuration ---
    const WA_NUMBER = '6281234567890';

    // --- DOM References ---
    const btnKirim = document.getElementById('btnKirimPesan');
    const namaInput = document.getElementById('namaLengkap');
    const waInput = document.getElementById('nomorWhatsapp');
    const pesanInput = document.getElementById('pesan');
    const errorNama = document.getElementById('errorNama');
    const errorWa = document.getElementById('errorWhatsapp');
    const errorPesan = document.getElementById('errorPesan');

    // --- Validation ---
    function validateForm() {
        let isValid = true;

        // Reset errors
        [errorNama, errorWa, errorPesan].forEach(el => el.style.display = 'none');
        [namaInput, waInput, pesanInput].forEach(el => el.classList.remove('field-incomplete'));

        // Nama Lengkap
        if (!namaInput.value.trim()) {
            errorNama.style.display = 'block';
            namaInput.classList.add('field-incomplete');
            isValid = false;
        }

        // Nomor WhatsApp
        if (!waInput.value.trim()) {
            errorWa.style.display = 'block';
            waInput.classList.add('field-incomplete');
            isValid = false;
        }

        // Pesan
        if (!pesanInput.value.trim()) {
            errorPesan.style.display = 'block';
            pesanInput.classList.add('field-incomplete');
            isValid = false;
        }

        return isValid;
    }

    // --- WhatsApp Redirect ---
    function redirectToWhatsApp() {
        const nama = namaInput.value.trim();
        const pesan = pesanInput.value.trim();

        const message = `Halo Admin Alima Photo,

Nama: ${nama}

Pesan:
${pesan}

Terima kasih.`;

        const encoded = encodeURIComponent(message);
        const waURL = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
        window.open(waURL, '_blank');
    }

    // --- Button Handler ---
    if (btnKirim) {
        btnKirim.addEventListener('click', () => {
            if (validateForm()) {
                redirectToWhatsApp();
            }
        });
    }

    // --- Clear error on input ---
    [namaInput, waInput, pesanInput].forEach((input, idx) => {
        const errorEls = [errorNama, errorWa, errorPesan];
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('field-incomplete');
                if (errorEls[idx]) errorEls[idx].style.display = 'none';
            });
        }
    });
});
