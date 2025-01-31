let index = 0; // Index untuk menentukan gambar yang ditampilkan
const slides = document.querySelector(".images"); // Seleksi elemen .images
const totalSlides = document.querySelectorAll(".images img").length; // Total jumlah gambar

let startX; // Variabel untuk menyimpan posisi sentuhan awal

// Fungsi untuk update slide berdasarkan index
function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Fungsi untuk geser ke slide berikutnya
function nextSlide() {
    // Hanya geser ke kanan jika bukan di page 6
    if (index < totalSlides - 1) {
        index++;
        updateSlide();
    }
}

// Fungsi untuk geser ke slide sebelumnya
function prevSlide() {
    // Hanya geser ke kiri jika bukan di page 1
    if (index > 0) {
        index--;
        updateSlide();
    }
}

// Event listener untuk sentuhan di layar (mobile)
slides.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX; // Mencatat posisi awal gesekan
}, false);

slides.addEventListener('touchmove', function(e) {
    let moveX = e.touches[0].pageX; // Posisi gesekan saat ini
    let diff = startX - moveX;

    // Memperbaiki gesture untuk arah geser yang lebih halus dan hanya 1 halaman
    if (Math.abs(diff) > 30) {  // Minimal perbedaan 30px untuk mendeteksi geseran
        if (diff > 0 && index < totalSlides - 1) { // Geser ke kanan (next slide)
            nextSlide();
        } else if (diff < 0 && index > 0) { // Geser ke kiri (prev slide)
            prevSlide();
        }
        startX = moveX; // Reset posisi awal setelah pergeseran
    }
}, false);
