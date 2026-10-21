# Hợp đồng API dự kiến — v1

Trạng thái: bản thiết kế, chưa có endpoint chạy. Base URL `/api/v1`. Giai đoạn 1 chỉ triển khai catalog và health; các route cá nhân/auth/AI thuộc giai đoạn sau trong [thiết kế backend](README.md).

## Quy ước chung

- JSON UTF-8, camelCase. Thành công thường trả `{ "data": ... }`; ngoại lệ storyteller trả `{ "text": ..., "source": ... }` để tương thích consumer hiện tại. DELETE thành công trả 204 không body.
- ID nội dung là ID cũ; ID dữ liệu cá nhân mới là UUID. Timestamp ISO 8601 UTC, version số nguyên tăng dần.
- Public GET trả `ETag`, `Cache-Control: public, max-age=60, must-revalidate`; `If-None-Match` khớp trả 304 không body. ETag phải phân biệt representation và query; bootstrap gồm toàn bộ version nội dung liên quan.
- API cá nhân/auth/AI và mọi lỗi trả `Cache-Control: no-store`; ETag itinerary chỉ để kiểm soát cập nhật, không cho cache chung.
- Danh sách catalog dùng `limit` mặc định 20, tối đa 100; `cursor` opaque. Metadata `{ "nextCursor": null, "contentVersion": 1 }`. Sắp xếp mặc định ID tăng dần; search cũng giữ thứ tự ID. Cursor chứa filter và contentVersion; nội dung đổi giữa các trang trả 409 `CATALOG_CHANGED`, client tải lại từ đầu. Không có total bắt buộc.
- `q` trim, tối đa 100 ký tự; chuỗi rỗng coi như không lọc. Query/enum sai trả 400. Body JSON hợp lệ nhưng vi phạm nghiệp vụ trả 422. JSON hỏng trả 400; media type sai trả 415; vượt giới hạn body trả 413.
- Lỗi có cấu trúc: `{ "error": { "code": "VALIDATION_ERROR", "message": "Dữ liệu không hợp lệ", "details": [{ "path": "plan[0][0]", "code": "PLACE_NOT_IN_DESTINATION" }], "requestId": "..." } }`. Không trả stack trace, SQL hoặc secret.

## Catalog — giai đoạn 1

| Method / route | Mô tả |
| --- | --- |
| `GET /health/live` | 200 `{ "data": { "status": "ok" } }`; không query DB, no-store |
| `GET /health/ready` | 200 khi DB/schema sẵn sàng; 503 `NOT_READY` nếu chưa sẵn sàng, no-store |
| `GET /bootstrap` | Snapshot nội dung công khai đầy đủ để frontend/offline dùng; không phân trang ở MVP |
| `GET /layers` | 6 lớp cùng map bản dịch và thứ tự |
| `GET /destinations?region=north&q=ha&limit=20&cursor=...` | Danh sách tóm tắt; filter giao nhau, tìm theo tên điểm đến ở mọi ngôn ngữ |
| `GET /destinations/:destId` | Toàn bộ destination DTO gồm entries, places, sources |
| `GET /destinations/:destId/entries?layer=history&limit=20&cursor=...` | Bài tri thức; layer là một trong 6 lớp; sort theo position rồi ID |
| `GET /destinations/:destId/places?kind=heritage&limit=20&cursor=...` | Place; kind là một trong 4 loại; sort theo position rồi ID |
| `GET /destinations/:destId/audio?lang=vi&mode=short` | Danh sách track đúng content version; không có track trả mảng rỗng |
| `GET /search?q=hue&lang=vi&limit=20&cursor=...` | Tìm name/tagline/intro của destination, title/body của entry, name/note của place; chỉ bản dịch lang yêu cầu, mặc định vi |

Destination không tồn tại hoặc chưa publish trả 404 `DESTINATION_NOT_FOUND`. Locale ngoài `vi/en/zh/ko` trả 400. Search trả hit `{ type, id, destId, title, snippet }`, sắp theo `(type, id)`, không tự xếp hạng độ phù hợp ở MVP. `type` thuộc `destination/entry/place`, snippet plain text tối đa 240 ký tự.

### Bootstrap DTO

```json
{
  "data": {
    "schemaVersion": 1,
    "contentVersion": 1,
    "publishedAt": "2026-10-21T00:00:00.000Z",
    "languages": ["vi", "en", "zh", "ko"],
    "layers": [],
    "regions": {},
    "destinations": [],
    "knowledgeRelations": {},
    "storyScripts": {},
    "storyConnectors": {},
    "shortSentences": {},
    "audioManifest": { "tracks": [] }
  }
}
```

