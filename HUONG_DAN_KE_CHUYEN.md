# Tính năng "Người kể chuyện"

## Cài đặt
1. Giải nén, chép đè các file trong `src/` vào `src/` của dự án (giữ nguyên đường dẫn). Không đụng tới landing page hay animation.
2. Chạy lại `npm run dev`, kiểm tra, rồi `git add . && git commit -m "Them nguoi ke chuyen" && git push`.

## Cách hoạt động
- Lời kể được ghép từ các mục có nguồn trong `content.js` cộng với câu mở và kết viết tay trong `src/data/storyScripts.js`. Không bịa thêm dữ kiện.
- Hai chế độ: Kể nhanh (khoảng 1 phút) và Kể đầy đủ (khoảng 3 phút).
- Thứ tự phát: file mp3 trong manifest, nếu không có thì giọng đọc của trình duyệt, nếu không có nữa thì chữ tự chạy.
- Phím tắt: Esc đóng, Space dừng/phát, ← → đổi câu.

## Thêm file audio (đáp ứng yêu cầu thư mục audio)
1. Đặt file vào `public/audio/`, ví dụ `public/audio/hue-vi-short.mp3`.
2. Tạo `public/audio/manifest.json`:
```json
{ "tracks": [
  { "dest": "hue", "lang": "vi", "mode": "short", "src": "/audio/hue-vi-short.mp3" }
]}
```
`dest`: `ha-noi`, `hue`, `tp-hcm`. `lang`: `vi`, `en`, `zh`, `ko`. `mode`: `short` hoặc `full`.
File mp3 nên thu đúng nội dung chữ hiện trên màn hình, vì chữ chạy theo tỉ lệ thời gian của file.

## Thêm địa điểm mới
Thêm mục `open` và `close` (4 ngôn ngữ) cho id địa điểm trong `SCRIPTS` ở `storyScripts.js`.

## Lưu ý
- Giọng đọc phụ thuộc thiết bị. Tiếng Trung và Hàn có thể không có giọng trên một số máy, khi đó app hiện chữ chạy và ghi chú.
- Đây là Level 1 (ghép từ dữ liệu có nguồn), chưa phải AI sinh văn bản. Khi ghi vào hồ sơ thi, đừng nói là dùng LLM hay RAG.
- Bản dịch zh/ko nên nhờ người bản ngữ rà lại.
