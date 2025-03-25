import { formatCurrency } from './utils.js';

// Show toast notification
export function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Giỏ Hàng</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Update cart display
export function updateCartDisplay(cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cartItems');
    const emptyCartElement = document.getElementById('emptyCart');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkoutBtn');
    const cartCountElement = document.getElementById('cartCount');

    // Update cart count badge
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }

    if (cartItemsElement) {
        if (cart.length === 0) {
            if (emptyCartElement) emptyCartElement.style.display = 'block';
            if (cartItemsElement) cartItemsElement.innerHTML = '';
            if (checkoutButton) checkoutButton.disabled = true;
            // Reset all totals to 0
            if (subtotalElement) subtotalElement.textContent = formatCurrency(0);
            if (shippingElement) shippingElement.textContent = formatCurrency(0);
            if (totalElement) totalElement.textContent = formatCurrency(0);
            return;
        }

        if (emptyCartElement) emptyCartElement.style.display = 'none';
        if (checkoutButton) checkoutButton.disabled = false;

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

        // Update order summary
        const shipping = subtotal > 0 ? 30000 : 0;
        const total = subtotal + shipping;

        if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
        if (shippingElement) shippingElement.textContent = formatCurrency(shipping);
        if (totalElement) totalElement.textContent = formatCurrency(total);
    }
}