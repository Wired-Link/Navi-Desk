import React, { useState } from "react";
import { RetroWindow } from "./RetroWindow";
import { useApp } from "../context/AppContext";

export const AudioConsole: React.FC = () => {
  const { t } = useApp();
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "speaking">("idle");

  const bars = Array.from({ length: 36 });

  return (
    <RetroWindow
      testId="audio-console"
      title="AUDIO :: WAVE"
      subtitle="vox / mono"
      contentClassName="p-2"
    >
      <div className="navi-console p-2 h-full flex flex-col gap-2">
        <div className="flex items-end h-12 gap-[2px]">
          {bars.map((_, i) => (
            <span
              key={i}
              className="bar"
              style={{
                animationDelay: `${(i * 60) % 900}ms`,
                opacity: muted ? 0.15 : 1,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between font-pixel tracking-[0.18em] text-sm">
          <div className="flex gap-2">
            <button
              data-testid="audio-status-idle"
              onClick={() => setStatus("idle")}
              className={`navi-btn ${status === "idle" ? "bg-[rgba(0,240,255,0.1)] text-white" : ""}`}
            >
              {t("voiceIdle")}
            </button>
            <button
              data-testid="audio-status-listen"
              onClick={() => setStatus("listening")}
              className={`navi-btn ${status === "listening" ? "bg-[rgba(0,255,65,0.1)] text-[var(--navi-online)] border-[var(--navi-online)]" : ""}`}
            >
              {t("voiceListening")}
            </button>
            <button
              data-testid="audio-status-speak"
              onClick={() => setStatus("speaking")}
              className={`navi-btn ${status === "speaking" ? "bg-[rgba(157,76,221,0.1)] text-[var(--navi-purple)] border-[var(--navi-purple)]" : ""}`}
            >
              {t("voiceSpeaking")}
            </button>
          </div>
          <button
            data-testid="audio-mute-toggle"
            onClick={() => setMuted((m) => !m)}
            className={`navi-btn ${muted ? "navi-btn-danger" : ""}`}
          >
            {muted ? t("unmute") : t("mute")}
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
