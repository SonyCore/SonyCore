import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. Returns `false` during SSR / before hydration,
 * so callers should treat the narrow layout as the default.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
