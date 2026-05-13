import React from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { useApp } from "../context/AppContext";
import { Lang, Theme } from "../types";

const langs: { id: Lang; label: string }[] = [
  { id: "es", label: "ESPAÑOL" },
  { id: "en", label: "ENGLISH" },
  { id: "ja", label: "日本語" },
];

export const SettingsPanel: React.FC = () => {
  const { t, settings, setSettings, setLang, setTheme } = useApp();

  const themes: { id: Theme; label: string }[] = [
    { id: "crt", label: t("themeCrt") },
    { id: "clean", label: t("themeClean") },
    { id: "hc", label: t("themeHc") },
  ];

  return (
    <RetroWindow testId="settings-panel" title={t("settings")} subtitle="config / local">
      <div className="p-3 overflow-auto h-full grid grid-cols-1 md:grid-cols-2 gap-4 font-pixel text-cyan-200 text-sm tracking-[0.14em]">
        <div className="navi-panel-soft p-3 flex flex-col gap-2">
          <span className="text-cyan-400">{t("language")}</span>
          <div className="flex gap-1 flex-wrap">
            {langs.map((l) => (
              <button
                key={l.id}
                data-testid={`lang-${l.id}`}
                onClick={() => setLang(l.id)}
                className={`navi-btn ${settings.lang === l.id ? "border-[var(--navi-cyan)] text-white bg-[rgba(0,240,255,0.08)]" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="navi-panel-soft p-3 flex flex-col gap-2">
          <span className="text-cyan-400">{t("theme")}</span>
          <div className="flex gap-1 flex-wrap">
            {themes.map((th) => (
              <button
                key={th.id}
                data-testid={`theme-${th.id}`}
                onClick={() => setTheme(th.id)}
                className={`navi-btn ${settings.theme === th.id ? "border-[var(--navi-cyan)] text-white bg-[rgba(0,240,255,0.08)]" : ""}`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        <div className="navi-panel-soft p-3 flex flex-col gap-2">
          <span className="text-cyan-400">{t("audio")}</span>
          <button
            data-testid="audio-toggle"
            onClick={() => setSettings({ ...settings, audio: !settings.audio })}
            className={`navi-btn w-fit ${settings.audio ? "border-[var(--navi-online)] text-[var(--navi-online)]" : "navi-btn-danger"}`}
          >
            {settings.audio ? "ON" : "OFF"}
          </button>
        </div>

        <div className="navi-panel-soft p-3 flex flex-col gap-2">
          <span className="text-cyan-400">{t("scanlineIntensity")}: {settings.scanlineIntensity.toFixed(2)}</span>
          <input
            data-testid="scanline-slider"
            type="range"
            min={0}
            max={0.6}
            step={0.02}
            value={settings.scanlineIntensity}
            onChange={(e) => setSettings({ ...settings, scanlineIntensity: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400"
          />
        </div>

        <div className="navi-panel-soft p-3 flex flex-col gap-2 md:col-span-2">
          <span className="text-cyan-400">{t("backendUrl")}</span>
          <input
            data-testid="backend-url"
            className="navi-input"
            value={settings.backendUrl}
            onChange={(e) => setSettings({ ...settings, backendUrl: e.target.value })}
          />
          <button
            data-testid="settings-save"
            className="navi-btn w-fit"
            onClick={() => toast.success("Configuración guardada localmente")}
          >
            {t("save")}
          </button>
        </div>

        <div className="navi-panel-soft p-3 flex flex-col gap-2 md:col-span-2">
          <span className="text-cyan-400">{t("localMode")}</span>
          <button
            data-testid="local-mode-toggle"
            onClick={() => setSettings({ ...settings, localMode: !settings.localMode })}
            className={`navi-btn w-fit ${settings.localMode ? "border-[var(--navi-online)] text-[var(--navi-online)]" : ""}`}
          >
            {settings.localMode ? "ACTIVO" : "INACTIVO"}
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
