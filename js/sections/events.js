/**
 * 3D Coverflow Events Image Slider Controller
 * Features premium animations, segmented progress bars, autoplay loop via requestAnimationFrame,
 * pause on hover, keyboard, clickable sides, and swipe gestures.
 */
export function initEventsSlider() {
    const slider = document.querySelector('.events-slider-container');
    const track = document.getElementById('events-track');
    const slides = document.querySelectorAll('.event-slide');
    const segments = document.querySelectorAll('.progress-segment');
    const prevBtn = document.getElementById('prev-event-btn');
    const nextBtn = document.getElementById('next-event-btn');

    if (!slider || !track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const duration = 5500; // 5.5 seconds autoplay duration
    
    let progressAnimationId = null;
    let lastTime = 0;
    let accumulatedTime = 0;
    let isAutoplayPlaying = false;

    // Drag / Swipe States
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const threshold = 50; // pixels to trigger slide change

    // Circular Offset Calculator for 3D layout positioning
    function getCircularOffset(i, current, total) {
        let diff = i - current;
        while (diff < -total / 2) diff += total;
        while (diff > total / 2) diff -= total;
        return diff;
    }

    // Update Slide Positions and Scales in 3D Space
    function updateSlider(index) {
        // Clamp index
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentIndex = index;

        slides.forEach((slide, i) => {
            const offset = getCircularOffset(i, currentIndex, totalSlides);

            if (offset === 0) {
                // Active center slide
                slide.style.transform = 'translate(-50%, -50%) translateZ(0px) scale(1) rotateY(0deg)';
                slide.style.filter = 'none';
                slide.style.opacity = '1';
                slide.style.zIndex = '10';
                slide.style.pointerEvents = 'auto';
            } else if (offset === -1) {
                // Prev slide
                slide.style.transform = 'translate(-50%, -50%) translateX(-48%) translateZ(-100px) scale(0.84) rotateY(16deg)';
                slide.style.filter = 'blur(2px) brightness(0.65)';
                slide.style.opacity = '1';
                slide.style.zIndex = '5';
                slide.style.pointerEvents = 'auto';
            } else if (offset === 1) {
                // Next slide
                slide.style.transform = 'translate(-50%, -50%) translateX(48%) translateZ(-100px) scale(0.84) rotateY(-16deg)';
                slide.style.filter = 'blur(2px) brightness(0.65)';
                slide.style.opacity = '1';
                slide.style.zIndex = '5';
                slide.style.pointerEvents = 'auto';
            } else {
                // Hidden slides
                const direction = offset < 0 ? -1 : 1;
                slide.style.transform = `translate(-50%, -50%) translateX(${direction * 85}%) translateZ(-280px) scale(0.55) rotateY(${-direction * 35}deg)`;
                slide.style.filter = 'blur(6px) brightness(0.35)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
                slide.style.pointerEvents = 'none';
            }
        });

        // Update progress segments
        segments.forEach((segment, i) => {
            if (i === currentIndex) {
                segment.classList.add('active');
                segment.setAttribute('aria-selected', 'true');
            } else {
                segment.classList.remove('active');
                segment.setAttribute('aria-selected', 'false');
                
                // Reset fill for inactive segments
                const fill = segment.querySelector('.progress-fill');
                if (fill) fill.style.width = '0%';
            }
        });
    }

    // Navigation triggers
    function nextSlide() {
        updateSlider(currentIndex + 1);
    }

    function prevSlide() {
        updateSlider(currentIndex - 1);
    }

    // Click to select from sides
    slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            const offset = getCircularOffset(i, currentIndex, totalSlides);
            if (offset === -1) {
                prevSlide();
                resetAutoplay();
            } else if (offset === 1) {
                nextSlide();
                resetAutoplay();
            }
        });
    });

    // Arrow controls
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

    // Segment progress clicks
    segments.forEach((segment, index) => {
        segment.addEventListener('click', () => {
            updateSlider(index);
            resetAutoplay();
        });
    });

    // Keyboard support
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Autoplay animation loop using requestAnimationFrame
    function updateProgress(timestamp) {
        if (!isAutoplayPlaying) return;

        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        accumulatedTime += delta;
        const percent = Math.min((accumulatedTime / duration) * 100, 100);

        const activeFill = document.querySelector('.progress-segment.active .progress-fill');
        if (activeFill) {
            activeFill.style.width = `${percent}%`;
        }

        if (accumulatedTime >= duration) {
            accumulatedTime = 0;
            nextSlide();
        }

        progressAnimationId = requestAnimationFrame(updateProgress);
    }

    function startAutoplay() {
        if (isAutoplayPlaying) return;
        isAutoplayPlaying = true;
        lastTime = 0; // force recalculation on next frame
        progressAnimationId = requestAnimationFrame(updateProgress);
    }

    function pauseAutoplay() {
        isAutoplayPlaying = false;
        if (progressAnimationId) {
            cancelAnimationFrame(progressAnimationId);
            progressAnimationId = null;
        }
    }

    function resumeAutoplay() {
        if (isAutoplayPlaying) return;
        isAutoplayPlaying = true;
        lastTime = performance.now(); // align time correctly to avoid sudden jumps
        progressAnimationId = requestAnimationFrame(updateProgress);
    }

    function resetAutoplay() {
        pauseAutoplay();
        accumulatedTime = 0;
        
        // Reset all progress fills
        const fills = document.querySelectorAll('.progress-segment .progress-fill');
        fills.forEach(fill => fill.style.width = '0%');
        
        startAutoplay();
    }

    // Hover pauses autoplay and progress fill
    slider.addEventListener('mouseenter', pauseAutoplay);
    slider.addEventListener('mouseleave', resumeAutoplay);
    slider.addEventListener('focusin', pauseAutoplay);
    slider.addEventListener('focusout', resumeAutoplay);

    // Touch support (Swipes)
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

    // Mouse Dragging Support
    slider.addEventListener('mousedown', (e) => {
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

    window.addEventListener('mouseup', () => {
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

    // Initialize state
    updateSlider(currentIndex);
    startAutoplay();
}
