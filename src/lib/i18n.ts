import en from "@/locales/en.json";
import fa from "@/locales/fa.json";
import tr from "@/locales/tr.json";

export const LOCALES = ["en", "fa", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; flag: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", nativeLabel: "English", flag: "🇬🇧", dir: "ltr" },
  fa: { label: "Persian", nativeLabel: "فارسی", flag: "🇮🇷", dir: "rtl" },
  tr: { label: "Turkish", nativeLabel: "Türkçe", flag: "🇹🇷", dir: "ltr" },
};

export type Translation = typeof en;

const RESOURCES: Record<Locale, Translation> = {
  en,
  fa: fa as unknown as Translation,
  tr: tr as unknown as Translation,
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

const STORAGE_KEY = "locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
  }
  const base = (navigator.language || "en").slice(0, 2).toLowerCase();
  return isLocale(base) ? base : "en";
}

let current: Locale = detectLocale();
const listeners = new Set<() => void>();

function applyHtmlAttrs(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = LOCALE_META[locale].dir;
}

if (typeof window !== "undefined") {
  applyHtmlAttrs(current);
}

export function getLocale(): Locale {
  return current;
}

export function getResources(locale: Locale): Translation {
  return RESOURCES[locale] ?? en;
}

export function setLocale(next: Locale) {
  if (next === current || !isLocale(next)) return;
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
  }
  applyHtmlAttrs(next);
  listeners.forEach((l) => l());
}

export function subscribeLocale(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
