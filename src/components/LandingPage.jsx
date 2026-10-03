import { LAYERS } from "../data/content";

const featureCards = [
  ["⌖", "Khám phá dạng bản đồ", "Trực quan, sinh động"],
  ["✦", "Tri thức đa lớp", "Hiểu sâu hơn mỗi điểm đến"],
  ["↝", "Tạo lịch trình", "Gợi ý hành trình phù hợp sở thích"],
  ["♡", "Lưu và quản lý", "Tạo bộ sưu tập của riêng bạn"],
];

const layerFallback = [
  ["◷", "Lịch sử hình thành", "Nguồn gốc, quá trình phát triển, những dấu mốc quan trọng."],
  ["⌂", "Di sản", "Công trình, di tích, di sản vật thể và phi vật thể."],
  ["♫", "Văn hóa", "Phong tục, lễ hội, nghệ thuật và đời sống cộng đồng."],
  ["○", "Ẩm thực", "Món ăn đặc trưng, văn hóa ẩm thực và những địa chỉ gợi ý."],
  ["⚑", "Du lịch", "Điểm tham quan, trải nghiệm, mùa đẹp nhất và thời lượng gợi ý."],
  ["◇", "Câu chuyện đặc trưng", "Con người, truyền thuyết và nét độc đáo riêng có."],
];

export default function LandingPage({ onStart }) {
  const scrollToAbout = () => document.getElementById("landing-about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-hero__shade" />
        <header className="landing-nav">
          <div className="landing-brand"><b>V</b><span>VIỆT NAM<small>TRAVEL KNOWLEDGE</small></span></div>
          <nav>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Trang chủ</button>
            <button onClick={scrollToAbout}>Về dự án</button>
            <button onClick={() => document.getElementById("landing-layers")?.scrollIntoView({ behavior: "smooth" })}>Lớp tri thức</button>
            <button className="landing-nav__cta" onClick={onStart}>Bắt đầu khám phá</button>
          </nav>
        </header>

        <div className="landing-hero__content">
          <p className="landing-kicker">BẢN ĐỒ TRI THỨC DU LỊCH VIỆT NAM</p>
          <h1>Khám phá Việt Nam<br/><span>không chỉ là <em>đi đến.</em></span><br/>Mà là <em>hiểu sâu.</em></h1>
          <p>Mỗi vùng đất là một mạng lưới sống động của con người, văn hóa, ẩm thực, lịch sử và thiên nhiên — được kết nối thành một bản đồ tri thức trực quan.</p>
          <button className="landing-primary" onClick={onStart}><span>◈</span> Bắt đầu khám phá! <b>→</b></button>
        </div>
        <button className="landing-scroll" onClick={scrollToAbout}>⌄ <span>Cuộn xuống để tìm hiểu thêm</span></button>
      </section>

      <section id="landing-about" className="landing-section landing-about">
        <div className="landing-about__copy">
          <p className="landing-kicker">VỀ SẢN PHẨM</p>
          <h2>Bản đồ <em>tri thức</em><br/>du lịch Việt Nam</h2>
          <p>Không chỉ là một bản đồ du lịch, đây là nền tảng giúp bạn khám phá, tìm hiểu và kết nối những câu chuyện văn hóa, lịch sử, ẩm thực, con người và thiên nhiên trên khắp Việt Nam.</p>
          <div className="landing-features">
            {featureCards.map(([ic, title, sub]) => <div className="landing-feature" key={title}><i>{ic}</i><strong>{title}</strong><span>{sub}</span></div>)}
          </div>
        </div>
        <div className="landing-product">
          <div className="landing-browser">
            <div className="landing-browser__bar"><i/><i/><i/><span>travel-knowledge.vn</span></div>
            <div className="landing-browser__body">
              <aside><b>Tạo lịch trình</b><span>Hà Nội</span><span>Huế</span><span>TP. Hồ Chí Minh</span></aside>
              <div className="landing-mini-map"><div className="mini-vn">S</div><i className="mini-pin p1">●</i><i className="mini-pin p2">●</i><i className="mini-pin p3">●</i><span>VIỆT NAM</span></div>
              <div className="landing-mini-layers"><b>LỚP TRI THỨC</b>{["Lịch sử", "Di sản", "Văn hóa", "Ẩm thực", "Du lịch"].map(x => <span key={x}>{x}</span>)}</div>
            </div>
          </div>
          <div className="landing-phone"><div className="landing-phone__photo"/><b>Huế</b><small>Di sản • Văn hóa • Ẩm thực</small><button>Tạo lịch trình</button></div>
        </div>
      </section>

      <section id="landing-layers" className="landing-section landing-layers">
        <p className="landing-kicker">5+ LỚP TRI THỨC</p>
        <div className="landing-title-row"><h2>Một điểm đến – Nhiều câu chuyện</h2><p>Mỗi địa phương được nhìn nhận qua nhiều lớp tri thức, giúp bạn hiểu sâu và trải nghiệm trọn vẹn hơn.</p></div>
        <div className="landing-layer-grid">
          {layerFallback.map(([ic, title, text], idx) => {
            const layer = LAYERS[idx];
            return <article key={title}><div className={`landing-layer-img layer-img-${idx}`}><i style={{ color: layer?.color }}>{layer?.icon || ic}</i></div><h3>{title}</h3><p>{text}</p></article>;
          })}
        </div>
      </section>

      <section className="landing-journey">
        <div className="landing-journey__copy"><p className="landing-kicker">TẠO LỊCH TRÌNH</p><h2>Biến cảm hứng thành<br/>hành trình của riêng bạn</h2><p>Chọn thời gian, sở thích và để chúng tôi gợi ý hành trình phù hợp, kết nối các điểm đến theo chủ đề bạn quan tâm.</p><button className="landing-primary" onClick={onStart}>▶ Xem cách hoạt động</button></div>
        <div className="journey-route"><span className="route-dot r1">Huế</span><span className="route-dot r2">Ẩm thực</span><span className="route-dot r3">Di sản</span><span className="route-dot r4">Văn hóa</span><svg viewBox="0 0 600 260" preserveAspectRatio="none"><path d="M40 210 C130 30 240 230 320 80 S480 210 565 40"/></svg></div>
        <div className="journey-card"><b>Gợi ý hành trình</b><div className="journey-tabs"><span>1 ngày</span><span>2 ngày</span><span>3 ngày</span></div>{["Đại Nội", "Lăng Minh Mạng", "Chùa Thiên Mụ", "Ẩm thực Huế"].map((x,i)=><p key={x}><i>{i+1}</i>{x}<small>{i===3 ? "1.5 giờ" : "2 giờ"}</small></p>)}</div>
      </section>

      <section className="landing-final">
        <div><p className="landing-kicker">VIỆT NAM ĐANG CHỜ BẠN</p><h2>Đã sẵn sàng khám phá Việt Nam?</h2><p>Hãy bắt đầu hành trình để tìm thấy những câu chuyện mới trên bản đồ tri thức du lịch Việt Nam.</p><button className="landing-primary" onClick={onStart}><span>◈</span> Bắt đầu khám phá! <b>→</b></button></div>
        <div className="landing-plane">✈</div>
      </section>
    </div>
  );
}
