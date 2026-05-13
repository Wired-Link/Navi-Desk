import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

const STORAGE_KEY = "navi-desk-settings";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.style.setProperty(
      "--scanline-alpha",
      String(settings.scanlineIntensity),
    );
    document.documentElement.classList.remove("theme-crt", "theme-clean", "theme-hc");
    document.documentElement.classList.add(`theme-${settings.theme}`);
  }, [settings]);

  const value = useMemo<Ctx>(
    () => ({
      settings,
      setSettings,
      setLang: (lang) => setSettings({ ...settings, lang }),
      setTheme: (theme) => setSettings({ ...settings, theme }),
      t: (key: string) => translate(settings.lang, key),
    }),
    [settings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
