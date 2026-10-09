const CACHE_NAME = "bdtt-audio-v1";

function supported() {
  return typeof window !== "undefined" && "caches" in window;
}

export function tracksForPackage(manifest, destId, lang) {
  return (manifest?.tracks || []).filter(
    (t) => t.dest === destId && t.lang === lang && t.src
  );
}

export async function packageStatus(manifest, destId, lang) {
  const tracks = tracksForPackage(manifest, destId, lang);
  if (!supported() || !tracks.length) return { downloaded: false, count: tracks.length };
  const cache = await caches.open(CACHE_NAME);
  const hits = await Promise.all(tracks.map((t) => cache.match(t.src)));
  return { downloaded: hits.every(Boolean), count: tracks.length };
}

export async function downloadPackage(manifest, destId, lang, onProgress) {
  if (!supported()) throw new Error("Cache API is not supported in this browser.");
  const tracks = tracksForPackage(manifest, destId, lang);
  if (!tracks.length) throw new Error("No prepared audio package for this language yet.");

  const cache = await caches.open(CACHE_NAME);
  let done = 0;
  for (const track of tracks) {
    const response = await fetch(track.src, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Cannot download ${track.src}`);
    await cache.put(track.src, response.clone());
    done += 1;
    onProgress?.(done, tracks.length);
  }
  return tracks.length;
}

export async function removePackage(manifest, destId, lang) {
  if (!supported()) return;
  const cache = await caches.open(CACHE_NAME);
  const tracks = tracksForPackage(manifest, destId, lang);
  await Promise.all(tracks.map((t) => cache.delete(t.src)));
}
