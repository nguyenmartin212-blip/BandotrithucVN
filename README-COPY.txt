DETAILPANEL IMAGE FIX PATCH

Mục tiêu:
- Sửa lỗi 3 visual card (Di sản / Văn hóa / Ẩm thực) chỉ hiện gradient mà không có ảnh.
- Không đụng App.jsx, LandingPage, Globe Explorer, Flight Transition hay logic custom lịch trình.
- Áp dụng cho cả Hà Nội, Huế và TP. Hồ Chí Minh.

File thay đổi:
1. src/components/WikiImage.jsx
   - Chuyển sang MediaWiki Action API có CORS origin=*.
   - Thử Wikipedia EN -> VI -> search -> Wikimedia Commons.
   - Có cache, thumbnail kích thước phù hợp và source link.

2. src/components/DetailPanel.jsx
   - Mapping title ảnh chính xác cho 3 card của 3 điểm đến.
   - Ảnh trong phần "Nhìn nhanh điểm đến" load ưu tiên (eager).

3. src/index.css
   - Giữ layout hiện tại.
   - Tinh chỉnh crop/contrast/hover của ảnh, scope trong .app .detail-gallery.

Cách dùng:
- Copy thư mục src trong patch này vào root project hiện tại.
- Chọn Replace khi Windows hỏi.
- Chạy: npm run dev
- Hard refresh trình duyệt: Ctrl + Shift + R

Lưu ý:
Ảnh vẫn được lấy từ Wikipedia/Wikimedia khi runtime nên cần Internet. Nếu một bài Wikipedia không có ảnh đại diện, component tự tìm ảnh liên quan trên Wikipedia/Wikimedia Commons thay vì để card trống.
