const rows = document.querySelectorAll('.work-row');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.35 });

rows.forEach(row => observer.observe(row));


// ===== Video carousel logic =====
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    items.forEach((item, i) => {
        const video = item.querySelector("video");
        if (i === index) video.play();
        else { video.pause(); video.currentTime = 0; }
    });
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
});

// initial load
updateCarousel();

// ===== Global Mute / Unmute Control =====
const muteToggleBtn = document.getElementById("muteToggleBtn");
let isMuted = true;

muteToggleBtn.addEventListener("click", () => {
    isMuted = !isMuted;

    // update all videos
    items.forEach(item => {
        const video = item.querySelector("video");
        video.muted = isMuted;
    });

    // update icon
    muteToggleBtn.innerHTML = isMuted
        ? `<i class="fa-solid fa-volume-xmark"></i>`
        : `<i class="fa-solid fa-volume-high"></i>`;
});
