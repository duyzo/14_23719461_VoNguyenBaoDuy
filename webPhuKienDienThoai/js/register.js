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
        // Real-time validation
        form.email.addEventListener('blur', () => {
            const result = testEmailFormat(form.email.value.trim());
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
        });

        form.password.addEventListener('blur', () => {
            const result = testPassword(form.password.value);
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
        });

        form.confirmPassword.addEventListener('blur', () => {
            const result = testPasswordMatch(form.password.value, form.confirmPassword.value);
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
        });

        form.phone.addEventListener('blur', () => {
            const result = testPhone(form.phone.value.trim());
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
        });

        form.firstName.addEventListener('blur', () => {
            const result = testName(form.firstName.value.trim(), 'firstName');
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
        });

        form.lastName.addEventListener('blur', () => {
            const result = testName(form.lastName.value.trim(), 'lastName');
            if (!result.isValid) {
                showFieldError(result.field, result.message);
            }
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