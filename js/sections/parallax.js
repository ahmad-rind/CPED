export function initParallax() {
    const hero = document.getElementById('hero');
    const bgImage = document.querySelector('.hero-bg-image');

    if (hero && bgImage) {
        // Accessibility check: disable parallax if reduced motion is preferred
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            bgImage.style.transform = 'translateX(-50%) translateY(0)';
            return;
        }

        let heroHeight = hero.offsetHeight;
        window.addEventListener('resize', () => {
            heroHeight = hero.offsetHeight;
        }, { passive: true });

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY < heroHeight) {
                        const parallaxOffset = scrollY * 0.12;
                        bgImage.style.transform = `translateX(-50%) translateY(${parallaxOffset}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}
