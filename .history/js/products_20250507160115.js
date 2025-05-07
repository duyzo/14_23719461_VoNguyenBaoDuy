import { addToCart } from './cart.js';

// Product data
const products = {
    cases: [
        {
            name: 'Ốp lưng iPhone 15 Pro Max',
            price: 390000,
            image: '../img/op-lung-iphone-15-pro-max-slimcase-unique-with-magsafe-trong_1_.webp',
            description: 'Chống sốc cao cấp, bảo vệ toàn diện'
        },
        {
            name: 'Ốp lưng Samsung S24 Ultra',
            price: 350000,
            image: '../img/op-lung-samsung-galaxy-s24-ultra-araree-flexield_1_.webp',
            description: 'Silicon chống sốc, bảo vệ camera'
        },
        {
            name: 'Ốp lưng iPhone 15',
            price: 290000,
            image: '../img/op-lung-apple-iphone-15-chinh-hang-05_1.webp',
            description: 'Trong suốt, chống ố vàng'
        },
        {
            name: 'Ốp lưng Samsung Z Fold 5',
            price: 450000,
            image: '../img/zfol4.webp',
            description: 'Thiết kế 2 mảnh, bảo vệ hoàn hảo'
        },
        {
            name: 'Ốp lưng iPhone 14 Pro',
            price: 320000,
            image: '../img/oplung14.webp',
            description: 'Vân carbon, chống bám vân tay'
        },
        {
            name: 'Ốp lưng Samsung S24 ultra',
            price: 280000,
            image: '../img/op-lung-samsung-galaxy-s24-ultra-araree-flexield_1_.webp',
            description: 'Thiết kế trong suốt, chống sốc góc'
        },
        {
            name: 'Ốp lưng iPhone 13 Pro',
            price: 250000,
            image: '../img/oplung13.webp',
            description: 'Họa tiết độc đáo, chống va đập'
        },
        {
            name: 'Ốp lưng Samsung Z Flip 5',
            price: 420000,
            image: '../img/op-lung-samsung-galaxy-s24-ultra-araree-flexield_1_.webp',
            description: 'Thiết kế gập, bảo vệ 2 mặt'
        }
    ],
    chargers: [
        {
            name: 'Sạc Nhanh 65W GaN',
            price: 790000,
            image: '../img/sacnhanh20w.webp',
            description: 'Công nghệ GaN, sạc 3 thiết bị'
        },
        {
            name: 'Cáp Type-C to Lightning Braided',
            price: 390000,
            image: '../img/cap-type-c-to-lightning-baseus-crystal-shine-1-2m_1_.webp',
            description: 'Cáp bện, độ bền cao'
        },
        {
            name: 'Sạc Không Dây MagSafe 15W',
            price: 890000,
            image: '../img/dekhongday.webp',
            description: 'Sạc nhanh không dây, nam châm'
        },
        {
            name: 'Cáp Type-C 100W',
            price: 290000,
            image: '../img/cap-sac-nhanh-baseus-cafule-pd-2-0-100w-type-c-to-type-c-20v-5a-2m-2.webp',
            description: 'Hỗ trợ sạc laptop, truyền dữ liệu'
        },
        {
            name: 'Sạc Ô tô 45W',
            price: 490000,
            image: '../img/sac-doi-o-to-samsung-l5300-2-cong-45w-15w-4.webp',
            description: 'Sạc nhanh trên xe hơi, 2 cổng'
        },
        {
            name: 'Cáp 3 in 1',
            price: 350000,
            image: '../img/cap-3-in-1-baseus-bright-mirror-2-series-retractable-3-5a-1-1m_2_.webp',
            description: 'Lightning/Type-C/Micro USB'
        },
        {
            name: 'Pin Sạc Dự Phòng 20000mAh',
            price: 690000,
            image: '../img/pin-sac-du-phong-anker-zolo-a1689-20000mah-30w_1_.webp',
            description: 'Sạc nhanh PD 20W, màn hình LED'
        },
        {
            name: 'Đế Sạc Không Dây Đa Năng',
            price: 590000,
            image: '../img/hub-sac-khong-day-da-nang-mophie-universal-3-in-1_1_.webp',
            description: 'Sạc điện thoại, tai nghe, đồng hồ'
        }
    ],
    protection: [
        {
            name: 'Kính cường lực iPhone 15 Pro Max',
            price: 250000,
            image: '../img/kinh-cuong-luc-samsung-galaxy-s25-ultra-mipow-premium-full_2_.webp',
            description: 'Độ cứng 9H, chống xước toàn diện'
        },
        {
            name: 'Dán màn hình Samsung S24 Ultra',
            price: 290000,
            image: '../img/cuongluc.webp',
            description: 'Công nghệ TPU tự liền, chống vân tay'
        },
        {
            name: 'Kính cường lực iPhone 15',
            price: 200000,
            image: '../img/danchongvadap.webp',
            description: 'Full màn hình, chống nhìn trộm'
        },
        {
            name: 'Dán camera Samsung Z Fold 5',
            price: 150000,
            image: '../img/bao-da-samsung-galaxy-s24-ultra-thong-minh-1.webp',
            description: 'Bảo vệ camera, chống xước lens'
        },
        {
            name: 'Kính cường lực iPhone 14 Pro',
            price: 220000,
            image: '../img/kinh-cuong-luc-samsung-galaxy-s25-ultra-mipow-premium-full_2_.webp',
            description: 'Chống va đập, chống dấu vân tay'
        },
        {
            name: 'Dán màn hình Samsung S23',
            price: 280000,
            image: '../img/cuongluc.webp',
            description: 'Độ trong suốt cao, dễ dán'
        },
        {
            name: 'Kính cường lực iPhone 13',
            price: 180000,
            image: '../img/danchongvadap.webp',
            description: 'Chống ánh sáng xanh, bảo vệ mắt'
        },
        {
            name: 'Dán full máy Z Flip 5',
            price: 350000,
            image: '../img/bao-da-samsung-galaxy-s24-ultra-thong-minh-1.webp',
            description: 'Bảo vệ toàn bộ máy, chống trầy'
        }
    ],
    accessories: [
        {
            name: 'Hub USB Type-C 11-in-1',
            price: 990000,
            image: '../img/hub-chuyen-doi-baseus-spacemate-series-11-in-1-dung-cho-win_1_.webp',
            description: 'Hub đa năng, hỗ trợ nhiều cổng kết nối'
        },
        {
            name: 'Hub USB-C to HDMI 4K',
            price: 590000,
            image: '../img/hub-chuyen-doi-ugreen-usb-c-to-usb-a-2-0-usb-a-3-0-hdmi-pd-ho-tro-4k-15495_1_.webp',
            description: 'Hỗ trợ xuất hình ảnh 4K, sạc PD'
        },
        {
            name: 'Ví da iPhone MagSafe',
            price: 590000,
            image: '../img/vi-da-iphone-magsafe.webp',
            description: 'Bảo vệ thẻ, nam châm MagSafe'
        },
        {
            name: 'Hub USB 4-in-1',
            price: 490000,
            image: '../img/hub4in1.webp',
            description: 'Mở rộng cổng kết nối, nhỏ gọn'
        },
        {
            name: 'Pin dự phòng MagSafe',
            price: 1290000,
            image: '../img/pin-du-phong-ugreen-magnetic-pb561-10-000mah-20w.1.webp',
            description: 'Nam châm MagSafe, sạc nhanh 20W'
        },
        {
            name: 'Pin dự phòng 20000mAh',
            price: 990000,
            image: '../img/pin-sac-du-phong-anker-zolo-a1689-20000mah-30w_1_.webp',
            description: 'Dung lượng lớn, sạc nhanh 30W'
        },
        {
            name: 'Pin Golf 10000mAh',
            price: 490000,
            image: '../img/pin-sac-du-phong-golf-g80c-10000mah_3_.webp',
            description: 'Nhỏ gọn, sạc nhanh 20W' 
        },
        {
            name: 'Hub đa năng 3-in-1',
            price: 790000,
            image: '../img/hub-sac-khong-day-da-nang-mophie-universal-3-in-1_1_.webp',
            description: 'Bàn phím rời, chân đế linh hoạt'
        }
    ]
};

