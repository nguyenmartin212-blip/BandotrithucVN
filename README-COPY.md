# Esri World Topographic + Satellite patch

Áp dụng trên project đã có hai view Bản đồ/Vệ tinh (sau patch CARTO Positron).

## File thay đổi
- `src/components/MapView.jsx` — chỉ đổi tile view **Bản đồ** từ CARTO Positron sang Esri World Topographic Map.

Giữ nguyên:
- View **Vệ tinh**: Esri World Imagery.
- Nút chuyển view trong `App.jsx`.
- Camera `flyTo` khi chọn thành phố (zoom 12), zoom tiếp tối đa 19, marker, GeoJSON, và các CSS hiện có.

## Áp dụng
1. Giải nén ZIP, chép thư mục `src` vào root repo và chọn Replace.
2. `npm run dev` rồi tải lại trang bằng Ctrl+Shift+R.
3. Không cần `VITE_CARTO_BASEMAP_KEY`; có thể xóa biến này khỏi `.env` nếu đã tạo.

Lưu ý: URL tile công khai của Esri vẫn chịu điều khoản sử dụng, hạn mức và yêu cầu attribution của Esri. Cần kiểm tra điều khoản phù hợp trước khi triển khai công khai/thương mại. Nội dung đường biên lãnh thổ từ basemap bên thứ ba cần được rà soát riêng; overlay của ứng dụng không đảm bảo mọi chi tiết nền bản đồ đáp ứng yêu cầu pháp lý.
