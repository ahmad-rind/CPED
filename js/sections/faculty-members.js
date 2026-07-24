/**
 * Faculty Members Directory Interactive Logic
 * Handles live search, category tab filtering, and missing image avatar fallbacks.
 */

export function initFacultyMembers() {
    const searchInput = document.getElementById('facultySearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.faculty-card');
    const groupSections = document.querySelectorAll('.faculty-group-section');
    const noResults = document.getElementById('facultyNoResults');

    if (!cards.length) return;

    // Handle missing/blank image load errors gracefully
    const facultyImages = document.querySelectorAll('.faculty-img');
    facultyImages.forEach(img => {
        // If image is already complete with 0 natural width (broken/missing)
        if (img.complete && img.naturalWidth === 0) {
            img.style.display = 'none';
        }
        
        // If image fails to load, hide img element to reveal z-index 1 fallback avatar
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });

        // If image loads successfully, ensure display block
        img.addEventListener('load', () => {
            img.style.display = 'block';
        });
    });

    let currentFilter = 'all';
    let searchQuery = '';

    function filterFaculty() {
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const parentSection = card.closest('.faculty-group-section');
            const sectionGroup = parentSection ? parentSection.getAttribute('data-group') : '';
            
            const name = card.getAttribute('data-name') || '';
            const role = card.getAttribute('data-role') || '';
            const spec = card.getAttribute('data-specialization') || '';
            const textContent = `${name} ${role} ${spec}`.toLowerCase();

            const matchesFilter = (currentFilter === 'all') || 
                                  (currentFilter === 'executive' && sectionGroup === 'executive') ||
                                  (category === currentFilter);

            const matchesSearch = !searchQuery || textContent.includes(searchQuery.toLowerCase());

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Toggle section headers if all cards inside are hidden
        groupSections.forEach(section => {
            const sectionCards = section.querySelectorAll('.faculty-card');
            let sectionVisibleCards = 0;
            sectionCards.forEach(c => {
                if (c.style.display !== 'none') sectionVisibleCards++;
            });

            if (sectionVisibleCards > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Show/hide empty state message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    // Category Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'all';
            filterFaculty();
        });
    });

    // Real-time Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            filterFaculty();
        });
    }
}
