export function initMobileNav() {
    const mobileTrigger = document.getElementById('mobile-menu-trigger');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');

    if (mobileTrigger && mainNav) {
        mobileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.toggle('open');
            mobileTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            mobileTrigger.querySelector('span').textContent = isOpen ? 'MENU ▴' : 'MENU ▾';
            if (navOverlay) {
                navOverlay.classList.toggle('active', isOpen);
            }
        });

        // Close mobile dropdown menu when clicking anywhere else
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && !mainNav.contains(e.target) && e.target !== mobileTrigger) {
                mainNav.classList.remove('open');
                mobileTrigger.setAttribute('aria-expanded', 'false');
                mobileTrigger.querySelector('span').textContent = 'MENU ▾';
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
            }
        });

        // Close when clicking the overlay itself
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileTrigger.setAttribute('aria-expanded', 'false');
                mobileTrigger.querySelector('span').textContent = 'MENU ▾';
                navOverlay.classList.remove('active');
            });
        }
    }

    // Dropdown toggles on click/tap (supporting both mobile accordion & touch-devices)
    const dropdownLinks = document.querySelectorAll('.nav-menu > li > a[data-dropdown]');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                // Mobile/Tablet accordion behavior
                e.preventDefault();
                e.stopPropagation();
                const submenu = link.nextElementSibling;
                if (submenu && submenu.classList.contains('sub-menu')) {
                    submenu.classList.toggle('open');
                    const arrow = link.querySelector('.dropdown-arrow');
                    if (arrow) {
                        arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
                    }
                }
            } else {
                // Desktop click/tap behavior for touch devices
                const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                if (isTouch) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parentLi = link.parentElement;
                    
                    // Close other dropdowns
                    document.querySelectorAll('.nav-menu > li').forEach(li => {
                        if (li !== parentLi) {
                            li.classList.remove('touch-open');
                        }
                    });
                    
                    parentLi.classList.toggle('touch-open');
                }
            }
        });
    });

    // Close desktop touch dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.nav-menu > li').forEach(li => {
            li.classList.remove('touch-open');
        });
    });
}