Mảng/object rỗng ở ví dụ chỉ là placeholder cấu trúc. Response thực phải có dữ liệu seed:

- `layers`, `regions`, `destinations`: giữ cấu trúc tương ứng `LAYERS`, `REGIONS`, `DESTINATIONS` trong `src/data/content.js`. Mỗi destination có `id, region, coords, hero, name, tagline, intro, bestMonths, bestNote, suggestedDays, daysRange, sources, entries, places` cùng `version`.
- Mỗi entry có `id, layer, wiki, title, body`; place có `id, kind, hours, slot, zone, must, name, note`. Thứ tự entries/places/layers giữ nguyên vì bộ kể chuyện và lập lịch trình phụ thuộc thứ tự.
- `knowledgeRelations`: cùng cấu trúc `KNOWLEDGE_RELATIONS`; `storyScripts`, `storyConnectors`, `shortSentences` lần lượt tương ứng `SCRIPTS`, `CONNECTORS`, `SHORT_SENTENCES`. Bộ dựng local cần được refactor nhận các dữ liệu này, thay vì chỉ thay import destination.
- Các map bản dịch là `{ "vi": "...", "en": "...", "zh": "...", "ko": "..." }`; key bản dịch chưa có được bỏ, không giả tạo bản dịch. Giữ fallback theo `pick()` của frontend.
- Audio track giữ `dest, lang, mode, src`, thêm `contentVersion` và `checksum` khi đã xác minh. Không hứa audio đủ cả 4 ngôn ngữ. Endpoint audio trả `{ data: [track, ...] }`.
- Tóm tắt destination trả `id, region, coords, hero, name, tagline, intro, suggestedDays, daysRange, version`; không nhúng bài/place.

`contentVersion` và `schemaVersion` khác nhau: đổi câu chữ tăng contentVersion; đổi hợp đồng không tương thích phải có API/schema version mới. Bootstrap đầy đủ phù hợp tập dữ liệu hiện nay; khi lớn lên, tách gói theo điểm đến trước khi tăng thời gian tải ứng dụng.

## Danh tính — giai đoạn 2

| Method / route | Mô tả |
| --- | --- |
| `GET /auth/login?returnTo=/` | Redirect OIDC; returnTo chỉ đường dẫn cùng origin trong allowlist |
| `GET /auth/callback` | Kiểm tra code/state/nonce, tạo session, redirect về returnTo đã lưu |
| `GET /auth/csrf` | Trả `{ data: { csrfToken } }` cho session hiện tại |
| `POST /auth/logout` | Thu hồi phiên và xóa cookie, 204 |
| `GET /me` | `id, displayName, preferredLang`; 401 nếu chưa đăng nhập |
| `PATCH /me` | Chỉ cho đổi displayName (1–100 ký tự), preferredLang |

Tất cả mutation dựa trên cookie gửi `X-CSRF-Token` cùng kiểm tra Origin. Callback được bảo vệ bằng state/nonce/PKCE. Không có API tự cấp role. Auth lỗi trả mã tổng quát, không trả token nhà cung cấp.

## Bộ sưu tập — giai đoạn 2

| Method / route | Mô tả |
| --- | --- |
| `GET /me/favorites` | `{ data: { destinationIds: ["ha-noi"] } }`; sắp ID, toàn bộ tối đa 500 mục |
| `PUT /me/favorites/:destId` | Body rỗng; thêm idempotent, 204; yêu cầu destination đang public |
| `DELETE /me/favorites/:destId` | Xóa idempotent, 204 kể cả chưa lưu; cho xóa favorite đã archive |

Giới hạn 500 favorite/account ở MVP; thêm vượt giới hạn trả 422 `FAVORITES_LIMIT`. Favorite cũ trỏ tới nội dung archive vẫn có thể xuất hiện trong danh sách ID, client hiển thị unavailable hoặc cho xóa.

## Lịch trình — giai đoạn 2

| Method / route | Mô tả |
| --- | --- |
| `GET /itineraries?limit=20&cursor=...` | Chỉ owner; sort `(updatedAt DESC, id DESC)`, cursor keyset; có thể refresh toàn bộ sau mutation |
| `POST /itineraries` | Tạo từ payload dưới, 201 + Location + ETag |
| `GET /itineraries/:id` | Đầy đủ DTO + ETag; chỉ owner |
| `PATCH /itineraries/:id` | Cần If-Match; trường gửi lên thay giá trị cũ, `plan` thay toàn bộ; validate trạng thái sau merge, 200 + ETag mới |
| `DELETE /itineraries/:id` | Cần If-Match, soft delete + tăng version, 204; đọc/xóa lại bản đã xóa trả 404 |

