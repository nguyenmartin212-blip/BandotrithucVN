import { useEffect, useState } from "react";
import { tr } from "../i18n";

// Ảnh minh họa lấy từ ảnh đại diện bài viết Wikipedia (giấy phép mở, có ghi nguồn).
// Nếu không tải được thì tự ẩn / dùng nền thay thế, không làm hỏng giao diện.
const cache = new Map();

function fetchSummary(title) {
  if (cache.has(title)) return cache.get(title);
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_"));
  const p = fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      if (!j || (!j.thumbnail && !j.originalimage)) return null;
      return {
        thumb: j.thumbnail?.source,
        thumbW: j.thumbnail?.width,
        orig: j.originalimage?.source,
        origW: j.originalimage?.width,
        page: j.content_urls?.desktop?.page,
      };
    })
    .catch(() => null);
  cache.set(title, p);
  return p;
}

async function resolve(titles) {
  for (const t of titles) {
    const r = await fetchSummary(t);
    if (r) return r;
  }
  return null;
}

function sizedSrc(info, width) {
  if (info.thumb && info.thumbW && width <= info.thumbW) return info.thumb;
  if (info.thumb && info.origW && info.origW >= width) {
    const s = info.thumb.replace(/\/\d+px-/, `/${width}px-`);
    if (s !== info.thumb) return s;
  }
  return info.orig || info.thumb;
}

export default function WikiImage({ titles, width = 500, alt = "", className = "", lang = "vi", fallback = null }) {
  const list = Array.isArray(titles) ? titles : [titles];
  const key = list.join("|");
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    let on = true;
    setInfo(undefined);
    resolve(list).then((r) => on && setInfo(r));
    return () => {
      on = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (info === null) return fallback;
  return (
    <figure className={`wimg ${className}`}>
      {info === undefined ? (
        <div className="wimg__ph" />
      ) : (
        <img src={sizedSrc(info, width)} alt={alt} loading="lazy" onError={() => setInfo(null)} />
      )}
      {info && info.page && (
        <a className="wimg__credit" href={info.page} target="_blank" rel="noreferrer">
          {tr(lang, "photo")} ↗
        </a>
      )}
    </figure>
  );
}
