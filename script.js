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



// Fungsi untuk menangani aksi tombol Buka Undangan (dapat dipanggil dari HTML)

function bukaUndangan() {

    const guestName = getGuestName();

    alert("Selamat Datang, " + guestName + "! Undangan akan terbuka...");

    // Tambahkan navigasi ke halaman utama di sini:

    // window.location.href = "halaman-utama.html"; 

}



// Fungsi yang berjalan saat seluruh konten HTML dimuat

document.addEventListener('DOMContentLoaded', () => {

    

    const guestName = getGuestName();

    const guestElement = document.getElementById('guest-name');



    if (guestElement) {

        

        // 1. SISIPKAN GAMBAR CINCIN DENGAN PENUNDAAN (delay)

        const ringImg = document.createElement('img');

        ringImg.src = 'assets/cincin.png'; // Pastikan path benar

        ringImg.alt = 'Cincin Pernikahan';

        ringImg.classList.add('ring-icon'); 

        

        // Tambahkan elemen cincin sebelum elemen nama tamu

        guestElement.parentNode.insertBefore(ringImg, guestElement);

        

        // Cincin sudah diberi style 'opacity: 0;' dan animasi di CSS.

        // Kita hanya perlu memastikan CSS sudah memiliki:

        // .ring-icon { opacity: 0; animation: fadeIn 0.8s ease-out forwards; animation-delay: 0.5s; }

        

        

        // 2. TAMPILKAN NAMA TAMU DENGAN PENUNDAAN BERURUTAN

        guestElement.innerHTML = `Kepada Yth. Bapak/Ibu/Sdr/i: <br><strong>${guestName}</strong>`;

        

        // Nama tamu muncul SETELAH cincin. Jika cincin delay 0.5s, 

        // kita bisa atur nama tamu muncul sekitar 0.8s untuk urutan yang rapi.

        guestElement.style.opacity = 0;

        guestElement.style.animation = 'fadeIn 0.8s ease-out forwards';

        guestElement.style.animationDelay = '0.8s'; // Disesuaikan agar muncul setelah cincin

    }

});