import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  LOCALES,
  LOCALE_META,
  isLocale,
  type Locale,
  type Translation,
} from "@/lib/i18n";
import en from "@/locales/en.json";

export function useLocale() {
  const { i18n } = useTranslation();
  const raw = (i18n.language?.split("-")[0] ?? "en") as Locale;
  const locale: Locale = isLocale(raw) ? raw : "en";

  // Always read the resource for the current language as a typed object.
  // i18next returns undefined while resources are still being loaded, so
  // we fall back to the English bundle to keep the UI populated.
  const t =
    (i18n.getResourceBundle(locale, "translation") as Translation | undefined) ??
    (en as Translation);

  const setLocale = useCallback(
    (l: Locale) => {
      void i18n.changeLanguage(l);
    },
    [i18n],
  );

  return {
    locale,
    setLocale,
    t,
    locales: LOCALES,
    meta: LOCALE_META,
    dir: LOCALE_META[locale].dir,
    isRtl: LOCALE_META[locale].dir === "rtl",
  };
}
