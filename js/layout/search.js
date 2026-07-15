export function initSearch() {
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

    // QUERY CONTEXT RETENTION
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        const searchInputs = document.querySelectorAll('#search-input, .mobile-search input');
        searchInputs.forEach(input => {
            input.value = query;
        });
    }
}
