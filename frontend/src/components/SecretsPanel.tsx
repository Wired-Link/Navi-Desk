import React, { useState } from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { useApp } from "../context/AppContext";

const fields = [
  { key: "mainAiKey", placeholder: "sk-••••••••••••••" },
  { key: "secondaryAiKey", placeholder: "sk-••••••••••••••" },
  { key: "verifierKey", placeholder: "vk-••••••••••••••" },
  { key: "speechKey", placeholder: "spk-••••••••••••••" },
  { key: "msgBot", placeholder: "bot-••••••••" },
  { key: "localEndpoint", placeholder: "http://localhost:8001" },
];

export const SecretsPanel: React.FC = () => {
  const { t } = useApp();
  const [values, setValues] = useState<Record<string, string>>({});
  const [reveal, setReveal] = useState(false);

  return (
    <RetroWindow testId="secrets-panel" title={t("secrets")} subtitle="vault / placeholders">
      <div className="p-3 overflow-auto h-full flex flex-col gap-3">
        <div
          data-testid="secrets-warning"
          className="navi-panel-soft p-2 border-[var(--navi-warn)] text-[var(--navi-warn)] font-pixel text-sm tracking-[0.14em]"
          style={{ borderColor: "var(--navi-warn)" }}
        >
          ⚠ {t("warningSecrets")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-1 font-pixel text-[13px] tracking-[0.16em] text-cyan-300">
              {t(f.key)}
              <input
                data-testid={`secret-${f.key}`}
                type={reveal ? "text" : "password"}
                className="navi-input"
                placeholder={f.placeholder}
                value={values[f.key] || ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            data-testid="secrets-reveal"
            className="navi-btn"
            onClick={() => setReveal((r) => !r)}
          >
            {reveal ? "OCULTAR" : t("unlock")}
          </button>
          <button
            data-testid="secrets-save"
            className="navi-btn navi-btn-warn"
            onClick={() => toast.success("Guardado local únicamente. Mueva al backend.")}
          >
            {t("save")}
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
