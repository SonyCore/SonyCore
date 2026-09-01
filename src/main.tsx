import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./lib/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

function dismissBootScreen() {
  const boot = document.getElementById("boot");
  if (!boot) return;
  boot.classList.add("boot-done");
  boot.addEventListener("transitionend", () => boot.remove(), { once: true });
  window.setTimeout(() => boot.remove(), 600);
}

requestAnimationFrame(() => requestAnimationFrame(dismissBootScreen));
