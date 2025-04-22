import { formatCurrency } from './utils.js';
import { getCurrentUser } from './auth.js';

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Fill shipping information for logged in user
function fillShippingInfo() {
    const user = getCurrentUser();
    if (!user) return;

    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        // Fill user information
        const fields = {
            'fullName': user.name,
            'phone': user.phone,
            'email': user.email
        };

        // Auto-fill only user information fields
        Object.keys(fields).forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input && fields[fieldId]) {
                input.value = fields[fieldId];
                // Make pre-filled fields readonly
                input.readOnly = true;
                input.classList.add('bg-light');
            }
        });
    }
}

// Show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Giỏ Hàng</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add to cart
export function addToCart(product) {
    // Check if product already exists by name
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        // If product exists, increment quantity
        existingItem.quantity += 1;
        showToast('Đã tăng số lượng sản phẩm trong giỏ hàng!');
    } else {
        // If product is new, add with quantity 1
        cart.push({
            ...product,
            id: Date.now(),
            quantity: 1
        });
        showToast('Đã thêm sản phẩm vào giỏ hàng!');
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// Update quantity
export function updateQuantity(id, change) {
    const item = cart.find(item => item.id == id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

// Remove item
export function removeItem(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng!');
}

// Apply promo code
function applyPromoCode(code) {
    const PROMO_CODES = {
        'TBD': 0.1 // 10% discount
    };
    
    const discount = PROMO_CODES[code.toUpperCase()];
    if (discount) {
        localStorage.setItem('promoCode', code.toUpperCase());
        updateCartDisplay();
        return true;
    }
    return false;
}

// Update cart display
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cartItems');
    const emptyCartElement = document.getElementById('emptyCart');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const discountContainer = discountElement?.parentElement;
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkoutBtn');

    // Handle empty cart
    if (cart.length === 0) {
        if (emptyCartElement) emptyCartElement.style.display = 'block';
        if (cartItemsElement) cartItemsElement.innerHTML = '';
        if (checkoutButton) checkoutButton.disabled = true;
        
        // Reset totals
        if (subtotalElement) subtotalElement.textContent = formatCurrency(0);
        if (shippingElement) shippingElement.textContent = formatCurrency(0);
        if (totalElement) totalElement.textContent = formatCurrency(0);
        if (discountContainer) discountContainer.style.display = 'none';
        return;
    }

    // Show cart items
    if (emptyCartElement) emptyCartElement.style.display = 'none';
    if (checkoutButton) checkoutButton.disabled = false;

    if (cartItemsElement) {
        let subtotal = 0;
        cartItemsElement.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return `
                <div class="d-flex align-items-center mb-4">
                    <img src="${item.image}" class="me-4" alt="${item.name}" style="width: 100px;">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="text-muted mb-2">${formatCurrency(item.price)}</p>
                        <div class="quantity-control">
                            <button type="button" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button type="button" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <div class="text-end ms-4">
                        <p class="mb-0 fw-bold">${formatCurrency(itemTotal)}</p>
                        <button class="remove-item" onclick="removeItem('${item.id}')">
                            <i class="bi bi-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Apply promo code if exists
        const promoCode = localStorage.getItem('promoCode');
        const discount = promoCode === 'TBD' ? subtotal * 0.1 : 0;

        // Calculate totals
        const shipping = subtotal > 0 ? 30000 : 0;
        const total = subtotal - discount + shipping;

        // Update summary
        if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
        if (shippingElement) shippingElement.textContent = formatCurrency(shipping);
        if (totalElement) totalElement.textContent = formatCurrency(total);

        // Update discount display
        if (discountElement && discountContainer) {
            if (discount > 0) {
                discountElement.textContent = `- ${formatCurrency(discount)}`;
                discountContainer.style.display = 'flex';
            } else {
                discountContainer.style.display = 'none';
            }
        }
    }

    // Set up promo code button
    const promoCodeInput = document.getElementById('promoCode');
    const applyPromoButton = document.querySelector('button[type="button"].btn.btn-outline-primary');
    
    if (promoCodeInput && applyPromoButton) {
        applyPromoButton.onclick = () => {
            const code = promoCodeInput.value.trim();
            if (applyPromoCode(code)) {
                showToast('Mã giảm giá đã được áp dụng!');
                promoCodeInput.classList.remove('is-invalid');
            } else {
                showToast('Mã giảm giá không hợp lệ!');
                promoCodeInput.classList.add('is-invalid');
            }
        };
    }
}

// Validate shipping form
function validateShippingForm() {
    const form = document.getElementById('shippingForm');
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
        }
    }

    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }
    }

    return isValid;
}

// Process checkout
function processCheckout() {
    if (!validateShippingForm()) {
        showToast('Vui lòng điền đầy đủ thông tin giao hàng!');
        return;
    }

    // Show success modal
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Đặt Hàng Thành Công</h5>
                    <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
                </div>
                <div class="modal-body text-center">
                    <i class="bi bi-check-circle text-success" style="font-size: 4rem;"></i>
                    <p class="mt-3">Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="window.location.href='products.html'">
                        Tiếp Tục Mua Sắm
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Add modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);

    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// Initialize cart
export function initCart() {
    // Add to cart buttons
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            const card = button.closest('.product-card');
            const product = {
                name: card.querySelector('.card-title').textContent,
                price: parseInt(card.querySelector('.text-primary').textContent.replace(/[^\d]/g, '')),
                image: card.querySelector('img').src
            };
            addToCart(product);
        });
    });

    // Make functions available globally
    window.updateQuantity = updateQuantity;
    window.removeItem = removeItem;

    // Initial cart display
    updateCartCount();
    updateCartDisplay();

    // Fill shipping info if on cart page
    if (document.getElementById('shippingForm')) {
        fillShippingInfo();
        
        // Add checkout button handler
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', processCheckout);
        }
    }
}