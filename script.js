// ===================================
// script.js — UNDANGAN BUDI & JEINY
// ===================================

// === 1. FUNGSI UTAMA ===
function getGuestName() {
    // Ambil nama dari URL parameter atau path
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('nama') || urlParams.get('to') || '';
    
    if (!name) {
        // Coba dari path
        let path = window.location.pathname;
        name = path.split('/').pop().replace(/\.html$/, '').replace(/[_|-]/g, ' ');
    }
    
    // Jika kosong atau default → Keluarga Besar
    if (!name || name === 'index' || name === 'main' || name === 'undangan') {
        return "Keluarga Besar";
    }
    
    // Kapitalisasi
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function bukaUndangan() {
    console.log("Membuka undangan...");
    
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    
    if (coverPage && mainContent) {
        // 1. Sembunyikan Cover dengan animasi
        coverPage.style.opacity = '0';
        coverPage.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            coverPage.style.display = 'none';
            
            // 2. Tampilkan Main Content dengan animasi
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transition = 'opacity 1s ease';
            }, 50);
            
            // 3. Coba mainkan musik
            const music = document.getElementById('background-music');
            if (music) {
                music.play().catch(error => {
                    console.log("Autoplay musik gagal:", error);
                });
            }
            
            // 4. Scroll ke atas
            window.scrollTo(0, 0);
            
        }, 1000);
    }
}

function copyToClipboard(text) {
    const cleanText = text.replace(/[-\s]/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
        alert('Nomor rekening berhasil disalin: ' + text);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin. Silakan salin manual: ' + text);
    });
}

