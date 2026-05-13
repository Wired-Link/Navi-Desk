import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { mockApi } from "../services/mockApi";
import { AuditItem } from "../types";
import { StatusBadge } from "./StatusBadge";
import { useApp } from "../context/AppContext";

export const SecurityAuditPanel: React.FC = () => {
  const { t } = useApp();
  const [items, setItems] = useState<AuditItem[]>([]);

  useEffect(() => {
    mockApi.getAudit().then(setItems);
  }, []);

  const counts = {
    warn: items.filter((x) => x.level === "warn").length,
    err: items.filter((x) => x.level === "err").length,
    ext: 2,
  };

  return (
    <RetroWindow testId="security-audit-panel" title={t("security")} subtitle="audit / log">
      <div className="p-3 overflow-auto h-full flex flex-col gap-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-pixel text-sm tracking-[0.14em]">
          <div className="navi-panel-soft p-2">
            <div className="text-cyan-400">{t("lastAudit")}</div>
            <div className="text-white">2026-02-01</div>
          </div>
          <div className="navi-panel-soft p-2">
            <div className="text-cyan-400">{t("warnings")}</div>
            <div className="text-[var(--navi-warn)]">{counts.warn}</div>
          </div>
          <div className="navi-panel-soft p-2">
            <div className="text-cyan-400">{t("extDeps")}</div>
            <div className="text-[var(--navi-purple)]">{counts.ext}</div>
          </div>
          <div className="navi-panel-soft p-2">
            <div className="text-cyan-400">{t("pendingReview")}</div>
            <div className="text-[var(--navi-error)]">{counts.err}</div>
          </div>
        </div>

        <div className="navi-console p-2 font-terminal text-xs space-y-2">
          {items.map((a) => (
            <div key={a.id} data-testid={`audit-item-${a.id}`} className="flex items-start gap-2">
              <StatusBadge variant={a.level === "ok" ? "online" : a.level === "warn" ? "warn" : "error"}>
                {a.level.toUpperCase()}
              </StatusBadge>
              <div>
                <div className="text-white">{a.label}</div>
                <div className="text-cyan-400/80">{a.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            data-testid="audit-generate"
            className="navi-btn navi-btn-warn"
            onClick={() => toast.success("Informe de auditoría generado (placeholder)")}
          >
            {t("genAudit")}
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
