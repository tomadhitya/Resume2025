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
    index = (index + 1) % totalSlides;
    updateSlide();
}

// Fungsi untuk geser ke slide sebelumnya
function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Event listener untuk sentuhan di layar (mobile)
slides.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX; // Mencatat posisi awal gesekan
}, false);

slides.addEventListener('touchmove', function(e) {
    let moveX = e.touches[0].pageX; // Posisi gesekan saat ini
    let diff = startX - moveX;

    if (diff > 50) { // Geser lebih dari 50px ke kiri, pindah ke slide berikutnya
        nextSlide();
        startX = moveX; // Reset posisi awal
    } else if (diff < -50) { // Geser lebih dari 50px ke kanan, pindah ke slide sebelumnya
        prevSlide();
        startX = moveX; // Reset posisi awal
    }
}, false);
