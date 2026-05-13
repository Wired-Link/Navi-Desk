import React from "react";
import { ToolAgent } from "../types";
import { StatusBadge } from "./StatusBadge";
import { useApp } from "../context/AppContext";

interface Props {
  tool: ToolAgent;
  onToggle: (id: string) => void;
}

export const ToolCard: React.FC<Props> = ({ tool, onToggle }) => {
  const { t } = useApp();
  const riskVariant = tool.risk === "high" ? "error" : tool.risk === "med" ? "warn" : "online";
  return (
    <div
      data-testid={`tool-card-${tool.id}`}
      className="navi-panel-soft p-3 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-pixel text-cyan-300 navi-text-glow text-base tracking-[0.15em] uppercase">
          {tool.name}
        </span>
        <button
          data-testid={`tool-${tool.id}-toggle`}
          onClick={() => onToggle(tool.id)}
          className={`navi-btn ${tool.enabled ? "border-[var(--navi-online)] text-[var(--navi-online)]" : "navi-btn-danger"}`}
        >
          {tool.enabled ? t("enabled") : t("disabled")}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 font-pixel text-[13px] tracking-[0.15em]">
        <div className="flex flex-col gap-1">
          <span className="text-cyan-500 text-xs">{t("mode")}</span>
          <StatusBadge variant="purple">{tool.mode.toUpperCase()}</StatusBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cyan-500 text-xs">{t("risk")}</span>
          <StatusBadge variant={riskVariant as any}>{tool.risk.toUpperCase()}</StatusBadge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cyan-500 text-xs">{t("auditReq")}</span>
          <StatusBadge variant={tool.audit ? "warn" : "info"}>
            {tool.audit ? t("yes") : t("no")}
          </StatusBadge>
        </div>
      </div>
    </div>
  );
};
