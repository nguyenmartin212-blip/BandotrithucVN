# Restore Original Map Patch

Khôi phục đúng phong cách map schematic cũ mà bạn gửi:
- nền be/xanh nhạt tự dựng bằng GeoJSON;
- Việt Nam tô xanh;
- quốc gia lân cận màu be;
- nhãn biển/quốc gia;
- Hoàng Sa / Trường Sa dạng minh họa;
- marker Hà Nội / Huế / TP.HCM.

Giữ các nâng cấp mới:
- `Bản đồ | Vệ tinh` vẫn hoạt động;
- view Vệ tinh vẫn dùng Esri World Imagery;
- chọn thành phố vẫn `flyTo`;
- city zoom được giữ ở 12;
- maxZoom tăng lên 18 để không mất tính năng zoom mới.

Patch chỉ thay `src/components/MapView.jsx`.
Không đụng StoryPlayer, QR, PWA, offline audio hay Knowledge Connections.

Sau khi copy:
- đang dùng dev: `npm run dev`
- đang dùng preview: `npm run build` rồi `npm run preview`
