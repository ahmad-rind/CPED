export function initHero() {
    // ------------------------------------------------
    // 3. VIDEO POPUP (Campus Tour button)
    // ------------------------------------------------
    const playBtn = document.getElementById('campus-tour-btn');
    const modal = document.getElementById('video-modal');
    
    if (playBtn && modal) {
        const iframe = document.getElementById('video-iframe');
        const closeBtn = document.getElementById('modal-close-btn');
        const overlay = modal.querySelector('.modal-overlay');

        function openVideo() {
            const videoUrl = playBtn.getAttribute('href');
            const videoId = videoUrl.split('v=')[1]?.split('&')[0];
            if (iframe && videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeVideo() {
            modal.classList.remove('active');
            if (iframe) {
                iframe.src = '';
            }
            document.body.style.overflow = '';
        }

        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openVideo();
        });

        if (closeBtn) closeBtn.addEventListener('click', closeVideo);
        if (overlay) overlay.addEventListener('click', closeVideo);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeVideo();
            }
        });
    }

    // ------------------------------------------------
    // 5. PARALLAX EFFECT on hero background
    // ------------------------------------------------
    const bgImage = document.querySelector('.hero-bg-image');

    if (hero && bgImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrollY < heroHeight) {
                const parallaxOffset = scrollY * 0.12;
                bgImage.style.transform = `translateX(-50%) translateY(${parallaxOffset}px)`;
            }
        }, { passive: true });
    }

}
