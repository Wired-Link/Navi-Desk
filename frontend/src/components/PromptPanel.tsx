import React, { useEffect, useState } from "react";
import { RetroWindow } from "./RetroWindow";
import { PromptTemplateCard } from "./PromptTemplateCard";
import { mockApi } from "../services/mockApi";
import { PromptTemplate } from "../types";
import { useApp } from "../context/AppContext";

export const PromptPanel: React.FC = () => {
  const { t } = useApp();
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);

  useEffect(() => {
    mockApi.getPrompts().then(setPrompts);
  }, []);

  return (
    <RetroWindow testId="prompt-panel" title={t("prompts")} subtitle="templates / saved">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 overflow-auto h-full">
        {prompts.map((p) => (
          <PromptTemplateCard key={p.id} prompt={p} />
        ))}
      </div>
    </RetroWindow>
  );
};
