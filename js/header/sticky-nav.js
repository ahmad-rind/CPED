export function initHeader() {
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

    // ------------------------------------------------
    // 2. MOBILE NAVIGATION & TOUCH DROPDOWNS
    // ------------------------------------------------
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

    // 6. INTERACTIVE SEARCH BAR
    // ------------------------------------------------
    const searchForm = document.getElementById('header-search-wrap');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchForm && searchInput && searchBtn) {
        // Handle click on search button
        searchBtn.addEventListener('click', (e) => {
            const isActive = searchForm.classList.contains('active');
            const query = searchInput.value.trim();

            if (!isActive) {
                // Open search bar
                e.preventDefault();
                searchForm.classList.add('active');
                setTimeout(() => {
                    searchInput.focus();
                }, 50);
            } else {
                // If search bar is active
                if (query === '') {
                    // Close search bar if empty
                    e.preventDefault();
                    searchForm.classList.remove('active');
                    searchInput.blur();
                } else {
                    // Submit form if it has query
                    searchForm.submit();
                }
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchForm.classList.contains('active')) {
                searchForm.classList.remove('active');
                searchInput.blur();
            }
        });

        // Close when clicking outside the form
        document.addEventListener('click', (e) => {
            if (searchForm.classList.contains('active') && !searchForm.contains(e.target)) {
                searchForm.classList.remove('active');
                searchInput.blur();
            }
        });

        // Prevent clicking inside the form from propagating to the document click handler
        searchForm.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // ------------------------------------------------
    // 7. QUERY CONTEXT RETENTION
    // ------------------------------------------------
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        const searchInputs = document.querySelectorAll('#search-input, .mobile-search input');
        searchInputs.forEach(input => {
            input.value = query;
        });
    }
}
