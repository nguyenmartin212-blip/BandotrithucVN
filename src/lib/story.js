// Dựng lời kể từ dữ liệu có nguồn. Thuần JS, không phụ thuộc React, nên kiểm thử được bằng Node.
import { LAYERS } from "../data/content";
import { SCRIPTS, CONNECTORS, SHORT_SENTENCES } from "../data/storyScripts";
import { pick } from "../i18n";

export const MODES = ["short", "full"];

// Các chữ viết tắt có dấu chấm nhưng không kết thúc câu.
const PROTECT = ["TP.", "Mr.", "Mrs.", "Dr.", "St.", "No."];
const MARK = "\u0001";

export function splitSentences(text) {
  let t = String(text || "").trim();
  if (!t) return [];
  for (const a of PROTECT) t = t.split(a).join(a.replace(".", MARK));
  return t
    .split(/(?<=[.!?]["”’)\]]?)\s+|(?<=[。！？])/)
    .map((s) => s.split(MARK).join(".").trim())
    .filter(Boolean);
}

// Ước lượng thời lượng đọc (ms) ở tốc độ 1x, dùng khi không có giọng đọc hoặc để hiện "~1 phút".
const MS_PER_CHAR = { vi: 62, en: 68, zh: 230, ko: 150 };
export const PAUSE_MS = 380;

export function estimateMs(text, lang) {
  const per = MS_PER_CHAR[lang] ?? 70;
  return Math.max(1500, Math.round(String(text).length * per));
}

export function buildStory(dest, lang, mode = "short") {
  const script = SCRIPTS[dest.id];
  const out = [];
  const push = (o) => out.push({ i: out.length, ...o });

  if (script) {
    push({
      kind: "open", para: "open", layer: null, entryId: null,
      title: pick(dest.name, lang), wiki: dest.hero,
      text: pick(script.open, lang),
    });
  }

  for (const layer of LAYERS) {
    const all = dest.entries.filter((e) => e.layer === layer.id);
    if (!all.length) continue;
    const entries = mode === "short" ? all.slice(0, 1) : all;

    if (mode === "full" && CONNECTORS[layer.id]) {
      push({
        kind: "chapter", para: `chapter-${layer.id}`, layer: layer.id, entryId: null,
        title: pick(layer.name, lang), wiki: entries[0].wiki,
        text: pick(CONNECTORS[layer.id], lang),
      });
    }

    for (const e of entries) {
      let sents = splitSentences(pick(e.body, lang));
      if (mode === "short") sents = sents.slice(0, SHORT_SENTENCES[layer.id] ?? 1);
      for (const text of sents) {
        push({
          kind: "body", para: e.id, layer: layer.id, entryId: e.id,
          title: pick(e.title, lang), wiki: e.wiki, text,
        });
      }
    }
  }

  if (script) {
    push({
      kind: "close", para: "close", layer: null, entryId: null,
      title: pick(dest.name, lang), wiki: dest.hero,
      text: pick(script.close, lang),
    });
  }
  return out;
}

export function totalMs(sentences, lang) {
  return sentences.reduce((s, x) => s + estimateMs(x.text, lang) + PAUSE_MS, 0);
}

export function storyMeta(dest, lang) {
  const meta = {};
  for (const m of MODES) {
    const s = buildStory(dest, lang, m);
    meta[m] = { count: s.length, ms: totalMs(s, lang) };
  }
  return meta;
}

// Chia câu thành các "từ" để hiện dần. Tiếng Trung không có khoảng trắng nên tách từng chữ.
export function tokenize(text, lang) {
  if (lang === "zh") return Array.from(text);
  return text.split(/(\s+)/).filter((x) => x.length);
}

// Các chỉ số tiện dụng cho giao diện.
export function paragraphBounds(sentences, idx) {
  const key = sentences[idx]?.para;
  let a = idx, b = idx;
  while (a > 0 && sentences[a - 1].para === key) a--;
  while (b < sentences.length - 1 && sentences[b + 1].para === key) b++;
  return [a, b];
}

export function firstIndexOfLayer(sentences, layerId) {
  const i = sentences.findIndex((s) => s.layer === layerId);
  return i < 0 ? 0 : i;
}

export function firstIndexOfPara(sentences, para) {
  const i = sentences.findIndex((s) => s.para === para);
  return i < 0 ? 0 : i;
}

export function findTrack(manifest, destId, lang, mode) {
  const list = manifest?.tracks;
  if (!Array.isArray(list)) return null;
  return list.find((t) => t.dest === destId && t.lang === lang && t.mode === mode && t.src) || null;
}
