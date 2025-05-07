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
            image: '../img/op-lung-samsung-galaxy-s25-ultra-silicone-chinh-hang.1.webp',
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
            name: 'Tai nghe AirPods Pro Gen 3',
            price: 6990000,
            image: '../img/hub-chuyen-doi-baseus-spacemate-series-11-in-1-dung-cho-win_1_.webp',
            description: 'Chống ồn chủ động, âm thanh 3D'
        },
        {
            name: 'Galaxy Watch 6 Classic',
            price: 8990000,
            image: '../img/hub-chuyen-doi-ugreen-usb-c-to-usb-a-2-0-usb-a-3-0-hdmi-pd-ho-tro-4k-15495_1_.webp',
            description: 'Vòng xoay bezel, màn hình 1.4 inch'
        },
        {
            name: 'Apple Watch Series 9',
            price: 11990000,
            image: '../img/vi-da-iphone-magsafe.webp',
            description: 'Chip S9, màn hình Always-On'
        },
        {
            name: 'Galaxy Buds 3 Pro',
            price: 4990000,
            image: '../img/group_112_1_1.webp',
            description: 'Chống ồn AI, âm thanh 360'
        },
        {
            name: 'Apple Pencil Gen 2',
            price: 3290000,
            image: '../img/hub4in1.webp',
            description: 'Độ nhạy cao, sạc không dây'
        },
        {
            name: 'S Pen Fold Edition',
            price: 2990000,
            image: '../img/ip15.webp',
            description: 'Thiết kế cho Z Fold, 4096 cấp độ'
        },
        {
            name: 'Magic Keyboard iPad Pro',
            price: 8990000,
            image: '../img/hub-chuyen-doi-baseus-spacemate-series-11-in-1-dung-cho-win_1_.webp',
            description: 'Bàn phím backlit, trackpad'
        },
        {
            name: 'Galaxy Tab S9 Keyboard',
            price: 5990000,
            image: '../img/hub-chuyen-doi-ugreen-usb-c-to-usb-a-2-0-usb-a-3-0-hdmi-pd-ho-tro-4k-15495_1_.webp',
            description: 'Bàn phím rời, chân đế linh hoạt'
        }
    ]
};

// Create product card HTML
function createProductCard(product) {
    const id = Date.now() + Math.random(); // Generate unique ID when creating card
    return `
        <div class="col-md-6 col-lg-3">
            <div class="card product-card h-100" data-product-id="${id}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
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
                if (addToCartBtn) {
                    const card = addToCartBtn.closest('.product-card');
                    const product = {
                        id: card.dataset.productId,
                        name: card.querySelector('.card-title').textContent,
                        price: parseInt(card.querySelector('.text-primary').textContent.replace(/[^\d]/g, '')),
                        image: card.querySelector('.card-img-top').src
                    };
                    addToCart(product);
                }
            });
        }
    });

    // Initialize cart functionality
    initCart();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initProductsPage);
