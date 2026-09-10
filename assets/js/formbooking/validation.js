/**
 * validation.js — Form validation
 */

export function validateForm() {
    const incompleteFields = [];

    const textInputs = ['namaCpp', 'namaTuanRumah', 'alamat', 'sosmed', 'dpTerbilang'];
    textInputs.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            incompleteFields.push({
                id: fieldId,
                label: field.previousElementSibling.textContent.replace(' *', '')
            });
            field.classList.add('field-incomplete');
        } else {
            field.classList.remove('field-incomplete');
        }
    });

    const selects = ['tanggal', 'bulan', 'tahun'];
    selects.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            const label = fieldId === 'tahun' ? 'Tahun Acara' : fieldId === 'bulan' ? 'Bulan Acara' : 'Tanggal Acara';
            incompleteFields.push({
                id: fieldId === 'tahun' ? 'datePickerFlatpickr' : fieldId,
                label: label
            });
        }
    });

    if (!document.querySelector('input[name="jenisAcara"]:checked')) {
        incompleteFields.push({
            id: 'wedding',
            label: 'Jenis Acara'
        });
    }

    const jenisAcara = document.querySelector('input[name="jenisAcara"]:checked');
    if (jenisAcara && jenisAcara.value !== 'other' && !document.querySelector('input[name="paket"]:checked')) {
        incompleteFields.push({
            id: 'paketWedding',
            label: 'Paket'
        });
    }

    const fileInput = document.getElementById('buktiTransfer');
    if (!fileInput.files.length) {
        incompleteFields.push({
            id: 'buktiTransfer',
            label: 'Bukti Transfer'
        });
        fileInput.classList.add('field-incomplete');
    } else {
        fileInput.classList.remove('field-incomplete');
    }

    if (jenisAcara && jenisAcara.value === 'other') {
        const otherText = document.getElementById('otherText');
        if (!otherText.value.trim()) {
            incompleteFields.push({
                id: 'otherText',
                label: 'Jenis Acara Lainnya'
            });
            otherText.classList.add('field-incomplete');
        } else {
            otherText.classList.remove('field-incomplete');
        }
    }

    return incompleteFields;
}

export function validateDpTerbilang(event) {
    const input = event.target;
    const value = input.value;
    const hasNumber = /[0-9]/.test(value);

    if (hasNumber) {
        input.value = value.replace(/[0-9]/g, '');

        import('./modal.js').then(m => {
            m.showModal(
                'warning',
                'Terjadi Kesalahan',
                'Kolom ini hanya boleh diisi dengan huruf.',
                [{
                    text: 'OK Min',
                    class: 'modal-btn-primary',
                    onclick: function () {
                        m.hideModal();
                        input.focus();
                    }
                }]
            );
        });
    }
}
