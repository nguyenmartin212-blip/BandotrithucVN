import { lazy, Suspense } from "react";
import App from "./App.jsx";
import usePresence from "./hooks/usePresence.js";

const LiveDashboard = lazy(() => import("./components/LiveDashboard.jsx"));
const dashboard = new URLSearchParams(window.location.search).get("dashboard") === "live";

export default function Runtime() {
  const presence = usePresence(dashboard);
  return dashboard ? (
    <Suspense fallback={<p role="status">Đang mở dashboard…</p>}>
      <LiveDashboard presence={presence} />
    </Suspense>
  ) : <App />;
}
