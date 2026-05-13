import React from "react";
import { toast } from "sonner";
import { PromptTemplate } from "../types";
import { useApp } from "../context/AppContext";

interface Props {
  prompt: PromptTemplate;
}

export const PromptTemplateCard: React.FC<Props> = ({ prompt }) => {
  const { t } = useApp();
  return (
    <div
      data-testid={`prompt-card-${prompt.id}`}
      className="navi-panel-soft p-3 flex flex-col gap-2 transition-all hover:shadow-[0_0_18px_rgba(157,76,221,0.4)] hover:border-[var(--navi-purple)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-pixel text-cyan-300 navi-text-glow text-base tracking-[0.15em] uppercase">
          {prompt.title}
        </span>
        <span className="font-pixel text-[var(--navi-purple)] text-xs tracking-[0.2em] uppercase border border-[var(--navi-purple)] px-1">
          {prompt.category}
        </span>
      </div>
      <p className="font-mono-r text-xs text-cyan-100/80 leading-relaxed">{prompt.description}</p>
      <div className="navi-console p-2 font-terminal text-[11px] text-[var(--navi-online)] line-clamp-3">
        {prompt.body}
      </div>
      <div className="flex gap-1 mt-1">
        <button
          data-testid={`prompt-${prompt.id}-copy`}
          className="navi-btn"
          onClick={() => {
            navigator.clipboard.writeText(prompt.body);
            toast.success("Plantilla copiada");
          }}
        >
          {t("copyPrompt")}
        </button>
        <button
          data-testid={`prompt-${prompt.id}-edit`}
          className="navi-btn"
          onClick={() => toast("Editor de plantillas: placeholder")}
        >
          {t("editPrompt")}
        </button>
        <button
          data-testid={`prompt-${prompt.id}-run`}
          className="navi-btn navi-btn-warn"
          onClick={() => toast.success(`Ejecutando: ${prompt.title}`)}
        >
          {t("runPrompt")}
        </button>
      </div>
    </div>
  );
};
