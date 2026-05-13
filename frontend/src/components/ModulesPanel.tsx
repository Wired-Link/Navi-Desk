import React, { useEffect, useState } from "react";
import { RetroWindow } from "./RetroWindow";
import { ModuleCard } from "./ModuleCard";
import { mockApi } from "../services/mockApi";
import { ModuleStatus } from "../types";
import { useApp } from "../context/AppContext";

export const ModulesPanel: React.FC = () => {
  const { t } = useApp();
  const [list, setList] = useState<ModuleStatus[]>([]);

  useEffect(() => {
    mockApi.getModules().then(setList);
  }, []);

  const toggle = (id: string) => {
    setList((arr) =>
      arr.map((m) =>
        m.id === id
          ? {
              ...m,
              online: !m.online,
              cpu: !m.online ? Math.floor(Math.random() * 70) + 10 : 0,
              ram: !m.online ? Math.floor(Math.random() * 70) + 10 : 0,
              lastPing: !m.online ? `${Math.floor(Math.random() * 30) + 4}ms` : "—",
            }
          : m,
      ),
    );
  };

  return (
    <RetroWindow testId="modules-panel" title={t("moduleStatus")} subtitle="nodes / live">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 overflow-auto h-full">
        {list.map((m) => (
          <ModuleCard key={m.id} module={m} onToggle={toggle} />
        ))}
      </div>
    </RetroWindow>
  );
};
