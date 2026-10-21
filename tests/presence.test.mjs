import test from "node:test";
import assert from "node:assert/strict";
import { countPresence, reconcilePresence, getDeviceId, publicAppUrl } from "../src/lib/presenceModel.js";
import { connectPresence } from "../src/lib/presenceConnection.js";

const visitor = (deviceId, sessionId, heartbeat = 1) => ({ role: "visitor", deviceId, sessionId, heartbeat });

test("two tabs of one browser count once; closing one keeps the other online", () => {
  let records = reconcilePresence(new Map(), {
    a: [visitor("phone", "a")], b: [visitor("phone", "b")], c: [visitor("laptop", "c")],
    d: [{ role: "dashboard" }],
  }, 0);
  assert.deepEqual(countPresence(records, 0), { devices: 2, tabs: 3 });
  records = reconcilePresence(records, { b: [visitor("phone", "b")], c: [visitor("laptop", "c")] }, 10);
  assert.deepEqual(countPresence(records, 10), { devices: 2, tabs: 2 });
  records = reconcilePresence(records, { c: [visitor("laptop", "c")] }, 20);
  assert.deepEqual(countPresence(records, 20), { devices: 1, tabs: 1 });
});

test("stale clients expire even if other clients continue syncing; a heartbeat restores them", () => {
  let records = reconcilePresence(new Map(), { a: [visitor("phone", "a")] }, 0);
  records = reconcilePresence(records, { a: [visitor("phone", "a")], b: [visitor("other", "b")] }, 30_000);
  assert.deepEqual(countPresence(records, 35_000), { devices: 1, tabs: 1 });
  records = reconcilePresence(records, { a: [visitor("phone", "a", 2)], b: [visitor("other", "b")] }, 36_000);
  assert.deepEqual(countPresence(records, 36_000), { devices: 2, tabs: 2 });
});

test("device identity persists; blocked storage does not break the application", () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  assert.equal(getDeviceId(storage, () => "browser-123"), "browser-123");
  assert.equal(getDeviceId(storage, () => "browser-456"), "browser-123");
  assert.equal(getDeviceId({ getItem() { throw Error("blocked"); } }, () => "fallback-id"), "fallback-id");
});

test("QR targets the app, removing dashboard parameters and rejecting unsafe URLs", () => {
  assert.equal(publicAppUrl("https://example.com/?dashboard=live", "http://localhost:5173"), "https://example.com/?demo=1");
  assert.equal(publicAppUrl("", "https://example.com"), "https://example.com/?demo=1");
  assert.throws(() => publicAppUrl("javascript:alert(1)", ""));
  assert.throws(() => publicAppUrl("https://user:password@example.com", ""));
});

function harness(observer = false) {
  let sync, subscription;
  let state = {};
  let visible = true;
  let clock = 0;
  const updates = [], tracked = [], timers = new Set();
  let untracks = 0, disconnected = false, removed = false;
  const channel = {
    on(_type, _filter, callback) { sync = callback; return this; },
    subscribe(callback) { subscription = callback; return this; },
    presenceState: () => state,
    track: async (payload) => { tracked.push(payload); return "ok"; },
    untrack: async () => { untracks += 1; return "ok"; },
  };
  const connection = connectPresence({
    client: { channel: () => channel, removeChannel: async () => { removed = true; }, realtime: { disconnect() { disconnected = true; } } },
    topic: "test", deviceId: "phone", observer, onUpdate: (next) => updates.push(next),
    isVisible: () => visible, now: () => clock, makeId: () => "session-id",
    every(callback) { timers.add(callback); return callback; }, cancel(callback) { timers.delete(callback); },
  });
  return {
    connection, updates, tracked, timers,
    status: (value) => subscription(value),
    sync(value) { state = value; sync?.(); },
    visible(value) { visible = value; return connection.visibilityChanged(); },
    advance(value) { clock = value; for (const callback of timers) callback(); },
    get untracks() { return untracks; }, get disconnected() { return disconnected; }, get removed() { return removed; },
  };
}

test("dashboard subscribes without becoming a visitor; network failure clears the count", () => {
  const h = harness(true);
  h.status("SUBSCRIBED");
  assert.equal(h.updates.length, 0, "wait for authoritative initial sync");
  h.sync({ a: [visitor("phone", "a")] });
  assert.deepEqual(h.updates.at(-1), { status: "live", devices: 1, tabs: 1 });
  h.status("CHANNEL_ERROR");
  assert.deepEqual(h.updates.at(-1), { status: "reconnecting", devices: null, tabs: null });
  h.status("SUBSCRIBED");
  h.sync({});
  assert.deepEqual(h.updates.at(-1), { status: "live", devices: 0, tabs: 0 });
  assert.equal(h.tracked.length, 0);
  h.connection.close();
  assert.equal(h.timers.size, 0);
});

test("visitor untracks on hidden, tracks again on return, and cleans up on page exit", async () => {
  const h = harness();
  h.status("SUBSCRIBED");
  assert.equal(h.tracked.length, 1);
  await h.visible(false);
  assert.equal(h.untracks, 1);
  await h.visible(true);
  assert.equal(h.tracked.length, 2);
  assert.equal(h.tracked[1].heartbeat, 2);
  h.connection.close();
  assert.equal(h.untracks, 2);
  assert.ok(h.disconnected && h.removed);
  assert.equal(h.timers.size, 0);
  const before = h.updates.length;
  h.sync({ a: [visitor("phone", "a")] });
  assert.equal(h.updates.length, before, "ignore callbacks after unmount/StrictMode cleanup");
});
