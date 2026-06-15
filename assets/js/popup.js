(function () {
  var overlay = document.getElementById('csPopupOverlay');
  var closeBtn = document.getElementById('csPopupClose');

  if (!overlay || !closeBtn) {
    return;
  }

  function closePopup() {
    overlay.style.display = 'none';
  }

  closeBtn.addEventListener('click', closePopup);
})();
