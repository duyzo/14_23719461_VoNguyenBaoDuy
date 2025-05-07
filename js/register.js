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
        const validateEmail = () => {
            const result = testEmailFormat(form.email.value.trim());
            result.isValid ? clearFieldError('email') : showFieldError(result.field, result.message);
        };

        const validatePassword = () => {
            const result = testPassword(form.password.value);
            result.isValid ? clearFieldError('password') : showFieldError(result.field, result.message);
            // Validate confirm password if it has value
            if (form.confirmPassword.value) {
                validateConfirmPassword();
            }
        };

        const validateConfirmPassword = () => {
            const result = testPasswordMatch(form.password.value, form.confirmPassword.value);
            result.isValid ? clearFieldError('confirmPassword') : showFieldError(result.field, result.message);
        };

        const validatePhone = () => {
            const result = testPhone(form.phone.value.trim());
            result.isValid ? clearFieldError('phone') : showFieldError(result.field, result.message);
        };

        const validateFirstName = () => {
            const result = testName(form.firstName.value.trim(), 'firstName');
            result.isValid ? clearFieldError('firstName') : showFieldError(result.field, result.message);
        };

        const validateLastName = () => {
            const result = testName(form.lastName.value.trim(), 'lastName');
            result.isValid ? clearFieldError('lastName') : showFieldError(result.field, result.message);
        };

        // Add input and blur listeners for all fields
        ['email', 'password', 'confirmPassword', 'phone', 'firstName', 'lastName'].forEach(field => {
            const input = form[field];
            const validateFunction = {
                email: validateEmail,
                password: validatePassword,
                confirmPassword: validateConfirmPassword,
                phone: validatePhone,
                firstName: validateFirstName,
                lastName: validateLastName
            }[field];

            input.addEventListener('input', validateFunction);
            input.addEventListener('blur', validateFunction);
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
