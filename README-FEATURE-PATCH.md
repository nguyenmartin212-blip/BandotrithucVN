# QR + PWA + Offline Audio patch

## Có gì mới
1. Deep link `?story=<destination-id>` mở thẳng Người kể chuyện.
2. 3 QR PNG cho Hà Nội / Huế / TP.HCM.
3. PWA cơ bản: manifest, service worker, icon 192/512/maskable.
4. Nút `Tải gói` trong StoryPlayer: lưu toàn bộ audio short/full của điểm + ngôn ngữ hiện tại vào Cache API.
5. Service worker ưu tiên audio đã cache khi offline.
6. Script:
   - `npm run audio:en-zh`
   - `npm run audio:dry-en-zh`
7. Checklist `AUDIO-NATIVE-REVIEW.md`.

## Audio EN/ZH
Máy tạo patch này không có `edge-tts`, nên MP3 EN/ZH không được giả vờ tạo sẵn.
Trên máy dự án:
```bash
py -m pip install edge-tts
npm run audio:en-zh
```
Sau đó `public/audio/manifest.json` sẽ tự được gộp thêm track EN/ZH.

## Test nhanh
```bash
npm install
npm run build
npm run dev
```
Mở:
- `/?story=ha-noi`
- `/?story=hue`
- `/?story=tp-hcm`

PWA/service worker nên test bằng `npm run build && npm run preview` hoặc bản deploy HTTPS.
