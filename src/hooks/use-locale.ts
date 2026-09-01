import { useCallback, useSyncExternalStore } from "react";
import {
  getLocale,
  getResources,
  LOCALES,
  LOCALE_META,
  setLocale as setLocaleInternal,
  subscribeLocale,
  type Locale,
} from "@/lib/i18n";

export function useLocale() {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocale,
    () => "en" as Locale,
  );

  const setLocale = useCallback((l: Locale) => setLocaleInternal(l), []);

  return {
    locale,
    setLocale,
    t: getResources(locale),
    locales: LOCALES,
    meta: LOCALE_META,
    dir: LOCALE_META[locale].dir,
    isRtl: LOCALE_META[locale].dir === "rtl",
  };
}
