import { countPresence, reconcilePresence } from "./presenceModel.js";

// One connection per page. Dashboard subscribes but never publishes visitor state.
export function connectPresence({ client, topic, deviceId, observer, onUpdate,
  isVisible, now = () => performance.now(), makeId = () => crypto.randomUUID(),
  every = setInterval, cancel = clearInterval }) {
  let stopped = false;
  let subscribed = false;
  let synced = false;
  let records = new Map();
  let heartbeat = 0;
  const sessionId = makeId();
  const channel = client.channel(topic, { config: { presence: { key: sessionId, enabled: observer } } });
  const emit = () => {
    if (!stopped && synced) onUpdate({ status: "live", ...countPresence(records, now()) });
  };
  const publish = async () => {
    if (stopped || !subscribed || observer) return;
    try {
      if (!isVisible()) await channel.untrack();
      else await channel.track({ role: "visitor", deviceId, sessionId, heartbeat: ++heartbeat });
    } catch {
      // Socket reconnect/resubscribe and the next heartbeat will retry.
    }
  };
  // Visitors only publish. Avoid broadcasting every heartbeat to every visitor.
  if (observer) channel.on("presence", { event: "sync" }, () => {
    if (stopped) return;
    records = reconcilePresence(records, channel.presenceState(), now());
    synced = true;
    emit();
  });
  channel.subscribe((status) => {
    if (stopped) return;
    subscribed = status === "SUBSCRIBED";
    if (subscribed) {
      void publish();
    } else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status)) {
      synced = false;
      records = new Map();
      onUpdate({ status: "reconnecting", devices: null, tabs: null });
    }
  });
  const heartbeatTimer = every(publish, 10_000);
  const expiryTimer = every(emit, 2_000);
  return {
    visibilityChanged: publish,
    close() {
      stopped = true;
      cancel(heartbeatTimer);
      cancel(expiryTimer);
      // Best-effort leave; expiry handles crashes and network loss.
      if (!observer && subscribed) void channel.untrack().catch(() => {});
      void client.removeChannel(channel).catch(() => {});
      client.realtime.disconnect();
    },
  };
}
