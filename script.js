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
  // --- Tambahkan gambar cincin sebelum nama tamu ---
  const guestElement = document.getElementById('guest-name');
  if (guestElement) {
      const ringImg = document.createElement('img');
      ringImg.src = 'assets/cincin.png'; // pastikan file ini ada di folder /images
      ringImg.alt = 'Cincin Pernikahan';
      ringImg.classList.add('ring-icon'); // gunakan gaya CSS yang sudah ada
      guestElement.parentNode.insertBefore(ringImg, guestElement);
  }

  // --- Lanjutkan fungsi tamu seperti biasa ---
  const guestName = getGuestName();
  
  if (guestElement) {
    guestElement.innerHTML = `Kepada Yth. Bapak/Ibu/Sdr/i: <br><strong>${guestName}</strong>`;
    guestElement.style.opacity = 0;
    guestElement.style.animation = 'fadeIn 0.8s ease-out forwards';
    guestElement.style.animationDelay = '0.7s';
  }
});
