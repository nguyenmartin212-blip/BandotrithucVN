import { useEffect, useRef, useState } from "react";
import WikiImage from "./WikiImage";
import AIStoryteller from "./AIStoryteller";
import { LAYERS, REGIONS } from "../data/content";
import { tr, pick, monthLabel, dayWord, itemsCount } from "../i18n";

function formatRanges(lang, months) {
  if (!months.length) return "";
  const groups = [];
  let start = months[0], prev = months[0];
  for (let i = 1; i <= months.length; i++) {
    const m = months[i];
    if (m === prev + 1) { prev = m; continue; }
    groups.push([start, prev]);
    start = m; prev = m;
  }
  return groups
    .map(([a, b]) => (a === b ? monthLabel(lang, a) : `${monthLabel(lang, a)}–${monthLabel(lang, b)}`))
    .join(", ");
}

const COPY = {
  vi: {
    glance: "Nhìn nhanh điểm đến",
    visualHint: "Chạm vào một lớp tri thức để đi sâu hơn",
    knowledge: "mẩu tri thức",
    highlights: "Điểm nổi bật",
    highlightsHint: "Một vài trải nghiệm giúp bạn hình dung nơi này trước khi đọc sâu.",
    why: "Vì sao nên khám phá?",
    exploreByLayer: "Khám phá theo lớp tri thức",
  },
  en: {
    glance: "Destination at a glance",
    visualHint: "Choose a knowledge layer to go deeper",
    knowledge: "knowledge items",
    highlights: "Highlights",
    highlightsHint: "A few experiences to picture the place before reading deeper.",
    why: "Why explore it?",
    exploreByLayer: "Explore by knowledge layer",
  },
  zh: {
    glance: "快速了解目的地",
    visualHint: "选择知识层，进一步探索",
    knowledge: "条知识",
    highlights: "亮点体验",
    highlightsHint: "先通过几个代表性体验直观感受这里，再深入阅读。",
    why: "为什么值得探索？",
    exploreByLayer: "按知识层探索",
  },
  ko: {
    glance: "한눈에 보는 여행지",
    visualHint: "지식 레이어를 선택해 더 깊이 알아보세요",
    knowledge: "개의 지식",
    highlights: "주요 하이라이트",
    highlightsHint: "긴 글을 읽기 전에 대표 경험으로 장소의 분위기를 먼저 느껴보세요.",
    why: "왜 가볼 만할까요?",
    exploreByLayer: "지식 레이어별 탐색",
  },
};


const VISUAL_WIKI_TITLES = {
  // Hà Nội
  "hn-d1": ["Imperial Citadel of Thăng Long", "Imperial Citadel of Thang Long", "Hoàng thành Thăng Long"],
  "hn-c1": ["Ca trù", "Ca tru", "Ca trù singing"],
  "hn-f1": ["Pho", "Phở", "Vietnamese pho"],

  // Huế
  "hue-d1": ["Complex of Huế Monuments", "Imperial City, Huế", "Huế Imperial City"],
  "hue-c1": ["Nhã nhạc", "Nha nhac", "Hue royal court music"],
  "hue-f1": ["Bún bò Huế", "Bun bo Hue", "Bún bò"],

  // TP. Hồ Chí Minh
  "hcm-d1": ["Independence Palace", "Reunification Palace", "Dinh Độc Lập"],
  "hcm-c1": ["Đờn ca tài tử", "Don ca tai tu", "Music of Vietnam"],
  "hcm-f1": ["Cơm tấm", "Com tam", "Vietnamese broken rice"],
};

function visualTitles(entry) {
  const preferred = VISUAL_WIKI_TITLES[entry.id] || [];
  return [...preferred, ...(Array.isArray(entry.wiki) ? entry.wiki : [entry.wiki]).filter(Boolean)];
}

function copy(lang, key) {
  return COPY[lang]?.[key] || COPY.vi[key];
}

function Sources({ dest, lang }) {
  return (
    <div className="sources">
      <p className="eyebrow">{tr(lang, "sources")}</p>
      {dest.sources.map((s) => (
        <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
      ))}
      <p className="muted small">{tr(lang, "sources_note")}</p>
    </div>
  );
}

