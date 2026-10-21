export const PRESENCE_TTL_MS = 35_000;

// Receipt times use this browser's clock, never another device's clock.
export function reconcilePresence(previous, state, now) {
  const next = new Map();
  for (const items of Object.values(state)) {
    for (const item of items) {
      if (item?.role !== "visitor" || typeof item.deviceId !== "string" ||
          typeof item.sessionId !== "string" || !Number.isSafeInteger(item.heartbeat)) continue;
      const key = `${item.sessionId}:${item.presence_ref || ""}`;
      const old = previous.get(key);
      next.set(key, {
        deviceId: item.deviceId,
        heartbeat: item.heartbeat,
        receivedAt: old?.heartbeat === item.heartbeat ? old.receivedAt : now,
      });
    }
  }
  return next;
}

export function countPresence(records, now, ttl = PRESENCE_TTL_MS) {
  const devices = new Set();
  let tabs = 0;
  for (const item of records.values()) {
    if (now - item.receivedAt >= ttl) continue;
    devices.add(item.deviceId);
    tabs += 1;
  }
  return { devices: devices.size, tabs };
}

export function getDeviceId(storage, makeId) {
  const key = "bdtt.presence.device.v1";
  try {
    const saved = storage.getItem(key);
    if (saved && /^[a-zA-Z0-9-]{8,100}$/.test(saved)) return saved;
    const id = makeId();
    storage.setItem(key, id);
    return id;
  } catch {
    // Restricted storage: this tab is counted separately, without blocking the app.
    return makeId();
  }
}

export function publicAppUrl(configured, origin) {
  const url = new URL(configured || origin);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("URL website phải bắt đầu bằng https:// hoặc http://.");
  }
  url.pathname = "/";
  url.search = "?demo=1";
  url.hash = "";
  return url.toString();
}
