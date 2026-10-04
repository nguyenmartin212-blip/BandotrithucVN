// Tạo file mp3 thuyết minh từ đúng nội dung chữ trong app.
// Cần: Node 20+, Python 3 và `pip install edge-tts` (cần Internet khi chạy).
//
//   node scripts/gen-audio.mjs                 # tiếng Việt, mọi địa điểm, cả 2 chế độ
//   node scripts/gen-audio.mjs --lang vi,en    # nhiều ngôn ngữ
//   node scripts/gen-audio.mjs --only hue      # chỉ một địa điểm
//   node scripts/gen-audio.mjs --mode short    # chỉ một chế độ
//   node scripts/gen-audio.mjs --dry           # chỉ in/ghi chữ ra, không gọi TTS
//
// Kết quả: public/audio/<dest>-<lang>-<mode>.mp3 và public/audio/manifest.json (gộp với bản cũ).

import { register } from "node:module";
import { spawnSync } from "node:child_process";
import { mkdirSync, existsSync, readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Cho Node đọc được import không có đuôi .js như trong code Vite.
register(
  "data:text/javascript," +
    encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); }
  catch (e) { if (e.code === "ERR_MODULE_NOT_FOUND" && /^[./]/.test(spec)) return next(spec + ".js", ctx); throw e; }
}`),
  import.meta.url
);

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const VOICES = {
  vi: "vi-VN-HoaiMyNeural",
  en: "en-US-AriaNeural",
  zh: "zh-CN-XiaoxiaoNeural",
  ko: "ko-KR-SunHiNeural",
};

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf("--" + name);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : def;
};
const dry = args.includes("--dry");
const langs = opt("lang", "vi").split(",");
const only = opt("only", "");
const modes = opt("mode", "short,full").split(",");
const rate = opt("rate", "+0%");

for (const l of langs) if (!VOICES[l]) { console.error(`Ngôn ngữ không hỗ trợ: ${l}`); process.exit(1); }

const { DESTINATIONS } = await import(pathToFileURL(join(ROOT, "src/data/content.js")).href);
const { buildStory } = await import(pathToFileURL(join(ROOT, "src/lib/story.js")).href);

const outDir = join(ROOT, "public/audio");
mkdirSync(outDir, { recursive: true });
const tmpDir = mkdtempSync(join(tmpdir(), "bdtt-audio-"));
const manifestPath = join(outDir, "manifest.json");
let manifest = { tracks: [] };
if (existsSync(manifestPath)) {
  try { manifest = JSON.parse(readFileSync(manifestPath, "utf8")); } catch { /* làm mới */ }
}
manifest.tracks ||= [];

// Tìm cách gọi edge-tts: ưu tiên "python -m edge_tts" vì lệnh edge-tts.exe thường không nằm trong PATH trên Windows.
const CANDIDATES = [
  ["python", ["-m", "edge_tts"], ["-c", "import edge_tts"]],
  ["py", ["-m", "edge_tts"], ["-c", "import edge_tts"]],
  ["python3", ["-m", "edge_tts"], ["-c", "import edge_tts"]],
  ["edge-tts", [], ["--help"]],
];
let runner = null;
function findRunner() {
  for (const [cmd, pre, probe] of CANDIDATES) {
    const argv = cmd === "edge-tts" ? probe : probe;
    const r = spawnSync(cmd, argv, { stdio: "ignore" });
    if (!r.error && r.status === 0) return [cmd, pre];
  }
  return null;
}

function runTts(textFile, voice, outFile) {
  runner ||= findRunner();
  if (!runner) {
    console.error("Không tìm thấy edge-tts. Cài bằng: pip install edge-tts (hoặc py -m pip install edge-tts)");
    process.exit(1);
  }
  const [cmd, pre] = runner;
  const r = spawnSync(cmd, [...pre, "--voice", voice, `--rate=${rate}`, "--file", textFile, "--write-media", outFile], { stdio: "inherit" });
  return !r.error && r.status === 0;
}

let failed = 0;
for (const dest of DESTINATIONS) {
  if (only && dest.id !== only) continue;
  for (const lang of langs) {
    for (const mode of modes) {
      const text = buildStory(dest, lang, mode).map((s) => s.text).join("\n");
      const name = `${dest.id}-${lang}-${mode}`;
      const txt = join(tmpDir, name + ".txt");
      const mp3 = join(outDir, name + ".mp3");
      writeFileSync(txt, text, "utf8");
      console.log(`• ${name}: ${text.length} ký tự`);
      if (dry) continue;
      if (!runTts(txt, VOICES[lang], mp3)) { failed++; continue; }
      const src = `/audio/${name}.mp3`;
      manifest.tracks = manifest.tracks.filter((t) => t.src !== src);
      manifest.tracks.push({ dest: dest.id, lang, mode, src });
    }
  }
}

if (!dry) writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(dry ? "Xong (dry run, chưa tạo mp3)." : `Xong. ${manifest.tracks.length} track trong manifest, ${failed} lỗi.`);
process.exit(failed ? 1 : 0);
