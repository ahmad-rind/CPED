export function initParallax() {
    const hero = document.getElementById('hero');
    const bgImage = document.querySelector('.hero-bg-image');

    if (hero && bgImage) {
        // Accessibility check: disable parallax if reduced motion is preferred
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            bgImage.style.transform = 'translate3d(-50%, 0, 0)';
            return;
        }

        // Cache hero height initially to avoid layout reads in the scroll loop
        let heroHeight = hero.offsetHeight;

        // Listen for window resize to update cached height (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                heroHeight = hero.offsetHeight;
            }, 150);
        }, { passive: true });

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY < heroHeight) {
                        const parallaxOffset = scrollY * 0.12;
                        bgImage.style.transform = `translate3d(-50%, ${parallaxOffset}px, 0)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}
