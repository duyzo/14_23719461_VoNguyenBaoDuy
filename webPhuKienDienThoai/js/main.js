import { isLoggedIn, getCurrentUser, logoutUser } from './auth.js';
import { initCart } from './cart.js';

// Update navigation based on login status
function updateNavigation() {
    const loginBtn = document.querySelector('a[href="login.html"]');
    const registerBtn = document.querySelector('a[href="register.html"]');
    const user = getCurrentUser();
    
    if (isLoggedIn()) {
        // User is logged in
        if (loginBtn) {
            loginBtn.textContent = 'Đăng Xuất';
            loginBtn.href = '#';
            loginBtn.onclick = (e) => {
                e.preventDefault();
                logoutUser();
                window.location.href = 'login.html';
            };
        }
        
        if (registerBtn) {
            registerBtn.style.display = 'none';
        }
        
    } else {
        // User is not logged in
        if (loginBtn) {
            loginBtn.textContent = 'Đăng Nhập';
            loginBtn.href = 'login.html';
            loginBtn.onclick = null;
        }
        
        if (registerBtn) {
            registerBtn.style.display = 'inline-block';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize cart on non-products pages
    if (!window.location.pathname.includes('products.html')) {
        initCart();
    }
    
    // Update navigation
    updateNavigation();
    
    // Handle category cards if they exist
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    });
});