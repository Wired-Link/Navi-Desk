import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export const StatusFooter: React.FC = () => {
  const { t, settings } = useApp();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      data-testid="status-footer"
      className="navi-panel-soft flex items-center justify-between px-3 py-1 h-7 shrink-0 font-pixel text-[13px] tracking-[0.16em]"
    >
      <div className="flex items-center gap-4">
        <span className="text-[var(--navi-online)]">● {t("connected")}</span>
        <span className="text-cyan-300">{t("user")}: <span className="text-white">local_user</span></span>
        <span className="text-cyan-300">{t("network")}: <span className="text-white">Localnet</span></span>
        <span className="text-cyan-300">{t("modeLabel")}: <span className="text-[var(--navi-warn)]">{settings.localMode ? "LOCAL" : "ADMIN"}</span></span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-cyan-300">{t("language")}: <span className="text-white uppercase">{settings.lang}</span></span>
        <span className="text-cyan-300">v7.0.0</span>
        <span className="text-white">{time.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};
