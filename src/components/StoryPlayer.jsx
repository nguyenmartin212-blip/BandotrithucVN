import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import WikiImage from "./WikiImage";
import useStoryEngine from "../hooks/useStoryEngine";
import useLocal from "../hooks/useLocal";
import { LAYERS, REGIONS } from "../data/content";
import { LANGS, tr, pick, approxMinutes } from "../i18n";
import {
  MODES, buildStory, storyMeta, tokenize, paragraphBounds, firstIndexOfPara, findTrack, estimateMs,
} from "../lib/story";
import { downloadPackage, packageStatus, tracksForPackage } from "../lib/offlineAudio";
import { relatedKnowledge } from "../data/knowledgeRelations";
import "./story.css";

// Danh mục file thuyết minh làm sẵn (tùy chọn). Tải một lần cho cả phiên.
let manifestPromise = null;
function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch("/audio/manifest.json")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return manifestPromise;
}

const SPEEDS = [0.8, 1, 1.25];

export default function StoryPlayer({ dest, lang, setLang, onClose, onPlan, onLayers }) {
  const [mode, setMode] = useLocal("bdtt.story.mode", "short");
  const [manifest, setManifest] = useState(null);
  const [knowledgeFocus, setKnowledgeFocus] = useState(null);
  const [offline, setOffline] = useState({ downloaded: false, count: 0 });
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const region = REGIONS[dest.region];

  useEffect(() => {
    let on = true;
    loadManifest().then((m) => on && setManifest(m));
    return () => { on = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    packageStatus(manifest, dest.id, lang).then((status) => {
      if (alive) setOffline(status);
    });
    return () => { alive = false; };
  }, [manifest, dest.id, lang]);

  const preparedTracks = tracksForPackage(manifest, dest.id, lang);

  const downloadOffline = async () => {
    if (downloading || offline.downloaded || !preparedTracks.length) return;
    setDownloading(true);
    setDownloadProgress("");
    try {
      await downloadPackage(manifest, dest.id, lang, (done, total) => {
        setDownloadProgress(`${done}/${total}`);
      });
      setOffline(await packageStatus(manifest, dest.id, lang));
    } catch (error) {
      console.error(error);
      setDownloadProgress("!");
    } finally {
      setDownloading(false);
    }
  };

  const safeMode = MODES.includes(mode) ? mode : "short";
  const sentences = useMemo(() => buildStory(dest, lang, safeMode), [dest, lang, safeMode]);
  const meta = useMemo(() => storyMeta(dest, lang), [dest, lang]);
  const track = useMemo(() => findTrack(manifest, dest.id, lang, safeMode), [manifest, dest.id, lang, safeMode]);
  const eng = useStoryEngine({ sentences, lang, track });
  const { idx, ended } = eng;
  const cur = sentences[Math.min(idx, sentences.length - 1)];

  // Đổi ngôn ngữ thì giữ nguyên đoạn đang kể; đổi chế độ thì kể lại từ đầu.
  const prevRef = useRef({ lang, mode: safeMode, para: cur?.para });
  useLayoutEffect(() => {
    const p = prevRef.current;
    if (p.lang !== lang || p.mode !== safeMode) {
      const i = p.mode === safeMode ? firstIndexOfPara(sentences, p.para) : 0;
      eng.goto(i, p.mode === safeMode ? undefined : true);
    }
    prevRef.current = { lang, mode: safeMode, para: sentences[Math.min(idx, sentences.length - 1)]?.para };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, safeMode]);
  useEffect(() => {
    prevRef.current.para = cur?.para;
  }, [cur?.para]);

  // Phím tắt và khóa cuộn trang nền.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.target.closest?.("button, select, a, input, textarea")) return;
      if (e.key === " ") { e.preventDefault(); eng.toggle(); }
      else if (e.key === "ArrowRight") eng.next();
      else if (e.key === "ArrowLeft") eng.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, eng.toggle, eng.next, eng.prev]);

  // Các đoạn (chương) cho thanh tiến độ.
  const segments = useMemo(() => {
    const segs = [];
    sentences.forEach((s, i) => {
      const key = s.layer || s.kind;
      const last = segs[segs.length - 1];
      if (last && last.key === key) last.end = i;
      else segs.push({ key, start: i, end: i, layer: LAYERS.find((l) => l.id === s.layer) || null });
    });
    return segs;
  }, [sentences]);

  const [a, b] = paragraphBounds(sentences, idx);
  const para = sentences.slice(a, b + 1);
  const isCard = cur.kind !== "body";
  const layer = LAYERS.find((l) => l.id === cur.layer);
  const label = layer
    ? `${layer.icon} ${pick(layer.name, lang)}`
    : cur.kind === "open" ? `✦ ${tr(lang, "story_intro_label")}` : `✦ ${tr(lang, "story_outro_label")}`;
  const accent = layer ? layer.color : "#ef6849";

  const tokens = useMemo(() => tokenize(cur.text, lang), [cur.text, lang]);
  const wordCount = tokens.filter((t) => t.trim()).length || 1;
  const step = Math.max(16, Math.min(95, (estimateMs(cur.text, lang) * 0.55) / wordCount / eng.speed));

  const note = track && eng.engine === "file"
    ? tr(lang, "story_file")
    : eng.voiceMissing ? tr(lang, "story_novoice") : tr(lang, "story_disclaimer");

  // Knowledge connections for the current destination.
  // Keep this defined before render so the end screen cannot crash.
  const related = relatedKnowledge(dest?.id);

  return (
    <div className="story" role="dialog" aria-modal="true" aria-label={tr(lang, "story_title")} style={{ "--rc": region.color, "--ac": accent }}>
      <div className="story__bg" key={(cur.wiki || []).join("|")}>
        <WikiImage
          titles={cur.wiki}
          width={1400}
          alt=""
          lang={lang}
          className="story__img"
          fallback={<div className="story__fallback" />}
        />
      </div>
      <div className="story__shade" />

      <header className="story__top">
        <div className="story__brand">
          <i aria-hidden="true">✦</i>
          <span>{tr(lang, "story_title")}</span>
          <b>{pick(dest.name, lang)}</b>
        </div>
        <div className="story__langs" role="group" aria-label="language">
          {LANGS.map((l) => (
            <button key={l.id} className={l.id === lang ? "on" : ""} onClick={() => setLang(l.id)} aria-pressed={l.id === lang}>
              {l.short}
            </button>
          ))}
        </div>
        <button className="story__x" onClick={onClose} aria-label={tr(lang, "story_close")}>×</button>
      </header>

      {!ended ? (
        <main className={`story__stage ${isCard ? "story__stage--card" : ""}`}>
          <p className="story__chapter" key={`c-${cur.layer || cur.kind}`}>{label}</p>
          <h2 className="story__title" key={`t-${cur.para}`}>{cur.title}</h2>
          <p className="story__text" key={`p-${cur.para}`} aria-live="off">
            {para.map((s) => {
              if (s.i < idx) return <span key={s.i} className="sn sn--past">{s.text} </span>;
              if (s.i > idx) return <span key={s.i} className="sn sn--next">{s.text} </span>;
              return (
                <span key={`${s.i}-${lang}`} className="sn sn--now">
                  {tokens.map((t, k) =>
                    t.trim() === "" && lang !== "zh" ? (
                      t
                    ) : (
                      <span key={k} className="w" style={{ animationDelay: `${Math.round(k * step)}ms` }}>{t}</span>
                    )
                  )}{" "}
                </span>
              );
            })}
          </p>
        </main>
      ) : (
        <main className="story__stage story__stage--end">
          <p className="story__chapter">✦ {pick(dest.name, lang)}</p>
          <h2 className="story__title story__title--big">{tr(lang, "story_end_title")}</h2>
          <div className="story__endbtns">
            <button className="sbtn sbtn--solid" onClick={eng.restart}>↻ {tr(lang, "story_replay")}</button>
            <button className="sbtn" onClick={() => onPlan(dest.id)}>✦ {tr(lang, "plan_here")}</button>
            <button className="sbtn" onClick={onLayers}>◫ {tr(lang, "story_end_layers")}</button>
          </div>
          <section className="knowledge-links">
            <div className="knowledge-links__head">
              <div>
                <span className="knowledge-links__eyebrow">✦ {lang === "vi" ? "KẾT NỐI TRI THỨC" : lang === "zh" ? "知识连接" : "KNOWLEDGE CONNECTIONS"}</span>
                <h3>{lang === "vi" ? "Khám phá tiếp" : lang === "zh" ? "继续探索" : "Explore next"}</h3>
              </div>
              <span className="knowledge-links__count">{related.length} {lang === "vi" ? "liên kết" : lang === "zh" ? "个关联" : "links"}</span>
            </div>
            <div className="knowledge-links__grid">
              {related.map((item) => (
                <button key={item.id} className="knowledge-card" onClick={() => setKnowledgeFocus(item)}>
                  <span className="knowledge-card__icon">{item.icon}</span>
                  <span className="knowledge-card__body">
                    <small>{item.type?.[lang] || item.type?.vi}</small>
                    <strong>{item.title?.[lang] || item.title?.vi}</strong>
                    <span>{item.note?.[lang] || item.note?.vi}</span>
                  </span>
                  <span className="knowledge-card__arrow">→</span>
                </button>
              ))}
            </div>
          </section>

          <div className="story__src">
            <span>{tr(lang, "sources")}:</span>
            {(dest.sources || []).slice(0, 4).map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>
            ))}
          </div>
        </main>
      )}

      <footer className="story__ctl">
        <div className="story__segs" role="group" aria-label={tr(lang, "story_chapters")}>
          {segments.map((sg) => {
            const done = idx > sg.end || ended;
            const inside = idx >= sg.start && idx <= sg.end;
            const pct = done ? 100 : inside ? ((idx - sg.start + 1) / (sg.end - sg.start + 1)) * 100 : 0;
            const name = sg.layer ? pick(sg.layer.name, lang) : sg.key === "open" ? tr(lang, "story_intro_label") : tr(lang, "story_outro_label");
            return (
              <button key={`${sg.key}-${sg.start}`} className={`stseg ${inside ? "stseg--on" : ""}`} onClick={() => eng.goto(sg.start, true)} title={name} aria-label={name}>
                <i>{sg.layer ? sg.layer.icon : "✦"}</i>
                <span className="stseg__bar"><b style={{ width: `${pct}%` }} /></span>
              </button>
            );
          })}
        </div>

        <div className="story__row">
          <div className="story__modes" role="group">
            {MODES.map((m) => (
              <button key={m} className={m === safeMode ? "on" : ""} onClick={() => setMode(m)} aria-pressed={m === safeMode}>
                {tr(lang, `story_mode_${m}`)}
                <small>{approxMinutes(lang, meta[m].ms)}</small>
              </button>
            ))}
          </div>

          <div className="story__main">
            <button className="cbtn" onClick={eng.prev} disabled={idx === 0 && !ended} aria-label={tr(lang, "story_prev")} title={tr(lang, "story_prev")}>⏮</button>
            <button className="cbtn cbtn--play" onClick={eng.toggle} aria-label={eng.playing ? tr(lang, "story_pause") : tr(lang, "story_play")} title={eng.playing ? tr(lang, "story_pause") : tr(lang, "story_play")} autoFocus>
              {eng.playing ? "❚❚" : "▶"}
            </button>
            <button className="cbtn" onClick={eng.next} disabled={idx >= sentences.length - 1} aria-label={tr(lang, "story_next")} title={tr(lang, "story_next")}>⏭</button>
          </div>

          <div className="story__side">
            <button
              className={`cbtn cbtn--download ${offline.downloaded ? "on" : ""}`}
              onClick={downloadOffline}
              disabled={downloading || offline.downloaded || !preparedTracks.length}
              title={
                offline.downloaded
                  ? (lang === "vi" ? "Đã tải để nghe offline" : lang === "zh" ? "已下载，可离线收听" : "Downloaded for offline listening")
                  : (lang === "vi" ? "Tải gói thuyết minh" : lang === "zh" ? "下载讲解包" : "Download audio package")
              }
            >
              {offline.downloaded
                ? (lang === "vi" ? "✓ Đã tải" : lang === "zh" ? "✓ 已下载" : "✓ Downloaded")
                : downloading
                  ? `↓ ${downloadProgress || "..."}`
                  : (lang === "vi" ? "↓ Tải gói" : lang === "zh" ? "↓ 下载" : "↓ Download")}
            </button>
            <button className={`cbtn cbtn--pill ${eng.voiceOn ? "on" : ""}`} onClick={() => eng.setVoiceOn(!eng.voiceOn)} aria-pressed={eng.voiceOn} aria-label={eng.voiceOn ? tr(lang, "story_voice_on") : tr(lang, "story_voice_off")} title={eng.voiceOn ? tr(lang, "story_voice_on") : tr(lang, "story_voice_off")}>
              {eng.voiceOn ? "🔊" : "🔇"}
            </button>
            <select className="story__speed" value={eng.speed} onChange={(e) => eng.setSpeed(Number(e.target.value))} aria-label={tr(lang, "story_speed")} title={tr(lang, "story_speed")}>
              {SPEEDS.map((s) => <option key={s} value={s}>{s}×</option>)}
            </select>
          </div>
        </div>
        <p className="story__note">{note}</p>
      </footer>

      {knowledgeFocus && (
        <div className="knowledge-modal-backdrop" onClick={() => setKnowledgeFocus(null)}>
          <article className="knowledge-modal" onClick={(e) => e.stopPropagation()}>
            <button className="knowledge-modal__close" onClick={() => setKnowledgeFocus(null)}>×</button>
            <div className="knowledge-modal__icon">{knowledgeFocus.icon}</div>
            <span className="knowledge-modal__type">{knowledgeFocus.type?.[lang] || knowledgeFocus.type?.vi}</span>
            <h3>{knowledgeFocus.title?.[lang] || knowledgeFocus.title?.vi}</h3>
            <p>{knowledgeFocus.note?.[lang] || knowledgeFocus.note?.vi}</p>
            <div className="knowledge-modal__path">
              <span>{pick(dest.name, lang)}</span><b>→</b><span>{knowledgeFocus.title?.[lang] || knowledgeFocus.title?.vi}</span>
            </div>
            <p className="knowledge-modal__mvp">
              {lang === "vi" ? "Đây là một liên kết trong mạng tri thức của điểm đến. Node này có thể được mở rộng thành nội dung riêng ở bước tiếp theo."
              : lang === "zh" ? "这是目的地知识网络中的一个关联节点，后续可扩展为独立内容。"
              : "This is a relation in the destination knowledge network and can later expand into its own content node."}
            </p>
          </article>
        </div>
      )}

      {track && <audio {...eng.audioProps} />}
    </div>
  );
}
