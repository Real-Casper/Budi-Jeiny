// ===================================
// script.js — SATU FILE UNTUK SEMUA
// ===================================

// === 1. FUNGSI UTAMA ===
function getGuestName() {
    let path = window.location.pathname;
    let name = path.substring(1).replace(/[_|-]/g, ' ');
    
    // Jika kosong atau index.html → default
    if (!name || name.toLowerCase().includes("index") || name.toLowerCase().includes("main")) {
        return "Keluarga Besar";
    }
    
    // Kapitalisasi
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function bukaUndangan() {
    sessionStorage.setItem('playMusicOnLoad', 'true');
    window.location.href = 'main.html';
}

// === 2. DOM LOADED (HANYA SEKALI!) ===
document.addEventListener('DOMContentLoaded', () => {
    const guestName = getGuestName();

    // === COVER PAGE (index.html) ===
    if (document.body.classList.contains('cover-page') || document.querySelector('.cover')) {
        const guestContainer = document.getElementById('guest-name');
        const guestStrong = document.getElementById('guest-name-strong');

        if (guestContainer) {
            // 1. Sisipkan gambar cincin (jika ada)
            const ringImg = document.createElement('img');
            ringImg.src = 'assets/cincin.png';
            ringImg.alt = 'Cincin Pernikahan';
            ringImg.classList.add('ring-icon');
            ringImg.style.opacity = '0';
            ringImg.style.animation = 'fadeIn 0.8s ease-out forwards';
            ringImg.style.animationDelay = '0.5s';
            guestContainer.parentNode.insertBefore(ringImg, guestContainer);

            // 2. Tampilkan nama tamu
            if (guestStrong) {
                guestStrong.textContent = guestName;
            } else {
                // Jika tidak ada <strong>, buat
                const strong = document.createElement('strong');
                strong.textContent = guestName;
                guestContainer.innerHTML = `Kepada Yth. Bapak/Ibu/Sdr/i:<br>`;
                guestContainer.appendChild(strong);
            }

            // 3. Animasi fadeIn untuk nama tamu
            guestContainer.style.opacity = '0';
            guestContainer.style.animation = 'fadeIn 0.9s ease-out forwards';
            guestContainer.style.animationDelay = '0.8s';
        }

        // Watermark muncul
        const watermark = document.querySelector('.mark-bottom-right');
        if (watermark) {
            watermark.style.visibility = 'hidden';
            setTimeout(() => {
                watermark.style.visibility = 'visible';
                watermark.style.opacity = '0';
                watermark.style.animation = 'fadeIn 1s ease-out forwards';
                watermark.style.animationDelay = '1.2s';
            }, 100);
        }
    }

    // === MAIN PAGE (main.html) ===
    else if (document.body.classList.contains('main-page')) {
        // --- MUSIK ---
        const music = document.getElementById('background-music');
        const musicBtn = document.getElementById('music-toggle-btn');
        let isPlaying = false;

        if (music && musicBtn) {
            // Coba autoplay jika dari cover
            if (sessionStorage.getItem('playMusicOnLoad') === 'true') {
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            isPlaying = true;
                            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                        })
                        .catch(() => {
                            isPlaying = false;
                            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        });
                }
                sessionStorage.removeItem('playMusicOnLoad');
            }

            // Toggle manual
            musicBtn.addEventListener('click', () => {
                if (isPlaying) {
                    music.pause();
                    musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    music.play().catch(() => {});
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
                isPlaying = !isPlaying;
            });
        }

        // --- RSVP IFRAME ---
        const iframeRsvp = document.getElementById('hidden_iframe_rsvp');
        if (iframeRsvp) {
            iframeRsvp.onload = () => {
                const form = document.querySelector('.rsvp-form');
                if (form) form.style.display = 'none';
                
                const success = document.createElement('p');
                success.className = 'success-message';
                success.style.color = '#B76E79';
                success.style.fontWeight = '600';
                success.style.textAlign = 'center';
                success.style.marginTop = '20px';
                success.innerHTML = 'Terima Kasih! Konfirmasi Anda diterima.';
                const rsvpSection = document.getElementById('rsvp');
                if (rsvpSection) rsvpSection.appendChild(success);
            };
        }

        // --- COUNTDOWN ---
        const weddingDate = new Date("Januari 11, 2026 09:00:00").getTime();
        const countdownEl = document.getElementById('countdown-timer');

        if (countdownEl) {
            const update = setInterval(() => {
                const now = new Date().getTime();
                const diff = weddingDate - now;

                if (diff <= 0) {
                    clearInterval(update);
                    countdownEl.innerHTML = "<div class='expired'>Puji Tuhan, kami telah Sah!</div>";
                    return;
                }

                const d = Math.floor(diff / 86400000);
                const h = Math.floor((diff % 86400000) / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);

                countdownEl.innerHTML = `
                    <div class="time-box"><span class="number">${d}</span><span class="label">Hari</span></div>
                    <div class="time-box"><span class="number">${h}</span><span class="label">Jam</span></div>
                    <div class="time-box"><span class="number">${m}</span><span class="label">Menit</span></div>
                    <div class="time-box"><span class="number">${s}</span><span class="label">Detik</span></div>
                `;
            }, 1000);
        }
    }
});