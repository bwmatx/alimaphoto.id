/**
 * datepicker.js — 3 Dropdown Date Picker (Zero Dependencies)
 */

const BULAN_INDONESIA = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

let selectedTanggal = null;
let selectedBulan = null;
let selectedTahun = null;

export function initDatepicker() {
    const datePickerInput = document.getElementById('datePickerFlatpickr');
    const confirmBtn = document.getElementById('fpConfirm');
    const cancelBtn = document.getElementById('fpCancel');
    const fpBulan = document.getElementById('fpBulan');
    const fpTahun = document.getElementById('fpTahun');
    const fpTanggal = document.getElementById('fpTanggal');

    if (datePickerInput) {
        datePickerInput.addEventListener('click', openDatePickerModal);
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmDateSelection);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeDatePickerModal);
    }

    if (fpBulan) {
        fpBulan.addEventListener('change', onBulanTahunChange);
    }

    if (fpTahun) {
        fpTahun.addEventListener('change', onBulanTahunChange);
    }

    if (fpTanggal) {
        fpTanggal.addEventListener('change', updatePreview);
    }
}

function openDatePickerModal() {
    populateTahun();
    populateBulan();

    const fpTahun = document.getElementById('fpTahun');
    const fpBulan = document.getElementById('fpBulan');

    if (selectedTahun) {
        fpTahun.value = selectedTahun;
    } else {
        fpTahun.value = new Date().getFullYear();
    }

    if (selectedBulan !== null) {
        fpBulan.value = selectedBulan;
    }

    onBulanTahunChange();

    if (selectedTanggal) {
        document.getElementById('fpTanggal').value = selectedTanggal;
    }

    updatePreview();

    document.getElementById('datePickerModal').style.display = 'flex';
}

export function closeDatePickerModal() {
    document.getElementById('datePickerModal').style.display = 'none';
}

function populateTanggal(maxDay) {
    const fpTanggal = document.getElementById('fpTanggal');
    const currentValue = fpTanggal.value;
    fpTanggal.innerHTML = '';

    for (let i = 1; i <= maxDay; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        fpTanggal.appendChild(option);
    }

    if (currentValue && currentValue <= maxDay) {
        fpTanggal.value = currentValue;
    } else if (selectedTanggal && selectedTanggal <= maxDay) {
        fpTanggal.value = selectedTanggal;
    }
}

function populateBulan() {
    const fpBulan = document.getElementById('fpBulan');
    if (fpBulan.options.length > 0) return;

    BULAN_INDONESIA.forEach(function(bulan, index) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = bulan;
        fpBulan.appendChild(option);
    });
}

function populateTahun() {
    const fpTahun = document.getElementById('fpTahun');
    if (fpTahun.options.length > 0) return;

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= 2045; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        fpTahun.appendChild(option);
    }
}

function onBulanTahunChange() {
    const fpBulan = document.getElementById('fpBulan');
    const fpTahun = document.getElementById('fpTahun');
    const bulanIndex = parseInt(fpBulan.value);
    const tahun = parseInt(fpTahun.value);

    const maxDay = getMaxDays(bulanIndex, tahun);
    populateTanggal(maxDay);
    updatePreview();
}

function getMaxDays(bulanIndex, tahun) {
    return new Date(tahun, bulanIndex + 1, 0).getDate();
}

function updatePreview() {
    const fpTanggal = document.getElementById('fpTanggal');
    const fpBulan = document.getElementById('fpBulan');
    const fpTahun = document.getElementById('fpTahun');
    const preview = document.getElementById('fpPreview');

    const tanggal = fpTanggal.value;
    const bulanIndex = parseInt(fpBulan.value);
    const tahun = fpTahun.value;

    if (tanggal && !isNaN(bulanIndex) && tahun) {
        preview.textContent = tanggal + ' ' + BULAN_INDONESIA[bulanIndex] + ' ' + tahun;
    } else {
        preview.textContent = '';
    }
}

function confirmDateSelection() {
    const fpTanggal = document.getElementById('fpTanggal');
    const fpBulan = document.getElementById('fpBulan');
    const fpTahun = document.getElementById('fpTahun');

    const tanggal = parseInt(fpTanggal.value);
    const bulanIndex = parseInt(fpBulan.value);
    const tahun = parseInt(fpTahun.value);

    if (isNaN(tanggal) || isNaN(bulanIndex) || isNaN(tahun)) {
        return;
    }

    selectedTanggal = tanggal;
    selectedBulan = bulanIndex;
    selectedTahun = tahun;

    const displayText = tanggal + ' ' + BULAN_INDONESIA[bulanIndex] + ' ' + tahun;
    document.getElementById('datePickerFlatpickr').value = displayText;

    document.getElementById('tanggal').value = tanggal;
    document.getElementById('bulan').value = BULAN_INDONESIA[bulanIndex];
    document.getElementById('tahun').value = tahun;

    closeDatePickerModal();
}

export function resetDatepicker() {
    selectedTanggal = null;
    selectedBulan = null;
    selectedTahun = null;

    document.getElementById('tanggal').value = '';
    document.getElementById('bulan').value = '';
    document.getElementById('tahun').value = '';
    document.getElementById('datePickerFlatpickr').value = '';

    const fpTanggal = document.getElementById('fpTanggal');
    const fpBulan = document.getElementById('fpBulan');
    const fpTahun = document.getElementById('fpTahun');
    const preview = document.getElementById('fpPreview');

    if (fpTanggal) fpTanggal.innerHTML = '';
    if (fpBulan) fpBulan.innerHTML = '';
    if (fpTahun) fpTahun.innerHTML = '';
    if (preview) preview.textContent = '';
}
