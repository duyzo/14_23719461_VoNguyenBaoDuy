import { loginUser } from './auth.js';

// Show message function
function showMessage(message, type = 'error') {
    // Remove existing messages
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new message
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
    alertDiv.textContent = message;
    
    // Add to page
    const form = document.getElementById('loginForm');
    form.insertAdjacentElement('afterend', alertDiv);
}

// Handle login form
function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const rememberMe = form.rememberMe?.checked;
    
    // Basic validation
    if (!email || !password) {
        showMessage('Vui lòng điền đầy đủ thông tin');
        return;
    }
    
    try {
        // Attempt login
        if (loginUser(email, password)) {
            // Save credentials if remember me is checked
            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', password);
            }
            
            // Show success message
            showMessage('Đăng nhập thành công!', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage('Email hoặc mật khẩu không chính xác');
        }
    } catch (error) {
        showMessage(error.message);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    // Add form submit handler
    form.addEventListener('submit', handleLogin);
    
    // Fill saved credentials if they exist
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail && savedPassword) {
        const emailInput = form.querySelector('#email');
        const passwordInput = form.querySelector('#password');
        const rememberMeInput = form.querySelector('#rememberMe');
        
        if (emailInput && passwordInput && rememberMeInput) {
            emailInput.value = savedEmail;
            passwordInput.value = savedPassword;
            rememberMeInput.checked = true;
        }
    }
    
    // Clear any existing login status to prevent redirect loops
    if (window.location.pathname.includes('login.html')) {
        localStorage.removeItem('currentUser');
    }
});