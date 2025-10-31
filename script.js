// ===================================

// === FUNGSI COVER (index.html) ===

// ===================================



// Fungsi Utama untuk Mengambil Nama Tamu dari URL

function getGuestName() {

    let path = window.location.pathname;

    

    // Menghapus slash di depan dan mengganti simbol (- atau _) dengan spasi

    let name = path.substring(1).replace(/[_|-]/g, ' ');



    // Jika URL kosong atau menuju index.html, gunakan nama default

    if (name === "" || name.toLowerCase() === "index.html") {

        return "Keluarga Besar"; 

    }



    // Kapitalisasi setiap kata (Contoh: budi santoso -> Budi Santoso)

    name = name.split(' ').map(word => 

        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

    ).join(' ');



    return name;

}


// script.js

function bukaUndangan() {
    // 1. Simpan penanda di sessionStorage
    // Ini memberi tahu halaman 'main.html' bahwa musik harus diputar
    sessionStorage.setItem('playMusicOnLoad', 'true');

    // 2. Tambahkan nama tamu ke URL (Opsional, tapi praktik baik)
    // Asumsi: Jika Anda ingin nama tamu dipertahankan, Anda bisa mengambilnya dari URL
    // Namun, karena kode Anda tidak menunjukkan cara mengambil nama tamu, kita abaikan dulu.
    
    // 3. Arahkan ke halaman utama
    // Ganti 'main.html' jika nama file Anda berbeda.
    window.location.href = 'main.html';
}



// Fungsi yang berjalan saat seluruh konten HTML dimuat

document.addEventListener('DOMContentLoaded', () => {

    

    const guestName = getGuestName();

    const guestElement = document.getElementById('guest-name');



    // Cek apakah ini halaman Cover (index.html)

    if (guestElement && document.querySelector('.cover')) {

        

        // LOGIKA COVER

        

        // 1. SISIPKAN GAMBAR CINCIN

        const ringImg = document.createElement('img');

        ringImg.src = 'assets/cincin.png'; 

        ringImg.alt = 'Cincin Pernikahan';

        ringImg.classList.add('ring-icon'); 

        

        guestElement.parentNode.insertBefore(ringImg, guestElement);

        

        // 2. TAMPILKAN NAMA TAMU

        guestElement.innerHTML = `Kepada Yth. Bapak/Ibu/Sdr/i: <br><strong>${guestName}</strong>`;

        

        guestElement.style.opacity = 0;

        guestElement.style.animation = 'fadeIn 0.8s ease-out forwards';

        guestElement.style.animationDelay = '0.8s'; 

        

    } else if (document.body.classList.contains('main-page')) {

        

        // ========================================

        // === LOGIKA HALAMAN UTAMA (main.html) ===

        // ========================================

        

        // 1. INISIASI MUSIK

        const music = document.getElementById('background-music');

        const musicBtn = document.getElementById('music-toggle-btn');

        let isPlaying = false;



        // Coba putar musik secara otomatis (karena user sudah berinteraksi di halaman cover)

        const playPromise = music.play();



        if (playPromise !== undefined) {

            playPromise.then(() => {

                isPlaying = true;

                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';

            }).catch(error => {

                // Autoplay dicekal oleh browser

                isPlaying = false;

                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

            });

        }



        // Event listener untuk tombol play/pause

        musicBtn.addEventListener('click', () => {

            if (isPlaying) {

                music.pause();

                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

            } else {

                music.play();

                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';

            }

            isPlaying = !isPlaying;

        });

        
    // Ambil elemen iframe
    var iframeRsvp = document.getElementById('hidden_iframe_rsvp');
    
    // Pastikan iframe ada sebelum menambahkan listener
    if (iframeRsvp) {
        iframeRsvp.onload = function() {
            // Logika ini akan berjalan SETELAH Google Forms memuat balasan di iframe
            
            // 1. Sembunyikan formulir
            document.querySelector('.rsvp-form').style.display = 'none';
            
            // 2. Tampilkan pesan sukses
            var successMessage = document.createElement('p');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = '🎉 Terima Kasih! Konfirmasi kehadiran Anda telah diterima. 🎉';
            
            // 3. Masukkan pesan ke dalam section RSVP
            document.getElementById('rsvp').appendChild(successMessage);
        }
    }
  
 

        

        

        // 2. INISIASI COUNTDOWN TIMER

        

        // TANGGAL PERNIKAHAN: TAHUN, BULAN (0=Jan), TANGGAL, JAM, MENIT, DETIK

        const weddingDate = new Date("Feb 14, 2026 09:00:00").getTime();

        const countdownElement = document.getElementById('countdown-timer');



        const updateCountdown = setInterval(() => {

            const now = new Date().getTime();

            const distance = weddingDate - now;



            const days = Math.floor(distance / (1000 * 60 * 60 * 24));

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const seconds = Math.floor((distance % (1000 * 60)) / 1000);



            if (distance < 0) {

                clearInterval(updateCountdown);

                countdownElement.innerHTML = "<div class='expired'>Alhamdulillah, kami telah Sah!</div>";

            } else {

                countdownElement.innerHTML = `

                    <div class="time-box"><span class="number">${days}</span><span class="label">Hari</span></div>

                    <div class="time-box"><span class="number">${hours}</span><span class="label">Jam</span></div>

                    <div class="time-box"><span class="number">${minutes}</span><span class="label">Menit</span></div>

                    <div class="time-box"><span class="number">${seconds}</span><span class="label">Detik</span></div>

                `;  

            }

        }, 1000);

    }

});