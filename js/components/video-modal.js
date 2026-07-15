export function initVideoModal() {
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
            
            // Focus trap: set focus to the modal close button
            if (closeBtn) {
                closeBtn.focus();
            }
        }

        function closeVideo() {
            modal.classList.remove('active');
            if (iframe) {
                iframe.src = '';
            }
            document.body.style.overflow = '';
            playBtn.focus(); // return focus
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
        
        // Focus trapping inside modal
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusables = modal.querySelectorAll('button, iframe, [tabindex="0"]');
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}
