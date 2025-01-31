let index = 0; // Index untuk menentukan gambar yang ditampilkan
const slides = document.querySelector(".images"); // Seleksi elemen .images
const totalSlides = document.querySelectorAll(".images img").length; // Total jumlah gambar

// Seleksi tombol panah
const prevArrow = document.querySelector(".prev");
const nextArrow = document.querySelector(".next");

let startX; // Variabel untuk menyimpan posisi sentuhan awal

// Fungsi untuk update slide berdasarkan index
function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    toggleArrows(); // Memperbarui visibilitas panah
}

// Fungsi untuk geser ke slide berikutnya
function nextSlide() {
    if (index < totalSlides - 1) {
        index++;
        updateSlide();
    }
}

// Fungsi untuk geser ke slide sebelumnya
function prevSlide() {
    if (index > 0) {
        index--;
        updateSlide();
    }
}

// Fungsi untuk menyembunyikan atau menampilkan panah
function toggleArrows() {
    if (index === 0) {
        prevArrow.style.display = "none"; // Sembunyikan panah kiri di page 1
    } else {
        prevArrow.style.display = "block"; // Tampilkan panah kiri di slide selain page 1
    }

    if (index === totalSlides - 1) {
        nextArrow.style.display = "none"; // Sembunyikan panah kanan di page 6
    } else {
        nextArrow.style.display = "block"; // Tampilkan panah kanan di slide selain page 6
    }
}

// Event listener untuk sentuhan di layar (mobile)
slides.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX; // Mencatat posisi awal gesekan
}, false);

slides.addEventListener('touchmove', function(e) {
    let moveX = e.touches[0].pageX; // Posisi gesekan saat ini
    let diff = startX - moveX;

    if (Math.abs(diff) > 30) { // Minimal perbedaan 30px untuk mendeteksi geseran
        if (diff > 0 && index < totalSlides - 1) { // Geser ke kanan (next slide)
            nextSlide();
        } else if (diff < 0 && index > 0) { // Geser ke kiri (prev slide)
            prevSlide();
        }
        startX = moveX; // Reset posisi awal setelah pergeseran
    }
}, false);

// Memanggil fungsi toggleArrows saat pertama kali halaman dimuat
toggleArrows();
