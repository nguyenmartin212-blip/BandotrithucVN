# Demo QR và dashboard online trên Vercel

## Kết quả cần trình diễn

- App: `https://bandotrithuc-vn.vercel.app/?demo=1`, vào thẳng bản đồ, bỏ qua landing/globe.
- Dashboard: `https://bandotrithuc-vn.vercel.app/?dashboard=live`.
- QR được tạo ngay tại dashboard, có thể tải PNG để đưa vào slide.
- QR production có sẵn tại `public/qr/demo.png`.
- Các đường dẫn chỉ có tính năng mới sau khi mã được deploy lên Vercel.

Website hiện là React/Vite. Phiên bản demo dùng Supabase Realtime Presence để chia sẻ trạng thái giữa các điện thoại và dashboard, không cần chạy backend.zip hoặc tạo bảng dữ liệu. Đây là phần bổ sung ưu tiên cho demo, chưa triển khai toàn bộ backend trong `docs/backend/`.

## 1. Tạo project Supabase

1. Đăng nhập https://supabase.com/dashboard và chọn **New project** trong organization của bạn.
2. Đặt tên (ví dụ `ban-do-tri-thuc-demo`), chọn region gần người dùng, đặt mật khẩu database và chờ project sẵn sàng. Không đưa mật khẩu database vào frontend.
3. Mở **Connect** của project, lấy **Project URL** và **publishable key** (`sb_publishable_...`). Nếu giao diện tài khoản khác, tìm trong phần API keys/settings. Không dùng secret key hoặc `service_role`.
4. Kiểm tra Realtime đang hoạt động và cho phép public channels. Bản demo dùng public channel; nếu bật chế độ chỉ cho private channels, subscribe sẽ thất bại. Không cần tắt RLS trên bảng nào và không cần chạy SQL.

