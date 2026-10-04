import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useLocal from "./useLocal";
import { estimateMs, PAUSE_MS } from "../lib/story";

// Bộ máy phát lời kể. Ba chế độ, tự chọn theo thứ tự ưu tiên:
//   "file": phát file mp3 có sẵn trong /audio/manifest.json, chữ chạy theo tỉ lệ thời gian
//   "tts" : giọng đọc có sẵn của trình duyệt (Web Speech API), mỗi câu một lượt đọc
//   "text": không có tiếng, chữ tự chạy theo thời lượng ước tính
// Mỗi câu là một đơn vị, nên tạm dừng/tua theo câu và không dính lỗi dừng sau ~15 giây của Chrome.

const PREFERRED = { vi: "vi-vn", en: "en-us", zh: "zh-cn", ko: "ko-kr" };

function getSynth() {
  if (typeof window === "undefined") return null;
  const s = window.speechSynthesis;
  if (!s || typeof window.SpeechSynthesisUtterance === "undefined") return null;
  return s;
}

const tag = (v) => String(v.lang || "").toLowerCase().replace("_", "-");

export function pickVoice(voices, lang) {
  const same = voices.filter((v) => tag(v) === lang || tag(v).startsWith(lang + "-"));
  return same.find((v) => tag(v) === PREFERRED[lang]) || same[0] || null;
}

export default function useStoryEngine({ sentences, lang, track }) {
  const [synth] = useState(getSynth);
  const [voices, setVoices] = useState(() => (synth ? synth.getVoices() : []));
  const [waited, setWaited] = useState(false);
  const [voiceOn, setVoiceOn] = useLocal("bdtt.story.voice", true);
  const [speed, setSpeed] = useLocal("bdtt.story.speed", 1);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);
  const [failedSrc, setFailedSrc] = useState(null);
  const audioRef = useRef(null);

  // Giọng đọc của trình duyệt nạp bất đồng bộ.
  useEffect(() => {
    if (!synth) return undefined;
    const update = () => setVoices(synth.getVoices());
    update();
    synth.addEventListener?.("voiceschanged", update);
    const t = window.setTimeout(() => setWaited(true), 1500);
    return () => {
      synth.removeEventListener?.("voiceschanged", update);
      window.clearTimeout(t);
    };
  }, [synth]);


  const voice = useMemo(() => pickVoice(voices, lang), [voices, lang]);
  const fileOk = !!track && failedSrc !== track.src;
  const engine = fileOk ? "file" : synth && voiceOn && voice ? "tts" : "text";
  const voiceMissing = !fileOk && voiceOn && (!synth || (waited && !voice));

  const total = useMemo(() => sentences.reduce((s, x) => s + x.text.length, 0) || 1, [sentences]);
  const starts = useMemo(() => {
    const out = [];
    sentences.reduce((acc, s) => { out.push(acc); return acc + s.text.length; }, 0);
    return out;
  }, [sentences]);

  // ---------- Chế độ tts và text: mỗi câu một lượt, xong thì sang câu kế
  useEffect(() => {
    if (!playing || engine === "file") return undefined;
    const s = sentences[idx];
    if (!s) return undefined;

    let cancelled = false;
    let advanced = false;
    const timers = [];
    const later = (fn, ms) => timers.push(window.setTimeout(fn, ms));

    const advance = () => {
      if (cancelled || advanced) return;
      advanced = true;
      if (idx >= sentences.length - 1) {
        setPlaying(false);
        setEnded(true);
      } else {
        setIdx(idx + 1);
      }
    };
    const fallback = () => later(advance, estimateMs(s.text, lang) / speed + PAUSE_MS);

    if (engine === "tts") {
      later(() => {
        if (cancelled) return;
        const u = new window.SpeechSynthesisUtterance(s.text);
        u.voice = voice;
        u.lang = voice.lang;
        u.rate = speed;
        let started = false;
        u.onstart = () => { started = true; };
        u.onend = () => { if (!cancelled) later(advance, PAUSE_MS / speed); };
        u.onerror = (e) => {
          if (cancelled || e.error === "canceled" || e.error === "interrupted") return;
          fallback();
        };
        synth.speak(u);
        // Một số trình duyệt nhận lệnh đọc nhưng im lặng: nếu 3 giây vẫn chưa bắt đầu thì chạy chữ theo giờ.
        later(() => {
          if (!started && !cancelled && !advanced) {
            synth.cancel();
            fallback();
          }
        }, 3000);
      }, 60);
    } else {
      fallback();
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      if (engine === "tts") synth.cancel();
    };
  }, [playing, engine, idx, sentences, speed, voice, lang, synth]);

  // ---------- Chế độ file mp3
  useEffect(() => {
    if (engine !== "file") return;
    const a = audioRef.current;
    if (!a) return;
    a.playbackRate = speed;
    a.muted = !voiceOn;
    if (playing) {
      const p = a.play();
      if (p && p.catch) p.catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  }, [engine, playing, speed, voiceOn, track?.src]);

  // Dừng hẳn tiếng khi đóng.
  useEffect(() => () => synth?.cancel(), [synth]);

  const audioProps = {
    ref: audioRef,
    src: track?.src,
    preload: "auto",
    onTimeUpdate: () => {
      const a = audioRef.current;
      if (!a || !isFinite(a.duration) || a.duration <= 0) return;
      const target = (a.currentTime / a.duration) * total;
      let i = 0;
      while (i + 1 < starts.length && starts[i + 1] <= target) i++;
      setIdx((cur) => (cur === i ? cur : i));
    },
    onEnded: () => {
      setIdx(sentences.length - 1);
      setPlaying(false);
      setEnded(true);
    },
    onError: () => setFailedSrc(track?.src ?? null),
  };

  const goto = useCallback(
    (i, play) => {
      const n = Math.max(0, Math.min(sentences.length - 1, i));
      setEnded(false);
      setIdx(n);
      if (play !== undefined) setPlaying(play);
      const a = audioRef.current;
      if (engine === "file" && a && isFinite(a.duration)) a.currentTime = (starts[n] / total) * a.duration;
    },
    [sentences.length, engine, starts, total]
  );

  const next = useCallback(() => goto(idx + 1), [goto, idx]);
  const prev = useCallback(() => goto(idx - 1), [goto, idx]);
  const restart = useCallback(() => goto(0, true), [goto]);
  const toggle = useCallback(() => {
    if (ended) restart();
    else setPlaying((p) => !p);
  }, [ended, restart]);

  return {
    idx, playing, ended, engine, voiceOn, setVoiceOn, speed, setSpeed,
    voiceMissing, audioProps, goto, next, prev, restart, toggle, setPlaying,
  };
}
