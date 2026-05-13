import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { mockApi } from "../services/mockApi";
import { LogLevel, LogLine } from "../types";
import { useApp } from "../context/AppContext";

const levelColor: Record<LogLevel, string> = {
  system: "text-cyan-300",
  agents: "text-[var(--navi-purple)]",
  tasks: "text-[var(--navi-online)]",
  security: "text-[var(--navi-warn)]",
  errors: "text-[var(--navi-error)]",
};

export const LogViewer: React.FC = () => {
  const { t } = useApp();
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [filter, setFilter] = useState<"all" | LogLevel>("all");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mockApi.getLogs().then(setLogs);
    const i = setInterval(async () => {
      const line = await mockApi.streamLogLine();
      setLogs((arr) => [...arr.slice(-200), line]);
    }, 1400);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [logs]);

  const filters: ("all" | LogLevel)[] = ["all", "system", "errors", "agents", "security", "tasks"];
  const filtered = logs.filter((l) => filter === "all" || l.level === filter);

  return (
    <RetroWindow
      testId="log-viewer"
      title={t("logsPanel")}
      subtitle="stream / live"
      rightSlot={
        <div className="flex items-center gap-1">
          {filters.map((f) => (
            <button
              key={f}
              data-testid={`log-filter-${f}`}
              onClick={() => setFilter(f)}
              className={`font-pixel text-[12px] tracking-[0.18em] px-2 py-[1px] border ${
                filter === f
                  ? "text-white border-[var(--navi-cyan)] bg-[rgba(0,240,255,0.08)]"
                  : "text-cyan-300 border-[var(--navi-cyan-soft)]"
              }`}
            >
              {t(`filter${f.charAt(0).toUpperCase()}${f.slice(1)}`) || f.toUpperCase()}
            </button>
          ))}
        </div>
      }
      contentClassName="flex flex-col"
    >
      <div ref={ref} className="navi-console flex-1 min-h-0 overflow-auto p-2 font-terminal text-xs leading-snug">
        {filtered.map((l) => (
          <div key={l.id} data-testid={`log-line-${l.id}`} className="whitespace-pre">
            <span className="text-[var(--navi-muted)]">[{l.ts}]</span>{" "}
            <span className="text-cyan-500">{l.level.padEnd(8, " ")}</span>{" "}
            <span className={levelColor[l.level]}>{l.message}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--navi-cyan-soft)] px-2 py-1 flex gap-2 bg-[var(--navi-panel)]">
        <button
          data-testid="logs-export"
          className="navi-btn"
          onClick={() => {
            const blob = new Blob([logs.map((l) => `[${l.ts}] ${l.level} ${l.message}`).join("\n")], {
              type: "text/plain",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "navi-logs.txt";
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Registros exportados");
          }}
        >
          {t("exportLogs")}
        </button>
        <button
          data-testid="logs-copy-diag"
          className="navi-btn"
          onClick={() => {
            navigator.clipboard.writeText(
              logs.map((l) => `[${l.ts}] ${l.level} ${l.message}`).join("\n"),
            );
            toast.success("Diagnóstico copiado");
          }}
        >
          {t("copyDiag")}
        </button>
      </div>
    </RetroWindow>
  );
};
