/**
 * upload.js — File handling, progress bar, inline notification
 */

import { formatFileSize } from './helpers.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

let isUploading = false;
let uploadProgress = 0;

export function getIsUploading() {
    return isUploading;
}

export function getUploadProgress() {
    return uploadProgress;
}

export function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
        showUploadError('Type file tidak didukung. Hanya JPG, PNG, atau PDF.');
        event.target.value = '';
        return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
        showUploadError('File terlalu besar. Maksimal 5 MB.');
        event.target.value = '';
        return;
    }

    // Show file preview
    const previewContainer = document.getElementById('filePreviewContainer');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');

    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    previewContainer.classList.add('show');

    // Hide any previous notification
    hideUploadNotification();
}

export function removeFile() {
    const fileInput = document.getElementById('buktiTransfer');
    const previewContainer = document.getElementById('filePreviewContainer');

    fileInput.value = '';
    previewContainer.classList.remove('show');
    fileInput.classList.remove('field-incomplete');

    hideUploadNotification();
    hideUploadProgress();
}

export function showUploadProgress() {
    isUploading = true;
    uploadProgress = 0;

    const container = document.getElementById('uploadProgressContainer');
    const fill = document.getElementById('uploadProgressFill');

    container.style.display = 'block';
    fill.style.width = '0%';

    // Animate progress
    let progress = 0;
    const interval = setInterval(function () {
        progress += Math.random() * 15;
        if (progress >= 90) {
            progress = 90;
            clearInterval(interval);
        }
        uploadProgress = progress;
        fill.style.width = progress + '%';
    }, 200);

    // Store interval for cleanup
    container.dataset.interval = interval;
}

export function completeUploadProgress() {
    const container = document.getElementById('uploadProgressContainer');
    const fill = document.getElementById('uploadProgressFill');

    if (container.dataset.interval) {
        clearInterval(parseInt(container.dataset.interval));
    }

    fill.style.width = '100%';
    uploadProgress = 100;

    setTimeout(function () {
        hideUploadProgress();
        isUploading = false;
    }, 500);
}

export function hideUploadProgress() {
    const container = document.getElementById('uploadProgressContainer');
    const fill = document.getElementById('uploadProgressFill');

    if (container.dataset.interval) {
        clearInterval(parseInt(container.dataset.interval));
    }

    container.style.display = 'none';
    fill.style.width = '0%';
    isUploading = false;
    uploadProgress = 0;
}

export function showUploadSuccess(message) {
    const notif = document.getElementById('uploadNotification');
    notif.className = 'upload-notification success';
    notif.innerHTML = '<span class="notif-icon">&#10003;</span> ' + message;
    notif.style.display = 'flex';
}

export function showUploadError(message) {
    const notif = document.getElementById('uploadNotification');
    notif.className = 'upload-notification error';
    notif.innerHTML = '<span class="notif-icon">&#9888;</span> ' + message;
    notif.style.display = 'flex';
}

export function hideUploadNotification() {
    const notif = document.getElementById('uploadNotification');
    notif.style.display = 'none';
    notif.innerHTML = '';
}
