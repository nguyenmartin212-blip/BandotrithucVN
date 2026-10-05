STORY AUDIO CONTEXTUAL PATCH

Mục tiêu:
- Bỏ trải nghiệm kể chuyện rời rạc/ngẫu nhiên.
- Nút "Kể chuyện về <địa điểm>" nằm ngay dưới "Tạo lịch trình" trong DetailPanel.
- Story/audio luôn nhận đúng `dest` đang được user chọn.
- Khi đổi địa điểm: đóng Storyteller + dừng audio cũ.
- Sửa ranking storyteller để các layer ngoài mode không bị xếp nhầm lên đầu.

File trong patch:
- src/components/DetailPanel.jsx
- src/components/AIStoryteller.jsx
- src/lib/storyteller.js
- src/index.css

Cách cập nhật:
1. Giải nén ZIP.
2. Copy thư mục `src` vào root dự án hiện tại.
3. Chọn Replace khi Windows hỏi.
4. Chạy `npm run dev`.
5. Test: Hà Nội -> kể chuyện, Huế -> kể chuyện, TP.HCM -> kể chuyện.

Patch không sửa App.jsx, LandingPage, GlobeExplorer, TravelTransition hay logic custom lịch trình.
