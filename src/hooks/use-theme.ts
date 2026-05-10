import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let currentTheme: Theme = getInitialTheme();
const listeners = new Set<() => void>();

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}

if (typeof window !== "undefined") {
  applyTheme(currentTheme);
}

function setThemeInternal(next: Theme) {
  if (next === currentTheme) return;
  currentTheme = next;
  applyTheme(next);
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => currentTheme,
    () => "light" as Theme,
  );

  const setTheme = useCallback((t: Theme) => setThemeInternal(t), []);
  const toggle = useCallback(
    () => setThemeInternal(currentTheme === "dark" ? "light" : "dark"),
    [],
  );

  return { theme, setTheme, toggle };
}
