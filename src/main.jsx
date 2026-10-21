import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Runtime from "./Runtime.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Runtime />
  </StrictMode>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  });
}
