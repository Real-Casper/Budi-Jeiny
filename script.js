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
    // Di sini Anda akan menambahkan window.location.href = "halaman-utama.html";
}

// Fungsi yang berjalan saat seluruh konten HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    const guestName = getGuestName();
    const guestElement = document.getElementById('guest-name');
    
    if (guestElement) {
        // Tampilkan sapaan tamu
        guestElement.innerHTML = `Kepada Yth. Bapak/Ibu/Sdr/i: <br><strong>${guestName}</strong>`;
        
        // Terapkan animasi pada elemen nama tamu
        guestElement.style.opacity = 0;
        guestElement.style.animation = 'fadeIn 0.8s ease-out forwards';
        guestElement.style.animationDelay = '0.7s';
    }
});