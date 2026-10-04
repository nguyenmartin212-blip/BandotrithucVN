import { useEffect, useRef } from "react";
import WikiImage from "./WikiImage";
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

export default function DetailPanel({ dest, lang, panel, setPanel, saved, onSave, onClose, onPlan, onStory }) {
  const region = REGIONS[dest.region];
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && !panel.highlight) scrollRef.current.scrollTo({ top: 0 });
  }, [panel.view, panel.layerId, dest.id, panel.highlight]);

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

  // ---------------- Màn hình 1: tổng quan điểm đến + danh mục lớp tri thức
  return (
    <aside className="panel" ref={scrollRef}>
      <div className="panel__hero" style={{ "--c": region.color }}>
        <WikiImage titles={dest.hero} width={960} alt={pick(dest.name, lang)} lang={lang} className="panel__hero-img" />
        <span className="badge">{pick(region.name, lang)}</span>
        <div className="acts">
          <button onClick={onSave} title={tr(lang, "save_fav")} aria-label={tr(lang, "save_fav")}>{saved ? "♥" : "♡"}</button>
          <button onClick={onClose} title={tr(lang, "close")} aria-label={tr(lang, "close")}>×</button>
        </div>
        <h2>{pick(dest.name, lang)}</h2>
      </div>
      <div className="panel__body">
        <h3 className="tagline">{pick(dest.tagline, lang)}</h3>
        <p>{pick(dest.intro, lang)}</p>

        <div className="facts">
          <div>
            <small>◷ {tr(lang, "best_time")}</small>
            <strong>{formatRanges(lang, great)}</strong>
          </div>
          <div>
            <small>⌁ {tr(lang, "suggested")}</small>
            <strong>{dayWord(lang, dest.daysRange[0])}–{dayWord(lang, dest.daysRange[1])}</strong>
          </div>
        </div>

        {onStory && (
          <button className="story-btn" onClick={() => onStory(dest.id)}>
            <i aria-hidden="true">▶</i>
            <span><strong>{tr(lang, "story_btn")}</strong><small>{tr(lang, "story_btn_sub")}</small></span>
          </button>
        )}

        <button className="btn btn--accent btn--block" onClick={() => onPlan(dest.id)}>✦ {tr(lang, "plan_here")}</button>

        <p className="eyebrow">{tr(lang, "layers_title")}</p>
        <p className="muted small" style={{ marginTop: -4 }}>{tr(lang, "layers_hint")}</p>

        <div className="layer-grid">
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
