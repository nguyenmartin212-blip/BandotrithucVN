GLOBE CURRENCY CONVERTER PATCH

Feature: Quy đổi tỉ giá ngay trong Globe Explorer.

Hỗ trợ 4 quốc gia mẫu:
- Việt Nam — VND
- Hoa Kỳ — USD
- Nhật Bản — JPY
- Hàn Quốc — KRW

Patch chỉ gồm:
- src/components/GlobeExplorer.jsx (modified)
- src/lib/currency.js (new)
- src/index.css (modified)

Cách áp dụng:
1. Sao lưu/commit repo web hiện tại.
2. Copy thư mục src trong patch vào root project web.
3. Chọn Replace khi Windows hỏi ghi đè.
4. Chạy npm run dev.

Tỉ giá:
- Ưu tiên tải từ open.er-api.com.
- Cache 30 phút trong localStorage.
- Nếu mất mạng/API lỗi, hiển thị tỉ giá mẫu offline và gắn nhãn rõ ràng.

Không sửa LandingPage, TravelTransition, DetailPanel, itinerary hay AI Storyteller.
