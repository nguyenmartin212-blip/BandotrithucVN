import { useEffect, useMemo, useRef } from "react";
import { LAYERS, REGIONS } from "../data/content";
import { tr, pick, norm, LANGS } from "../i18n";

function allText(obj) {
  return LANGS.map((l) => obj[l.id] || "").join(" ");
}

export default function Sidebar({ lang, all, list, selectedId, onSelect, onOpenEntry, query, setQuery, onPlan, onMine, savedCount }) {
  const ref = useRef();

  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const q = norm(query.trim());

  const results = useMemo(() => {
    if (!q) return [];
    const out = [];
    for (const d of all) {
      const head = norm([allText(d.name), allText(d.tagline), allText(REGIONS[d.region].name)].join(" "));
      const destHit = head.includes(q);
      const entryHits = d.entries.filter((e) => norm(allText(e.title)).includes(q));
      const placeHits = d.places.filter((p) => norm(allText(p.name)).includes(q));
      if (destHit || entryHits.length || placeHits.length) out.push({ d, destHit, entryHits, placeHits });
    }
    return out;
  }, [q, all]);

  const groups = ["north", "central", "south"].map((r) => ({ r, items: list.filter((d) => d.region === r) }));

  return (
    <aside className="side">
      <label className="search">
        <span>⌕</span>
        <input ref={ref} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tr(lang, "search_ph")} />
        {query && (
          <button className="clear" onClick={() => setQuery("")} aria-label="clear">
            ×
          </button>
        )}      </label>

      <button className="cta" onClick={() => onPlan()}>
        <span className="cta__ic">✦</span>
        <span>
          <strong>{tr(lang, "btn_plan")}</strong>
          <small>{tr(lang, "btn_plan_sub")}</small>
        </span>
      </button>
      <button className="cta cta--ghost" onClick={onMine}>
        <span className="cta__ic">▤</span>
        <span>
          <strong>{tr(lang, "btn_mine")}</strong>
          <small>{savedCount}</small>
        </span>
      </button>

      {q ? (
        <>
          <div className="label">{tr(lang, "search_results")}</div>
          {results.length === 0 && <p className="muted small" style={{ padding: "0 4px" }}>{tr(lang, "no_result")}</p>}
          {results.map(({ d, entryHits, placeHits }) => (
            <div key={d.id} className="res">
              <button className="row dest" style={{ "--c": REGIONS[d.region].color }} onClick={() => onSelect(d.id)}>
                <span className="sq">{pick(d.name, lang)[0]}</span>
                <div><strong>{pick(d.name, lang)}</strong><small>{pick(REGIONS[d.region].name, lang)}</small></div>
              </button>
              {entryHits.slice(0, 4).map((e) => {
                const layer = LAYERS.find((l) => l.id === e.layer);
                return (
                  <button key={e.id} className="row sub" onClick={() => onOpenEntry(d.id, e)}>
                    <span className="ic" style={{ color: layer.color }}>{layer.icon}</span>
                    <span>{pick(e.title, lang)}</span>
                  </button>
                );
              })}
              {placeHits.slice(0, 3).map((p) => (
                <button key={p.id} className="row sub" onClick={() => onSelect(d.id)}>
                  <span className="ic">⚑</span>
                  <span>{pick(p.name, lang)}</span>
                </button>
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="label">{tr(lang, "featured")}</div>
          {groups.map(({ r, items }) =>
            items.length ? (
              <div key={r} className="rgroup">
                <div className="rname"><i style={{ background: REGIONS[r].color }} />{pick(REGIONS[r].name, lang)}</div>
                {items.map((d) => (
                  <button
                    key={d.id}
                    className={`row dest ${d.id === selectedId ? "on" : ""}`}
                    style={{ "--c": REGIONS[d.region].color }}
                    onClick={() => onSelect(d.id)}
                  >
                    <span className="sq">{pick(d.name, lang)[0]}</span>
                    <div><strong>{pick(d.name, lang)}</strong><small>{pick(d.tagline, lang)}</small></div>
                    <em>›</em>
                  </button>
                ))}
              </div>
            ) : null
          )}
        </>
      )}
    </aside>
  );
}
