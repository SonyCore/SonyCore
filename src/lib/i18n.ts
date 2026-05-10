import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
      tr: { translation: tr },
    },
    fallbackLng: "en",
    supportedLngs: [...LOCALES],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "locale",
    },
    returnObjects: true,
  });

// Keep <html dir|lang> in sync with i18next on every language change.
function applyHtmlAttrs(lng: string) {
  const code = (lng?.split("-")[0] ?? "en") as Locale;
  const safe = isLocale(code) ? code : "en";
  document.documentElement.lang = safe;
  document.documentElement.dir = LOCALE_META[safe].dir;
}
applyHtmlAttrs(i18n.language);
i18n.on("languageChanged", applyHtmlAttrs);

export default i18n;
