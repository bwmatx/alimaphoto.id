/**
 * packages.js — Show/hide paket options berdasarkan jenis acara
 */

export function showPackages(type) {
    document.getElementById('paketWedding').style.display = 'none';
    document.getElementById('paketEngagement').style.display = 'none';
    document.getElementById('paketPrewedding').style.display = 'none';
    document.getElementById('otherInput').style.display = 'none';

    document.querySelectorAll('input[name="paket"]').forEach(radio => {
        radio.checked = false;
    });

    if (type === 'wedding' || type === 'ngunduh-mantu') {
        document.getElementById('paketWedding').style.display = 'block';
    } else if (type === 'engagement') {
        document.getElementById('paketEngagement').style.display = 'block';
    } else if (type === 'prewedding') {
        document.getElementById('paketPrewedding').style.display = 'block';
    } else if (type === 'other') {
        document.getElementById('otherInput').style.display = 'block';
    }
}
