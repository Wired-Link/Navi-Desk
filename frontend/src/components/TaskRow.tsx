import React from "react";
import { toast } from "sonner";
import { TaskItem } from "../types";
import { StatusBadge } from "./StatusBadge";
import { useApp } from "../context/AppContext";

const glyph: Record<TaskItem["state"], string> = {
  pending: "[*]",
  running: "[>]",
  completed: "[✓]",
  failed: "[✗]",
};

interface Props {
  task: TaskItem;
}

export const TaskRow: React.FC<Props> = ({ task: ti }) => {
  const { t } = useApp();
  const variant =
    ti.state === "running"
      ? "info"
      : ti.state === "completed"
      ? "online"
      : ti.state === "failed"
      ? "error"
      : "warn";

  const priColor =
    ti.priority === "high"
      ? "text-[var(--navi-error)]"
      : ti.priority === "med"
      ? "text-[var(--navi-warn)]"
      : "text-[var(--navi-cyan)]";

  return (
    <div
      data-testid={`task-row-${ti.id}`}
      className="flex flex-col gap-1 px-2 py-2 border-b border-cyan-900/40 font-terminal text-xs"
    >
      <div className="flex items-center gap-2">
        <span className="text-cyan-300 font-pixel text-base">{glyph[ti.state]}</span>
        <span className="text-white flex-1 truncate">{ti.title}</span>
        <StatusBadge variant={variant as any}>{t(ti.state)}</StatusBadge>
      </div>
      <div className="flex items-center justify-between text-[11px] gap-2">
        <span className="text-cyan-300 truncate">{ti.module}</span>
        <span className={`${priColor} font-pixel text-sm uppercase tracking-widest shrink-0`}>
          {ti.priority}
        </span>
      </div>
      <div className="flex gap-1 flex-wrap">
        <button
          data-testid={`task-${ti.id}-pause`}
          className="navi-btn"
          onClick={() => toast(`${t("pause")} ${ti.title}`)}
        >
          {t("pause")}
        </button>
        <button
          data-testid={`task-${ti.id}-retry`}
          className="navi-btn navi-btn-warn"
          onClick={() => toast(`${t("retry")} ${ti.title}`)}
        >
          {t("retry")}
        </button>
        <button
          data-testid={`task-${ti.id}-cancel`}
          className="navi-btn navi-btn-danger"
          onClick={() => toast(`${t("cancel")} ${ti.title}`)}
        >
          {t("cancel")}
        </button>
        <button
          data-testid={`task-${ti.id}-inspect`}
          className="navi-btn ml-auto"
          onClick={() => toast(`${t("inspect")} ${ti.title}`)}
        >
          {t("inspect")}
        </button>
      </div>
    </div>
  );
};
