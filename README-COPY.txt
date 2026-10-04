MOBILE RESPONSIVE PATCH

1. Copy toàn bộ nội dung folder này.
2. Paste vào root project ban-do-tri-thuc hiện tại.
3. Chọn Replace khi Windows hỏi ghi đè.
4. Chạy: npm run dev
5. Kiểm tra mobile bằng Chrome DevTools hoặc điện thoại thật.

Patch chỉ thay:
- src/App.jsx
- src/index.css

Không thay package.json, data, hooks, MapView, DetailPanel hay logic hiện có.

Mobile mới:
- Header gọn
- Search + điểm đến dạng strip ngang
- Map-first chiếm phần lớn viewport
- DetailPanel thành bottom sheet
- Bottom navigation cố định
- Modal/lịch trình responsive hơn
