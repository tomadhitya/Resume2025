let index = 0; // Index untuk menentukan gambar yang ditampilkan
const slides = document.querySelector(".images"); // Seleksi elemen .images
const totalSlides = document.querySelectorAll(".images img").length; // Total jumlah gambar

// Seleksi tombol panah
const prevArrow = document.querySelector(".prev");
const nextArrow = document.querySelector(".next");

let startX, endX; // Variabel untuk menyimpan posisi sentuhan
let isTouching = false; // Flag untuk memeriksa apakah pergeseran aktif

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

// Event listener untuk tombol panah
prevArrow.addEventListener("click", function() {
    prevSlide(); // Geser ke slide sebelumnya
});

nextArrow.addEventListener("click", function() {
    nextSlide(); // Geser ke slide berikutnya
});

// Event listener untuk sentuhan di layar (mobile)
slides.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX; // Mencatat posisi awal gesekan
    isTouching = true; // Menandakan bahwa pergeseran sedang berlangsung
}, false);

slides.addEventListener('touchmove', function(e) {
    if (!isTouching) return; // Hanya memproses jika sedang menyentuh layar
    endX = e.touches[0].pageX; // Posisi gesekan saat ini
}, false);

slides.addEventListener('touchend', function(e) {
    if (!isTouching) return; // Hanya memproses jika sedang menyentuh layar
    
    let diff = startX - endX; // Menghitung selisih antara posisi awal dan akhir geseran
    
    if (Math.abs(diff) > 30) { // Minimum threshold 30px untuk deteksi geser
        if (diff > 0 && index < totalSlides - 1) { // Geser ke kanan (next slide)
            nextSlide();
        } else if (diff < 0 && index > 0) { // Geser ke kiri (prev slide)
            prevSlide();
        }
    }
    isTouching = false; // Reset status sentuhan
}, false);

// Memanggil fungsi toggleArrows saat pertama kali halaman dimuat
toggleArrows();
