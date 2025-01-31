// Mendapatkan elemen gambar dan tombol panah
const slides = document.querySelector('.images');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentSlide = 0; // Indeks slide yang aktif
const totalSlides = document.querySelectorAll('.images img').length; // Jumlah total gambar

// Fungsi untuk update posisi slider
function updateSlider() {
  // Memastikan slider hanya bergerak 1 halaman per waktu
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Fungsi untuk menavigasi ke slide sebelumnya
prev.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--; // Kurangi indeks slide
  } else {
    currentSlide = totalSlides - 1; // Jika di slide pertama, pindah ke slide terakhir
  }
  updateSlider(); // Update tampilan slider
});

// Fungsi untuk menavigasi ke slide berikutnya
next.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++; // Tambah indeks slide
  } else {
    currentSlide = 0; // Jika di slide terakhir, kembali ke slide pertama
  }
  updateSlider(); // Update tampilan slider
});

// Menambahkan fungsionalitas geser dengan swipe pada mobile (touchscreen)
let touchStartX = 0;
let touchEndX = 0;

slides.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slides.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;

  if (touchStartX - touchEndX > 50) {
    // Geser ke kanan (next)
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
  } else if (touchEndX - touchStartX > 50) {
    // Geser ke kiri (prev)
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1;
    }
  }

  updateSlider(); // Update tampilan slider setelah swipe
});
