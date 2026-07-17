import { initStickyNav } from './layout/sticky-nav.js';
import { initMobileNav } from './layout/mobile-nav.js';
import { initSearch } from './layout/search.js';
import { initParallax } from './sections/parallax.js';
import { initVideoModal } from './components/video-modal.js';
import { initPloTabs } from './sections/plo-tabs.js';
import { initAlertTicker } from './sections/alert-ticker.js';
import { initEventsSlider } from './sections/events.js';
import { initScrollReveal } from './utils/scroll-reveal.js';
import { runBenchmark } from './utils/benchmark.js';

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
    runBenchmark();

    // SMOOTH SCROLL FOR ANCHOR LINKS (Fast & Snappy Custom Easing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const header = document.getElementById('site-header');
                const headerOffset = header ? header.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                
                // Calculate snappy duration based on travel distance (between 350ms and 700ms)
                const duration = Math.min(Math.max(Math.abs(distance) * 0.3, 350), 700);
                let startTime = null;

                // Quartic Out easing: fast startup, rapid deceleration
                function easeOutQuart(t) {
                    return 1 - Math.pow(1 - t, 4);
                }

                function animateScroll(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeOutQuart(progress));

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }

                requestAnimationFrame(animateScroll);
            }
        });
    });
});
