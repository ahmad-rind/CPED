/**
 * Scroll Reveal Controller using IntersectionObserver
 * Adds the .in-view class to observed .fade-up elements upon entering viewport.
 */
export function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    if (fadeElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Unobserve after first trigger to ensure it only plays once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => {
        revealObserver.observe(el);
    });
}
