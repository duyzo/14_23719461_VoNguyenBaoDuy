# WebPhuKienDienThoai - Website Bán Phụ Kiện Điện Thoại

## Giới Thiệu Dự Án

### Mục Đích
- Xây dựng website bán phụ kiện điện thoại trực tuyến với giao diện thân thiện, dễ sử dụng
- Cung cấp nền tảng mua sắm phụ kiện điện thoại thuận tiện cho người dùng
- Giúp khách hàng dễ dàng tìm kiếm và mua sắm các phụ kiện điện thoại chất lượng

### Công Nghệ Sử Dụng
- **HTML5** - Tạo cấu trúc và nội dung trang web
- **CSS3** - Thiết kế giao diện người dùng
- **Bootstrap 5** - Framework CSS cho thiết kế responsive
- **JavaScript** - Xử lý tương tác người dùng và validation
- **Font Awesome** - Thư viện icon

## Phân Tích Hệ Thống

### Các Tính Năng Chính
1. **Quản lý sản phẩm**
   - Hiển thị danh sách sản phẩm theo danh mục
   - Chi tiết sản phẩm với hình ảnh, giá cả, mô tả
   
2. **Giỏ hàng**
   - Thêm/xóa sản phẩm
   - Cập nhật số lượng
   - Tính tổng tiền

3. **Tài khoản người dùng**
   - Đăng ký
   - Đăng nhập
   - Quản lý thông tin cá nhân

### Cấu Trúc Website
![Sitemap](img/sitemap.png)

Website được tổ chức theo cấu trúc phân cấp:
- **Trang chủ**: Hiển thị sản phẩm nổi bật, danh mục sản phẩm
- **Trang sản phẩm**: Danh sách sản phẩm theo danh mục
  - Ốp lưng
  - Sạc & Cáp
  - Kính cường lực
  - Phụ kiện khác
- **Trang giỏ hàng**: Quản lý sản phẩm đã chọn
- **Trang đăng nhập/đăng ký**: Quản lý tài khoản người dùng
- **Trang giới thiệu**: Thông tin về cửa hàng

## Hướng Dẫn Cài Đặt

1. Clone repository
2. Mở file index.html trong trình duyệt web
3. Không cần cài đặt thêm dependencies vì project sử dụng CDN cho các thư viện

## Cấu Trúc Thư Mục

```
webPhuKienDienThoai/
│
├── css/
│   ├── bootstrap.min.css
│   └── styles.css
│
├── js/
│   ├── auth.js
│   ├── cart.js
│   ├── products.js
│   ├── validation.js
│   └── ...
│
├── html/
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   └── ...
│
└── img/
    └── [images files]
```

## Kết Quả Đạt Được
- Xây dựng thành công website bán phụ kiện điện thoại với giao diện người dùng thân thiện
- Tích hợp các tính năng cơ bản như quản lý giỏ hàng, đăng ký/đăng nhập
- Thiết kế responsive, tương thích với nhiều thiết bị

## Hạn Chế
- Chưa có backend và cơ sở dữ liệu
- Chưa có chức năng thanh toán trực tuyến
- Cần bổ sung thêm các tính năng admin

## Hướng Phát Triển
- Tích hợp backend với Node.js và MongoDB
- Thêm tính năng thanh toán online
- Xây dựng trang admin quản lý sản phẩm và đơn hàng
- Thêm tính năng tìm kiếm và lọc sản phẩm
- Tích hợp đánh giá và bình luận sản phẩm

## Tài Liệu Tham Khảo

### Thư Viện và Framework
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)

### Website Tham Khảo
- W3Schools - https://www.w3schools.com
- MDN Web Docs - https://developer.mozilla.org
