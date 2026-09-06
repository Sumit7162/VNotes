import { useCallback, useEffect, useState } from "react";

import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  storeTheme,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  isTheme,
  type ResolvedTheme,
  type Theme,
} from "../lib/theme";

/**
 * Read and change the colour theme.
 *
 * State lives on the document rather than in a provider, so several instances
 * can exist without a context wrapping the tree. They are kept in step by two
 * events: a custom one for changes made in this tab, and `storage` for changes
 * made in another.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(readStoredTheme()),
  );

  useEffect(() => {
    setResolvedTheme(applyTheme(theme));
  }, [theme]);

  // Only follow the OS while the choice actually is "system".
  useEffect(() => {
    if (theme !== "system") return;

    let media: MediaQueryList;
    try {
      media = window.matchMedia("(prefers-color-scheme: dark)");
    } catch {
      return;
    }

    const handleChange = () => setResolvedTheme(applyTheme("system"));
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const syncFromDocument = () => {
      const next = readStoredTheme();
      setThemeState(next);
      setResolvedTheme(applyTheme(next));
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) syncFromDocument();
    };

    window.addEventListener(THEME_CHANGE_EVENT, syncFromDocument);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncFromDocument);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    if (!isTheme(next)) return;
    storeTheme(next);
    setThemeState(next);
    setResolvedTheme(applyTheme(next));
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolveTheme(readStoredTheme()) === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
