import React from "react";
import { toast } from "sonner";
import { ModuleStatus } from "../types";
import { StatusBadge } from "./StatusBadge";
import { useApp } from "../context/AppContext";

const asciiBar = (pct: number, total = 12) => {
  const filled = Math.round((pct / 100) * total);
  return "▓".repeat(filled) + "░".repeat(total - filled);
};

interface Props {
  module: ModuleStatus;
  onToggle: (id: string) => void;
}

export const ModuleCard: React.FC<Props> = ({ module: m, onToggle }) => {
  const { t } = useApp();
  return (
    <div
      data-testid={`module-card-${m.id}`}
      className="navi-panel-soft p-3 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-pixel text-cyan-300 navi-text-glow text-base tracking-[0.15em] uppercase">
          {m.name}
        </span>
        <StatusBadge variant={m.online ? "online" : "offline"} testId={`module-${m.id}-status`}>
          {m.online ? t("online") : t("offline")}
        </StatusBadge>
      </div>
      <div className="font-terminal text-xs text-cyan-200 grid grid-cols-2 gap-x-3 gap-y-1">
        <div>{t("cpu")}: <span className="text-[var(--navi-warn)]">{m.cpu}%</span></div>
        <div>{t("ram")}: <span className="text-[var(--navi-warn)]">{m.ram}%</span></div>
        <div className="col-span-2 text-[var(--navi-online)]">{asciiBar(m.cpu)}</div>
        <div className="col-span-2 text-[var(--navi-purple)]">{asciiBar(m.ram)}</div>
        <div className="col-span-2">{t("ping")}: <span className="text-white">{m.lastPing}</span></div>
      </div>
      <div className="flex gap-1 mt-1">
        <button
          data-testid={`module-${m.id}-inspect`}
          className="navi-btn"
          onClick={() => toast(`Inspeccionar ${m.name}`)}
        >
          {t("inspect")}
        </button>
        <button
          data-testid={`module-${m.id}-restart`}
          className="navi-btn navi-btn-warn"
          onClick={() => {
            onToggle(m.id);
            toast.success(`${m.name} :: ${m.online ? "OFFLINE" : "ONLINE"}`);
          }}
        >
          {t("restart")}
        </button>
        <button
          data-testid={`module-${m.id}-logs`}
          className="navi-btn"
          onClick={() => toast(`Logs ${m.name}`)}
        >
          {t("viewLogs")}
        </button>
      </div>
    </div>
  );
};
