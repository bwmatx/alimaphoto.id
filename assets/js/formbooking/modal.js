/**
 * modal.js — Modal popup system (untuk "Sabar" warning & error lainnya)
 */

export function showModal(type, title, message, buttons) {
    const modal = document.getElementById('modalOverlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalButtons = document.getElementById('modalButtons');

    if (!modal) {
        alert(title + '\n\n' + message);
        return;
    }

    if (type === 'success') {
        modalIcon.className = 'modal-icon success';
        modalIcon.innerHTML = '&#10003;';
    } else if (type === 'warning') {
        modalIcon.className = 'modal-icon warning';
        modalIcon.innerHTML = '&#9888;';
    }

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modalButtons.innerHTML = '';
    buttons.forEach(function (btn) {
        const button = document.createElement('button');
        button.className = 'modal-btn ' + btn.class;
        button.textContent = btn.text;
        button.onclick = btn.onclick;
        modalButtons.appendChild(button);
    });

    modal.classList.add('show');
}

export function hideModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('show');
    }
}
