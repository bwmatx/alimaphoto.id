/**
 * Chat Fullscreen Toggle
 * Handles expand/collapse of chat container to fill browser viewport.
 * Non-invasive — does not touch chatbot logic or message flow.
 */
(function () {
    'use strict';

    var chatContainer = document.querySelector('.chat-container');
    var toggleBtn = document.getElementById('chatFullscreenBtn');
    var overlay = document.getElementById('chatFullscreenOverlay');

    if (!chatContainer || !toggleBtn) return;

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'chat-fullscreen-overlay';
        overlay.id = 'chatFullscreenOverlay';
        document.body.appendChild(overlay);
    }

    var isFullscreen = false;

    function enterFullscreen() {
        isFullscreen = true;
        chatContainer.classList.add('is-fullscreen');
        overlay.classList.add('is-visible');
        toggleBtn.setAttribute('aria-label', 'Tutup fullscreen chat');
        toggleBtn.setAttribute('title', 'Tutup fullscreen');
        document.body.style.overflow = 'hidden';
    }

    function exitFullscreen() {
        isFullscreen = false;
        chatContainer.classList.remove('is-fullscreen');
        overlay.classList.remove('is-visible');
        toggleBtn.setAttribute('aria-label', 'Buka fullscreen chat');
        toggleBtn.setAttribute('title', 'Fullscreen');
        document.body.style.overflow = '';
    }

    function toggleFullscreen() {
        if (isFullscreen) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }

    toggleBtn.addEventListener('click', toggleFullscreen);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            exitFullscreen();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isFullscreen) {
            exitFullscreen();
        }
    });
})();
