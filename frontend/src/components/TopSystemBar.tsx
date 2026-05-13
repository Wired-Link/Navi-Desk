import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { StatusBadge } from "./StatusBadge";

interface Props {
  activeTab: string;
  onTab: (id: string) => void;
}

export const TopSystemBar: React.FC<Props> = ({ activeTab, onTab }) => {
  const { t } = useApp();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const items = [
    { id: "overview", label: t("panelOverview") },
    { id: "modules", label: t("modules") },
    { id: "tasks", label: t("tasks") },
    { id: "logs", label: t("logs") },
    { id: "prompts", label: t("prompts") },
    { id: "tools", label: t("tools") },
    { id: "secrets", label: t("secrets") },
    { id: "recovery", label: t("recovery") },
    { id: "security", label: t("security") },
    { id: "settings", label: t("settings") },
  ];

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div
      data-testid="top-system-bar"
      className="navi-panel flex items-center gap-4 px-3 py-1 h-10 shrink-0"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 border border-[var(--navi-cyan)] flex items-center justify-center font-pixel text-cyan-300 navi-text-glow text-base">
          N
        </div>
        <span className="font-pixel text-cyan-300 navi-text-glow text-base tracking-[0.25em]">
          NAVI&nbsp;DESK
        </span>
        <span className="font-mono-r text-[10px] text-cyan-500/70 ml-1">v7.0</span>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto">
        {items.map((it) => (
          <button
            key={it.id}
            data-testid={`tab-${it.id}`}
            onClick={() => onTab(it.id)}
            className={`font-pixel text-sm px-2 py-[2px] tracking-[0.18em] uppercase border ${
              activeTab === it.id
                ? "text-white bg-[rgba(0,240,255,0.12)] border-[var(--navi-cyan)] navi-text-glow"
                : "text-[var(--navi-cyan)] border-transparent hover:border-[var(--navi-cyan-soft)]"
            }`}
          >
            {it.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <StatusBadge variant="online" testId="badge-connected">{t("connected")}</StatusBadge>
        <span data-testid="system-clock" className="font-pixel text-cyan-300 navi-text-glow text-base tracking-[0.15em]">
          {hh}:{mm}:{ss}
        </span>
      </div>
    </div>
  );
};
