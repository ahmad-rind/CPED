import { initStickyNav } from './layout/sticky-nav.js';
import { initMobileNav } from './layout/mobile-nav.js';
import { initSearch } from './layout/search.js';
import { initParallax } from './sections/parallax.js';
import { initVideoModal } from './components/video-modal.js';
import { initPloTabs } from './sections/plo-tabs.js';
import { initAlertTicker } from './sections/alert-ticker.js';
import { initEventsSlider } from './sections/events.js';
import { initScrollReveal } from './utils/scroll-reveal.js';
import { initBackToTop } from './layout/back-to-top.js';
import { initFacultyMembers } from './sections/faculty-members.js';

document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initMobileNav();
    initSearch();
    initParallax();
    initVideoModal();
    initPloTabs();
    initAlertTicker();
    initEventsSlider();
    initScrollReveal();
    initBackToTop();
    initFacultyMembers();


    // SMOOTH SCROLL FOR ANCHOR LINKS
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
