export function initStickyNav() {
    const header = document.getElementById('site-header');
    const stickyThreshold = 100;
    let lastScrollY = window.scrollY;
    let ticking = false;

    if (header) {
        // Dynamic will-change toggle to release GPU memory when header is static
        header.addEventListener('transitionstart', () => {
            header.style.willChange = 'transform';
        });
        const resetWillChange = () => {
            header.style.willChange = 'auto';
        };
        header.addEventListener('transitionend', resetWillChange);
        header.addEventListener('transitioncancel', resetWillChange);

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > stickyThreshold) {
                        header.classList.add('sticky');
                        
                        if (currentScrollY > lastScrollY && !header.classList.contains('scroll-down')) {
                            header.classList.remove('scroll-up');
                            header.classList.add('scroll-down');
                        } else if (currentScrollY < lastScrollY && header.classList.contains('scroll-down')) {
                            header.classList.remove('scroll-down');
                            header.classList.add('scroll-up');
                        }
                    } else {
                        header.classList.remove('sticky', 'scroll-down', 'scroll-up');
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}