Payload tạo (ví dụ hợp lệ với place hiện có):

```json
{
  "destId": "ha-noi",
  "name": "Hà Nội mùa thu",
  "month": 10,
  "days": 2,
  "people": 2,
  "interests": ["heritage", "food"],
  "plan": [["hn-vm"], []],
  "notes": "Đi chậm vào buổi sáng",
  "rating": 0
}
```

Bắt buộc: destId, name, month, days, people, plan. Mặc định interests `[]`, notes `""`, rating `0`. Name trim và không rỗng; giới hạn name 160, notes 5.000. Rating là đánh giá riêng tư số nguyên 0–5; interests là mảng không trùng của `heritage/culture/food/fun`. Không nhận trường ngoài schema.

DTO đọc thêm `id, version, createdAt, updatedAt`, `unavailablePlaceIds` cho địa điểm cũ đã archive. Không trả owner ID. PATCH không cho đổi destId; muốn đổi điểm đến phải tạo itinerary khác. `days` và `plan` phải khớp sau merge. Chặn plan rỗng toàn bộ, place trùng hoặc thuộc điểm đến khác. Lịch trình quá giờ gợi ý vẫn được lưu vì UI hiện chỉ cảnh báo, không cấm.

Client gửi `If-Match: "itinerary-<id>-v1"`; thiếu 428 `PRECONDITION_REQUIRED`, cũ 412 `VERSION_CONFLICT` kèm `currentVersion` và ETag mới. Client phải tải bản hiện tại để so sánh, không chỉ thay header rồi retry. Chưa có auto retry POST; khi timeout không rõ kết quả, tải lại danh sách để kiểm tra trước khi tạo lại. Idempotency key cho tạo mới có thể bổ sung khi triển khai outbox.

### Nhập dữ liệu khách

`POST /me/import-local` nhận `{ installationId, favoriteDestinationIds, itineraries }`. Mỗi itinerary dùng payload tạo cộng `legacyId` (ID `it-*` cũ), optional `legacyCreatedAt` milliseconds. UUID installationId do frontend tạo, có giới hạn độ dài legacyId 100. Tối đa 100 itinerary, 500 favorite, 256 KiB/batch. Không tạo itinerary từ `legacyId` trực tiếp.

Validate tất cả trước khi ghi, transaction toàn batch. Thành công 200 trả `{ data: { mappings: [{ legacyId, itineraryId, status: "created" }], importedFavoriteCount: 1 } }`; retry mapping cũ trả status `existing`. Favorites union theo ID; count là số mới thêm trong request nên retry có thể trả 0. Nếu tổng favorites sau union > 500, cả batch trả 422. Request trùng legacyId trong cùng batch trả 422. Không tự cập nhật dữ liệu từ mapping đã tồn tại.

## Storyteller — giai đoạn 3, mặc định tắt

`POST /storyteller` nhận `{ "destId": "hue", "lang": "vi", "mode": "culture" }`. Mode chỉ `quick/history/culture/local`, khác với audio `short/full`. Yêu cầu session, CSRF và quota. Trả `{ "text": "...", "source": "ai", "contentVersion": 1 }`; không dùng AI trả `source: "local"`.

Cần sửa `generateStory()` để gửi destId thay payload knowledge/sources hiện tại và giữ source server trả về. `VITE_STORYTELLER_API` là URL công khai, không chứa secret. Backend đọc dữ liệu đã xuất bản, không tin knowledge hoặc sources gửi từ client. Rate limit trả 429 + Retry-After; provider lỗi/timeout trả 503 `STORYTELLER_UNAVAILABLE`, frontend chuyển về `buildLocalStory()` và thông báo phù hợp. Khi feature chưa bật trả 503 `FEATURE_DISABLED`.

## Kiểm tra hợp đồng khi triển khai

Route schemas phải sinh được OpenAPI và kiểm tra DTO bằng integration test. Kiểm tra trực tiếp API mới qua adapter với `pick()`, `buildStory()`, `recommendedIds()` và `autoPlan()` sau khi tách dependency dữ liệu; không chỉ kiểm tra HTTP 200. Fixture seed cần giữ ID, thứ tự và map bản dịch; checksum audio phải so với file thực trước khi công bố.
