export function initStickyNav() {
    const header = document.getElementById('site-header');
    const stickyThreshold = 100;
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener('scroll', () => {
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
        }, { passive: true });
    }
}
