# Tạo file mp3 tiếng Việt tự động

Script đọc đúng nội dung chữ mà app đang kể (cả Kể nhanh và Kể đầy đủ), gọi giọng đọc Microsoft Edge và ghi mp3 cùng `manifest.json` vào `public/audio/`.

## Chạy lần đầu (PowerShell, trong thư mục dự án)
```powershell
pip install edge-tts
node scripts/gen-audio.mjs
```
Sẽ ra 6 file mp3 tiếng Việt (3 địa điểm × 2 chế độ). Cần Internet khi chạy. Sau đó `npm run dev`, mở người kể chuyện và dòng chân trang sẽ báo đang phát file thuyết minh.

Nếu `pip` không nhận, thử `py -m pip install edge-tts`.

## Tùy chọn
| Lệnh | Tác dụng |
|---|---|
| `--only hue` | chỉ một địa điểm (`ha-noi`, `hue`, `tp-hcm`) |
| `--mode short` | chỉ một chế độ (`short`, `full`) |
| `--lang vi,en,zh,ko` | thêm ngôn ngữ khác |
| `--rate=-10%` | đọc chậm hơn (dạng `--rate=-10%`, có dấu `=`) |
| `--dry` | chỉ kiểm tra, không tạo mp3 |

Chạy lại nhiều lần được: manifest tự gộp, file cũ bị ghi đè.

## Lưu ý
- Nghe thử từng file. Tên riêng hoặc số có thể bị đọc lệch, khi đó sửa chữ trong `content.js` rồi tạo lại.
- Muốn giọng người thật thì thu và đặt đúng tên `<địa điểm>-<ngôn ngữ>-<chế độ>.mp3` ở cùng thư mục; manifest giữ nguyên định dạng cũ.
- Sau khi tạo, commit cả `public/audio/` rồi push để Vercel có file.
