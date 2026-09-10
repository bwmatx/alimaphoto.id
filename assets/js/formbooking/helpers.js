/**
 * helpers.js — Utility functions
 */

export function selectRadio(radioId) {
    const radio = document.getElementById(radioId);
    if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
    }
}

export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function copyRekening() {
    const rekeningNumber = document.getElementById('rekeningNumber').textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(rekeningNumber)
            .then(function () {
                import('./modal.js').then(m => {
                    m.showModal(
                        'success',
                        'Berhasil!',
                        'Nomor Rekening berhasil dicopy',
                        [{ text: 'OK', class: 'modal-btn-primary', onclick: function () { m.hideModal(); } }]
                    );
                });
            })
            .catch(function () {
                fallbackCopyToClipboard(rekeningNumber);
            });
    } else {
        fallbackCopyToClipboard(rekeningNumber);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    try {
        document.execCommand('copy');
        import('./modal.js').then(m => {
            m.showModal(
                'success',
                'Berhasil!',
                'Nomor rekening berhasil dicopy: ' + text,
                [{ text: 'OK', class: 'modal-btn-primary', onclick: function () { m.hideModal(); } }]
            );
        });
    } catch (err) {
        import('./modal.js').then(m => {
            m.showModal(
                'warning',
                'Gagal Copy',
                'Silakan copy manual: ' + text,
                [{ text: 'OK', class: 'modal-btn-primary', onclick: function () { m.hideModal(); } }]
            );
        });
    }

    document.body.removeChild(textarea);
}
