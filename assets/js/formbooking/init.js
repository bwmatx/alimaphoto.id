/**
 * init.js — Entry point, DOMContentLoaded, event listeners
 */

import { selectRadio, copyRekening } from './helpers.js';
import { showModal, hideModal } from './modal.js';
import { validateDpTerbilang } from './validation.js';
import { handleFileSelect, removeFile } from './upload.js';
import { initDatepicker, closeDatePickerModal } from './datepicker.js';
import { showPackages } from './packages.js';
import { handleFormSubmit } from './submit.js';

// Expose functions to global scope for inline onclick handlers
window.selectRadio = selectRadio;
window.showPackages = showPackages;
window.copyRekening = copyRekening;
window.handleFileSelect = handleFileSelect;
window.removeFile = removeFile;
window.validateDpTerbilang = validateDpTerbilang;
window.showModal = showModal;
window.hideModal = hideModal;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize date picker
    initDatepicker();

    // Form submit handler
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    // Close date picker modal when clicking overlay
    const datePickerModal = document.getElementById('datePickerModal');
    if (datePickerModal) {
        datePickerModal.addEventListener('click', function (e) {
            if (e.target === datePickerModal) {
                closeDatePickerModal();
            }
        });
    }
});
