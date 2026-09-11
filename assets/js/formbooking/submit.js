/**
 * submit.js — Form submit handler
 */

import { validateForm } from './validation.js';
import { showModal, hideModal } from './modal.js';
import { getIsUploading, showUploadProgress, completeUploadProgress, showUploadError } from './upload.js';
import { resetDatepicker } from './datepicker.js';
import { removeFile } from './upload.js';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNLnaqg7E48Iw8MRU9AMhXN1FDa4fL3za9fCyjWbpT0gyfOSVcwvFWVVBYHE9xYbBU/exec';

export function handleFormSubmit(e) {
    e.preventDefault();

    // Jika upload masih jalan, tampilkan popup sabar
    if (getIsUploading()) {
        showModal(
            'warning',
            'Sabar...',
            'Bukti transfer sedang diupload. Mohon tunggu hingga selesai.',
            [{
                text: 'OK',
                class: 'modal-btn-primary',
                onclick: function () { hideModal(); }
            }]
        );
        return;
    }

    // Validate form
    const incompleteFields = validateForm();

    if (incompleteFields.length > 0) {
        const firstField = incompleteFields[0];
        showModal(
            'warning',
            'Data Belum Lengkap',
            'Mohon lengkapi data Anda. Ada ' + incompleteFields.length + ' kolom yang belum diisi.',
            [
                {
                    text: 'Lengkapi Data',
                    class: 'modal-btn-primary',
                    onclick: function () {
                        hideModal();
                        const element = document.getElementById(firstField.id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            setTimeout(function () { element.focus(); }, 500);
                        }
                    }
                },
                {
                    text: 'Tutup',
                    class: 'modal-btn-secondary',
                    onclick: function () { hideModal(); }
                }
            ]
        );
        return;
    }

    // Validate file size
    const fileInput = document.getElementById('buktiTransfer');
    const file = fileInput.files[0];

    if (file.size > 5 * 1024 * 1024) {
        showModal(
            'warning',
            'File Terlalu Besar',
            'Ukuran file maksimal 5 MB. Mohon pilih file yang lebih kecil.',
            [{
                text: 'OK',
                class: 'modal-btn-primary',
                onclick: function () { hideModal(); }
            }]
        );
        return;
    }

    // Show upload progress
    showUploadProgress();

    // Convert file to base64 and submit
    const reader = new FileReader();
    reader.onload = async function (e) {
        const base64Data = e.target.result.split(',')[1];

        let jenisAcara = document.querySelector('input[name="jenisAcara"]:checked')?.value;
        if (jenisAcara === 'other') {
            jenisAcara = document.getElementById('otherText').value || 'Other (tidak diisi)';
        }

        const formData = {
            namaCpp: document.getElementById('namaCpp').value,
            namaTuanRumah: document.getElementById('namaTuanRumah').value,
            alamat: document.getElementById('alamat').value,
            tanggal: document.getElementById('tanggal').value,
            bulan: document.getElementById('bulan').value,
            tahun: document.getElementById('tahun').value,
            jenisAcara: jenisAcara,
            paket: document.querySelector('input[name="paket"]:checked')?.value || '-',
            sosmed: document.getElementById('sosmed').value,
            dpTerbilang: document.getElementById('dpTerbilang').value,
            whatsapp: document.getElementById('whatsapp').value,
            fileName: file.name,
            fileData: base64Data,
            mimeType: file.type
        };

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                completeUploadProgress();
                document.getElementById('uploadNotification').style.display = 'none';

                showModal(
                    'success',
                    'Tanggal Terkunci!',
                    'Min Limpo akan segera menghubungi Anda :)',
                    [{
                        text: 'OK',
                        class: 'modal-btn-primary',
                        onclick: function () {
                            hideModal();
                            document.getElementById('bookingForm').reset();
                            document.getElementById('paketWedding').style.display = 'none';
                            document.getElementById('paketEngagement').style.display = 'none';
                            document.getElementById('paketPrewedding').style.display = 'none';
                            document.getElementById('otherInput').style.display = 'none';
                            resetDatepicker();
                            removeFile();
                        }
                    }]
                );
            } else {
                completeUploadProgress();
                showModal(
                    'warning',
                    'Upload Gagal',
                    'Maaf, terjadi kesalahan saat mengupload: ' + result.message,
                    [{
                        text: 'Coba Lagi',
                        class: 'modal-btn-primary',
                        onclick: function () { hideModal(); }
                    }]
                );
            }
        } catch (error) {
            completeUploadProgress();
            showModal(
                'warning',
                'Terjadi Kesalahan',
                'Maaf, terjadi kesalahan: ' + error.message + '. Silakan coba lagi.',
                [{
                    text: 'Coba Lagi',
                    class: 'modal-btn-primary',
                    onclick: function () { hideModal(); }
                }]
            );
        }
    };

    reader.readAsDataURL(file);
}