function Entry({ e, lang, highlight }) {
  const ref = useRef(null);
  useEffect(() => {
    if (highlight && ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [highlight]);
  const layer = LAYERS.find((l) => l.id === e.layer);
  return (
    <article ref={ref} className={`entry ${highlight ? "entry--hl" : ""}`}>
      <WikiImage titles={e.wiki} width={500} alt={pick(e.title, lang)} lang={lang} className="entry__img" />
      <div className="entry__tag" style={{ color: layer.color }}>{layer.icon} {pick(layer.name, lang)}</div>
      <h4>{pick(e.title, lang)}</h4>
      <p>{pick(e.body, lang)}</p>
    </article>
  );
}

function VisualSnapshot({ dest, lang, great, counts, setPanel }) {
  const priorities = ["heritage", "culture", "food"];
  const selected = [];

  priorities.forEach((layerId) => {
    const entry = dest.entries.find((e) => e.layer === layerId && !selected.some((x) => x.id === e.id));
    if (entry) selected.push(entry);
  });

  for (const e of dest.entries) {
    if (selected.length >= 3) break;
    if (!selected.some((x) => x.id === e.id)) selected.push(e);
  }

  const highlights = (dest.places || []).slice(0, 4);

  return (
    <>
      <section className="detail-glance" aria-label={copy(lang, "glance")}>
        <div className="detail-section-heading detail-section-heading--compact">
          <div>
            <span className="detail-kicker">✦ {copy(lang, "glance")}</span>
            <small>{copy(lang, "visualHint")}</small>
          </div>
        </div>

        <div className="detail-gallery">
          {selected.map((e, index) => {
            const layer = LAYERS.find((l) => l.id === e.layer);
            return (
              <article
                key={e.id}
                className={`detail-gallery__item detail-gallery__item--${index + 1}`}
                style={{ "--visual-color": layer?.color || "#c8553d" }}
              >
                <WikiImage
                  titles={visualTitles(e)}
                  width={720}
                  alt={pick(e.title, lang)}
                  lang={lang}
                  className="detail-gallery__img"
                  eager
                />
                <div className="detail-gallery__shade" />
                <div className="detail-gallery__copy">
                  <span>{layer?.icon} {layer ? pick(layer.name, lang) : ""}</span>
                  <strong>{pick(e.title, lang)}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <div className="detail-fact-grid">
          <div className="detail-fact-card">
            <span>☀</span>
            <small>{tr(lang, "best_time")}</small>
            <strong>{formatRanges(lang, great)}</strong>
          </div>
          <div className="detail-fact-card">
            <span>⌁</span>
            <small>{tr(lang, "suggested")}</small>
            <strong>{dayWord(lang, dest.daysRange[0])}–{dayWord(lang, dest.daysRange[1])}</strong>
          </div>
          <div className="detail-fact-card">
            <span>◈</span>
            <small>{tr(lang, "layers_title")}</small>
            <strong>{dest.entries.length} {copy(lang, "knowledge")}</strong>
          </div>
        </div>

        <div className="detail-layer-rail" aria-label={copy(lang, "exploreByLayer")}>
          {LAYERS.map((l) => (
            <button
              key={l.id}
              type="button"
              style={{ "--rail-color": l.color }}
              onClick={() => setPanel({ view: "layer", layerId: l.id })}
            >
              <i>{l.icon}</i>
              <span>{pick(l.name, lang)}</span>
              <em>{counts[l.id] || 0}</em>
            </button>
          ))}
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="detail-highlights">
          <div className="detail-section-heading">
            <div>
              <span className="detail-kicker">{copy(lang, "highlights")}</span>
              <small>{copy(lang, "highlightsHint")}</small>
            </div>
          </div>
          <div className="detail-highlight-list">
            {highlights.map((place, index) => (
              <article key={place.id}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <strong>{pick(place.name, lang)}</strong>
                  <span>{pick(place.note, lang)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function DetailPanel({ dest, lang, panel, setPanel, saved, onSave, onClose, onPlan }) {
  const region = REGIONS[dest.region];
  const scrollRef = useRef(null);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    if (scrollRef.current && !panel.highlight) scrollRef.current.scrollTo({ top: 0 });
  }, [panel.view, panel.layerId, dest.id, panel.highlight]);

  useEffect(() => {
    setStoryOpen(false);
    window.speechSynthesis?.cancel();
  }, [dest.id]);

  const counts = {};
  dest.entries.forEach((e) => (counts[e.layer] = (counts[e.layer] || 0) + 1));

  const great = dest.bestMonths.map((s, i) => (s === 3 ? i + 1 : null)).filter(Boolean);

  // ---------------- Màn hình 2: nội dung của một lớp (hoặc tất cả)
  if (panel.view === "layer") {
    const isAll = panel.layerId === "all";
    const layer = LAYERS.find((l) => l.id === panel.layerId);
    const groups = isAll ? LAYERS : [layer];
    return (
      <aside className="panel" ref={scrollRef}>
        <div className="panel__bar">
          <button className="back-btn" onClick={() => setPanel({ view: "layers" })} aria-label={tr(lang, "back_layers")}>
            ← <span>{tr(lang, "back_layers")}</span>
          </button>
          <div className="panel__bar-title">
            <strong>{pick(dest.name, lang)}</strong>
            <span>{isAll ? tr(lang, "all_layers") : `${layer.icon} ${pick(layer.name, lang)}`}</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label={tr(lang, "close")}>×</button>
        </div>
        <div className="panel__body">
          {groups.map((g) => {
            const list = dest.entries.filter((e) => e.layer === g.id);
            if (!list.length) return null;
            return (
              <section key={g.id}>
                {isAll && (
                  <h3 className="layer-head" style={{ color: g.color }}>
                    <span>{g.icon}</span> {pick(g.name, lang)}
                  </h3>
                )}
                {list.map((e) => (
                  <Entry key={e.id} e={e} lang={lang} highlight={panel.highlight === e.id} />
                ))}
              </section>
            );
          })}
          <Sources dest={dest} lang={lang} />
        </div>
      </aside>
    );
  }

  // ---------------- Màn hình 1: tổng quan điểm đến + visual snapshot + danh mục lớp tri thức
  return (
    <aside className="panel panel--visual" ref={scrollRef}>
      <div className="panel__hero" style={{ "--c": region.color }}>
        <WikiImage titles={dest.hero} width={960} alt={pick(dest.name, lang)} lang={lang} className="panel__hero-img" />
        <span className="badge">{pick(region.name, lang)}</span>
        <div className="acts">
          <button onClick={onSave} title={tr(lang, "save_fav")} aria-label={tr(lang, "save_fav")}>{saved ? "♥" : "♡"}</button>
          <button onClick={onClose} title={tr(lang, "close")} aria-label={tr(lang, "close")}>×</button>
        </div>
        <h2>{pick(dest.name, lang)}</h2>
      </div>

      <div className="panel__body panel__body--visual">
        <VisualSnapshot dest={dest} lang={lang} great={great} counts={counts} setPanel={setPanel} />

        <section className="detail-story-intro">
          <span className="detail-kicker">{copy(lang, "why")}</span>
          <h3 className="tagline">{pick(dest.tagline, lang)}</h3>
          <p>{pick(dest.intro, lang)}</p>
        </section>

        <button className="btn btn--accent btn--block detail-plan-btn" onClick={() => onPlan(dest.id)}>✦ {tr(lang, "plan_here")}</button>

        <button
          type="button"
          className="story-launch story-launch--contextual"
          onClick={() => setStoryOpen(true)}
          aria-label={lang === "vi" ? `Kể chuyện về ${pick(dest.name, lang)}` : `Story about ${pick(dest.name, lang)}`}
        >
          <span className="story-launch__icon">▶</span>
          <span>
            <strong>{lang === "vi" ? `Kể chuyện về ${pick(dest.name, lang)}` : `Story about ${pick(dest.name, lang)}`}</strong>
            <small>{lang === "vi" ? "Nội dung được chọn theo đúng điểm đến hiện tại" : "Story content follows the selected destination"}</small>
          </span>
          <em>→</em>
        </button>

        {storyOpen && (
          <AIStoryteller
            dest={dest}
            lang={lang}
            onClose={() => setStoryOpen(false)}
          />
        )}

        <div className="detail-section-heading detail-section-heading--layers">
          <div>
            <span className="detail-kicker">{copy(lang, "exploreByLayer")}</span>
            <small>{tr(lang, "layers_hint")}</small>
          </div>
        </div>

        <div className="layer-grid layer-grid--visual">
          {LAYERS.map((l) => (
            <button key={l.id} className="lcard" style={{ "--lc": l.color }} onClick={() => setPanel({ view: "layer", layerId: l.id })}>
              <i>{l.icon}</i>
              <strong>{pick(l.name, lang)}</strong>
              <span>{pick(l.desc, lang)}</span>
              <em>{itemsCount(lang, counts[l.id] || 0)} →</em>
            </button>
          ))}
          <button className="lcard lcard--all" onClick={() => setPanel({ view: "layer", layerId: "all" })}>
            <i>✦</i>
            <strong>{tr(lang, "all_layers")}</strong>
            <em>{itemsCount(lang, dest.entries.length)} →</em>
          </button>
        </div>
      </div>
    </aside>
  );
}
