// Handle image loading
export function initImageLoading() {
    const images = document.querySelectorAll('.product-card img');
    images.forEach(img => {
        if (img.complete) {
            // Image is already loaded, add class immediately
            img.classList.add('loaded');
        } else {
            // Image is not loaded yet, wait for load event
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}