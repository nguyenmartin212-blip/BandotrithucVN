import { useEffect, useState } from "react";
import { publicAppUrl } from "../lib/presenceModel.js";
import "./live-dashboard.css";

const statuses = {
  unconfigured: "Chưa cấu hình real-time", connecting: "Đang kết nối…", live: "Đang cập nhật trực tiếp",
  reconnecting: "Đang kết nối lại…", offline: "Máy trình chiếu đang mất mạng", error: "Không thể kết nối",
};

export default function LiveDashboard({ presence }) {
  const [qr, setQr] = useState(null);
  const [qrError, setQrError] = useState("");
  const [copied, setCopied] = useState(false);
  let appUrl = "";
  let urlError = "";
  try {
    appUrl = publicAppUrl(import.meta.env.VITE_PUBLIC_APP_URL, window.location.origin);
  } catch (error) { urlError = error.message; }
  useEffect(() => {
    if (!appUrl) return;
    let active = true;
    import("qrcode").then(({ default: QRCode }) => QRCode.toDataURL(appUrl, {
      width: 640, margin: 4, errorCorrectionLevel: "M", color: { dark: "#203a34", light: "#fdfcf8" },
    })).then((image) => { if (active) setQr(image); })
      .catch(() => { if (active) setQrError("Không tạo được QR. Bạn vẫn có thể mở đường dẫn bên dưới."); });
    return () => { active = false; };
  }, [appUrl]);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timeout);
  }, [copied]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(appUrl); setCopied(true); }
    catch { setQrError("Không sao chép tự động được. Hãy chọn đường dẫn bên dưới để sao chép."); }
  };
  const live = presence.status === "live";
  const loopback = appUrl && ["localhost", "127.0.0.1", "[::1]"].includes(new URL(appUrl).hostname);
  return (
    <div className="live-dashboard">
      <header className="live-header">
        <a className="live-brand" href="/">BẢN ĐỒ TRI THỨC <span>VIỆT NAM</span></a>
        <span className={`live-status ${live ? "is-live" : ""}`} role="status">
          <i aria-hidden="true" />{statuses[presence.status]}
        </span>
      </header>
      <main className="live-main">
        <div className="live-heading">
          <p className="live-eyebrow">TRẢI NGHIỆM CÙNG NHAU</p>
          <h1>Mỗi lượt khám phá, kết nối một người.</h1>
          <p>Quét mã bằng điện thoại. Mở bản đồ và chọn nơi bạn muốn tìm hiểu.</p>
        </div>
        <div className="live-stage">
          <section className="live-invite" aria-labelledby="invite-title">
            <h2 id="invite-title">Quét QR để vào app</h2>
            <div className="live-qr">
              {qr ? <img src={qr} width="320" height="320" alt="Mã QR mở trực tiếp bản đồ tri thức" />
                : <p role="status">{urlError || qrError || "Đang tạo mã QR…"}</p>}
            </div>
            {appUrl && <a className="live-url" href={appUrl} target="_blank" rel="noreferrer">{appUrl}</a>}
            <div className="live-actions">
              <button onClick={copy} disabled={!appUrl}>{copied ? "Đã sao chép" : "Sao chép link"}</button>
              {qr && <a href={qr} download="ban-do-tri-thuc-demo.png">Tải QR</a>}
            </div>
            <span className="live-sr" role="status">{copied ? "Đã sao chép đường dẫn" : ""}</span>
            {(qrError || loopback) && <p className="live-warning">{qrError || "Đây là địa chỉ localhost. Điện thoại cần QR của website công khai hoặc địa chỉ mạng LAN."}</p>}
          </section>
          <section className="live-audience" aria-labelledby="audience-title">
            <h2 id="audience-title">Thiết bị đang online</h2>
            <div className="live-count" aria-live="polite" aria-atomic="true">{live ? presence.devices : "—"}</div>
            <p className="live-count-note">{live
              ? presence.devices === 0 ? "Sẵn sàng đón lượt khám phá đầu tiên." : "Đang mở app ở tab hiển thị."
              : "Số đếm xuất hiện khi kết nối real-time sẵn sàng."}</p>
            <dl className="live-detail">
              <div><dt>Tab app đang hiển thị</dt><dd>{live ? presence.tabs : "—"}</dd></div>
              <div><dt>Dashboard trình chiếu</dt><dd>Không tính vào số đếm</dd></div>
            </dl>
            <div className="live-explanation">
              <h3>Thử ngay trên điện thoại</h3>
              <ol><li>Quét QR và mở app: số đếm tăng.</li><li>Rời web hoặc đóng tab: số đếm giảm.</li><li>Quay lại app: thiết bị được tính lại.</li></ol>
              <p>Mỗi trình duyệt tính một thiết bị, dù mở nhiều tab. Mất kết nối đột ngột có thể cần khoảng 35–40 giây để loại khỏi số đếm.</p>
            </div>
          </section>
        </div>
        {presence.status === "unconfigured" && <aside className="live-setup" role="note">
          <h2>Cần kết nối Supabase để bắt đầu đếm</h2>
          <p>Trong Vercel, thêm Project URL và publishable key của Supabase vào biến môi trường, rồi Redeploy. Hướng dẫn chi tiết nằm trong <code>docs/DEMO-REALTIME.md</code> của dự án.</p>
        </aside>}
        {["reconnecting", "error", "offline"].includes(presence.status) && <aside className="live-setup" role="alert">
          <h2>Số liệu tạm thời chưa khả dụng</h2>
          <p>Kiểm tra Internet và cấu hình Supabase. Trang tự kết nối lại khi có mạng; tải lại trang nếu cấu hình vừa thay đổi.</p>
        </aside>}
        <footer className="live-footer">Phiên demo công khai · Số thiết bị ước tính, chưa phải số tài khoản đăng nhập.</footer>
      </main>
    </div>
  );
}
