export function initPloTabs() {
    const tabButtons = document.querySelectorAll('.cped-outcomes-section .tab');
    const tabContainers = document.querySelectorAll('.cped-outcomes-section .plo-grid-container');
    const matrixContainers = document.querySelectorAll('.cped-outcomes-section .matrix-container-wrapper');

    if (tabButtons.length > 0) {
        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContainers.forEach(c => c.classList.remove('active'));
                matrixContainers.forEach(m => m.classList.remove('active'));
                
                btn.classList.add('active');
                if (tabContainers[index]) {
                    tabContainers[index].classList.add('active');
                }
                if (matrixContainers[index]) {
                    matrixContainers[index].classList.add('active');
                }
            });
        });
    }
}
