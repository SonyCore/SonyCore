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

/** Fade out and remove the boot screen from index.html. */
function dismissBootScreen() {
  const boot = document.getElementById("boot");
  if (!boot) return;
  boot.classList.add("boot-done");
  boot.addEventListener("transitionend", () => boot.remove(), { once: true });
  // transitionend doesn't fire in a background tab, and reduced-motion
  // collapses the duration to nothing — either way, don't leak the node.
  window.setTimeout(() => boot.remove(), 600);
}

// Two frames: the first lets React commit, the second lets the browser paint
// it, so the overlay never lifts onto an empty page.
requestAnimationFrame(() => requestAnimationFrame(dismissBootScreen));
