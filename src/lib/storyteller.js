import { LAYERS } from "../data/content";
import { pick } from "../i18n";

const API_URL = import.meta.env.VITE_STORYTELLER_API;

function layerName(id, lang) {
  const layer = LAYERS.find((x) => x.id === id);
  return layer ? pick(layer.name, lang) : id;
}

function selectEntries(dest, mode) {
  const preferred = {
    quick: ["history", "heritage", "story"],
    history: ["history", "heritage", "story"],
    culture: ["culture", "food", "story"],
    local: ["story", "culture", "food"],
  }[mode] || ["story", "history", "culture"];

  const rankOf = (layerId) => {
    const index = preferred.indexOf(layerId);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };

  // Xếp hạng ổn định theo đúng lớp tri thức của điểm đến hiện tại.
  // Các layer không thuộc mode được đẩy xuống cuối thay vì vô tình đứng trước.
  const ranked = dest.entries
    .map((entry, originalIndex) => ({ entry, originalIndex }))
    .sort((a, b) => rankOf(a.entry.layer) - rankOf(b.entry.layer) || a.originalIndex - b.originalIndex)
    .map(({ entry }) => entry);

  return ranked.slice(0, mode === "quick" ? 2 : 4);
}

export function buildLocalStory(dest, lang, mode) {
  const entries = selectEntries(dest, mode);
  const name = pick(dest.name, lang);
  const intro = pick(dest.intro, lang);
  const tagline = pick(dest.tagline, lang);

  if (lang !== "vi") {
    const body = entries.map((e) => `${pick(e.title, lang)}. ${pick(e.body, lang)}`).join(" ");
    return `${tagline}. ${intro} ${body}`;
  }

  const openings = {
    quick: `Nếu chỉ có một phút để cảm nhận ${name}, hãy bắt đầu từ điều làm nơi này khác biệt.`,
    history: `Muốn hiểu ${name}, ta phải quay ngược thời gian và nhìn vào những dấu mốc đã tạo nên vùng đất này.`,
    culture: `${name} không chỉ được nhớ bằng những địa danh. Bản sắc của nơi này còn nằm trong văn hóa, nhịp sống và hương vị địa phương.`,
    local: `Hãy thử nhìn ${name} như một người bản địa: không vội đi qua các điểm check-in, mà tìm những câu chuyện ẩn phía sau chúng.`,
  };

  const transitions = ["Trước hết", "Điều thú vị tiếp theo", "Nhưng câu chuyện chưa dừng ở đó", "Và nếu để ý kỹ"];
  const body = entries.map((e, i) => `${transitions[i] || "Tiếp theo"}, ${pick(e.title, lang).toLowerCase()}. ${pick(e.body, lang)}`).join(" ");
  return `${openings[mode] || openings.local} ${intro} ${body} Đó là lý do ${name} đáng để khám phá bằng cả hành trình lẫn câu chuyện.`;
}

export async function generateStory({ dest, lang, mode }) {
  if (!API_URL) return { text: buildLocalStory(dest, lang, mode), source: "local" };

  const payload = {
    destination: { id: dest.id, name: pick(dest.name, lang), intro: pick(dest.intro, lang) },
    mode,
    lang,
    knowledge: selectEntries(dest, mode).map((e) => ({
      layer: layerName(e.layer, lang), title: pick(e.title, lang), body: pick(e.body, lang),
    })),
    sources: dest.sources,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Storyteller API ${res.status}`);
  const data = await res.json();
  if (!data?.text) throw new Error("Storyteller API returned no text");
  return { text: data.text, source: "ai" };
}
