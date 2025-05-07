import { registerUser } from './auth.js';
import { 
    testRegisterForm,
    clearAllFieldErrors,
    showFieldError,
    testEmailFormat,
    testPassword,
    testPasswordMatch,
    testPhone,
    testName
} from './validation.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    
    if (form) {
        // Hàm validate cho từng trường
        const validateField = {
            email: (value) => testEmailFormat(value.trim()),
            password: (value) => testPassword(value),
            confirmPassword: (value, form) => testPasswordMatch(form.password.value, value),
            phone: (value) => testPhone(value.trim()),
            firstName: (value) => testName(value.trim(), 'firstName'),
            lastName: (value) => testName(value.trim(), 'lastName')
        };

        // Thêm validation cho mỗi trường
        ['email', 'password', 'confirmPassword', 'phone', 'firstName', 'lastName'].forEach(field => {
            const input = form[field];
            
            // Validate khi blur
            input.addEventListener('blur', () => {
                const result = validateField[field](input.value, form);
                if (!result.isValid) {
                    showFieldError(result.field, result.message);
                } else {
                    clearFieldError(result.field);
                }
            });

            // Validate realtime khi input
            input.addEventListener('input', () => {
                const result = validateField[field](input.value, form);
                if (result.isValid) {
                    clearFieldError(result.field);
                }
                
                // Kiểm tra đặc biệt cho password và confirmPassword
                if (field === 'password' && form.confirmPassword.value) {
                    const confirmResult = testPasswordMatch(input.value, form.confirmPassword.value);
                    if (confirmResult.isValid) {
                        clearFieldError('confirmPassword');
                    }
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                email: form.email.value.trim(),
                password: form.password.value,
                confirmPassword: form.confirmPassword.value,
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                phone: form.phone.value.trim()
            };
            
            // Clear previous errors
            clearAllFieldErrors();
            
            try {
                // Test entire form
                const validation = testRegisterForm(formData);
                
                if (!validation.isValid) {
                    // Show all validation errors
                    validation.errors.forEach(error => {
                        showFieldError(error.field, error.message);
                    });
                    throw new Error('Vui lòng kiểm tra lại thông tin đăng ký');
                }
                
                // Create user data
                const userData = {
                    email: formData.email,
                    password: formData.password,
                    name: `${formData.firstName} ${formData.lastName}`,
                    phone: formData.phone
                };
                
                // Register user
                registerUser(userData);
                
                // Show success message
                showMessage('Đăng ký thành công!', 'success');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                
            } catch (error) {
                showMessage(error.message, 'error');
            }
        });
    }
});

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.alert');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`;
    messageDiv.textContent = message;
    
    // Insert message after form
    const form = document.getElementById('registerForm');
    form.insertAdjacentElement('afterend', messageDiv);
}