// === 2. INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log("Undangan Budi & Jeiny loaded!");
    
    const guestName = getGuestName();
    
    // === SET GUEST NAME ===
    const guestNameDisplay = document.getElementById('guest-name-display');
    if (guestNameDisplay) {
        guestNameDisplay.textContent = guestName;
    }
    
    // === MUSIC TOGGLE ===
    const music = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    
    if (music && musicBtn) {
        let isPlaying = false;
        
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                music.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                music.play().catch(error => {
                    console.log("Musik gagal diputar:", error);
                });
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });
    }
    
    // === COUNTDOWN TIMER ===
    const countdownEl = document.getElementById('countdown-timer');
    if (countdownEl) {
        const weddingDate = new Date("January 11, 2026 00:00:00").getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance <= 0) {
                countdownEl.innerHTML = `
                    <div class="wedding-finish">
                        <h2 class="finish-title">Segala pujian bagi Tuhan!</h2>
                        <div class="finish-divider"></div>
                        <p class="finish-desc">
                            SATU DALAM CINTA, SATU DALAM TUHAN<br>
                            Dalam kasih Tuhan yang sempurna.<br>
                            Hari ini Kami menjadi satu dalam kasih-Nya.<br>
                            Kiranya kasih Tuhan<br>
                            Menjadi dasar rumah tangga kami selamanya.
                        </p>
                        <p class="finish-date">MINGGU, 11 JANUARI 2026</p>
                        <p class="Emote">🙏💞</p>
                    </div>
                `;
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownEl.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">Hari</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">Jam</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">Menit</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">Detik</span>
                </div>
            `;
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
    
    // === RSVP FORM ===
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const successMsg = document.getElementById('rsvp-success-message');
            const formData = new FormData(form);
            
            // Kirim ke Google Forms
            fetch('https://docs.google.com/forms/d/e/1FAIpQLSf7UypowexzmcDST-EY6SOQcBEc_AbXTKOdnh-5TKodTmIjog/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
            })
            .catch(() => {
                alert('Terima kasih! Konfirmasi Anda telah dicatat.');
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
            });
        });
    }
    
    // === GUESTBOOK FORM ===
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const submitBtn = form.querySelector('button');
            const successMsg = document.getElementById('guestbook-success');
            const formData = new FormData(form);
            
            submitBtn.innerHTML = 'Mengirim...';
            submitBtn.disabled = true;
            
            // Kirim ke Google Forms
            fetch('https://docs.google.com/forms/d/e/1FAIpQLSde1yYg1xFwJ6jMsvHf1CTt_iEphCIXk9llTmds73DolkMXow/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
                loadWishes(); // Refresh jumlah ucapan
            })
            .catch(() => {
                alert('Terima kasih! Ucapan Anda telah dicatat.');
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
                loadWishes(); // Refresh jumlah ucapan
            });
        });
    }
    
    // === WISHES MODAL ===
    const showWishesBtn = document.getElementById('show-wishes-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const wishesModal = document.getElementById('wishes-modal');
    
    if (showWishesBtn) {
        showWishesBtn.addEventListener('click', function() {
            if (wishesModal) {
                wishesModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                loadWishesModal();
            }
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (wishesModal) {
                wishesModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (wishesModal) {
        wishesModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal dengan ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('wishes-modal');
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // === LOAD WISHES FUNCTIONS ===
    function loadWishes() {
        const sheetId = '1eUSOVdgEiiF2W5iOxUASOPEc-opnB6vWCmRNhNTFEkA';
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Form%20Responses%201`;
        
        fetch(sheetUrl)
            .then(res => res.text())
            .then(text => {
                try {
                    const jsonString = text.substr(47).slice(0, -2);
                    const data = JSON.parse(jsonString);
                    const rows = data.table.rows;
                    const btn = document.getElementById('show-wishes-btn');
                    if (btn) btn.innerHTML = `Lihat Semua Ucapan (${rows.length})`;
                } catch (error) {
                    console.log("Error loading wishes count:", error);
                }
            })
            .catch(() => {
                const btn = document.getElementById('show-wishes-btn');
                if (btn) btn.innerHTML = 'Lihat Semua Ucapan';
            });
    }
    
    function loadWishesModal() {
        const sheetId = '1eUSOVdgEiiF2W5iOxUASOPEc-opnB6vWCmRNhNTFEkA';
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Form%20Responses%201`;
        
        const loading = document.getElementById('modal-loading');
        const container = document.getElementById('wishes-container-modal');
        
        if (loading) loading.style.display = 'block';
        if (container) container.innerHTML = '';
        
        fetch(sheetUrl)
            .then(res => res.text())
            .then(text => {
                if (loading) loading.style.display = 'none';
                
                try {
                    const jsonString = text.substr(47).slice(0, -2);
                    const data = JSON.parse(jsonString);
                    const rows = data.table.rows;
                    
                    if (!container) return;
                    
                    if (rows.length === 0) {
                        container.innerHTML = '<p style="text-align:center; color:#666; font-style:italic; padding:40px;">Belum ada ucapan. Jadilah yang pertama!</p>';
                        return;
                    }
                    
                    // Tampilkan ucapan terbaru di atas
                    rows.reverse().forEach(row => {
                        const timestamp = row.c[0]?.f || 'Baru saja';
                        const name = row.c[1]?.v || 'Anonim';
                        const message = row.c[2]?.v || '';
                        
                        const wishCard = document.createElement('div');
                        wishCard.style.cssText = `
                            background: #f8f9fa;
                            padding: 20px;
                            margin: 15px 0;
                            border-radius: 12px;
                            border-left: 5px solid #17a2b8;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                            transition: all 0.3s ease;
                        `;
                        
                        wishCard.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                <strong style="color: #17a2b8; font-size: 1.1em;">${name}</strong>
                                <small style="color: #6c757d; font-size: 0.85em;">${timestamp}</small>
                            </div>
                            <p style="margin: 0; color: #495057; line-height: 1.6;">"${message}"</p>
                        `;
                        
                        container.appendChild(wishCard);
                    });
                } catch (error) {
                    if (container) {
                        container.innerHTML = `
                            <p style="color:#dc3545; text-align:center; padding:40px;">
                                Gagal memuat ucapan.<br>
                                <small>Pastikan koneksi internet stabil.</small>
                            </p>
                        `;
                    }
                }
            })
            .catch(error => {
                if (loading) loading.style.display = 'none';
                if (container) {
                    container.innerHTML = `
                        <p style="color:#dc3545; text-align:center; padding:40px;">
                            Gagal memuat ucapan.<br>
                            <small>Pastikan koneksi internet stabil.</small>
                        </p>
                    `;
                }
            });
    }
    
    // Load jumlah ucapan saat pertama kali
    loadWishes();
    
    // === SMOOTH SCROLL UNTUK NAVIGASI ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log("Semua fungsi berhasil diinisialisasi!");
});

// === 3. FALLBACK FUNCTIONS ===
// Jika ada masalah dengan Google Forms, gunakan fallback
function fallbackRSVP(formData) {
    // Simpan di localStorage sebagai fallback
    const rsvpData = {
        nama: formData.get('entry.2606285'),
        status: formData.get('entry.877086558'),
        jumlah: formData.get('entry.1498135098'),
        timestamp: new Date().toISOString()
    };
    
    let existingData = JSON.parse(localStorage.getItem('rsvpFallback') || '[]');
    existingData.push(rsvpData);
    localStorage.setItem('rsvpFallback', JSON.stringify(existingData));
    
    return true;
}

function fallbackGuestbook(formData) {
    // Simpan di localStorage sebagai fallback
    const guestbookData = {
        nama: formData.get('entry.1926356659'),
        pesan: formData.get('entry.1888886529'),
        timestamp: new Date().toISOString()
    };
    
    let existingData = JSON.parse(localStorage.getItem('guestbookFallback') || '[]');
    existingData.push(guestbookData);
    localStorage.setItem('guestbookFallback', JSON.stringify(existingData));
    
    return true;
}