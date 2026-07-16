/**
 * Interactive Events Image Slider Controller
 * Handles touch gestures, mouse dragging, autoplay, dot indicators, and accessibility.
 */
export function initEventsSlider() {
    const slider = document.querySelector('.events-slider-container');
    const track = document.getElementById('events-track');
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.pagination-dot');
    const prevBtn = document.getElementById('prev-event-btn');
    const nextBtn = document.getElementById('next-event-btn');

    if (!slider || !track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    const autoplayDelay = 5000;

    // Drag / Swipe States
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const threshold = 50; // threshold in pixels to trigger slide change

    // Initialize slide position
    updateSlider(currentIndex, false);

    // Update Slider Function
    function updateSlider(index, animate = true) {
        // Clamp index
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;

        // Apply transition styling
        if (animate) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            track.style.transition = 'none';
        }

        // Translate track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active class on slides
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update active class on dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }

    // Next/Prev functions
    function nextSlide() {
        updateSlider(currentIndex + 1);
    }

    function prevSlide() {
        updateSlider(currentIndex - 1);
    }

    // Button Events
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    // Dot Navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
            resetAutoplay();
        });
    });

    // Keyboard Navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Touch Swipe Navigation
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoplay();
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > threshold && currentX !== 0) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        currentX = 0;
        resumeAutoplay();
    });

    // Mouse Drag Navigation (for desktop users)
    slider.addEventListener('mousedown', (e) => {
        // Only trigger on left click
        if (e.button !== 0) return;
        startX = e.clientX;
        isDragging = true;
        pauseAutoplay();
        slider.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = '';
        const diffX = startX - currentX;

        if (Math.abs(diffX) > threshold && currentX !== 0) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        currentX = 0;
        resumeAutoplay();
    });

    // Autoplay functions
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function pauseAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function resumeAutoplay() {
        startAutoplay();
    }

    function resetAutoplay() {
        pauseAutoplay();
        startAutoplay();
    }

    // Pause on Hover & Focus
    slider.addEventListener('mouseenter', pauseAutoplay);
    slider.addEventListener('mouseleave', resumeAutoplay);
    slider.addEventListener('focusin', pauseAutoplay);
    slider.addEventListener('focusout', resumeAutoplay);

    // Initial boot
    startAutoplay();
}
