import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { mockApi } from "../services/mockApi";
import { useApp } from "../context/AppContext";
import { StatusBadge } from "./StatusBadge";

export const RecoveryPanel: React.FC = () => {
  const { t } = useApp();
  const [points, setPoints] = useState<string[]>([]);
  const [last, setLast] = useState("2026-02-01 14:22:10");

  useEffect(() => {
    mockApi.getRestorePoints().then(setPoints);
  }, []);

  return (
    <RetroWindow testId="recovery-panel" title={t("recovery")} subtitle="backup / snapshot">
      <div className="p-3 flex flex-col gap-3 overflow-auto h-full">
        <div className="flex items-center gap-3 font-pixel text-sm tracking-[0.16em]">
          <span className="text-cyan-300">{t("backup")}:</span>
          <StatusBadge variant="online">OK</StatusBadge>
          <span className="text-cyan-300">{t("lastBackup")}:</span>
          <span className="text-white">{last}</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            data-testid="backup-create"
            className="navi-btn"
            onClick={() => {
              const now = new Date().toISOString().replace("T", " ").slice(0, 19);
              setLast(now);
              setPoints((p) => [`snap_${now.replace(/[:\s]/g, "-")}`, ...p]);
              toast.success("Respaldo creado");
            }}
          >
            {t("createBackup")}
          </button>
          <button
            data-testid="recovery-mode"
            className="navi-btn navi-btn-warn"
            onClick={() => toast("Modo recuperación: placeholder")}
          >
            {t("recoveryMode")}
          </button>
          <button
            data-testid="snapshot-export"
            className="navi-btn"
            onClick={() => toast.success("Snapshot exportado (placeholder)")}
          >
            {t("exportSnapshot")}
          </button>
        </div>

        <div>
          <div className="font-pixel text-cyan-400 tracking-[0.18em] text-sm mb-1">
            {t("restorePoints")}
          </div>
          <div className="navi-console p-2 font-terminal text-xs space-y-1">
            {points.map((p) => (
              <div key={p} data-testid={`restore-point-${p}`} className="flex items-center justify-between">
                <span className="text-[var(--navi-online)]">{p}</span>
                <button
                  className="navi-btn"
                  onClick={() => toast(`Restaurar ${p}`)}
                >
                  RESTAURAR
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};