let productModal;
let currentProduct;

// Create product card HTML
function createProductCard(product) {
    const id = Date.now() + Math.random(); // Generate unique ID when creating card
    return `
        <div class="col-md-6 col-lg-3">
            <div class="card product-card h-100" data-product-id="${id}">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted">${product.description}</p>
                    <p class="text-primary fw-bold">${product.price.toLocaleString('vi-VN')}₫</p>
                    <button class="btn btn-primary w-100 add-to-cart">Thêm Vào Giỏ</button>
                </div>
            </div>
        </div>
    `;
}

// Hiển thị modal chi tiết sản phẩm
function showProductDetail(product, productId) {
    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    // Lưu sản phẩm hiện tại
    currentProduct = {
        ...product,
        id: productId
    };

    // Cập nhật nội dung modal
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `${product.price.toLocaleString('vi-VN')}₫`;

    // Hiển thị modal
    productModal = new bootstrap.Modal(modal);
    productModal.show();
}

// Initialize products page
function initProductsPage() {
    // Load products for each category
    Object.keys(products).forEach(category => {
        const container = document.querySelector(`#${category} .row`);
        if (container) {
            // Load products
            container.innerHTML = products[category]
                .map(product => createProductCard(product))
                .join('');

            // Add click event listener to the container for event delegation
            container.addEventListener('click', (e) => {
                const addToCartBtn = e.target.closest('.add-to-cart');
                const productImage = e.target.closest('.product-image');
                const card = e.target.closest('.product-card');

                if (!card) return;

                const productId = card.dataset.productId;
                const product = {
                    name: card.querySelector('.card-title').textContent,