Tham khảo: [Presence](https://supabase.com/docs/guides/realtime/presence), [API keys](https://supabase.com/docs/guides/api/api-keys), [Realtime settings](https://supabase.com/docs/guides/realtime/settings).

## 2. Cấu hình Vercel

Trong project website trên Vercel, mở **Settings → Environment Variables** và thêm cho môi trường **Production**:

| Tên biến | Giá trị |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL của Supabase, dạng `https://<project>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key của cùng project |
| `VITE_PUBLIC_APP_URL` | `https://bandotrithuc-vn.vercel.app` hoặc domain production thực tế |

Để trống `VITE_PRESENCE_ROOM`. Mặc định phòng được phân theo hostname để preview/local không làm tăng số đếm production. Dashboard và app phải mở trên cùng hostname. Nếu dùng nhiều domain cho cùng demo, cấu hình cùng `VITE_PRESENCE_ROOM` cho chúng và bảo đảm cùng Supabase project.

Deploy commit có tính năng này, hoặc chọn **Redeploy** sau khi thêm biến môi trường. Vite đọc `VITE_*` tại build time; thêm biến mà không build lại sẽ chưa có tác dụng. Các biến này được đưa vào bundle công khai, chỉ dùng khóa publishable.

Dashboard không có đăng nhập trong bản demo và chỉ hiển thị số đếm tổng hợp. Public Presence có thể bị client giả mạo; số liệu dùng để trình diễn hoạt động, không phải analytics chống gian lận hay thống kê người dùng đã xác thực. Không đưa tên, email, IP hay dữ liệu cá nhân vào presence payload.

## 3. Kiểm tra trước buổi báo cáo

1. Mở dashboard trên laptop. Phải thấy **Đang cập nhật trực tiếp** và số 0 khi chưa có ai mở app. Dấu `—` nghĩa là chưa có dữ liệu, không phải 0 người dùng.
2. Quét QR bằng điện thoại A, mở app: số thiết bị tăng lên 1.
3. Điện thoại B mở app: số tăng lên 2. Hai máy có thể dùng Wi-Fi/4G khác nhau.
4. Điện thoại A chuyển ra khỏi web, đóng tab hoặc khóa màn hình: số giảm sau khi cập nhật được gửi. Trình duyệt có thể trì hoãn sự kiện khi bị hệ điều hành dừng; heartbeat sẽ dọn trạng thái cũ.
5. Điện thoại A quay lại app: số tăng lại.
6. Mở hai cửa sổ app cùng trình duyệt, cùng domain: vẫn tính một thiết bị; đóng một cửa sổ vẫn giữ số nếu cửa sổ còn lại đang hiển thị.
7. Tắt mạng đột ngột ở điện thoại: thông thường bị loại trong khoảng 35–40 giây tính từ heartbeat cuối mà dashboard nhận. Dashboard dùng thời gian nhận tại máy trình chiếu, không phụ thuộc đồng hồ điện thoại. Sau khi dashboard vừa kết nối lại, snapshot cũ cũng có thể cần khoảng này để hết hạn.
8. Tắt mạng laptop: dashboard chuyển trạng thái mất mạng và ẩn số đếm cũ. Bật lại mạng: đồng bộ snapshot mới.

Số đếm là **trình duyệt có ít nhất một tab app đang hiển thị và kết nối**, không phải tài khoản đăng nhập hoặc lượt truy cập tích lũy. Một điện thoại dùng hai trình duyệt có thể tính hai. Ẩn danh, xóa localStorage, chặn lưu trữ hoặc hai tab khởi tạo lần đầu đồng thời có thể tạo định danh khác. Trang dashboard chỉ quan sát, không tự tính là visitor.

Đóng web bình thường dùng untrack/đóng kết nối. Heartbeat mỗi 10 giây, trạng thái không đổi trong 35 giây bị loại, dashboard kiểm tra mỗi 2 giây. Máy trình chiếu nên giữ dashboard ở foreground; trình duyệt có thể hạn chế timer/network của tab nền.

## 4. Chạy và kiểm tra trên máy phát triển

```powershell
npm install
# Tạo .env.local theo .env.example, điền Project URL và publishable key.
npm run dev
```

Mở `http://localhost:5173/?dashboard=live`. Nếu `VITE_PUBLIC_APP_URL` trỏ về production thì QR mở production và không được tính vào phòng localhost. Để test local, mở app ở tab/cửa sổ cùng localhost hoặc dùng cùng room có chủ đích. Localhost không phải địa chỉ điện thoại có thể quét để truy cập laptop.

```powershell
npm run test:presence
npm run build
```

Test tự động kiểm tra đếm không trùng, hết hạn heartbeat, rời/quay lại tab, observer, reconnect và cleanup. Cần chạy checklist hai thiết bị trên project Supabase thật để xác nhận kết nối end-to-end; test giả lập không thay thế bước này.

## Xử lý khi demo chưa chạy

| Hiện tượng | Kiểm tra |
| --- | --- |
| Chưa cấu hình real-time | Hai biến Supabase có đủ trên Production chưa; đã Redeploy chưa |
| Đang kết nối lại liên tục | Project URL/key cùng project, project không pause, public channels được phép, mạng không chặn WebSocket |
| QR mở app nhưng số không tăng | App và dashboard đã deploy bản mới, cùng hostname/room, tab app đang hiển thị |
| Đóng web nhưng chưa giảm ngay | Đợi heartbeat hết hạn, giữ dashboard foreground; kiểm tra có cửa sổ app khác cùng trình duyệt còn mở không |
| Điện thoại không mở được QR | QR phải chứa domain công khai, không phải localhost; không bật bảo vệ đăng nhập Vercel cho URL demo |
| Thay env rồi vẫn như cũ | Build/deploy lại, đóng các tab cũ và tải lại; kiểm tra đang mở domain production đúng |

Chưa có migration, tài khoản cá nhân, lịch trình cloud hay báo cáo lịch sử trong phần bổ sung này. Các tính năng đó vẫn theo lộ trình backend riêng.
