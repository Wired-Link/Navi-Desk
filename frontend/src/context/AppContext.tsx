import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppSettings, Lang, Theme } from "../types";
import { t as translate } from "../i18n/translations";

interface Ctx {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  setLang: (l: Lang) => void;
  setTheme: (th: Theme) => void;
  t: (key: string) => string;
}

const defaultSettings: AppSettings = {
  lang: "es",
  theme: "crt",
  audio: true,
  scanlineIntensity: 0.22,
  backendUrl: "http://localhost:8001",
  localMode: true,
};

const AppContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "navi-desk-prefs";

// Only non-sensitive UI preferences (language/theme/audio/scanline/local mode)
// are persisted. NO API keys, tokens, or secrets are ever written to storage —
// the Secrets panel keeps its values in component-local state only and must
// be wired to a backend-side vault before going to production.
const SAFE_KEYS: (keyof AppSettings)[] = [
  "lang",
  "theme",
  "audio",
  "scanlineIntensity",
  "localMode",
];

function loadSafe(): Partial<AppSettings> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const out: Partial<AppSettings> = {};
    for (const k of SAFE_KEYS) {
      if (k in parsed) (out as any)[k] = parsed[k];
    }
    return out;
  } catch (error) {
    // Storage disabled or corrupted payload — fall back to defaults.
    console.error("[navi-desk] failed to load preferences:", error);
    return {};
  }
}

function persistSafe(settings: AppSettings) {
  const safe: Partial<AppSettings> = {};
  for (const k of SAFE_KEYS) (safe as any)[k] = settings[k];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch (error) {
    // Quota exceeded or storage disabled — non-fatal.
    console.error("[navi-desk] failed to persist preferences:", error);
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => ({
    ...defaultSettings,
    ...loadSafe(),
  }));

  useEffect(() => {
    persistSafe(settings);
    document.documentElement.style.setProperty(
      "--scanline-alpha",
      String(settings.scanlineIntensity),
    );
    document.documentElement.classList.remove("theme-crt", "theme-clean", "theme-hc");
    document.documentElement.classList.add(`theme-${settings.theme}`);
  }, [settings]);

  const setLang = useCallback(
    (lang: Lang) => setSettings((s) => ({ ...s, lang })),
    [],
  );
  const setTheme = useCallback(
    (theme: Theme) => setSettings((s) => ({ ...s, theme })),
    [],
  );
  const tFn = useCallback((key: string) => translate(settings.lang, key), [settings.lang]);

  const value = useMemo<Ctx>(
    () => ({ settings, setSettings, setLang, setTheme, t: tFn }),
    [settings, setLang, setTheme, tFn],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
