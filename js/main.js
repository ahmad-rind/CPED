import { initHeader } from './header/sticky-nav.js';
import { initHero } from './hero/hero-and-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHero();

    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
