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
    // Geser ke slide 1 setelah slide terakhir (page 6 ke page 1)
    if (index === totalSlides - 1) {
        index = 0; 
    } else {
        index++;
    }
    updateSlide();
}

// Fungsi untuk geser ke slide sebelumnya
function prevSlide() {
    // Geser ke slide 6 setelah slide pertama (page 1 ke page 6)
    if (index === 0) {
        index = totalSlides - 1;
    } else {
        index--;
    }
    updateSlide();
}

// Event listener untuk sentuhan di layar (mobile)
slides.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX; // Mencatat posisi awal gesekan
}, false);

slides.addEventListener('touchmove', function(e) {
    let moveX = e.touches[0].pageX; // Posisi gesekan saat ini
    let diff = startX - moveX;

    // Memperbaiki gesture untuk arah geser yang lebih halus dan intuitif
    if (Math.abs(diff) > 30) {  // Minimal perbedaan 30px untuk mendeteksi geseran
        if (diff > 0 && index < totalSlides - 1) { // Geser ke kanan (next slide)
            nextSlide();
        } else if (diff < 0 && index > 0) { // Geser ke kiri (prev slide)
            prevSlide();
        }
        startX = moveX; // Reset posisi awal setelah pergeseran
    }
}, false);
