import React, { useEffect, useState } from "react";
import { RetroWindow } from "./RetroWindow";
import { TaskRow } from "./TaskRow";
import { mockApi } from "../services/mockApi";
import { TaskItem } from "../types";
import { useApp } from "../context/AppContext";

export const TaskQueuePanel: React.FC = () => {
  const { t } = useApp();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    mockApi.getTasks().then(setTasks);
  }, []);

  return (
    <RetroWindow testId="task-queue-panel" title={t("taskQueue")} subtitle="queue / scheduler">
      <div className="h-full overflow-auto">
        <div className="px-2 py-1 border-b border-cyan-700/60 text-cyan-400 font-pixel text-sm tracking-[0.18em]">
          QUEUE :: {tasks.length} ITEMS
        </div>
        {tasks.map((ti) => (
          <TaskRow key={ti.id} task={ti} />
        ))}
      </div>
    </RetroWindow>
  );
};
