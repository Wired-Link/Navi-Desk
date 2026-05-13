import React, { useEffect, useState } from "react";
import { RetroWindow } from "./RetroWindow";
import { ToolCard } from "./ToolCard";
import { mockApi } from "../services/mockApi";
import { ToolAgent } from "../types";
import { useApp } from "../context/AppContext";

export const ToolsPanel: React.FC = () => {
  const { t } = useApp();
  const [tools, setTools] = useState<ToolAgent[]>([]);

  useEffect(() => {
    mockApi.getTools().then(setTools);
  }, []);

  const toggle = (id: string) =>
    setTools((arr) => arr.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));

  return (
    <RetroWindow testId="tools-panel" title={t("tools")} subtitle="agents / modules">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 overflow-auto h-full">
        {tools.map((tl) => (
          <ToolCard key={tl.id} tool={tl} onToggle={toggle} />
        ))}
      </div>
    </RetroWindow>
  );
};
