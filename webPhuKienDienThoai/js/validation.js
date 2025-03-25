// Regular expressions for validation
const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(0|\+84)[1-9]\d{8}$/,
    password: /.{6,}/ // At least 6 characters
};

// Test individual fields
export function testEmailFormat(email) {
    return {
        field: 'email',
        isValid: PATTERNS.email.test(email),
        message: 'Email phải có định dạng hợp lệ (example@domain.com)'
    };
}

export function testPassword(password) {
    return {
        field: 'password',
        isValid: PATTERNS.password.test(password),
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
    };
}

export function testPasswordMatch(password, confirmPassword) {
    return {
        field: 'confirmPassword',
        isValid: password === confirmPassword && password.length > 0,
        message: 'Mật khẩu xác nhận không khớp'
    };
}

export function testPhone(phone) {
    return {
        field: 'phone',
        isValid: PATTERNS.phone.test(phone),
        message: 'Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)'
    };
}

export function testName(name, fieldName) {
    return {
        field: fieldName,
        isValid: name.trim().length > 0,
        message: `${fieldName === 'firstName' ? 'Họ' : 'Tên'} không được để trống`
    };
}

// Test entire form
export function testRegisterForm(formData) {
    const tests = [
        testEmailFormat(formData.email),
        testPassword(formData.password),
        testPasswordMatch(formData.password, formData.confirmPassword),
        testPhone(formData.phone),
        testName(formData.firstName, 'firstName'),
        testName(formData.lastName, 'lastName')
    ];

    const failedTests = tests.filter(test => !test.isValid);
    
    return {
        isValid: failedTests.length === 0,
        errors: failedTests
    };
}

// Helper function to display field errors
export function showFieldError(field, message) {
    const input = document.querySelector(`[name="${field}"]`);
    if (input) {
        input.classList.add('is-invalid');
        
        // Create or update error message
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            input.insertAdjacentElement('afterend', errorDiv);
        }
        errorDiv.textContent = message;
    }
}

// Helper function to clear field errors
export function clearFieldError(field) {
    const input = document.querySelector(`[name="${field}"]`);
    if (input) {
        input.classList.remove('is-invalid');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.remove();
        }
    }
}

// Helper function to clear all field errors
export function clearAllFieldErrors() {
    const fields = ['email', 'password', 'confirmPassword', 'firstName', 'lastName', 'phone'];
    fields.forEach(clearFieldError);
}