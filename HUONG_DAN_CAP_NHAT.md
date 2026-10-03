# Cập nhật Bản đồ tri thức du lịch Việt Nam (v2)

## Cách cài
1. Giải nén tệp zip ĐÈ lên thư mục dự án (ban-do-tri-thuc). Các tệp sẽ ghi đè:
   - index.html
   - src/App.jsx, src/main.jsx, src/index.css, src/i18n.js
   - src/data/content.js (toàn bộ dữ liệu 3 địa danh, 4 ngôn ngữ)
   - src/lib/itinerary.js (logic lịch trình)
   - src/hooks/*, src/components/*
   - public/data/vietnam.geojson (bản đồ vector tự chủ)
2. Không cần cài thêm thư viện (vẫn dùng leaflet và react-leaflet đã có).
3. Tắt server (Ctrl + C) rồi chạy lại: npm run dev. Tải lại trang bằng Ctrl + Shift + R.
4. Đẩy lên Vercel: git add . ; git commit -m "v2" ; git push

## Các tệp cũ không còn dùng (có thể xóa)
- src/components/DestinationList.jsx, LayerFilter.jsx, SearchBox.jsx
- public/data/data.json (dữ liệu nay nằm trong src/data/content.js)

## Muốn sửa nội dung ở đâu
- Thêm/sửa địa danh, lớp tri thức, địa điểm lịch trình: src/data/content.js
- Câu chữ giao diện 4 ngôn ngữ: src/i18n.js
- Ảnh minh họa: tự lấy từ ảnh đại diện bài Wikipedia theo trường "wiki" của từng mục.
