import { useEffect, useMemo, useState } from "react";
import { tr } from "../i18n";

// Ảnh minh họa lấy từ Wikipedia/Wikimedia (giấy phép mở, có link ghi nguồn).
// Dùng MediaWiki Action API vì ổn định hơn REST summary cũ và hỗ trợ CORS qua origin=*.
const cache = new Map();

function normalizeTitles(titles) {
  return (Array.isArray(titles) ? titles : [titles])
    .filter(Boolean)
    .map((t) => String(t).trim())
    .filter(Boolean);
}

function apiUrl(lang, params) {
  const qs = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    origin: "*",
    ...params,
  });
  return `https://${lang}.wikipedia.org/w/api.php?${qs.toString()}`;
}

function pickPage(payload) {
  const page = payload?.query?.pages?.find?.((p) => !p.missing && (p.thumbnail?.source || p.original?.source));
  if (!page) return null;
  return {
    thumb: page.thumbnail?.source || null,
    thumbW: page.thumbnail?.width || null,
    orig: page.original?.source || null,
    origW: page.original?.width || null,
    page: page.fullurl || null,
  };
}

async function fetchExactTitle(title, lang, width) {
  const url = apiUrl(lang, {
    prop: "pageimages|info",
    piprop: "thumbnail|original",
    pithumbsize: String(Math.max(640, width * 2)),
    inprop: "url",
    redirects: "1",
    titles: title,
  });
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return pickPage(await r.json());
  } catch {
    return null;
  }
}

async function fetchSearchTitle(title, lang, width) {
  const url = apiUrl(lang, {
    generator: "search",
    gsrsearch: title,
    gsrlimit: "5",
    gsrnamespace: "0",
    prop: "pageimages|info",
    piprop: "thumbnail|original",
    pithumbsize: String(Math.max(640, width * 2)),
    inprop: "url",
  });
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return pickPage(await r.json());
  } catch {
    return null;
  }
}


async function fetchCommonsImage(title, width) {
  const qs = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    origin: "*",
    generator: "search",
    gsrsearch: title,
    gsrnamespace: "6",
    gsrlimit: "6",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: String(Math.max(640, width * 2)),
  });
  const url = `https://commons.wikimedia.org/w/api.php?${qs.toString()}`;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const payload = await r.json();
    const page = payload?.query?.pages?.find?.((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url);
    const image = page?.imageinfo?.[0];
    if (!image) return null;
    return {
      thumb: image.thumburl || image.url,
      thumbW: image.thumbwidth || null,
      orig: image.url || image.thumburl,
      origW: image.width || null,
      page: image.descriptionurl || null,
    };
  } catch {
    return null;
  }
}

async function resolve(titles, width) {
  const candidates = normalizeTitles(titles);
  if (!candidates.length) return null;

  // Ưu tiên Wikipedia tiếng Anh vì phần lớn wiki-title trong data đang theo enwiki.
  for (const lang of ["en", "vi"]) {
    for (const title of candidates) {
      const exact = await fetchExactTitle(title, lang, width);
      if (exact) return exact;
    }
  }

  // Nếu path/title cũ không còn khớp, tìm trang gần nhất thay vì để card trống.
  for (const lang of ["en", "vi"]) {
    for (const title of candidates.slice(0, 3)) {
      const found = await fetchSearchTitle(title, lang, width);
      if (found) return found;
    }
  }

  // Cuối cùng tìm trực tiếp trong Wikimedia Commons. Hữu ích cho nghệ thuật
  // biểu diễn/ẩm thực khi bài Wikipedia không có page-image đại diện.
  for (const title of candidates.slice(0, 3)) {
    const commons = await fetchCommonsImage(title, width);
    if (commons) return commons;
  }

  return null;
}

function sizedSrc(info, width) {
  if (!info) return "";
  if (info.thumb && info.thumbW && width <= info.thumbW) return info.thumb;
  return info.orig || info.thumb || "";
}

export default function WikiImage({ titles, width = 500, alt = "", className = "", lang = "vi", fallback = null, eager = false }) {
  const list = useMemo(() => normalizeTitles(titles), [titles]);
  const key = `${width}|${list.join("|")}`;
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    let active = true;
    setInfo(undefined);

    if (!cache.has(key)) cache.set(key, resolve(list, width));
    cache.get(key).then((result) => {
      if (active) setInfo(result);
    });

    return () => {
      active = false;
    };
  }, [key, list, width]);

  if (info === null) return fallback;

  return (
    <figure className={`wimg ${className}`}>
      {info === undefined ? (
        <div className="wimg__ph" />
      ) : (
        <img
          src={sizedSrc(info, width)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setInfo(null)}
        />
      )}
      {info?.page && (
        <a className="wimg__credit" href={info.page} target="_blank" rel="noreferrer">
          {tr(lang, "photo")} ↗
        </a>
      )}
    </figure>
  );
}
