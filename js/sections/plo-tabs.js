export function initPloTabs() {
    const tabButtons = document.querySelectorAll('.cped-outcomes-section .tab');
    const tabContainers = document.querySelectorAll('.cped-outcomes-section .plo-grid-container');
    const matrixContainers = document.querySelectorAll('.cped-outcomes-section .matrix-container-wrapper');

    if (tabButtons.length > 0) {
        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('active')) return;

                const activeBtn = document.querySelector('.cped-outcomes-section .tab.active');
                const activeTab = document.querySelector('.cped-outcomes-section .plo-grid-container.active');
                const activeMatrix = document.querySelector('.cped-outcomes-section .matrix-container-wrapper.active');

                // 1. Swap active class on buttons immediately
                if (activeBtn) activeBtn.classList.remove('active');
                btn.classList.add('active');

                // 2. Fade out active content cards and matrix
                if (activeTab) activeTab.classList.remove('fade-in');
                if (activeMatrix) activeMatrix.classList.remove('fade-in');

                // 3. Wait for the 150ms opacity transition, then display: none and fade in new content
                setTimeout(() => {
                    if (activeTab) activeTab.classList.remove('active');
                    if (activeMatrix) activeMatrix.classList.remove('active');

                    const newTab = tabContainers[index];
                    const newMatrix = matrixContainers[index];

                    if (newTab) {
                        newTab.classList.add('active');
                        // Force layout reflow
                        newTab.offsetHeight;
                        newTab.classList.add('fade-in');
                    }
                    if (newMatrix) {
                        newMatrix.classList.add('active');
                        // Force layout reflow
                        newMatrix.offsetHeight;
                        newMatrix.classList.add('fade-in');
                    }
                }, 150); // Matches the 150ms transition duration
            });
        });
    }
}
