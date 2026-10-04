import { useMemo, useState } from "react";

const COUNTRIES = [
  { id: "vn", name: "Việt Nam", en: "Vietnam", flag: "🇻🇳", ready: true, region: "Đông Nam Á", angle: "vn" },
  { id: "jp", name: "Nhật Bản", en: "Japan", flag: "🇯🇵", ready: false, region: "Đông Á", angle: "jp" },
  { id: "th", name: "Thái Lan", en: "Thailand", flag: "🇹🇭", ready: false, region: "Đông Nam Á", angle: "th" },
  { id: "kr", name: "Hàn Quốc", en: "South Korea", flag: "🇰🇷", ready: false, region: "Đông Á", angle: "kr" },
  { id: "sg", name: "Singapore", en: "Singapore", flag: "🇸🇬", ready: false, region: "Đông Nam Á", angle: "sg" },
];

export default function GlobeExplorer({ onBack, onExplore }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => `${c.name} ${c.en}`.toLowerCase().includes(q));
  }, [query]);

  const choose = (country) => {
    setSelected(country);
    setQuery(country.name);
    setFocused(false);
  };

  return (
    <div className={`globe-explorer globe-explorer--${selected?.angle || "vn"}`}>
      <div className="globe-stars" aria-hidden="true" />
      <header className="globe-topbar">
        <button className="globe-brand" onClick={onBack} aria-label="Về trang giới thiệu">
          <b>V</b><span>VIỆT NAM<small>TRAVEL KNOWLEDGE</small></span>
        </button>
        <button className="globe-back" onClick={onBack}>← Trang giới thiệu</button>
      </header>

      <main className="globe-stage">
        <section className="globe-copy">
          <p className="globe-kicker">GLOBAL KNOWLEDGE EXPLORER</p>
          <h1>Bạn muốn khám phá<br/><em>nơi đâu?</em></h1>
          <p className="globe-lead">Chọn một quốc gia để bắt đầu hành trình khám phá tri thức, văn hóa và những câu chuyện phía sau mỗi điểm đến.</p>

          <div className={`country-search ${focused ? "is-open" : ""}`}>
            <div className="country-search__input">
              <span>⌕</span>
              <input
                value={query}
                placeholder="Nhập tên quốc gia..."
                onFocus={() => setFocused(true)}
                onChange={(e) => { setQuery(e.target.value); setFocused(true); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) choose(results[0]);
                  if (e.key === "Escape") setFocused(false);
                }}
              />
              {query && <button onClick={() => { setQuery(""); setFocused(true); }} aria-label="Xóa">×</button>}
            </div>
            {focused && (
              <div className="country-results">
                {results.length ? results.map((country) => (
                  <button key={country.id} onMouseDown={(e) => e.preventDefault()} onClick={() => choose(country)}>
                    <span className="country-results__flag">{country.flag}</span>
                    <span><b>{country.name}</b><small>{country.region}</small></span>
                    <em className={country.ready ? "ready" : "soon"}>{country.ready ? "Khám phá" : "Sắp ra mắt"}</em>
                  </button>
                )) : <div className="country-results__empty">Chưa tìm thấy quốc gia phù hợp.</div>}
              </div>
            )}
          </div>

          {selected && (
            <div className="country-selected">
              <span className="country-selected__flag">{selected.flag}</span>
              <div><small>ĐANG CHỌN</small><strong>{selected.name}</strong><span>{selected.region}</span></div>
            </div>
          )}

          <button
            className="globe-explore-btn"
            disabled={!selected?.ready}
            onClick={() => selected?.ready && onExplore(selected)}
          >
            <span>✈</span>
            {selected?.ready ? `Khám phá ${selected.name}` : `${selected?.name} — Sắp ra mắt`}
            <b>→</b>
          </button>
          {!selected?.ready && <p className="globe-soon-note">Hiện MVP đang mở dữ liệu Việt Nam. Các quốc gia khác sẽ được bổ sung sau.</p>}
        </section>

        <section className="globe-visual" aria-label={`Quả địa cầu đang chọn ${selected?.name || "Việt Nam"}`}>
          <div className="globe-orbit globe-orbit--1" />
          <div className="globe-orbit globe-orbit--2" />
          <div className="cartoon-globe">
            <div className="globe-shine" />
            <svg className="globe-map" viewBox="0 0 600 600" role="img" aria-hidden="true">
              <g className="continent continent--americas">
                <path d="M119 114c37-32 83-48 122-35 20 7 26 31 13 47-13 16-43 13-56 29-12 15-2 37 12 50 13 13 17 35 7 51-14 22-45 16-58 36-11 17-1 39-9 58-6 15-24 25-39 20-12-4-17-19-14-31 4-18 19-33 17-52-2-24-30-31-43-50-14-21-3-51 17-65 16-11 36-12 52-24 14-10 15-24 8-34-8-12-24-10-29 0z"/>
                <path d="M221 330c18 4 33 18 37 35 4 18-8 33-16 48-12 22-9 49-24 68-12 15-36 22-51 8-11-11-7-30 3-42 12-15 31-25 34-44 3-19-12-36-9-55 2-12 13-21 26-18z"/>
              </g>
              <g className="continent continent--eurasia">
                <path d="M305 104c39-30 95-38 142-20 20 8 38 22 58 31 23 11 52 12 69 32 14 17 10 44-8 57-19 13-44 9-64 19-22 11-33 35-53 49-18 13-42 16-63 10-18-5-35-17-54-16-23 1-41 22-64 21-20-1-37-19-38-39-1-21 14-39 28-54 15-16 24-34 24-56 0-17 9-26 23-34z"/>
                <path d="M381 288c26 4 49 23 55 49 5 21-5 43-21 57-18 16-45 24-53 46-5 14-1 30-8 43-9 17-32 24-48 13-15-10-15-31-9-47 7-20 22-37 27-57 4-18-1-37 5-55 7-23 29-53 52-49z"/>
                <path d="M492 360c15-10 38-9 52 3 13 12 15 34 3 47-12 14-34 16-47 4-13-12-15-39-8-54z"/>
              </g>
              <g className="continent continent--islands">
                <path d="M520 267c10-6 24-3 30 6 5 9 2 21-7 27-10 7-25 4-30-7-4-9-1-20 7-26z"/>
                <path d="M536 307c7-4 17-1 20 6 3 8-1 17-9 20-8 2-16-2-18-10-2-6 1-12 7-16z"/>
              </g>
            </svg>

            <svg className="country-highlight" viewBox="0 0 100 240" aria-hidden="true">
              <path d="M48 6C36 18 34 34 42 49c7 13 1 25-8 36-10 12-12 29-4 42 7 11 19 17 18 31-1 14-17 21-18 36-1 16 11 28 18 40 5-10 10-21 12-32 3-17-8-31-5-48 2-13 13-24 12-38-1-16-16-26-17-42-1-15 12-28 10-43-1-10-6-18-12-25z"/>
            </svg>
            <div className="globe-pin"><span>●</span><b>{selected?.name || "Việt Nam"}</b></div>
          </div>
          <div className="globe-shadow" />
          <div className="globe-plane" aria-hidden="true">✈</div>
          <p className="globe-hint"><span>↔</span> Chọn quốc gia để quả địa cầu xoay và tập trung</p>
        </section>
      </main>
    </div>
  );
}
