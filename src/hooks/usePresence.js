import { useEffect, useState } from "react";
import { connectPresence } from "../lib/presenceConnection.js";
import { getDeviceId } from "../lib/presenceModel.js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
const configured = Boolean(url && key);

export default function usePresence(observer = false) {
  const [state, setState] = useState({
    status: configured ? "connecting" : "unconfigured", devices: null, tabs: null,
  });
  useEffect(() => {
    if (!configured) return;
    let disposed = false;
    let generation = 0;
    let connection;
    const deviceId = observer ? null : getDeviceId({
      getItem: (name) => window.localStorage.getItem(name),
      setItem: (name, value) => window.localStorage.setItem(name, value),
    }, () => crypto.randomUUID());
    const stop = () => {
      generation += 1;
      connection?.close();
      connection = null;
    };
    const start = async () => {
      stop();
      const current = generation;
      setState({ status: navigator.onLine ? "connecting" : "offline", devices: null, tabs: null });
      if (!navigator.onLine) return;
      try {
        const { createClient } = await import("@supabase/supabase-js");
        if (disposed || current !== generation) return;
        const client = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
        });
        connection = connectPresence({
          client,
          topic: import.meta.env.VITE_PRESENCE_ROOM?.trim() || `bdtt-demo-v1:${location.host}`,
          deviceId, observer,
          isVisible: () => document.visibilityState === "visible",
          onUpdate: (next) => {
            if (!disposed && current === generation) setState(next);
          },
        });
      } catch {
        if (!disposed && current === generation) {
          setState({ status: "error", devices: null, tabs: null });
        }
      }
    };
    const offline = () => {
      stop();
      setState({ status: "offline", devices: null, tabs: null });
    };
    const visibility = () => { void connection?.visibilityChanged(); };
    void start();
    window.addEventListener("online", start);
    window.addEventListener("offline", offline);
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", start);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      stop();
      window.removeEventListener("online", start);
      window.removeEventListener("offline", offline);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", start);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [observer]);
  return state;
}
